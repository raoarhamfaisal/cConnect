<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;
use App\Services\ChatAttachmentService;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function threads()
    {
        $me = Auth::user();

        // Get conversations with latest messages ordered correctly
        $conversations = Conversation::whereHas('participants', function($query) use ($me) {
                $query->where('user_id', $me->id);
            })
            ->with([
                'participants' => fn($q) => $q
                    ->where('user_id', '<>', $me->id)
                    ->with('profile'),
                'latestMessage',
            ])
            // Join the latest message to sort by
            ->addSelect(['latest_message_time' => Message::select('created_at')
                ->whereColumn('conversation_id', 'conversations.id')
                ->latest()
                ->limit(1)
            ])
            ->orderByDesc('latest_message_time')
            ->orderByDesc('conversations.updated_at') // Fallback if no messages
            ->get();

        // Format threads for response
        $threads = $conversations->map(function($conv) use ($me) {
            // Get unread count for this conversation
            $unreadCount = $this->getUnreadCount($conv->id, $me->id);
            
            return [
                'conversation_id' => $conv->id,
                'partner' => [
                    'id'         => $conv->participants->first()->id,
                    'first_name' => $conv->participants->first()->first_name,
                    'last_name'  => $conv->participants->first()->last_name,
                    'avatar'     => $conv->participants->first()->profile->user_avatar ?? null,
                    'is_contractor' => $conv->participants->first()->profile->is_contractor ?? false,
                ],
                'last_message' => $conv->latestMessage
                    ? [
                        'body'       => $conv->latestMessage->body,
                        'created_at' => $conv->latestMessage->created_at,
                        'user_id'    => $conv->latestMessage->user_id,
                    ]
                    : null,
                'unread_count' => $unreadCount
            ];
        });

        return response()->json($threads);
    }

    /**
     * Get count of unread messages for a conversation
     */
    private function getUnreadCount($conversationId, $userId)
    {
        // Get the last read timestamp for this user in this conversation
        $lastRead = Conversation::find($conversationId)
            ->participants()
            ->where('user_id', $userId)
            ->first()
            ->pivot
            ->last_read_at;

        // Count messages that are newer than last_read_at and not from current user
        $query = Message::where('conversation_id', $conversationId)
            ->where('user_id', '!=', $userId);
            
        if ($lastRead) {
            $query->where('created_at', '>', $lastRead);
        }
        
        return $query->count();
    }

    /**
     * GET /api/chat/threads/{conversation}/messages
     * Return all messages in that thread.
     */
    public function messages(Conversation $conversation)
    {
        $me = Auth::id();
        abort_unless(
            $conversation->participants()->where('user_id',$me)->exists(),
            403
        );

        $msgs = $conversation->messages()
            ->with('sender.profile','attachments')
            ->orderBy('created_at')
            ->get()
            ->map(function($message) {
                // Keep the message structure but indicate deletion status
                if ($message->deleted) {
                    // Set the body to null for deleted messages but keep them in the results
                    // This allows frontend to show "This message was deleted" placeholder
                    $message->body = null;
                }
                return $message;
            });

        return response()->json($msgs);
    }

    /**
     * POST /api/chat/mark-as-read/{conversation}
     * Mark all messages in a conversation as read for the current user
     */
    public function markAsRead($conversationId)
    {
        $user = Auth::user();
        
        $user->conversations()
            ->where('conversations.id', $conversationId)
            ->updateExistingPivot($conversationId, [
                'last_read_at' => now()
            ]);
            
        return response()->json(['success' => true]);
    }

    /**
     * POST /api/chat/threads/{conversation}/messages
     * Send a new message (with optional file uploads).
     */
    public function store(Request $request, Conversation $conversation, ChatAttachmentService $attachmentService)
    {
        \Log::info('Message with attachments received', [
            'has_attachments' => $request->hasFile('attachments'),
            'has_attachment_paths' => $request->has('attachmentPaths'),
            'attachment_paths' => $request->input('attachmentPaths'),
            'reply_to' => $request->input('reply_to'),
        ]);
        
        $me = Auth::id();
        abort_unless(
            $conversation->participants()->where('user_id',$me)->exists(),
            403
        );

        $data = $request->validate([
            'body'         => 'nullable|string',
            'attachments.*'=> 'file|max:5120',
            'attachmentPaths.*' => 'nullable|string',
            'reply_to'     => 'nullable|exists:messages,id',
        ]);

        $msg = $conversation->messages()->create([
            'user_id' => $me,
            'body'    => $data['body'] ?? null,
            'reply_to' => $data['reply_to'] ?? null,
        ]);

        // Handle direct file uploads
        if($request->hasFile('attachments')){
            foreach($request->file('attachments') as $file){
                $attachment = $attachmentService->processPermanentAttachment($file, $msg->id);
                $msg->attachments()->create([
                    'file_path' => $attachment['path'],
                    'file_type' => $attachment['type'],
                ]);
            }
        }

        // Handle paths from previously uploaded temporary files
        if($request->has('attachmentPaths')){
            foreach($request->input('attachmentPaths') as $tempPath){
                $attachment = $attachmentService->processPermanentAttachment($tempPath, $msg->id);
                $msg->attachments()->create([
                    'file_path' => $attachment['path'],
                    'file_type' => $attachment['type'],
                ]);
            }
        }

        // Update conversation timestamp to ensure proper ordering
        $conversation->touch();
        
        // More explicit loading of relationships
        if ($msg->reply_to) {
            $msg->load([
                'sender.profile', 
                'attachments', 
                'replyTo' => function ($query) {
                    $query->with('sender.profile');
                }
            ]);
        } else {
            $msg->load('sender.profile', 'attachments');
        }

        // Broadcast the message event
        broadcast(new \App\Events\MessageSent($msg))->toOthers();

        return response()->json($msg, 201);
    }

    public function createThread(Request $request)
    {
        try {
            $otherId = $request->validate([
                'user_id' => 'required|exists:users,id'
            ])['user_id'];

            $me = Auth::user();
            
            // Check if users are the same
            if ($otherId == $me->id) {
                return response()->json(['error' => 'Cannot create conversation with yourself'], 422);
            }

            // find or create
            $conversation = $me->conversations()
                ->whereHas('participants', fn($q) => $q->where('user_id', $otherId))
                ->first();

            if (!$conversation) {
                $conversation = Conversation::create(['created_by' => $me->id]);
                $conversation->participants()->attach([$me->id, $otherId]);
            }

            // load messages + partner - fixed the relationship loading
            $conversation->load([
                'participants' => fn($q) => $q->where('user_id', '<>', $me->id)->with('profile'),
                'messages.sender.profile',
                'messages.attachments' 
            ]);

            return response()->json($conversation);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


       /**
     * Handle chat attachment upload.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Services\ChatAttachmentService $attachmentService
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request, ChatAttachmentService $attachmentService)
    {
        // Debug information to see what's in the request
        \Log::info('Upload request details:', [
            'all_files' => $request->allFiles(),
            'content_type' => $request->header('Content-Type'),
            'has_filepond' => $request->hasFile('filepond'),
            'all_input' => $request->all(),
            'csrf_token' => $request->header('X-CSRF-TOKEN'),
            'is_ajax' => $request->ajax(),
        ]);

        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Try to find the file in any field
        $fileField = null;
        $file = null;

        if ($request->hasFile('filepond')) {
            $fileField = 'filepond';
            $file = $request->file('filepond');
        } else {
            // Check all files to find one
            foreach ($request->allFiles() as $field => $uploadedFile) {
                $fileField = $field;
                $file = is_array($uploadedFile) ? $uploadedFile[0] : $uploadedFile;
                break;
            }
        }

        if ($file) {
            try {
                \Log::info("Processing file from field: {$fileField}", [
                    'mime' => $file->getMimeType(),
                    'size' => $file->getSize(),
                    'name' => $file->getClientOriginalName()
                ]);
                
                // Process and store the temp attachment using our service
                $path = $attachmentService->processTempAttachment($file);
                return $path;
            } catch (\Exception $e) {
                \Log::error('File upload error: ' . $e->getMessage(), [
                    'exception' => $e,
                    'trace' => $e->getTraceAsString()
                ]);
                return response()->json(['error' => $e->getMessage()], 400);
            }
        }
        
        return response()->json(['error' => 'No file provided - Check your form field names'], 400);
    }

    /**
     * Update a message
     * 
     * @param Request $request
     * @param Message $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Message $message)
    {
        // Check if user owns the message
        if ($message->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized to edit this message'], 403);
        }

        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $message->update([
            'body' => $data['body'],
            'edited' => true
        ]);

        // Reload relations
        $message->load('sender.profile', 'attachments');
    
        // Broadcast message updated event
        broadcast(new \App\Events\MessageSent($message))->toOthers();

        return response()->json($message);
    }

    /**
     * Delete a message
     * 
     * @param Message $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Message $message)
    {
        // Check if user owns the message
        if ($message->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized to delete this message'], 403);
        }

        // Optional: soft delete or mark as deleted instead of hard delete
        $message->update([
            'body' => null,
            'deleted' => true
        ]);
    
        // Broadcast message deleted event
        broadcast(new \App\Events\MessageSent($message))->toOthers();

        return response()->json(['success' => true, 'message' => 'Message deleted successfully']);
    }

    /**
     * Update user online status
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateUserStatus(Request $request)
    {
        $user = Auth::user();
        $status = $request->input('status', 'online');
        
        // Broadcast user online status event
        broadcast(new \App\Events\UserOnlineStatus(
            $user->id,
            $status === 'online'
        ));
        
        return response()->json(['success' => true]);
    }
}
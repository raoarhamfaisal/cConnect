<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function threads()
    {
    $me = Auth::user();

    $threads = $me->conversations()
        ->with([
            // load the other participant and their profile
            'participants' => fn($q) => $q
                ->where('user_id', '<>', $me->id)
                ->with('profile'),
            'latestMessage',
        ])
        ->latest('updated_at')
        ->get()
        ->map(fn($conv) => [
            'conversation_id' => $conv->id,
            'partner' => [
                'id'         => $conv->participants->first()->id,
                'first_name' => $conv->participants->first()->first_name,
                'last_name'  => $conv->participants->first()->last_name,
                'avatar'     => $conv->participants->first()->profile->user_avatar ?? null,
                'is_contractor' => $conv->participants->first()->profile->is_contractor,
            ],
            'last_message' => $conv->latestMessage
                ? [
                    'body'       => $conv->latestMessage->body,
                    'created_at' => $conv->latestMessage->created_at,
                    'user_id'    => $conv->latestMessage->user_id,
                ]
                : null,
        ]);

    return response()->json($threads);
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
            ->get();

        return response()->json($msgs);
    }

    /**
     * POST /api/chat/threads/{conversation}/messages
     * Send a new message (with optional file uploads).
     */
    public function store(Request $request, Conversation $conversation)
    {
        $me = Auth::id();
        abort_unless(
            $conversation->participants()->where('user_id',$me)->exists(),
            403
        );

        $data = $request->validate([
            'body'         => 'nullable|string',
            'attachments.*'=> 'file|max:5120',
        ]);

        $msg = $conversation->messages()->create([
            'user_id' => $me,
            'body'    => $data['body'] ?? null,
        ]);

        if($request->hasFile('attachments')){
            foreach($request->file('attachments') as $file){
                $path = $file->store('chat/attachments','public');
                $msg->attachments()->create([
                    'file_path'=>$path,
                    'file_type'=>$file->getClientMimeType(),
                ]);
            }
        }

        // reload relations for response
        $msg->load('sender.profile','attachments');

        return response()->json($msg,201);
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
}
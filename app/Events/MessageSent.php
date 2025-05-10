<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        // Use a public channel instead of a private channel
        return new Channel('conversation.' . $this->message->conversation_id);
    }

    public function broadcastWith()
    {
        return [
            'id'              => $this->message->id,
            'conversation_id' => $this->message->conversation_id,
            'user_id'         => $this->message->user_id,
            'body'            => $this->message->body,
            'reply_to'        => $this->message->reply_to,
            'edited'          => $this->message->edited,
            'deleted'         => $this->message->deleted,
            'created_at'      => $this->message->created_at->toDateTimeString(),
            'attachments'     => $this->message->attachments->map(fn($a)=>[
                'id' => $a->id,
                'file_path' => $a->file_path,
                'file_type' => $a->file_type,
            ]),
            'sender' => [
                'id' => $this->message->sender->id,
                'first_name' => $this->message->sender->first_name,
                'last_name' => $this->message->sender->last_name,
                'profile' => [
                    'user_avatar' => $this->message->sender->profile->user_avatar ?? null
                ]
            ],
        ];
    }
}

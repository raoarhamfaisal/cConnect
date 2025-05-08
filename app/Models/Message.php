<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'body',
        'edited',
        'deleted',
        'reply_to',
    ];

    protected $casts = [
        'edited' => 'boolean',
        'deleted' => 'boolean',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function attachments()
    {
        return $this->hasMany(MessageAttachment::class);
    }
    
    // Add relationship for reply functionality
    public function replyTo()
    {
        return $this->belongsTo(Message::class, 'reply_to');
    }
    
    public function replies()
    {
        return $this->hasMany(Message::class, 'reply_to');
    }
}

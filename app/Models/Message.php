<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
   protected $fillable = ['conversation_id','user_id','body','reply_to'];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function replyTo()
    {
        return $this->belongsTo(self::class,'reply_to');
    }

    public function replies()
    {
        return $this->hasMany(self::class,'reply_to');
    }

    public function attachments()
    {
        return $this->hasMany(MessageAttachment::class);
    }
}

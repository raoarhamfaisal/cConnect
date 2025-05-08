<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['created_by'];
    
    // Add cascading delete to ensure proper cleanup
    protected static function boot()
    {
        parent::boot();
        
        static::deleting(function ($conversation) {
            $conversation->messages()->each(function ($message) {
                $message->attachments()->delete();
                $message->delete();
            });
        });
    }

    public function participants()
    {
        return $this->belongsToMany(User::class)
                    ->withPivot('last_read_at')
                    ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function latestMessage()
    {
        return $this
            ->hasOne(Message::class)
            ->latestOfMany();
    }
}

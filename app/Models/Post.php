<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trade;
use App\Models\PostReaction;

use App\Models\Comment;
use App\Models\Post;


class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_post_id',
        'region_id',
        'user_id',
        'title',
        'image',    
        'body1',
        'body2',
        'is_body_bold',
        'post_text_color_id',
        'post_background_color_id',
        'font_size',
        'text_alignment',
        'likes',
        'repost',
        'shares',
        'title_text_alignment',
        'title_text_color_id',
        'title_background_color_id',
    ];


    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'post_trade');
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function likes()
    {
        return $this->hasMany(PostReaction::class)->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->hasMany(PostReaction::class)->where('type', 'dislike');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // If you want to track original posts for reposts
    public function originalPost()
    {
        return $this->belongsTo(Post::class, 'original_post_id');
    }


}

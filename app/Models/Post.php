<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trade;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
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
    ];


    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'post_trade');
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

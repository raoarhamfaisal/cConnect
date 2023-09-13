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
        'body1Bold',
        'body1ColorId',
        'likes',
        'repost',
        'shares',
        'longitude',
        'latitude',

    ];


    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'post_trade');
    }

}

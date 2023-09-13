<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profile;
use App\Models\Post;

class Trade extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function profiles()
    {
        return $this->belongsToMany(Profile::class, 'profile_trade');
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_trade');
    }

}

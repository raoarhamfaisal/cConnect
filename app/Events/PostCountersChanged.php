<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

use App\Models\Post;
use App\Models\PostReaction;


class PostCountersChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $post;
    public $likesCount;
    public $dislikesCount;
    public $userReaction; // User's reaction to the post

    public function __construct(Post $post)
    {
        $this->post = $post;
        $this->likesCount = $post->likes()->count();
        $this->dislikesCount = $post->dislikes()->count();

        // Fetch the logged-in user's reaction
        $userId = Auth::id();
        $this->userReaction = PostReaction::where('post_id', $post->id)
        ->where('user_id', $userId)
        ->value('type'); // 'like', 'dislike', or null
    }

    public function broadcastOn()
    {
        \Log::info("Broadcasting on post channel");
        \Log::info($this->post);


        return new Channel('post');
    }
}
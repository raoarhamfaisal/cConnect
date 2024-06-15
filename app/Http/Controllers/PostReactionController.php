<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostReaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\PostCountersChanged;

use Illuminate\Support\Facades\Broadcast;


class PostReactionController extends Controller
{
    public function like(Post $post)
    {
        $this->handleReaction($post, 'like');
        try {
            broadcast(new PostCountersChanged($post));
        } catch (\Exception $e) {
            \Log::error('Error broadcasting PostCountersChanged event: ' . $e->getMessage());
            // Optionally, handle the error further if needed
        }

        
        return response()->json(['message' => 'Liked successfully']);
    }

    public function dislike(Post $post)
    {
        $this->handleReaction($post, 'dislike');
        try {
            broadcast(new PostCountersChanged($post));
        } catch (\Exception $e) {
            \Log::error('Error broadcasting PostCountersChanged event: ' . $e->getMessage());
            // Optionally, handle the error further if needed
        }
        return response()->json(['message' => 'Disliked successfully']);
    }

    public function removeLike(Post $post)
    {
        $this->removeReaction($post, 'like');
        try {
            broadcast(new PostCountersChanged($post));
        } catch (\Exception $e) {
            \Log::error('Error broadcasting PostCountersChanged event: ' . $e->getMessage());
            // Optionally, handle the error further if needed
        }
        return response()->json(['message' => 'Like removed']);
    }

    public function removeDislike(Post $post)
    {
        $this->removeReaction($post, 'dislike');
        try {
            broadcast(new PostCountersChanged($post));
        } catch (\Exception $e) {
            \Log::error('Error broadcasting PostCountersChanged event: ' . $e->getMessage());
            // Optionally, handle the error further if needed
        }
        return response()->json(['message' => 'Dislike removed']);
    }

    private function handleReaction(Post $post, $type)
    {
        $userId = Auth::id();

        // Remove opposite reaction if exists
        $opposite = $type === 'like' ? 'dislike' : 'like';
        PostReaction::where('post_id', $post->id)->where('user_id', $userId)->where('type', $opposite)->delete();

        // Add or update reaction
        PostReaction::updateOrCreate(
            ['post_id' => $post->id, 'user_id' => $userId],
            ['type' => $type]
        );
    }

    private function removeReaction(Post $post, $type)
    {
        $userId = Auth::id();
        PostReaction::where('post_id', $post->id)->where('user_id', $userId)->where('type', $type)->delete();
    }


    public function getPostLikes(Post $post)
    {
        $likes = $post->likes()->with('user.profile')->get()->map(function ($like) {
            return $like->user->profile;
        });
        return response()->json($likes);
    }

    public function getPostDislikes(Post $post)
    {
        $dislikes = $post->dislikes()->with('user.profile')->get()->map(function ($dislike) {
            return $dislike->user->profile;
        });
        return response()->json($dislikes);
    }
}

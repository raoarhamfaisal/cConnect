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


    // public function getPostLikes(Post $post)
    // {
    //     $likes = $post->likes()->with('user.profile.trades')->get()->map(function ($like) {
    //         return $like->user->profile;
    //     });

          
    
    //     return response()->json($likes);
    // }

    public function getPostLikes(Post $post)
{
    $likes = $post->likes()->with('user.profile.trades')->get()->map(function ($like) {
        // Access the profile from the like
        $profile = $like->user->profile;

        // Convert the profile's trades to the old structure
        $profileTrades = $this->convertTradesToOldStructure($profile->trades);

        // Merge the converted trades back into the profile's data
        $profileData = $profile->toArray(); // Convert the profile to an array
        $profile = array_merge($profileData,$profileTrades );

        // Return the profile with its trades converted
        return $profile;
    });

    return response()->json($likes);
}

private function convertTradesToOldStructure($trades) 
{
    $oldStructure = [];
    for ($i = 1; $i <= 30; $i++) {
        $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
    }
    return $oldStructure;
}
public function getPostDislikes(Post $post)
{
    $dislikes = $post->dislikes()->with('user.profile.trades')->get()->map(function ($dislike) {
             // Access the profile from the like
        $profile = $dislike->user->profile;

        // Convert the profile's trades to the old structure
        $profileTrades = $this->convertTradesToOldStructure($profile->trades);

        // Merge the converted trades back into the profile's data
        $profileData = $profile->toArray(); // Convert the profile to an array
        $profile = array_merge($profileData,$profileTrades );

        // Return the profile with its trades converted
        return $profile;
        });
        return response()->json($dislikes);
    }
}

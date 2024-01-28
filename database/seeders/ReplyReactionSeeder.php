<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\CommentReaction;

class ReplyReactionSeeder extends Seeder
{
    public function run()
    {
        // Fetch all users and replies (comments with a parent_id)
        $users = User::all();
        $replies = Comment::whereNotNull('parent_id')->get();

        // Iterate over each reply and randomly add reactions
        foreach ($replies as $reply) {
            $users->random(rand(1, 3))->each(function ($user) use ($reply) {
                CommentReaction::create([
                    'comment_id' => $reply->id,
                    'user_id' => $user->id,
                    'type' => rand(0, 1) ? 'like' : 'dislike',
                ]);
            });
        }
    }
}
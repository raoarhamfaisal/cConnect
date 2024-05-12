<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\CommentReaction;

class CommentReactionSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $comments = Comment::all();

        foreach ($comments as $comment) {
            $users->random(rand(1, 5))->each(function ($user) use ($comment) {
                CommentReaction::create([
                    'comment_id' => $comment->id,
                    'user_id' => $user->id,
                    'type' => rand(0, 1) ? 'like' : 'dislike',
                ]);
            });
        }
    }
}

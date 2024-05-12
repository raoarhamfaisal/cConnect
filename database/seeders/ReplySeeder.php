<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;

class ReplySeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $comments = Comment::whereNull('parent_id')->get();

        foreach ($comments as $comment) {
            $users->random(rand(1, 3))->each(function ($user) use ($comment) {
                Comment::create([
                    'post_id' => $comment->post_id,
                    'user_id' => $user->id,
                    'parent_id' => $comment->id,
                    'body' => fake()->sentence,
                ]);
            });
        }
    }
}

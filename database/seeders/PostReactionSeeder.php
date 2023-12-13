<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Models\PostReaction;

class PostReactionSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $posts = Post::all();

        foreach ($posts as $post) {
            $users->random(rand(1, 10))->each(function ($user) use ($post) {
                PostReaction::create([
                    'post_id' => $post->id,
                    'user_id' => $user->id,
                    'type' => rand(0, 1) ? 'like' : 'dislike',
                ]);
            });
        }
    }
}
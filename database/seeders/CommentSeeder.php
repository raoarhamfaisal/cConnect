<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $posts = Post::all();

        foreach ($posts as $post) {
            $users->random(rand(1, 5))->each(function ($user) use ($post) {
                Comment::create([
                    'post_id' => $post->id,
                    'user_id' => $user->id,
                    'body' => fake()->sentence,
                ]);
            });
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Trade;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 500 posts
        $posts = Post::factory(500)->create();

        foreach ($posts as $post) {
            // Associate random trades with the post
            $randomTrades = Trade::inRandomOrder()->take(rand(1, 30))->get();
            $post->trades()->attach($randomTrades);
        }
    }
}

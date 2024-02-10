<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'region_id' => fake()->numberBetween(1, 11),
            'user_id' => $this->faker->numberBetween(1, 10),
            'view' => 1,
            'title' => $this->faker->realText(20),
            'image' => $this->faker->imageUrl(640, 480),
            'body1' => $this->faker->text(),
            'body2' => $this->faker->text(),
            'body1Bold' => $this->faker->numberBetween(0, 1),
            'body1ColorId' => $this->faker->numberBetween(0, 22),

            'likes' => $this->faker->numberBetween(0, 100),
            'repost' => $this->faker->numberBetween(0, 100),
            'shares' => $this->faker->numberBetween(0, 100),

            'longitude' => $this->faker->numberBetween(0, 1),
            'latitude' => $this->faker->numberBetween(0, 1),
        ];
    }
}

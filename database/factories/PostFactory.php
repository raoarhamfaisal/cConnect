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

            'trade1' => $this->faker->numberBetween(0, 1),
            'trade2' => $this->faker->numberBetween(0, 1),
            'trade3' => $this->faker->numberBetween(0, 1),
            'trade4' => $this->faker->numberBetween(0, 1),
            'trade5' => $this->faker->numberBetween(0, 1),
            'trade6' => $this->faker->numberBetween(0, 1),
            'trade7' => $this->faker->numberBetween(0, 1),
            'trade8' => $this->faker->numberBetween(0, 1),
            'trade9' => $this->faker->numberBetween(0, 1),
            'trade10' => $this->faker->numberBetween(0, 1),
            'trade11' => $this->faker->numberBetween(0, 1),
            'trade12' => $this->faker->numberBetween(0, 1),
            'trade13' => $this->faker->numberBetween(0, 1),
            'trade14' => $this->faker->numberBetween(0, 1),
            'trade15' => $this->faker->numberBetween(0, 1),
            'trade16' => $this->faker->numberBetween(0, 1),
            'trade17' => $this->faker->numberBetween(0, 1),
            'trade18' => $this->faker->numberBetween(0, 1),
            'trade19' => $this->faker->numberBetween(0, 1),
            'trade20' => $this->faker->numberBetween(0, 1),
            'trade21' => $this->faker->numberBetween(0, 1),
            'trade22' => $this->faker->numberBetween(0, 1),
            'trade23' => $this->faker->numberBetween(0, 1),
            'trade24' => $this->faker->numberBetween(0, 1),
            'trade25' => $this->faker->numberBetween(0, 1),
            'trade26' => $this->faker->numberBetween(0, 1),
            'trade27' => $this->faker->numberBetween(0, 1),
            'trade28' => $this->faker->numberBetween(0, 1),
            'trade29' => $this->faker->numberBetween(0, 1),
            'trade30' => $this->faker->numberBetween(0, 1),

            'longitude' => $this->faker->numberBetween(0, 1),
            'latitude' => $this->faker->numberBetween(0, 1),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReviewResponse>
 */
class ReviewResponseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'review_id' => $this->faker->numberBetween(1, 1000),
            'response_text' => $this->faker->text(),
            'response_date' => $this->faker->dateTime($max = 'now')
        ];  
    }
}

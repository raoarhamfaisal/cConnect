<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\ReviewResponse;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'reviewer_id' => Profile::inRandomOrder()->first()->id,
            'contractor_id' => Profile::inRandomOrder()->first()->id,
            'response_id' => ReviewResponse::inRandomOrder()->first()->id,
            'rating' => $this->faker->numberBetween(1, 5),
            'rating_text' => $this->faker->text(),
            'rating_date' => $this->faker->dateTime($max = 'now'),
            'is_review_active' => 1,
            'hired_by_contractor' => $this->faker->numberBetween(0, 1),
            'paid_on_time' => $this->faker->numberBetween(0, 1),
            'hired_contractor' => $this->faker->numberBetween(0, 1),
            'give_full_payment' => $this->faker->numberBetween(0, 1),
            'how_did_you_meet_this_contractor' => 'cConnect Referral'
        ];
    }
}


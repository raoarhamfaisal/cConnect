<?php

namespace Database\Factories;

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
            'profile_id' => $this->faker->numberBetween(1, 4),
            'contractor_id' => $this->faker->numberBetween(1, 4),
            'rating' => $this->faker->numberBetween(1, 5),
            'rating_text' => $this->faker->text(),
            'rating_date' => $this->faker->dateTime($max = 'now'),
            'on_appeal_reason' => $this->faker->text(),
            'on_appeal_reason_date' => $this->faker->dateTime($max = 'now'),
            'off_appeal_reason' => $this->faker->text(),
            'off_appeal_reason_date' => $this->faker->dateTime($max = 'now'),
            'is_under_appeal' => $this->faker->numberBetween(0, 1),
            'hired_by_contractor' => $this->faker->numberBetween(0, 1),
            'paid_on_time' => $this->faker->numberBetween(0, 1),
            'hired_contractor' => $this->faker->numberBetween(0, 1),
            'give_full_payment' => $this->faker->numberBetween(0, 1),
            'how_did_you_meet_this_contractor' => 'tContractor Referral'
        ];

    }
}

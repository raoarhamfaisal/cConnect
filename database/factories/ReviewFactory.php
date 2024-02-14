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
        $appeal_status = $this->faker->randomElement(['open', 'on_hold', 'approved', 'denied']);

        $is_review_active = 1; 
        $is_under_appeal = 1;

        if($appeal_status === "open") {
            $is_review_active = 1;
            $is_under_appeal = 1;
        }else if($appeal_status === "on_hold") {
            $is_review_active = 1;
            $is_under_appeal = 1;
        }else if($appeal_status === "approved") {
            $is_review_active = 0;
            $is_under_appeal = 0;
        }else if($appeal_status === "denied") {
            $is_review_active = 1;
            $is_under_appeal = 0;
        }

        return [
            'reviewer_id' => Profile::inRandomOrder()->first()->id,
            'contractor_id' => Profile::inRandomOrder()->first()->id,
            'response_id' => ReviewResponse::inRandomOrder()->first()->id,
            'rating' => $this->faker->numberBetween(1, 5),
            'rating_text' => $this->faker->text(),
            'rating_date' => $this->faker->dateTime($max = 'now'),
            'on_appeal_reason' => $this->faker->text(),
            'on_appeal_reason_date' => $this->faker->dateTime($max = 'now'),
            'appeal_status' => $appeal_status,
            'is_review_active' => $is_review_active,
            'is_under_appeal' => $is_under_appeal,
            'hired_by_contractor' => $this->faker->numberBetween(0, 1),
            'paid_on_time' => $this->faker->numberBetween(0, 1),
            'hired_contractor' => $this->faker->numberBetween(0, 1),
            'give_full_payment' => $this->faker->numberBetween(0, 1),
            'how_did_you_meet_this_contractor' => 'tContractor Referral'
        ];
    }
}


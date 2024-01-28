<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Review;
use App\Models\ReviewResponse;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RatingReason>
 */
class RatingReasonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Decide whether to generate a 'review_id' or 'response_id'.
        $generateReviewId = $this->faker->boolean(50); // 50% chance to choose either.

        if ($generateReviewId) {
            $reviewId = Review::inRandomOrder()->first()?->id;
            $responseId = null;
        } else {
            $reviewId = null;
            $responseId = ReviewResponse::inRandomOrder()->first()?->id;
        }

        return [
            'review_id' => $reviewId,
            'response_id' => $responseId,
            'reason' => $this->faker->text(1000),
            'reason_date' => now(),
            'type' => $this->faker->randomElement([
                'updated_review',
                'deleted_review',
                'deactivated_review',
                'activated_review',
                'updated_review_response',
                'deleted_review_response',
                'deactivated_review_response',
                'activated_review_response',
            ]),
        ];    
    }
}

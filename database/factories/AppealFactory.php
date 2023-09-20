<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appeal>
 */
class AppealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $appeal_status = $this->faker->randomElement(['open', 'on_hold', 'approved']);

        $is_under_appeal = 1;

        if($appeal_status === "open") {
            $is_under_appeal = 1;
        }else if($appeal_status === "on_hold") {
            $is_under_appeal = 1;
        }else if($appeal_status === "approved") {
            $is_under_appeal = 0;
        }

        return [
            'review_id' => $this->faker->numberBetween(1, 1000),
            'on_appeal_reason' => $this->faker->text(),
            'on_appeal_reason_date' => $this->faker->dateTime($max = 'now'),
            'appeal_status' => $appeal_status,
            'is_under_appeal' => $is_under_appeal,
        ];
    }
}

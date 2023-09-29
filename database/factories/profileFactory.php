<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class profileFactory extends Factory
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
            'active_user' => fake()->numberBetween(0, 1),
            'is_payment_verified' => 1,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'company_name' => fake()->company(),
            'website_url' => "https://website_url.com",
            'facebook' => "https://facebook.com",
            'twitter' => "https://twitter.com",
            'tiktok' => "https://tiktok.com",
            'instagram' => "https://instagram.com",
            'address_1' => fake()->address(),
            'address_2' => fake()->address(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'zipcode' => fake()->postcode(),
            'county' => fake()->state(),
            'counrty' => fake()->country(),
            'email' => fake()->unique()->safeEmail(),
            'phone_cell' => fake()->phoneNumberWithExtension(),
            'phone_office' => fake()->phoneNumberWithExtension(),
            'user_avatar' => fake()->imageUrl(640, 480),
            'company_logo' => fake()->imageUrl(640, 480),
            'business_start' => fake()->date(),
            'view_locale' => fake()->numberBetween(0, 1),
            'view_regional' => fake()->numberBetween(0, 1),
            'view_statewide' => fake()->numberBetween(0, 1),
            'view_nationwide' => fake()->numberBetween(0, 1),
            'view_following' => fake()->numberBetween(0, 1),
        ];
    }
}

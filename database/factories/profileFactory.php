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
            'region_id' => fake()->numberBetween(1, 5),
            'active_user' => fake()->numberBetween(0, 1),
            'first_name' => fake()->name(),
            'last_name' => fake()->name(),
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
            'view_territorial' => fake()->numberBetween(0, 1),
            'view_regional' => fake()->numberBetween(0, 1),
            'view_statewide' => fake()->numberBetween(0, 1),
            'view_nationwide' => fake()->numberBetween(0, 1),
            'view_following' => fake()->numberBetween(0, 1),
            'view_groups' => fake()->numberBetween(0, 1),
            'trade1' => fake()->numberBetween(0, 1),
            'trade2' => fake()->numberBetween(0, 1),
            'trade3' => fake()->numberBetween(0, 1),
            'trade4' => fake()->numberBetween(0, 1),
            'trade5' => fake()->numberBetween(0, 1),
            'trade6' => fake()->numberBetween(0, 1),
            'trade7' => fake()->numberBetween(0, 1),
            'trade8' => fake()->numberBetween(0, 1),
            'trade9' => fake()->numberBetween(0, 1),
            'trade10' => fake()->numberBetween(0, 1),
            'trade11' => fake()->numberBetween(0, 1),
            'trade12' => fake()->numberBetween(0, 1),
            'trade13' => fake()->numberBetween(0, 1),
            'trade14' => fake()->numberBetween(0, 1),
            'trade15' => fake()->numberBetween(0, 1),
            'trade16' => fake()->numberBetween(0, 1),
            'trade17' => fake()->numberBetween(0, 1),
            'trade18' => fake()->numberBetween(0, 1),
            'trade19' => fake()->numberBetween(0, 1),
            'trade20' => fake()->numberBetween(0, 1),
            'trade21' => fake()->numberBetween(0, 1),
            'trade22' => fake()->numberBetween(0, 1),
            'trade23' => fake()->numberBetween(0, 1),
            'trade24' => fake()->numberBetween(0, 1),
            'trade25' => fake()->numberBetween(0, 1),
            'trade26' => fake()->numberBetween(0, 1),
            'trade27' => fake()->numberBetween(0, 1),
            'trade28' => fake()->numberBetween(0, 1),
            'trade29' => fake()->numberBetween(0, 1),
            'trade30' => fake()->numberBetween(0, 1),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude()
        ];
    }
}

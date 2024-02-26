<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Trade;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RegionSeeder::class,
            TradeSeeder::class,
            UserSeeder::class,
            PostSeeder::class,
            ProfileSeeder::class,
            ReviewResponseSeeder::class,
            ReviewSeeder::class,
            RatingReasonSeeder::class,
            AppealSeeder::class,

        ]);

        \App\Models\User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password            
            'remember_token' => Str::random(10),
            'posts_privileges' => 1,
            'appeals_privileges' => 1,
            'users_privileges' => 1,
            'payments_privileges' => 1
        ]);


        $profile = \App\Models\Profile::factory()->create([
            'user_id' => 11,
            'region_id' => 1,
            'active_user' => 1,
            'is_payment_verified' => 1,
            'first_name' => 'Admin',
            'last_name' => 'User',
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
        ]);
        // Associate random trades with the profile
        $randomTrades = Trade::inRandomOrder()->take(rand(1, 30))->get();
        $profile->trades()->attach($randomTrades);        
    }
}

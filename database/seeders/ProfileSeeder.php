<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use App\Models\Trade;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $profile = Profile::factory()->create([
                'user_id' => $user->id,
            ]);

            // Associate random trades with the profile
            $randomTrades = Trade::inRandomOrder()->take(rand(1, 30))->get();
            $profile->trades()->attach($randomTrades);        
        }
    }
}

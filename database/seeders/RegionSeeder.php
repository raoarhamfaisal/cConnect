<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Region;
class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $regions = [
            "Multan",
            "Karachi",
            "Lahore",
            "Islamabad",
            "Rawalpindi",
            "Khanwal",
            "Faisalabad",
            "Peshawar",
            "Quetta",
            "Sialkot",
            "Gujranwala",
            "Hyderabad",
        ];

        foreach ($regions as $region) {
            Region::factory()->create([
                'name' => $region,
            ]);
        }

    }
}

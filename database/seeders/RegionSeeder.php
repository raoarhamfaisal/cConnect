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
            "1001 Dallas, TX",
            "1002 Houston, TX",
            "1003 San Antonio, TX",
            "1004 Austin, TX",
            "2001 Phoenix, AZ",
            "2002 Tucson, AZ",
            "2003 Albuquerque, NM",
            "2004 Oklahoma City, OK",
            "3001 Los Angeles, CA",
            "3002 San Diego, CA",
            "3003 San Francisco/San Jose, CA",
            "3004 Las Vegas, NV",
        ];

        foreach ($regions as $region) {
            Region::factory()->create([
                'name' => $region,
            ]);
        }

    }
}

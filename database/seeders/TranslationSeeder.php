<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Translation;

class TranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $translations = [
            ['key' => 'welcome', 'english' => 'Welcome', 'mexican_spanish' => 'Bienvenido', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'goodbye', 'english' => 'Goodbye', 'mexican_spanish' => 'Adiós', 'created_at' => now(), 'updated_at' => now()],
            // Add more translation arrays here
        ];

        Translation::insert($translations);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\PostColor;


class PostColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $textColors = [
            "#000000",
            "#ffffff",
            "#2C3E50",
            "#34495E",
            "#7F8C8D",
            "#27AE60",
            "#2980B9",
            "#8E44AD",
            "#F39C12",
        ];
        $backgroundColors = [
            "#ffffff",
  "#000000",

  "#2C3E50",
    "#7F8C8D",
  "#27AE60",
  "#2980B9",
  "#8E44AD",
    "#F39C12",
    "#D35400", // Pumpkin
    "#C0392B", // Pomegranate
  "#E74C3C", // Red
  "#E84393", // Plum
  "#2E4053", // Midnight Blue



        ];
            
        foreach ($textColors as $color) {
            PostColor::create(['color' => $color, 'type' => 'text_color']);
        }
    
        foreach ($backgroundColors as $color) {
            PostColor::create(['color' => $color, 'type' => 'background_color']);
        }
    }
}

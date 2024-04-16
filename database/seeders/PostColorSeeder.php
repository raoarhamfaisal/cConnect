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
            "#000000", // Black
            "#FFFFFF", // White
            "#FF0000", // Red
            "#00FF00", // Lime
            "#0000FF", // Blue
            "#FFFF00", // Yellow
            "#00FFFF", // Cyan / Aqua
            "#FF00FF", // Magenta / Fuchsia
            "#C0C0C0", // Silver
            "#808080", // Gray
            "#800000", // Maroon
            "#808000", // Olive
        ];
        $backgroundColors = [
            "#FFC0CB", // Pink
            "#FFA07A", // Light Salmon
            "#20B2AA", // Light Sea Green
            "#87CEFA", // Light Sky Blue
            "#778899", // Light Slate Gray
            "#B0C4DE", // Light Steel Blue
            "#FFFFE0", // Light Yellow
            "#00FA9A", // Medium Spring Green
            "#48D1CC", // Medium Turquoise
            "#C71585", // Medium Violet Red
            "#191970", // Midnight Blue
            "#F5FFFA", // Mint Cream
        ];
            
        foreach ($textColors as $color) {
            PostColor::create(['color' => $color, 'type' => 'text_color']);
        }
    
        foreach ($backgroundColors as $color) {
            PostColor::create(['color' => $color, 'type' => 'background_color']);
        }
    }
}

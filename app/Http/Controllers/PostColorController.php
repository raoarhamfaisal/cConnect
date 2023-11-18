<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostColor;


class PostColorController extends Controller
{
    public function getTextColors()
    {
        $textColors = PostColor::where('type', 'text_color')->get();
        return response()->json(['textColors' => $textColors]);
    }
    
    public function getBackgroundColors()
    {
        $backgroundColors = PostColor::where('type', 'background_color')->get();
        return response()->json(['backgroundColors' => $backgroundColors]);
    }
}

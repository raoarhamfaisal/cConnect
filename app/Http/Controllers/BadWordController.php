<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BadWord;


class BadWordController extends Controller
{
    public function index()
    {
        $badWords = BadWord::pluck('word'); // Retrieves only the 'word' column as an array
        return response()->json($badWords);
    }
}

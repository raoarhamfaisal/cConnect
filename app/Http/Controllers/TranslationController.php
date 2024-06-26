<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Translation;

class TranslationController extends Controller
{
    public function index()
    {
        $translations = Translation::all();
        return response()->json($translations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|unique:translations',
            'english' => 'required|text',
            'mexican_spanish' => 'required|text',
        ]);

        $translation = Translation::create($request->all());
        return response()->json($translation, 201);
    }

}

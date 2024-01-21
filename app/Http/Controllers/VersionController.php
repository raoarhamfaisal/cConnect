<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\VersionDefault; 
use Illuminate\Support\Facades\Auth;

class VersionController extends Controller
{
    public function getUserVersion()
    {
        $user = Auth::user();
        // Assuming the user model has a relation 'version' to get the user's version
        $userVersion = $user->profile->version;
        return response()->json(['logged_in_user_version' => $userVersion]);
    }

    public function getAllVersions()
    {
        $versions = VersionDefault::all();
        return response()->json($versions);
    }
}

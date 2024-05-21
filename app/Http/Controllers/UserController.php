<?php

namespace App\Http\Controllers;

use App\Models\User;


use Illuminate\Http\Request;

class UserController extends Controller
{
    public function blockUser(Request $request, $userId)
    {
        $userToBlock = User::findOrFail($userId);
        $request->user()->blockedUsers()->attach($userToBlock);

        return response()->json(['message' => 'User successfully blocked']);
    }

    public function unblockUser(Request $request, $userId)
    {
        $userToUnblock = User::findOrFail($userId);
        $request->user()->blockedUsers()->detach($userToUnblock);

        return response()->json(['message' => 'User successfully unblocked']);
    }

    public function listBlockedUsers(Request $request)
    {
        // Retrieve the logged-in user
        $user = $request->user();
    
        // If the user is not found, return an error
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Retrieve all users that the current user has blocked, including their profiles
        $blockedUsers = $user->blockedUsers()->with('profile')->get();
    
        // Transform the collection to include only necessary data
        $blockedUsersData = $blockedUsers->transform(function ($blockedUser) {
            return [
                'id' => $blockedUser->id,
                'name' => $blockedUser->name, // or first_name and last_name, depending on your schema
                'email' => $blockedUser->email,
                'profile' => $blockedUser->profile, // This includes the entire profile. You may adjust to include specific fields.
            ];
        });
    
        return response()->json(['blocked_users' => $blockedUsersData]);
    }
    


}

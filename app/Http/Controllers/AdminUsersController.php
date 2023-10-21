<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;

class AdminUsersController extends Controller
{
    /**
     * Get all users of a region
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */

    public function getAllUsersOfARegion(Request $request, $regionId)
    {
        $search = $request->query('search'); // Get the search from the query parameters
        $sortByDate = $request->query('sort_by_date', 'latest'); // Default to latest
    
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15);  // Default to 15 if not provided
        $page = $request->query('page', 1);          // Default to page 1 if not provided
        
        // Query
        $query = null;
        
        if($regionId === "0" || $regionId === 0) {
            $query = User::latest();
        }else {
            $query = User::whereHas('profile', function($q) use ($regionId) {
                $q->where('region_id', $regionId);
            });
        }
    
        // Add search criteria if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', '%'.$search.'%')
                ->orWhere('last_name', 'like', '%'.$search.'%')
                ->orWhereHas('profile', function($q) use ($search) {
                    $q->where('email', 'like', '%'.$search.'%');
                });
            });
        }
    
        // Sort by date
        if ($sortByDate === 'latest') {
            $query->latest();
        } else {
            $query->oldest();
        }
    
        // Fetch with profile (only specified fields) and paginate
        $users = $query->with(['profile' => function($q) {
            $q->select('user_id', 'region_id', 'active_user', 'is_payment_verified', 'first_name', 'last_name', 'company_name', 'email', 'notes_on_user');
        }])->paginate($perPage, ['*'], 'page', $page);
    
        // Convert the paginated results to arrays
        $usersArray = $users->toArray();
    
        // Construct the response
        $response = [
            'users' => $usersArray['data'],
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ]
        ];
    
        return response()->json($response);
    }

    public function updateProfile(Request $request, $userId) {
        // Validate input
        $data = $request->validate([
            'region_id' => 'nullable|integer|exists:regions,id', // Ensure the region_id exists in the regions table
            'active_user' => 'nullable|boolean',
            'is_payment_verified' => 'nullable|boolean',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:50|unique:profiles,email,'.$userId.',user_id',
            'notes_on_user' => 'nullable|string'
        ]);

        // Fetch the profile for the user
        $profile = Profile::where('user_id', $userId)->firstOrFail();

        // Fetch the user
        $user = User::where('id', $userId)->firstOrFail();


        // Update the profile with the validated data
        $profile->update($data);

        // Update the user with the validated data
        $user->update($data);


        return response()->json(['message' => 'Profile updated successfully!']);
    }

          


}

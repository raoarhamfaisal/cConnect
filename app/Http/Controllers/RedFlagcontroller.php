<?php

namespace App\Http\Controllers;

use App\Models\RedFlag;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedFlagController extends Controller
{
    // Create a new red flag
    public function store(Request $request)
    {
        $request->validate([
            'region_id' => 'required|exists:regions,id',
            'name_of_the_contractor_or_customer' => 'required|string|max:255',
            'complaint' => 'required|string',
            'red_flag_date' => 'required|date',
            'is_contractor_or_customer' => 'required|boolean',
        ]);

        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }
        

        $redFlag = RedFlag::create([
            'profile_id' => $profile->id,
            'region_id' => $request->region_id,
            // 'first_name' => $profile->first_name, // Added
            // 'last_name' => $profile->last_name,   // Added
            // 'city' => $profile->city,             // Added
            // 'state' => $profile->state,  
            'name_of_the_contractor_or_customer' => $request->name_of_the_contractor_or_customer,
            'complaint' => $request->complaint,
            'red_flag_date' => $request->red_flag_date,
            'is_contractor_or_customer' => $request->is_contractor_or_customer,
        ]);

        return response()->json($redFlag, 201);
    }

    // Update a red flag
    public function update(Request $request, RedFlag $redFlag)
    {

        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }


        if($profile->id !== $redFlag->profile_id) {
            return response()->json(["error" => true, "errorMessage" => "You are not allowed to update this red flag!"]);

        }
        

        $request->validate([
            'region_id' => 'required|exists:regions,id',
            'name_of_the_contractor_or_customer' => 'required|string|max:255',
            'complaint' => 'required|string',
            'red_flag_date' => 'required|date',
            'is_contractor_or_customer' => 'required|boolean',
        ]);

        $redFlag->update($request->all());

        return response()->json($redFlag, 200);
    }

    // Delete a red flag
    public function destroy(RedFlag $redFlag)
    {

        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }


        if($profile->id !== $redFlag->profile_id) {
            return response()->json(["error" => true, "errorMessage" => "You are not allowed to update this red flag!"]);

        }

        $redFlag->delete();

        return response()->json(['message' => "Red Flag deleted successfully!"], 200);
    }

    // Get all red flags with filters and sorting
    // public function index(Request $request)
    // {
    //     $query = RedFlag::query();

    //     // Filtering
    //     if ($request->has('name_of_the_contractor_or_customer')) {
    //         $query->where('name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
    //     }

    //     if ($request->has('is_contractor_or_customer')) {
    //         $query->where('is_contractor_or_customer', $request->is_contractor_or_customer);
    //     }

    //     if ($request->has('region_id')) {
    //         $query->where('region_id', $request->region_id);
    //     }

    //     if ($request->has('red_flag_date')) {
    //         $query->whereDate('red_flag_date', $request->red_flag_date);
    //     }

    //     // Sorting
    //     $sortField = $request->get('sort_field', 'red_flag_date'); // Default sort field
    //     $sortOrder = $request->get('sort_order', 'asc'); // Default sort order

    //     // Validate sort field and order
    //     $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'red_flag_date'];
    //     $validSortOrders = ['asc', 'desc'];

    //     if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
    //         $query->orderBy($sortField, $sortOrder);
    //     }

    //     $redFlags = $query->get();

    //     return response()->json($redFlags, 200);
    // }

    public function index(Request $request)
{
    $query = RedFlag::query();

    // Join with the Profile table to fetch profile details
    $query->join('profiles', 'red_flags.profile_id', '=', 'profiles.id')
          ->select('red_flags.*', 'profiles.first_name', 'profiles.last_name', 'profiles.city', 'profiles.state');

    // Filtering
    if ($request->has('name_of_the_contractor_or_customer')) {
        $query->where('red_flags.name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
    }

    if ($request->has('is_contractor_or_customer')) {
        $query->where('red_flags.is_contractor_or_customer', $request->is_contractor_or_customer);
    }

    if ($request->has('region_id')) {
        $query->where('red_flags.region_id', $request->region_id);
    }

    if ($request->has('red_flag_date')) {
        $query->whereDate('red_flags.red_flag_date', $request->red_flag_date);
    }

    // Include profile_id in the filter if provided in the request
    if ($request->has('profile_id')) {
        $query->where('profiles.id', $request->profile_id);
    }

    // Sorting
    $sortField = $request->get('sort_field', 'red_flag_date'); // Default sort field
    $sortOrder = $request->get('sort_order', 'asc'); // Default sort order

    // Validate sort field and order
    $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'red_flag_date'];
    $validSortOrders = ['asc', 'desc'];

    if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
        $query->orderBy($sortField, $sortOrder);
    }

    $redFlags = $query->get();

    return response()->json($redFlags, 200);
}



    // Get red flags created by the authenticated user
    // public function myFlags(Request $request)
    // {
    //     // Get current user id
    //     $userID = Auth()->user('')->id;
    //     $profile = null;


    //     // Get the profile information if the user id exists
    //     if($userID) {
    //         $profile = Profile::where('user_id', $userID)->first();
    //     }


    //     $query = RedFlag::where('profile_id', $profile->id);

    //     // Filtering
    //     if ($request->has('name_of_the_contractor_or_customer')) {
    //         $query->where('name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
    //     }

    //     if ($request->has('is_contractor_or_customer')) {
    //         $query->where('is_contractor_or_customer', $request->is_contractor_or_customer);
    //     }

    //     if ($request->has('region_id')) {
    //         $query->where('region_id', $request->region_id);
    //     }

    //     if ($request->has('red_flag_date')) {
    //         $query->whereDate('red_flag_date', $request->red_flag_date);
    //     }

    //     // Sorting
    //     $sortField = $request->get('sort_field', 'red_flag_date'); // Default sort field
    //     $sortOrder = $request->get('sort_order', 'asc'); // Default sort order

    //     // Validate sort field and order
    //     $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'red_flag_date'];
    //     $validSortOrders = ['asc', 'desc'];

    //     if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
    //         $query->orderBy($sortField, $sortOrder);
    //     }

    //     $redFlags = $query->get();

    //     return response()->json($redFlags, 200);
    // }

    public function myFlags(Request $request)
{
    // Get current user id
    $userID = Auth()->user()->id;

    // Initialize the query with a join on the profiles table
    $query = RedFlag::query()
        ->join('profiles', 'red_flags.profile_id', '=', 'profiles.id')
        ->where('profiles.user_id', $userID)
        ->select('red_flags.*', 'profiles.first_name', 'profiles.last_name', 'profiles.city', 'profiles.state');

    // Filtering
    if ($request->has('name_of_the_contractor_or_customer')) {
        $query->where('red_flags.name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
    }

    if ($request->has('is_contractor_or_customer')) {
        $query->where('red_flags.is_contractor_or_customer', $request->is_contractor_or_customer);
    }

    if ($request->has('region_id')) {
        $query->where('red_flags.region_id', $request->region_id);
    }

    if ($request->has('red_flag_date')) {
        $query->whereDate('red_flags.red_flag_date', $request->red_flag_date);
    }

    // Sorting
    $sortField = $request->get('sort_field', 'red_flag_date'); // Default sort field
    $sortOrder = $request->get('sort_order', 'asc'); // Default sort order

    // Validate sort field and order
    $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'red_flag_date'];
    $validSortOrders = ['asc', 'desc'];

    if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
        $query->orderBy($sortField, $sortOrder);
    }

    $redFlags = $query->get();

    return response()->json($redFlags, 200);
}

}


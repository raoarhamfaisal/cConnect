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
            'is_contractor_or_customer' => 'required|boolean',
        ]);

        $userID = Auth::user()->id;
        $profile = Profile::where('user_id', $userID)->firstOrFail();

        $redFlag = RedFlag::create([
            'profile_id' => $profile->id,
            'region_id' => $request->region_id,
            'name_of_the_contractor_or_customer' => $request->name_of_the_contractor_or_customer,
            'complaint' => $request->complaint,
            'is_contractor_or_customer' => $request->is_contractor_or_customer,
        ]);

        return response()->json($redFlag, 201);
    }

    // Update a red flag
    public function update(Request $request, RedFlag $redFlag)
    {
        $userID = Auth::user()->id;
        $profile = Profile::where('user_id', $userID)->firstOrFail();

        if ($profile->id !== $redFlag->profile_id) {
            return response()->json(["error" => true, "errorMessage" => "You are not allowed to update this red flag!"], 403);
        }

        $request->validate([
            'region_id' => 'required|exists:regions,id',
            'name_of_the_contractor_or_customer' => 'required|string|max:255',
            'complaint' => 'required|string',
            'is_contractor_or_customer' => 'required|boolean',
        ]);

        $redFlag->update($request->all());

        return response()->json($redFlag, 200);
    }

    // Delete a red flag
    public function destroy(RedFlag $redFlag)
    {
        $userID = Auth::user()->id;
        $profile = Profile::where('user_id', $userID)->firstOrFail();

        if ($profile->id !== $redFlag->profile_id) {
            return response()->json(["error" => true, "errorMessage" => "You are not allowed to delete this red flag!"], 403);
        }

        $redFlag->delete();

        return response()->json(['message' => "Red Flag deleted successfully!"], 200);
    }

    // Get all red flags with filters and sorting
    public function index(Request $request)
    {
        // Determine pagination parameters
        $perPage = $request->query('per_page', 15);  // Default to 15 if not provided
        $page = $request->query('page', 1);          // Default to page 1 if not provided
    
        $query = RedFlag::query();
    
        // Filtering
        if ($request->has('name_of_the_contractor_or_customer')) {
            $query->where('name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
        }
    
        if ($request->has('is_contractor_or_customer')) {
            $query->where('is_contractor_or_customer', $request->is_contractor_or_customer);
        }
    
        if ($request->has('region_id')) {
            $query->where('region_id', $request->region_id);
        }
    
        // Sorting
        $sortField = $request->get('sort_field', 'updated_at'); // Default sort field
        $sortOrder = $request->get('sort_order', 'desc');       // Default sort order
    
        $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'updated_at'];
        $validSortOrders = ['asc', 'desc'];
    
        if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
            $query->orderBy($sortField, $sortOrder);
        }
    
        // Paginate the results
        $redFlags = $query->paginate($perPage, ['*'], 'page', $page);
    
        // Construct the response
        $response = [
            'red_flags' => $redFlags->items(),
            'pagination' => [
                'current_page' => $redFlags->currentPage(),
                'last_page' => $redFlags->lastPage(),
                'per_page' => $redFlags->perPage(),
                'total' => $redFlags->total(),
            ]
        ];
    
        return response()->json($response);
    }
    
    // Get red flags created by the authenticated user
    public function myFlags(Request $request)
    {
        $userID = Auth::user()->id;
    
        // Determine pagination parameters
        $perPage = $request->query('per_page', 15);  // Default to 15 if not provided
        $page = $request->query('page', 1);          // Default to page 1 if not provided
    
        $query = RedFlag::query()
            ->where('profile_id', $userID);
    
        // Filtering
        if ($request->has('name_of_the_contractor_or_customer')) {
            $query->where('name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
        }
    
        if ($request->has('is_contractor_or_customer')) {
            $query->where('is_contractor_or_customer', $request->is_contractor_or_customer);
        }
    
        if ($request->has('region_id')) {
            $query->where('region_id', $request->region_id);
        }
    
        // Sorting
        $sortField = $request->get('sort_field', 'updated_at'); // Default sort field
        $sortOrder = $request->get('sort_order', 'desc');       // Default sort order
    
        $validSortFields = ['name_of_the_contractor_or_customer', 'region_id', 'updated_at'];
        $validSortOrders = ['asc', 'desc'];
    
        if (in_array($sortField, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
            $query->orderBy($sortField, $sortOrder);
        }
    
        // Paginate the results
        $myRedFlags = $query->paginate($perPage, ['*'], 'page', $page);
    
        // Construct the response
        $response = [
            'my_red_flags' => $myRedFlags->items(),
            'pagination' => [
                'current_page' => $myRedFlags->currentPage(),
                'last_page' => $myRedFlags->lastPage(),
                'per_page' => $myRedFlags->perPage(),
                'total' => $myRedFlags->total(),
            ]
        ];
    
        return response()->json($response);
    }
}

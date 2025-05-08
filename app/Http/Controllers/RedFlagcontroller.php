<?php

namespace App\Http\Controllers;

use App\Models\RedFlag;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ProcessDocumentService;

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
            'supporting_document' => 'nullable|string',
        ]);

        $userID = Auth::user()->id;
        $profile = Profile::where('user_id', $userID)->firstOrFail();

        $redFlag = RedFlag::create([
            'profile_id' => $profile->id,
            'region_id' => $request->region_id,
            'name_of_the_contractor_or_customer' => $request->name_of_the_contractor_or_customer,
            'complaint' => $request->complaint,
            'is_contractor_or_customer' => $request->is_contractor_or_customer,
            'supporting_document' => $request->supporting_document,
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
            'supporting_document' => 'nullable|string',
        ]);

        $redFlag->update(
            [...$request->only([
                'region_id',
                'name_of_the_contractor_or_customer',
                'complaint',
                'is_contractor_or_customer',
                'supporting_document',
            ])]
        );

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
    
       $query = RedFlag::with(['profile:id,first_name,last_name,city,state']);
    
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
    
        // $query = RedFlag::query()
        //     ->where('profile_id', $userID);
        $query = RedFlag::query()
        ->where('red_flags.profile_id', $userID)
        ->join('profiles', 'red_flags.profile_id', '=', 'profiles.id')
        ->select('red_flags.*', 'profiles.first_name', 'profiles.last_name', 'profiles.city', 'profiles.state');
    
        // Filtering
        if ($request->has('name_of_the_contractor_or_customer')) {
            $query->where('name_of_the_contractor_or_customer', 'like', '%' . $request->name_of_the_contractor_or_customer . '%');
        }
    
        if ($request->has('is_contractor_or_customer')) {
            $query->where('is_contractor_or_customer', $request->is_contractor_or_customer);
        }
    
        if ($request->has('region_id')) {
            $query->where('red_flags.region_id', $request->region_id);
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
        $transformedRedFlags = $myRedFlags->getCollection()->map(function ($redFlag) {
            return [
                'id' => $redFlag->id,
                'profile_id' => $redFlag->profile_id,
                'region_id' => $redFlag->region_id,
            'name_of_the_contractor_or_customer' => $redFlag->name_of_the_contractor_or_customer,
            'complaint' => $redFlag->complaint,
            'is_contractor_or_customer' => $redFlag->is_contractor_or_customer,
            'deleted_at' => $redFlag->deleted_at,
            'created_at' => $redFlag->created_at,
            'updated_at' => $redFlag->updated_at,
                'profile' => [
                    'first_name' => $redFlag->first_name,
                    'last_name' => $redFlag->last_name,
                    'city' => $redFlag->city,
                    'state' => $redFlag->state
                ]
            ];
        });
    
        // Update the paginator's collection
        $myRedFlags->setCollection($transformedRedFlags);   
        // Construct the response
        $response = [
            'red_flags' => $myRedFlags->items(),
            'pagination' => [
                'current_page' => $myRedFlags->currentPage(),
                'last_page' => $myRedFlags->lastPage(),
                'per_page' => $myRedFlags->perPage(),
                'total' => $myRedFlags->total(),
            ]
        ];
    
        return response()->json($response);
    }
    
    /**
     * Handle supporting document upload.
     */
    public function uploadSupportingDocument(Request $request, ProcessDocumentService $documentService)
    {
        if ($request->hasFile('supportingDocument')) {
            try {
                $path = $documentService->handleProcessDocument($request->file('supportingDocument'));
                return $path;
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
        }
        return response()->json(['error' => 'No file provided'], 400);
    }
}

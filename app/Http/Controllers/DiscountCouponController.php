<?php

namespace App\Http\Controllers;

use App\Models\DiscountCoupon;
use Illuminate\Http\Request;

class DiscountCouponController extends Controller
{
    // Create
    public function store(Request $request) {
        $data = $request->validate([
            'is_valid' => 'required|boolean',
            'region_id' => 'required|integer|exists:regions,id',
            '%_off_regular_price' => 'required|numeric',
            'months' => 'required|integer',
            'coupon_code' => 'required|string|unique:discount_coupons,coupon_code',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'notes' => 'nullable|string'
        ]);

        $coupon = DiscountCoupon::create($data);

        return response()->json(['message' => 'Coupon created successfully', 'data' => $coupon]);
    }

    public function index() {
        return DiscountCoupon::all();
    }

    public function getAllDiscountCouponsForARegion(Request $request, $regionId) {
        $search = $request->query('search'); // Get the search from the query parameters
        $sortByDate = $request->query('sort_by_date', 'latest'); // Default to latest
    
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15);  // Default to 15 if not provided
        $page = $request->query('page', 1);          // Default to page 1 if not provided

        // dd($regionId);
        // return response()->json(['region' => $regionId]);


        // Query
        $query = null;
        
        if($regionId === "0" || $regionId === 0) {
            // return response()->json(['region' => $regionId]);
            $query = DiscountCoupon::latest();
        }else {
            $query = DiscountCoupon::where('region_id', $regionId);
        }
    
        // Add search criteria if provided
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('coupon_code', 'like', '%'.$search.'%');
            });
        }
    
        // Sort by date
        if ($sortByDate === 'latest') {
            $query->latest();
        } else {
            $query->oldest();
        }
    
        // Fetch with profile (only specified fields) and paginate
        $couponCodes = $query->paginate($perPage, ['*'], 'page', $page);
    
        // Convert the paginated results to arrays
        $couponCodesArray = $couponCodes->toArray();
    
        // Construct the response
        $response = [
            'couponCodes' => $couponCodesArray['data'],
            'pagination' => [
                'current_page' => $couponCodes->currentPage(),
                'last_page' => $couponCodes->lastPage(),
                'per_page' => $couponCodes->perPage(),
                'total' => $couponCodes->total(),
            ]
        ];
    
        return response()->json($response);
        
    }

    // Read (Show specific record)
    public function show($id) {
        return DiscountCoupon::findOrFail($id);
    }

    // Update
    public function update(Request $request, $id) {
        $data = $request->validate([
            'is_valid' => 'boolean',
            'region_id' => 'integer|exists:regions,id',
            '%_off_regular_price' => 'numeric',
            'months' => 'integer',
            'coupon_code' => 'string|unique:discount_coupons,coupon_code,'.$id,
            'start_date' => 'date',
            'end_date' => 'date',
            'notes' => 'nullable|string'
        ]);

        $coupon = DiscountCoupon::findOrFail($id);
        $coupon->update($data);

        return response()->json(['message' => 'Coupon updated successfully', 'data' => $coupon]);
    }

    // Delete
    public function destroy($id) {
        $coupon = DiscountCoupon::findOrFail($id);
        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully']);
    }
}


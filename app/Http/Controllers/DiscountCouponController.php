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

    // Read (Index)
    public function index() {
        return DiscountCoupon::all();
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


<?php

namespace App\Http\Controllers;

use App\Models\PaymentInfo;
use Illuminate\Http\Request;

class PaymentInfoController extends Controller
{
    // Create
    public function store(Request $request) {
        $data = $request->validate([
            'region_id' => 'required|integer|exists:regions,id',
            'sales_tax' => 'required|numeric',
            'gold_billed_annual_price' => 'required|numeric',
            'gold_billed_monthly_price' => 'required|numeric',
            'gold_advertised_price' => 'required|numeric',
        ]);

        $paymentInfo = PaymentInfo::create($data);

        return response()->json(['message' => 'Created successfully', 'data' => $paymentInfo]);
    }

    // Read
    public function index() {
        return PaymentInfo::all();
    }

    public function show($id) {
        return PaymentInfo::findOrFail($id);
    }

    // Update
    public function update(Request $request, $id) {
        $data = $request->validate([
            'region_id' => 'integer|exists:regions,id',
            'sales_tax' => 'numeric',
            'gold_billed_annual_price' => 'numeric',
            'gold_billed_monthly_price' => 'numeric',
            'gold_advertised_price' => 'numeric',
        ]);

        $paymentInfo = PaymentInfo::findOrFail($id);
        $paymentInfo->update($data);

        return response()->json(['message' => 'Updated successfully', 'data' => $paymentInfo]);
    }

    // Delete
    public function destroy($id) {
        $paymentInfo = PaymentInfo::findOrFail($id);

        if(!$paymentInfo) {
            return response()->json(['message' => 'Payment Info Not Found', 'data' => $paymentInfo]);
        }


        $paymentInfo->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    
    public function paymetInfoOfARegion(Request $request, $regionId) {

        $paymentInfo = PaymentInfo::where('region_id', $regionId)->first();

        if(!$paymentInfo) {
            return response()->json(['message' => 'No payment info found for this region.']);
        }
        
        return response()->json(['message' => 'Payment information found.', 'paymentInfo' => $paymentInfo]);
    }

}

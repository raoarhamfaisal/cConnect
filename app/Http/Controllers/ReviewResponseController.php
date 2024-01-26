<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\ReviewResponse;

class ReviewResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validation
        $data = $request->validate([
            'response_text' => 'required|string|max:5000',  // max length is just an example, adjust as needed
            'review_id' => 'required|exists:reviews,id'
        ]);

        // Store the Review Response
        $reviewResponse = new ReviewResponse;
        $reviewResponse->response_text = $data['response_text'];
        $reviewResponse->review_id = $data['review_id'];
        $reviewResponse->response_date = now();  // Laravel's helper to get current date-time
        $reviewResponse->save();

        // Update the Review model with the response_id
        $review = Review::find($data['review_id']);
        $review->response_id = $reviewResponse->id;
        $review->save();

        return response()->json(['message' => 'Review response saved successfully!'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Validation
        $data = $request->validate([
            'response_id' => 'required|exists:review_responses,id',  // make sure the ID exists in the review_responses table
            'response_text' => 'required|string|max:5000',  // max length is just an example, adjust as needed
        ]);
    
        // Fetch the Review Response by ID
        $reviewResponse = ReviewResponse::find($data['response_id']);
    
        // Update the response_text
        $reviewResponse->response_text = $data['response_text'];
        $reviewResponse->save();
    
        return response()->json(['message' => 'Review response updated successfully!'], 200);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReviewResponse $reviewResponse)
    {
        // Get the associated review
        $review = Review::find($reviewResponse->review_id);
    
        // If the review exists, set its response_id to null
        if ($review) {
            $review->response_id = null;
            $review->save();
        }
    
        // Delete the Review Response
        $reviewResponse->delete();
    
        return response()->json(['message' => 'Review response deleted successfully!'], 200);
    }


    /**
     * Deactivate the review response
     *
     * @param  \App\Models\ReviewResponse  $review
     * @return \Illuminate\Http\Response
     */
    public function deactivate(Request $request, $id)
    {
        $review = ReviewResponse::findOrFail($id);

        $review->is_review_response_active = 0;

        $review->save();

        return response()->json(['message' => 'Review Response deactivated successfully', 'review' => $review]);
    }

    /**
     * Activate the review
     *
     * @param  \App\Models\ReviewResponse  $review
     * @return \Illuminate\Http\Response
     */
    public function activate(Request $request, $id)
    {
        $review = ReviewResponse::findOrFail($id);

        $review->is_review_response_active = 1;

        $review->save();

        return response()->json(['message' => 'Review Response activated successfully', 'review' => $review]);
    }

    
}

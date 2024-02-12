<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\ReviewResponse;
use App\Models\RatingReason;
use Illuminate\Support\Facades\Auth;


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

        // Get the associated review
        $review = Review::find($data['review_id']);
        
        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original contractor or has admin privileges
        if ($user->id === $review->contractor_id || $user->posts_privileges) {

            if ($review->response_id) {
                return response()->json(['message' => 'Sorry a response is already given to this review'], 403);
            }

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

            return response()->json(['message' => 'Review response saved successfully!','review_response'=>$reviewResponse], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to add the review response'], 403);
        }

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
        
        // Get the associated review
        $review = Review::find($reviewResponse->review_id);
        
        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original contractor or has admin privileges
        if ($user->id === $review->contractor_id || $user->posts_privileges) {
            // Update the response_text
            $reviewResponse->response_text = $data['response_text'];
            $reviewResponse->save();
        
            return response()->json(['message' => 'Review response updated successfully!', 'review_response' => $reviewResponse], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to update this review response'], 403);
        }
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

        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original contractor or has admin privileges
        if ($user->id === $review->contractor_id || $user->appeals_privileges || $user->posts_privileges) {
    
            // If the review exists, set its response_id to null
            if ($review) {
                $review->response_id = null;
                $review->save();
            }
        
            // Delete the Review Response
            $reviewResponse->delete();
        
            return response()->json(['message' => 'Review response deleted successfully!'], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to delete this review response'], 403);
        }
    }


    /**
     * Deactivate the review response
     *
     * @param  \App\Models\ReviewResponse  $reviewResponse
     * @return \Illuminate\Http\Response
     */
    public function deactivate(Request $request, $id)
    {
        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        
        $reviewResponse = ReviewResponse::findOrFail($id);

        // Get the associated review
        $review = Review::find($reviewResponse->review_id);
    
        // If the review exists, set its response_id to null
        if ($review) {
            $review->response_id = null;
            $review->save();
        }

        $reviewResponse->is_review_response_active = 0;

        $reviewResponse->save();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'response_id' => $reviewResponse->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'deactivated_review_response'
        ]);

        return response()->json(['message' => 'Review Response deactivated successfully', 'reviewResponse' => $reviewResponse]);
    }

    /**
     * Activate the ReviewResponse
     *
     * @param  \App\Models\ReviewResponse  $reviewResponse
     * @return \Illuminate\Http\Response
     */
    public function activate(Request $request, $id)
    {


        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        $reviewResponse = ReviewResponse::findOrFail($id);

        // Get the associated review
        $review = Review::find($reviewResponse->review_id);
    
        // If the review exists, set its response_id to null
        if ($review) {
            $review->response_id = $id;
            $review->save();
        }

        $reviewResponse->is_review_response_active = 1;

        $reviewResponse->save();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'response_id' => $reviewResponse->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'activated_review_response'
        ]);
    

        return response()->json(['message' => 'Review Response activated successfully', 'reviewResponse' => $reviewResponse]);
    }

    /**
     * Update the specified resource in storage and save the reason.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateFromAdmin(Request $request)
    {
        // Validation
        $data = $request->validate([
            'response_id' => 'required|exists:review_responses,id',  // make sure the ID exists in the review_responses table
            'response_text' => 'required|string|max:5000',  // max length is just an example, adjust as needed
        ]);

        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

    
        // Fetch the Review Response by ID
        $reviewResponse = ReviewResponse::find($data['response_id']);
    
        // Update the response_text
        $reviewResponse->response_text = $data['response_text'];
        $reviewResponse->save();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'response_id' => $reviewResponse->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'updated_review_response'
        ]);
    
    
        return response()->json(['message' => 'Review response updated successfully!'], 200);
    }
    
    /**
     * Remove the specified resource from storage and save the reason.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyFromAdmin(Request $request, ReviewResponse $reviewResponse)
    {

        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);


        // Get the associated review
        $review = Review::find($reviewResponse->review_id);
    
        // If the review exists, set its response_id to null
        if ($review) {
            $review->response_id = null;
            $review->save();
        }
    
        // Delete the Review Response
        $reviewResponse->delete();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'response_id' => $reviewResponse->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'deleted_review_response'
        ]);
    
        return response()->json(['message' => 'Review response deleted successfully!'], 200);
    }

    
}

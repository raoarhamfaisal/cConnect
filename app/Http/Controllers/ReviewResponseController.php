<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

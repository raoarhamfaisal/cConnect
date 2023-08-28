<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;




class ReviewController extends Controller
{
    /**
     * Display a listing of the reviews based on contractor_id.
     *
     * @param  int  $contractor_id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $contractor_id)
    {
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15);  // default to 15 if not provided
        $page = $request->query('page', 1);          // default to page 1 if not provided
    
        // Fetch all reviews for calculating ratings and counts
        $allReviews = Review::where('contractor_id', $contractor_id)->get();
    
        // Calculate the average rating and counts
        $avgReview = $allReviews->avg('rating');
        $fiveStars = $allReviews->whereBetween('rating', [4.5, 5.0])->count();
        $fourStars = $allReviews->whereBetween('rating', [3.5, 4.4])->count();
        $threeStars = $allReviews->whereBetween('rating', [2.5, 3.4])->count();
        $twoStars = $allReviews->whereBetween('rating', [1.5, 2.4])->count();
        $oneStar = $allReviews->whereBetween('rating', [0.0, 1.4])->count();


    
        // Build the review query with filtering options
        $reviewsQuery = Review::with(['reviewer' => function($query) {
            $query->select([
                'id',
                'user_id',
                'first_name',
                'last_name',
                'company_name',
                'city',
                'state',
                'user_avatar',
                'company_logo',
                'trade1',
                'trade2',
                'trade3',
                'trade4',
                'trade5',
                'trade6',
                'trade7',
                'trade8',
                'trade9',
                'trade10',
                'trade11',
                'trade12',
                'trade13',
                'trade14',
                'trade15',
                'trade16',
                'trade17',
                'trade18',
                'trade19',
                'trade20',
                'trade21',
                'trade22',
                'trade23',
                'trade24',
                'trade25',
                'trade26',
                'trade27',
                'trade28',
                'trade29',
                'trade30'
            ]);
        }, 'review_response'])->where('contractor_id', $contractor_id);
    
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', 'latest'); // Default to latest
        $sortByRating = $request->query('sort_by_rating', 'highest'); // Default to highest
        
        switch ($sortByRating) {
            case 'highest':
                $reviewsQuery = $reviewsQuery->orderByDesc('rating');
                break;
            case 'middle':
                $reviewsQuery = $reviewsQuery->orderBy('rating', 'asc')->whereBetween('rating', [2.5, 3.5]);
                break;
            case 'lowest':
                $reviewsQuery = $reviewsQuery->orderBy('rating', 'asc');
                break;
        }
    
        if ($sortByDate === 'oldest') {
            $reviewsQuery = $reviewsQuery->oldest('created_at');
        } else {
            $reviewsQuery = $reviewsQuery->latest('created_at');
        }
    
    
        // Fetch paginated reviews
        $reviews = $reviewsQuery->paginate($perPage, ['*'], 'page', $page);
    
        // Retrieve the contractor details from the Profile table
        $contractorDetails = Profile::where('id', $contractor_id)
                                    ->select([
                                        'id',
                                        'user_id',
                                        'first_name',
                                        'last_name',
                                        'company_name',
                                        'city',
                                        'state',
                                        'user_avatar',
                                        'company_logo',
                                        'trade1',
                                        'trade2',
                                        'trade3',
                                        'trade4',
                                        'trade5',
                                        'trade6',
                                        'trade7',
                                        'trade8',
                                        'trade9',
                                        'trade10',
                                        'trade11',
                                        'trade12',
                                        'trade13',
                                        'trade14',
                                        'trade15',
                                        'trade16',
                                        'trade17',
                                        'trade18',
                                        'trade19',
                                        'trade20',
                                        'trade21',
                                        'trade22',
                                        'trade23',
                                        'trade24',
                                        'trade25',
                                        'trade26',
                                        'trade27',
                                        'trade28',
                                        'trade29',
                                        'trade30'
                                    ])
                                    ->first();
    
        // Construct the response
        $response = [
            'contractor' => $contractorDetails,
            'reviews' => $reviews->items(),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
            ],
            'average_rating' => $avgReview,
            'five_stars_count' => $fiveStars,
            'four_stars_count' => $fourStars,
            'three_stars_count' => $threeStars,
            'two_stars_count' => $twoStars,
            'one_star_count' => $oneStar
        ];
    
        return response()->json($response);
    }
    
    

    /**
     * Store a newly created review in storage.
     * res
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'reviewer_id' => 'required|integer|exists:profiles,id',
            'contractor_id' => 'required|integer|exists:profiles,id',
            'rating' => 'required|numeric|between:0,999999.99',
            'rating_text' => 'required|string',
            'on_appeal_reason' => 'nullable|string',
            'on_appeal_reason_date' => 'nullable|date_format:Y-m-d H:i:s',
            'off_appeal_reason' => 'nullable|string',
            'off_appeal_reason_date' => 'nullable|date_format:Y-m-d H:i:s',
            'is_under_appeal' => 'required|boolean',
            'hired_by_contractor' => 'required|boolean',
            'paid_on_time' => 'required|boolean',
            'hired_contractor' => 'required|boolean',
            'give_full_payment' => 'required|boolean',
            'how_did_you_meet_this_contractor' => 'nullable|string|max:255',
        ]);
    
        // Add the current datetime for the rating_date
        $data['rating_date'] = Carbon::now()->toDateTimeString();
    
        // Create the review with the data
        $review = Review::create($data);
    
        return response()->json(['message' => 'Review created successfully!', 'review' => $review], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        $data = $request->validate([
            'reviewer_id' => 'integer|exists:profiles,id',
            'contractor_id' => 'integer|exists:profiles,id',
            'rating' => 'numeric|between:0,999999.99',
            'rating_text' => 'string',
            'on_appeal_reason' => 'nullable|string',
            'on_appeal_reason_date' => 'nullable|date_format:Y-m-d H:i:s',
            'off_appeal_reason' => 'nullable|string',
            'off_appeal_reason_date' => 'nullable|date_format:Y-m-d H:i:s',
            'is_under_appeal' => 'boolean',
            'hired_by_contractor' => 'boolean',
            'paid_on_time' => 'boolean',
            'hired_contractor' => 'boolean',
            'give_full_payment' => 'boolean',
            'how_did_you_meet_this_contractor' => 'nullable|string|max:255',
        ]);
    
        $review->update($data);
        return response()->json(['message' => 'Review updated successfully!', 'review' => $review], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(['message' => 'Review deleted successfully!'], 200);
    }


    /**
     * Put the the review on appeal
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */

    public function putOnAppeal(Request $request, Review $review)
    {
        $data = $request->validate([
            'on_appeal_reason' => 'required|string',
        ]);

        // Set the review to be under appeal and add the current datetime
        $review->is_under_appeal = true;
        $review->on_appeal_reason_date = Carbon::now();
        $review->on_appeal_reason = $data['on_appeal_reason'];

        $review->save();

        return response()->json(['message' => 'Review put on appeal successfully!', 'review' => $review], 200);
    }


    /**
     * Turn off the appeal
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
     public function removeAppeal(Request $request, Review $review)
    {
        $data = $request->validate([
            'off_appeal_reason' => 'required|string',
        ]);

        // Set the review's appeal status to off and add the current datetime
        $review->is_under_appeal = false;
        $review->off_appeal_reason_date = Carbon::now();
        $review->off_appeal_reason = $data['off_appeal_reason'];

        $review->save();

        return response()->json(['message' => 'Appeal removed successfully!', 'review' => $review], 200);
    }

}

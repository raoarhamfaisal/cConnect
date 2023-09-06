<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Review;
use App\Models\Profile;
use App\Models\RatingReason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Mail;
use App\Mail\AppealAccepted;
use App\Mail\AppealRejected;
use Illuminate\Support\Facades\Auth;





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
                'email',
                'phone_cell',
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
        }, 'review_response'])->where('contractor_id', $contractor_id)->where('is_review_active', 1);
    
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', '');
        $sortByRating = $request->query('sort_by_rating', '');
        
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
            $reviewsQuery = $reviewsQuery->oldest('rating_date');
        } else if($sortByDate === 'latest') {
            $reviewsQuery = $reviewsQuery->latest('rating_date');
        }
    
    
        // Fetch paginated reviews
        $reviews = $reviewsQuery->paginate($perPage, ['*'], 'page', $page);
    
    
        // Construct the response
        $response = [
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

        // Check if the reviewer has already created a review for this contractor within the last 48 hours
        $lastReview = Review::where('reviewer_id', $data['reviewer_id'])
                            ->where('contractor_id', $data['contractor_id'])
                            ->where('rating_date', '>=', Carbon::now()->subHours(48)->toDateTimeString())
                            ->first();

        if ($lastReview) {
            return response()->json(['message' => 'You can only submit one review for this contractor every 48 hours.'], 403);
        }

    
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

        // return response()->json(['user' => $user, 'review' => $review], 200);
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

        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original reviewer or has admin privileges
        if ($user->id === $data['reviewer_id'] || $user->reviews_privileges) {
        
            $review->is_appeal_already_accepted_or_rejected = false;
            $review->is_under_appeal = false;
            $review->on_appeal_reason_date = null;    
            $review->on_appeal_reason = '';    
            $review->off_appeal_reason_date = null;    
            $review->off_appeal_reason = '';
            $review->update($data);
        
            return response()->json(['message' => 'Review updated successfully!', 'review' => $review], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to update this review'], 403);
        }
    
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original reviewer or has admin privileges
        if ($user->id === $review->reviewer_id || $user->reviews_privileges) {
            $review->is_appeal_already_accepted_or_rejected = false;
            $review->is_under_appeal = false;
            $review->on_appeal_reason_date = null;    
            $review->on_appeal_reason = '';    
            $review->off_appeal_reason_date = null;    
            $review->off_appeal_reason = '';
            $review->delete();
            return response()->json(['message' => 'Review deleted successfully!'], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to delete this review'], 403);
        }
    }


    /**
     * Put the the review on appeal
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */

    public function putOnAppeal(Request $request, Review $review)
    {

        // Check if the appeal for this review is already accepted or rejected
        if ($review->is_appeal_already_accepted_or_rejected || $review->is_under_appeal) {
            return response()->json(['message' => 'You have already submitted an appeal!.'], 400);
        }



        $data = $request->validate([
            'on_appeal_reason' => 'required|string',
        ]);

        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original reviewer or has admin privileges
        if ($user->id === $review->contractor_id || $user->reviews_privileges) {

            // Set the review to be under appeal and add the current datetime
            $review->is_under_appeal = true;
            $review->on_appeal_reason_date = Carbon::now();
            $review->on_appeal_reason = $data['on_appeal_reason'];

            $review->save();

            return response()->json(['message' => 'Review put on appeal successfully!', 'review' => $review], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to appeal on this review'], 403);
        }
    }


    /**
     * Turn off the appeal
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
     public function removeAppeal(Request $request, Review $review)
    {

        // Check if the appeal for this review is already accepted or rejected
        if ($review->is_appeal_already_accepted_or_rejected) {
            return response()->json(['message' => 'You have already submitted an appeal!'], 400);
        }

        // Check if the appeal is submitted or not
        if (!$review->is_under_appeal) {
            return response()->json(['message' => 'Sorry! You have not submitted an appeal yet.'], 400);
        }


        $data = $request->validate([
            'off_appeal_reason' => 'required|string',
        ]);

        // Get the currently authenticated user
        $user = Auth::user();
        // Check if the user is the original reviewer or has admin privileges
        if ($user->id === $review->contractor_id || $user->reviews_privileges) {

            // Set the review's appeal status to off and add the current datetime
            $review->off_appeal_reason_date = Carbon::now();
            $review->off_appeal_reason = $data['off_appeal_reason'];

            $review->save();

            return response()->json(['message' => 'Appeal for removal successfully submitted!', 'review' => $review], 200);
        }else {
            return response()->json(['message' => 'You do not have permission to turn offf this appeal'], 403);
        }
    }



    /**
     * Get all the Contractor Profiles
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function getContractorProfiles(Request $request)
    {
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15); // Default to 15 if not provided
        $page = $request->query('page', 1); // Default to page 1 if not provided

        // Fetch profiles with average rating
        $profiles = Profile::select([
            'profiles.id',
            'profiles.user_id',
            'profiles.first_name',
            'profiles.last_name',
            'profiles.company_name',
            'profiles.city',
            'profiles.state',
            'profiles.user_avatar',
            'profiles.company_logo',
            'profiles.email',
            'profiles.phone_cell',
            DB::raw('AVG(reviews.rating) as average_rating')
        ])
        ->leftJoin('reviews', 'profiles.id', '=', 'reviews.contractor_id')
        ->groupBy('profiles.id')
        ->paginate($perPage, ['*'], 'page', $page);

        // Construct the response
        $response = [
            'profiles' => $profiles->items(),
            'pagination' => [
                'current_page' => $profiles->currentPage(),
                'last_page' => $profiles->lastPage(),
                'per_page' => $profiles->perPage(),
                'total' => $profiles->total(),
            ]
        ];

        return response()->json($response);
    }


    /**
     * Get all appealed Reviews
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function getAppealedReviews(Request $request)
    {
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15);  // Default to 15 if not provided
        $page = $request->query('page', 1);          // Default to page 1 if not provided
    
        // Initialize query builder
        $query = Review::with(['reviewer' => function($query) {
            $query->select([
                'id',
                'user_id',
                'email',
                'phone_cell',
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
        }, 'contractor' => function($query) {
            $query->select([
                'id',
                'user_id',
                'email',
                'phone_cell',
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
        }, 'review_response'])->withTrashed()->where('is_under_appeal', 1);
    
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', ''); // Default to latest
        $sortByRating = $request->query('sort_by_rating', ''); // Default to highest
    
        if ($sortByDate === 'oldest') {
            $query = $query->oldest('created_at');
        } else if ($sortByDate === 'latest') {
            $query = $query->latest('created_at');
        }
    
        switch ($sortByRating) {
            case 'highest':
                $query = $query->orderByDesc('rating');
                break;
            case 'middle':
                $query = $query->orderBy('rating', 'asc')->whereBetween('rating', [2.5, 3.5]);
                break;
            case 'lowest':
                $query = $query->orderBy('rating', 'asc');
                break;
        }
    
        // Fetch paginated results
        $reviews = $query->paginate($perPage, ['*'], 'page', $page);
    
        // Construct the response
        $response = [
            'reviews' => $reviews->items(),
            'pagination' => [
                'current_page' => $reviews->currentPage(),
                'last_page' => $reviews->lastPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
            ]
        ];
    
        return response()->json($response);
    }


    /**
     * Deactivate the review
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function deactivate(Request $request, $id)
    {
        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);
        $review = Review::findOrFail($id);

        $review->is_review_active = 0;

        $review->save();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'review_id' => $review->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'deactivated_review'
        ]);
        

        return response()->json(['message' => 'Review deactivated successfully', 'review' => $review]);
    }

    /**
     * Activate the review
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function activate(Request $request, $id)
    {

        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        $review = Review::findOrFail($id);

        $review->is_review_active = 1;

        $review->save();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'review_id' => $review->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'activated_review'
        ]);

        return response()->json(['message' => 'Review activated successfully', 'review' => $review]);
    }



    /**
     * Display a listing of the admin reviews based on contractor_id.
     *
     * @param  int  $contractor_id
     * @return \Illuminate\Http\Response
     */
    public function contractorAllReviews(Request $request, $contractor_id)
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
                'email',
                'phone_cell',
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
        }, 'review_response'])->withTrashed()->where('contractor_id', $contractor_id);
    
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', '');
        $sortByRating = $request->query('sort_by_rating', '');
        
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
            $reviewsQuery = $reviewsQuery->oldest('rating_date');
        } else if($sortByDate === 'latest') {
            $reviewsQuery = $reviewsQuery->latest('rating_date');
        }
    
    
        // Fetch paginated reviews
        $reviews = $reviewsQuery->paginate($perPage, ['*'], 'page', $page);
    
        // Retrieve the contractor details from the Profile table
        $contractorDetails = Profile::where('id', $contractor_id)
                                    ->select([
                                        'id',
                                        'user_id',
                                        'email',
                                        'phone_cell',
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
     * Update the specified resource for Admin in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function updateFromAdmin(Request $request, Review $review)
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

        $review->is_appeal_already_accepted_or_rejected = true;
        $review->update($data);

        // Assuming 'reason' comes in from the request as well
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'review_id' => $review->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'updated_review'
        ]);

        return response()->json(['message' => 'Review updated successfully!', 'review' => $review], 200);
    }

    /**
     * Remove the specified resource from storage and save reason.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroyFromAdmin(Request $request, Review $review)
    {
        // Validate the 'reason' field in the request
        $reasonData = $request->validate([
            'reason' => 'required|string|max:1000'
        ]);

        $review->is_appeal_already_accepted_or_rejected = true;

        // Delete the review
        $review->delete();

        // Create a new record in the rating_reasons table
        RatingReason::create([
            'review_id' => $review->id,
            'reason' => $reasonData['reason'],
            'reason_date' => Carbon::now(),
            'type' => 'deleted_review'
        ]);

        return response()->json(['message' => 'Review deleted successfully!'], 200);
    }


    /**
     * Accept the appeal on review
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */

     public function acceptAppeal(Request $request, Review $review)
     { 

        // Check if the review is under appeal
        if (!$review->is_under_appeal) {
            return response()->json(['message' => 'This review is not under appeal.'], 400);
        }

        // Accept the appeal and turn off on appeal and off appeal
        $review->is_under_appeal = false;
        $review->is_appeal_already_accepted_or_rejected = true;
        $review->on_appeal_reason_date = null;
        $review->on_appeal_reason = '';
        $review->off_appeal_reason_date = null;
        $review->off_appeal_reason = '';

        
        $review->save();
        // Send an Accept Eamil to the Contractor explaining the his request for changing the reivew is done.

        // Get contractor's email address from Profile
        $contractorProfile = Profile::find($review->contractor_id);

        if ($contractorProfile) {
            $contractorEmail = $contractorProfile->email;
            
            // Send the acceptance email
            Mail::to($contractorEmail)->send(new AppealAccepted());
        } else {
            // Handle case where contractor profile is not found, optional
        }

        return response()->json(['message' => 'Appeal is successfully accepted!', 'review' => $review], 200);
     }
 
 
     /**
      * Reject the Appeal from Admin Side
      *
      * @param  \App\Models\Review  $review
      * @return \Illuminate\Http\Response
      */
      public function rejectAppeal(Request $request, Review $review)
     {
        // Check if the review is under appeal
        if (!$review->is_under_appeal) {
            return response()->json(['message' => 'This review is not under appeal.'], 400);
        }


        // Accept the appeal and turn off on appeal and off appeal
        $review->is_under_appeal = false;
        $review->is_appeal_already_accepted_or_rejected = true;
        $review->on_appeal_reason_date = null;
        $review->on_appeal_reason = '';
        $review->off_appeal_reason_date = null;
        $review->off_appeal_reason = '';

        
        $review->save();
        
        // Send an Reject Eamil to the Contractor explaining the his request for changing the reivew are rejected.

        // Get contractor's email address from Profile
        $contractorProfile = Profile::find($review->contractor_id);

        if ($contractorProfile) {
            $contractorEmail = $contractorProfile->email;
            
            // Send the acceptance email
            Mail::to($contractorEmail)->send(new AppealRejected());
        } else {
            // Handle case where contractor profile is not found, optional
        }


        return response()->json(['message' => 'Appeal is successfully rejected!', 'review' => $review], 200);
     }
 


}

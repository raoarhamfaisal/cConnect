<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Profile;
use App\Models\Region;
use App\Models\Review;
use Illuminate\Support\Facades\DB;


class ContractorRatingsAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getContractorGotReviews($region_id,$contractor_id)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;
    
        // Retrieve the contractor details from the Profile table with trades
        $contractor = Profile::where('id', $contractor_id)
                            ->with('trades')
                            ->select([
                                'id',
                                'user_id',
                                'email',
                                'phone_cell',
                                'first_name',
                                'last_name',
                                'phone_cell',
                                'email',
                                'company_name',
                                'city',
                                'state',
                                'user_avatar',
                                'company_logo'
                            ])
                            ->first();
    
        // Convert trades to old structure
        $contractorDetails = $this->convertTradesToOldStructure($contractor->trades);
        $contractorDetails = array_merge($contractor->toArray(), $contractorDetails);
    
        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)
                        ->with('trades')
                        ->first();
    
            $profileTrades = $this->convertTradesToOldStructure($profile->trades);
            $profile = array_merge($profile->toArray(), $profileTrades);
        }
    
        return Inertia::render('Admin/Ratings/ContractorGotReviews', [
            'profile' => $profile,
            'region_id' => $region_id,
            'showit' => Auth::check(),
            'posts' => Post::query()
            ->orderBy('id', 'DESC')
            ->when(FacadeRequest::input('postSearch'), function ($query, $postSearch) {
                $query->where('title', 'like', "%{$postSearch}%");
            })
            ->paginate(5)
            ->withQueryString() 
            ->through(fn($post) => [
                'id' => $post->id,
                'user_id' => $post->user_id,
                'view' => $post->view,
                'title' => $post->title,
                'image' => $post->image,
                'body1' => $post->body1,
                'body2' => $post->body2,
                'body1Bold' => $post->body1Bold,
                'body1ColorId' => $post->body1ColorId,
                'repost' => $post->repost,
                'shares' => $post->shares,
            ]),
            // pass on any existing search filters that exist
            // along with data
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            'contractorDetails' => $contractorDetails,
        ]);
    }
    
    public function getContractorGivenReviews($region_id,$contractor_id)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;
    
        // Retrieve the contractor details from the Profile table with trades
        $contractor = Profile::where('id', $contractor_id)
                            ->with('trades')
                            ->select([
                                'id',
                                'user_id',
                                'email',
                                'phone_cell',
                                'first_name',
                                'last_name',
                                'phone_cell',
                                'email',
                                'company_name',
                                'city',
                                'state',
                                'user_avatar',
                                'company_logo'
                            ])
                            ->first();
    
        // Convert trades to old structure
        $contractorDetails = $this->convertTradesToOldStructure($contractor->trades);
        $contractorDetails = array_merge($contractor->toArray(), $contractorDetails);
    
        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)
                        ->with('trades')
                        ->first();
    
            $profileTrades = $this->convertTradesToOldStructure($profile->trades);
            $profile = array_merge($profile->toArray(), $profileTrades);
        }
    
        return Inertia::render('Admin/Ratings/ContractorGivenReviews', [
            'profile' => $profile,
            'region_id' => $region_id,
            'showit' => Auth::check(),
            'posts' => Post::query()
            ->orderBy('id', 'DESC')
            ->when(FacadeRequest::input('postSearch'), function ($query, $postSearch) {
                $query->where('title', 'like', "%{$postSearch}%");
            })
            ->paginate(5)
            ->withQueryString() 
            ->through(fn($post) => [
                'id' => $post->id,
                'user_id' => $post->user_id,
                'view' => $post->view,
                'title' => $post->title,
                'image' => $post->image,
                'body1' => $post->body1,
                'body2' => $post->body2,
                'body1Bold' => $post->body1Bold,
                'body1ColorId' => $post->body1ColorId,
                'repost' => $post->repost,
                'shares' => $post->shares,
            ]),
            // pass on any existing search filters that exist
            // along with data
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            'contractorDetails' => $contractorDetails,
        ]);
    }
    private function convertTradesToOldStructure($trades) 
    {
        $oldStructure = [];
        for ($i = 1; $i <= 30; $i++) {
            $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
        }
        return $oldStructure;
    }
    



    public function historyPage($contractor_id)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;
    
        // Retrieve the contractor details from the Profile table with trades
        $contractor = Profile::where('id', $contractor_id)
                            ->with('trades')
                            ->select([
                                'id',
                                'user_id',
                                'email',
                                'phone_cell',
                                'first_name',
                                'last_name',
                                'phone_cell',
                                'email',
                                'company_name',
                                'city',
                                'state',
                                'user_avatar',
                                'company_logo'
                            ])
                            ->first();
    
        // Convert trades to old structure
        $contractorDetails = $this->convertTradesToOldStructure($contractor->trades);
        $contractorDetails = array_merge($contractor->toArray(), $contractorDetails);
    
        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)
                        ->with('trades')
                        ->first();
    
            $profileTrades = $this->convertTradesToOldStructure($profile->trades);
            $profile = array_merge($profile->toArray(), $profileTrades);
        }
    
        return Inertia::render('Admin/History/ContractorHistory', [
            'profile' => $profile,
            'showit' => Auth::check(),
            'posts' => Post::query()
            ->orderBy('id', 'DESC')
            ->when(FacadeRequest::input('postSearch'), function ($query, $postSearch) {
                $query->where('title', 'like', "%{$postSearch}%");
            })
            ->paginate(5)
            ->withQueryString() 
            ->through(fn($post) => [
                'id' => $post->id,
                'user_id' => $post->user_id,
                'view' => $post->view,
                'title' => $post->title,
                'image' => $post->image,
                'body1' => $post->body1,
                'body2' => $post->body2,
                'body1Bold' => $post->body1Bold,
                'body1ColorId' => $post->body1ColorId,
                'repost' => $post->repost,
                'shares' => $post->shares,
            ]),
            // pass on any existing search filters that exist
            // along with data
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            'contractorDetails' => $contractorDetails,
        ]);
    }

    /**
     * Show the history of the contractor
     *
     * @return \Illuminate\Http\Response
     */
    public function reviewsHistory(Request $request, $id)
    {   

        // Get all the reviews of the selected Contractor which he has given to other contractors

        // Determine pagination parameters from the request's query parameters
        $reviewsPerPage = $request->query('per_page', 15);  // default to 15 if not provided
        $reviewsPage = $request->query('page', 1);          // default to page 1 if not provided
    
        // Fetch all reviews for calculating ratings and counts
        $allReviews = Review::where('reviewer_id', $id)->get();
            
        // Calculate the average rating and counts
        $avgReview = $allReviews->avg('rating');
        $fiveStars = $allReviews->whereBetween('rating', [4.5, 5.0])->count();
        $fourStars = $allReviews->whereBetween('rating', [3.5, 4.4])->count();
        $threeStars = $allReviews->whereBetween('rating', [2.5, 3.4])->count();
        $twoStars = $allReviews->whereBetween('rating', [1.5, 2.4])->count();
        $oneStar = $allReviews->whereBetween('rating', [0.0, 1.4])->count();


    
        // Build the review query with filtering options
        $reviewsByContractIDQuery = Review::where('reviewer_id', $id)
        ->withTrashed()
        ->with([
            'reviewer' => function($query) {
                $query->with('trades')  // Include the trades relationship
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
                          'company_logo'
                      ]);
            }, 
            'ratingReasons',  
            'review_response.responseReasons',        
            'review_response', 
        ]);
        
        
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', '');
        $sortByRating = $request->query('sort_by_rating', '');
        
        switch ($sortByRating) {
            case 'highest':
                $reviewsByContractIDQuery = $reviewsByContractIDQuery->orderByDesc('rating');
                break;
            case 'middle':
                $reviewsByContractIDQuery = $reviewsByContractIDQuery->orderBy('rating', 'asc')->whereBetween('rating', [2.5, 3.5]);
                break;
            case 'lowest':
                $reviewsByContractIDQuery = $reviewsByContractIDQuery->orderBy('rating', 'asc');
                break;
        }
    
        if ($sortByDate === 'oldest') {
            $reviewsByContractIDQuery = $reviewsByContractIDQuery->oldest('rating_date');
        } else if($sortByDate === 'latest') {
            $reviewsByContractIDQuery = $reviewsByContractIDQuery->latest('rating_date');
        }
    
    
        // Fetch paginated reviews
        $reviews = $reviewsByContractIDQuery->paginate($reviewsPerPage, ['*'], 'page', $reviewsPage);

        // Convert the paginated results to arrays
        $reviewsArray = $reviews->toArray();

        // Transform the trades data for each reviewer
        foreach ($reviewsArray['data'] as &$review) {
            if (isset($review['reviewer']) && isset($review['reviewer']['trades'])) {
                $trades = $review['reviewer']['trades'];
                $transformedTrades = $this->convertTradesToOldStructure(collect($trades));
                $review['reviewer'] = array_merge($review['reviewer'], $transformedTrades);
            }
        }

        
        
        // Construct the response
        $response = [
            'reviews' => $reviewsArray['data'],
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


    
    public function responsesHistory(Request $request, $id)
    {
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15);  // default to 15 if not provided
        $page = $request->query('page', 1);          // default to page 1 if not provided
    
        // Fetch all reviews for calculating ratings and counts
        $allReviews = Review::where('reviewer_id', $id)->get();
    
        // Calculate the average rating and counts
        $avgReview = $allReviews->avg('rating');
        $fiveStars = $allReviews->whereBetween('rating', [4.5, 5.0])->count();
        $fourStars = $allReviews->whereBetween('rating', [3.5, 4.4])->count();
        $threeStars = $allReviews->whereBetween('rating', [2.5, 3.4])->count();
        $twoStars = $allReviews->whereBetween('rating', [1.5, 2.4])->count();
        $oneStar = $allReviews->whereBetween('rating', [0.0, 1.4])->count();
    
        // Build the review query with filtering options
        $reviewsForContractIDQuery = Review::where('contractor_id', $id)
            ->withTrashed()
            ->with([
                'reviewer' => function($query) {
                    $query->with('trades:id')  // Include the trades relationship with just the id
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
                              'company_logo'
                          ]);
                }, 
                'ratingReasons',  
                'review_response.responseReasons',        
                'review_response', 
            ]);
    
        // Apply sorting based on filters
        $sortByDate = $request->query('sort_by_date', '');
        $sortByRating = $request->query('sort_by_rating', '');
    
        switch ($sortByRating) {
            case 'highest':
                $reviewsForContractIDQuery = $reviewsForContractIDQuery->orderByDesc('rating');
                break;
            case 'middle':
                $reviewsForContractIDQuery = $reviewsForContractIDQuery->orderBy('rating', 'asc')->whereBetween('rating', [2.5, 3.5]);
                break;
            case 'lowest':
                $reviewsForContractIDQuery = $reviewsForContractIDQuery->orderBy('rating', 'asc');
                break;
        }
    
        if ($sortByDate === 'oldest') {
            $reviewsForContractIDQuery = $reviewsForContractIDQuery->oldest('rating_date');
        } else if($sortByDate === 'latest') {
            $reviewsForContractIDQuery = $reviewsForContractIDQuery->latest('rating_date');
        }
    
        // Fetch paginated reviews
        $responses = $reviewsForContractIDQuery->paginate($perPage, ['*'], 'page', $page);
    
        // // Convert trades to the old structure for each reviewer
        // foreach ($responses as $response) {
        //     if (isset($response->reviewer)) {
        //         $reviewerTrades = $this->convertTradesToOldStructure($response->reviewer->trades);
        //         $response->reviewer = array_merge($response->reviewer->toArray(), $reviewerTrades);
        //     }
        // }

        // Convert the paginated results to arrays
        $responsesArray = $responses->toArray();

        // Transform the trades data for each reviewer
        foreach ($responsesArray['data'] as &$review) {
            if (isset($review['reviewer']) && isset($review['reviewer']['trades'])) {
                $trades = $review['reviewer']['trades'];
                $transformedTrades = $this->convertTradesToOldStructure(collect($trades));
                $review['reviewer'] = array_merge($review['reviewer'], $transformedTrades);
            }
        }
    
        $response = [
            'reviews' => $responsesArray['data'],
            'pagination' => [
                'current_page' => $responses->currentPage(),
                'last_page' => $responses->lastPage(),
                'per_page' => $responses->perPage(),
                'total' => $responses->total(),
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
    
    // Search the Contractor
    public function searchContractor(Request $request, Region $region)
    {
        // Determine pagination parameters from the request's query parameters
        $perPage = $request->query('per_page', 15); // Default to 15 if not provided
        $page = $request->query('page', 1); // Default to page 1 if not provided
    
        $query = Profile::query();
    
        // Specify the columns to retrieve
        $query->select([
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
        ]);

        $query->where('region_id', $region->id);
    
        $searchTerm = $request->get('search');
    
        if ($searchTerm) {
            $query->where(function ($subQuery) use ($searchTerm) {
                $subQuery->where('profiles.first_name', 'like', '%' . $searchTerm . '%')
                         ->orWhere('profiles.last_name', 'like', '%' . $searchTerm . '%')
                         ->orWhere('profiles.email', 'like', '%' . $searchTerm . '%')
                         ->orWhere('profiles.company_name', 'like', '%' . $searchTerm . '%')
                         ->orWhere('profiles.phone_cell', 'like', '%' . $searchTerm . '%')
                         ->orWhere('profiles.phone_office', 'like', '%' . $searchTerm . '%');
            });
        }
    
        $contractors = $query->leftJoin('reviews', 'profiles.id', '=', 'reviews.contractor_id')
                              ->groupBy('profiles.id')
                              ->paginate($perPage, ['*'], 'page', $page);
    
        // Construct the response
        $response = [
            'profiles' => $contractors->items(),
            'pagination' => [
                'current_page' => $contractors->currentPage(),
                'last_page' => $contractors->lastPage(),
                'per_page' => $contractors->perPage(),
                'total' => $contractors->total(),
            ]
        ];
    
        return response()->json($response);
    }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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


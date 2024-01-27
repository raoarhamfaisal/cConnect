<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Profile;

class ContractorRatingsAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getContractorReviews($contractor_id)
    {
          // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;
       // Retrieve the contractor details from the Profile table
      $contractorDetails = Profile::where('id', $contractor_id)
                        ->select([
                            'id',
                            'user_id',
                            'first_name',
                            'last_name',
                            'phone_cell','email',
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

      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
      }
        return Inertia::render('Admin/Ratings/SingleContractor', [
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
    public function history($contractor_id)
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
    
    
        dd([
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
        ]);

        return Inertia::render('Admin/ContractorHistory', [
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
        ]);
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

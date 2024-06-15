<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Profile;
use App\Models\BlockUser;
use App\Services\InsertPostProfileService;
use App\Services\ProcessImageService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\SessionViewSetting;
use App\Models\SessionTrade;
use App\Mail\PostReportedMail;
use Illuminate\Support\Facades\Mail;
use App\Events\PostCountersChanged;

use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Broadcast;



class PostController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\Request
     */

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function index()
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;
        $userTradeIds = [];

        $sessionViewSettings = null;
    
        if ($userID) {
            $profile = Profile::where('user_id', $userID)->first();
            // $userTradeIds = $profile && $profile->trades ? $profile->trades->pluck('id')->toArray() : [];

            $sessionViewSettings = SessionViewSetting::where('profile_id', $profile->id)->first();

            // Retrieve session trade IDs
            $userTradeIds = SessionTrade::where('profile_id', $profile->id)->pluck('trade_id')->toArray();        
        }

        if(!$sessionViewSettings) {
            $sessionViewSettings = $sessionViewSettings ?: new \stdClass();
            $sessionViewSettings->view_locale = 1;
            $sessionViewSettings->view_regional = 0;
            $sessionViewSettings->view_statewide = 0;
            $sessionViewSettings->view_nationwide = 0;
            $sessionViewSettings->view_following = 0;
        }

        // $posts = Post::query()
        // ->with(['trades'])
        // ->whereHas('trades', function ($query) use ($userTradeIds) {
        //     $query->whereIn('trades.id', $userTradeIds);
        // })
        // ->first();

        // dd($posts->trades);


        // Retrieve the IDs of the users that the current user has blocked
        $blockedUserIds = $userID ? BlockUser::where('user_id', $userID)->pluck('blocked_user_id')->toArray() : [];

    
        return Inertia::render('Postings', [
            'showit' => Auth::check(),
            'userID' => $userID,
            'profile' => $profile,
            'posts' => Post::query()

                ->select('posts.*', 'posts.id as post_id', 'post_reactions.type as user_reaction')
                ->leftJoin('post_reactions', function ($join) use ($userID) {
                    $join->on('posts.id', '=', 'post_reactions.post_id')
                         ->where('post_reactions.user_id', '=', $userID);
                })
            //     ->select('posts.*', 
            //     'posts.id as post_id',
            //     DB::raw('(SELECT type FROM post_reactions WHERE post_id = posts.id AND user_id = ?) as user_reaction', [$userID]),
            //     DB::raw('(SELECT COUNT(*) FROM post_reactions WHERE post_id = posts.id AND type = "like") as likes_count'),
            //     DB::raw('(SELECT COUNT(*) FROM post_reactions WHERE post_id = posts.id AND type = "dislike") as dislikes_count')
            // )
                ->withCount(['likes', 'dislikes'])
                ->addSelect([
                    'profiles.first_name',
                    'profiles.last_name',
                    'profiles.company_name',
                    'profiles.city',
                    'profiles.state',
                    'profiles.user_avatar',
                    'profiles.id',
                    DB::raw('(SELECT AVG(reviews.rating) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as average_rating'),
                    DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as total_reviews'),
                    'original_profiles.first_name as original_user_first_name',
                    'original_profiles.last_name as original_user_last_name',
                    'original_profiles.company_name as original_user_company_name',
                    'original_profiles.city as original_user_city',
                    'original_profiles.state as original_user_state',
                    'original_profiles.user_avatar as original_user_user_avatar',
                    'original_profiles.id as original_user_id',
                    DB::raw('(SELECT AVG(reviews.rating) FROM reviews WHERE reviews.contractor_id = original_profiles.id AND reviews.is_review_active = 1) as original_user_average_rating'),
                    DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.contractor_id = original_profiles.id AND reviews.is_review_active = 1) as original_user_total_reviews')
                ])
                ->with(['trades' => function ($query) {
                    $query->select('trades.*'); // select all columns from trades
                }])
                ->leftJoin('profiles', 'posts.user_id', '=', 'profiles.user_id')
                ->leftJoin('profiles as original_profiles', 'posts.original_user_id', '=', 'original_profiles.user_id')
                ->where('posts.region_id', $profile['region_id'])
                ->where('posts.active_post', 1)
                ->whereNotIn('posts.user_id', $blockedUserIds)
                ->whereHas('user.profile', function ($query) use ($sessionViewSettings) {
                    // Ensure the post creator has matching view settings with the logged-in user
                    $query->where(function ($query) use ($sessionViewSettings) {
                        $query->where(function ($query) use ($sessionViewSettings) {
                            $query->where('view_locale', 1)
                                ->where('view_locale', $sessionViewSettings->view_locale);
                        })
                        ->orWhere(function ($query) use ($sessionViewSettings) {
                            $query->where('view_regional', 1)
                                ->where('view_regional', $sessionViewSettings->view_regional);
                        })
                        ->orWhere(function ($query) use ($sessionViewSettings) {
                            $query->where('view_statewide', 1)
                                ->where('view_statewide', $sessionViewSettings->view_statewide);
                        })
                        ->orWhere(function ($query) use ($sessionViewSettings) {
                            $query->where('view_nationwide', 1)
                                ->where('view_nationwide', $sessionViewSettings->view_nationwide);
                        })
                        ->orWhere(function ($query) use ($sessionViewSettings) {
                            $query->where('view_following', 1)
                                ->where('view_following', $sessionViewSettings->view_following);
                        });
                    });
                })
                ->whereHas('trades', function ($query) use ($userTradeIds) {
                    $query->whereIn('trades.id', $userTradeIds);
                })
                ->when(Request::input('postSearch'), function ($query, $postSearch) {
                    $query->where(function ($subQuery) use ($postSearch) {
                        // Search in post's title, body1, or body2
                        $subQuery->where('posts.title', 'like', "%{$postSearch}%")
                            ->orWhere('posts.body1', 'like', "%{$postSearch}%")
                            ->orWhere('posts.body2', 'like', "%{$postSearch}%");
        
                        // Search in user's profile details
                        $subQuery->orWhereHas('user.profile', function ($profileQuery) use ($postSearch) {
                            $profileQuery->where('profiles.first_name', 'like', "%{$postSearch}%")
                                ->orWhere('profiles.last_name', 'like', "%{$postSearch}%")
                                ->orWhereRaw("CONCAT(profiles.first_name, ' ', profiles.last_name) LIKE ?", ["%{$postSearch}%"]) // for full name search
                                ->orWhere('profiles.company_name', 'like', "%{$postSearch}%")
                                ->orWhere('profiles.city', 'like', "%{$postSearch}%")
                                ->orWhere('profiles.state', 'like', "%{$postSearch}%");
                        });
                    });
                })
                ->orderBy('posts.created_at', 'desc')
                ->orderBy('posts.id', 'desc')
                ->paginate(5)
                ->withQueryString()
                ->through(fn($post) => [
                    'id' => $post->post_id,
                    'your_reaction' => $post->user_reaction,
                    'user_id' => $post->user_id,
                    'view' => $post->view,
                    'title' => $post->title,
                    'image' => $post->image,
                    'body1' => $post->body1,
                    'body2' => $post->body2,
                    'is_body_bold' => $post->is_body_bold,
                    'post_text_color_id' => $post->post_text_color_id,
                    'post_background_color_id' => $post->post_background_color_id,

                    'title_text_color_id' => $post->title_text_color_id,
                    'title_background_color_id' => $post->title_background_color_id,
                    'title_text_alignment' => $post->title_text_alignment,
        

                    'font_size' => $post->font_size,
                    'text_alignment' => $post->text_alignment,

                    'likes_count' => $post->likes_count,
                    'dislikes_count' => $post->dislikes_count,

                    'repost' => $post->repost,
                    'shares' => $post->shares,
                    'first_name' => $post->first_name,
                    'last_name' => $post->last_name,
                    'company_name' => $post->company_name,
                    'city' => $post->city,
                    'state' => $post->state,
                    'user_avatar' => $post->user_avatar,
                    'average_rating' => $post->average_rating,
                    'total_reviews' => $post->total_reviews,

                    'original_user_first_name' => $post->original_user_first_name,
                    'original_user_last_name' => $post->original_user_last_name,
                    'original_user_company_name' => $post->original_user_company_name,
                    'original_user_city' => $post->original_user_city,
                    'original_user_state' => $post->original_user_state,
                    'original_user_user_avatar' => $post->original_user_user_avatar,
                    'original_user_id' => $post->original_user_id,
                    'original_user_average_rating' => $post->original_user_average_rating,
                    'original_user_total_reviews' => $post->original_user_total_reviews,
                
                ]),
            'postSearchFilters' => Request::only(['postSearch']),
        ]);
    }


    public function getPostTrades($postId)
    {
        // Fetch the post with the specified ID, along with its trades
        $post = Post::with('trades')->find($postId);
    
        if (!$post) {
            // If the post doesn't exist, return a 404 response
            return response()->json(['message' => 'Post not found'], 404);
        }
    
        // Extract only the IDs of the trades
        $tradeIds = $post->trades->pluck('id');
    
        // Return the trade IDs as a JSON response
        return response()->json(['trade_ids' => $tradeIds]);
    }


    public function indexContractor($contractor_id)
    {

        $profile = null;
        $userTradeIds = [];
    
        if ($contractor_id) {
            $profile = Profile::where('user_id', $contractor_id)->first();
            $userTradeIds = $profile && $profile->trades ? $profile->trades->pluck('id')->toArray() : [];
        }

    
            return Inertia::render('Postings', [
                'showit' => Auth::check(),
                'contractor_id' => $contractor_id,
              
                'profile' => $profile,
                'posts' => Post::query()
                    ->select(['posts.*', 'posts.id as post_id'])
                    ->addSelect([
                        'profiles.first_name',
                        'profiles.last_name',
                        'profiles.company_name',
                        'profiles.city',
                        'profiles.state',
                        'profiles.user_avatar',
                        'profiles.id',
                        DB::raw('(SELECT AVG(reviews.rating) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as average_rating'),
                        DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as total_reviews')
                    ])
                    ->leftJoin('profiles', 'posts.user_id', '=', 'profiles.user_id')
                    ->where('posts.user_id', $contractor_id)
                    ->orderBy('posts.created_at', 'desc')
                    ->orderBy('posts.id', 'desc')
                    ->paginate(5)
                    ->withQueryString()
                    ->through(fn($post) => [
                        'id' => $post->post_id,
                        'user_id' => $post->user_id,
                        'view' => $post->view,
                        'title' => $post->title,
                        'image' => $post->image,
                        'body1' => $post->body1,
                        'body2' => $post->body2,
                        'is_body_bold' => $post->is_body_bold,
                        'post_text_color_id' => $post->post_text_color_id,
                        'post_background_color_id' => $post->post_background_color_id,

                        'title_text_color_id' => $post->title_text_color_id,
                        'title_background_color_id' => $post->title_background_color_id,
                        'title_text_alignment' => $post->title_text_alignment,
            

                        'font_size' => $post->font_size,
                        'text_alignment' => $post->text_alignment,
                            
                        'repost' => $post->repost,
                        'shares' => $post->shares,
                        'first_name' => $post->first_name,
                        'last_name' => $post->last_name,
                        'company_name' => $post->company_name,
                        'city' => $post->city,
                        'state' => $post->state,
                        'user_avatar' => $post->user_avatar,
                        'average_rating' => $post->average_rating,
                        'total_reviews' => $post->total_reviews
                    
                    ]),
                'postSearchFilters' => Request::only(['postSearch']),
            ]);
    }

    public function getContractorPosts(Request $request, $contractor_id)
    {
        $profile = null;
        $userTradeIds = [];
    
        if ($contractor_id) {
            $profile = Profile::where('user_id', $contractor_id)->first();
            $userTradeIds = $profile && $profile->trades ? $profile->trades->pluck('id')->toArray() : [];
        }
    
        $posts = Post::query()
            ->select(['posts.*', 'posts.id as post_id'])
            ->addSelect([
                'profiles.first_name',
                'profiles.last_name',
                'profiles.company_name',
                'profiles.city',
                'profiles.state',
                'profiles.user_avatar',
                'profiles.id',
                DB::raw('(SELECT AVG(reviews.rating) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as average_rating'),
                DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.contractor_id = profiles.id AND reviews.is_review_active = 1) as total_reviews')
            ])
            ->leftJoin('profiles', 'posts.user_id', '=', 'profiles.user_id')
            ->where('posts.user_id', $contractor_id)
            ->orderBy('posts.created_at', 'desc')
            ->orderBy('posts.id', 'desc')
            ->paginate(5)
            ->withQueryString()
            ->toArray();
    
        return response()->json([
            'showit' => Auth::check(),
            'profile' => $profile,
            'posts' => $posts,
        ]);
    }
    public function selectedTrades($user_id)
    {
        // Get current user
    
        if ($user_id) {
            // Get profile of the current user
            $profile = Profile::where('id', $user_id)->first();
    
            // Get trades of the profile
            if ($profile) {
                $trades = $profile->trades;
            } else {
                $trades = [];
            }
    
            return response()->json([
                'trades' => $trades,
            ]);
        } else {
            return response()->json([
                'error' => 'User not authenticated',
            ], 401);
        }
    }

    // A helper function to convert the trades to old structure coming from proffile table in trade1, trade2 format
    private function convertTradesToOldStructure($trades) {
        $oldStructure = [];
        for ($i = 1; $i <= 30; $i++) {
            $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
        }
        return $oldStructure;
    }
        

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request;
     * @param  \Illuminate\Support\Facades\Request;
     * @param  \App\Http\Requests;
     * @return \Illuminate\Http\Response;
     */
    // STORE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function store(
        StorePostRequest $request,
        InsertPostProfileService $InsertPostProfileService,
        ProcessImageService $processImageService
    ) {
        $validatedInput = $request->validated();

        // Set user_id for post // Customize validation as needed
        $userID = Auth()->user('')->id;
        $validatedInput['user_id'] = $userID;
    
        // Get user info based on user id
        $postersProfile = Profile::where('user_id', $userID)
            ->first()
            ->only(
                'region_id'
            );


        if(!array_key_exists('region_id', $validatedInput) || !$validatedInput['region_id']) {
            $validatedInput['region_id'] = $postersProfile['region_id'];
        }
        
        // $validatedInput = $InsertPostProfileService->insertPostersProfile($validatedInput);
        //dd($validatedInput);

        // Place the image into it's own string
        // Then null out image
        $processedimages = $validatedInput['image'];
        $validatedInput['image'] = null;
        //dd($processedimages);

        // Create the post $validatedInput STORED in DataBase
        // Except image field is null - stored in $processedimages
        $postCreated = Post::create($validatedInput);

        // Process the images that are filepath/name
        // is stored in $processedimages as a STRING
        // call handleProcessImage from ProcessImageService Service class
        // and pass through the string of imagaes in $processedimages
        $newImageString = $processImageService
            ->handleProcessImage($processedimages, $postCreated->id);

        //dd($postCreated->id, $newImageString);

        // only then update image field
        Post::where("id", $postCreated->id)->update(["image" => $newImageString]);

        // Attach trades with post
        
        // dd($postCreated, $validatedInput);

        // Attach trades with post
        if($postCreated) {

            $trades = $request->input('trades');

            if(!$trades) {
                // Fetch the trades associated with the logged-in user's profile    
                $profile = Profile::where('user_id', $userID)->with('trades:id')->first();
                $trades = $profile->trades->pluck('id')->toArray();
            }



            // Sync the user trades with the postCreated
            $postCreated->trades()->sync($trades);
        }

        return redirect()->back()
            ->with('message', 'Post created');

    }


    

    public function updatePost(
        $post_id,
        StorePostRequest $request,
        InsertPostProfileService $InsertPostProfileService,
        ProcessImageService $processImageService,
    ) {

        // Retrieve the post to update
        $postToUpdate = Post::findOrFail($post_id);
        // dd($postToUpdate);


        $validatedInput = $request->validated();

        // Set user_id for post // Customize validation as needed
        $userID = Auth()->user('')->id;
        $validatedInput['user_id'] = $userID;
    
        // Get user info based on user id
        $postersProfile = Profile::where('user_id', $userID)
            ->first()
            ->only(
                'region_id'
            );


        if(!array_key_exists('region_id', $validatedInput) || !$validatedInput['region_id']) {
            $validatedInput['region_id'] = $postersProfile['region_id'];
        }
        
        // $validatedInput = $InsertPostProfileService->insertPostersProfile($validatedInput);
        //dd($validatedInput);

        // Place the image into it's own string
        // Then null out image
        $processedimages = $validatedInput['image'];
        $validatedInput['image'] = null;
        //dd($processedimages);

        // Update the basic post details from validated input
        $postToUpdate->fill($validatedInput);
        $postToUpdate->save();

        // Process the images that are filepath/name
        // is stored in $processedimages as a STRING
        // call handleProcessImage from ProcessImageService Service class
        // and pass through the string of imagaes in $processedimages
        $newImageString = $processImageService
            ->handleProcessImage($processedimages, $postToUpdate->id);

        //dd($postToUpdate->id, $newImageString);

        // only then update image field
        Post::where("id", $postToUpdate->id)->update(["image" => $newImageString]);


        // Attach trades with post
        
        // dd($postToUpdate, $validatedInput);

        // Attach trades with post
        if($postToUpdate) {

            $trades = $request->input('trades');

            if(!$trades) {
                // Fetch the trades associated with the logged-in user's profile    
                $profile = Profile::where('user_id', $userID)->with('trades:id')->first();
                $trades = $profile->trades->pluck('id')->toArray();
            }



            // Sync the user trades with the postToUpdate
            $postToUpdate->trades()->sync($trades);
        }

        return redirect()->back()
            ->with('message', 'Post Updated');

    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // CREATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function create()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    // UPDATE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function update(UpdatePostRequest $request, Post $post)
    {
        //$validated = $request->validated();
        Validator::make($request->all(), [
            'title' => 'required',
            'body1' => 'required',
            'body2' => '',
        ])->validate();

        dd($request);

        $post->update($request->only(['title', 'body1', 'body2']));

        $this->processImage($request, $post);

        return redirect()->back()
            ->with('message', 'Post updated');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    // SHOW ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    // EDIT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function edit(Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @param  \Illuminate\Support\Facades\Request::hasFile
     * @return \Illuminate\Http\Response
     */
    // DESTROY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function destroy(Post $post)
    {
    
        // Set the active_post field to 0 to deactivate the post
        $post->active_post = 0;
        $post->save();
    
        // Redirect back with a message
        return redirect()
            ->back()
            ->with('message', 'Post deleted successfully');
    }
    
    // upload ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Uplloads files to temp storage
    public function upload(Request $request)
    {
        // check if $request has file and if it does
        // save the file in the storage folder
        if ($request->hasFile('imageFilepond')) {
            // temp storage here - storage\app\public\uploads\posts
            // After file is saved it gets
            // moved to permenate storage
            return $request->file('imageFilepond')->store('uploads/posts', 'public');

            return '';
        }
    }


    public function repost(Post $post)
    {
        // Check if the current user has already reposted this post
        $existingRepost = Post::where('original_post_id', $post->id)
                            ->where('user_id', Auth::id())
                            ->first();

        if ($existingRepost) {
            // Return an error response if the user has already reposted
            return response()->json(['message' => 'You have already reposted this post.'], 403);
        }

        // List the attributes you want to replicate
        $attributesToReplicate = ['view', 'region_id', 'title', 'image', 'body1', 'body2', 'is_body_bold', 'post_text_color_id', 'post_background_color_id', 'font_size', 'text_alignment', 'title_text_alignment', 'title_text_color_id', 'title_background_color_id'];
        
        // Replicate the original post with specified attributes
        $repost = $post->replicate();
        
        // Set the current user as the poster and link to the original post and user
        $repost->user_id = Auth::id();
        $repost->original_post_id = $post->id;
        $repost->original_user_id = $post->user_id; // Save the original user's ID
        $repost->repost = 1;


        $post->repost++;

        $repost->save();
        $post->save();


        // Get trades associated with the original post
        $originalPostTrades = $post->trades->pluck('id')->toArray();

        // Attach these trades to the repost
        $repost->trades()->sync($originalPostTrades);

        try {
            broadcast(new PostCountersChanged($comment));
        } catch (\Exception $e) {
            \Log::error('Error broadcasting PostCountersChanged event: ' . $e->getMessage());
            // Optionally, handle the error further if needed
        }



        return response()->json($repost, 201);
    }


    public function reportPost(HttpRequest $request, $postId)
    {
        $post = Post::find($postId);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $reportText = $request->input('report_text', 'No details provided.');

        // Send an email to the admin
        Mail::to('ugly@tcontractor.com')->send(new PostReportedMail($post, $reportText));

        return response()->json(['message' => 'Your report has been sent to the admin.']);
    }

            
}

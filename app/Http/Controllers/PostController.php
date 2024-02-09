<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use App\Models\Profile;
use App\Services\InsertPostProfileService;
use App\Services\ProcessImageService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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

      if($userID) {
        $profile = Profile::where('user_id', $userID)->first();

    }

        return Inertia::render('Postings', [
            'showit' => Auth::check(),
            'userID' => Auth()->user() ? Auth()->user()->id : null,
            'profile' => $profile,  
            'posts' => Post::query()
                ->select('posts.*')
                ->addSelect([
                    'profiles.first_name',
                    'profiles.last_name',
                    'profiles.company_name',
                    'profiles.city',
                    'profiles.state',
                    'profiles.user_avatar',
                    'profiles.id',
                    DB::raw('(SELECT AVG(reviews.rating) FROM reviews WHERE reviews.contractor_id = profiles.id) as average_rating'),
                    DB::raw('(SELECT COUNT(*) FROM reviews WHERE reviews.contractor_id = profiles.id) as total_reviews')
                ])
                ->leftJoin('profiles', 'posts.user_id', '=', 'profiles.user_id')
                ->where('posts.region_id', $profile['region_id'])
                ->when(Request::input('postSearch'), function ($query, $postSearch) {
                    $query->where('posts.title', 'like', "%{$postSearch}%");
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

        $validatedInput = $InsertPostProfileService->insertPostersProfile($validatedInput);
        //dd($validatedInput);

        // Place the image into it's own string
        // Then null out image
        $processedimages = $validatedInput['image'];
        $validatedInput['image'] = null;
        //dd($processedimages);

        // Create the post $validatedInput STORED in DataBase
        // Except image field is null - stored in $processedimages
        $postId = Post::create($validatedInput);

        // Process the images that are filepath/name
        // is stored in $processedimages as a STRING
        // call handleProcessImage from ProcessImageService Service class
        // and pass through the string of imagaes in $processedimages
        $newImageString = $processImageService
            ->handleProcessImage($processedimages, $postId->id);

        //dd($postId->id, $newImageString);

        // only then update image field
        Post::where("id", $postId->id)->update(["image" => $newImageString]);

        return redirect()->back()
            ->with('message', 'Post created');

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
        $post->delete();
        return redirect()
            ->back()
            ->with('message', 'Post deleted');
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

}

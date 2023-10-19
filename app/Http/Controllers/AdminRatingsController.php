<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Profile;

class AdminRatingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($region_id)
{
      // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;


      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
      }
    return Inertia::render('Admin/Ratings/AllContractors', [
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
   
]);
}
public function getRegionsContractors()
{
      // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;


      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
      }
    return Inertia::render('Admin/Ratings/ContractorRegions', [
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
   
]);
}
public function getRegionsAppealed()
{
      // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;


      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
      }
    return Inertia::render('Admin/Appealed/AppealedRegions', [
        'profile' => $profile,
        'showit' => Auth::check(),
    'postSearchFilters' => FacadeRequest::only(['postSearch']),
   
]);
}
public function getRegionsForUsers()
{
      // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;


      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
      }
    return Inertia::render('Admin/Users/UsersRegions', [
        'profile' => $profile,
        'showit' => Auth::check(),
    'postSearchFilters' => FacadeRequest::only(['postSearch']),
   
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

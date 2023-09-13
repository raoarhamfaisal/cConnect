<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Profile;

class ContractorRatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      // Get current user id
      $userID = Auth()->user('')->id;
      $profile = null;


      // Get the profile information if the user id exists
      if($userID) {
          $profile = Profile::where('user_id', $userID)->first();
        // Retrieve the contractor details from the Profile table
        $contractorDetails = Profile::where('id', $profile->id)
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
  
      }
        return Inertia::render('Ratings/Contractor/ContractorPersonal', [
            'contractorDetails' => $contractorDetails,
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

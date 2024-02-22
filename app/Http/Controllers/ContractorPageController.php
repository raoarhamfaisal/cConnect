<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;


use App\Models\Profile;
use App\Models\ContractorProfile;
use App\Models\Region;

use Illuminate\Support\Facades\Request as FacadeRequest;


class ContractorPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($contractor_id)
    {
        // Get current user id
        $userID = Auth::id();

        $contractorProfile = null;
        $profile = null;
    
        $mode = FacadeRequest::input('mode');

        if($contractor_id) {
            $contractorProfile = ContractorProfile::where('user_id', $contractor_id)->with('trades')->first();

            if (!$contractorProfile) {
                $profile = Profile::where('user_id', $contractor_id)->with('trades')->first();
    
                // If profile is found in the Profile model, save it to the ContractorProfile model
                if ($profile) {
                    $contractorProfile = new ContractorProfile();
                    $contractorProfile->fill($profile->toArray()); // This copies all attributes from the profile to contractor profile

                    $contractorProfile->save();  
                    $contractorProfile->trades()->sync($profile->trades);   
                    
                    $contractorProfile->trades = $profile->trades;
                    $contractorProfile = ContractorProfile::where('user_id', $contractor_id)->with('imageSections')->with('trades')->first();
                }
            }

            // Convert the trades to the old structure for contractor profile
            if ($contractorProfile) {
                $profileImageSections = $contractorProfile->imageSections;
                $profileTrades = $this->convertTradesToOldStructure($contractorProfile->trades);
                $regionName = Region::where('id', $contractorProfile->region_id)->value('name');
                $contractorProfile = array_merge($contractorProfile->toArray(), $profileTrades);
                $contractorProfile['imageSections'] = $profileImageSections;
                
            }
            
        }


        if ($userID) {
            $profile = Profile::where('user_id', $userID)->first();
            $profileTrades = $this->convertTradesToOldStructure($profile->trades);
            $profile = array_merge($profile->toArray(), $profileTrades);
        }

        $allReviews = Review::where('contractor_id', $contractor_id)->where('is_review_active', 1)->get();
        $totalReviews = Review::where('contractor_id', $contractor_id)
            ->where('is_review_active', 1)
            ->paginate(10)->total(); // Paginate the results with 10 items per page

        // Calculate the average rating and counts
        $avgReview = $allReviews->avg('rating');
        $fiveStars = $allReviews->whereBetween('rating', [4.5, 5.0])->count();
        $fourStars = $allReviews->whereBetween('rating', [3.5, 4.4])->count();
        $threeStars = $allReviews->whereBetween('rating', [2.5, 3.4])->count();
        $twoStars = $allReviews->whereBetween('rating', [1.5, 2.4])->count();
        $oneStar = $allReviews->whereBetween('rating', [0.0, 1.4])->count();

        // dd($contractorProfile);

        return Inertia::render('Contractor/ContractorPage', [
            'profile' => $profile,
            'contractorProfile' => $contractorProfile,
            'showit' => Auth::check(),
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            'region_name' => $regionName,
            'mode' => $mode,
            'total_reviews' => $totalReviews,
            
            'average_rating' => $avgReview,
            'five_stars_count' => $fiveStars,
            'four_stars_count' => $fourStars,
            'three_stars_count' => $threeStars,
            'two_stars_count' => $twoStars,
            'one_star_count' => $oneStar

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

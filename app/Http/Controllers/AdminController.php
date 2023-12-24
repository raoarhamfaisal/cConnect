<?php

namespace App\Http\Controllers;

use App\Models\Profile;

use App\Models\Region;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Inertia\Inertia;


use Illuminate\Http\Request;

class AdminController extends Controller
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
            $profile = Profile::where('user_id', $userID)->with('trades')->first();
        }

     

        $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);

        return Inertia::render('Admin/AdminPage', [
     
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);

        //
    }
        // A helper function to convert the trades to old structure coming from proffile table in trade1, trade2 format
        private function convertTradesToOldStructure($trades) {
            $oldStructure = [];
            for ($i = 1; $i <= 30; $i++) {
                $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
            }
            return $oldStructure;
        }
    
        public function getAllUsersPage()
        {
             // Get current user id
          $userID = Auth()->user('')->id;
          $profile = null;
    
    
          // Get the profile information if the user id exists
          if($userID) {
              $profile = Profile::where('user_id', $userID)->first();
          }
    
        return Inertia::render('Admin/Users/AllUsers', [
            'profile' => $profile,
            'showit' => Auth::check(),
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
       
    ]);
            
        }
        public function getCouponsPage()
        {
            // Get current user id
            $userID = Auth()->user('')->id;
            $profile = null;
    
    
            // Get the profile information if the user id exists
            if($userID) {
                $profile = Profile::where('user_id', $userID)->with('trades')->first();
            }
    
         
    
            $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);
    
            return Inertia::render('Admin/Coupons/CouponsPage', [
         
                'profile' => array_merge($profile->toArray(), $tradesOldStructure),
                'showit' => Auth::check(),
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            ]);
    
            //
        }
        public function getPaymentsPage()
        {
            // Get current user id
            $userID = Auth()->user('')->id;
            $profile = null;
    
    
            // Get the profile information if the user id exists
            if($userID) {
                $profile = Profile::where('user_id', $userID)->with('trades')->first();
            }
    
         
    
            $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);
    
            return Inertia::render('Admin/Payments/AdminPricingPlanPage', [
         
                'profile' => array_merge($profile->toArray(), $tradesOldStructure),
                'showit' => Auth::check(),
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
            ]);
    
            //
        }

        public function getCancelSubscriptionPage()
        {
            // Get current user id
            $userID = Auth()->user('')->id;
            $profile = null;
    
    
            // Get the profile information if the user id exists
            if($userID) {
                $profile = Profile::where('user_id', $userID)->with('trades')->first();
            }
    
         
    
            $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);
    
            return Inertia::render('Admin/Subscription/AdminCancelSubscriptionPage', [
         
                'profile' => array_merge($profile->toArray(), $tradesOldStructure),
                'showit' => Auth::check(),
                'postSearchFilters' => FacadeRequest::only(['postSearch']),
            ]);
    
            //
        }
        public function getPostUserFunctionPage()
        {
            // Get current user id
            $userID = Auth()->user('')->id;
            $profile = null;
    
    
            // Get the profile information if the user id exists
            if($userID) {
                $profile = Profile::where('user_id', $userID)->with('trades')->first();
            }
    
         
    
            $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);
    
            return Inertia::render('Admin/AdminPostUserFunctionPage', [
         
                'profile' => array_merge($profile->toArray(), $tradesOldStructure),
                'showit' => Auth::check(),
                'postSearchFilters' => FacadeRequest::only(['postSearch']),
            ]);
    
            //
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

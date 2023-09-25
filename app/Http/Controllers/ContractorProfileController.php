<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class ContractorProfileController extends Controller
{
    //
    /**
     * Update the contractor's profile general information.
     *
     */
    public function updateGeneralInfo(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'first_name' => 'nullable|string',
                'last_name' => 'nullable|string',
                'company_name' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
            ]);

            $profile->update($data);            
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'General Info Updated Successfully',
            'profile' => $profile,
        ]);    

    }



    
    //
    /**
     * Update the contractor's region & Trades information.
     *
     */
    public function updateRegionTrades(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'region_id' => 'nullable|integer'
            ]);

            $trades = $request->input('trades');

            $profile->update($data);  
            $profile->trades()->sync($trades);
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Region & Trades Updated Successfully',
            'profile' => $profile,
        ]);    

    }


    
    //
    /**
     * Update the contractor's additional information.
     *
     */
    public function updateAdditionalInformation(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'company_name' => 'nullable|string',
                'email' => 'required|string|email|unique:profiles,email,'.$userID,
                'phone_cell' => 'required|string|unique:profiles,phone_cell,'.$userID,
                'phone_office' => 'nullable|string|unique:profiles,phone_cell,'.$userID,
                'address_1' => 'nullable|string',
                'address_2' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
                'counrty' => 'nullable|string',
                'county' => 'nullable|string',
                'zipcode' => 'nullable|string'
            ]);
            $profile->update($data);  
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Additional Information Updated Successfully',
            'profile' => $profile,
        ]);    

    }


    

    //
    /**
     * Update the contractor's Social Links.
     *
     */
    public function updateSocialLinks(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'website_url' => 'nullable|string',
                'facebook' => 'nullable|string',
                'twitter' => 'nullable|string',
                'tiktok' => 'nullable|string',
                'instagram' => 'nullable|string'
            ]);
            $profile->update($data);  
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Social Information Updated Successfully',
            'profile' => $profile,
        ]);    

    }


}



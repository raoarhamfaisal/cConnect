<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function edit(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        return Inertia::render('Profile/Edit', [
            'profile' => $profile,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


    /**
     * Update the user's profile general information.
     *
     * @param  \App\Http\Requests\ProfileGeneralInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
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
                'first_name' => 'nullable|string|max:30',
                'last_name' => 'nullable|string|max:30',
                'email' => 'required|string|email|max:50|unique:profiles,email,'.$userID,
                'phone_cell' => 'required|string|max:13|unique:profiles,phone_cell,'.$userID,
                'longitude' => 'nullable|numeric',
                'latitude' => 'nullable|numeric',
            ]);

            $profile->update($data);

            // // Handle the avatar upload if provided
            // if ($request->hasFile('user_avatar')) {
            //     $avatarPath = $request->file('user_avatar')->store('avatars');
            //     $profile->update(['user_avatar' => $avatarPath]);
            // }            
            
        }
        return Redirect::route('profile.edit');

    }


    /**
     * Update the user's company information.
     *
     * @param  \App\Http\Requests\ProfileCompanyInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateCompanyInfo(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

        // dd($request);


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        // dd($profile);

        if($profile) {

            $data = $request->validate([
                'company_name' => 'nullable|string|max:30',
                'business_start' => 'nullable|date',
                'phone_office' => 'nullable|string|max:13|unique:profiles,phone_cell,'.$userID,
            ]);

            $profile->update($data);

            // // Handle the avatar upload if provided
            // if ($request->hasFile('user_avatar')) {
            //     $avatarPath = $request->file('user_avatar')->store('avatars');
            //     $profile->update(['user_avatar' => $avatarPath]);
            // }            
            
        }
        return Redirect::route('profile.edit');

    }

    /**
     * Update the user's Address information.
     *
     * @param  \App\Http\Requests\ProfileAddressInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateAddressInfo(Request $request)
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
                'address_1' => 'nullable|string|max:30',
                'address_2' => 'nullable|string|max:30',
                'city' => 'nullable|string|max:30',
                'state' => 'nullable|string|max:30',
                'zipcode' => 'nullable|string|max:30',
                'counrty' => 'nullable|string|max:30',
                'county' => 'nullable|string|max:30'
            ]);

            $profile->update($data);


        }
        return Redirect::route('profile.edit');

    }

    /**
     * Update the user's Trades information.
     *
     * @param  \App\Http\Requests\ProfileTradesUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateTrades(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

 

        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }



        if($profile) {


            $validationRules = [];

            for ($i = 1; $i <= 30; $i++) {
                $tradeKey = "trade{$i}";
                $validationRules[$tradeKey] = 'nullable|boolean';
            }
            
            $data = $request->validate($validationRules);
            $profile->update($data);
         
            
        }
        return Redirect::route('profile.edit');

    }

    /**
     * Update the user's Veiws information.
     *
     * @param  \App\Http\Requests\ProfileCompanyInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateViews(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;




        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }
        // dd($request);


        if($profile) {

            $data = $request->validate([
                'view_locale' => 'nullable|boolean',
                'view_territorial'  => 'nullable|boolean',
                'view_regional' => 'nullable|boolean',
                'view_statewide' => 'nullable|boolean',
                'view_nationwide'  => 'nullable|boolean',
                'view_following'  => 'nullable|boolean',
                'view_groups'  => 'nullable|boolean',
            ]);


            $profile->update($data);
            
        }
        return Redirect::route('profile.edit');

    }

    /**
        * Update the user avatar.
        *
        * @param  \App\Http\Requests\ProfileUserAvatarUpdateRequest  $request
        * @return \Illuminate\Http\RedirectResponse
        */

    public function updateUserAvatar(Request $request)
    {


        // return response()->json([
        //     'user' => $user
        // ]);
        // dd($user);
        // Get current user id
        $userID = $request->user_id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        if($profile) {
            $request->validate([
                'user_avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->hasFile('user_avatar')) {

                $file = $request->file('user_avatar');
                $path = $file->store('images/avatars', 'publicc');

                $url = asset($path);

                // Update the user's profile with the new avatar path
                $profile->update([
                    'user_avatar' => $url,
                ]);

                return response()->json([
                    'url' => $url
                ]);
            }else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Avatar not updated successfully',
                    'user_avatar' => '',
                ]);    
        
            }
        }
        // return Redirect::route('profile.edit');
        return response()->json([
            'status' => 'success',
            'message' => 'Avatar updated successfully',
            'user_avatar' => $url,
        ]);    
    }

}
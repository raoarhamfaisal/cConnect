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
                // 'business_start' => 'nullable|date|max:30',
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
}

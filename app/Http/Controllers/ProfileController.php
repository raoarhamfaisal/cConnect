<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Profile;
use App\Models\Region;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
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
            $profile = Profile::where('user_id', $userID)->with('trades')->first();
        }

        $regions = Region::all();

        $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);

        return Inertia::render('Profile/Edit', [
            'regions' => $regions,
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
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


    public function getProfileInfo(Request $request)
    {

        // Construct the response for profile
        $response = [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ];

        return response()->json($response);
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
     * Update the user's Links information.
     *
     * @param  \App\Http\Requests\ProfileCompanyInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateLinks(Request $request)
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

            // // Handle the avatar upload if provided
            // if ($request->hasFile('user_avatar')) {
            //     $avatarPath = $request->file('user_avatar')->store('avatars');
            //     $profile->update(['user_avatar' => $avatarPath]);
            // }            
            
        }
        return Redirect::route('profile.edit');

    }
   public function updateCompanyInfo(Request $request)
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
                'region_id' => 'required|string',
                'address_1' => 'nullable|string|max:200',
                'address_2' => 'nullable|string|max:200',
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
            $selectedTrades = [];
    
            for ($i = 1; $i <= 30; $i++) {
                if ($request->input("trade{$i}")) {
                    $selectedTrades[] = $i;  // Assuming trade IDs are sequential from 1 to 30
                }
            }
            
            // Sync the selected trades with the profile
            $profile->trades()->sync($selectedTrades);
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
    public function updateViewsApi(Request $request)
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

    }
    
    /**
        * Update the user avatar.
        *
        * @param  \App\Http\Requests\ProfileUserAvatarUpdateRequest  $request
        * @return \Illuminate\Http\RedirectResponse
        */

    public function updateUserAvatar(Request $request)
    {
        // Get current user id
        $userID = $request->user_id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }

        $url = "";

        if($profile) {
            $request->validate([
                'user_avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->hasFile('user_avatar')) {

                $file = $request->file('user_avatar');
                $path = $file->store('images/avatars', 'public-storage');

                $userPath = $profile->user_avatar;
                // Update the user's profile with the new avatar path
                $profile->update([
                    'user_avatar' => $path,
                ]);
                $url = asset($path);


                // After saving delete the old profile => user Avatar
                if (File::exists(public_path($userPath))) {
                    // delete old file
                    $pathToDelete = public_path($userPath);
                    File::delete($pathToDelete);
                }
    
            }else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Avatar not updated successfully',
                    'user_avatar' => '',
                ]);    
        
            }
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Avatar updated successfully',
            'user_avatar' => $url,
        ]);    
    }


    /**
        * Update Company Logo
        *
        * @param  \App\Http\Requests\ProfileCompanyLogoUpdateRequest  $request
        * @return \Illuminate\Http\RedirectResponse
        */

        public function updateCompanyLogo(Request $request)
        {
            $userID = $request->user_id;
            $profile = null;
    
            // Get the profile information if the user id exists
            if($userID) {
                $profile = Profile::where('user_id', $userID)->first();
            }

            $url = "";
    
            if($profile) {
                $request->validate([
                    'company_logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                ]);
    
                if ($request->hasFile('company_logo')) {
    
                    $companyLogoPath = $profile->company_logo;
                    $file = $request->file('company_logo');
                    $path = $file->store('images/company-logos', 'public-storage');
    
                    $url = asset($path);
    
                    // Update the user's profile with the new avatar path
                    $profile->update([
                        'company_logo' => $path,
                    ]);

                    // After saving delete the old profile => Company Logo
                    if (File::exists(public_path($companyLogoPath))) {
                        // delete old file
                        $pathToDelete = public_path($companyLogoPath);
                        File::delete($pathToDelete);
                    }
    
                }else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Avatar not updated successfully',
                        'company_logo' => '',
                    ]);    
            
                }
            }
            // Return json response because this is an api axios call
            return response()->json([
                'status' => 'success',
                'message' => 'Avatar updated successfully',
                'company_logo' => $url,
            ]);    
        }

        // A helper function to convert the trades to old structure coming from proffile table in trade1, trade2 format
        private function convertTradesToOldStructure($trades) {
            $oldStructure = [];
            for ($i = 1; $i <= 30; $i++) {
                $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
            }
            return $oldStructure;
        }
            
}

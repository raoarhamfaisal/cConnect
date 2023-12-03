<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Profile;
use App\Models\ContractorProfile;
use App\Models\Region;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request as FacadeRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationCode;
use App\Models\SessionViewSetting;
use App\Models\SessionTrade;


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
       

        // pass on any existing search filters that exist
        // along with data
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);
    }
    public function setup(Request $request)
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

        return Inertia::render('Profile/ProfileSetup', [
            'regions' => $regions,
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        // pass on any existing search filters that exist
        // along with data
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);
    }
    public function settings(Request $request)
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

        return Inertia::render('Profile/Settings', [
            'regions' => $regions,
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        // pass on any existing search filters that exist
        // along with data
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);
    }
    public function getProfile(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->with('trades')->first();
        }


        $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);

        // Construct the response for profile
        $response = [
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
        ];


        return response()->json($response);
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

        return Inertia::render('Profile/PaymentPage', [
     
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);

        //
    }
    public function getSubFinderPage()
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

        return Inertia::render('SubFinder/SubFinderPage', [
     
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
            'regions' => $regions,
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);

        //
    }

    public function getPricingPlanPage()
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->with('trades')->first();
        }

     
     

        $tradesOldStructure = $this->convertTradesToOldStructure($profile->trades);

        return Inertia::render('PricingPlanPage', [
     
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
          
        'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);

        //
    }
    public function getRedFlagPage()
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

        return Inertia::render('RedFlag/RedFlagPage', [
     
            'profile' => array_merge($profile->toArray(), $tradesOldStructure),
            'showit' => Auth::check(),
            'regions' => $regions,
            'postSearchFilters' => FacadeRequest::only(['postSearch']),
        ]);

        //
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
                'phone_cell' => 'required|string|max:13',
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
                'phone_office' => 'nullable|string|max:13',
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


            $selectedSessionTrades = [];
    
            // Iterate through possible trades
            for ($i = 1; $i <= 30; $i++) {
                // Check whether the trade is selected (value is 1)
                if ($request->input("trade{$i}") == 1) {
                    $selectedSessionTrades[] = $i;  // Assuming trade IDs are sequential from 1 to 30
                }
            }
    
            // Delete or deactivate unselected trades
            SessionTrade::where('profile_id', $profile->id)
                ->whereNotIn('trade_id', $selectedSessionTrades)
                ->delete();
    
            // Update or create selected trades
            foreach ($selectedSessionTrades as $sessionTrade) {
                SessionTrade::updateOrCreate(
                    ['profile_id' => $profile->id, 'trade_id' => $sessionTrade]
                );
            }


        }
        return ['message' =>"Trades successfully updated"];
    
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
                'view_regional' => 'nullable|boolean',
                'view_statewide' => 'nullable|boolean',
                'view_nationwide'  => 'nullable|boolean',
                'view_following'  => 'nullable|boolean'
            ]);


            $profile->update($data);

            SessionViewSetting::updateOrCreate(
                ['profile_id' => $profile->id],
                $data
            );
            
        }
        return ['message' =>"Views successfully updated"];

    }



    /**
     * Update the user's Trades information.
     *
     * @param  \App\Http\Requests\ProfileTradesUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateTradesProfileSetup(Request $request)
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


            // Delete or deactivate unselected trades
            SessionTrade::where('profile_id', $profile->id)
                ->whereNotIn('trade_id', $selectedTrades)
                ->delete();


            foreach ($selectedTrades as $trade) {
                SessionTrade::updateOrCreate(
                    ['profile_id' => $profile->id, 'trade_id' => $trade]
                );
            }

        }
        return ['message' =>"Trades successfully updated"];
    
    }


    
    /**
     * Update the user's Trades information for views Settings
     *
     * @param  \App\Http\Requests\ProfileTradesUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateTradesViewsSettings(Request $request)
    {
        // Get current user id
        $userID = Auth()->user()->id;
        $profile = null;
    
        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }
    
        if($profile) {
            $selectedTrades = [];
    
            // Iterate through possible trades
            for ($i = 1; $i <= 30; $i++) {
                // Check whether the trade is selected (value is 1)
                if ($request->input("trade{$i}") == 1) {
                    $selectedTrades[] = $i;  // Assuming trade IDs are sequential from 1 to 30
                }
            }
    
            // Delete or deactivate unselected trades
            SessionTrade::where('profile_id', $profile->id)
                ->whereNotIn('trade_id', $selectedTrades)
                ->delete();
    
            // Update or create selected trades
            foreach ($selectedTrades as $trade) {
                SessionTrade::updateOrCreate(
                    ['profile_id' => $profile->id, 'trade_id' => $trade]
                );
            }
    
            return ['message' =>"Trades successfully updated"];
        }
    
        return ['message' =>"User not found or an error occurred"];
    }
    



    /**
     * Get the user's trade & views Settings
     *
     * @param  \App\Http\Requests\ProfileTradesUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getTradeViewsSettings(Request $request)
    {
        // Get current user id
        $userID = Auth()->user()->id;
    
        // Initialize response data
        $contractorProfile = [
            'view_locale' => null,
            'view_regional' => null,
            'view_statewide' => null,
            'view_nationwide' => null,
            'view_following' => null,
        ];
    
        // Pre-fill trades in contractorProfile with default value (0)
        for ($i = 1; $i <= 30; $i++) {
            $contractorProfile["trade{$i}"] = 0;
        }
    
        $message = 'User not found or no settings available.';
    
        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)
                ->with(['sessionTrades', 'sessionViewSettings'])
                ->first();
    
            if($profile) {
                // Update response data
                $message = "Settings retrieved successfully.";
                
                // Update view settings in contractorProfile
                if($profile->sessionViewSettings) {
                    $contractorProfile['view_locale'] = $profile->sessionViewSettings->view_locale;
                    $contractorProfile['view_regional'] = $profile->sessionViewSettings->view_regional;
                    $contractorProfile['view_statewide'] = $profile->sessionViewSettings->view_statewide;
                    $contractorProfile['view_nationwide'] = $profile->sessionViewSettings->view_nationwide;
                    $contractorProfile['view_following'] = $profile->sessionViewSettings->view_following;
                }
    
                // Update trades in contractorProfile
                foreach ($profile->sessionTrades as $trade) {
                    // Assuming trade_id is between 1 and 30
                    $contractorProfile["trade{$trade->trade_id}"] = 1;
                }
            }
        }
    
        return response()->json([
            'profile' => $contractorProfile,
            'message' => $message,
        ]);
    }
    







    
    /**
     * Update the user's Veiws information.
     *
     * @param  \App\Http\Requests\ProfileCompanyInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateViewsProfileSetup(Request $request)
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
                'view_regional' => 'nullable|boolean',
                'view_statewide' => 'nullable|boolean',
                'view_nationwide'  => 'nullable|boolean',
                'view_following'  => 'nullable|boolean'
            ]);


            $profile->update($data);

            SessionViewSetting::updateOrCreate(
                ['profile_id' => $profile->id],
                $data
            );

            
        }
        return ['message' =>"Views successfully updated"];

    }


    /**
     * Update the user's Veiws information for views Settings
     *
     * @param  \App\Http\Requests\ProfileCompanyInformationUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateViewsViewsSettings(Request $request)
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
                'view_regional' => 'nullable|boolean',
                'view_statewide' => 'nullable|boolean',
                'view_nationwide'  => 'nullable|boolean',
                'view_following'  => 'nullable|boolean'
            ]);


            SessionViewSetting::updateOrCreate(
                ['profile_id' => $profile->id],
                $data
            );

        }
        return ['message' =>"Views successfully updated"];

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
        return false;

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
                'user_avatar' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);

            if ($request->hasFile('user_avatar')) {

                $file = $request->file('user_avatar');

                // Generate new filename
                $filename = sprintf("%06d", $userID) . '_' . $file->hashName();

                // Check if a file with the new filename already exists and delete it
                $existingFilePath = 'uploads/avatars/' . $filename;
                if (Storage::disk('public-storage')->exists($existingFilePath)) {
                    Storage::disk('public-storage')->delete($existingFilePath);
                }

                // Store the file with the new filename
                $path = $file->storeAs('uploads/avatars', $filename, 'public-storage');


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
                'company_logo' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);

            if ($request->hasFile('company_logo')) {

                $companyLogoPath = $profile->company_logo;
                $file = $request->file('company_logo');

                // Generate new filename
                $filename = sprintf("%06d", $userID) . '_' . $file->hashName();

                // Check if a file with the new filename already exists and delete it
                $existingFilePath = 'uploads/company_logos/' . $filename;
                if (Storage::disk('public-storage')->exists($existingFilePath)) {
                    Storage::disk('public-storage')->delete($existingFilePath);
                }

                // Store the file with the new filename
                $path = $file->storeAs('uploads/company_logos', $filename, 'public-storage');


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
                    'message' => 'Company Logo not updated successfully',
                    'company_logo' => '',
                ]);    
        
            }
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Company Logo updated successfully',
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



    public function updateBasicInfo(Request $request)
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
                'first_name' => 'required|string|max:256',
                'last_name' => 'required|string|max:256',
                'phone_cell' => 'required|string',
                'company_name' => 'required|string',
                'phone_office' => 'nullable|string',
                'region_id' => 'required|string',
                'address_1' => 'required|string',
                'address_2' => 'nullable|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zipcode' => 'required|string',
                'county' => 'required|string',

                'website_url' => 'nullable|string',
                'facebook' => 'nullable|string',
                'twitter' => 'nullable|string',
                'tiktok' => 'nullable|string',
                'instagram' => 'nullable|string'
            ]);


            $profile->update($data);

            $userData = $request->validate([
                'first_name' => 'required|string|max:256',
                'last_name' => 'required|string|max:256',
            ]);

            $user = $request->user();
            $user->update($userData);
        }
        return ['message' =>"Views successfully updated", 'profile' => $profile];

    }



    public function updateBasicInfoForProfileSetup(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
            $contractorProfile = ContractorProfile::where('user_id', $userID)->first();
        }


        if($profile) {

            $data = $request->validate([
                'first_name' => 'required|string|max:256',
                'last_name' => 'required|string|max:256',
                'phone_cell' => 'required|string',
                'company_name' => 'required|string',
                'phone_office' => 'nullable|string',
                'region_id' => 'required|string',
                'address_1' => 'required|string',
                'address_2' => 'nullable|string',
                'city' => 'required|string',
                'state' => 'required|string',
                'zipcode' => 'required|string',
                'county' => 'required|string',

                'website_url' => 'nullable|string',
                'facebook' => 'nullable|string',
                'twitter' => 'nullable|string',
                'tiktok' => 'nullable|string',
                'instagram' => 'nullable|string'
            ]);


            $profile->update($data);
            $contractorProfile->update($data);


            $userData = $request->validate([
                'first_name' => 'required|string|max:256',
                'last_name' => 'required|string|max:256',
            ]);

            $user = $request->user();
            $user->update($userData);
        }
        return ['message' =>"Views successfully updated", 'profile' => $profile];

    }



    public function verifyPayment(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = Profile::where('user_id', $userID)->first();
        }
        if($profile) {
            $profile->is_payment_verified = 1;
            $profile->update();
        }
        return ['message' =>"Views successfully updated", 'profile' => $profile];

    }


    public function changeEmail(Request $request)
    {
        $request->validate([
            'new_email' => 'required|email|unique:users,email',
        ]);
    
        $user = $request->user();
    
        // Generate a 6-digit token
        $token = rand(100000, 999999);
    
        // Store the token in the database with a 2-minute expiration
        DB::table('email_verifications')->insert([
            'user_id' => $user->id,
            'new_email' => $request->new_email,
            'token' => $token,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);
    
        // Send the token to the new email
        Mail::to($request->new_email)->send(new EmailVerificationCode($token));
    
        return response()->json(['message' => 'Verification code sent to new email.']);
    } 
    
    
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'token' => 'required|size:6',
        ]);
    
        $user = $request->user();
    
        $verification = DB::table('email_verifications')
            ->where('user_id', $user->id)
            ->where('token', $request->token)
            ->first();
    
        if (!$verification) {
            return response()->json(['message' => 'Invalid verification code.'], 400);
        }
    
        if (Carbon::parse($verification->expires_at)->lt(Carbon::now())) {
            return response()->json(['message' => 'Verification code has expired.'], 400);
        }
    
        // Update the user's email
        $user->email = $verification->new_email;
        $user->save();

        $profile = Profile::where('user_id', $user->id)->first();
        $contractorProfile = ContractorProfile::where('user_id', $user->id)->first();

        if($profile) {
            $profile->email = $verification->new_email;
            $profile->save();
        }

        if($contractorProfile) {
            $contractorProfile->email = $verification->new_email;
            $contractorProfile->save();
        }



    
        // Delete the verification entry
        DB::table('email_verifications')->where('id', $verification->id)->delete();
    
        return response()->json(['message' => 'Email updated successfully.']);
    }    
    
            
}

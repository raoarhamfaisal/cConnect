<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractorProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

use Illuminate\Support\Facades\Storage;

use App\Models\Template;
use App\Models\ColorScheme;


class ContractorProfileController extends Controller
{
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
            $profile = ContractorProfile::where('user_id', $userID)->first();
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
            $profile = ContractorProfile::where('user_id', $userID)->first();
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
            $profile = ContractorProfile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'company_name' => 'nullable|string',
             
                'phone_cell' => 'required|string|unique:profiles,phone_cell,'.$userID,
                'phone_office' => 'nullable|string|unique:profiles,phone_cell,'.$userID,
                'address_1' => 'nullable|string',
                'address_2' => 'nullable|string',
                'city' => 'nullable|string',
                'state' => 'nullable|string',
             
                'county' => 'nullable|string',
                'zipcode' => 'nullable|string'
            ]);
            $profile->update($data);  
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Contact Info Updated Successfully',
            'profile' => $profile,
        ]);    

    }


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
            $profile = ContractorProfile::where('user_id', $userID)->first();
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


    /**
    * Update the user avatar.
    *
    * @param  \App\Http\Requests\ProfileUserAvatarUpdateRequest  $request
    * @return \Illuminate\Http\RedirectResponse
    */

    public function updateUserAvatar(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = ContractorProfile::where('user_id', $userID)->first();
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
                $existingFilePath = 'uploads/avatars/contractor/' . $filename;
                if (Storage::disk('public-storage')->exists($existingFilePath)) {
                    Storage::disk('public-storage')->delete($existingFilePath);
                }

                // Store the file with the new filename
                $path = $file->storeAs('uploads/avatars/contractor', $filename, 'public-storage');

                $userPath = $profile->user_avatar;
                // Update the user's profile with the new avatar path
                $profile->update([
                    'user_avatar' => $path,
                ]);
                $url = $path;


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
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;

        // Get the profile information if the user id exists
        if($userID) {
            $profile = ContractorProfile::where('user_id', $userID)->first();
        }

        $url = "";

        if($profile) {
            $request->validate([
                'company_logo' => 'required|image|mimes:jpeg,png,jpg,gif',
            ]);

            if ($request->hasFile('company_logo')) {

                $file = $request->file('company_logo');

                // Generate new filename
                $filename = sprintf("%06d", $userID) . '_' . $file->hashName();

                // Check if a file with the new filename already exists and delete it
                $existingFilePath = 'uploads/company_logos/contractor/' . $filename;
                if (Storage::disk('public-storage')->exists($existingFilePath)) {
                    Storage::disk('public-storage')->delete($existingFilePath);
                }

                // Store the file with the new filename
                $path = $file->storeAs('uploads/company_logos/contractor', $filename, 'public-storage');
                
                
                $url = $path;
                $companyLogoPath = $profile->company_logo;
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


    /**
     * Update the contractor's profile general information.
     *
     */
    public function updateBottomAndClosingText(Request $request)
    {
        // Get current user id
        $userID = Auth()->id(); // Simplified user ID retrieval
    
        // Get the profile information if the user id exists
        $profile = $userID ? ContractorProfile::where('user_id', $userID)->first() : null;
    
        if($profile) {
    
            $data = $request->validate([
                'bottom_text' => 'nullable|string',
                'closing_text' => 'nullable|string',
            ]);
    
            // Sanitize input to prevent XSS
            if(array_key_exists('bottom_text', $data) && $data['bottom_text']) {
                $data['bottom_text'] = e($data['bottom_text']);
            }
    
            if(array_key_exists('closing_text', $data) && $data['closing_text']) {
                $data['closing_text'] = e($data['closing_text']);
            }
    
            // Update profile
            $profile->update($data);            
        } else {
            // Return error response if profile not found
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not found',
            ], 404);
        }
    
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Bottom and Closing Text Updated Successfully',
            'profile' => $profile,
        ]);    
    }
    





    // Get all templates
    public function getAllTemplates(Request $request) {
        $allTemplates = Template::get()->all();
        return response()->json([
            'allTemplates' => $allTemplates
        ], 200);
    }

    // Update template
    public function updateTemplate(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = ContractorProfile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'template_id' => 'required|number',
            ]);

            $profile->update($data);            
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Template Updated Successfully',
            'profile' => $profile,
        ]);    

    }


    // Get all color schemes
    public function getAllColorSchemes(Request $request) {
        $allColorSchemes = ColorScheme::get()->all();
        return response()->json([
            'allColorSchemes' => $allColorSchemes
        ], 200);
    }

    // Update color scheme
    public function updateColorScheme(Request $request)
    {
        // Get current user id
        $userID = Auth()->user('')->id;
        $profile = null;


        // Get the profile information if the user id exists
        if($userID) {
            $profile = ContractorProfile::where('user_id', $userID)->first();
        }

        if($profile) {

            $data = $request->validate([
                'color_scheme_id' => 'required|number',
            ]);

            $profile->update($data);            
        }
        // Return json response because this is an api axios call
        return response()->json([
            'status' => 'success',
            'message' => 'Color Scheme Updated Successfully',
            'profile' => $profile,
        ]);    

    }

}



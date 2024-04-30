<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractorProfile;
use Illuminate\Database\Eloquent\Builder;

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
             
                'phone_cell' => 'required|string',
                'phone_office' => 'nullable|string',
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
                'message' => 'ContractorProfile not found',
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
                'template_id' => 'required',
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
                'color_scheme_id' => 'required',
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


    private function convertTradesToOldStructure($trades) 
    {
        $oldStructure = [];
        for ($i = 1; $i <= 30; $i++) {
            $oldStructure["trade{$i}"] = $trades->contains('id', $i) ? 1 : 0;
        }
        return $oldStructure;
    }
    



    public function findContractors(Request $request)
    {
        $user = $request->user();
        $regionId = $request->query('region_id');
        $tradeId = $request->query('trade_id');
        $perPage = $request->query('per_page', 15);
        $page = $request->query('page', 1);
        $sortBy = $request->query('sort_by', '');
        $searchTerm = $request->query('search_term');
        $preferenceStatus = $request->query('preference_status');
    
        // Subquery for average rating and total reviews
        $ratingSubquery = \DB::table('reviews')
            ->select('contractor_id', 
                \DB::raw('AVG(rating) as average_rating'),
                \DB::raw('COUNT(*) as total_reviews'))
            ->whereNull('deleted_at')  // Exclude soft-deleted records
            ->groupBy('contractor_id');
    
        // Start the query for contractor_profiles
        $query = ContractorProfile::with('trades:id')
            ->join('profiles', 'profiles.user_id', '=', 'contractor_profiles.user_id')
            ->leftJoin('contractor_profile_user', function($join) use ($user) {
                $join->on('contractor_profile_user.contractor_profile_id', '=', 'contractor_profiles.id')
                    ->where('contractor_profile_user.user_id', '=', $user->id);
            })
            ->leftJoinSub($ratingSubquery, 'rating_info', function ($join) {
                $join->on('rating_info.contractor_id', '=', 'profiles.id');
            })
            ->select('contractor_profiles.*', 
                    'rating_info.average_rating', 
                    'rating_info.total_reviews',
                    'contractor_profile_user.notes as user_preference_notes',
                    'contractor_profile_user.preference_status as user_preference_status');  // Selecting the preference status
        
        // Apply the where clause for preference status conditionally
        if ($preferenceStatus) {
            $query->where('contractor_profile_user.preference_status', $preferenceStatus);
        }                
        // Filtering by region
        if ($regionId) {
            $query->where('contractor_profiles.region_id', $regionId);
        }

        // Filtering by preference status
        if ($preferenceStatus) {
            // Use a WHERE EXISTS clause to check if a preference_status meets the condition
            $query->whereExists(function ($subQuery) use ($user, $preferenceStatus) {
                $subQuery->select(\DB::raw(1))
                        ->from('contractor_profile_user')
                        ->whereRaw('contractor_profile_user.contractor_profile_id = contractor_profiles.id')
                        ->where('contractor_profile_user.user_id', '=', $user->id)
                        ->where('contractor_profile_user.preference_status', '=', $preferenceStatus);
            });
        }
    
        // If trade is specified, add a constraint for it
        if ($tradeId) {
            $query->whereHas('trades', function ($subQuery) use ($tradeId) {
                $subQuery->where('trades.id', $tradeId);
            });
        }


        // Search by name or company name functionality
        if ($searchTerm) {
            $query->where(function ($q) use ($searchTerm) {
                $q->where('contractor_profiles.first_name', 'like', '%' . $searchTerm . '%')
                ->orWhere('contractor_profiles.last_name', 'like', '%' . $searchTerm . '%')
                ->orWhere('contractor_profiles.email', 'like', '%' . $searchTerm . '%')
                ->orWhere('contractor_profiles.company_name', 'like', '%' . $searchTerm . '%');
            });
        }
    
        // Sort by rating or registration date if requested
        switch ($sortBy) {
            case 'high_rated':
                $query->orderByDesc('average_rating');
                break;
            case 'low_rated':
                $query->orderBy('average_rating');
                break;
            case 'newly_registered':
                $query->orderByDesc('contractor_profiles.created_at');
                break;
            case 'oldest_registered':
                $query->orderBy('contractor_profiles.created_at');
                break;
        }
    
        // Get the paginated result
        $contractors = $query->paginate($perPage, ['*'], 'page', $page);
    
        // Transform the pagination result to include trades in the specified format
        $contractors->getCollection()->transform(function ($contractor) {
            $tradesArray = [];

            // Initialize all trades to 0
            for ($i = 1; $i <= 30; $i++) {
                $tradesArray["trade$i"] = 0;
            }

            // Now set to 1 if the trade is present for the contractor
            foreach ($contractor->trades as $trade) {
                $tradesArray["trade{$trade->id}"] = 1;
            }

            // Remove the original trades relationship
            unset($contractor->trades);

            // Convert the Eloquent Model to an array for modification
            $contractorArray = $contractor->toArray();
                
            // Merge the transformed trades into the contractor object
            $contractor = array_merge($contractorArray, $tradesArray);

            // Add preference status and notes to the contractor object with a fallback to null
            $contractor['preference_status'] = $contractorArray['preference_status'] ?? null;
            $contractor['notes'] = $contractorArray['user_preference_notes'] ?? null;

            // Add total_reviews to the contractor object
            // Accessing 'total_reviews' from $contractorArray since it's an array
            $contractor['total_reviews'] = $contractorArray['total_reviews'];

            // Add user preference status to the contractor object
            $contractor['preference_status'] = $contractor['user_preference_status'] ?? null;

            return $contractor;          
        });
    
        // Construct the response with contractors and pagination information
        return response()->json([
            'contractors' => $contractors->items(),
            'pagination' => [
                'current_page' => $contractors->currentPage(),
                'last_page' => $contractors->lastPage(),
                'per_page' => $contractors->perPage(),
                'total' => $contractors->total(),
            ],
        ]);
    }
        

    public function setPreferenceAndNotes(Request $request, ContractorProfile $contractor_profile)
    {
        $user = $request->user();
    
        // Validate the request
        $validatedData = $request->validate([
            'preference_status' => 'sometimes|nullable|in:Preferred,Back-Up,Possible,Rejected',
            'notes' => 'sometimes|string',
        ]);
    
        // Prepare the data to update
        $updateData = [];
        if ($request->has('preference_status')) {
            $updateData['preference_status'] = $validatedData['preference_status'];
        }
        if ($request->has('notes')) {
            $updateData['notes'] = $validatedData['notes'] === '' ? null : $validatedData['notes'];
        }
    
        // Make sure we have data to update
        if (count($updateData) === 0) {
            return response()->json(['message' => 'No valid data provided to update.'], 422);
        }
    
        // Attach or Update the preference status or notes
        $user->contractor_profiles()->syncWithoutDetaching([
            $contractor_profile->id => $updateData
        ]);
    
        // Return a response
        return response()->json(['message' => 'Preference or notes updated successfully.']);
    }
        

}



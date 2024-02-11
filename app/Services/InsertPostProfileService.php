<?php

namespace App\Services;

use App\Models\Profile;

class InsertPostProfileService
{
    public function insertPostersProfile($validatedInput)
    {
        // Set user_id for post
        $userID = Auth()->user('')->id;
        $validatedInput['user_id'] = $userID;
    
        // Get user info based on user id
        $postersProfile = Profile::where('user_id', $userID)
            ->first()
            ->only(
                'region_id',
                'view_locale',
                'view_territorial',
                'view_regional',
                'view_statewide',
                'view_nationwide',
                'view_following',
                'view_groups',
                'longitude',
                'latitude',
            );
    
        // Load trades for the user's profile
        $profile = Profile::where('user_id', $userID)->with('trades:id')->first();
        $trades = $this->convertTradesToOldStructure($profile->trades);
        $postersProfile = array_merge($postersProfile, $trades);
    
        // Populate the $validatedInput with the profile's data
        $viewFields = [
            'view_locale', 'view_territorial', 'view_regional', 'view_statewide',
            'view_nationwide', 'view_following', 'view_groups'
        ];
    
        foreach ($viewFields as $field) {
            $validatedInput[$field] = $postersProfile[$field];
        }
    
        for ($i = 1; $i <= 30; $i++) {
            $validatedInput["trade{$i}"] = $postersProfile["trade{$i}"];
        }
    
        $validatedInput['longitude'] = $postersProfile['longitude'];
        $validatedInput['latitude'] = $postersProfile['latitude'];
        $validatedInput['region_id'] = $postersProfile['region_id'];
    
        return $validatedInput;
    }
    
    private function convertTradesToOldStructure($trades)
    {
        $oldStructure = [];
        for ($i = 1; $i <= 30; $i++) {
            $oldStructure["trade{$i}"] = isset($trades[$i-1]) ? $trades[$i-1]->id : null;
        }
        return $oldStructure;
    }
}

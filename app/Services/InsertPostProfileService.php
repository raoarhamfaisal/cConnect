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
        //dd($validatedInput);

        // SEND profile & posts to Postings.vue
        // Get user info based user id
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
                'trade1',
                'trade2',
                'trade3',
                'trade4',
                'trade5',
                'trade6',
                'trade7',
                'trade8',
                'trade9',
                'trade10',
                'trade11',
                'trade12',
                'trade13',
                'trade14',
                'trade15',
                'trade16',
                'trade17',
                'trade18',
                'trade19',
                'trade20',
                'trade21',
                'trade22',
                'trade23',
                'trade24',
                'trade25',
                'trade26',
                'trade27',
                'trade28',
                'trade29',
                'trade30',
                'longitude',
                'latitude',
            );

        $validatedInput['view_locale'] = $postersProfile['view_locale'];
        $validatedInput['view_territorial'] = $postersProfile['view_territorial'];
        $validatedInput['view_regional'] = $postersProfile['view_regional'];
        $validatedInput['view_statewide'] = $postersProfile['view_statewide'];
        $validatedInput['view_nationwide'] = $postersProfile['view_nationwide'];
        $validatedInput['view_following'] = $postersProfile['view_following'];
        $validatedInput['view_groups'] = $postersProfile['view_groups'];

        $validatedInput['trade1'] = $postersProfile['trade1'];
        $validatedInput['trade2'] = $postersProfile['trade2'];
        $validatedInput['trade3'] = $postersProfile['trade3'];
        $validatedInput['trade4'] = $postersProfile['trade4'];
        $validatedInput['trade5'] = $postersProfile['trade5'];
        $validatedInput['trade6'] = $postersProfile['trade6'];
        $validatedInput['trade7'] = $postersProfile['trade7'];
        $validatedInput['trade8'] = $postersProfile['trade8'];
        $validatedInput['trade9'] = $postersProfile['trade9'];
        $validatedInput['trade10'] = $postersProfile['trade10'];

        $validatedInput['trade11'] = $postersProfile['trade11'];
        $validatedInput['trade12'] = $postersProfile['trade12'];
        $validatedInput['trade13'] = $postersProfile['trade13'];
        $validatedInput['trade14'] = $postersProfile['trade14'];
        $validatedInput['trade15'] = $postersProfile['trade15'];
        $validatedInput['trade16'] = $postersProfile['trade16'];
        $validatedInput['trade17'] = $postersProfile['trade17'];
        $validatedInput['trade18'] = $postersProfile['trade18'];
        $validatedInput['trade19'] = $postersProfile['trade19'];
        $validatedInput['trade20'] = $postersProfile['trade20'];

        $validatedInput['trade21'] = $postersProfile['trade21'];
        $validatedInput['trade22'] = $postersProfile['trade22'];
        $validatedInput['trade23'] = $postersProfile['trade23'];
        $validatedInput['trade24'] = $postersProfile['trade24'];
        $validatedInput['trade25'] = $postersProfile['trade25'];
        $validatedInput['trade26'] = $postersProfile['trade26'];
        $validatedInput['trade27'] = $postersProfile['trade27'];
        $validatedInput['trade28'] = $postersProfile['trade28'];
        $validatedInput['trade29'] = $postersProfile['trade29'];
        $validatedInput['trade30'] = $postersProfile['trade30'];

        $validatedInput['longitude'] = $postersProfile['longitude'];
        $validatedInput['latitude'] = $postersProfile['latitude'];
        $validatedInput['region_id'] = $postersProfile['region_id'];

        return $validatedInput;
    }
}

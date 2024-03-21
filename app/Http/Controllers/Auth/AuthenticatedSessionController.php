<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Profile;
use App\Models\SessionViewSetting;
use App\Models\SessionTrade;
use App\Models\ContractorProfile;
use App\Models\ContractorImageSectionsDefault;
use App\Models\ImageSection;
use App\Models\BragSection;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('index', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);

        // return Inertia::render('Auth/Login', [
        //     'canResetPassword' => Route::has('password.request'),
        //     'status' => session('status'),
        // ]);

    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();
        // $request->user()->createToken($request->token_name)->plainTextToken;

        $user = User::where('email', $request->email)->first();

        
        
        if($user) {
            $profile = Profile::where('user_id', $user->id)->first();

            if($profile) {
    
                // Store SessionViewSetting
                $sessionViewSetting = [
                    'view_locale' => $profile->view_locale,
                    'view_regional' => $profile->view_regional,
                    'view_statewide' => $profile->view_statewide,
                    'view_nationwide' => $profile->view_nationwide,
                    'view_following' => $profile->view_following,
                ];
                SessionViewSetting::updateOrCreate(
                    ['profile_id' => $profile->id],
                    $sessionViewSetting
                );

                // Delete or deactivate unselected trades
                SessionTrade::where('profile_id', $profile->id)
                    ->delete();
    
                // Store SessionTrade
                $profileTrades = $profile->trades;
                foreach ($profileTrades as $trade) {
                    SessionTrade::updateOrCreate(
                        ['profile_id' => $profile->id, 'trade_id' => $trade->id]
                    );
                }


                $contractorProfile = ContractorProfile::where('user_id', $profile->user_id)->first();

                if(!$contractorProfile) {
                    // Fetch the default values
                    $defaults = ContractorImageSectionsDefault::first();


                    $contractorProfile = new ContractorProfile();
                    $profile->bottom_text = $defaults->bottom_text;
                    $profile->closing_text = $defaults->closing_text;    
                    $profile->template_id = 1;
                    $profile->color_scheme_id = 1;
                    $contractorProfile->fill($profile->toArray()); // This copies all attributes from the profile to contractor profile

                    $contractorProfile->save();  
                    $contractorProfile->trades()->sync($profile->trades);   


                    if ($defaults) {
                        $imageSections = [
                            ['text' => $defaults->first_title_text, 'image' => $defaults->first_title_image],
                            ['text' => $defaults->second_title_text, 'image' => $defaults->second_title_image],
                        ];

                        foreach ($imageSections as $section) {
                            $imageSection = new ImageSection();
                            $imageSection->section_image = $section['image'];
                            $imageSection->section_text = $section['text'];
                            $imageSection->contractor_profile_id = $contractorProfile->id;
                            $imageSection->save();
                        }

                        $bragSections = [
                            ['text' => $defaults->brag1_text, 'image' => $defaults->brag1_image],
                            ['text' => $defaults->brag2_text, 'image' => $defaults->brag2_image],
                        ];

                        foreach ($bragSections as $theBragSection) {
                            $bragSection = new BragSection();
                            $bragSection->section_image = $theBragSection['image'];
                            $bragSection->section_text = $theBragSection['text'];
                            $bragSection->contractor_profile_id = $contractorProfile->id;
                            $bragSection->save();
                        }
                    }            
                }


            }            


            if(!$profile->is_payment_verified) {
                return redirect(RouteServiceProvider::PROFILE);
            }
        }
        

        return redirect()->intended(RouteServiceProvider::HOME);
    }


    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function loginUser($user, $request)
    {
        Auth::login($user);
        $request->session()->regenerate();
        return redirect(RouteServiceProvider::PROFILE);
    }
    
    
    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

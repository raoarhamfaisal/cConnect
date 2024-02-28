<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use App\Models\ContractorProfile;
use App\Models\ContractorImageSectionsDefault;
use App\Models\ImageSection;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register',[
            'showit' => Auth::check(),
            
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        $profile = Profile::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'company_name' => $request->company_name,
            'email' => $request->email,
            'view_locale' => 1,
            'view_regional' => 1
        ]);

        $randomTrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        $profile->trades()->attach($randomTrades);  
        
        $profile = Profile::where('user_id', $user->id)->with('trades')->first();
        // If profile is found in the Profile model, save it to the ContractorProfile model
        if ($profile) {
            $contractorProfile = new ContractorProfile();
            $profile->bottom_text = "Default Bottom Text";
            $profile->closing_text = "Default Closing Text";
            $profile->template_id = 1;
            $profile->color_scheme_id = 1;
            $contractorProfile->fill($profile->toArray()); // This copies all attributes from the profile to contractor profile

            $contractorProfile->save();  
            $contractorProfile->trades()->sync($profile->trades);   

            // Fetch the default values
            $defaults = ContractorImageSectionsDefault::first();

            if ($defaults) {
                $sections = [
                    ['text' => $defaults->first_title_text, 'image' => $defaults->first_title_image],
                    ['text' => $defaults->second_title_text, 'image' => $defaults->second_title_image],
                    ['text' => $defaults->brag1_text, 'image' => $defaults->brag1_image],
                    ['text' => $defaults->brag2_text, 'image' => $defaults->brag2_image],
                ];

                foreach ($sections as $section) {
                    $imageSection = new ImageSection();
                    $imageSection->section_image = $section['image'];
                    $imageSection->section_text = $section['text'];
                    $imageSection->contractor_profile_id = $contractorProfile->id;
                    $imageSection->save();
                }
            }            
            
        }        

        event(new Registered($user));

        // Auth::login($user);
        $authenticatedSessionController = new AuthenticatedSessionController();
        return $authenticatedSessionController->loginUser($user, $request);
    
    }
}

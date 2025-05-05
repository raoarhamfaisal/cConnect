<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use App\Models\SessionTrade;
use App\Models\ContractorProfile;
use App\Models\ContractorImageSectionsDefault;
use App\Models\ImageSection;
use App\Models\BragSection;
use App\Models\UserVersionDetail;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\SessionViewSetting;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewEmailVerificationCode;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {

        // dd($request->user());
        $user = $request->user();
        $profile = null;

        if($user) {
            $profile = $user->profile;
        }

        // dd($profile);

        return Inertia::render('Auth/Register',[
            'showit' => false, //Auth::check()
            'user' => $request->user(),
            'profile' => $profile
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

        try {

            $userID = $request->get('id');

            $user = User::find($userID);



            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'company_name' => 'nullable|string|max:255',
                // 'email' => 'required|string|email|max:255|unique:'.User::class,
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class), // Ensure the email is unique in the users table
                    Rule::unique(Profile::class, 'email'), // Ensure the email is unique in the profiles table
                    Rule::unique(ContractorProfile::class, 'email'), // Ensure the email is unique in the contractor_profiles table
                ],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'is_contractor' => 'required|integer',
            ]);

            
            // Generate a 6-digit token
            $token = rand(100000, 999999);
            try {
                // Send the token to the new email
                Mail::to($request->email)->send(new NewEmailVerificationCode($token));
            } catch (\Exception $e) {
                // Log the error for debugging
                Log::error('Mail sending failed: ' . $e->getMessage());
                
                // Return a response in the format of a validation error
                return back()->withErrors(['email' => 'Our system couldn\'t deliver the email to this address. Please try a different Email or try again later.']);
            }
            

            if($userID) {
                // Retrieve the user
                $user = User::find($userID);
            
                // Perform deletion logic if the user exists
                if ($user) {
            
                    // Retrieve the related profile
                    $profile = Profile::where('user_id', $user->id)->first();

                    $contractorProfile = ContractorProfile::where('user_id', $user->id)->first();
            
                    // Perform deletion logic if the profile exists
                    if ($profile) {
            
                        // Delete related data in other models
                        SessionTrade::where('profile_id', $profile->id)->delete();
                        SessionViewSetting::where('profile_id', $profile->id)->delete();
                        ContractorProfile::where('user_id', $user->id)->delete();

                        if($contractorProfile) {
                            ImageSection::where('contractor_profile_id', $contractorProfile->id)->delete();
                            BragSection::where('contractor_profile_id', $contractorProfile->id)->delete();
                        }

            
                        // Delete the profile itself
                        $profile->delete();
                    }
            
                    // Delete the user
                    $user->delete();
            
                }
            }
            
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
                "is_contractor" => $request->is_contractor,
                'view_locale' => 1,
                'view_regional' => 1
            ]);
            // dd($profile);


            $randomTrades = [];
            $profile->trades()->attach($randomTrades);  
            
            $profile = Profile::where('user_id', $user->id)->with('trades')->first();



            // If profile is found in the Profile model, save it to the ContractorProfile model
            if ($profile) {

                foreach ($randomTrades as $trade) {
                    SessionTrade::updateOrCreate(
                        ['profile_id' => $profile->id, 'trade_id' => $trade]
                    );
                }

                SessionViewSetting::updateOrCreate(
                    ['profile_id' => $profile->id],
                    [
                        'view_locale' => 1,
                        'view_regional' => 1,
                        'view_statewide' => 0,
                        'view_nationwide' => 0,
                        'view_following' => 0,
                        
                    ]
                );

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
            
            
            // Store the token in the database with a 2-minute expiration
            DB::table('email_verifications')->insert([
                'user_id' => $user->id,
                'new_email' => $request->email,
                'token' => $token,
                'expires_at' => Carbon::now()->addMinutes(5),
            ]);


            // $versionDefault = VersionDefault::find($request->version);
    

            // Update or create user version details with the fetched version defaults
            $userVersionDetail = UserVersionDetail::updateOrCreate(
                ['user_id' => $user->id], // Conditions to find the record
                [ // Values to update or create
                    'nf_ppm' => 0,
                    'nf_ipp' => 0,
                    'nf_title' => false,
                    'nf_bottom' => false,
                    'nf_comments' => false,
                    'nf_repost' => false,
                    'sf_search' => 0,
                    'sf_tracking' => false,
                    'sf_notes' => false,
                    'sf_info' => false,
                    'nf_ppm' => false,
                    'nf_ipp' => false,
                    'nf_title' => false,
                    'nf_bottom' => false,
                    'nf_comments' => false,
                    'nf_repost' => false,
                    'nf_future1' => false,
                    'nf_future2' => false,
                    'sf_search' => false,
                    'sf_tracking' => false,
                    'sf_notes' => false,
                    'sf_info' => false,
                    'sf_future1' => false,
                    'sf_future2' => false,
                    'tg_members' => 0,
                    'tg_post' => 0,
                    'tg_view_all' => false,
                    'tg_future1' => false,
                    'tg_future2' => false,
                    'rf_access' => false,
                    'rf_customers' => false,
                    'rf_sales' => false,
                    'rf_contractor' => false,
                    'rf_future1' => false,
                    'rf_future2' => false,
                    're_reviews' => false,
                    're_feedback' => false,
                    're_appeal' => false,
                    're_future1' => false,
                    're_future2' => false,
                    'cp_template' => 0,
                    'cp_color' => 0,
                    'cp_share' => false,
                    'cp_future1' => false,
                    'cp_future2' => false,
                    // Add other fields from $versionDefault as needed
                ]
            );


            // Auth::login($user);
            $authenticatedSessionController = new AuthenticatedSessionController();
            return $authenticatedSessionController->loginUser($user, $request);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error in store method: ' . $e->getMessage());
    
            // Redirect back with error message
            return back()->withErrors(['general' => 'Something went wrong, please try again later.']);
        }
    
    }



    public function resendVerificationCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
    
        $user = $request->user();
    
        // Generate a 6-digit token
        $token = rand(100000, 999999);
    
        // Store the token in the database with a 2-minute expiration
        DB::table('email_verifications')->insert([
            'user_id' => $user->id,
            'new_email' => $request->email,
            'token' => $token,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);
    
        // Send the token to the new email
        Mail::to($request->email)->send(new NewEmailVerificationCode($token));
    
        return response()->json(['message' => 'Verification code sent to email.']);
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
        $user->email_verified_at = Carbon::now();
        $user->save();
    
        // Delete the verification entry
        DB::table('email_verifications')->where('id', $verification->id)->delete();
    
        return response()->json(['message' => 'Email Verified successfully.']);
    }    




}



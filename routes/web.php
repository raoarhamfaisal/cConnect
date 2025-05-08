<?php

use App\Http\Controllers\PostController;

use App\Http\Controllers\PostImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ContractorRatingController;
use App\Http\Controllers\ContractorPageController;
use App\Http\Controllers\ContractorRatingsAdminController;
use App\Http\Controllers\AppealedReviewsController;
use App\Http\Controllers\AdminRatingsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RedFlagcontroller;

use App\Models\Profile;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;


Route::get('/', function () {
    return Inertia::render('index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('signup'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'showit' => Auth::check(),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'check.session'])->name('dashboard');

Route::get('/contractor/{contractor_id}', [ContractorPageController::class, 'live'])->name('ratings.contractor.index');
Route::get('/careers', function () {
    return Inertia::render('Careers', [
        'showit' => Auth::check(),
    ]);
});
Route::get('/about-us', function () {
    return Inertia::render('AboutUs', [
        'showit' => Auth::check(),
    ]);
});
Route::get('/pricing', function () {
    return Inertia::render('PricingPage', [
        'showit' => Auth::check(),
    ]);
});
Route::get('/gomobile', function () {
    return Inertia::render('GoMobilePage', [
        'showit' => Auth::check(),
    ]);
});
Route::get('/terms-of-service', function () {
    return Inertia::render('TermsAndServices', [
        'showit' => Auth::check(),
    ]);
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy', [
        'showit' => Auth::check(),
    ]);
});



Route::get('/inactive-account', function () {
    if (Auth::check()) {
        $user = Auth::user(); // Get the authenticated user

        $profile = Profile::where('user_id', $user->id)->first();

        // Retrieve specific user profile properties. For example:
        $profileDetails = [
            'active_user' => $profile->active_user,
            'is_payment_verified' => $profile->is_payment_verified,
            'profile' => $profile
        ];

        return Inertia::render('InactiveAccount', [
            'showit' => true,
            'profile' => $profileDetails, // Pass the profile details
        ]);
    } else {
        // Handle the case when the user is not authenticated
        return Inertia::render('InactiveAccount', [
            'showit' => false,
        ]);
    }
});


Route::middleware(['auth', 'check.session'])->group(function () {
    Route::get('/pricing-plan', [ProfileController::class, 'getPricingPlanPage'])->name('profile.pricing-plan');
});


Route::middleware(['auth', 'verified', 'check.session'])->group(function () {

    // Route::get('/payment-verification', function () {
    //     return Inertia::render('PaymentVerification', [
    //         'canLogin' => Route::has('login'),
    //         'canRegister' => Route::has('signup'),
    //         'laravelVersion' => Application::VERSION,
    //         'phpVersion' => PHP_VERSION,
    //         'showit' => Auth::check(),
    //     ]);
    // });
    Route::get('/profile-setup', [ProfileController::class, 'setup'])->name('profile.setup');
    Route::get('/payment', [ProfileController::class, 'getPaymentsPage'])->name('profile.payment');
    // Route::get('/choose-pricing-plan', [ProfileController::class, 'getPricingPlanPage'])->name('profile.choose-pricing-plan');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/general-profile', [ProfileController::class, 'updateGeneralInfo'])->name('profile.updateGeneralInfo');
    Route::patch('/profile/company-info', [ProfileController::class, 'updateCompanyInfo'])->name('profile.updateCompanyInfo');
    Route::patch('/profile/address-info', [ProfileController::class, 'updateAddressInfo'])->name('profile.updateAddressInfo');
    Route::patch('/profile/links', [ProfileController::class, 'updateLinks'])->name('profile.updateLinks');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('activeUser')->group(function () {
        Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

        Route::get('/sub-finder', [ProfileController::class, 'getSubFinderPage'])->name('profile.s');
        Route::get('/red-flag', [ProfileController::class, 'getRedFlagPage'])->name('profile.red-flag');

        Route::get('/ratings/contractor', [ContractorRatingController::class, 'index'])->name('ratings.contractor.index');
        Route::get('/contractor/{contractor_id}/edit', [ContractorPageController::class, 'index'])->name('ratings.contractor.index');
        Route::get('/ratings/{contractor_id}', [RatingController::class, 'index'])->name('ratings.index');
        Route::get('/admin/regions/{region_id}/contractors', [AdminRatingsController::class, 'index'])->name('admin.allContractors');
        Route::get('/admin/regions/contractors', [AdminRatingsController::class, 'getRegionsContractors'])->name('admin.allRegions');
        Route::get('/admin/regions/{region_id}/contractors/{id}', [ContractorRatingsAdminController::class, 'gecConnectGotReviews'])->name('admin.contractor');
        Route::get('/admin/regions/{region_id}/contractors/{id}/reviews', [ContractorRatingsAdminController::class, 'gecConnectGivenReviews'])->name('admin.contractorGivenReviews');
        Route::get('/admin/regions/appealed', [AdminRatingsController::class, 'getRegionsAppealed'])->name('admin.allRegions');
        Route::get('/admin/regions/{region_id}/appealed', [AppealedReviewsController::class, 'getAppealedReviews'])->name('admin.appealed');
        // users
        Route::get('/admin/regions/users', [AdminRatingsController::class, 'getRegionsForUsers'])->name('admin.allRegions');
        Route::get('/admin/users', [AdminController::class, 'getAllUsersPage'])->name('admin.appealed');

        Route::get('/admin/ratings/contractor/{id}/history', [ContractorRatingsAdminController::class, 'historyPage'])->name('admin.history');
        Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');

        //Payments
        Route::get('/admin/coupons', [AdminController::class, 'getCouponsPage'])->name('admin.coupons');
        Route::get('/admin/pricing', [AdminController::class, 'getPaymentsPage'])->name('admin.payments');
        Route::get('/admin/cancel-subscription', [AdminController::class, 'getCancelSubscriptionPage'])->name('admin.payments');
        Route::get('/admin/post', [AdminController::class, 'getPostUserFunctionPage'])->name('admin.payments');
    });
});

Route::get('/index', function () {
    return Inertia::render('index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('signup'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'showit' => Auth::check(),
    ]);
})->name('index');

Route::get('/signup', function () {
    return Inertia::render('Signup', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('signup'),
        'showit' => Auth::check(),
    ]);
})->name('signup');

Route::get('/index-b', function () {
    return Inertia::render('index_006', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('signup'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'showit' => Auth::check(),
    ]);
})->name('index-b');

//
// POPSTCONTROLLER - Infinite Loading
// -------------------------------------------------
Route::get('/post', [PostController::class, 'index'])
    ->name('post')
    ->middleware(['auth', 'activeUser', 'check.session']);
Route::get('/contractor/posts/{contractor_id}', [PostController::class, 'indexContractor'])
    ->name('post.contractor')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);
Route::get('/posts/{contractor_id}', [PostController::class, 'indexContractor'])
    ->name('post.contractor')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);

Route::post('/post', [PostController::class, 'store'])
    ->name('post.store')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);
// ->middleware(['auth', 'verifyPayment', 'verified']);

Route::patch('/post/{post_id}', [PostController::class, 'updatePost'])
    ->name('post.updatePost')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);


Route::post('/upload-post', [PostImageController::class, 'upload'])
    ->name('post.update')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);
// ->middleware(['auth', 'verifyPayment', 'verified']);

// Delete image from temp storage
Route::post('upload-post-revert', [PostImageController::class, 'uploadRevert']);

Route::post('/tokens/create', function (Request $request) {
    $user = Auth()->user();
    // dd($user);
    $token = Auth()->user()->createToken('sanctum');
    return ['token' => $token->plainTextToken];
});

// Add route for supporting document upload
Route::post('/upload-supporting-document', [ReviewController::class, 'uploadSupportingDocument'])->middleware(['auth', 'verified']);
Route::post('/red-flags/upload-supporting-document', [RedFlagController::class, 'uploadSupportingDocument'])->middleware(['auth', 'verified']);



Route::delete('/post/{post}', [PostController::class, 'destroy'])
    ->name('post.destroy')
    ->middleware(['auth', 'verified', 'activeUser', 'check.session']);

require __DIR__ . '/auth.php';



//Chat Routes

Route::middleware(['auth','verified','check.session'])
     ->get('/chats', [ConversationController::class,'index'])
     ->name('chat.index');
    // Chat attachments
Route::post('/chat/upload-attachment', [MessageController::class, 'upload'])->middleware(['auth', 'verified']);
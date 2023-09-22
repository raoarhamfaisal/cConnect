<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\PostImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ContractorRatingController;
use App\Http\Controllers\ContractorRatingsAdminController;
use App\Http\Controllers\AppealedReviewsController;
use App\Http\Controllers\AdminRatingsController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/payment-verification', function () {
        return Inertia::render('PaymentVerification', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('signup'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'showit' => Auth::check(),
        ]);
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/general-profile', [ProfileController::class, 'updateGeneralInfo'])->name('profile.updateGeneralInfo');
    Route::patch('/profile/company-info', [ProfileController::class, 'updateCompanyInfo'])->name('profile.updateCompanyInfo');
    Route::patch('/profile/address-info', [ProfileController::class, 'updateAddressInfo'])->name('profile.updateAddressInfo');
    Route::patch('/profile/trades', [ProfileController::class, 'updateTrades'])->name('profile.updateTrades');
    Route::patch('/profile/links', [ProfileController::class, 'updateLinks'])->name('profile.updateLinks');
    Route::patch('/profile/views', [ProfileController::class, 'updateViews'])->name('profile.updateViews');
    Route::patch('/profile/views', [ProfileController::class, 'updateViewsApi'])->name('profile.updateViewsApi');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verifyPayment')->group(function () {
        Route::get('/ratings/contractor', [ContractorRatingController::class, 'index'])->name('ratings.contractor.index');
        Route::get('/ratings/{contractor_id}', [RatingController::class, 'index'])->name('ratings.index');
        Route::get('/admin/regions/{region_id}/contractors', [AdminRatingsController::class, 'index'])->name('admin.allContractors');
        Route::get('/admin/regions/contractors', [AdminRatingsController::class, 'getRegionsContractors'])->name('admin.allRegions');
        Route::get('/admin/regions/{region_id}/contractors/{id}', [ContractorRatingsAdminController::class, 'getContractorGotReviews'])->name('admin.contractor');
        Route::get('/admin/regions/{region_id}/contractors/{id}/reviews', [ContractorRatingsAdminController::class, 'getContractorGivenReviews'])->name('admin.contractorGivenReviews');
        Route::get('/admin/regions/appealed', [AdminRatingsController::class, 'getRegionsAppealed'])->name('admin.allRegions');
        Route::get('/admin/regions/{region_id}/appealed', [AppealedReviewsController::class, 'getAppealedReviews'])->name('admin.appealed');

        Route::get('/admin/ratings/contractor/{id}/history', [ContractorRatingsAdminController::class, 'historyPage'])->name('admin.history');
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
    ->middleware(['auth', 'verified']);

Route::post('/post', [PostController::class, 'store'])
    ->name('post.store')
    ->middleware(['auth', 'verifyPayment', 'verified']);

Route::post('/upload-post', [PostImageController::class, 'upload'])
    ->name('post.update')
    ->middleware(['auth', 'verifyPayment', 'verified']);

// Delete image from temp storage
Route::post('upload-post-revert', [PostImageController::class, 'uploadRevert']);

Route::post('/tokens/create', function (Request $request) {
    $user = Auth()->user();
    // dd($user);
    $token = Auth()->user()->createToken('sanctum');
    return ['token' => $token->plainTextToken];
});


// ->name('post.uploadImages')
// ->middleware(['auth', 'verified']);

// Route::get('/post/create', [PostController::class, 'create'])
//     ->name('post.create')
//     ->middleware(['auth', 'verified']);

// Route::post('/post', [PostController::class, 'show'])
//     ->name('post.show')
//     ->middleware(['auth', 'verified']);

// Route::get('/post/{id}/edit', [PostController::class, 'edit'])
//     ->name('post.edit')
//     ->middleware(['auth', 'verified']);

// Route::put('/post/{id}', [PostController::class, 'update'])
//     ->name('post.update')
//     ->middleware(['auth', 'verified']);

// Route::delete('/post/{id}', [PostController::class, 'destroy'])
//     ->name('post.destroy')
//     ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';

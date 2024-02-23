<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageSectionController;
use App\Http\Controllers\ReviewResponseController;
use App\Http\Controllers\ContractorRatingsAdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile/user-avatar', [ProfileController::class, 'updateUserAvatar'])->name('profile.updateUserAvatar');
    Route::post('/profile/company-logo', [ProfileController::class, 'updateCompanyLogo'])->name('profile.updateCompanyLogo');

    Route::get('/regions', [ReviewController::class, 'regions'])->name('review.getRegions');
    Route::get('/profileTrades/{user_id}', [PostController::class, 'selectedTrades'])->name('review.getProfileTrades');


    
    
    
    
    
    
    // });
    
    
    // Your authenticated routes here
    Route::middleware('auth:sanctum')->group(function () {
        // Contractor Profile

        Route::patch('/contractor/general-profile', [ContractorProfileController::class, 'updateGeneralInfo'])->name('contractorProfile.updateGeneralInfo');
        Route::patch('/contractor/region-trades', [ContractorProfileController::class, 'updateRegionTrades'])->name('contractorProfile.updateRegionTrades');
        Route::patch('/contractor/additional-information', [ContractorProfileController::class, 'updateAdditionalInformation'])->name('contractorProfile.updateAdditionalInformation');
        Route::patch('/contractor/social-links', [ContractorProfileController::class, 'updateSocialLinks'])->name('contractorProfile.updateSocialLinks');
        Route::post('/contractor/user-avatar', [ContractorProfileController::class, 'updateUserAvatar'])->name('contractorProfile.updateUserAvatar');
        Route::post('/contractor/company-logo', [ContractorProfileController::class, 'updateCompanyLogo'])->name('contractorProfile.updateCompanyLogo');
        Route::patch('/contractor/bottom-closing-text', [ContractorProfileController::class, 'updateBottomAndClosingText'])->name('contractorProfile.updateBottomAndClosingText');

        Route::post('/contractor/{contractorProfileId}/image-section', [ImageSectionController::class, 'store']);
        Route::post('/contractor/image-section/{sectionId}', [ImageSectionController::class, 'update']);
        Route::delete('/contractor/image-section/{sectionId}', [ImageSectionController::class, 'destroy']);
    



        // Review APIs
        Route::post('/reviews', [ReviewController::class, 'store'])->name('review.store');
        Route::get('/profileInfo', [ProfileController::class, 'getProfileInfo'])->name('profile.getDetails');
        Route::get('/reviews/{contractor_id}', [ReviewController::class, 'index'])->name('review.all');
        Route::get('/contractor/{contractor_id}', [ReviewController::class, 'getContractorInfo'])->name('review.contractor');
        Route::put('reviews/{review}', [ReviewController::class, 'update']);
        Route::post('reviews/{review}/appeal', [ReviewController::class, 'putOnAppeal']);

        Route::post('reviews/{review}/off-appeal', [ReviewController::class, 'removeAppeal']);
        Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);
        Route::post('/review-responses', [ReviewResponseController::class, 'store']);
        Route::patch('/review-responses', [ReviewResponseController::class, 'update']);
        Route::delete('/review-responses/{reviewResponse}', [ReviewResponseController::class, 'destroy']);
        
        Route::middleware('admin')->group(function () {
            // Your admin-specific routes here
            Route::get('/admin/all-contractors', [ReviewController::class, 'getContractorProfiles'])->name('review.allContractors');
            Route::get('/admin/reviews/{contractor_id}', [ReviewController::class, 'contractorAllReviews'])->name('review.contractorAllReviews');
            Route::get('/admin/{region}/search-contractor', [ContractorRatingsAdminController::class, 'searchContractor']);

            Route::post('/admin/reviews/{reviewId}/appeal/update-appeal', [ReviewController::class, 'updateAppeal']);
            Route::get('/admin/reviews/{regionId}/by-appeal-status', [ReviewController::class, 'getReviewsByAppealStatus']);
            
        
            Route::get('/admin/all-appealed-reviews/{regionId}', [ReviewController::class, 'getAppealedReviews'])->name('review.getAppealedReviews');
            Route::put('/admin/reviews/{review}', [ReviewController::class, 'updateFromAdmin']);
            Route::delete('/admin/reviews/{review}', [ReviewController::class, 'destroyFromAdmin']);
            Route::put('/admin/reviews/{review}/deactivate', [ReviewController::class, 'deactivate']);
            Route::put('/admin/reviews/{review}/activate', [ReviewController::class, 'activate']);
        
            Route::put('/admin/reviews/{review}/accept', [ReviewController::class, 'acceptAppeal']);
            Route::put('/admin/reviews/{review}/reject', [ReviewController::class, 'rejectAppeal']);
        
            Route::patch('/admin/review-responses', [ReviewResponseController::class, 'updateFromAdmin']);
            Route::delete('/admin/review-responses/{reviewResponse}', [ReviewResponseController::class, 'destroyFromAdmin']);
            Route::put('/admin/review-responses/{reviewResponse}/deactivate', [ReviewResponseController::class, 'deactivate']);
            Route::put('/admin/review-responses/{reviewResponse}/activate', [ReviewResponseController::class, 'activate']);
        
            Route::get('/admin/reviews/{id}/history', [ContractorRatingsAdminController::class, 'reviewsHistory']);
        
            Route::get('/admin/responses/{id}/history', [ContractorRatingsAdminController::class, 'responsesHistory']);
    });
});
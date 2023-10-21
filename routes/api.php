<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorProfileController;
use App\Http\Controllers\ContractorPageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\ImageSectionController;
use App\Http\Controllers\BragSectionController;
use App\Http\Controllers\ReviewResponseController;
use App\Http\Controllers\ContractorRatingsAdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PaymentInfoController;
use App\Http\Controllers\DiscountCouponController;




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


    Route::get('/contractor/get-contractor-info/{contractor_id}', [ContractorPageController::class, 'getContractorInfo'])->name('contractorProfile.getContractorInfo');
    Route::get('/contractor/all-templates', [ContractorProfileController::class, 'getAllTemplates'])->name('contractorProfile.getAllTemplates');
    Route::get('/contractor/all-color-schemes', [ContractorProfileController::class, 'getAllColorSchemes'])->name('contractorProfile.getAllColorSchemes');


    
    // Your authenticated routes here
    Route::middleware('auth:sanctum')->group(function () {


        // Settings APIs
        Route::post('/user/resend-code', [RegisteredUserController::class, 'resendVerificationCode'])->name('user.resendVerificationCode');
        Route::post('/user/verify-email', [RegisteredUserController::class, 'verifyEmail'])->name('user.verifyEmail');
        

        // Contractor Profile
        Route::patch('/contractor/general-profile', [ContractorProfileController::class, 'updateGeneralInfo'])->name('contractorProfile.updateGeneralInfo');
        Route::patch('/contractor/region-trades', [ContractorProfileController::class, 'updateRegionTrades'])->name('contractorProfile.updateRegionTrades');
        Route::patch('/contractor/additional-information', [ContractorProfileController::class, 'updateAdditionalInformation'])->name('contractorProfile.updateAdditionalInformation');
        Route::patch('/contractor/social-links', [ContractorProfileController::class, 'updateSocialLinks'])->name('contractorProfile.updateSocialLinks');
        Route::post('/contractor/user-avatar', [ContractorProfileController::class, 'updateUserAvatar'])->name('contractorProfile.updateUserAvatar');
        Route::post('/contractor/company-logo', [ContractorProfileController::class, 'updateCompanyLogo'])->name('contractorProfile.updateCompanyLogo');
        Route::patch('/contractor/bottom-closing-text', [ContractorProfileController::class, 'updateBottomAndClosingText'])->name('contractorProfile.updateBottomAndClosingText');
        Route::patch('/contractor/update-template', [ContractorProfileController::class, 'updateTemplate'])->name('contractorProfile.updateTemplate');
        Route::patch('/contractor/update-color-scheme', [ContractorProfileController::class, 'updateColorScheme'])->name('contractorProfile.updateColorScheme');
        Route::get('/contractor/post/{contractor_id}', [PostController::class, 'getContractorPosts'])->name('post.getContractorPosts');
            
        Route::post('/contractor/{contractorProfileId}/image-section', [ImageSectionController::class, 'store']);
        Route::post('/contractor/image-section/{sectionId}', [ImageSectionController::class, 'update']);
        Route::delete('/contractor/image-section/{sectionId}', [ImageSectionController::class, 'destroy']);
        
        Route::post('/contractor/{contractorProfileId}/brag-section', [BragSectionController::class, 'store']);
        Route::post('/contractor/brag-section/{sectionId}', [BragSectionController::class, 'update']);
        Route::delete('/contractor/brag-section/{sectionId}', [BragSectionController::class, 'destroy']);

        // Settings APIs
        Route::post('/settings/change-email', [ProfileController::class, 'changeEmail'])->name('profile.changeEmail');
        Route::post('/settings/verify-email', [ProfileController::class, 'verifyEmail'])->name('profile.verifyEmail');
    
      // Profile Api

        Route::get('/profileInfo', [ProfileController::class, 'getProfileInfo'])->name('profile.getDetails');
        Route::get('/profile', [ProfileController::class, 'getProfile'])->name('profile.getProfile');
        Route::patch('/profile/trades', [ProfileController::class, 'updateTrades'])->name('profile.updateTrades');
        Route::patch('/profile/views', [ProfileController::class, 'updateViews'])->name('profile.updateViews');

        Route::get('/profile/trades-views-settings', [ProfileController::class, 'getTradeViewsSettings'])->name('profile.getTradeViewsSettings');
        Route::patch('/profile/trades-views-settings', [ProfileController::class, 'updateTradesViewsSettings'])->name('profile.updateTradesViewsSettings');
        Route::patch('/profile/views-views-settings', [ProfileController::class, 'updateViewsViewsSettings'])->name('profile.updateViewsViewsSettings');
        Route::patch('/profile/trades-profile-setup', [ProfileController::class, 'updateTradesProfileSetup'])->name('profile.updateTradesProfileSetup');
        Route::patch('/profile/views-profile-setup', [ProfileController::class, 'updateViewsProfileSetup'])->name('profile.updateViewsProfileSetup');
        Route::patch('/profile/all-basic-info-for-profile-setup', [ProfileController::class, 'updateBasicInfoForProfileSetup'])->name('profile.updateBasicInfoForProfileSetup');
        Route::patch('/profile/all-basic-info', [ProfileController::class, 'updateBasicInfo'])->name('profile.updateBasicInfo');
        Route::patch('/profile/verify-payment', [ProfileController::class, 'verifyPayment'])->name('profile.verifyPayment');
        

        // Review APIs
        Route::post('/reviews', [ReviewController::class, 'store'])->name('review.store');
        Route::get('/reviews/{contractor_id}', [ReviewController::class, 'index'])->name('review.all');
        Route::get('/contractor/{contractor_id}', [ReviewController::class, 'getContractorInfo'])->name('review.contractor');
        Route::put('reviews/{review}', [ReviewController::class, 'update']);
        Route::post('reviews/{review}/appeal', [ReviewController::class, 'putOnAppeal']);

        Route::post('reviews/{review}/off-appeal', [ReviewController::class, 'removeAppeal']);
        Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);
        Route::post('/review-responses', [ReviewResponseController::class, 'store']);
        Route::patch('/review-responses', [ReviewResponseController::class, 'update']);
        Route::delete('/review-responses/{reviewResponse}', [ReviewResponseController::class, 'destroy']);
        
        // Your admin-specific routes here
        Route::middleware('admin')->group(function () {
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


        // User Functions
        // Only Users having users_privileges are allowed
        Route::middleware('admin-with-users-privileges')->group(function () {
            Route::post('/admin/users/{userId}', [AdminUsersController::class, 'updateProfile']);
            Route::get('/admin/users/{regionId}/all', [AdminUsersController::class, 'getAllUsersOfARegion']);
        });

        // Only Users having payments-privileges are allowed
        Route::middleware('admin-with-payments-privileges')->group(function () {
            Route::resource('/admin/payment-info', PaymentInfoController::class);
            Route::resource('/admin/discount-coupon', DiscountCouponController::class);
            Route::get('/admin/discount-coupon/{regionId}/all', [DiscountCouponController::class, 'getAllDiscountCouponsForARegion']);
        });


    });
    
    


    


    

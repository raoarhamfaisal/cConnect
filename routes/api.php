<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContractorProfileController;
use App\Http\Controllers\ContractorPageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TranslationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\AdminPostsController;
use App\Http\Controllers\ImageSectionController;
use App\Http\Controllers\BragSectionController;
use App\Http\Controllers\ReviewResponseController;
use App\Http\Controllers\ContractorRatingsAdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\PaymentInfoController;
use App\Http\Controllers\DiscountCouponController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PostColorController;
use App\Http\Controllers\PostImageController;
use App\Http\Controllers\RedFlagcontroller;
use App\Http\Controllers\PostReactionController;

use App\Http\Controllers\BadWordController;
use App\Http\Controllers\VersionController;


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


Route::get('/post/text-colors', [PostColorController::class, 'getTextColors']);
Route::get('/post/background-colors', [PostColorController::class, 'getBackgroundColors']);

Route::get('/posts/{post}/trades', [PostController::class, 'getPostTrades']);

// Translations APIs
Route::get('/translations', [TranslationController::class, 'index']);
Route::post('/translations', [TranslationController::class, 'store']);


// Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
// Route::get('/posts/comments/{commentId}', [CommentController::class, 'getSingleComment']);




// Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile/user-avatar', [ProfileController::class, 'updateUserAvatar'])->name('profile.updateUserAvatar');
    Route::post('/profile/company-logo', [ProfileController::class, 'updateCompanyLogo'])->name('profile.updateCompanyLogo');

    Route::get('/regions', [ReviewController::class, 'regions'])->name('review.getRegions');
    Route::get('/profileTrades/{user_id}', [PostController::class, 'selectedTrades'])->name('review.getProfileTrades');

  //Payment api
  Route::get('/payment-info-of-a-region/{regionId}', [PaymentInfoController::class, 'paymetInfoOfARegion']);
    
    
    
    // Bad Words
    Route::get('/badwords', [BadWordController::class, 'index']);


    
    
    
    // });


    Route::get('/contractor/get-contractor-info/{contractor_id}', [ContractorPageController::class, 'getContractorInfo'])->name('contractorProfile.getContractorInfo');
    Route::get('/contractor/all-templates', [ContractorProfileController::class, 'getAllTemplates'])->name('contractorProfile.getAllTemplates');
    Route::get('/contractor/all-color-schemes', [ContractorProfileController::class, 'getAllColorSchemes'])->name('contractorProfile.getAllColorSchemes');


    
    Route::get('/all-versions', [VersionController::class, 'getAllVersions']);
    // Your authenticated routes here
    Route::middleware('auth:sanctum')->group(function () {


        Route::get('/user-version', [VersionController::class, 'getUserVersion']);
    

        // Post related rotues
        Route::post('/posts/{post}/report', [PostController::class, 'reportPost']);

        // Block user related apis
        Route::post('/user/{user}/block', [UserController::class, 'blockUser']);
        Route::post('/user/{user}/unblock', [UserController::class, 'unblockUser']);
        Route::get('/user/blocked', [UserController::class, 'listBlockedUsers']);





        // Red Flag APIs
        Route::post('/red-flags', [RedFlagController::class, 'store']);
        Route::post('/re-order', [PostImageController::class, 'reOrder']);
        Route::put('/red-flags/{redFlag}', [RedFlagController::class, 'update']);
        Route::delete('/red-flags/{redFlag}', [RedFlagController::class, 'destroy']);
        Route::get('/red-flags', [RedFlagController::class, 'index']);
        Route::get('/red-flags/my-red-flags', [RedFlagController::class, 'myFlags']);


        // Post reactions apis
        Route::post('/posts/{post}/like', [PostReactionController::class, 'like']);
        Route::delete('/posts/{post}/like', [PostReactionController::class, 'removeLike']);
        Route::post('/posts/{post}/dislike', [PostReactionController::class, 'dislike']);
        Route::delete('/posts/{post}/dislike', [PostReactionController::class, 'removeDislike']);
        Route::get('/posts/{post}/likes', [PostReactionController::class, 'getPostLikes']);
        Route::get('/posts/{post}/dislikes', [PostReactionController::class, 'getPostDislikes']);

        // Post Comments
        Route::get('/posts/{post}/comments', [CommentController::class, 'index']);
        Route::get('/posts/comments/{commentId}', [CommentController::class, 'getSingleComment']);

        Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
        Route::put('/comments/{comment}', [CommentController::class, 'update']);
        Route::get('/comments/{comment}/likes', [CommentController::class, 'getCommentLikes']);
        Route::get('/comments/{comment}/dislikes', [CommentController::class, 'getCommentDislikes']);
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);


        // Post Comments Reaction
        Route::post('/comments/{comment}/like', [CommentController::class, 'likeComment']);
        Route::delete('/comments/{comment}/like', [CommentController::class, 'removeLikeComment']);
        Route::post('/comments/{comment}/dislike', [CommentController::class, 'dislikeComment']);
        Route::delete('/comments/{comment}/dislike', [CommentController::class, 'removeDislikeComment']);
        
        Route::post('/comments/{comment}/reply', [CommentController::class, 'storeReply']);




        // Repost
        Route::post('/posts/{post}/repost', [PostController::class, 'repost']);
        Route::patch('/posts/{post}/edit-repost', [PostController::class, 'editRepost']);



        




        // Free User Subscription
        Route::post('/profile/complete-profile-and-start-free-subscription', [ProfileController::class, 'completeProfileAndStartFreeSubscription'])->name('profile.completeProfileAndStartFreeSubscription');


        Route::post('/payment/update-method', [PaymentController::class, 'updatePaymentMethod']);



        // Process Payment
        Route::post('/payment/start-subscription', [PaymentController::class, 'startSubscription'])->name('payment.startSubscription');

        Route::get('/user/{userId}/payment-history', [UserController::class, 'getPaymentHistory']);


        Route::post('/payment/switch-subscription/{userId}', [PaymentController::class, 'switchSubscription'])->name('payment.switchSubscription');

        Route::post('/payment/cancel-subscription/{userId}', [PaymentController::class, 'cancelSubscription'])->name('payment.cancelSubscription');
        Route::post('/subscription/request-cancellation/{userId}', [PaymentController::class, 'requestCancellation'])->name('subscription.requestCancellation');

        Route::post('/admin/accept-cancellation/{userId}', [PaymentController::class, 'acceptCancellationRequest'])->middleware('admin')->name('admin.acceptCancellationRequest');
        Route::get('/admin/cancellation-requests', [PaymentController::class, 'getCancellationRequests'])->middleware('admin')->name('admin.getCancellationRequests');

        Route::get('/payment/subscription-details/{userId}', [PaymentController::class, 'getSubscriptionDetails'])->name('payment.getSubscriptionDetails');


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


        // Sub finder module
        Route::get('/sub-finder/find-contractors', [ContractorProfileController::class, 'findContractors']);
        Route::post('/sub-finder/{contractor_profile}/preference-and-notes', [ContractorProfileController::class, 'setPreferenceAndNotes']);








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

        //Payment api
      
        Route::post('/discount-coupon/verify', [DiscountCouponController::class, 'verifyDiscountCoupon']);
        

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


        // Middleware to ensure only admins with proper privileges can access these routes
        Route::middleware('admin-with-post-privileges')->group(function () {
            Route::get('/admin/posts', [AdminPostsController::class, 'getAllPosts']);
            Route::post('/admin/posts/{postId}', [AdminPostsController::class, 'updatePost']);
        });



        // Only Users having payments-privileges are allowed
        Route::middleware('admin-with-payments-privileges')->group(function () {
            Route::resource('/admin/payment-info', PaymentInfoController::class);
         
            
            Route::resource('/admin/discount-coupon', DiscountCouponController::class);
          
            Route::get('/admin/discount-coupon/{regionId}/all', [DiscountCouponController::class, 'getAllDiscountCouponsForARegion']);
        });


    });

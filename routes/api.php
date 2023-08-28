<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;

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


    // Review APIs
    Route::post('/reviews', [ReviewController::class, 'store'])->name('review.store');
    Route::get('/reviews/{contractor_id}', [ReviewController::class, 'index'])->name('review.all');
    Route::put('reviews/{review}', [ReviewController::class, 'update']);
    Route::post('reviews/{review}/appeal', [ReviewController::class, 'putOnAppeal']);
    Route::post('reviews/{review}/off-appeal', [ReviewController::class, 'removeAppeal']);
    Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);
    Route::post('/review-responses', [ReviewResponseController::class, 'store']);




// });

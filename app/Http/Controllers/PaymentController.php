<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use App\Models\Subscription;
use App\Models\UpcomingSubscription;
use App\Models\PaymentInfo;
use Illuminate\Support\Carbon;
use Mail;
use App\Models\UserVersionDetail;
use App\Models\VersionDefault;
use App\Models\DiscountCoupon;
use App\Models\PaymentHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;
use App\Mail\SubscriptionFailedMail;
use App\Mail\SubscriptionSuccessMail;
use App\Mail\UpdatedSubscriptionMail;
use App\Mail\SubscriptionCancelledMail;
use App\Models\SessionTrade;
use App\Models\ProfileTrade;
use App\Models\ContractorProfile;


use App\Helpers\SubscriptionHelper;


use App\Mail\SubscriptionCancellationRequestMail;



use Illuminate\Support\Facades\DB;

date_default_timezone_set('America/Los_Angeles');

class PaymentController extends Controller
{
    public function startSubscription(Request $request)
    {


        try {


            // return response()->json($request);
            // Ensure user is authenticated
            if(!Auth()->user('')){
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $userId = Auth()->user('')->id;


            $profile = Profile::where('user_id', $userId)->first();


            $activeSubscription = DB::table('subscriptions')->where('user_id', $userId)->where('is_subscription_active', 1)->first();
            if ($activeSubscription) {
                return response()->json(['message' => 'You already have an active subscription!']);
            }

            // 1. Calculate the subscription amount with coupon
            $couponDiscount = 0;
            if($request->has('coupon_code')) {
                $coupon = DiscountCoupon::where('coupon_code', $request->coupon_code)->where('is_valid', true)->first();
                if($coupon) {
                    $couponDiscount = $coupon->percentage_off_regular_price;
                }
            }

            $paymentInfo = DB::table('payment_infos')->where('region_id', $profile->region_id)->first();

            // Set base amount based on user's selected duration
            $baseAmount = $request->input('duration') === 'annual' 
            ? ($paymentInfo && ($paymentInfo->gold_billed_annual_price || $paymentInfo->platinum_billed_annual_price) ? ($request->version === 2 ? $paymentInfo->gold_billed_annual_price : $paymentInfo->platinum_billed_annual_price) : 390) 
            : ($paymentInfo && ($paymentInfo->gold_billed_monthly_price || $paymentInfo->platinum_billed_monthly_price) ? ($request->version === 2 ? $paymentInfo->gold_billed_monthly_price : $paymentInfo->platinum_billed_monthly_price) : 39);
            
            // Retrieve the sales tax rate
            $salesTaxRate = ($paymentInfo && $paymentInfo->sales_tax) ? ($paymentInfo->sales_tax) : (0.02);       

            $finalAmount = $request->input('duration') === 'annual' 
                ? ($paymentInfo && ($paymentInfo->gold_billed_annual_price || $paymentInfo->platinum_billed_annual_price) ? ($request->version === 2 ? $paymentInfo->gold_billed_annual_price : $paymentInfo->platinum_billed_annual_price) : 390) 
                : ($paymentInfo && ($paymentInfo->gold_billed_monthly_price || $paymentInfo->platinum_billed_monthly_price) ? ($request->version === 2 ? $paymentInfo->gold_billed_monthly_price : $paymentInfo->platinum_billed_monthly_price) : 39);


            // dd($finalAmount);


            $discountAmount = 0;
            $discountEndDate = null;

            if ($request->has('coupon_code')) {
                $coupon = DiscountCoupon::where('coupon_code', $request->coupon_code)
                            ->where('is_valid', true)
                            ->first();
                $couponDiscountValue = 0;
                if ($coupon) {
                    if ($request->input('duration') === 'annual') {
                        $couponDiscountValue = ((int)$baseAmount / 12) * ($coupon->percentage_off_regular_price * 0.01) * $coupon->months;

                        $tempFinalAmount = $baseAmount - $couponDiscountValue;
                        
                        $salesTaxPrice = $tempFinalAmount * $salesTaxRate;
                        $finalAmount = $tempFinalAmount + $salesTaxPrice;
                    } else {
                        // Monthly logic
                        if ($coupon->months > 0) {
                            $couponDiscountValue = $baseAmount * ($coupon->percentage_off_regular_price * 0.01);
                            $tempFinalAmount = $baseAmount - $couponDiscountValue;
                            $salesTaxPrice = $tempFinalAmount * $salesTaxRate;
                            $finalAmount = $tempFinalAmount + $salesTaxPrice;
                        } else {
                            $salesTaxPrice = $baseAmount * $salesTaxRate;
                            $finalAmount = $baseAmount + $salesTaxPrice;
                        }
                    }
                    $discountEndDate = Carbon::now()->addMonths($coupon->months);
                    $discountAmount = $couponDiscountValue;
                }
            } else {
                $salesTaxPrice = $baseAmount * $salesTaxRate;
                $finalAmount = $baseAmount + $salesTaxPrice;
            }

            // dd($finalAmount);


            // Set the transaction's refId
            $refId = 'ref' . time();



            // 2. Set up the subscription for Authorize.Net
            $subscription = $this->setUpSubscription($request, floatval($finalAmount) !== 0.0 ? floatval($finalAmount) : 0.01);

            // Authentication with Authorize.Net's credentials
            $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
            $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
            $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));

            // $merchantAuthentication->setName("5KP3u95bQpv");
            // $merchantAuthentication->setTransactionKey("346HZ32z3fP4hTG2");

            $apiRequest = new AnetAPI\ARBCreateSubscriptionRequest();
            $apiRequest->setmerchantAuthentication($merchantAuthentication);
            $apiRequest->setRefId($refId);
            $apiRequest->setSubscription($subscription);
            $controller = new AnetController\ARBCreateSubscriptionController($apiRequest);

            // dd(env('MERCHANT_TRANSACTION_KEY'));

            $subscriptionResponse = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);

            if($subscriptionResponse && $subscriptionResponse->getMessages()->getResultCode() == "Ok") {
                // 3. Handle successful payments
                $this->handleSuccessfulPayment($request, $userId, $subscriptionResponse, $baseAmount, $discountAmount, $discountEndDate, $finalAmount, $paymentInfo->id);


            } else {
                // 4. Handle failed payments
                $this->handleFailedPayment($userId, $subscriptionResponse);
                PaymentHistory::create([
                    'user_id' => $userId,
                    'amount_paid' => $finalAmount,
                    'charged_date' => now(),
                    'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
                    'subscription_id' => null,
                    'version' => $request->version,
                    'was_successful' => false
                ]);

                // dd($subscriptionResponse);

                // echo "ERROR :  Invalid subscriptionResponse\n";
                $errorMessages = $subscriptionResponse->getMessages()->getMessage();
                // echo "Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";

                Subscription::updateOrCreate(
                    ['user_id' => $userId], // Attributes to check
                    [
                        'payment_info_id' => $paymentInfo->id,
                        'is_subscription_successfull' => 0,
                        'is_subscription_active' => 0,
                        'subscription_id' => null,
                        'metadata' => json_encode($subscriptionResponse),
                        'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
                        'ends_at' => null,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]
                );
        


                // dd()

                $subscriptionResponse = [
                    'messages' => [
                        'resultCode' => 'Error',
                        'message' => [
                            [
                                'code' => 'E00003',
                                'text' => 'Your payment could not be processed due to incorrect card details. Please double-check your card information and try again.'
                            ]
                        ],
                        'errorMessages' => $errorMessages
                    ]
                ];            
            }

            return response()->json($subscriptionResponse);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error in startSubscription: ' . $e->getMessage());
    
            // Prepare the custom error response
            $subscriptionResponse = [
                'messages' => [
                    'resultCode' => 'Error',
                    'message' => [
                        [
                            'code' => 'E00003',
                            'text' => 'Your payment could not be processed due to server error. Please try again later or try a different card.'
                        ]
                    ]
                ]
            ];
    
            // Return the error response
            return response()->json($subscriptionResponse);
        }
    }

    public function switchSubscription(Request $request, $userId)
    {
        // DB::beginTransaction();
        try {
            // First, cancel the current subscription
            $this->cancelSubscription($request, $userId, false); // Suppressing email
    
            // Then, start a new subscription
            $startSubscriptionResponseJson = $this->startSubscription($request);


    
            $startSubscriptionResponse = json_decode($startSubscriptionResponseJson->getContent());
            return response()->json($startSubscriptionResponse);
            // \Log::error('Error in switchSubscription: ' . $startSubscriptionResponse);
    
            // if ($startSubscriptionResponse && $startSubscriptionResponse->getMessages()->getResultCode() == "Ok") {
            //     // Send consolidated email for updated subscription
    
            //     // You can also log the successful response or perform other actions here
    
            //     // DB::commit();
            //     return response()->json(['message' => 'Subscription updated successfully.']);
            // } else {
            //     // DB::rollBack();
            //     return response()->json(['error' => 'Failed to update the subscription.'], 500);
            // }
        } catch (\Exception $e) {
            // DB::rollBack();
            \Log::error('Error in switchSubscription: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while updating the subscription.'], 500);
        }
    }
    



    private function setUpSubscription($request, $finalAmount)
    {

        // dd($finalAmount);

        // Define the payment type based on user's data from the request
        $creditCard = new AnetAPI\CreditCardType();
        $creditCard->setCardNumber($request->input('card_number'));
        $creditCard->setExpirationDate($request->input('expiration_date'));
        $creditCard->setCardCode($request->input('cvv'));

        $payment = new AnetAPI\PaymentType();
        $payment->setCreditCard($creditCard);

        // Set customer billing information
        $billto = new AnetAPI\NameAndAddressType();
        $billto->setFirstName($request->input('first_name'));
        $billto->setLastName($request->input('last_name'));
        $billto->setAddress($request->input('address'));
        $billto->setCity($request->input('city'));
        $billto->setState($request->input('state'));
        $billto->setZip($request->input('zip'));
        $billto->setCountry($request->input('country'));

        // Set the subscription interval (Monthly in this case)
        // $intervalLength = ($request->input('duration') === 'annual') ? 12 : 1;
        $intervalLength = ($request->input('duration') === 'annual') ? 7 : 7;
        $interval = new AnetAPI\PaymentScheduleType\IntervalAType();
        $interval->setLength($intervalLength);  
        $interval->setUnit("days"); // Set the interval unit as "days"
        // $interval->setUnit("months"); // Set the interval unit as "months"

        $startDate = Carbon::now();  // Current date

        $paymentSchedule = new AnetAPI\PaymentScheduleType();
        $paymentSchedule->setInterval($interval);
        $paymentSchedule->setStartDate($startDate);  // Pass the Carbon object directly
        $paymentSchedule->setTotalOccurrences("9999");  // Recurring indefinitely
        $paymentSchedule->setTrialOccurrences("0");

        $subscription = new AnetAPI\ARBSubscriptionType();
        $subscription->setName(($request->input('duration') === 'annual') ? "Annual Subscription" : "Monthly Subscription");
        $subscription->setPaymentSchedule($paymentSchedule);
        $subscription->setPayment($payment);
        // dd($finalAmount);
        $subscription->setAmount(round($finalAmount, 2));
        $subscription->setTrialAmount("0.00");
        $subscription->setBillTo($billto);
        
        $order = new AnetAPI\OrderType();
        $order->setInvoiceNumber("1234354");        
        $order->setDescription("Description of the subscription"); 
        $subscription->setOrder($order); 

        return $subscription;
    }

    private function handleSuccessfulPayment($request, $userId, $subscriptionResponse, $originalAmount, $discountAmount, $discountEndDate, $finalAmount, $paymentId)
    {
        // Update the profile table
        $profile = Profile::where('user_id', $userId)->first();
        if($profile) {
            $profile->active_user = 1;
            $profile->is_payment_verified = 1;
            $profile->version = $request->version;
            $profile->save();
        }

        $versionDefault = VersionDefault::find($request->version);
    
        \Log::error('sf_last_search_month: ' . now());
        \Log::error('sf_last_search_month: ' . now()->month);
        


        // Update or create user version details with the fetched version defaults
        $userVersionDetail = UserVersionDetail::updateOrCreate(
            ['user_id' => $userId], // Conditions to find the record
            [ // Values to update or create
                'nf_ppm' => $versionDefault->nf_ppm,
                'nf_ipp' => $versionDefault->nf_ipp,
                'nf_title' => $versionDefault->nf_title,
                'nf_bottom' => $versionDefault->nf_bottom,
                'nf_comments' => $versionDefault->nf_comments,
                'nf_repost' => $versionDefault->nf_repost,
                'sf_search' => $versionDefault->sf_search,
                'sf_tracking' => $versionDefault->sf_tracking,
                'sf_notes' => $versionDefault->sf_notes,
                'sf_info' => $versionDefault->sf_info,
                'nf_ppm' => $versionDefault->nf_ppm,
                'nf_ipp' => $versionDefault->nf_ipp,
                'nf_title' => $versionDefault->nf_title,
                'nf_bottom' => $versionDefault->nf_bottom,
                'nf_comments' => $versionDefault->nf_comments,
                'nf_repost' => $versionDefault->nf_repost,
                'nf_future1' => $versionDefault->nf_future1,
                'nf_future2' => $versionDefault->nf_future2,
                'sf_search' => $versionDefault->sf_search,
                'sf_last_search_month' => now()->month,
                'sf_tracking' => $versionDefault->sf_tracking,
                'sf_notes' => $versionDefault->sf_notes,
                'sf_info' => $versionDefault->sf_info,
                'sf_future1' => $versionDefault->sf_future1,
                'sf_future2' => $versionDefault->sf_future2,
                'tg_members' => $versionDefault->tg_members,
                'tg_post' => $versionDefault->tg_post,
                'tg_view_all' => $versionDefault->tg_view_all,
                'tg_future1' => $versionDefault->tg_future1,
                'tg_future2' => $versionDefault->tg_future2,
                'rf_access' => $versionDefault->rf_access,
                'rf_customers' => $versionDefault->rf_customers,
                'rf_sales' => $versionDefault->rf_sales,
                'rf_contractor' => $versionDefault->rf_contractor,
                'rf_future1' => $versionDefault->rf_future1,
                'rf_future2' => $versionDefault->rf_future2,
                're_reviews' => $versionDefault->re_reviews,
                're_feedback' => $versionDefault->re_feedback,
                're_appeal' => $versionDefault->re_appeal,
                're_future1' => $versionDefault->re_future1,
                're_future2' => $versionDefault->re_future2,
                'cp_template' => $versionDefault->cp_template,
                'cp_color' => $versionDefault->cp_color,
                'cp_share' => $versionDefault->cp_share,
                'cp_future1' => $versionDefault->cp_future1,
                'cp_future2' => $versionDefault->cp_future2,
                // Add other fields from $versionDefault as needed
            ]
        );



        if($request->version === 1) {
            // Start a database transaction
            DB::beginTransaction();

            try {
                $profile = Profile::where('user_id', $userID)->first();

                if ($profile) {
                    // For profile_trade
                    $profileTrades = ProfileTrade::where('profile_id', $profile->id)->get();

                    if ($profileTrades->count() > 3) {
                        // Assuming you want to keep the latest 3 trades
                        $tradesToKeep = $profileTrades->sortByDesc('created_at')->take(3)->pluck('trade_id');
                        ProfileTrade::where('profile_id', $profile->id)->whereNotIn('trade_id', $tradesToKeep)->delete();
                    }

                    // For session_trades
                    $sessionTrades = SessionTrade::where('profile_id', $profile->id)->get();

                    if ($sessionTrades->count() > 3) {
                        // Assuming you want to keep the latest 3 trades
                        $tradesToKeep = $sessionTrades->sortByDesc('created_at')->take(3)->pluck('trade_id');
                        SessionTrade::where('profile_id', $profile->id)->whereNotIn('trade_id', $tradesToKeep)->delete();
                    }
                }

                // Commit the transaction
                DB::commit();
            } catch (\Exception $e) {
                \Log::error('Err: ' . $e->getMessage());

                // Rollback the transaction in case of an error
                DB::rollback();
                // Handle error (log it, return a response, etc.)
            }
        }


        $contractProfile = ContractorProfile::where('user_id', $userId)->first();

        if ($request->version === 2) {
            // Randomly select template_id and color_scheme_id from a set of predefined IDs
            $contractProfile->template_id = rand(1, 3); // Randomly between 1, 2, or 3
            $contractProfile->color_scheme_id = rand(1, 3); // Randomly between 1, 2, or 3
            $contractProfile->save();
        } elseif ($request->version === 3) {
            // Fetch all available template IDs and color scheme IDs
            $templateIds = DB::table('templates')->pluck('id')->toArray();
            $colorSchemeIds = DB::table('color_schemes')->pluck('id')->toArray();
    
            // Randomly select template_id and color_scheme_id from all available IDs
            $contractProfile->template_id = $templateIds[array_rand($templateIds)]; // Randomly from available template IDs
            $contractProfile->color_scheme_id = $colorSchemeIds[array_rand($colorSchemeIds)]; // Randomly from available color scheme IDs
            $contractProfile->save();
        }

        $endsAt = Carbon::now();

        if ($request->input('duration') === 'annual') {
            $endsAt->addYear();
        } else {
            $endsAt->addMonth();
        }


        $cardNumber = $request->input('card_number');
        $last4Digits = substr($cardNumber, -4); // Extracts the last 4 digits of the card number


        // dd($last4Digits);


        Subscription::updateOrCreate(
            ['user_id' => $userId], // Attributes to check
            [
                'payment_info_id' => $paymentId,
                'is_subscription_successfull' => 1,
                'is_subscription_active' => 1,
                'subscription_id' => $subscriptionResponse->getSubscriptionId(),
                'metadata' => json_encode($subscriptionResponse),
                'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
                'ends_at' => $endsAt,
                'last_4_digits_of_card' => $last4Digits,
                'original_amount' => $originalAmount,
                'final_amount' => $finalAmount,
                'discount_amount' => $discountAmount,
                'discount_end_date' => $discountEndDate,
                'started_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );

        PaymentHistory::create([
            'user_id' => $userId,
            'amount_paid' => $finalAmount,
            'charged_date' => now(),
            'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
            'subscription_id' => $subscriptionResponse->getSubscriptionId(),
            'version' => $request->version,
            'was_successful' => true
        ]);

        // Determine the upcoming amount
        $upcomingAmount = $endsAt->lessThanOrEqualTo($discountEndDate) ? ($originalAmount - $discountAmount) : $originalAmount;

        // Update upcoming subscriptions        
        // Calculate next charge date based on subscription plan
        // if ($request->input('duration') === 'annual') {
        //     $nextChargeDate = $endsAt->copy()->addYear();
        // } else {
        //     $nextChargeDate = $endsAt->copy()->addMonth();
        // } 

        // // Determine if the next billing cycle is within the discount period
        // $nextBillingWithinDiscount = $discountEndDate && Carbon::now()->lessThan($discountEndDate);

        // // Calculate the amount for the next billing cycle
        // $nextBillingAmount = $nextBillingWithinDiscount ? ($originalAmount - $discountAmount) : $originalAmount;


        // $subscriptionPlan = 
        // // Update upcoming subscriptions
        // $this->updateUpcomingSubscription($userId, $originalAmount, $nextBillingAmount, $nextChargeDate, $subscriptionPlan, $subscriptionResponse->getSubscriptionId(), true);

        $subscription = Subscription::where('user_id', $userId)->where('is_subscription_active', 1)->first();

        $billingAmount = SubscriptionHelper::calculateBillingAmount($subscription);


        $this->updateUpcomingSubscription($userId, $finalAmount, $billingAmount, $endsAt, ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription', $subscriptionResponse->getSubscriptionId(), true);

       

        // Send success email notification
        $user = User::find($userId);
        if($user) {
            // Mail::to($user->email)->send(new SubscriptionSuccessMail($user));
            Mail::to($user->email)->send(new SubscriptionSuccessMail($user, $finalAmount, $last4Digits, Carbon::now()->format('Y-m-d')));
            

        }

    }

    private function handleFailedPayment($userId, $response)
    {

        // Update the profile table
        $profile = Profile::where('user_id', $userId)->first();
        if($profile) {
            $profile->active_user = 0;
            $profile->is_payment_verified = 0;
            $profile->save();
        }

        // Send email notification
        $user = User::find($userId);
        if($user) {
            Mail::to($user->email)->send(new SubscriptionFailedMail($user, $response));
        }
    }


    public function requestCancellation(Request $request, $userId)
    {
        $subscription = Subscription::where('user_id', $userId)
            ->where('is_subscription_active', 1)
            ->where('is_subscription_successfull', 1)
            ->first();
    
        if ($subscription) {
            $subscription->is_cancellation_requested = 1;
            $subscription->save();
    
            // Send email to user
            $user = User::find($userId);
            if ($user) {
                Mail::to($user->email)->send(new SubscriptionCancellationRequestMail($user));
            }
    
            return response()->json(["message" => "Cancellation request received."]);
        } else {
            return response()->json(["status" => 404, "message" => "No active subscription found for this user."]);
        }
    }

    public function getCancellationRequests()
    {
        $cancellationRequests = Subscription::where('is_cancellation_requested', 1)->get();
        return response()->json($cancellationRequests);
    }

    public function acceptCancellationRequest(Request $request, $userId)
    {
        // Call the existing cancelSubscription logic
        return $this->cancelSubscription($request, $userId);
    }
        
    public function cancelSubscription(Request $request, $userId, $sendEmail = true)
    {
        $subscription = Subscription::where('user_id', $userId)
            ->where('is_subscription_active', 1)
            ->where('is_subscription_successfull', 1)
            ->first();


        if ($subscription && ($subscription->is_cancellation_requested || !$sendEmail)) {

            /* Create a merchantAuthenticationType object with authentication details
           retrieved from the constants file */
           $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
           $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
           $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));

            // $merchantAuthentication->setName("5KP3u95bQpv");
            // $merchantAuthentication->setTransactionKey("346HZ32z3fP4hTG2");
          
           // Set the transaction's refId
           $refId = 'ref' . time();
       
           $subscriptionRequest = new AnetAPI\ARBCancelSubscriptionRequest();
           $subscriptionRequest->setMerchantAuthentication($merchantAuthentication);
           $subscriptionRequest->setRefId($refId);
           $subscriptionRequest->setSubscriptionId($subscription->subscription_id);
       
           $controller = new AnetController\ARBCancelSubscriptionController($subscriptionRequest);
       
           $response = $controller->executeWithApiResponse( \net\authorize\api\constants\ANetEnvironment::SANDBOX);
       
           if (($response != null) && ($response->getMessages()->getResultCode() == "Ok"))
           {
               $successMessages = $response->getMessages()->getMessage();

                $subscription->is_subscription_active = 0;
                $subscription->is_cancellation_requested = 0;
                $subscription->update();

                // Update the profile table
                $profile = Profile::where('user_id', $userId)->first();
                if($profile) {
                    $profile->active_user = 0;
                    $profile->is_payment_verified = 0;
                    $profile->save();
                }

                // Remove or update the upcoming subscription record
                $this->removeUpcomingSubscription($userId);

                // Send an email about cancellation
                $user = User::find($userId);
                if($user && $sendEmail) {
                    Mail::to($user->email)->send(new SubscriptionCancelledMail($user));
                }
        
            }
           else
           {
            //    echo "ERROR :  Invalid response\n";
               $errorMessages = $response->getMessages()->getMessage();
            //    echo "Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";
               
           }
       
           return $response;
        } else {
            return response()->json(["status" => 403, "message" => "Cancellation request not made or already processed."]);
        }

    }


    private function removeUpcomingSubscription($userId)
    {
        UpcomingSubscription::where('user_id', $userId)->delete();
    
        Subscription::where('user_id', $userId)
            ->update(['is_subscription_active' => 0]);

            \Log::error('Error in removeUpcomingSubscription: ' . $userId);


    }
    public function getSubscriptionDetails($userId)
    {
        $subscription = Subscription::where('user_id', $userId)
            ->where('is_subscription_active', 1)
            ->where('is_subscription_successfull', 1)
            ->first();

        if ($subscription) {
            $profile = Profile::where('user_id', $userId)->first();
            $paymentInfo = null;
            if($profile) {
                $paymentInfo = PaymentInfo::where('region_id', $profile->region_id)->first();
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Subscription details fetched successfully.',
                'data' => $subscription,
                'paymentInfo' => $paymentInfo
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No active and successful subscription found for this user.',
            ], 404);
        }
    }

    private function updateUpcomingSubscription($userId, $amount, $upcomingAmount, $nextChargeDate, $subscriptionPlan, $subscriptionId, $wasSuccessful)
    {
        $upcomingSubscription = UpcomingSubscription::updateOrCreate(
            ['user_id' => $userId],
            [
                'previous_amount' => $amount,
                'upcoming_amount' => $upcomingAmount,
                'last_charged_at' => now(),
                'next_charge_date' => $nextChargeDate,
                'subscription_plan' => $subscriptionPlan,
                'subscription_id' => $subscriptionId,
                'was_previous_subscription_successful' => $wasSuccessful,
                'is_subscription_active' => 1 // Or determine the actual status
            ]
        );
    }

    public function updatePaymentMethod(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'userId' => 'required|integer',
            'card_number' => 'required|string',
            'expiration_date' => 'required',
            'cvv' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|string',
            'country' => 'required|string'
        ]);
    
        // Retrieve the UpcomingSubscription for the provided userId
        $subscription = UpcomingSubscription::where('is_subscription_active', 1)
            ->where('user_id', $validatedData['userId'])
            ->first();
    
        if (!$subscription) {
            return response()->json(['error' => 'Subscription not found for the provided user ID.'], 404);
        }
    
        // Call the function to update the customer payment profile with the fetched subscription
        $response = $this->updateAuthorizeNetSubscription(
            $subscription,
            $validatedData
        );
    
        // Check response and return appropriate message
        if ($response && $response->getMessages()->getResultCode() == "Ok") {
            // Extract the last four digits of the card number
            $last4Digits = substr($validatedData['card_number'], -4);
    
            // Update the last_4_digits_of_card in the subscriptions table for this user
            Subscription::where('user_id', $validatedData['userId'])
                        ->update(['last_4_digits_of_card' => $last4Digits]);
    
            return response()->json(['message' => 'Payment method updated successfully.']);
        } else {
            $errorMessages = $response->getMessages()->getMessage();
            return response()->json(['error' => $errorMessages[0]->getText()], 500);
        }
    }
    


    private function updateAuthorizeNetSubscription($subscription, $validatedData)
    {
        
        /* Create a merchantAuthenticationType object with authentication details
        retrieved from the constants file */
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
        $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));
        // $merchantAuthentication->setName("5KP3u95bQpv");
        // $merchantAuthentication->setTransactionKey("346HZ32z3fP4hTG2");
        
        // Set the transaction's refId
        $refId = 'ref' . time();

        $authorizeNetSubscription = new AnetAPI\ARBSubscriptionType();            

        // $authorizeNetSubscription->setAmount(round(floatval($amountToCharge), 2));


        // Define the payment type based on user's data from the request
        $creditCard = new AnetAPI\CreditCardType();
        $creditCard->setCardNumber($validatedData['card_number']);
        $creditCard->setExpirationDate($validatedData['expiration_date']);
        $creditCard->setCardCode($validatedData['cvv']);

        $payment = new AnetAPI\PaymentType();
        $payment->setCreditCard($creditCard);

        // Set customer billing information
        $billto = new AnetAPI\NameAndAddressType();
        $billto->setFirstName($validatedData['first_name']);
        $billto->setLastName($validatedData['last_name']);
        $billto->setAddress($validatedData['address']);
        $billto->setCity($validatedData['city']);
        $billto->setState($validatedData['state']);
        $billto->setZip($validatedData['zip']);
        $billto->setCountry($validatedData['country']);

        $authorizeNetSubscription->setBillTo($billto);
        $authorizeNetSubscription->setPayment($payment);

        
        $request = new AnetAPI\ARBUpdateSubscriptionRequest();
        $request->setMerchantAuthentication($merchantAuthentication);
        $request->setRefId($refId);
        $request->setSubscriptionId($subscription->subscription_id);
        $request->setSubscription($authorizeNetSubscription);

        $controller = new AnetController\ARBUpdateSubscriptionController($request);


        $response = $controller->executeWithApiResponse( \net\authorize\api\constants\ANetEnvironment::SANDBOX);

        
        return $response;


    }

    private function updateCustomerPaymentProfile($customerProfileId, $customerPaymentProfileId, $cardNumber, $expirationDate, $billingDetails)
    {
        // Setup merchant authentication
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
        $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));
        // $merchantAuthentication->setName("5KP3u95bQpv");
        // $merchantAuthentication->setTransactionKey("346HZ32z3fP4hTG2");

        // Set the transaction's refId
        $refId = 'ref' . time();

        // Create the payment data for a credit card
        $creditCard = new AnetAPI\CreditCardType();
        $creditCard->setCardNumber($cardNumber);
        $creditCard->setExpirationDate($expirationDate);
        $creditCard->setCardCode($billingDetails['cvv']);

        $paymentCreditCard = new AnetAPI\PaymentType();
        $paymentCreditCard->setCreditCard($creditCard);

        // Create the Bill To info
        $billto = new AnetAPI\CustomerAddressType();
        $billto->setFirstName($billingDetails['firstName']);
        $billto->setLastName($billingDetails['lastName']);
        $billto->setAddress($billingDetails['address']);
        $billto->setCity($billingDetails['city']);
        $billto->setState($billingDetails['state']);
        $billto->setZip($billingDetails['zip']);
        $billto->setCountry($billingDetails['country']);

        // Create a new Customer Payment Profile object
        $paymentprofile = new AnetAPI\CustomerPaymentProfileExType();
        $paymentprofile->setCustomerPaymentProfileId($customerPaymentProfileId);
        $paymentprofile->setPayment($paymentCreditCard);
        $paymentprofile->setBillTo($billto);

        // Assemble the complete transaction request
        $paymentprofileRequest = new AnetAPI\UpdateCustomerPaymentProfileRequest();
        $paymentprofileRequest->setMerchantAuthentication($merchantAuthentication);
        $paymentprofileRequest->setCustomerProfileId($customerProfileId);
        $paymentprofileRequest->setPaymentProfile($paymentprofile);
        $paymentprofileRequest->setValidationMode("liveMode");

        // Create the controller and get the response
        $controller = new AnetController\UpdateCustomerPaymentProfileController($paymentprofileRequest);
        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX); // or SANDBOX

        return $response;
    }

   

   


}

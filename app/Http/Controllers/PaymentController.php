<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use App\Models\Subscription;
use App\Models\UpcomingSubscription;
use App\Models\PaymentInfo;
use Illuminate\Support\Carbon;
use Mail;
use App\Models\DiscountCoupon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;
use App\Mail\SubscriptionFailedMail;
use App\Mail\SubscriptionSuccessMail;
use App\Mail\SubscriptionCancelledMail;

use App\Mail\SubscriptionCancellationRequestMail;



use Illuminate\Support\Facades\DB;

date_default_timezone_set('America/Los_Angeles');

class PaymentController extends Controller
{
    public function startSubscription(Request $request)
    {

        // return response()->json($request);
        // Ensure user is authenticated
        if(!Auth()->user('')){
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $userId = Auth()->user('')->id;

        $profile = Profile::where('user_id', $userId)->first();


        $activeSubscription = DB::table('subscriptions')->where('user_id', $userId)->where('is_subscription_active', 1)->whereNull('ends_at')->first();
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
        ? ($paymentInfo && $paymentInfo->billed_annual_price ? $paymentInfo->billed_annual_price : 390) 
        : ($paymentInfo && $paymentInfo->billed_monthly_price ? $paymentInfo->billed_monthly_price : 39);
           
        // Retrieve the sales tax rate
        $salesTaxRate = ($paymentInfo && $paymentInfo->sales_tax) ? ($paymentInfo->sales_tax / 100) : (2/100);       

        $finalAmount = $request->input('duration') === 'annual' 
            ? ($paymentInfo && $paymentInfo->billed_annual_price ? $paymentInfo->billed_annual_price : 390) 
            : ($paymentInfo && $paymentInfo->billed_monthly_price ? $paymentInfo->billed_monthly_price : 39);


        $discountAmount = 0;
        $discountEndDate = null;

        if ($request->has('coupon_code')) {
            $coupon = DiscountCoupon::where('coupon_code', $request->coupon_code)
                        ->where('is_valid', true)
                        ->first();
            $couponDiscountValue = 0;
            if ($coupon) {
                if ($request->input('duration') === 'annual') {
                    $couponDiscountValue = $baseAmount * ($coupon->percentage_off_regular_price / 100);
                    $finalAmount = ($baseAmount - $couponDiscountValue) + (($baseAmount - $couponDiscountValue) * $salesTaxRate);
                } else {
                    // Monthly logic
                    if ($coupon->months > 0) {
                        $couponDiscountValue = $baseAmount * ($coupon->percentage_off_regular_price / 100);
                        $finalAmount = ($baseAmount - $couponDiscountValue) + (($baseAmount - $couponDiscountValue) * $salesTaxRate);
                    } else {
                        $finalAmount = $baseAmount + ($baseAmount * $salesTaxRate);
                    }
                }
                $discountEndDate = Carbon::now()->addMonths($coupon->months);
                $discountAmount = $couponDiscountValue;
            }
        } else {
            $finalAmount = $baseAmount + ($baseAmount * $salesTaxRate);
        }


        // Set the transaction's refId
        $refId = 'ref' . time();



        // 2. Set up the subscription for Authorize.Net
        $subscription = $this->setUpSubscription($request, floatval($finalAmount));

        // Authentication with Authorize.Net's credentials
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
        $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));

        $apiRequest = new AnetAPI\ARBCreateSubscriptionRequest();
        $apiRequest->setmerchantAuthentication($merchantAuthentication);
        $apiRequest->setRefId($refId);
        $apiRequest->setSubscription($subscription);
        $controller = new AnetController\ARBCreateSubscriptionController($apiRequest);

        $subscriptionResponse = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);

        if($subscriptionResponse && $subscriptionResponse->getMessages()->getResultCode() == "Ok") {
            // 3. Handle successful payments
            $this->handleSuccessfulPayment($request, $userId, $subscriptionResponse, $baseAmount, $discountAmount, $discountEndDate);


        } else {
            // 4. Handle failed payments
            $this->handleFailedPayment($userId, $subscriptionResponse);

            // echo "ERROR :  Invalid subscriptionResponse\n";
            $errorMessages = $subscriptionResponse->getMessages()->getMessage();
            // echo "Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";
            DB::table('subscriptions')->insert([
                'user_id' => $userId,
                'is_subscription_successfull' => 0,
                'is_subscription_active' => 0,
                'subscription_id' => null,
                'metadata' => json_encode($subscriptionResponse),
                'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
                'ends_at' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }

        return $subscriptionResponse;
    }

    private function setUpSubscription($request, $finalAmount)
    {
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

    private function handleSuccessfulPayment($request, $userId, $subscriptionResponse, $originalAmount, $discountAmount, $discountEndDate)
    {
        // Update the profile table
        $profile = Profile::where('user_id', $userId)->first();
        if($profile) {
            $profile->active_user = 1;
            $profile->is_payment_verified = 1;
            $profile->save();
        }

        $endsAt = Carbon::now();

        if ($request->input('duration') === 'annual') {
            $endsAt->addYear();
        } else {
            $endsAt->addMonth();
        }

        DB::table('subscriptions')->insert([
            'user_id' => $userId,
            'is_subscription_successfull' => 1,
            'is_subscription_active' => 1,
            'subscription_id' => $subscriptionResponse->getSubscriptionId(),
            'metadata' => json_encode($subscriptionResponse),
            'subscription_plan' => ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription',
            'ends_at' => $endsAt,
            'original_amount' => $originalAmount,
            'discount_amount' => $discountAmount,
            'discount_end_date' => $discountEndDate,
            'started_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        // Determine the upcoming amount
        $upcomingAmount = $endsAt->lessThanOrEqualTo($discountEndDate) ? ($originalAmount - $discountAmount) : $originalAmount;

        // Update upcoming subscriptions        
        // Calculate next charge date based on subscription plan
        if ($request->input('duration') === 'annual') {
            $nextChargeDate = $endsAt->copy()->addYear();
        } else {
            $nextChargeDate = $endsAt->copy()->addMonth();
        } 

        $this->updateUpcomingSubscription($userId, $originalAmount, $upcomingAmount, $nextChargeDate, ($request->input('duration') === 'annual') ? 'Annual Subscription' : 'Monthly Subscription', $subscriptionResponse->getSubscriptionId(), true);

       

        // Send success email notification
        $user = User::find($userId);
        if($user) {
            Mail::to($user->email)->send(new SubscriptionSuccessMail($user));
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
        $cancellationRequests = Subscription::where('is_cancellation_requested', true)->get();
        return response()->json($cancellationRequests);
    }

    public function acceptCancellationRequest(Request $request, $userId)
    {
        // Call the existing cancelSubscription logic
        return $this->cancelSubscription($request, $userId);
    }
        
    public function cancelSubscription(Request $request, $userId)
    {
        $subscription = Subscription::where('user_id', $userId)
            ->where('is_subscription_active', 1)
            ->where('is_subscription_successfull', 1)
            ->first();


        if ($subscription && $subscription->is_cancellation_requested) {

            /* Create a merchantAuthenticationType object with authentication details
           retrieved from the constants file */
           $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
           $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
           $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));
          
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
                if($user) {
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
        // Option 1: Delete the upcoming subscription record
        UpcomingSubscription::where('user_id', $userId)->delete();
    
        // Option 2: Update the record to set `is_subscription_active` to 0
        // UpcomingSubscription::where('user_id', $userId)
        //     ->update(['is_subscription_active' => 0]);
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
}

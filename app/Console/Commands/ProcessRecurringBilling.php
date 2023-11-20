<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use Illuminate\Support\Carbon;
use App\Models\UpcomingSubscription;
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;


use App\Helpers\SubscriptionHelper;
use App\Models\Profile;
use App\Models\User;

use Mail;
use App\Mail\SubscriptionFailedMail;
use App\Mail\SubscriptionUpdateSuccessMail;



class ProcessRecurringBilling extends Command
{
    protected $signature = 'billing:process';
    protected $description = 'Process recurring billing for subscriptions';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $subscriptions = Subscription::where('is_subscription_active', 1)->get();

        foreach ($subscriptions as $subscription) {
            if (SubscriptionHelper::isTimeToCharge($subscription)) {
                $amountToCharge = SubscriptionHelper::calculateBillingAmount($subscription);
                
                $this->info("Amount to Charge: " . $amountToCharge);
                $this->info("Subscription Final Amount: " . $subscription->final_amount);


                $this->updateAuthorizeNetSubscription($subscription, $amountToCharge);
                // $this->processPayment($subscription, $amountToCharge);
            }
        }

        $this->info('Recurring billing processed successfully.');
    }

    private function updateAuthorizeNetSubscription($subscription, $amountToCharge)
    {
        

        $this->info('here in updateAuthorizeNetSubscription');
        if (round(floatval($amountToCharge), 2) !== round(floatval($subscription->final_amount), 2)) {
            $this->info('need to update the amount');

            echo $amountToCharge;
            echo "\r\n";


            echo $subscription->final_amount;
            echo "\r\n";

            /* Create a merchantAuthenticationType object with authentication details
            retrieved from the constants file */
            $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
            $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
            $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));
            
            // Set the transaction's refId
            $refId = 'ref' . time();

            $authorizeNetSubscription = new AnetAPI\ARBSubscriptionType();            

            $authorizeNetSubscription->setAmount(round(floatval($amountToCharge), 2));

            
            $request = new AnetAPI\ARBUpdateSubscriptionRequest();
            $request->setMerchantAuthentication($merchantAuthentication);
            $request->setRefId($refId);
            $request->setSubscriptionId($subscription->subscription_id);
            $request->setSubscription($authorizeNetSubscription);

            $controller = new AnetController\ARBUpdateSubscriptionController($request);


            $response = $controller->executeWithApiResponse( \net\authorize\api\constants\ANetEnvironment::SANDBOX);

            
            if (($response != null) && ($response->getMessages()->getResultCode() == "Ok") )
            {
                $this->handleSuccessfulPayment($subscription, $response, $amountToCharge);
                
            }
            else
            {
                $this->handleFailedPayment($subscription, $response);

                // echo "ERROR :  Invalid response\n";
                $errorMessages = $response->getMessages()->getMessage();
                // echo "Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";
                $subscriptionRecord = Subscription::find($subscription->id);
                if ($subscriptionRecord) {
                    $subscriptionRecord->is_subscription_successfull = 0;
                    $subscriptionRecord->is_subscription_active = 0;
                    $subscriptionRecord->subscription_id = null;
                    $subscriptionRecord->metadata = json_encode($response);
                    $subscriptionRecord->ends_at = null;
                    $subscriptionRecord->final_amount = null;
                    $subscriptionRecord->original_amount = null;
                    $subscriptionRecord->started_at = null;
                    $subscriptionRecord->discount_amount = null;
                    $subscriptionRecord->updated_at = Carbon::now();
        
                    $subscriptionRecord->save();
                }
        
    
            }

            // return $response;
        }else {

            $this->info('Amount is same as old so dont need to update the amount!');
        }


    }


    private function handleSuccessfulPayment($subscription, $subscriptionResponse, $amountToCharge)
    {
        // Update the profile table
        $profile = Profile::where('user_id', $subscription->user_id)->first();
        if($profile) {
            $profile->active_user = 1;
            $profile->is_payment_verified = 1;
            $profile->save();
        }

        $endsAt = Carbon::now();

        if ($subscription->subscription_plan === 'Annual Subscription') {
            $endsAt->addYear();
        } else {
            $endsAt->addMonth();
        }

        $subscriptionRecord = Subscription::find($subscription->id);
        if ($subscriptionRecord) {
            $subscriptionRecord->is_subscription_successfull = 1;
            $subscriptionRecord->is_subscription_active = 1;
            $subscriptionRecord->subscription_id = $subscription->subscription_id;
            $subscriptionRecord->metadata = json_encode($subscriptionResponse);
            $subscriptionRecord->ends_at = $endsAt;
            $subscriptionRecord->final_amount = $amountToCharge;
            $subscriptionRecord->started_at = Carbon::now();
            $subscriptionRecord->updated_at = Carbon::now();

            $subscriptionRecord->save();
        }


        $billingAmount = SubscriptionHelper::calculateBillingAmount($subscription);


        $this->updateUpcomingSubscription($subscription->user_id, $amountToCharge, $billingAmount, $endsAt, $subscription->subscription_plan, $subscription->subscription_id, true, true);

       

        // Send success email notification
        $user = User::find($subscription->user_id);
        if($user) {
            $last4Digits = $subscription->last_4_digits_of_card;
            Mail::to($user->email)->send(new SubscriptionUpdateSuccessMail($user, $amountToCharge, $subscription->last_4_digits_of_card, Carbon::now()->format('Y-m-d')));

        }

    }

    private function handleFailedPayment($subscription, $response)
    {

        // Update the profile table
        $profile = Profile::where('user_id', $subscription->user_id)->first();
        if($profile) {
            $profile->active_user = 0;
            $profile->is_payment_verified = 0;
            $profile->save();
        }

        // Send email notification
        $user = User::find($subscription->user_id);
        if($user) {
            Mail::to($user->email)->send(new SubscriptionFailedMail($user, $response));
        }

        $upcomingSubscription = UpcomingSubscription::where('user_id', $subscription->user_id)->first();
        $upcomingSubscription->delete();
    }
    

    private function updateUpcomingSubscription($userId, $amount, $upcomingAmount, $nextChargeDate, $subscriptionPlan, $subscriptionId, $wasSuccessful, $thisSubscriptionStatus)
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
                'is_subscription_active' => $thisSubscriptionStatus
            ]
        );
    }
    

    private function processPayment($subscription, $amountToCharge)
    {
        // Process payment through Authorize.Net
        // Update subscription record based on payment success or failure
        // If payment is successful, update the 'ends_at' date for the subscription
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;

class UpdateSubscriptions extends Command
{
    protected $signature = 'update:subscriptions';
    protected $description = 'Update subscriptions after the discount ends';

    public function handle()
    {
        $subscriptions = Subscription::where('is_subscription_active', 1)
                          ->whereDate('discount_end_date', '<=', now())
                          ->get();

        foreach ($subscriptions as $subscription) {
            // Logic to update the subscription amount in Authorize.Net

            $this->updateSubscription($subscription);

            // using $subscription->original_amount.
            // Once successful, set is_subscription_active to 0 and save the subscription.
            
            // If the API request to Authorize.Net to update the amount is successful:
            // $subscription->is_subscription_active = 0;
            // $subscription->save();
        }
    }

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('update:subscriptions')->dailyAt('01:00');
    }


    protected function updateSubscription($savedSubscription)
    {
        /* Create a merchantAuthenticationType object with authentication details
        retrieved from the constants file */
        $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
        $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
        $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));
        
        // Set the transaction's refId
        $refId = 'ref' . time();

        $subscription = new AnetAPI\ARBSubscriptionType();


        //set profile information
        $profile = new AnetAPI\CustomerProfileIdType();
        $profile->setCustomerProfileId("121212");
        $profile->setCustomerPaymentProfileId("131313");
        $profile->setCustomerAddressId("141414");


        // // Set base amount based on user's selected duration
        // $baseAmount = $request->input('duration') === 'annual' 
        // ? ($paymentInfo && $paymentInfo->gold_billed_annual_price ? $paymentInfo->gold_billed_annual_price : 390) 
        // : ($paymentInfo && $paymentInfo->gold_billed_monthly_price ? $paymentInfo->gold_billed_monthly_price : 39);
            
        // // Retrieve the sales tax rate
        // $salesTaxRate = ($paymentInfo && $paymentInfo->sales_tax) ? ($paymentInfo->sales_tax / 100) : (2/100);       

        // $finalAmount = $request->input('duration') === 'annual' 
        //     ? ($paymentInfo && $paymentInfo->gold_billed_annual_price ? $paymentInfo->gold_billed_annual_price : 390) 
        //     : ($paymentInfo && $paymentInfo->gold_billed_monthly_price ? $paymentInfo->gold_billed_monthly_price : 39);
        

        $subscription->setAmount($savedSubscription->original_amount);

        
        $request = new AnetAPI\ARBUpdateSubscriptionRequest();
        $request->setMerchantAuthentication($merchantAuthentication);
        $request->setRefId($refId);
        $request->setSubscriptionId($savedSubscription->subscription_id);
        $request->setSubscription($subscription);

        $controller = new AnetController\ARBUpdateSubscriptionController($request);

        $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::PRODUCTION);
        
        if (($response != null) && ($response->getMessages()->getResultCode() == "Ok") )
        {
            $errorMessages = $response->getMessages()->getMessage();
            echo "SUCCESS Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";
            
        }
        else
        {
            echo "ERROR :  Invalid response\n";
            $errorMessages = $response->getMessages()->getMessage();
            echo "Response : " . $errorMessages[0]->getCode() . "  " .$errorMessages[0]->getText() . "\n";
        }

        return $response;
    }

}

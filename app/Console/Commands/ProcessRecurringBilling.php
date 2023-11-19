<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use Illuminate\Support\Carbon;
use net\authorize\api\contract\v1 as AnetAPI;
use net\authorize\api\controller as AnetController;

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
            if ($this->isTimeToCharge($subscription)) {
                $amountToCharge = $this->calculateBillingAmount($subscription);
                $this->updateAuthorizeNetSubscription($subscription, $amountToCharge);
                $this->processPayment($subscription, $amountToCharge);
            }
        }

        $this->info('Recurring billing processed successfully.');
    }

    private function isTimeToCharge($subscription)
    {
        $billingInterval = $subscription->subscription_plan === 'Annual Subscription' ? '1 year' : '1 month';
        $nextBillingDate = Carbon::parse($subscription->ends_at)->add($billingInterval);
        return Carbon::now()->gte($nextBillingDate);
    }

    private function calculateBillingAmount($subscription)
    {
        $isDiscountValid = $subscription->discount_end_date && Carbon::now()->lessThanOrEqualTo($subscription->discount_end_date);
        return $isDiscountValid ? ($subscription->original_amount - $subscription->discount_amount) : $subscription->original_amount;
    }

    private function updateAuthorizeNetSubscription($subscription, $amountToCharge)
    {
        if ($amountToCharge !== $subscription->original_amount) {
            // Update Authorize.Net subscription
            $merchantAuthentication = new AnetAPI\MerchantAuthenticationType();
            $merchantAuthentication->setName(env('MERCHANT_LOGIN_ID'));
            $merchantAuthentication->setTransactionKey(env('MERCHANT_TRANSACTION_KEY'));

            $request = new AnetAPI\ARBUpdateSubscriptionRequest();
            $request->setMerchantAuthentication($merchantAuthentication);
            $request->setSubscriptionId($subscription->subscription_id);

            $subscriptionType = new AnetAPI\ARBSubscriptionType();
            $subscriptionType->setAmount($amountToCharge);
            $request->setSubscription($subscriptionType);

            $controller = new AnetController\ARBUpdateSubscriptionController($request);
            $response = $controller->executeWithApiResponse(\net\authorize\api\constants\ANetEnvironment::SANDBOX);

            if ($response != null && $response->getMessages()->getResultCode() == "Ok") {
                // Handle successful update
            } else {
                // Handle failed update
            }
        }
    }

    private function processPayment($subscription, $amountToCharge)
    {
        // Process payment through Authorize.Net
        // Update subscription record based on payment success or failure
        // If payment is successful, update the 'ends_at' date for the subscription
    }
}

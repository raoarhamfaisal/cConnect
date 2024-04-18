<?php


namespace App\Helpers;

use Carbon\Carbon;

class SubscriptionHelper
{
    public static function isTimeToCharge($subscription)
    {
        $billingInterval = $subscription->subscription_plan === 'Annual Subscription' ? '1 year' : '1 month';
        $nextBillingDate = Carbon::parse($subscription->started_at)->add($billingInterval);

        echo $nextBillingDate;
        echo "\r\n";
        echo $subscription->subscription_plan;
        echo "\r\n";
        echo $subscription->original_amount;
        echo "\r\n";
        echo $subscription->discount_amount;
        echo "\r\n";


        return Carbon::now()->gte($nextBillingDate);
    }

    public static function calculateBillingAmount($subscription)
    {
        $isDiscountValid = $subscription->discount_end_date && Carbon::now()->lessThanOrEqualTo($subscription->discount_end_date);

        echo $isDiscountValid;
        echo "\r\n";

        // Set base amount based on user's selected duration
        $baseAmount = $subscription->subscription_plan === 'Annual Subscription' 
        ? ($subscription->paymentInfo && $subscription->paymentInfo->billed_annual_price ? $subscription->paymentInfo->billed_annual_price : 390) 
        : ($subscription->paymentInfo && $subscription->paymentInfo->billed_monthly_price ? $subscription->paymentInfo->billed_monthly_price : 39);
            
        // Retrieve the sales tax rate
        $salesTaxRate = ($subscription->paymentInfo && $subscription->paymentInfo->sales_tax) ? ($subscription->paymentInfo->sales_tax * 0.01) : (0.02);       

        $finalAmount = $subscription->subscription_plan === 'Annual Subscription'
            ? ($subscription->paymentInfo && $subscription->paymentInfo->billed_annual_price ? $subscription->paymentInfo->billed_annual_price : 390) 
            : ($subscription->paymentInfo && $subscription->paymentInfo->billed_monthly_price ? $subscription->paymentInfo->billed_monthly_price : 39);


        return $isDiscountValid ? (($subscription->original_amount - $subscription->discount_amount) + (($subscription->original_amount - $subscription->discount_amount) * $salesTaxRate)) : ($subscription->original_amount + ($subscription->original_amount * $salesTaxRate));
    }
}

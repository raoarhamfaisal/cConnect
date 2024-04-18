<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;


    protected $fillable = [
        'is_subscription_successfull',
        'is_subscription_active',
        'is_cancellation_requested',
        'user_id',
        'payment_info_id',
        'subscription_id',
        'metadata',
        'subscription_plan',
        'ends_at',
        'started_at',
        'original_amount',
        'last_4_digits_of_card',
        'final_amount',
        'discount_amount',
        'discount_end_date'
    ];

    public function paymentInfo()
    {
        return $this->belongsTo(PaymentInfo::class);
    }



}

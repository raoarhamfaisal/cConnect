<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingSubscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'previous_amount',
        'upcoming_amount',
        'user_id',
        'subscription_id',
        'last_charged_at',
        'subscription_plan',
        'next_charge_date',
        'is_subscription_active',
        'was_previous_subscription_successful',
    ];

}

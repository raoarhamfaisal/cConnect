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
        'user_id',
        'subscription_id',
        'metadata',
        'subscription_plan',
        'ends_at',
        'started_at',
        'original_amount',
        'discount_amount',
        'discount_end_date'
    ];

}

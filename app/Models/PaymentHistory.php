<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'amount_paid', 
        'charged_date', 
        'subscription_plan', 
        'subscription_id', 
        'version', 
        'was_successful'
    ];
}

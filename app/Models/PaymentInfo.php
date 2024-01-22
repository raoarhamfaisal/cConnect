<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentInfo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'region_id',
        'sales_tax',
        'gold_billed_annual_price',
        'gold_billed_monthly_price',
        'gold_advertised_price',
        'platinum_billed_annual_price',
        'platinum_billed_monthly_price',
        'platinum_advertised_price',
    ];
}

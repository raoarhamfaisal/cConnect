<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountCoupon extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'is_valid',
        'region_id',
        'percentage_off_regular_price',
        'months',
        'coupon_code',
        'start_date',
        'end_date',
        'notes'
    ];

}

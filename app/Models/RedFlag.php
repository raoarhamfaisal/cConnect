<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RedFlag extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'profile_id', 'region_id', 'name_of_the_contractor_or_customer', 
        'complaint', 'red_flag_date', 'is_contractor_or_customer'
    ];

    // Relationships and other model methods...
}

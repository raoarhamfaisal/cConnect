<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorTrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'contractor_profile_id',
        'trade_id',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileTrade extends Model
{
    use HasFactory;

    protected $table = 'profile_trade';

    protected $fillable = [
        'profile_id',
        'trade_id',
    ];
}

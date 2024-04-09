<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorProfileUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'contractor_profile_id',
        'preference_status',
        'notes'
    ];
}

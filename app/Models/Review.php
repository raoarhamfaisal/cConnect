<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id',
        'contractor_id',
        'rating',
        'rating_text',
        'rating_date',
        'on_appeal_reason',
        'on_appeal_reason_date',
        'off_appeal_reason',
        'off_appeal_reason_date',
        'is_under_appeal',
        'hired_by_contractor',
        'paid_on_tim',
        'hired_contractor',
        'give_full_payment',
        'how_did_you_meet_this_contractor'

    ];

    public function profile() 
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }

    public function contractor()
    {
        return $this->belongsTo(Profile::class, 'contractor_id');
    }
}

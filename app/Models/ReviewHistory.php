<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReviewHistory extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'review_id',
        'old_is_review_active',
        'old_response_id',
        'old_reviewer_id',
        'old_contractor_id',
        'old_rating',
        'old_rating_text',
        'old_rating_date',
        'old_on_appeal_reason',
        'old_on_appeal_reason_date',
        'old_off_appeal_reason',
        'old_off_appeal_reason_date',
        'old_is_under_appeal',
        'old_is_appeal_already_accepted_or_rejected',
        'old_hired_by_contractor',
        'old_paid_on_time',
        'old_hired_contractor',
        'old_give_full_payment',
        'old_how_did_you_meet_this_contractor',
        'new_is_review_active',
        'new_response_id',
        'new_reviewer_id',
        'new_contractor_id',
        'new_rating',
        'new_rating_text',
        'new_rating_date',
        'new_on_appeal_reason',
        'new_on_appeal_reason_date',
        'new_off_appeal_reason',
        'new_off_appeal_reason_date',
        'new_is_under_appeal',
        'new_is_appeal_already_accepted_or_rejected',
        'new_hired_by_contractor',
        'new_paid_on_time',
        'new_hired_contractor',
        'new_give_full_payment',
        'new_how_did_you_meet_this_contractor',

    ];
}

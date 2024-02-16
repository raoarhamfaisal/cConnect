<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Review extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $fillable = [
        'appeal_id',
        'reviewer_id',
        'contractor_id',
        'rating',
        'rating_text',
        'rating_date',
        'hired_by_contractor',
        'paid_on_time',
        'hired_contractor',
        'give_full_payment',
        'how_did_you_meet_this_contractor',
    ];

    public function reviewer() 
    {
        return $this->belongsTo(Profile::class, 'reviewer_id');
    }

    public function contractor() 
    {
        return $this->belongsTo(Profile::class, 'contractor_id');
    }

    public function appeal() 
    {
        return $this->hasOne(Appeal::class, 'review_id');
    }

    public function review_response() 
    {
        return $this->belongsTo(ReviewResponse::class, 'response_id');
    }

    public function ratingReasons()
    {
        return $this->hasMany(RatingReason::class, 'review_id', 'id');
    }
    
}

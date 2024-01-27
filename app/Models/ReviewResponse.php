<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ReviewResponse extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'response_text',
        'response_date',
        'review_id'
    ];

    public function responseReasons()
    {
        return $this->hasMany(RatingReason::class, 'response_id', 'id');
    }

}

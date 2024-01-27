<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingReason extends Model
{
    use HasFactory;

    protected $fillable = [
        'review_id',
        'response_id',
        'reason',
        'reason_date',
        'type'
    ];
}

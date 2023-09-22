<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appeal extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'review_id',
        'on_appeal_reason',
        'on_appeal_reason_date',
        'off_appeal_reason',
        'off_appeal_reason_date',
        'is_under_appeal',
        'appeal_status',
        'appeal_judge_notes',
        'appeal_last_updated_by',
        'appeal_last_updated_at',
    ];
}

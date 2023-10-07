<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionViewSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_id', 'view_locale', 'view_regional', 'view_statewide', 'view_nationwide', 'view_following'
    ];
}

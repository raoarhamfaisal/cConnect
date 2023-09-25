<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImageSection extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'section_image',
        'section_text',
        'contractor_profile_id'
    ];
}

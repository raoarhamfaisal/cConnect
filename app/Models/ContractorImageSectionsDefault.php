<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorImageSectionsDefault extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_title_text',
        'first_title_image',
        'second_title_text',
        'second_title_image',
        'brag1_text',
        'brag1_image',
        'brag2_text',
        'brag2_image',
    ];
}

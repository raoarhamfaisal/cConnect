<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RedFlag extends Model
{
    use SoftDeletes;
    use HasFactory;


    protected $fillable = [
        'profile_id', 'region_id', 'name_of_the_contractor_or_customer', 
        'complaint', 'is_contractor_or_customer'
    ];
    
    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profile_id');
    }
    // Relationships and other model methods...
}

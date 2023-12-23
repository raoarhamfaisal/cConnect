<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockUser extends Model
{
    use HasFactory;

    // Set the table if you prefer a different table name
    protected $table = 'user_blocks';

    // Define the fillable properties
    protected $fillable = [
        'user_id',
        'blocked_user_id',
        // Add any other fields you might need
    ];

    // Define any relationships, accessors, or mutators here as needed
}

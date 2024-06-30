<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function profile() 
    {
        return $this->hasOne(Profile::class, 'user_id', 'id');
    }

    public function contractor_profiles()
    {
        return $this->belongsToMany(ContractorProfile::class)->withPivot('preference_status', 'notes');
    }


    public function blockedUsers()
    {
        return $this->belongsToMany(
            User::class, 
            'user_blocks',  // name of the pivot table
            'user_id',      // foreign key on the pivot table for the current user
            'blocked_user_id' // foreign key on the pivot table for the blocked user
        );
    }


    public function versionDetail()
    {
        return $this->hasOne(UserVersionDetail::class);
    }




}

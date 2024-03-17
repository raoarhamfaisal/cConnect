<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trade;

class profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'region_id',
        'user_avatar',
        'is_payment_verified',
        'user_id',
        'active_user',
        'first_name',
        'last_name',
        'email',
        'phone_cell',
        'company_name',
        'phone_office',
        'company_logo',
        'address_1',
        'address_2',
        'city',
        'state',
        'zipcode',
        'counrty',
        'county',
        'website_url',
        'facebook',
        'twitter',
        'tiktok',
        'instagram',
        'view_locale',
        'view_territorial',
        'view_regional',
        'view_statewide',
        'view_nationwide',
        'view_following',
        'view_groups',
        'notes_on_user',

    ];

    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'profile_trade');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sessionViewSettings()
    {
        return $this->hasOne(SessionViewSetting::class);
    }

    public function sessionTrades()
    {
        return $this->hasMany(SessionTrade::class);
    }

}

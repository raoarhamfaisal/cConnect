<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'region_id',
        'user_avatar',
        'user_id',
        'template_id',
        'color_scheme_id',
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
        'bottom_text',
        'closing_text'
    ];

    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'contractor_trade');
    }

    public function imageSections()
    {
        return $this->hasMany(ImageSection::class);
    }

    public function bragSections()
    {
        return $this->hasMany(BragSection::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('preference_status', 'notes');
    }
}

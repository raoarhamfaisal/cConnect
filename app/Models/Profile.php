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
        'trade1', //  Supplier & Advertiser
        'trade2', //  Construction & Remodeler
        'trade3', //  Tile Works, kitchen & bathroom
        'trade4', //  Concrete, Masonry & Foundations
        'trade5', //  Landscaper
        'trade6', //  Earthworks, Drives & Parking Lots
        'trade7', //  Roofing & Solar
        'trade8', //  Gutters, Siding & Fencing
        'trade9', //  Water, Fire & Mold Remediation
        'trade10', //  Electrical & Low Voltage
        'trade11', //  Plumbing
        'trade12', //  HVAC
        'trade13', //  Carpentry & Finish Carpentry
        'trade14', //  Cabinets, Countertops & Furniture
        'trade15', //  Decks, pergolas & Gazebos
        'trade16', //  Flooring
        'trade17', //  Painting & Staining
        'trade18', //  Drywall Install, Tape & Bed
        'trade19', //  Garage & garage Doors
        'trade20', //  Cleaning Services & Junk Removal
        'trade21', //  Glass, Mirrors, Windows & Doors
        'trade22', //  Metal Fab & Fireplaces
        'trade23', //  Handyman Services
        'trade24', //  Archtectural, Engineering & Law services
        'trade25', //  Open
        'trade26', //  Open
        'trade27', //  Open
        'trade28', //  Open
        'trade29', //  Open
        'trade30', //  Open

    ];

    public function trades()
    {
        return $this->belongsToMany(Trade::class, 'profile_trade');
    }
}

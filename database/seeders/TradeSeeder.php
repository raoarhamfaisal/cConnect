<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trade;

class TradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $trades = [
            "trade1", //  Supplier & Advertiser (all trades)
            "trade2", //  Construction & Remodeling
            "trade3", //  Tile Works, kitchen & Bathrooms
            "trade4", //  Concrete, Masonry & Foundations
            "trade5", //  Landscape
            "trade6", //  Earthworks, drives & parking lots
            "trade7", //  Roofing & Solar
            "trade8", //  Gutters, Siding & Fencing
            "trade9", //  Water/Fire & Mold Remediation
            "trade10", //  Electrical & Low Voltage
            "trade11", //  Plumbing (all Facets)
            "trade12", //  HVAC
            "trade13", //  Carpentry & Finish Carpentry
            "trade14", //  Cabinets, Countertops & furniture
            "trade15", //  Decks, Pergolas & Gazzebo
            "trade16", //  Flooring - All types
            "trade17", //  Painting & Staining
            "trade18", //  Drywall Install & Repair mud texture
            "trade19", //  Garage & Garage Doors
            "trade20", //  Cleaning Services & Junk Haul off
            "trade21", //  Glass, Mirrors, Windows & Doors
            "trade22", //  Metal Fab, Fireplaces
            "trade23", //  Handyman Services
            "trade24", //  Archtectural, Engineering & law
            "trade25", //  open
            "trade26", //  open
            "trade27", //  open
            "trade28", //  open
            "trade29", //  open
            "trade30", //  open
        ];

        foreach ($trades as $trade) {
            Trade::factory()->create([
                'name' => $trade,
            ]);
        }

    }
}

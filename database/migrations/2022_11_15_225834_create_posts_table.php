<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {

            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('region_id');
            $table->boolean('view')->default(1);
            $table->string('title')->nullable();
            $table->string('image')->nullable();
            $table->text('body1')->nullable();
            $table->text('body2')->nullable();
            $table->boolean('body1Bold')->default(1);
            $table->smallInteger('body1ColorId')->default(1);
            $table->smallInteger('likes')->default(0);
            $table->smallInteger('repost')->default(0);
            $table->smallInteger('shares')->default(0);
            $table->boolean('trade1')->default(0); //  Supplier & Advertiser (all trades)
            $table->boolean('trade2')->default(0); //  Construction & Remodeling
            $table->boolean('trade3')->default(0); //  Tile Works, kitchen & Bathrooms
            $table->boolean('trade4')->default(0); //  Concrete, Masonry & Foundations
            $table->boolean('trade5')->default(0); //  Landscape
            $table->boolean('trade6')->default(0); //  Earthworks, drives & parking lots
            $table->boolean('trade7')->default(0); //  Roofing & Solar
            $table->boolean('trade8')->default(0); //  Gutters, Siding & Fencing
            $table->boolean('trade9')->default(0); //  Water/Fire & Mold Remediation
            $table->boolean('trade10')->default(0); //  Electrical & Low Voltage
            $table->boolean('trade11')->default(0); //  Plumbing (all Facets)
            $table->boolean('trade12')->default(0); //  HVAC
            $table->boolean('trade13')->default(0); //  Carpentry & Finish Carpentry
            $table->boolean('trade14')->default(0); //  Cabinets, Countertops & furniture
            $table->boolean('trade15')->default(0); //  Decks, Pergolas & Gazzebo
            $table->boolean('trade16')->default(0); //  Flooring - All types
            $table->boolean('trade17')->default(0); //  Painting & Staining
            $table->boolean('trade18')->default(0); //  Drywall Install & Repair mud texture
            $table->boolean('trade19')->default(0); //  Garage & Garage Doors
            $table->boolean('trade20')->default(0); //  Cleaning Services & Junk Haul off
            $table->boolean('trade21')->default(0); //  Glass, Mirrors, Windows & Doors
            $table->boolean('trade22')->default(0); //  Metal Fab, Fireplaces
            $table->boolean('trade23')->default(0); //  Handyman Services
            $table->boolean('trade24')->default(0); //  Archtectural, Engineering & law
            $table->boolean('trade25')->default(0); //  open
            $table->boolean('trade26')->default(0); //  open
            $table->boolean('trade27')->default(0); //  open
            $table->boolean('trade28')->default(0); //  open
            $table->boolean('trade29')->default(0); //  open
            $table->boolean('trade30')->default(0); //  open

            $table->double('longitude');
            $table->double('latitude');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};

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
        Schema::create('payment_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('region_id');
            $table->decimal('sales_tax', 10, 4)->comment('Sales tax in percentage');  // e.g. 7.25 for 7.25%
            $table->decimal('gold_billed_annual_price', 10, 2);  // Decimal with 2 digits after the decimal point
            $table->decimal('gold_billed_monthly_price', 10, 2);
            $table->decimal('gold_advertised_price', 10, 2)->comment('Price to display on Welcome page(s)');
            $table->decimal('platinum_billed_annual_price', 10, 2);
            $table->decimal('platinum_billed_monthly_price', 10, 2);
            $table->decimal('platinum_advertised_price', 10, 2);
            $table->timestamps();




            $table->foreign('region_id')->references('id')->on('regions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_infos');
    }
};

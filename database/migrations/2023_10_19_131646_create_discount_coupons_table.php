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
        Schema::create('discount_coupons', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_valid')->default(true);  // Assuming you want the coupon to be valid by default
            $table->unsignedBigInteger('region_id');
            $table->decimal('percentage_off_regular_price', 5, 2);  // e.g. 10.00 for 10%
            $table->integer('months');  // Duration in months for which the coupon is valid
            $table->string('coupon_code')->unique();
            $table->date('start_date');
            $table->date('end_date');
            $table->text('notes')->nullable();
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
        Schema::dropIfExists('discount_coupons');
    }
};

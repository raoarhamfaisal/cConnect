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
        Schema::create('rating_reasons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('review_id')->nullable();
            $table->unsignedBigInteger('response_id')->nullable();
            $table->string('reason', 1000);
            $table->dateTime('reason_date')->default(now());
            $table->string('type', 30);


            $table->timestamps();

            $table->foreign('review_id')->references('id')->on('reviews');
            $table->foreign('response_id')->references('id')->on('review_responses');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rating_reasons');
    }
};

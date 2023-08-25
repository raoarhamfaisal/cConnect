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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('response_id')->nullable();
            $table->unsignedBigInteger('profile_id');
            $table->unsignedBigInteger('contractor_id');
            $table->decimal('rating', $precision = 8, $scale = 2);
            $table->longText('rating_text');
            $table->dateTime('rating_date');
            $table->longText('on_appeal_reason')->nullable();
            $table->dateTime('on_appeal_reason_date')->nullable();
            $table->longText('off_appeal_reason')->nullable();
            $table->dateTime('off_appeal_reason_date')->nullable();
            $table->boolean('is_under_appeal')->default(0);
            $table->boolean('hired_by_contractor')->default(0);
            $table->boolean('paid_on_time')->default(0);
            $table->boolean('hired_contractor')->default(0);
            $table->boolean('give_full_payment')->default(0);
            $table->string('how_did_you_meet_this_contractor')->nullable();
            $table->timestamps();
            
            $table->foreign('profile_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->foreign('contractor_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->foreign('response_id')->references('id')->on('review_responses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};

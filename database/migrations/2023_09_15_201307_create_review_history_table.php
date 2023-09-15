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
        Schema::create('review_history', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedBigInteger('review_id');
            $table->boolean('old_is_review_active')->default(1);
            $table->unsignedBigInteger('old_response_id')->nullable();
            $table->unsignedBigInteger('old_reviewer_id');
            $table->unsignedBigInteger('old_contractor_id');
            $table->decimal('old_rating', $precision = 8, $scale = 2);
            $table->longText('old_rating_text');
            $table->dateTime('old_rating_date');
            $table->longText('old_on_appeal_reason')->nullable();
            $table->dateTime('old_on_appeal_reason_date')->nullable();
            $table->longText('old_off_appeal_reason')->nullable();
            $table->dateTime('old_off_appeal_reason_date')->nullable();
            $table->boolean('old_is_under_appeal')->default(0);
            $table->boolean('old_is_appeal_already_accepted_or_rejected')->default(0);
            $table->boolean('old_hired_by_contractor')->default(0);
            $table->boolean('old_paid_on_time')->default(0);
            $table->boolean('old_hired_contractor')->default(0);
            $table->boolean('old_give_full_payment')->default(0);
            $table->string('old_how_did_you_meet_this_contractor')->nullable();
            $table->boolean('new_is_review_active')->default(1);
            $table->unsignedBigInteger('new_response_id')->nullable();
            $table->unsignedBigInteger('new_reviewer_id');
            $table->unsignedBigInteger('new_contractor_id');
            $table->decimal('new_rating', $precision = 8, $scale = 2);
            $table->longText('new_rating_text');
            $table->dateTime('new_rating_date');
            $table->longText('new_on_appeal_reason')->nullable();
            $table->dateTime('new_on_appeal_reason_date')->nullable();
            $table->longText('new_off_appeal_reason')->nullable();
            $table->dateTime('new_off_appeal_reason_date')->nullable();
            $table->boolean('new_is_under_appeal')->default(0);
            $table->boolean('new_is_appeal_already_accepted_or_rejected')->default(0);
            $table->boolean('new_hired_by_contractor')->default(0);
            $table->boolean('new_paid_on_time')->default(0);
            $table->boolean('new_hired_contractor')->default(0);
            $table->boolean('new_give_full_payment')->default(0);
            $table->string('new_how_did_you_meet_this_contractor')->nullable();
            $table->string('reason', 1000);
            $table->dateTime('reason_date')->default(now());
            $table->softDeletes();
            $table->timestamps();


            $table->foreign('old_reviewer_id')->references('id')->on('profiles');
            $table->foreign('old_contractor_id')->references('id')->on('profiles');
            $table->foreign('old_response_id')->references('id')->on('review_responses');
            $table->foreign('new_reviewer_id')->references('id')->on('profiles');
            $table->foreign('new_contractor_id')->references('id')->on('profiles');
            $table->foreign('new_response_id')->references('id')->on('review_responses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('review_history');
    }
};

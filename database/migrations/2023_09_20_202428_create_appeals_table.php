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
        Schema::create('appeals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('review_id');
            $table->longText('on_appeal_reason')->nullable();
            $table->dateTime('on_appeal_reason_date')->nullable();
            $table->longText('off_appeal_reason')->nullable();
            $table->dateTime('off_appeal_reason_date')->nullable();
            $table->boolean('is_under_appeal')->default(0);
            $table->boolean('is_appeal_already_accepted_or_rejected')->default(0);
            $table->string('appeal_status')->nullable();
            $table->text('appeal_judge_notes')->nullable();
            $table->string('appeal_last_updated_by')->nullable();
            $table->dateTime('appeal_last_updated_at')->nullable();
            $table->timestamps();

            $table->foreign('review_id')->references('id')->on('reviews');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appeals');
    }
};

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
        Schema::create('image_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contractor_profile_id');
            $table->string('section_image');
            $table->text('section_text')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('contractor_profile_id')
                  ->references('id')->on('contractor_profiles')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('image_sections');
    }
};

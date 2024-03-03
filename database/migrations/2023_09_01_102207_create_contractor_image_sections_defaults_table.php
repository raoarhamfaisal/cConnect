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
        Schema::create('contractor_image_sections_defaults', function (Blueprint $table) {
            $table->id();
            $table->string('first_title_text')->nullable();
            $table->string('first_title_image')->nullable();
            $table->string('second_title_text')->nullable();
            $table->string('second_title_image')->nullable();
            $table->string('brag1_text')->nullable();
            $table->string('brag1_image')->nullable();
            $table->string('brag2_text')->nullable();
            $table->string('brag2_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contractor_image_sections_defaults');
    }
};

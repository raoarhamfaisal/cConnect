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
        Schema::create('session_view_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('profile_id');
            $table->boolean('view_locale')->default(1);
            $table->boolean('view_regional')->default(0);
            $table->boolean('view_statewide')->default(0);
            $table->boolean('view_nationwide')->default(0);
            $table->boolean('view_following')->default(0);

            $table->timestamps();
        
            $table->foreign('profile_id')->references('id')->on('profiles')->onDelete('cascade');        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('session_view_settings');
    }
};

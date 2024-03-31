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
        Schema::create('contractor_profile_user', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('contractor_profile_id');
            $table->enum('preference_status', ['Preferred', 'Back-Up', 'Possible', 'Rejected'])->nullable();
            $table->text('notes')->nullable(); // To store notes on profiles
            $table->timestamps();
    
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('contractor_profile_id')->references('id')->on('contractor_profiles')->onDelete('cascade');
            $table->unique(['user_id', 'contractor_profile_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contractor_profile_user');
    }
};

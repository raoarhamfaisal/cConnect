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
        Schema::create('payment_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->decimal('amount_paid', 10, 2);
            $table->timestamp('charged_date')->nullable();
            $table->string('subscription_plan')->nullable();
            $table->string('subscription_id')->nullable();
            $table->string('version')->nullable();
            $table->boolean('was_successful')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_histories');
    }
};

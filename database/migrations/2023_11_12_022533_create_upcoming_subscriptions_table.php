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
        Schema::create('upcoming_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->decimal('previous_amount', 10, 2);
            $table->decimal('upcoming_amount', 10, 2);
            $table->timestamp('last_charged_at')->nullable();
            $table->timestamp('next_charge_date')->nullable();
            $table->string('subscription_plan')->nullable();
            $table->string('subscription_id')->nullable();
            $table->boolean('was_previous_subscription_successful')->default(0);
            $table->boolean('is_subscription_active')->default(0);
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
        Schema::dropIfExists('upcoming_subscriptions');
    }
};

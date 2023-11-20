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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_subscription_successfull')->default(0);
            $table->boolean('is_subscription_active')->default(0);
            $table->boolean('is_cancellation_requested')->default(0);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('payment_info_id')->nullable();
            $table->string('subscription_id')->nullable();
            $table->text('metadata');
            $table->string('subscription_plan');
            $table->string('last_4_digits_of_card')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->decimal('original_amount', 10, 2)->nullable();
            $table->decimal('final_amount', 10, 2)->nullable();
            $table->decimal('discount_amount', 10, 2)->nullable();
            $table->date('discount_end_date')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_info_id')->references('id')->on('payment_infos')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
};

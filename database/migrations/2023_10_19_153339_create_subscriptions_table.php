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
            $table->integer('user_id');
            $table->string('subscription_id')->nullable();
            $table->text('metadata');
            $table->string('subscription_plan');
            $table->timestamp('ends_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->decimal('original_amount', 10, 2)->nullable();
            $table->decimal('discount_amount', 10, 2)->nullable();
            $table->date('discount_end_date')->nullable();
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
        Schema::dropIfExists('subscriptions');
    }
};

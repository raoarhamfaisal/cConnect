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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('posts_privileges')->default(0);
            $table->boolean('appeals_privileges')->default(0);
            $table->boolean('users_privileges')->default(0);
            $table->boolean('payments_privileges')->default(0);
            $table->string('authorize_id')->nullable();
            $table->string('authorize_payment_id')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('card_last_four')->nullable();            
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};

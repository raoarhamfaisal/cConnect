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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('region_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->boolean('active_user')->default(0);
            $table->boolean('is_payment_verified')->default(0);
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('company_name')->nullable();
            $table->string('website_url')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('instagram')->nullable();
            $table->string('address_1', 200)->nullable();
            $table->string('address_2', 200)->nullable();
            $table->string('city', 1000)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('zipcode', 15)->nullable();
            $table->string('county', 100)->nullable();
            $table->string('counrty', 100)->nullable();

            $table->string('email', 50)->unique();

            $table->string('phone_cell', 40)->nullable();
            $table->string('phone_office', 40)->nullable();

            $table->string('user_avatar')->nullable();
            $table->string('company_logo')->nullable();

            $table->date('business_start')->nullable();

            $table->boolean('view_locale')->default(1);
            $table->boolean('view_regional')->default(0);
            $table->boolean('view_statewide')->default(0);
            $table->boolean('view_nationwide')->default(0);
            $table->boolean('view_following')->default(0);

            $table->text('notes_on_user')->nullable();


            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_id')->references('id')->on('regions');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};

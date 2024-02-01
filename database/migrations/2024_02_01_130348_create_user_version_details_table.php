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
        Schema::create('user_version_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->integer('nf_ppm')->nullable();
            $table->integer('nf_ipp')->nullable();
            $table->boolean('nf_title')->nullable();
            $table->boolean('nf_bottom')->nullable();
            $table->boolean('nf_comments')->nullable();
            $table->boolean('nf_repost')->nullable();
            $table->boolean('nf_future1')->nullable();
            $table->boolean('nf_future2')->nullable();
            $table->integer('sf_search')->nullable();
            $table->integer('sf_last_search_month')->nullable();
            $table->boolean('sf_tracking')->nullable();
            $table->boolean('sf_notes')->nullable();
            $table->boolean('sf_info')->nullable();
            $table->boolean('sf_future1')->nullable();
            $table->boolean('sf_future2')->nullable();
            $table->integer('tg_members')->nullable();
            $table->integer('tg_post')->nullable();
            $table->boolean('tg_view_all')->nullable();
            $table->boolean('tg_future1')->nullable();
            $table->boolean('tg_future2')->nullable();
            $table->boolean('rf_access')->nullable();
            $table->boolean('rf_customers')->nullable();
            $table->boolean('rf_sales')->nullable();
            $table->boolean('rf_contractor')->nullable();
            $table->boolean('rf_future1')->nullable();
            $table->boolean('rf_future2')->nullable();
            $table->boolean('re_reviews')->nullable();
            $table->boolean('re_feedback')->nullable();
            $table->boolean('re_appeal')->nullable();
            $table->boolean('re_future1')->nullable();
            $table->boolean('re_future2')->nullable();
            $table->integer('cp_template')->nullable();
            $table->integer('cp_color')->nullable();
            $table->boolean('cp_share')->nullable();
            $table->boolean('cp_future1')->nullable();
            $table->boolean('cp_future2')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_version_details');
    }
};

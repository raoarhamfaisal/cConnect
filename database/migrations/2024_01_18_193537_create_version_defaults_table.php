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
        Schema::create('version_defaults', function (Blueprint $table) {
            $table->id();
            $table->integer('nf_ppm');
            $table->integer('nf_ipp');
            $table->boolean('nf_title');
            $table->boolean('nf_bottom');
            $table->boolean('nf_comments');
            $table->boolean('nf_repost');
            $table->boolean('nf_future1');
            $table->boolean('nf_future2');
            $table->integer('sf_search');
            $table->boolean('sf_tracking');
            $table->boolean('sf_notes');
            $table->boolean('sf_info');
            $table->boolean('sf_future1');
            $table->boolean('sf_future2');
            $table->integer('tg_members');
            $table->integer('tg_post');
            $table->boolean('tg_view_all');
            $table->boolean('tg_future1');
            $table->boolean('tg_future2');
            $table->boolean('rf_access');
            $table->boolean('rf_customers');
            $table->boolean('rf_sales');
            $table->boolean('rf_contractor');
            $table->boolean('rf_future1');
            $table->boolean('rf_future2');
            $table->boolean('re_reviews');
            $table->boolean('re_feedback');
            $table->boolean('re_appeal');
            $table->boolean('re_future1');
            $table->boolean('re_future2');
            $table->integer('cp_template');
            $table->integer('cp_color');
            $table->boolean('cp_share');
            $table->boolean('cp_future1');
            $table->boolean('cp_future2');
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
        Schema::dropIfExists('version_defaults');
    }
};

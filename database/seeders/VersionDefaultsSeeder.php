<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class VersionDefaultsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('version_defaults')->insert([
            [
                'id' => 1, // Free
                'nf_ppm' => 8,
                'nf_ipp' => 3,
                'nf_title' => 0,
                'nf_bottom' => 0,
                'nf_comments' => 1,
                'nf_repost' => 0,
                'nf_future1' => 0,
                'nf_future2' => 0,
                'sf_search' => 5,
                'sf_tracking' => 0,
                'sf_notes' => 0,
                'sf_info' => 0,
                'sf_future1' => 0,
                'sf_future2' => 0,
                'tg_members' => 3,
                'tg_post' => 3,
                'tg_view_all' => 1,
                'tg_future1' => 0,
                'tg_future2' => 0,
                'rf_access' => 0,
                'rf_customers' => 0,
                'rf_sales' => 0,
                'rf_contractor' => 0,
                'rf_future1' => 0,
                'rf_future2' => 0,
                're_reviews' => 1,
                're_feedback' => 0,
                're_appeal' => 0,
                're_future1' => 0,
                're_future2' => 0,
                'cp_template' => 1,
                'cp_color' => 1,
                'cp_share' => 0,
                'cp_future1' => 0,
                'cp_future2' => 0,
            ],
            [
                'id' => 2, // Gold
                'nf_ppm' => 60,
                'nf_ipp' => 15,
                'nf_title' => 1,
                'nf_bottom' => 0,
                'nf_comments' => 1,
                'nf_repost' => 1,
                'nf_future1' => 1,
                'nf_future2' => 1,
                'sf_search' => 99,
                'sf_tracking' => 1,
                'sf_notes' => 1,
                'sf_info' => 1,
                'sf_future1' => 1,
                'sf_future2' => 1,
                'tg_members' => 99,
                'tg_post' => 99,
                'tg_view_all' => 1,
                'tg_future1' => 1,
                'tg_future2' => 1,
                'rf_access' => 1,
                'rf_customers' => 1,
                'rf_sales' => 1,
                'rf_contractor' => 1,
                'rf_future1' => 1,
                'rf_future2' => 1,
                're_reviews' => 1,
                're_feedback' => 1,
                're_appeal' => 1,
                're_future1' => 1,
                're_future2' => 1,
                'cp_template' => 3,
                'cp_color' => 3,
                'cp_share' => 0,
                'cp_future1' => 1,
                'cp_future2' => 1,
            ],
            [
                'id' => 3, // Platinum
                'nf_ppm' => 99, // Assuming 99 means unlimited
                'nf_ipp' => 20,
                'nf_title' => 1,
                'nf_bottom' => 1,
                'nf_comments' => 1,
                'nf_repost' => 1,
                'nf_future1' => 1,
                'nf_future2' => 1,
                'sf_search' => 99,
                'sf_tracking' => 1,
                'sf_notes' => 1,
                'sf_info' => 1,
                'sf_future1' => 1,
                'sf_future2' => 1,
                'tg_members' => 99,
                'tg_post' => 99,
                'tg_view_all' => 1,
                'tg_future1' => 1,
                'tg_future2' => 1,
                'rf_access' => 1,
                'rf_customers' => 1,
                'rf_sales' => 1,
                'rf_contractor' => 1,
                'rf_future1' => 1,
                'rf_future2' => 1,
                're_reviews' => 1,
                're_feedback' => 1,
                're_appeal' => 1,
                're_future1' => 1,
                're_future2' => 1,
                'cp_template' => 9,
                'cp_color' => 9,
                'cp_share' => 1,
                'cp_future1' => 1,
                'cp_future2' => 1,
            ]
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserVersionDetail;
use Illuminate\Support\Facades\DB;

class UserVersionDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Fetch all users
        $users = User::all();

        // Example default values for UserVersionDetail
        $defaultValues = [
            'nf_ppm' => 8,
            'nf_ipp' => 3,
            'nf_title' => 0,
            'nf_bottom' => 0,
            'nf_comments' => 1,
            'nf_repost' => 0,
            'nf_future1' => 0,
            'nf_future2' => 0,
            'sf_search' => 5,
            'sf_last_search_month' => now()->month,
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
        ];

        foreach ($users as $user) {
            // Check if the user already has version details to avoid duplicates
            $existingDetail = UserVersionDetail::where('user_id', $user->id)->first();
            if (!$existingDetail) {
                UserVersionDetail::create(array_merge(['user_id' => $user->id], $defaultValues));
            }
        }
    }
}

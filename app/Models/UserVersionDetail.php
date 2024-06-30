<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVersionDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'nf_ppm', 'nf_ipp', 'nf_title', 'nf_bottom', 'nf_comments',
        'nf_repost', 'nf_future1', 'nf_future2', 'sf_search', 'sf_tracking',
        'sf_notes', 'sf_info', 'sf_future1', 'sf_future2', 'tg_members',
        'tg_post', 'tg_view_all', 'tg_future1', 'tg_future2', 'rf_access',
        'rf_customers', 'rf_sales', 'rf_contractor', 'rf_future1', 'rf_future2',
        're_reviews', 're_feedback', 're_appeal', 're_future1', 're_future2',
        'cp_template', 'cp_color', 'cp_share', 'cp_future1', 'cp_future2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

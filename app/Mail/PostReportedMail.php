<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Post;

class PostReportedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $post, $reportText;

    public function __construct(Post $post, $reportText)
    {
        $this->post = $post;
        $this->reportText = $reportText;
    }

    public function build()
    {
        return $this->subject('A Post Has Been Reported')
                    ->view('emails.post_reported');
    }
}


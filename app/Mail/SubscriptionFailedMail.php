<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SubscriptionFailedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $response;

    public function __construct(User $user, $response)
    {
        $this->user = $user;
        $this->response = $response;
    }

    public function build()
    {
        return $this->subject('Subscription Payment Failed!')
            ->view('emails.subscription_failed');
    }
}

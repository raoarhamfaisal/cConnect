<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SubscriptionSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $amount, $last4DigitsOfBankAccount, $subscriptionDate;

    public function __construct(User $user, $amount, $last4DigitsOfBankAccount, $subscriptionDate)
    {
        $this->user = $user;
        $this->amount = number_format($amount, 2, '.', ''); // Format the amount
        $this->last4DigitsOfBankAccount = $last4DigitsOfBankAccount;
        $this->subscriptionDate = $subscriptionDate;    }

    public function build()
    {
        return $this->subject('Subscription Payment Successful!')
            ->view('emails.subscription_success');
    }
}

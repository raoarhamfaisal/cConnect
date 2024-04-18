<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SubscriptionUpdateSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user, $newAmount, $last4DigitsOfBankAccount, $updateDate;

    public function __construct(User $user, $newAmount, $last4DigitsOfBankAccount, $updateDate)
    {
        $this->user = $user;
        $this->newAmount = $newAmount;
        $this->last4DigitsOfBankAccount = $last4DigitsOfBankAccount;
        $this->updateDate = $updateDate;
    }

    public function build()
    {
        return $this->subject('Subscription Update Successful!')
            ->view('emails.subscription_update_success');
    }
}

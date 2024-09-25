<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
 
    public function sendEmail(Request $request)
    {
        $details = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'department' => 'required',
            'message' => 'required',
        ]);

        Mail::to('support@cConnect.com')->send(new ContactMail($details));

        return response()->json(['message' => 'Email sent successfully!']);
    }

}

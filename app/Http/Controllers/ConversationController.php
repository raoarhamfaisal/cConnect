<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index()
    {
        $me = Auth::user()->load('profile');

        return Inertia::render('Chats/ChatPage', [
            'authUser' => [
                'id'         => $me->id,
                'first_name' => $me->first_name,
                'last_name'  => $me->last_name,
                'avatar'     => $me->profile->user_avatar ?? null,
            ],
        ]);
    }
}
<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Regular channel for messages - no authorization needed
Broadcast::channel('conversation.{conversationId}', function () {
    return true;
});

// Regular channel for online status - no authorization needed
Broadcast::channel('online-status', function () {
    return true;
});

// This file is used to define channel authorization logic
Broadcast::routes();
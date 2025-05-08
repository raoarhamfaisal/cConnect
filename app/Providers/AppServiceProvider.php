<?php

namespace App\Providers;

use App\Models\Post;
use App\Observers\PostObserver;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use App\Services\ChatAttachmentService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(ChatAttachmentService::class, function ($app) {
            return new ChatAttachmentService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
        Inertia::share([
            'errors' => function () {
                return Session::get(key:'errors')
                ? Session::get(key : 'errors')->getBag('default')
                    ->getMessages(): (object) [];
            },
        ]);

        Inertia::share('flash', function () {
            return [
                'message' => Session::get(key:'message'),
            ];
        });

        Inertia::share('csrf_token', function () {
            return csrf_token();
        });

        Post::observe(PostObserver::class);
    }
}

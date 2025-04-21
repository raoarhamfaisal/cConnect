# cConnect Project Overview

This is a Laravel-based web application using the VILT stack (Vue.js, Inertia.js, Laravel, Tailwind CSS) with the following components:

## Tech Stack

- **Backend**: Laravel 8.x (PHP 8.1)
- **Frontend**:
  - Vue.js
  - Vuetify
  - Tailwind CSS for styling
- **Real-time Communication**:
  - Laravel Websockets
  - Pusher for broadcasting
- **Database**: MySQL
- **Caching**: Redis
- **Search**: Meilisearch
- **Environment**: Docker with Laravel Sail
- **Email**: Using Mailtrap for development

## Key Project Features

- Payment processing with Authorize.net
- Subscription management system
- User profiles and authentication
- Real-time notifications and updates
- Email notifications for subscription events

## Important Project Patterns

- Controllers follow RESTful conventions
- Vue components use the Composition API
- Authentication uses Laravel Sanctum
- Docker containers for development environment
- Websockets for real-time features

## File Structure Context

- `app/` - Contains PHP backend code (models, controllers, etc.)
- `resources/js/` - Contains frontend Vue components
- `config/` - Contains Laravel configuration files
- `routes/` - Contains API and web routes
- `docker-compose.yml` - Docker configuration for development

## Development Commands

- `./vendor/bin/sail up` - Start the development environment
- `./vendor/bin/sail artisan` - Run artisan commands
- `./vendor/bin/sail npm run dev` - Start Vite development server

Please provide assistance with Laravel, Vue.js, Websockets, Docker, Tailwind CSS, and Authorize.net integration when needed.

# cConnect

A modern web application built with the VILT stack (Vue.js, Inertia.js, Laravel, Tailwind CSS) providing subscription management and real-time communication features.

## Tech Stack

- **Backend**:
  - Laravel 8.x (PHP 8.1)
  - RESTful API architecture
- **Frontend**:
  - Vue.js with Composition API
  - Vuetify component framework
  - Inertia.js for SPA-like experience
  - Tailwind CSS for styling
- **Real-time Communication**:
  - Laravel Websockets
  - Pusher for broadcasting
- **Database & Storage**:
  - MySQL for primary database
  - Redis for caching and queue management
  - Meilisearch for fast, typo-tolerant search functionality
- **Payment Processing**:
  - Authorize.net integration
- **Development Environment**:
  - Docker with Laravel Sail
  - Mailtrap for email testing

## Key Features

- Comprehensive subscription management system
- Secure payment processing with Authorize.net
- User profiles and authentication via Laravel Sanctum
- Real-time notifications and updates
- Email notifications for subscription events

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Git

### Installation Steps

1. Clone the repository:

   ```
   git clone <repository-url>
   cd cConnect
   ```

2. Install PHP dependencies:

   ```
   docker run --rm -v $(pwd):/app composer install
   ```

3. Set up environment file:

   ```
   cp .env.example .env
   ```

4. Start Laravel Sail:

   ```
   ./vendor/bin/sail up -d
   ```

5. Generate application key:

   ```
   ./vendor/bin/sail artisan key:generate
   ```

6. Run migrations and seed database:

   ```
   ./vendor/bin/sail artisan migrate --seed
   ```

7. Install frontend dependencies:

   ```
   ./vendor/bin/sail npm install
   ```

8. Build frontend assets:

   ```
   ./vendor/bin/sail npm run dev
   ```

9. Access the application at http://localhost

## Development Commands

- `./vendor/bin/sail up` - Start the development environment
- `./vendor/bin/sail down` - Stop the development environment
- `./vendor/bin/sail artisan <command>` - Run artisan commands
- `./vendor/bin/sail npm run dev` - Start Vite development server
- `./vendor/bin/sail npm run build` - Build for production
- `./vendor/bin/sail test` - Run tests

## WebSockets Configuration

Real-time features use Laravel WebSockets with Pusher. Ensure your .env file has the following configurations:

```
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your_app_id
PUSHER_APP_KEY=your_app_key
PUSHER_APP_SECRET=your_app_secret
PUSHER_APP_CLUSTER=mt1
```

## Authorize.net Integration

Payment processing is handled through Authorize.net. Configure your credentials in the .env file:

```
AUTHORIZENET_ENVIRONMENT=sandbox  # or production
AUTHORIZENET_LOGIN_ID=your_login_id
AUTHORIZENET_TRANSACTION_KEY=your_transaction_key
```

## License

[MIT License](LICENSE.md)

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Cancelled</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img style="width: 300px;" src="https://raoarhamfaisal.me/images/cConnect-logo.png" alt="cConnect Logo">
        </div>
        <div class="content">
            <p>Hello {{ $user->first_name }} {{ $user->last_name }},</p>
            <p>We regret to inform you that your subscription has been cancelled. It's been a pleasure having you as a
                user, and we're genuinely sad to see you go.</p>
            <p>If you did not request this cancellation, or if you believe there has been an error, please contact our
                support team immediately. If this was intentional and you decide to return in the future, we'll be here
                ready to serve you again.</p>
            <p>We value every member of our community. If there's anything specific that led to your decision, please
                let us know. Your feedback is invaluable in helping us improve.</p>
            <br>
        </div>
        <div class="footer">
            &copy; 2025 cConnect. All rights reserved.
        </div>
    </div>
</body>

</html>

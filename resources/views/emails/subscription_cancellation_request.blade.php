<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Cancellation Request Received</title>
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
            <img src="https://cConnect.com/uploads/common/site-logo.png" alt="cConnect Logo">
        </div>
        <div class="content">
            <p>Hello {{ $user->name }},</p>
            <p>We have received your request to cancel your subscription. Your subscription will be reviewed and processed accordingly.</p>
            <p>Thank you for using our services.</p>
        </div>
        <div class="footer">
            &copy; 2024 cConnect. All rights reserved.
        </div>
    </div>
</body>
</html>

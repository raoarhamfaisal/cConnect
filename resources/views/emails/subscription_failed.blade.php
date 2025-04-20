<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Payment Failed</title>
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
            <p>Hello {{ $user->first_name }} {{ $user->last_name }},</p>
            <p>Unfortunately, your subscription payment failed.</p>
            <p>Your payment could not be processed due to incorrect card details.</p>
            <p>Please update your payment details to continue enjoying our services.</p>
        </div>
        <div class="footer">
            &copy; 2025 cConnect. All rights reserved.
        </div>
    </div>
</body>
</html>

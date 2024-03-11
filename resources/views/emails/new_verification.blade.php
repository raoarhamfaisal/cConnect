<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
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
            <img src="https://tcontractor.com/uploads/common/site-logo.png" alt="tContractor Logo">
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have requested to signup using your email address for your account at tContractor. Please use the following verification code to complete the process:</p>
            <h2 style="text-align: center;">{{ $token }}</h2>
            <p>This code will expire in 5 minutes. If you did not request this change, please ignore this email or contact support.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} tContractor. All rights reserved.
        </div>
    </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Inquiry</title>
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
        .header img {
            max-width: 200px; /* Adjust based on your logo size */
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
            <h2>Contact Inquiry</h2>
            <p>A new contact inquiry has been received with the following details:</p>
            <table>
                <tr><td><strong>Name:</strong></td><td>{{ $details['name'] }}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{{ $details['email'] }}</td></tr>
                <tr><td><strong>Phone Number:</strong></td><td>{{ $details['phone'] }}</td></tr>
                <tr><td><strong>Department:</strong></td><td>{{ $details['department'] }}</td></tr>
                <tr><td><strong>Message:</strong></td><td>{{ $details['message'] }}</td></tr>
            </table>
            <p>Please follow up accordingly.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} cConnect. All rights reserved.<br>
            <a href="https://cConnect.com">Visit our Website</a>
        </div>
    </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Payment Successful</title>
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
                <p>Hello {{ $user->first_name }} {{ $user->last_name }},</p>
                <p>Date: {{ $subscriptionDate }}</p>
                <p>Your email: {{ $user->email }}</p>
                <p>Congratulations! Your subscription payment was successful.</p>
                <p>Amount Paid: ${{ $amount }} <br> 
                Last 4 digits of CC/Bank Account: {{ $last4DigitsOfBankAccount }}
                </p>
                <a href="https://tcontractor.com/login" style="padding: 10px; background-color: #241e6d; color: white; text-decoration: none; border-radius: 5px;">Log into tContractor</a>
            </div>           
            <div class="footer">
                &copy; 2024 tContractor. All rights reserved.
            </div>
        </div>
    </body>
</html>

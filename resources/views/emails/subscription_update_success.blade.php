<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Update Successful</title>
    <!-- Styles omitted for brevity -->
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://cConnect.com/uploads/common/site-logo.png" alt="cConnect Logo">
        </div>
        <div class="content">
            <p>Hello {{ $user->first_name }} {{ $user->last_name }},</p>
            <p>Date: {{ $updateDate }}</p>
            <p>Your email: {{ $user->email }}</p>
            <p>We have successfully updated your subscription details.</p>
            <p>New Billing Amount: ${{ $newAmount }} (including sales tax) <br> 
            Last 4 digits of CC/Bank Account: {{ $last4DigitsOfBankAccount }}
            </p>
            <p>Note: Your discount period has ended, and the new amount reflects the regular subscription price.</p>
            <a href="https://cConnect.com/login" style="padding: 10px; background-color: #241e6d; color: white; text-decoration: none; border-radius: 5px;">Log into cConnect</a>
        </div>           
        <div class="footer">
            &copy; 2024 cConnect. All rights reserved.
        </div>
    </div>
</body>
</html>

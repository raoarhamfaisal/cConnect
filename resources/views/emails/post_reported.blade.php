<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Reported</title>
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
        .content {
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
        }
        a {
            padding: 10px;
            background-color: #241e6d;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <p>Hello Admin,</p>
            <p>A post has been reported on your platform:</p>
            <p><strong>Post ID:</strong> {{ $post->id }}</p>
            <p><strong>Report Details:</strong> {{ $reportText }}</p>
            <p>Please review the post and take appropriate action.</p>
            <a href="https://tcontractor.com/posts">View Post</a>
        </div>           
        <div class="footer">
            &copy; {{ date('Y') }} Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>

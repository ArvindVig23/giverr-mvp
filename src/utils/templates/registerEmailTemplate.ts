export const registerEmailTemplate = `<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .header {
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }

        .message {
            padding: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to Giverr!</h2>
        </div>
        <div class="message">
            <p>Dear {{email}} ,</p>
            <p>You are registered successfully. Thank you for joining Giverr!</p>
            <p>Best Regards,<br />Team Giverr</p>
        </div>
    </div>
</body>

</html>`;

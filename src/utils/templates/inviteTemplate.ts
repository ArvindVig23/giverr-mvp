export const inviteEmail = `
<!DOCTYPE html>
<html>

<head>
    <style>
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            padding: 10px 0;
        }

        .content {
            margin: 20px 0;
        }

        .content h2,
        .content h3 {
            color: #333;
        }

        .content p {
            color: #666;
        }

        .content ul {
            padding-left: 20px;
        }

        .footer {
            margin-top: 20px;
        }

        .link {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 10px;
            color: #fff;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            background-color: #4CAF50;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>You're Invited to Join Our Organization!</h1>
        </div>
        <div class="content">
            <h2>Organization - {{name}}</h2>
            <p>We are excited to invite you to join our organization. Please click the link below to log in to Giverr and accept the invitation.</p>
            <p><a href="{{loginUrl}}" target="_blank" class="link">Log in to Giverr</a></p>
        </div>
        <div class="footer">
            <p>Thank you!</p>
            <p>Regards,</p>
            <p>Giverr</p>
        </div>
    </div>
</body>

</html>`;

export const volunteerEmailTemplate = `<!DOCTYPE html>
<html>

<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            max-width: 600px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .content {
            font-size: 16px;
            line-height: 1.5;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            You are now a volunteer!
        </div>
        <div class="content">
            <p>Please find the event details below:</p>
            <p><strong>Event Name:</strong> {{name}}</p>
            <p><strong>Description:</strong> {{description}}</p>
            <p><strong>Event Date:</strong> {{eventDate}}</p>
        </div>
        <div class="footer">
            Thanks, <br />
            Giver
        </div>
    </div>
</body>

</html>
`;

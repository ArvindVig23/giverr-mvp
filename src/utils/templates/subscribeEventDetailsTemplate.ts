export const subscribeEventDetailsTemplate = `<!DOCTYPE html>
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
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Subscribed Opportunity Details</h1>
        </div>
        <div class="content">
            <h2>{{name}}</h2>
            <p><strong>Description:</strong> {{description}}</p>
            <h3>Activities:</h3>
            <p>{{activities}}</p>
            <p><strong>Time:</strong> {{eventDate}}</p>
            <h3>Requirements:</h3>
            <p>{{volunteerRequirements}}</p>
        </div>
    </div>
</body>

</html>`;

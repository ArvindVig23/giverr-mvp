export const eventAddedToSubscribeCat = `<!DOCTYPE html>
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

        .actions {
            text-align: center;
            margin-top: 20px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 0 10px;
            color: #fff;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            font-weight: bold;
        }

        .button.view {
            background-color: #007BFF;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>New Opportunity Added</h1>
        </div>
        <div class="content">
            <h2>Opportunity Title - {{name}}</h2>
            <p>Opportunity Description - {{description}}</p>
            <p>Created By - {{email}}</p>
            <h3>Activities: {{activities}}</h3>
            <p>Location: {{location}}</p>
            <p>Frequency: {{frequency}}</p>
            <p>Time: {{eventDate}}</p>
            <p>Organization: {{organizationName}}</p>
            <p>Opportunity Type: {{oppType}}</p>
        </div>
    </div>
</body>

</html>
`;

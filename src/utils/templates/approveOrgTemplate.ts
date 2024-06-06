export const approveOrgTemplate = `
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
            /* Removed border for cleaner look */
            border-radius: 5px;
            font-weight: bold;
            /* Added bold font weight for emphasis */
        }

        .button.approve {
            background-color: #4CAF50;
        }

        .button.reject {
            background-color: #f44336;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Organization Approval Request</h1>
        </div>
        <div class="content">
            <h2>Organization - {{name}}</h2>
            <p>Organization Username - {{username}}</p>
            <p>Created By - {{createdBy}}</p>
            <p>Website - {{website}}</p>
        </div>
        <div class="actions">
            <a href="{{approvalUrl}}" target="_blank" class="button approve">Approve</a>
            <a href="{{rejectUrl}}" target="_blank" class="button reject">Reject</a>
        </div>
    </div>
</body>

</html>`;

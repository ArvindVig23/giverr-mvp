export const contactUsTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .details { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
        .detail-item { margin-bottom: 10px; }
        .detail-label { font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Request</h1>
        <div class="details">
            <div class="detail-item">
                <span class="detail-label">Full Name:</span> {{fullName}}
            </div>
            <div class="detail-item">
                <span class="detail-label">Email:</span> {{email}}
            </div>
            <div class="detail-item">
                <span class="detail-label">Phone:</span> {{phone}}
            </div>
            <div class="detail-item">
                <span class="detail-label">Message:</span>
                <p>{{message}}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

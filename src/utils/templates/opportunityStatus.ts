export const opportunityStatus = `
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
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>Your Opportunity Status: {{status}}</h1>
            </div>
            <div class="content">
                <h2>Opportunity Title: {{name}}</h2>
                <p>Opportunity Description: {{description}}</p>
                <p>Status: {{status}}</p>
            </div>
        </div>
    </body>
    
    </html>
    `;

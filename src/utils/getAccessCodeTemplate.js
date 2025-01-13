export const getAccessCodeTemplate = (code, expiresIn, email) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background-color: #f4a261;
        padding: 20px;
        text-align: center;
        color: #ffffff;
      }
      .email-header h1 {
        margin: 0;
        font-size: 1.5rem;
      }
      .email-content {
        padding: 20px;
        text-align: center;
      }
      .email-content p {
        margin: 0 0 15px;
        line-height: 1.6;
      }
      .access-code {
        font-size: 2rem;
        font-weight: bold;
        background-color: #eeeeee;
        padding: 10px 20px;
        display: inline-block;
        margin: 20px 0;
        border-radius: 8px;
      }
      .email-footer {
        background-color: #eeeeee;
        padding: 15px;
        text-align: center;
        font-size: 0.9rem;
        color: #666666;
      }
      .email-footer a {
        color: #f4a261;
        text-decoration: none;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>ReMailMe</h1>
        <p>Your Secure Access Code</p>
      </div>
      <div class="email-content">
        <p>Dear user,</p>
        <p>Your access code is:</p>
        <div class="access-code">${code}</div>
        <p>This code will expire in <strong>${expiresIn} minutes</strong>.</p>
        <p>If you didn't request this code, you can safely ignore this email.</p>
        <p>Sent to: <strong>${email}</strong></p>
      </div>
      <div class="email-footer">

        <p>&copy; ${new Date().getFullYear()} ReMailMe. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

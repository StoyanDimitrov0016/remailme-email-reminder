export const getReminderTemplate = (content, email) => `
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
        color: #666666; /* Supporting text in gray */
      }
      .email-content p {
        margin: 0 0 15px;
        line-height: 1.6;
      }
      .email-content .highlight-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10px;
        text-align: center;
      }
      .email-content .highlight {
        background-color: #fff8dc; /* Matching light yellow */
        padding: 15px;
        border-radius: 4px;
        font-size: 1.2rem;
        color: #333333; /* Content in standard color */
        font-weight: bold;
        text-align: center;
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
        <p>Your Trusted Reminder Service</p>
      </div>
      <div class="email-content">
        <p>
          This is an <strong>automated scheduled email</strong> from the
          <strong>ReMailMe</strong> application.
        </p>
        <p class="highlight-title">You told us to remind you about:</p>
        <div class="highlight">
          ${content}
        </div>
        <p>
          Dear user, this reminder was sent to your email:
          <strong>${email}</strong>.
        </p>
        <p>
          Please do not reply to this email as it is automatically generated.
        </p>
      </div>
      <div class="email-footer">
        <p>
          If you no longer want to receive such reminders, visit
          <a href="https://remailme.app">ReMailMe</a> to delete your
          reminders or manage your preferences.
        </p>
        <p>&copy; ${new Date().getFullYear()} ReMailMe. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

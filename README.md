# ReMailMe: A Minimal Email Reminder Service

## Introduction

ReMailMe is a small-scale email reminder service designed to help users stay on top of important events and tasks. Whether it's a weekly Spanish class or a one-time car insurance renewal, ReMailMe ensures you never miss a beat.

This project also serves as an exploration of multi-page applications (MPA) using **Handlebars.js** and building robust backend systems with **Node.js**, **SQLite3**, and **Nodemailer**.

---

## Features

- **Email-Oriented Authentication:**
  Users authenticate via an email verification code, avoiding the hassle of passwords.
- **One-Time and Weekly Reminders:**
  Schedule reminders for specific dates or recurring weekly events.
- **Automated Cron Workers:**
  Execute every minute to check and send due reminders (both one-time and weekly).
- **Nodemailer Integration:**
  Dynamically generate and send beautifully designed email templates.
- **Silent Registration:**
  Accounts are created automatically based on email addresses, simplifying the user experience.
- **SQLite3 Repository Abstraction:**
  A structured database interaction layer for clean and maintainable code.
- **Session Persistence:**
  Sessions are securely managed and persisted using connect-sqlite3.
- **Secure Practices:**
  Helmet.js, Rate Limiting, and Session Management for better security.

---

## Project Structure

The application is organized using the principles of the **MVC** (Model-View-Controller) architecture. The primary layers are as follows:

- **Repository Layer**:  
  Handles database interactions.

- **Service Layer**:  
  Contains business logic and interacts with repositories to ensure separation of concerns.

- **Controller Layer with Views**:  
  Manages request handling and renders Handlebars views for server-side templating.

- **Routes Layer**:  
  Defines routing for each endpoint.

- **App Entry Point**:  
  The main file (`app.js`) initializes the application, middleware, routes, and cron jobs.

Additionally, the project includes:

- **Config**:  
  Centralized configuration files for database, middleware, email (Nodemailer), and cron jobs.

- **Utils**:  
  Helper functions for generating dynamic email templates and other utility logic.

- **Environment File (`.env`)**:  
  Manages sensitive credentials, including:

- **SQLite Database**:  
  A lightweight relational database for data persistence.

## Installation (To Be Added):

## Usage (To Be Added):

## Screenshots (To Be Added):

## API Documentation (To Be Added):

## Technologies Used

### Core Frameworks and Libraries

- **Node.js**:  
  Serves as the backend runtime environment for the application, handling server-side logic and asynchronous operations efficiently.
- **Express.js**:  
  Powers the routing and middleware for the application, providing a lightweight and flexible web server framework.

### Templating and Views

- **Express Handlebars**:  
  Enables server-side rendering of HTML views, making it easier to build dynamic multi-page applications (MPAs).

### Database and Persistence

- **SQLite3**:  
  A lightweight relational database for data storage. It's used for managing users, reminders, and sessions.
- **Connect-SQLite3**:  
  Provides session persistence by connecting Express sessions to the SQLite3 database.

### Email Functionality

- **Nodemailer**:  
  Handles the generation and sending of emails, including dynamically templated reminder emails and access code messages.

### Security

- **Helmet.js**:  
  Adds HTTP headers to protect against common web vulnerabilities.
- **Express-Rate-Limit**:  
  Limits the number of requests from a single IP to prevent abuse or brute-force attacks.

### Utilities and Other Features

- **dotenv**:  
  Loads environment variables from a `.env` file, keeping sensitive credentials secure and separate from the codebase.
- **Node-Cron**:  
  Schedules and executes recurring tasks (cron jobs) every minute to check and process due reminders.

## Future Enhancements and Current Limitations

### Multi-Timezone Support

The current version of the application assumes all reminders are based on Bulgarian Time (UTC+2), serving as a unified timezone. This limitation may inconvenience users in different regions or those with varying timezone preferences. Future iterations of the application aim to address this by introducing comprehensive timezone support.

### Proposal

To handle timezone differences effectively and ensure reminders are accurate regardless of the user's location, the following changes are proposed:

- **UTC Normalization**:  
  Store all `reminder_time` values in UTC format to maintain consistency and prevent timezone discrepancies.

- **Adding `utc_offset`**:

  - Introduce an `utc_offset` column to the reminders table (`weekly_reminders` and `one_time_reminders`) to reflect timezone differences.
  - Alternatively, store the `utc_offset` in the `users` table for cases where all reminders for a user follow the same timezone preference.

- **Frontend Timezone Detection**:  
  Use the browser's API (`Intl.DateTimeFormat().resolvedOptions().timeZone`) to extract the user's timezone and map it to a corresponding `utc_offset` value.

- **Custom Time Component**:  
  Enhance the reminder creation and update forms with a custom time input component that includes timezone selection. This will allow users to specify the exact time and timezone for their reminders in a user-friendly way.

### Markdown Support for Reminder Descriptions

The current version supports plain text for reminder descriptions, which limits formatting options. To improve the user experience, a future enhancement could allow users to use **Markdown** to format their reminder descriptions.

## License

This project is licensed under the MIT License.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, as long as the original copyright and license notice are included.

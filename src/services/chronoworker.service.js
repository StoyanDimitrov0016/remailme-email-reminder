import weeklyReminderService from "./weeklyReminder.service.js";
import oneTimeReminderService from "./oneTimeReminder.service.js";
import userService from "./user.service.js";
import sendEmail from "../config/nodemailer.js";
import { getReminderTemplate } from "../utils/getReminderTemplate.js";

class ChronoworkerService {
  constructor({ userService, weeklyService, oneTimeService, sendEmail, getReminderTemplate }) {
    this.userService = userService;
    this.weeklyService = weeklyService;
    this.oneTimeService = oneTimeService;
    this.sendEmail = sendEmail;
    this.getReminderTemplate = getReminderTemplate;
  }

  getFormattedDateAndTime() {
    const now = new Date();
    now.setHours(now.getHours() + 2); // Hardcoding +2 hours for setting Bulgarian time

    const isoDate = now.toISOString(); // "2025-01-10T15:30:00.000Z"
    const date = isoDate.split("T")[0]; // Extracts "2025-01-10"
    const time = isoDate.split("T")[1].slice(0, 5); // Extracts "15:30"

    const day = now.getDay() === 0 ? 7 : now.getDay(); // Adjust Sunday to 7

    return { date, time, day };
  }

  async processReminders() {
    const { date, time, day } = this.getFormattedDateAndTime();

    const [dueWeeklyReminders, dueOneTimeReminders] = await Promise.all([
      this.weeklyService.getDueReminders(day, time),
      this.oneTimeService.getDueReminders(date, time),
    ]);

    const allReminders = [...dueWeeklyReminders, ...dueOneTimeReminders];

    console.log(
      `== [${date} ${time}] ${dueWeeklyReminders.length} weekly and ${dueOneTimeReminders.length} one-time reminders found for processing.`
    );

    const emailPromises = allReminders.map(async (reminder) => {
      try {
        const user = await this.userService.getById(reminder.user_id);
        return sendEmail(
          user.email,
          `ReMailMe ${reminder.subject}`,
          this.getReminderTemplate(reminder.content, user.email)
        );
      } catch (error) {
        console.error(`Failed to send reminder ID ${reminder.id}: ${error.message}`);
      }
    });

    await Promise.all(emailPromises);
  }
}

const chronoworkerService = Object.freeze(
  new ChronoworkerService({
    userService,
    weeklyService: weeklyReminderService,
    oneTimeService: oneTimeReminderService,
    sendEmail,
    getReminderTemplate,
  })
);
export default chronoworkerService;

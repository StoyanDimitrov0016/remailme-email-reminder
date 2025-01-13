import db from "../config/database.js";
import ReminderRepository from "./base/Reminder.repository.js";

class WeeklyReminderRepository extends ReminderRepository {
  constructor(database, table) {
    super(database, table);
  }

  async createOne(userId, { subject, remind_day, remind_time, content }) {
    const sql = `INSERT INTO ${this.table} (user_id, subject, remind_day, remind_time, content) VALUES (?, ?, ?, ?, ?)`;
    return await this.runStatement(sql, [userId, subject, remind_day, remind_time, content]);
  }

  async updateById(reminderId, { subject, remind_day, remind_time, content }) {
    const existingReminder = await this.getById(reminderId);
    if (!existingReminder) {
      throw new Error(`Weekly reminder with ID ${reminderId} not found.`);
    }

    const updateData = {
      subject: subject ?? existingReminder.subject,
      remind_day: remind_day ?? existingReminder.remind_day,
      remind_time: remind_time ?? existingReminder.remind_time,
      content: content ?? existingReminder.content,
    };

    const sql = `UPDATE ${this.table} SET subject = ?, remind_day = ?, remind_time = ?, content = ? WHERE id = ?`;
    const values = [
      updateData.subject,
      updateData.remind_day,
      updateData.remind_time,
      updateData.content,
      reminderId,
    ];

    return await this.runStatement(sql, values);
  }

  async getDueReminders(currentDay, currentTime) {
    const sql = `SELECT * FROM ${this.table} WHERE remind_day = ? AND remind_time = ?`;
    return await this.getAllRows(sql, [currentDay, currentTime]);
  }
}

const weeklyReminderRepository = Object.freeze(
  new WeeklyReminderRepository(db, "weekly_reminders")
);
export default weeklyReminderRepository;

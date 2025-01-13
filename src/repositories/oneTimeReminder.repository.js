import db from "../config/database.js";
import ReminderRepository from "./base/Reminder.repository.js";

class OneTimeReminderRepository extends ReminderRepository {
  constructor(database, table) {
    super(database, table);
  }

  async createOne(userId, { subject, remind_date, remind_time, content }) {
    const sql = `INSERT INTO ${this.table} (user_id, subject, remind_date, remind_time, content) VALUES (?, ?, ?, ?, ?)`;
    return await this.runStatement(sql, [userId, subject, remind_date, remind_time, content]);
  }

  async updateById(reminderId, { subject, remind_date, remind_time, content }) {
    const existingReminder = await this.getById(reminderId);
    if (!existingReminder) {
      throw new Error(`One Time reminder with ID ${reminderId} not found.`);
    }

    const updateData = {
      subject: subject ?? existingReminder.subject,
      remind_date: remind_date ?? existingReminder.remind_date,
      remind_time: remind_time ?? existingReminder.remind_time,
      content: content ?? existingReminder.content,
    };

    const sql = `UPDATE ${this.table} SET subject = ?, remind_date = ?, remind_time = ?, content = ? WHERE id = ?`;
    const values = [
      updateData.subject,
      updateData.remind_date,
      updateData.remind_time,
      updateData.content,
      reminderId,
    ];

    return await this.runStatement(sql, values);
  }

  async getDueReminders(currentDate, currentTime) {
    const sql = `
      SELECT * FROM ${this.table} WHERE remind_date = ? AND remind_time = ?
    `;

    return await this.getAllRows(sql, [currentDate, currentTime]);
  }
}

const oneTimeReminderRepository = Object.freeze(
  new OneTimeReminderRepository(db, "one_time_reminders")
);
export default oneTimeReminderRepository;

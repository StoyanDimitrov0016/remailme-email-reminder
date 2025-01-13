import BaseRepository from "./base/Base.repository.js";
import db from "../config/database.js";

class UserRepository extends BaseRepository {
  constructor(database, table) {
    super(database);
    this.table = table;
  }

  async getById(userId) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    return await this.getOneRow(sql, [userId]);
  }

  async getByEmail(email) {
    const sql = `SELECT * FROM ${this.table} WHERE email = ?`;
    return await this.getOneRow(sql, [email]);
  }

  async createOne(email, weeklyReminderLimit = 1, oneTimeReminderLimit = 5) {
    const sql = `INSERT INTO ${this.table} (email, max_weekly_reminders, max_one_time_reminders) VALUES (?, ?, ?)`;
    return await this.runStatement(sql, [email, weeklyReminderLimit, oneTimeReminderLimit]);
  }

  async updateById(userId, weeklyReminderLimit, oneTimeReminderLimit) {
    const existingUser = await this.getById(userId);

    if (!existingUser) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const updateData = {
      max_weekly_reminders: weeklyReminderLimit ?? existingUser.max_weekly_reminders,
      max_one_time_reminders: oneTimeReminderLimit ?? existingUser.max_one_time_reminders,
    };

    const sql = `UPDATE ${this.table} SET max_weekly_reminders = ?, max_one_time_reminders = ? WHERE id = ?`;
    return await this.runStatement(sql, [
      updateData.max_weekly_reminders,
      updateData.max_one_time_reminders,
      userId,
    ]);
  }

  async removeById(userId) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return await this.runStatement(sql, [userId]);
  }
}

const userRepository = Object.freeze(new UserRepository(db, "users"));
export default userRepository;

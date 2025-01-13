import BaseRepository from "./Base.repository.js";

class ReminderRepository extends BaseRepository {
  constructor(database, table) {
    super(database);
    this.table = table;
  }

  async getById(reminderId) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    return await this.getOneRow(sql, [reminderId]);
  }

  async getAllByUserId(userId) {
    const sql = `SELECT * FROM ${this.table} WHERE user_id = ?`;
    return await this.getAllRows(sql, [userId]);
  }

  async getCount(userId) {
    const sql = `SELECT COUNT(*) AS count FROM ${this.table} WHERE user_id = ?`;
    const result = await this.getOneRow(sql, [userId]);
    return result.count;
  }

  async removeById(reminderId) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return await this.runStatement(sql, [reminderId]);
  }

  async removeAllByUserId(userId) {
    const sql = `DELETE FROM ${this.table} WHERE user_id = ?`;
    return await this.runStatement(sql, [userId]);
  }
}

export default ReminderRepository;

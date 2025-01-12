import BaseRepository from "./Base.repository.js";

class ReminderRepository extends BaseRepository {
  constructor(database, table) {
    super(database, table);
  }

  async getAllByUserId(userId) {
    const sql = `SELECT * FROM ${this.table} WHERE user_id = ?`;
    return await this.getAllRows(sql, [userId]);
  }

  async getCountByUserId(userId) {
    const sql = `SELECT COUNT(*) AS count FROM ${this.table} WHERE user_id = ?`;
    const result = await this.getOneRow(sql, [userId]);
    return result.count;
  }

  async removeAllByUserId(userId) {
    const sql = `DELETE FROM ${this.table} WHERE user_id = ?`;
    return await this.runStatement(sql, [userId]);
  }

  async markAsProcessedById(reminderId) {
    const sql = `UPDATE ${this.table} SET is_processed = ? WHERE id = ?`;
    return await this.runStatement(sql, [true, reminderId]);
  }

  async markAsUnprocessedById(reminderId) {
    const sql = `UPDATE ${this.table} SET is_processed = ? WHERE id = ?`;
    return await this.runStatement(sql, [false, reminderId]);
  }
}

export default ReminderRepository;

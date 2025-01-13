import BaseRepository from "./base/Base.repository.js";
import db from "../config/database.js";

class AccessCodeRepository extends BaseRepository {
  constructor(database, table) {
    super(database);
    this.table = table;
  }

  async getById(accessCodeId) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    return await this.getOneRow(sql, [accessCodeId]);
  }

  async getByUserId(userId) {
    const sql = `SELECT * FROM ${this.table} WHERE user_id = ?`;
    return await this.getOneRow(sql, [userId]);
  }

  async createOne(userId, code, expiresAt) {
    const sql = `INSERT INTO ${this.table} (user_id, code, expires_at) VALUES (?, ?, ?)`;
    return await this.runStatement(sql, [userId, code, expiresAt]);
  }

  async removeAllByUserId(userId) {
    const sql = `DELETE FROM ${this.table} WHERE user_id = ?`;
    return await this.runStatement(sql, [userId]);
  }

  async removeAllExpiredFromDb() {
    const sql = `DELETE FROM ${this.table} WHERE expires_at < ?`;
    const now = new Date().toISOString();
    return await this.runStatement(sql, [now]);
  }
}

const accessCodeRepository = Object.freeze(new AccessCodeRepository(db, "access_codes"));
export default accessCodeRepository;

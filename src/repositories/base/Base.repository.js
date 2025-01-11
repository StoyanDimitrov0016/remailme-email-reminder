import DatabaseRepository from "./Database.repository.js";

class BaseRepository extends DatabaseRepository {
  constructor(database, table) {
    super(database);
    this.table = table;
  }

  async getById(rowId) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    return await this.getOneRow(sql, [rowId]);
  }

  async removeById(rowId) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`;
    return await this.runStatement(sql, [rowId]);
  }
}

export default BaseRepository;

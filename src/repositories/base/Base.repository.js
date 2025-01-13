class BaseRepository {
  constructor(database) {
    this.database = database;
  }

  async getOneRow(sql, parameters = []) {
    return new Promise((resolve, reject) => {
      this.database.get(sql, parameters, (error, row) => {
        if (error) return reject(new Error(`Failed to fetch one row: ${error.message}`));
        resolve(row);
      });
    });
  }

  async getAllRows(sql, parameters = []) {
    return new Promise((resolve, reject) => {
      this.database.all(sql, parameters, (error, rows) => {
        if (error) return reject(new Error(`Failed to fetch all rows: ${error.message}`));
        resolve(rows);
      });
    });
  }

  async runStatement(sql, parameters = []) {
    return new Promise((resolve, reject) => {
      this.database.run(sql, parameters, function (error) {
        if (error) return reject(new Error(`Failed to execute statement: ${error.message}`));
        resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }
}

export default BaseRepository;

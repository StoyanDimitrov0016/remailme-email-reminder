import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const sqlite = sqlite3.verbose();
const databasePath = path.resolve("app.db");

const db = new sqlite.Database(databasePath, (error) => {
  if (error) {
    console.error("Failed to connect to SQLite database:", error.message);
  }
  console.log(`Connected to SQLite database at ${databasePath}`);
});

export const initializeDatabase = () => {
  const schemaPath = path.resolve("src", "config", "schema.sql");

  if (!fs.existsSync(schemaPath)) {
    console.error(`Schema file not found at ${schemaPath}`);
    return;
  }

  const schema = fs.readFileSync(schemaPath, "utf-8");

  db.serialize(() => {
    db.exec(schema, (error) => {
      if (error) {
        console.error("Failed to initialize database schema:", error.message);
      }
      console.log("Database schema initialized successfully.");
    });
  });
};

export default db;

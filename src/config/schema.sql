-- TABLES:
-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  max_weekly_reminders INTEGER DEFAULT 1 CHECK(max_weekly_reminders >= 1), -- Default limit for weekly reminders
  max_one_time_reminders INTEGER DEFAULT 5 CHECK(max_one_time_reminders >= 1), -- Default limit for one-time reminders
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Access Codes Table
CREATE TABLE IF NOT EXISTS access_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  code TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Weekly Reminders Table
CREATE TABLE IF NOT EXISTS weekly_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  subject TEXT NOT NULL, -- Email subject
  remind_day INTEGER CHECK(remind_day BETWEEN 1 AND 7) NOT NULL, -- Day in 1=Monday and 7=Sunday format
  remind_time TIME NOT NULL, -- Time in HH:MM format
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, remind_day, remind_time)
);

-- One-Time Reminders Table
CREATE TABLE IF NOT EXISTS one_time_reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  subject TEXT NOT NULL, -- Email subject
  remind_date DATE NOT NULL, -- Date in YYYY-MM-DD format
  remind_time TIME NOT NULL, -- Time in HH:MM format
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, remind_date, remind_time)
);


-- INDICES FOR PERFORMANCE:
-- Access Codes Table
CREATE INDEX idx_access_codes_user_id ON access_codes(user_id);

-- Weekly Reminders Table
CREATE INDEX idx_weekly_reminders_user_id ON weekly_reminders(user_id);
CREATE INDEX idx_weekly_reminders_remind_day ON weekly_reminders(remind_day);

-- One-Time Reminders Table
CREATE INDEX idx_one_time_reminders_user_id ON one_time_reminders(user_id);
CREATE INDEX idx_one_time_reminders_remind_date ON one_time_reminders(remind_date);
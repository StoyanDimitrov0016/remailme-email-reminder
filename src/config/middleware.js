import express from "express";
import "dotenv/config.js";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
import path from "path";

const SQLiteSessionStore = SQLiteStore(session);

const sessionOptions = {
  store: new SQLiteSessionStore({
    db: "sessions.sqlite",
    dir: "./",
    table: "sessions",
  }),
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

const setupMiddleware = (app) => {
  app.use(express.static("public"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session(sessionOptions));
};

export default setupMiddleware;

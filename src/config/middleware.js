import "dotenv/config.js";
import express from "express";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
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

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const setupMiddleware = (app) => {
  app.use(express.static(path.resolve("public")));

  app.use(helmet());
  app.use(rateLimit(rateLimitOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session(sessionOptions));
};

export default setupMiddleware;

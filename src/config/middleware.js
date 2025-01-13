import express from "express";
import "dotenv/config.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import SQLiteStore from "connect-sqlite3";
import path from "path";

const SQLiteSessionStore = SQLiteStore(session);

const sessionOptions = {
  store: new SQLiteSessionStore({
    db: "sessions.sqlite", // Separate file for session storage
    dir: "./", // Directory of app.db (root of the project)
    table: "sessions", // Table for session storage
  }),
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  unset: "destroy",
};

const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

const setupMiddleware = (app) => {
  app.use(express.static(path.resolve("public")));

  app.use(rateLimit(rateLimitOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session(sessionOptions));
};

export default setupMiddleware;

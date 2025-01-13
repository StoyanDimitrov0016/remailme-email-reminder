import express from "express";
import "dotenv/config.js";

import setupHandlebars from "./src/config/handlebars.js";
import setupMiddleware from "./src/config/middleware.js";

import { router as authRouter } from "./src/routes/auth.routes.js";
import { router as reminderRouter } from "./src/routes/reminder.routes.js";
import { initializeDatabase } from "./src/config/database.js";
import startChronoworkers from "./src/config/chronowork.js";

const port = process.env.PORT || 3000;
const app = express();

setupHandlebars(app);
setupMiddleware(app);

initializeDatabase();
startChronoworkers();

app.use("/", authRouter);
app.use("/reminders", reminderRouter);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

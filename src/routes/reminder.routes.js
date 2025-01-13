import { Router } from "express";
import {
  handleCreateReminder,
  handleDeleteReminder,
  handleUpdateReminder,
  showCatalog,
  showCreateReminderForm,
  showUpdateReminderPage,
} from "../controllers/reminder.controller.js";
import { requireSession } from "../middleware/requireSession.js";

const router = Router();

router.use(requireSession);

router.get("/", showCatalog);

router.get("/new", showCreateReminderForm);
router.post("/", handleCreateReminder);

router.get("/:reminderId/update", showUpdateReminderPage);
router.post("/:reminderId/update", handleUpdateReminder);

router.post("/:reminderId/delete", handleDeleteReminder);

export { router };

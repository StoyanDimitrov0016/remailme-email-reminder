import { Router } from "express";
import {
  showHome,
  handleLogout,
  sendAuthCode,
  verifyAuthCode,
} from "../controllers/auth.controller.js";

import { requireGuest } from "../middleware/requireGuest.js";
import { requireSession } from "../middleware/requireSession.js";

const router = Router();

router.get("/", requireGuest, showHome);
router.post("/auth/send-code", requireGuest, sendAuthCode);
router.post("/auth/verify-code", requireGuest, verifyAuthCode);
router.get("/auth/logout", requireSession, handleLogout);

export { router };

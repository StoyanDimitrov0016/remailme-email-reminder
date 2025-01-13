import accessCodeService from "../services/accessCode.service.js";
import userService from "../services/user.service.js";
import sendEmail from "../config/nodemailer.js";
import { getAccessCodeTemplate } from "../utils/getAccessCodeTemplate.js";

export const showHome = (req, res) => {
  try {
    const { email, sent, error } = req.query;

    res.render("pages/home", {
      email: email || "",
      codeHasBeenSent: !!sent,
      errorMessage: error,
      formAction: sent ? "/auth/verify-code" : "/auth/send-code",
    });
  } catch (error) {
    console.error("Error in showHome:", error.message);
    res.status(500).send("Failed to load the home page.");
  }
};

export const sendAuthCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email is required.");
    }

    let user = await userService.getByEmail(email);
    if (!user) {
      user = await userService.createOne(email);
    }

    const { code, expiresAt } = await accessCodeService.createOne(user.id);
    const expirationMinutes = Math.round((new Date(expiresAt) - new Date()) / (60 * 1000));

    const content = getAccessCodeTemplate(code, expirationMinutes, email);

    await sendEmail(email, "ReMailMe access code sent", content);
    console.log("Access code sent to ", email);
    return res.redirect(`/?email=${encodeURIComponent(email)}&sent=true`);
  } catch (error) {
    console.error("Error sending authentication code:", error.message);
    res.status(500).send("Failed to send authentication code.");
  }
};

export const verifyAuthCode = async (req, res) => {
  const { email, code: requestCode } = req.body;

  if (!email || !requestCode) {
    return res.status(400).send("Email and code are required.");
  }

  try {
    const user = await userService.getByEmail(email);
    if (!user) {
      return res.redirect("/");
    }

    const codeRow = await accessCodeService.getByUserId(user.id);
    await accessCodeService.removeAllByUserId(user.id);

    if (!codeRow || requestCode.trim() !== codeRow.code) {
      return res.redirect("/?error=invalid_code");
    }

    const sessionUser = { id: user.id, email: user.email };
    req.session.user = sessionUser;

    return res.redirect("/reminders");
  } catch (error) {
    console.error("Error verifying authentication code:", error.message);
    res.status(500).send("Authentication failed.");
  }
};

export const handleLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error logging out:", error.message);
      return res.status(500).send("Failed to log out.");
    }

    res.redirect("/");
  });
};

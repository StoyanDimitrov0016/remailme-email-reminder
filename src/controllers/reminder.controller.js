import weeklyReminderService from "../services/weeklyReminder.service.js";
import oneTimeReminderService from "../services/oneTimeReminder.service.js";
import userService from "../services/user.service.js";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const parseDay = (row) => {
  row.remind_day = daysOfWeek[row.remind_day - 1];
  return row;
};

export const showCatalog = async (req, res) => {
  try {
    const { id: userId, email } = req.session.user;

    const weeklyReminders = await weeklyReminderService.getAllByUserId(userId);
    const oneTimeReminders = await oneTimeReminderService.getAllByUserId(userId);

    return res.render("pages/catalog", {
      email,
      weeklyReminders: weeklyReminders.map(parseDay),
      oneTimeReminders,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Error in show catalog controller function: ", error);
    return res.redirect("/");
  }
};

export const showCreateReminderForm = async (req, res) => {
  try {
    const { email } = req.session.user;
    res.render("pages/create-reminder", { isAuthenticated: !!email, isCreateReminderPage: true });
  } catch (error) {
    console.error("Error in showCreateReminderForm:", error);
    return res.redirect("/");
  }
};

export const handleCreateReminder = async (req, res) => {
  const { id: userId } = req.session.user;
  const { frequency, subject, content, time, date, weekday } = req.body;

  if (frequency !== "one-time" && frequency !== "weekly") {
    throw new Error("Invalid frequency.");
  }

  const user = await userService.getById(userId);
  if (!user) {
    throw new Error("User not found to create the reminder.");
  }

  try {
    if (frequency === "one-time") {
      await oneTimeReminderService.createOne(userId, { subject, date, time, content });
    }

    if (frequency === "weekly") {
      await weeklyReminderService.createOne(userId, { subject, weekday, time, content });
    }

    res.redirect("/reminders");
  } catch (err) {
    console.error("Error creating reminder:", err.message);
    res.redirect("/reminders");
  }
};

export const showUpdateReminderPage = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { id: userId } = req.session.user;
    const { type } = req.query;

    const isWeekly = type === "weekly";

    const [user, reminder] = await Promise.all([
      userService.getById(userId),
      isWeekly
        ? weeklyReminderService.getById(reminderId)
        : oneTimeReminderService.getById(reminderId),
    ]);

    if (!user) throw new Error("User not found");
    if (!reminder) throw new Error("Reminder not found");

    res.render("pages/update-reminder", {
      reminder,
      isWeekly,
      isOneTime: !isWeekly,
      type,
      isAuthenticated: !!userId,
    });
  } catch (error) {
    console.error("Error handling update reminder:", error.message);
    res.redirect("/reminders");
  }
};

export const handleUpdateReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { id: userId } = req.session.user;
    const { type } = req.query;
    const { subject, weekday, date, time, content } = req.body;

    const isWeekly = type === "weekly";

    const [user, reminder] = await Promise.all([
      userService.getById(userId),
      isWeekly
        ? weeklyReminderService.getById(reminderId)
        : oneTimeReminderService.getById(reminderId),
    ]);

    if (!user) throw new Error("User not found");
    if (!reminder) throw new Error("Reminder not found");

    if (isWeekly) {
      await weeklyReminderService.updateById(reminderId, { subject, weekday, time, content });
    } else {
      await oneTimeReminderService.updateById(reminderId, { subject, date, time, content });
    }

    res.redirect("/reminders");
  } catch (error) {
    res.redirect("/reminders");
  }
};

export const handleDeleteReminder = async (req, res) => {
  try {
    const { reminderId } = req.params;
    const { id: userId } = req.session.user;
    const { type } = req.query;

    const isWeekly = type === "weekly";

    const [user, reminder] = await Promise.all([
      userService.getById(userId),
      isWeekly
        ? weeklyReminderService.getById(reminderId)
        : oneTimeReminderService.getById(reminderId),
    ]);

    if (!user) throw new Error("User not found");
    if (!reminder) throw new Error("Reminder not found");

    const deleteOperation = isWeekly
      ? weeklyReminderService.removeById(reminder.id)
      : oneTimeReminderService.removeById(reminder.id);

    await deleteOperation;

    res.redirect("/reminders");
  } catch (error) {
    res.redirect("/reminders");
  }
};

import weeklyReminderRepository from "../repositories/weeklyReminder.repository.js";
import userService from "./user.service.js";

class WeeklyReminderService {
  constructor(repository, getUserById) {
    this.repository = repository;
    this.getUserById = getUserById;
  }

  async getById(reminderId) {
    return await this.repository.getById(reminderId);
  }

  async getAllByUserId(userId) {
    return await this.repository.getAllByUserId(userId);
  }

  async createOne(userId, { subject, weekday, time, content }) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const weeklyReminderCount = await this.getCount(userId);
    if (user.max_weekly_reminders <= weeklyReminderCount) {
      throw new Error("Weekly reminder limit exceeding.");
    }

    return await this.repository.createOne(userId, {
      subject,
      remind_day: weekday,
      remind_time: time,
      content,
    });
  }

  async getCount(userId) {
    return this.repository.getCount(userId);
  }

  async updateById(reminderId, { subject, weekday, time, content }) {
    return await this.repository.updateById(reminderId, {
      subject,
      remind_day: weekday,
      remind_time: time,
      content,
    });
  }

  async removeById(reminderId) {
    return await this.repository.removeById(reminderId);
  }

  async removeAllByUserId(userId) {
    return await this.repository.removeAllByUserId(userId);
  }

  async getDueReminders(currentDay, currentTime) {
    return await this.repository.getDueReminders(currentDay, currentTime);
  }
}

const weeklyReminderService = Object.freeze(
  new WeeklyReminderService(weeklyReminderRepository, userService.getById)
);
export default weeklyReminderService;

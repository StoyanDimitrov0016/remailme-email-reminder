import oneTimeReminderRepository from "../repositories/oneTimeReminder.repository.js";
import userService from "./user.service.js";

class OneTimeReminderService {
  constructor(repository, getUserById) {
    this.repository = repository;
    this.getUserById = getUserById;
  }

  async getById(reminderId) {
    return oneTimeReminderRepository.getById(reminderId);
  }

  async getAllByUserId(userId) {
    return oneTimeReminderRepository.getAllByUserId(userId);
  }

  async createOne(userId, { subject, date, time, content }) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const oneTimeReminderCount = await this.getCount(userId);
    if (user.max_one_time_reminders <= oneTimeReminderCount) {
      throw new Error("One time reminder limit exceeding.");
    }

    return oneTimeReminderRepository.createOne(userId, {
      subject,
      remind_date: date,
      remind_time: time,
      content,
    });
  }

  async getCount(userId) {
    return this.repository.getCount(userId);
  }

  async updateById(reminderId, { subject, date, time, content }) {
    return await oneTimeReminderRepository.updateById(reminderId, {
      subject,
      remind_date: date,
      remind_time: time,
      content,
    });
  }

  async removeById(reminderId) {
    return await oneTimeReminderRepository.removeById(reminderId);
  }

  async removeAllByUserId(userId) {
    return await oneTimeReminderRepository.removeAllByUserId(userId);
  }

  async getDueReminders(currentDate, currentTime) {
    return await this.repository.getDueReminders(currentDate, currentTime);
  }
}

const oneTimeReminderService = Object.freeze(
  new OneTimeReminderService(oneTimeReminderRepository, userService.getById)
);
export default oneTimeReminderService;

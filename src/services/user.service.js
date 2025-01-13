import userRepository from "../repositories/user.repository.js";

class UserService {
  constructor(repository) {
    this.repository = repository;
    this.defaultMaxWeeklyReminderCount = 1;
    this.defaultMaxOneTimeReminderCount = 4;

    this.getById = this.getById.bind(this);
  }

  async getById(userId) {
    const user = await this.repository.getById(userId);
    return user;
  }

  async getByEmail(email) {
    const user = await this.repository.getByEmail(email);
    return user;
  }

  async createOne(email) {
    const result = await this.repository.createOne(
      email,
      this.defaultMaxWeeklyReminderCount,
      this.defaultMaxOneTimeReminderCount
    );
    return result;
  }

  async updateById(userId, { weeklyReminderLimit, oneTimeReminderLimit }) {
    const result = await this.repository.updateById(
      userId,
      weeklyReminderLimit,
      oneTimeReminderLimit
    );

    return result;
  }

  async removeById(userId) {
    const result = await this.repository.removeById(userId);
    return result;
  }
}

const userService = Object.freeze(new UserService(userRepository));
export default userService;

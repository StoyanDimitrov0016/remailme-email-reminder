import { randomBytes } from "crypto";
import accessCodeRepository from "../repositories/accessCode.repository.js";

class AccessCodeService {
  constructor(repository, bytesLength, expDurationInMins) {
    this.repository = repository;
    this.bytesLength = bytesLength;
    this.expDurationInMins = expDurationInMins;
  }

  async getById(accessCodeId) {
    return await this.repository.getById(accessCodeId);
  }

  async getByUserId(userId) {
    return await this.repository.getByUserId(userId);
  }

  async createOne(userId) {
    const code = randomBytes(this.bytesLength).toString("hex").toUpperCase();
    const expiresAt = new Date(Date.now() + this.expDurationInMins * 1000 * 60).toISOString();

    await this.repository.createOne(userId, code, expiresAt);
    return { userId, code, expiresAt };
  }

  async removeAllByUserId(userId) {
    return await this.repository.removeAllByUserId(userId);
  }

  async removeAllExpiredFromDb() {
    return await this.repository.removeAllExpiredFromDb();
  }
}

const accessCodeService = Object.freeze(new AccessCodeService(accessCodeRepository, 3, 15));
export default accessCodeService;

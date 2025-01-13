import cron from "node-cron";
import chronoworkerService from "../services/chronoworker.service.js";

const startChronoworkers = () => {
  console.log("Starting node-cron.");

  cron.schedule("* * * * *", async () => {
    try {
      console.log("Processing reminders.");
      await chronoworkerService.processReminders();
    } catch (error) {
      console.error("Error in chronoworker:", error);
    }
  });
};

export default startChronoworkers;

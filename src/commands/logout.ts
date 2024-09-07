import fs from "fs";
import path from "path";
import os from "os";
import { LabInsightLogger } from "../lib/classes/logger.class";

const logger = new LabInsightLogger();

export const logout = async () => {
  const cache = fs.existsSync(path.join(os.homedir(), ".labinsight-cache"));

  if (cache) {
    fs.rm(path.join(os.homedir(), ".labinsight-cache"), (err) => {
      if (err) {
        console.error("Error deleting cache: ", err);
        return;
      }
      logger.log("success", "Logged out successfully");
    });
  } else {
    logger.log("warning", "Cache file not found, please login first.");
  }
};

import fs from "fs";
import path from "path";
import { LabInsightConfig } from "../lib/interfaces/config.interface";
import { LabInsightDetector } from "../lib/classes/detector.class";
import { LabInsightLogger } from "../lib/classes/logger.class";
import { confirm } from "@inquirer/prompts";

const detector = new LabInsightDetector();
const logger = new LabInsightLogger();

/**
 * Initialize a new .labinsight file
 */
export const init = async () => {
  console.log("Initializing a new .labinsight file...");

  const rootPath = path.join(process.cwd(), ".labinsight");
  const exists = fs.existsSync(rootPath);

  if (exists) {
    logger.log("warning", "The .labinsight file already exists.");

    const overwrite = await confirm({
      message: "Do you want to overwrite the existing file?",
      default: false,
    });

    if (overwrite) {
      const detectedConfig: LabInsightConfig =
        await detector.detectProjectConfig();

      fs.writeFileSync(
        rootPath,
        JSON.stringify(<LabInsightConfig>detectedConfig, null, 2),
        "utf-8"
      );

      logger.log(
        "success",
        "The .labinsight file has been overwritten successfully."
      );
    } else {
      logger.log("info", "The .labinsight file has not been overwritten.");
    }
  } else {
    const detectedConfig: LabInsightConfig =
      await detector.detectProjectConfig();

    fs.writeFileSync(
      rootPath,
      JSON.stringify(<LabInsightConfig>detectedConfig, null, 2),
      "utf-8"
    );
  }
};

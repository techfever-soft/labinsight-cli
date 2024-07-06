import fs from "fs";
import path from "path";
import { LabInsightConfig } from "../lib/interfaces/config.interface";
import { LabInsightDetector } from "../lib/classes/detector.class";

const detector = new LabInsightDetector();

/**
 * Initialize a new .labinsight file
 */
export const init = async () => {
  console.log("Initializing a new .labinsight file...");

  const rootPath = path.join(process.cwd(), ".labinsight");
  const exists = fs.existsSync(rootPath);

  if (exists) {
    // TODO: Add a prompt to ask if the user wants to overwrite the file
    console.log("A .labinsight file already exists.");
    return;
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

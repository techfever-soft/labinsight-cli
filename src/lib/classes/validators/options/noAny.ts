import { LabInsightLogger } from "../../logger.class";
import chalk from "chalk";

const logger = new LabInsightLogger();

export const checkNoAny = async (filePath: string, fileContent: string) => {
  const detectAny = /any/g;

  if (detectAny.test(fileContent)) {
    logger.log("warning", `File ${filePath} contains any type`);
  }
};

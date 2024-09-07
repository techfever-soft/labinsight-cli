import {
  LabInsightLogCheckPartType,
  LabInsightLogCheckTestType,
  LabInsightLogCheckType,
  LabInsightLogType,
} from "../types/logger.type";

import chalk from "chalk";

export class LabInsightLogger {
  constructor() {}

  public log(type: LabInsightLogType, message: string) {
    const typeColor =
      type === "success"
        ? chalk.green("SUCCESS")
        : type === "info"
        ? chalk.blue("INFO")
        : type === "warning"
        ? chalk.yellow("WARNING")
        : chalk.red("ERROR");

    console.log(
      chalk.grey("[") + typeColor + chalk.grey("]") + " " + chalk.reset(message)
    );
  }

  public spacing(count: number = 1) {
    for (let i = 0; i < count; i++) {
      console.log(" ");
    }
  }

  public logChecking(
    type: LabInsightLogCheckType,
    testType: LabInsightLogCheckTestType,
    partType: LabInsightLogCheckPartType,
    message: string
  ) {
    const typeEmoji = type === "check" ? "✅" : type === "cross" ? "❌" : "⚠️";
    const typeColor = (message: string) =>
      type === "check"
        ? chalk.green(message)
        : type === "cross"
        ? chalk.red(message)
        : chalk.yellow(message);

    console.log(
      typeEmoji +
        " " +
        chalk.grey("[") +
        testType +
        chalk.grey("]") +
        " " +
        chalk.grey("[" + partType + "]") +
        " " +
        typeColor(message)
    );
  }
}

import { spawn } from "child_process";
import path from "path";
import { LabInsightLogger } from "../lib/classes/logger.class";
import { cwd } from "process";

const logger = new LabInsightLogger();

export const lint = () => {
  try {
    const eslintPath = "npx eslint . --format json --output-file reports/eslint-report.json";

    logger.log("info", "Running ESLint...");

    const args: any[] = [];
    // if (options.fix) args.push("--fix");
    // args.push(options.dir || ".");

    const eslintProcess = spawn(eslintPath, args, {
      cwd: cwd(),
      shell: true,
    });

    eslintProcess.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    eslintProcess.stderr.on("data", (data) => {
      process.stderr.write(`Error: ${data}`);
    });

    eslintProcess.on("close", (code) => {
      if (code === 0) {
        logger.log("success", "Linting completed successfully!");
      } else {
        logger.log("error", `Linting failed with exit code ${code}`);
      }
    });
  } catch (error: any) {
    logger.log("error", `Linting failed: ${error.message}`);
    console.error(error);
  }
};

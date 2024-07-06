import {
  checkCamelCaseForFunctions,
  checkCamelCaseForVariables,
} from "./validators/casing/camelCase";

import { LabInsightConfig } from "../interfaces/config.interface";
import chalk from "chalk";
import fs from "fs";
import path from "path";

export class LabInsightAnalyzer {
  public ignoredDirectories = ["node_modules", ".git", "dist"];

  constructor() {}

  /**
   * Performs a basic analysis on the current working directory
   * @returns Promise<void>
   */
  public async basicAnalysis(): Promise<void> {
    console.log("Starting basic analysis...");

    const cwd = process.cwd();
    await this.analyzeDirectory(cwd);
  }

  /**
   * Analyze the directory and his childrens
   * @param directoryPath string
   * @returns Promise<void>
   */
  private async analyzeDirectory(directoryPath: string): Promise<void> {
    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        if (this.ignoredDirectories.includes(file)) {
          continue;
        } else {
          const filePath = path.join(directoryPath, file);
          const stats = fs.statSync(filePath);

          if (stats.isDirectory()) {
            // Recursive call if it's a directory
            await this.analyzeDirectory(filePath);
          } else if (stats.isFile()) {
            // Analyze file if it's a regular file
            await this.analyzeFile(filePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}: ${error}`);
    }
  }

  /**
   * Analyzes a file with the given path
   * @param filePath string
   * @returns Promise<void>
   */
  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const labInsightConfig: LabInsightConfig = JSON.parse(
        fs.readFileSync(path.join(".labinsight"), "utf-8")
      );

      // Perform various analyses
      const { fileType, isSourceCode } = await this.detectFileType(
        filePath,
        fileContent
      );

      console.log(
        chalk.grey(`Analyzing file : ${chalk.italic(filePath)} [${fileType}]`)
      );

      if (isSourceCode) {
        if (labInsightConfig.rules.variableCasing === "camelCase") {
          /**
           * SECTION: Casing analysis
           */
          await checkCamelCaseForVariables(filePath, fileContent);
          // await checkCamelCaseForFunctions(filePath, fileContent);
          // TODO: Implement the rest of the casing checks

          /**
           * SECTION: Rules analysis
           */
          // TODO: Implement the rules analysis
        }
      }

      console.log(" ");
    } catch (error) {
      console.error(`Error analyzing file ${filePath}: ${error}`);
    }
  }

  /**
   * Detects the file extension
   * @param filePath string
   * @param fileContent string
   * @returns { fileType: string, isSourceCode: boolean }
   */
  private async detectFileType(
    filePath: string,
    fileContent: string
  ): Promise<{ fileType: string; isSourceCode: boolean }> {
    let fileType = "unknown";
    let isSourceCode = false;

    if (filePath.endsWith(".ts")) {
      fileType = "typescript";
      isSourceCode = true;
    }
    if (filePath.endsWith(".js")) {
      fileType = "javascript";
      isSourceCode = true;
    }
    if (filePath.endsWith(".html")) {
      fileType = "html";
      isSourceCode = true;
    }
    if (filePath.endsWith(".css")) {
      fileType = "css";
      isSourceCode = true;
    }
    if (filePath.endsWith(".md")) {
      fileType = "markdown";
      isSourceCode = false;
    }
    if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
      fileType = "yaml";
      isSourceCode = false;
    }
    if (filePath.endsWith(".json")) {
      fileType = "json";
      isSourceCode = false;
    }

    if (fileType === "unknown") {
      const fileContentLength = fileContent.length;
      // TODO: Detect the file type with the a random slice of content
    }

    return { fileType, isSourceCode };
  }
}

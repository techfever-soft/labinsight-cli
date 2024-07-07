import {
  checkCamelCaseForClasses,
  checkCamelCaseForEnums,
  checkCamelCaseForFunctions,
  checkCamelCaseForInterfaces,
  checkCamelCaseForParameters,
  checkCamelCaseForProperties,
  checkCamelCaseForTypes,
  checkCamelCaseForVariables,
} from "./validators/casing/camelCase";
import {
  checkPascalCaseForClasses,
  checkPascalCaseForEnums,
  checkPascalCaseForFunctions,
  checkPascalCaseForInterfaces,
  checkPascalCaseForParameters,
  checkPascalCaseForProperties,
  checkPascalCaseForTypes,
  checkPascalCaseForVariables,
} from "./validators/casing/pascalCase";

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

  private async removeCommentsAndStrings(fileContent: string) {
    const commentPattern = /\/\/.*|\/\*[^]*?\*\//g;
    const stringPattern = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
    return fileContent.replace(commentPattern, "").replace(stringPattern, "");
  }

  /**
   * Analyzes a file with the given path
   * @param filePath string
   * @returns Promise<void>
   */
  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const rawfileContent = fs.readFileSync(filePath, "utf-8");
      const labInsightConfig: LabInsightConfig = JSON.parse(
        fs.readFileSync(path.join(".labinsight"), "utf-8")
      );

      const fileContent = await this.removeCommentsAndStrings(rawfileContent);

      // Perform various analyses
      const { fileType, isSourceCode } = await this.detectFileType(
        filePath,
        fileContent
      );

      console.log(
        chalk.grey(`Analyzing file : ${chalk.italic(filePath)} [${fileType}]`)
      );

      if (isSourceCode) {
        /**
         * SECTION: Casing analysis
         */

        //
        // camelCase
        //
        if (labInsightConfig.casing.variableCasing === "camelCase") {
          await checkCamelCaseForVariables(filePath, fileContent);
        }
        if (labInsightConfig.casing.methodCasing === "camelCase") {
          await checkCamelCaseForFunctions(filePath, fileContent);
        }
        if (labInsightConfig.casing.classCasing === "camelCase") {
          await checkCamelCaseForClasses(filePath, fileContent);
        }
        if (labInsightConfig.casing.propertyCasing === "camelCase") {
          await checkCamelCaseForProperties(filePath, fileContent);
        }
        if (labInsightConfig.casing.parameterCasing === "camelCase") {
          await checkCamelCaseForParameters(filePath, fileContent);
        }
        if (labInsightConfig.casing.typeCasing === "camelCase") {
          await checkCamelCaseForTypes(filePath, fileContent);
        }
        if (labInsightConfig.casing.interfaceCasing === "camelCase") {
          await checkCamelCaseForInterfaces(filePath, fileContent);
        }
        if (labInsightConfig.casing.enumCasing === "camelCase") {
          await checkCamelCaseForEnums(filePath, fileContent);
        }

        //
        // PascalCase
        //
        if (labInsightConfig.casing.variableCasing === "pascalCase") {
          await checkPascalCaseForVariables(filePath, fileContent);
        }
        if (labInsightConfig.casing.methodCasing === "pascalCase") {
          await checkPascalCaseForFunctions(filePath, fileContent);
        }
        if (labInsightConfig.casing.classCasing === "pascalCase") {
          await checkPascalCaseForClasses(filePath, fileContent);
        }
        if (labInsightConfig.casing.propertyCasing === "pascalCase") {
          await checkPascalCaseForProperties(filePath, fileContent);
        }
        if (labInsightConfig.casing.parameterCasing === "pascalCase") {
          await checkPascalCaseForParameters(filePath, fileContent);
        }
        if (labInsightConfig.casing.typeCasing === "pascalCase") {
          await checkPascalCaseForTypes(filePath, fileContent);
        }
        if (labInsightConfig.casing.interfaceCasing === "pascalCase") {
          await checkPascalCaseForInterfaces(filePath, fileContent);
        }
        if (labInsightConfig.casing.enumCasing === "pascalCase") {
          await checkPascalCaseForEnums(filePath, fileContent);
        }

        //
        // snake_case
        // TODO: Implement the snake_case validation
        //
        if (labInsightConfig.casing.variableCasing === "snake_case") {
          // await checkSnakeCaseForVariables(filePath, fileContent);
        }
        if (labInsightConfig.casing.methodCasing === "snake_case") {
          // await checkSnakeCaseForFunctions(filePath, fileContent);
        }
        if (labInsightConfig.casing.classCasing === "snake_case") {
          // await checkSnakeCaseForClasses(filePath, fileContent);
        }
        if (labInsightConfig.casing.propertyCasing === "snake_case") {
          // await checkSnakeCaseForProperties(filePath, fileContent);
        }
        if (labInsightConfig.casing.typeCasing === "snake_case") {
          // await checkSnakeCaseForTypes(filePath, fileContent);
        }
        if (labInsightConfig.casing.parameterCasing === "snake_case") {
          // await checkSnakeCaseForParameters(filePath, fileContent);
        }
        if (labInsightConfig.casing.interfaceCasing === "snake_case") {
          // await checkSnakeCaseForInterfaces(filePath, fileContent);
        }
        if (labInsightConfig.casing.enumCasing === "snake_case") {
          // await checkSnakeCaseForEnums(filePath, fileContent);
        }

        /**
         * SECTION: Rules analysis
         */
        // await checkMaxLineLength(filePath, fileContent, labInsightConfig.rules.maxLineLength);
        // await checkIndentStyle(filePath, fileContent, labInsightConfig.rules.indentStyle);
        // await checkIndentSize(filePath, fileContent, labInsightConfig.rules.indentSize);
        // await checkTrailingSpaces(filePath, fileContent, labInsightConfig.rules.allowTrailingSpaces);
        // await checkSemicolons(filePath, fileContent, labInsightConfig.rules.enforceSemicolons);

        /**
         * SECTION: Options analysis
         */
        // await checkJsDoc(filePath, fileContent, labInsightConfig.options.jsDoc);
        // await checkStrictMode(filePath, fileContent, labInsightConfig.options.strictMode);
        // await checkNoImplicitAny(filePath, fileContent, labInsightConfig.options.noImplicitAny);
        // await checkNoConsoleLog(filePath, fileContent, labInsightConfig.options.noConsoleLog);
        // await checkNoDebugger(filePath, fileContent, labInsightConfig.options.noDebugger);
        // await checkNoUnusedVariables(filePath, fileContent, labInsightConfig.options.noUnusedVariables);
        // await checkNoUnusedImports(filePath, fileContent, labInsightConfig.options.noUnusedImports);
        // await checkNoVar(filePath, fileContent, labInsightConfig.options.noVar);

        /**
         * SECTION: Decorators analysis
         */
        // await checkClassDecorators(filePath, fileContent);
        // await checkMethodDecorators(filePath, fileContent);
        // await checkPropertyDecorators(filePath, fileContent);
        // await checkParameterDecorators(filePath, fileContent);
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

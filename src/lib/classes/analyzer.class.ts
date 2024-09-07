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
import { doFileContainsIgnoreCasingDecorator } from "../decorators/ignore.decorator";

import { LabInsightConfig } from "../interfaces/config.interface";
import { LabInsightLogger } from "./logger.class";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { ESLint } from "eslint";
import { LabInsightDetector } from "./detector.class";
import { LabInsightReporter } from "./reporter.class";

const logger = new LabInsightLogger();
const detector = new LabInsightDetector();
const reporter = new LabInsightReporter();

export class LabInsightAnalyzer {
  public ignoredDirectories = [
    "node_modules",
    ".git",
    "dist",
    "build",
    "out",
    "temp",
    "tmp",
    "reports",
    "logs",
  ];
  public ignoredFiles = [
    ".DS_Store",
    ".gitignore",
    ".npmignore",
    "package.json",
    "package-lock.json",
    "yarn.lock",
    "tsconfig.json",
  ];

  private eslintResults: any[] = [];
  private casingResults: any[] = [];

  constructor() {}

  public async basicAnalysis(): Promise<void> {
    logger.log("info", "Starting basic analysis...");

    const cwd = process.cwd();
    const results = await this.analyzeDirectory(cwd);

    logger.spacing();
    logger.log("success", "Basic analysis completed!");

    logger.log("info", `Validated variables: ${results.validatedVariables}`);
    logger.log("info", `Invalid variables: ${results.invalidVariables}`);

    logger.log("info", `Validated functions: ${results.validatedFunctions}`);
    logger.log("info", `Invalid functions: ${results.invalidFunctions}`);

    logger.log("info", `Validated classes: ${results.validatedClasses}`);
    logger.log("info", `Invalid classes: ${results.invalidClasses}`);

    logger.log("info", `Validated properties: ${results.validatedProperties}`);
    logger.log("info", `Invalid properties: ${results.invalidProperties}`);

    logger.log("info", `Validated parameters: ${results.validatedParameters}`);
    logger.log("info", `Invalid parameters: ${results.invalidParameters}`);

    logger.log("info", `Validated types: ${results.validatedTypes}`);
    logger.log("info", `Invalid types: ${results.invalidTypes}`);

    logger.log("info", `Validated interfaces: ${results.validatedInterfaces}`);
    logger.log("info", `Invalid interfaces: ${results.invalidInterfaces}`);

    logger.log("info", `Validated enums: ${results.validatedEnums}`);
    logger.log("info", `Invalid enums: ${results.invalidEnums}`);

    logger.spacing();
  }

  private async analyzeDirectory(directoryPath: string): Promise<{
    validatedVariables: number;
    invalidVariables: number;
    validatedFunctions: number;
    invalidFunctions: number;
    validatedClasses: number;
    invalidClasses: number;
    validatedProperties: number;
    invalidProperties: number;
    validatedParameters: number;
    invalidParameters: number;
    validatedTypes: number;
    invalidTypes: number;
    validatedInterfaces: number;
    invalidInterfaces: number;
    validatedEnums: number;
    invalidEnums: number;
  }> {
    let results = {
      validatedVariables: 0,
      invalidVariables: 0,
      validatedFunctions: 0,
      invalidFunctions: 0,
      validatedClasses: 0,
      invalidClasses: 0,
      validatedProperties: 0,
      invalidProperties: 0,
      validatedParameters: 0,
      invalidParameters: 0,
      validatedTypes: 0,
      invalidTypes: 0,
      validatedInterfaces: 0,
      invalidInterfaces: 0,
      validatedEnums: 0,
      invalidEnums: 0,
    };

    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        if (this.ignoredDirectories.includes(file)) {
          continue;
        } else {
          const filePath = path.join(directoryPath, file);
          const stats = fs.statSync(filePath);

          if (stats.isDirectory()) {
            const subdirResults = await this.analyzeDirectory(filePath);
            results = this.aggregateResults(results, subdirResults);
          } else if (stats.isFile()) {
            const fileResults = await this.analyzeFile(filePath);
            results = this.aggregateResults(results, fileResults);
          }
        }
      }
    } catch (error) {
      logger.log(
        "error",
        `Error analyzing directory ${directoryPath}: ${error}`
      );
    }

    return results;
  }

  private async analyzeFile(filePath: string): Promise<{
    validatedVariables: number;
    invalidVariables: number;
    validatedFunctions: number;
    invalidFunctions: number;
    validatedClasses: number;
    invalidClasses: number;
    validatedProperties: number;
    invalidProperties: number;
    validatedParameters: number;
    invalidParameters: number;
    validatedTypes: number;
    invalidTypes: number;
    validatedInterfaces: number;
    invalidInterfaces: number;
    validatedEnums: number;
    invalidEnums: number;
  }> {
    if (this.ignoredFiles.includes(path.basename(filePath))) {
      return {
        validatedVariables: 0,
        invalidVariables: 0,
        validatedFunctions: 0,
        invalidFunctions: 0,
        validatedClasses: 0,
        invalidClasses: 0,
        validatedProperties: 0,
        invalidProperties: 0,
        validatedParameters: 0,
        invalidParameters: 0,
        validatedTypes: 0,
        invalidTypes: 0,
        validatedInterfaces: 0,
        invalidInterfaces: 0,
        validatedEnums: 0,
        invalidEnums: 0,
      };
    }

    try {
      const eslint = new ESLint({
        baseConfig: {
          rules: {
            "no-unused-vars": "error",
            "no-console": "error",
            "no-debugger": "error",
          },
        },
      });
      const results = await eslint.lintFiles(filePath);

      results.forEach((result) => {
        logger.log(
          "info",
          `File: ${chalk.bold(result.filePath)} - Errors: ${
            result.errorCount
          }, Warnings: ${result.warningCount}`
        );
        result.messages.forEach((msg) => {
          logger.log(
            "info",
            `  ${msg.message} (line ${msg.line}, column ${msg.column})`
          );
        });

        this.eslintResults.push({
          filePath: result.filePath,
          errorCount: result.errorCount,
          warningCount: result.warningCount,
          messages: result.messages,
        });
      });

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const hasIgnoreCasingDecorator =
        doFileContainsIgnoreCasingDecorator(fileContent);

      const labInsightConfig: LabInsightConfig = JSON.parse(
        fs.readFileSync(path.join(".labinsight"), "utf-8")
      );

      if (!hasIgnoreCasingDecorator) {
        const casingResults = await this.validateCasing(
          filePath,
          fileContent,
          labInsightConfig
        );

        this.casingResults.push({
          filePath,
          results: casingResults,
        });

        // logger.log(
        //   "info",
        //   `Casing results for ${chalk.bold(filePath)} - Valid: ${
        //     casingResults.validated
        //   }, Invalid: ${casingResults.invalid}`
        // );

        return casingResults;
      } else {
        logger.log(
          "warning",
          "Ignoring case-checking for the file: " + filePath
        );

        return {
          validatedVariables: 0,
          invalidVariables: 0,
          validatedFunctions: 0,
          invalidFunctions: 0,
          validatedClasses: 0,
          invalidClasses: 0,
          validatedProperties: 0,
          invalidProperties: 0,
          validatedParameters: 0,
          invalidParameters: 0,
          validatedTypes: 0,
          invalidTypes: 0,
          validatedInterfaces: 0,
          invalidInterfaces: 0,
          validatedEnums: 0,
          invalidEnums: 0,
        };
      }
    } catch (error) {
      logger.log("error", `Error analyzing file ${filePath}: ${error}`);
      return {
        validatedVariables: 0,
        invalidVariables: 0,
        validatedFunctions: 0,
        invalidFunctions: 0,
        validatedClasses: 0,
        invalidClasses: 0,
        validatedProperties: 0,
        invalidProperties: 0,
        validatedParameters: 0,
        invalidParameters: 0,
        validatedTypes: 0,
        invalidTypes: 0,
        validatedInterfaces: 0,
        invalidInterfaces: 0,
        validatedEnums: 0,
        invalidEnums: 0,
      };
    }
  }

  private async validateCasing(
    filePath: string,
    fileContent: string,
    config: LabInsightConfig
  ): Promise<{
    validatedVariables: number;
    invalidVariables: number;
    validatedFunctions: number;
    invalidFunctions: number;
    validatedClasses: number;
    invalidClasses: number;
    validatedProperties: number;
    invalidProperties: number;
    validatedParameters: number;
    invalidParameters: number;
    validatedTypes: number;
    invalidTypes: number;
    validatedInterfaces: number;
    invalidInterfaces: number;
    validatedEnums: number;
    invalidEnums: number;
  }> {
    let validatedVariables = 0;
    let invalidVariables = 0;
    let validatedFunctions = 0;
    let invalidFunctions = 0;
    let validatedClasses = 0;
    let invalidClasses = 0;
    let validatedProperties = 0;
    let invalidProperties = 0;
    let validatedParameters = 0;
    let invalidParameters = 0;
    let validatedTypes = 0;
    let invalidTypes = 0;
    let validatedInterfaces = 0;
    let invalidInterfaces = 0;
    let validatedEnums = 0;
    let invalidEnums = 0;

    if (config.casing.variableCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForVariables(
        filePath,
        fileContent
      );
      validatedVariables += valid;
      invalidVariables += invalid;
    }

    if (config.casing.methodCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForFunctions(
        filePath,
        fileContent
      );
      validatedFunctions += valid;
      invalidFunctions += invalid;
    }

    if (config.casing.classCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForClasses(
        filePath,
        fileContent
      );
      validatedClasses += valid;
      invalidClasses += invalid;
    }

    if (config.casing.propertyCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForProperties(
        filePath,
        fileContent
      );
      validatedProperties += valid;
      invalidProperties += invalid;
    }

    if (config.casing.parameterCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForParameters(
        filePath,
        fileContent
      );
      validatedParameters += valid;
      invalidParameters += invalid;
    }

    if (config.casing.typeCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForTypes(
        filePath,
        fileContent
      );
      validatedTypes += valid;
      invalidTypes += invalid;
    }

    if (config.casing.interfaceCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForInterfaces(
        filePath,
        fileContent
      );
      validatedInterfaces += valid;
      invalidInterfaces += invalid;
    }

    if (config.casing.enumCasing === "camelCase") {
      const { valid, invalid } = await checkCamelCaseForEnums(
        filePath,
        fileContent
      );
      validatedEnums += valid;
      invalidEnums += invalid;
    }

    return {
      validatedVariables,
      invalidVariables,
      validatedFunctions,
      invalidFunctions,
      validatedClasses,
      invalidClasses,
      validatedProperties,
      invalidProperties,
      validatedParameters,
      invalidParameters,
      validatedTypes,
      invalidTypes,
      validatedInterfaces,
      invalidInterfaces,
      validatedEnums,
      invalidEnums,
    };
  }

  private aggregateResults(
    results1: any,
    results2: any
  ): {
    validatedVariables: number;
    invalidVariables: number;
    validatedFunctions: number;
    invalidFunctions: number;
    validatedClasses: number;
    invalidClasses: number;
    validatedProperties: number;
    invalidProperties: number;
    validatedParameters: number;
    invalidParameters: number;
    validatedTypes: number;
    invalidTypes: number;
    validatedInterfaces: number;
    invalidInterfaces: number;
    validatedEnums: number;
    invalidEnums: number;
  } {
    return {
      validatedVariables:
        results1.validatedVariables + results2.validatedVariables,
      invalidVariables: results1.invalidVariables + results2.invalidVariables,
      validatedFunctions:
        results1.validatedFunctions + results2.validatedFunctions,
      invalidFunctions: results1.invalidFunctions + results2.invalidFunctions,
      validatedClasses: results1.validatedClasses + results2.validatedClasses,
      invalidClasses: results1.invalidClasses + results2.invalidClasses,
      validatedProperties:
        results1.validatedProperties + results2.validatedProperties,
      invalidProperties:
        results1.invalidProperties + results2.invalidProperties,
      validatedParameters:
        results1.validatedParameters + results2.validatedParameters,
      invalidParameters:
        results1.invalidParameters + results2.invalidParameters,
      validatedTypes: results1.validatedTypes + results2.validatedTypes,
      invalidTypes: results1.invalidTypes + results2.invalidTypes,
      validatedInterfaces:
        results1.validatedInterfaces + results2.validatedInterfaces,
      invalidInterfaces:
        results1.invalidInterfaces + results2.invalidInterfaces,
      validatedEnums: results1.validatedEnums + results2.validatedEnums,
      invalidEnums: results1.invalidEnums + results2.invalidEnums,
    };
  }
}

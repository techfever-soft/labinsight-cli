import { LabInsightCore } from "../../core.class";
import { LabInsightLogger } from "../../logger.class";
import chalk from "chalk";

const core = new LabInsightCore();
const logger = new LabInsightLogger();

const currentConfig = core.getConfig();

/**
 * Checks if the variables are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForVariables = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedVariablesCount = 0;
  let invalidVariablesCount = 0;

  const invalidVariables: any[] = [];

  const detectVariables = /(?:let|const|var)\s+([a-zA-Z0-9_]+)(?:\s*=\s*.*?;)/g;
  const variables = fileContent.match(detectVariables);

  if (variables && variables.length) {
    for (const variable of variables) {
      const variableName = variable.split(" ")[1];
      if (!variableName.match(/^[a-z][a-zA-Z0-9]*$/)) {
        const lines = fileContent.split("\n");
        const lineNumber = lines.findIndex((line) => line.includes(variable));
        invalidVariables.push({
          name: variableName,
          pathLine: filePath + ":" + (lineNumber + 1),
        });
        invalidVariablesCount++;
      } else {
        validatedVariablesCount++;
      }
    }

    logResults(
      validatedVariablesCount,
      invalidVariablesCount,
      "variable",
      invalidVariables
    );
  }

  return {
    valid: validatedVariablesCount,
    invalid: invalidVariablesCount,
  };
};

/**
 * Checks if the functions are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForFunctions = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedFunctionsCount = 0;
  let invalidFunctionsCount = 0;

  const invalidFunctions: any[] = [];

  const detectNamedFunctions = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  const detectArrowFunctions =
    /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*\(.*?\)\s*=>/g;
  const detectExportedFunctions =
    /export\s+(?:const|let|var|function)\s+([a-zA-Z0-9_]+)\s*(?:=|\()/g;

  let match: any;

  while ((match = detectNamedFunctions.exec(fileContent)) !== null) {
    const functionName = match[1];
    if (!functionName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidFunctions.push({
        name: functionName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "named function",
      });
      invalidFunctionsCount++;
    } else {
      validatedFunctionsCount++;
    }
  }

  while ((match = detectArrowFunctions.exec(fileContent)) !== null) {
    const functionName = match[1];
    if (!functionName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidFunctions.push({
        name: functionName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "arrow function",
      });
      invalidFunctionsCount++;
    } else {
      validatedFunctionsCount++;
    }
  }

  while ((match = detectExportedFunctions.exec(fileContent)) !== null) {
    const functionName = match[1];
    if (!functionName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidFunctions.push({
        name: functionName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "exported function",
      });
      invalidFunctionsCount++;
    } else {
      validatedFunctionsCount++;
    }
  }

  logResults(
    validatedFunctionsCount,
    invalidFunctionsCount,
    "method",
    invalidFunctions
  );

  return {
    valid: validatedFunctionsCount,
    invalid: invalidFunctionsCount,
  };
};

/**
 * Checks if the classes are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForClasses = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedClassesCount = 0;
  let invalidClassesCount = 0;

  const invalidClasses: any[] = [];

  const detectClasses = /class\s+([a-zA-Z0-9_]+)\s*/g;

  let match: any;

  while ((match = detectClasses.exec(fileContent)) !== null) {
    const className = match[1];
    if (!className.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidClasses.push({
        name: className,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "class",
      });
      invalidClassesCount++;
    } else {
      validatedClassesCount++;
    }
  }

  logResults(
    validatedClassesCount,
    invalidClassesCount,
    "class",
    invalidClasses
  );

  return {
    valid: validatedClassesCount,
    invalid: invalidClassesCount,
  };
};

/**
 * Checks if the properties are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForProperties = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedPropertiesCount = 0;
  let invalidPropertiesCount = 0;

  const invalidProperties: any[] = [];

  const detectProperties =
    /(private|protected|public)\s+([a-zA-Z0-9_]+)\s*(?::\s*[a-zA-Z0-9_]+)?\s*=\s*[^;]*;/g;

  let match: any;

  while ((match = detectProperties.exec(fileContent)) !== null) {
    const propertyName = match[2];
    if (!propertyName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidProperties.push({
        name: propertyName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "property",
      });
      invalidPropertiesCount++;
    } else {
      validatedPropertiesCount++;
    }
  }

  logResults(
    validatedPropertiesCount,
    invalidPropertiesCount,
    "property",
    invalidProperties
  );

  return {
    valid: validatedPropertiesCount,
    invalid: invalidPropertiesCount,
  };
};

/**
 * Checks if the parameters are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForParameters = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedParametersCount = 0;
  let invalidParametersCount = 0;

  const invalidParameters: any[] = [];

  const detectParameters =
    /function\s+[a-zA-Z0-9_]+\s*\(\s*([a-zA-Z0-9_,\s]*)\s*\)\s*{/g;

  let match: any;

  while ((match = detectParameters.exec(fileContent)) !== null) {
    const parameters = match[1].split(",").map((param: any) => param.trim());
    parameters.forEach((param: any) => {
      if (!param.match(/^[a-z][a-zA-Z0-9]*$/)) {
        const lines = fileContent.split("\n");
        const lineNumber = lines.findIndex((line) => line.includes(match[0]));
        invalidParameters.push({
          name: param,
          pathLine: filePath + ":" + (lineNumber + 1),
          type: "parameter",
        });
        invalidParametersCount++;
      } else {
        validatedParametersCount++;
      }
    });
  }

  logResults(
    validatedParametersCount,
    invalidParametersCount,
    "parameter",
    invalidParameters
  );

  return {
    valid: validatedParametersCount,
    invalid: invalidParametersCount,
  };
};

/**
 * Checks if the types are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForTypes = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedTypesCount = 0;
  let invalidTypesCount = 0;

  const invalidTypes: any[] = [];

  const detectTypes = /type\s+([a-zA-Z0-9_]+)\s*=\s*/g;

  let match: any;

  while ((match = detectTypes.exec(fileContent)) !== null) {
    const typeName = match[1];
    if (!typeName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidTypes.push({
        name: typeName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "type",
      });
      invalidTypesCount++;
    } else {
      validatedTypesCount++;
    }
  }

  logResults(validatedTypesCount, invalidTypesCount, "type", invalidTypes);

  return {
    valid: validatedTypesCount,
    invalid: invalidTypesCount,
  };
};

/**
 * Checks if the interfaces are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForInterfaces = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedInterfacesCount = 0;
  let invalidInterfacesCount = 0;

  const invalidInterfaces: any[] = [];

  const detectInterfaces = /interface\s+([a-zA-Z0-9_]+)\s*{/g;

  let match: any;

  while ((match = detectInterfaces.exec(fileContent)) !== null) {
    const interfaceName = match[1];
    if (!interfaceName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidInterfaces.push({
        name: interfaceName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "interface",
      });
      invalidInterfacesCount++;
    } else {
      validatedInterfacesCount++;
    }
  }

  logResults(
    validatedInterfacesCount,
    invalidInterfacesCount,
    "interface",
    invalidInterfaces
  );

  return {
    valid: validatedInterfacesCount,
    invalid: invalidInterfacesCount,
  };
};

/**
 * Checks if the enums are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForEnums = async (
  filePath: string,
  fileContent: string
): Promise<{ valid: number; invalid: number }> => {
  let validatedEnumsCount = 0;
  let invalidEnumsCount = 0;

  const invalidEnums: any[] = [];

  const detectEnums = /enum\s+([a-zA-Z0-9_]+)\s*{/g;

  let match: any;

  while ((match = detectEnums.exec(fileContent)) !== null) {
    const enumName = match[1];
    if (!enumName.match(/^[a-z][a-zA-Z0-9]*$/)) {
      const lines = fileContent.split("\n");
      const lineNumber = lines.findIndex((line) => line.includes(match[0]));
      invalidEnums.push({
        name: enumName,
        pathLine: filePath + ":" + (lineNumber + 1),
        type: "enum",
      });
      invalidEnumsCount++;
    } else {
      validatedEnumsCount++;
    }
  }

  logResults(validatedEnumsCount, invalidEnumsCount, "enum", invalidEnums);

  return {
    valid: validatedEnumsCount,
    invalid: invalidEnumsCount,
  };
};

/**
 * Logs the results of the validation process
 * @param validCount number
 * @param invalidCount number
 * @param type string
 * @param invalidItems array
 */
const logResults = (
  validCount: number,
  invalidCount: number,
  type: string,
  invalidItems: any[]
) => {
  if (invalidItems.length > 0) {
    logger.log(
      "warning",
      `${chalk.red(invalidItems.length + " invalid " + type + "(s)")}`
    );
    invalidItems.forEach((item) => {
      logger.log(
        "error",
        `${chalk.red("Invalid " + type + ": ")} ${chalk.bold(item.name)} in ${
          item.pathLine
        }`
      );
    });
  }

  if (validCount > 0) {
    logger.log(
      "success",
      `${chalk.green(validCount + " valid " + type + "(s)")}`
    );
  }

  if (invalidCount === 0) {
    logger.log("success", `${chalk.green("All " + type + "(s) are valid.")}`);
  }
};

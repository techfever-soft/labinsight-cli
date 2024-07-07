import { LabInsightConfig } from "../../../interfaces/config.interface";
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
): Promise<void> => {
  let validatedVariablesCount = 0;
  let invalidVariablesCount = 0;

  let invalidVariables: any[] = [];

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

    if (currentConfig.options.silent) {
      if (validatedVariablesCount) {
        logger.logChecking(
          "check",
          "camelCase",
          "variable",
          `Validated variables => ${chalk.bold(validatedVariablesCount)}`
        );
      }
      if (invalidVariablesCount) {
        logger.logChecking(
          "cross",
          "camelCase",
          "variable",
          `Invalid variables => ${chalk.bold(invalidVariablesCount)}`
        );
      }
    } else {
      logger.logChecking(
        "check",
        "camelCase",
        "variable",
        `Validated variables => ${chalk.bold(validatedVariablesCount)}`
      );
      logger.logChecking(
        "cross",
        "camelCase",
        "variable",
        `Invalid variables => ${chalk.bold(invalidVariablesCount)}`
      );
    }

    if (invalidVariablesCount && invalidVariables.length) {
      invalidVariables.forEach((variableState) => {
        console.log(
          " └── ⚠️  " +
            chalk.bold(variableState.name) +
            chalk.grey(" at ") +
            chalk.italic(variableState.pathLine)
        );
      });
    }
  }
};

/**
 * Checks if the functions are in camelCase
 * @param filePath string
 * @param fileContent string
 */
export const checkCamelCaseForFunctions = async (
  filePath: string,
  fileContent: string
) => {
  let validatedFunctionsCount = 0;
  let invalidFunctionsCount = 0;

  let invalidFunctions: any[] = [];

  // Regular expressions to detect function names
  const detectNamedFunctions = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
  const detectArrowFunctions =
    /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*\(.*?\)\s*=>/g;
  const detectExportedFunctions =
    /export\s+(?:const|let|var|function)\s+([a-zA-Z0-9_]+)\s*(?:=|\()/g;

  let match: any;

  // Detect named functions
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

  // Detect arrow functions
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

  // Detect exported functions
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

  if (currentConfig.options.silent) {
    if (validatedFunctionsCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "method",
        `Validated methods => ${chalk.bold(validatedFunctionsCount)}`
      );
    }
    if (invalidFunctionsCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "method",
        `Invalid methods => ${chalk.bold(invalidFunctionsCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "method",
      `Validated methods => ${chalk.bold(validatedFunctionsCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "method",
      `Invalid methods => ${chalk.bold(invalidFunctionsCount)}`
    );
  }

  if (invalidFunctionsCount && invalidFunctions.length) {
    invalidFunctions.forEach((funcState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(funcState.name) +
          chalk.grey(" at ") +
          chalk.italic(funcState.pathLine) +
          chalk.grey(" (") +
          funcState.type +
          chalk.grey(")")
      );
    });
  }
};

// Do the same with logger.logChecking for the other functions

export const checkCamelCaseForClasses = async (
  filePath: string,
  fileContent: string
) => {
  let validatedClassesCount = 0;
  let invalidClassesCount = 0;

  let invalidClasses: any[] = [];

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

  if (currentConfig.options.silent) {
    if (validatedClassesCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "class",
        `Validated clases => ${chalk.bold(validatedClassesCount)}`
      );
    }
    if (invalidClassesCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "class",
        `Invalid classes => ${chalk.bold(invalidClassesCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "class",
      `Validated classes => ${chalk.bold(validatedClassesCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "class",
      `Invalid classes => ${chalk.bold(invalidClassesCount)}`
    );
  }

  if (invalidClassesCount && invalidClasses.length) {
    invalidClasses.forEach((classState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(classState.name) +
          chalk.grey(" at ") +
          chalk.italic(classState.pathLine) +
          chalk.grey(" (") +
          classState.type +
          chalk.grey(")")
      );
    });
  }
};

export const checkCamelCaseForProperties = async (
  filePath: string,
  fileContent: string
) => {
  let validatedPropertiesCount = 0;
  let invalidPropertiesCount = 0;

  let invalidProperties: any[] = [];

  const detectProperties =
    /(private|protected|public)\s+([a-zA-Z0-9_]+)\s*(?::\s*[a-zA-Z0-9_]+)?\s*=\s*[^;]*;/g;

  let match: any;

  while ((match = detectProperties.exec(fileContent)) !== null) {
    const propertyName = match[1];
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

  if (currentConfig.options.silent) {
    if (validatedPropertiesCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "property",
        `Validated properties => ${chalk.bold(validatedPropertiesCount)}`
      );
    }
    if (invalidPropertiesCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "property",
        `Invalid properties => ${chalk.bold(invalidPropertiesCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "property",
      `Validated properties => ${chalk.bold(validatedPropertiesCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "property",
      `Invalid properties => ${chalk.bold(invalidPropertiesCount)}`
    );
  }

  if (invalidPropertiesCount && invalidProperties.length) {
    invalidProperties.forEach((propertyState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(propertyState.name) +
          chalk.grey(" at ") +
          chalk.italic(propertyState.pathLine) +
          chalk.grey(" (") +
          propertyState.type +
          chalk.grey(")")
      );
    });
  }
};

export const checkCamelCaseForParameters = async (
  filePath: string,
  fileContent: string
) => {
  let validatedParametersCount = 0;
  let invalidParametersCount = 0;

  let invalidParameters: any[] = [];

  const detectParameters =
    /function\s+[a-zA-Z0-9_]+\s*\(\s*([a-zA-Z0-9_]+)\s*(?:,\s*[a-zA-Z0-9_]+)*\s*\)\s*{/g;

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

  if (currentConfig.options.silent) {
    if (validatedParametersCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "parameter",
        `Validated parameters => ${chalk.bold(validatedParametersCount)}`
      );
    }
    if (invalidParametersCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "parameter",
        `Invalid parameters => ${chalk.bold(invalidParametersCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "parameter",
      `Validated parameters => ${chalk.bold(validatedParametersCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "parameter",
      `Invalid parameters => ${chalk.bold(invalidParametersCount)}`
    );
  }

  if (invalidParametersCount && invalidParameters.length) {
    invalidParameters.forEach((parameterState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(parameterState.name) +
          chalk.grey(" at ") +
          chalk.italic(parameterState.pathLine) +
          chalk.grey(" (") +
          parameterState.type +
          chalk.grey(")")
      );
    });
  }
};

export const checkCamelCaseForTypes = async (
  filePath: string,
  fileContent: string
) => {
  let validatedTypesCount = 0;
  let invalidTypesCount = 0;

  let invalidTypes: any[] = [];

  const detectTypes = /type\s+([a-zA-Z0-9_]+)\s*=\s*[^;]*;/g;

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

  if (currentConfig.options.silent) {
    if (validatedTypesCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "type",
        `Validated types => ${chalk.bold(validatedTypesCount)}`
      );
    }
    if (invalidTypesCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "type",
        `Invalid types => ${chalk.bold(invalidTypesCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "type",
      `Validated types => ${chalk.bold(validatedTypesCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "type",
      `Invalid types => ${chalk.bold(invalidTypesCount)}`
    );
  }

  if (invalidTypesCount && invalidTypes.length) {
    invalidTypes.forEach((typeState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(typeState.name) +
          chalk.grey(" at ") +
          chalk.italic(typeState.pathLine) +
          chalk.grey(" (") +
          typeState.type +
          chalk.grey(")")
      );
    });
  }
};

export const checkCamelCaseForInterfaces = async (
  filePath: string,
  fileContent: string
): Promise<void> => {
  let validatedInterfacesCount = 0;
  let invalidInterfacesCount = 0;

  let invalidInterfaces: any[] = [];

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

  if (currentConfig.options.silent) {
    if (validatedInterfacesCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "interface",
        `Validated interfaces => ${chalk.bold(validatedInterfacesCount)}`
      );
    }
    if (invalidInterfacesCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "interface",
        `Invalid interfaces => ${chalk.bold(invalidInterfacesCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "interface",
      `Validated interfaces => ${chalk.bold(validatedInterfacesCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "interface",
      `Invalid interfaces => ${chalk.bold(invalidInterfacesCount)}`
    );
  }

  if (invalidInterfacesCount && invalidInterfaces.length) {
    invalidInterfaces.forEach((interfaceState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(interfaceState.name) +
          chalk.grey(" at ") +
          chalk.italic(interfaceState.pathLine) +
          chalk.grey(" (") +
          interfaceState.type +
          chalk.grey(")")
      );
    });
  }
};

export const checkCamelCaseForEnums = async (
  filePath: string,
  fileContent: string
): Promise<void> => {
  let validatedEnumsCount = 0;
  let invalidEnumsCount = 0;

  let invalidEnums: any[] = [];

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

  if (currentConfig.options.silent) {
    if (validatedEnumsCount) {
      logger.logChecking(
        "check",
        "camelCase",
        "enum",
        `Validated enums => ${chalk.bold(validatedEnumsCount)}`
      );
    }
    if (invalidEnumsCount) {
      logger.logChecking(
        "cross",
        "camelCase",
        "enum",
        `Invalid enums => ${chalk.bold(invalidEnumsCount)}`
      );
    }
  } else {
    logger.logChecking(
      "check",
      "camelCase",
      "enum",
      `Validated enums => ${chalk.bold(validatedEnumsCount)}`
    );
    logger.logChecking(
      "cross",
      "camelCase",
      "enum",
      `Invalid enums => ${chalk.bold(invalidEnumsCount)}`
    );
  }

  if (invalidEnumsCount && invalidEnums.length) {
    invalidEnums.forEach((enumState) => {
      console.log(
        " └── ⚠️  " +
          chalk.bold(enumState.name) +
          chalk.grey(" at ") +
          chalk.italic(enumState.pathLine) +
          chalk.grey(" (") +
          enumState.type +
          chalk.grey(")")
      );
    });
  }
};

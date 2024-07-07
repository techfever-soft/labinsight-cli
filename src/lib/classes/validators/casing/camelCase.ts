import chalk from "chalk";

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

    console.log(
      `✅ [CamelCase]${chalk.gray("[variable]")} ${chalk.green(
        "Validated variables"
      )} => ${chalk.bold(validatedVariablesCount)}`
    );
    console.log(
      `❌ [CamelCase]${chalk.gray("[variable]")} ${chalk.red(
        "Invalid variables"
      )} => ${chalk.bold(invalidVariablesCount)}`
    );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[function]")} ${chalk.green(
      "Validated functions"
    )} => ${chalk.bold(validatedFunctionsCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[function]")} ${chalk.red(
      "Invalid functions"
    )} => ${chalk.bold(invalidFunctionsCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[class]")} ${chalk.green(
      "Validated classes"
    )} => ${chalk.bold(validatedClassesCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[class]")} ${chalk.red(
      "Invalid classes"
    )} => ${chalk.bold(invalidClassesCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[property]")} ${chalk.green(
      "Validated properties"
    )} => ${chalk.bold(validatedPropertiesCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[property]")} ${chalk.red(
      "Invalid properties"
    )} => ${chalk.bold(invalidPropertiesCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[parameter]")} ${chalk.green(
      "Validated parameters"
    )} => ${chalk.bold(validatedParametersCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[parameter]")} ${chalk.red(
      "Invalid parameters"
    )} => ${chalk.bold(invalidParametersCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[type]")} ${chalk.green(
      "Validated types"
    )} => ${chalk.bold(validatedTypesCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[type]")} ${chalk.red(
      "Invalid types"
    )} => ${chalk.bold(invalidTypesCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[interface]")} ${chalk.green(
      "Validated interfaces"
    )} => ${chalk.bold(validatedInterfacesCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[interface]")} ${chalk.red(
      "Invalid interfaces"
    )} => ${chalk.bold(invalidInterfacesCount)}`
  );

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

  console.log(
    `✅ [CamelCase]${chalk.gray("[enum]")} ${chalk.green(
      "Validated enums"
    )} => ${chalk.bold(validatedEnumsCount)}`
  );
  console.log(
    `❌ [CamelCase]${chalk.gray("[enum]")} ${chalk.red(
      "Invalid enums"
    )} => ${chalk.bold(invalidEnumsCount)}`
  );

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

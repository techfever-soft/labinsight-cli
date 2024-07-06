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
      `✅ [CamelCase] ${chalk.green("Validated variables")} => ${chalk.bold(
        validatedVariablesCount
      )}`
    );
    console.log(
      `❌ [CamelCase] ${chalk.red("Invalid variables")} => ${chalk.bold(
        invalidVariablesCount
      )}`
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
 * TODO: Implement this function
 */
export const checkCamelCaseForFunctions = async (
  filePath: string,
  fileContent: string
) => {
  throw new Error("Not implemented yet");
};

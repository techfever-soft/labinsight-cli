import { LabInsightLogger } from "../classes/logger.class";
import chalk from "chalk";

const logger = new LabInsightLogger();

export function ignoreAny(
  target: any,
  propertyKey?: string,
  descriptor?: PropertyDescriptor
) {
  if (propertyKey) {
    logger.log(
      "warning",
      "@ignoreAny decorator was used on property : " + chalk.bold(propertyKey)
    );
  } else {
    logger.log(
      "warning",
      "@ignoreAny decorator was used on class : " + chalk.bold(propertyKey)
    );
  }
}

export function ignoreCasing(
  target: any,
  propertyKey?: string,
  descriptor?: PropertyDescriptor
) {
  if (propertyKey) {
    logger.log(
      "warning",
      "@ignoreCasing decorator was used on property : " +
        chalk.bold(propertyKey)
    );
  } else {
    logger.log(
      "warning",
      "@ignoreCasing decorator was used on class : " + chalk.bold(propertyKey)
    );
  }
}

export function doFileContainsIgnoreCasingDecorator(
  fileContent: string
): boolean {
  const ignoreDecoratorPattern = /\b@ignoreCasing\b/g;
  return ignoreDecoratorPattern.test(fileContent);
}

export function doFileContainsIgnoreAnyDecorator(fileContent: string): boolean {
  const ignoreDecoratorPattern = /\b@ignoreAny\b/g;
  return ignoreDecoratorPattern.test(fileContent);
}

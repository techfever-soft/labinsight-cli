import {
  LabInsightProjectCasing,
  LabInsightProjectEngine,
  LabInsightProjectType,
  LabInsignhtProjectLinting,
} from "../types/project.type";

import { LabInsightEnvironment } from "../types/environment";

export interface LabInsightConfig {
  version: number;
  projectName: string;
  projectType: LabInsightProjectType;
  engine: LabInsightProjectEngine;
  enviroment: LabInsightEnvironment;
  port: number;
  host: string;

  srcFolder: string;
  distFolder: string;

  linting: LabInsignhtProjectLinting;

  rules: {
    variableCasing: LabInsightProjectCasing;
    maxLineLength: number;
    indentStyle: "space" | "tab";
    indentSize: number;
    allowTrailingSpaces: boolean;
    enforceSemicolons: boolean;
  };

  options: {
    jsDoc: boolean;
    strictMode: boolean;
    noConsoleLog: boolean;
    noDebugger: boolean;
    noUnusedVariables: boolean;
    noUnusedImports: boolean;
    noVar: boolean;
  };

  decorators: {
    classDecorators: boolean;
    methodDecorators: boolean;
    propertyDecorators: boolean;
    parameterDecorators: boolean;
  };

  checking: {
    checkMethodNames: boolean;
    checkPropertyNames: boolean;
    checkParameterNames: boolean;
    checkClassNames: boolean;
    checkInterfaceNames: boolean;
    checkEnumNames: boolean;
    checkFunctionNames: boolean;
    checkVariableNames: boolean;
  }
}

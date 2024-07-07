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
    maxLineLength: number;
    indentStyle: "space" | "tab";
    indentSize: number;
    allowTrailingSpaces: boolean;
    enforceSemicolons: boolean;
  };

  casing: {
    variableCasing: LabInsightProjectCasing;
    parameterCasing: LabInsightProjectCasing;
    propertyCasing: LabInsightProjectCasing;
    methodCasing: LabInsightProjectCasing;
    classCasing: LabInsightProjectCasing;
    typeCasing: LabInsightProjectCasing;
    interfaceCasing: LabInsightProjectCasing;
    enumCasing: LabInsightProjectCasing;
  }

  options: {
    jsDoc: boolean;
    strictMode: boolean;
    noImplicitAny: boolean;
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
}

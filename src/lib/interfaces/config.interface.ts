import {
  LabInsightProjectCasing,
  LabInsightProjectEngine,
  LabInsightProjectType,
  LabInsignhtProjectLinting,
} from "../types/project.type";

import { LabInsightEnvironment } from "../types/environment.type";

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
    silent: boolean;
    strictMode: boolean;
    noAny: boolean;
    noConsoleLog: boolean;
    noDebugger: boolean;
    noUnusedVariables: boolean;
    noUnusedImports: boolean;
    noVar: boolean;
  };
}

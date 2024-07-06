import {
  LabInsightEnvironment,
  LabInsightProjectEngine,
  LabInsightProjectType,
} from "../types/project.type";

export interface LabInsightConfig {
  version: number;
  projectName: string;
  projectType: LabInsightProjectType;
  engine: LabInsightProjectEngine;
  enviroment: LabInsightEnvironment;
  port: number;
  host: string;

  // Folders
  srcFolder: string;
  distFolder: string;
}

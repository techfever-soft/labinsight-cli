import * as fs from "fs";

import { LabInsightConfig } from "../interfaces/config.interface";

export class LabInsightCore {
  private currentConfig!: LabInsightConfig;

  constructor() {
    this.currentConfig = JSON.parse(fs.readFileSync(".labinsight", "utf8"));
  }

  public setConfig(config: LabInsightConfig): void {
    this.currentConfig = config;
  }

  public getConfig(): LabInsightConfig {
    return this.currentConfig;
  }
}

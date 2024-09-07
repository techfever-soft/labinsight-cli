import path from "path";
import fs from "fs";

export class LabInsightReporter {
  constructor() {}

  public async generateReport(results: {
    eslintResults: any;
    casingResults: any;
  }): Promise<void> {
    const projectRoot = process.cwd();
    const reportPath = path.join(projectRoot, "reports");

    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath);
    } else {
      fs.rmdirSync(reportPath, { recursive: true });
      fs.mkdirSync(reportPath);
    }

    const eslintReportPath = path.join(reportPath, "eslint-report.json");
    const casingReportPath = path.join(reportPath, "casing-report.json");

    fs.writeFileSync(
      eslintReportPath,
      JSON.stringify(results.eslintResults, null, 2)
    );

    fs.writeFileSync(
      casingReportPath,
      JSON.stringify(results.casingResults, null, 2)
    );

    console.log(`Reports generated at: ${reportPath}`);
  }
}

import { argv } from "process";
import { LabInsightAnalyzer } from "../lib/classes/analyzer.class";
import { checkbox, confirm, select } from "@inquirer/prompts";

const analyzer = new LabInsightAnalyzer();

/**
 * Analyze the project basically
 */
export const analyze = async () => {
  // await analyzer.basicAnalysis();

  const type = await select({
    message: "Which type of analysis do you want to perform ?",
    choices: [
      { name: "Basic", value: "basic" },
      { name: "Advanced", value: "advanced", disabled: true },
    ],
  });

  const reportType = await select({
    message: "Which type of report do you want to generate ?",
    choices: [
      {
        name: "Full",
        value: "full",
        description: "Generate all types of report",
        disabled: true,
      },
      {
        name: "Online",
        value: "online",
        description: "Generate a report online",
        disabled: true,
      },
      {
        name: "Console",
        value: "console",
        description: "Generate console log report",
        disabled: false,
      },
      {
        name: "File",
        value: "file",
        description: "Generate a file report",
        disabled: true,
      },
    ],
  });

  if (reportType === "full") {
    // await analyzer.fullAnalysis();
  }

  if (reportType === "online") {
    // TODO : Implement the online report generation
    // await auth.loginWithToken();
  }

  if (reportType === "console") {
    await analyzer.basicAnalysis();
  }

  if (reportType === "file") {
    const fileTypes = await checkbox({
      message: "Which file type do you want to generate ?",
      choices: [
        { name: "JSON", value: "json" },
        { name: "HTML", value: "html" },
        { name: "PDF", value: "pdf" },
        { name: "CSV", value: "csv" },
      ],
    });
  }
};

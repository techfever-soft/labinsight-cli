import { LabInsightAnalyzer } from "../lib/classes/analyzer.class";

const analyzer = new LabInsightAnalyzer();

/**
 * Analyze the project basically
 */
export const analyze = async () => {
  await analyzer.basicAnalysis();
};

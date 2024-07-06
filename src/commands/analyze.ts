import { LabInsightAnalyzer } from "../lib/classes/analyzer.class";

const analyzer = new LabInsightAnalyzer();

export const analyze = async () => {
  await analyzer.basicAnalysis();
};

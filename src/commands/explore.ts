import { LabInsightDetector } from "../lib/classes/detector.class";

const detector = new LabInsightDetector();

export const explore = async () => {
  await detector.exploreProjectRoot();
};

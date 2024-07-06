import { LabInsightDetector } from "../lib/classes/detector.class";

const detector = new LabInsightDetector();

/**
 * Explore the project root
 * @deprecated
 */
export const explore = async () => {
  await detector.exploreProjectRoot();
};

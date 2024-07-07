import { LabInsightLogType } from "../types/logger.type";

export interface LabInsightLog {
    type: LabInsightLogType;
    message: string;
    timestamp: Date;
}
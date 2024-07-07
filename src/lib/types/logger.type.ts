export type LabInsightLogType = "success" | "info" | "warning" | "error";

export type LabInsightLogCheckType = "check" | "cross" | "warning";

export type LabInsightLogCheckTestType =
  | "camelCase"
  | "pascalCase"
  | "snakeCase";

export type LabInsightLogCheckPartType =
  | "variable"
  | "parameter"
  | "property"
  | "method"
  | "class"
  | "type"
  | "interface"
  | "enum";

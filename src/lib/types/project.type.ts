export type LabInsightProjectType =
  | "none"
  | "node"
  | "react"
  | "vue"
  | "angular"
  | "svelte"
  | "web-components"
  | "static"
  | "other";

export type LabInsightProjectEngine = "none" | "webpack" | "vite";

export type LabInsignhtProjectLinting = "eslint" | "prettier" | "none";

export type LabInsightProjectCasing = "camelCase" | "snake_case";

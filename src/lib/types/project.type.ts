export type LabInsightProjectType =
  | "none"
  | "node"
  | "react"
  | "vue"
  | "angular"
  | "svelte"
  | "lit-element"
  | "stencil"
  | "static"
  | "other";

export type LabInsightProjectEngine = "none" | "webpack" | "vite";

export type LabInsignhtProjectLinting = "eslint" | "prettier" | "both" | "none";

export type LabInsightProjectCasing =
  | "camelCase"
  | "pascalCase"
  | "snake_case"
  | "kebab-case";

import { LabInsightConfig } from "../interfaces/config.interface";
import { PackageJSON } from "../interfaces/package.interface";
import fs from "fs";
import path from "path";

export class LabInsightDetector {
  private dependencies: { [key: string]: string } = {};
  private devDependencies: { [key: string]: string } = {};

  constructor() {}

  /**
   * ANCHOR Public methods
   */

  /**
   * Detects the file extension
   * @param filePath string
   * @param fileContent string
   * @returns { fileType: string, isSourceCode: boolean }
   */
  public async detectFileType(
    filePath: string,
    fileContent: string
  ): Promise<{ fileType: string; isSourceCode: boolean }> {
    let fileType = "unknown";
    let isSourceCode = false;

    if (filePath.endsWith(".ts")) {
      fileType = "typescript";
      isSourceCode = true;
    }
    if (filePath.endsWith(".js")) {
      fileType = "javascript";
      isSourceCode = true;
    }
    if (filePath.endsWith(".html")) {
      fileType = "html";
      isSourceCode = true;
    }
    if (filePath.endsWith(".css")) {
      fileType = "css";
      isSourceCode = true;
    }
    if (filePath.endsWith(".md")) {
      fileType = "markdown";
      isSourceCode = false;
    }
    if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
      fileType = "yaml";
      isSourceCode = false;
    }
    if (filePath.endsWith(".json")) {
      fileType = "json";
      isSourceCode = false;
    }

    if (fileType === "unknown") {
      const fileContentLength = fileContent.length;
      // TODO: Detect the file type with the a random slice of the content
    }

    return { fileType, isSourceCode };
  }

  /**
   * Automatically detect the project configuration
   * @returns Promise<LabInsightConfig>
   */
  public detectProjectConfig(): Promise<LabInsightConfig> {
    return new Promise((resolve, reject) => {
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = fs.readFileSync(packageJsonPath, "utf-8");
      const packageJsonParsed: PackageJSON = JSON.parse(packageJson);

      const projectName = packageJsonParsed.name;
      const dependencies = packageJsonParsed.dependencies || {};
      const devDependencies = packageJsonParsed.devDependencies || {};

      if (
        Object.keys(dependencies).length ||
        Object.keys(devDependencies).length
      ) {
        this.dependencies = dependencies;
        this.devDependencies = devDependencies;

        let projectType: LabInsightConfig["projectType"] = "none";
        let engine: LabInsightConfig["engine"] = "none";

        // ANCHOR: Start detecting project type
        if (this.doDependenciesIncludes(["express", "@types/express"])) {
          projectType = "node";
        }
        if (this.doDependenciesIncludes(["react", "react-dom"])) {
          projectType = "react";
        }
        if (this.doDependenciesIncludes(["@angular/core"])) {
          projectType = "angular";
        }
        if (this.doDependenciesIncludes(["vue"])) {
          projectType = "vue";
        }
        if (this.doDependenciesIncludes(["svelte"])) {
          projectType = "svelte";
        }
        if (this.doDependenciesIncludes(["lit-element"])) {
          projectType = "lit-element";
        }
        if (this.doDependenciesIncludes(["@stencil/core"])) {
          projectType = "stencil";
        }

        // ANCHOR: Start detecting project engine
        if (this.doDependenciesIncludes(["webpack", "webpack-dev-server"])) {
          engine = "webpack";
        }
        if (this.doDependenciesIncludes(["vite"])) {
          engine = "vite";
        }

        // TODO: Detect project engine

        return resolve(<LabInsightConfig>{
          version: 1,
          projectName,
          projectType,
          engine,
          enviroment: "development",
          port: 3100,
          host: "localhost",

          srcFolder: "src",
          distFolder: "dist",

          linting: "eslint",

          casing: {
            // TODO: Add the default casing
          },
          options: {
            // TODO: Add the default options
          },
          decorators: {
            // TODO: Add the default decorators
          },
        });
      } else {
        resolve(<LabInsightConfig>{
          version: 1,
          projectName,
          projectType: "none",
          engine: "none",
          enviroment: "development",
          port: 3100,
          host: "localhost",

          srcFolder: "src",
          distFolder: "dist",

          linting: "none",

          casing: {
            // TODO: Add the default casing
          },
          options: {
            // TODO: Add the default options
          },
          decorators: {
            // TODO: Add the default decorators
          },
        });
      }
    });
  }

  /**
   * ANCHOR Private methods
   */

  /**
   * If the dependencies or devDependencies includes the dependencies to include
   * @param dependenciesToInclude string[]
   * @returns boolean
   */
  private doDependenciesIncludes(dependenciesToInclude: string[]) {
    const allDependencies = Object.keys(this.dependencies);
    const allDevDependencies = Object.keys(this.devDependencies);

    const allDependenciesAndDevDependencies =
      allDependencies.concat(allDevDependencies);

    return dependenciesToInclude.every((dependency) =>
      allDependenciesAndDevDependencies.includes(dependency)
    );
  }
}

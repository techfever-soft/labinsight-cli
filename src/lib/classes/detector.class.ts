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
        // End detecting project config

        // ANCHOR: Start detecting project engine
        if (this.doDependenciesIncludes(["webpack", "webpack-dev-server"])) {
          engine = "webpack";
        }
        if (this.doDependenciesIncludes(["vite"])) {
          engine = "vite";
        }
        // End detecting project engine

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
            variableCasing: "camelCase",
            parameterCasing: "camelCase",
            propertyCasing: "camelCase",
            methodCasing: "camelCase",
            classCasing: "pascalCase",
            typeCasing: "pascalCase",
            interfaceCasing: "pascalCase",
            enumCasing: "pascalCase",
          },

          options: {
            jsDoc: true,
            silent: true,
            strictMode: true,
            noConsoleLog: true,
            noAny: true,
            noDebugger: true,
            noUnusedVariables: true,
            noUnusedImports: true,
            noVar: true,
          },
        });
      } else {
        resolve(<LabInsightConfig>{
          version: 1,
          projectName: "labinsight",
          projectType: "none",
          engine: "none",
          enviroment: "development",
          port: 3100,
          host: "localhost",

          srcFolder: "src",
          distFolder: "dist",

          linting: "eslint",

          casing: {
            variableCasing: "camelCase",
            parameterCasing: "camelCase",
            propertyCasing: "camelCase",
            methodCasing: "camelCase",
            classCasing: "pascalCase",
            typeCasing: "pascalCase",
            interfaceCasing: "pascalCase",
            enumCasing: "pascalCase",
          },

          options: {
            jsDoc: true,
            silent: true,
            strictMode: true,
            noAny: true,
            noConsoleLog: true,
            noDebugger: true,
            noUnusedVariables: true,
            noUnusedImports: true,
            noVar: true,
          },
        });
      }
    });
  }

  /**
   * Explore the project root folder and print the content
   * @returns Promise<void>
   */
  public async exploreProjectRoot(): Promise<void> {
    const projectRootPath = process.cwd();

    try {
      const rootContents = await fs.promises.readdir(projectRootPath);
      for (const item of rootContents) {
        await this.scanFileOrFolderChildrens(item, 0);
      }

      console.log(" ");

      console.log("Exploration of root folder succeed !");
    } catch (error) {
      console.error("Error when exploring root folder :", error);
    }
  }

  private async scanFileOrFolderChildrens(
    name: string,
    depth: number
  ): Promise<void> {
    const itemPath = path.join(process.cwd(), name);

    try {
      const exists = fs.existsSync(itemPath);

      if (!exists) {
        return;
      }

      const stats = await fs.promises.stat(itemPath);
      if (stats.isDirectory()) {
        console.log(" ".repeat(depth * 2) + `└── 📁 ${name}`);
        const subItems = await fs.promises.readdir(itemPath);
        for (const subItem of subItems) {
          await this.scanFileOrFolderChildrens(subItem, depth + 1);
        }
      } else if (stats.isFile()) {
        console.log(" ".repeat(depth * 2) + `└── 📄 ${name}`);
      } else {
        console.log(" ".repeat(depth * 2) + `└── ${name} (unknown type)`);
      }
    } catch (error) {
      console.error(`Error when reading : ${name} :`, error);
    }
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

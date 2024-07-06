import fs from "fs";
import path from "path";

export class LabInsightAnalyzer {
  public ignoredDirectories = ["node_modules", ".git"];

  constructor() {}

  /**
   * Performs a basic analysis on the current working directory
   * @returns Promise<void>
   */
  public async basicAnalysis(): Promise<void> {
    console.log("Starting basic analysis...");

    const cwd = process.cwd();
    await this.analyzeDirectory(cwd);
  }

  /**
   * Analyze the directory and his childrens
   * @param directoryPath string
   * @returns Promise<void>
   */
  private async analyzeDirectory(directoryPath: string): Promise<void> {
    try {
      const files = fs.readdirSync(directoryPath);
      for (const file of files) {
        if (this.ignoredDirectories.includes(file)) {
          continue;
        } else {
          const filePath = path.join(directoryPath, file);
          const stats = fs.statSync(filePath);

          if (stats.isDirectory()) {
            // Recursive call if it's a directory
            await this.analyzeDirectory(filePath);
          } else if (stats.isFile()) {
            // Analyze file if it's a regular file
            await this.analyzeFile(filePath);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}: ${error}`);
    }
  }

  /**
   * Analyzes a file with the given path
   * @param filePath string
   * @returns Promise<void>
   */
  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      console.log(`Analyzing file: ${filePath}`);

      // Perform various analyses
      const { fileType, isSourceCode } = await this.detectFileType(
        filePath,
        fileContent
      );

      console.log(`File Type: ${fileType}`);

      if (isSourceCode) {
        const camelCase = await this.detectCamelCase(fileContent);
        // const snakeCase = await this.detectSnakeCase(fileContent);
        // const kebabCase = await this.detectKebabCase(fileContent);
        // const upperCase = await this.detectUpperCase(fileContent);
        // const pascalCase = await this.detectPascalCase(fileContent);

        console.log(`Camel Case: ${camelCase}`);
        // console.log(`Snake Case: ${snakeCase}`);
        // console.log(`Kebab Case: ${kebabCase}`);
        // console.log(`Upper Case: ${upperCase}`);
        // console.log(`Pascal Case: ${pascalCase}`);
      }
    } catch (error) {
      console.error(`Error analyzing file ${filePath}: ${error}`);
    }
  }

  private async detectCamelCase(fileContent: string): Promise<boolean> {
    const camelCasePattern = /\b[a-z][a-zA-Z0-9]*([A-Z][a-zA-Z0-9]*)+\b/g;
    const variableNames = fileContent.match(camelCasePattern) || [];

    return variableNames.length > 0;
  }

  /**
   * Detects the file extension
   * @param filePath string
   * @param fileContent string
   * @returns { fileType: string, isSourceCode: boolean }
   */
  private async detectFileType(
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
      // TODO: Detect the file type with the a random slice of content
    }

    return { fileType, isSourceCode };
  }
}

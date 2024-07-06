export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
  keywords: string[];
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}

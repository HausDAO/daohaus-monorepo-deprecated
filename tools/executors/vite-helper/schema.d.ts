export interface ViteHelperExecutorSchema {
  configFile?: string;
  baseHref?: string;
  frameworkConfigFile?: string;
  fileReplacements?: { file: string; with: string }[];
  outputPath: string;
  sourcemaps: boolean;
  updateBuildableProjectDepsInPackageJson?: boolean;
  buildableProjectDepsInPackageJsonType: 'dependencies' | 'peerDependencies';
  packageJson: string;
  project: string;
}

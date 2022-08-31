import { ExecutorContext, ProjectGraphProjectNode } from '@nrwl/devkit';
import {
  calculateProjectDependencies,
  createTmpTsConfig,
  DependentBuildableProjectNode,
} from '@nrwl/workspace/src/utilities/buildable-libs-utils';

export function checkDependencies(
  context: ExecutorContext,
  tsConfigPath: string
): {
  tmpTsConfig: string | null;
  projectRoot: string;
  target: ProjectGraphProjectNode<any>;
  dependencies: DependentBuildableProjectNode[];
} {
  const { target, dependencies, nonBuildableDependencies } =
    calculateProjectDependencies(
      context.projectGraph,
      context.root,
      context.projectName,
      context.targetName,
      context.configurationName
    );
  const projectRoot = target.data.root;

  if (nonBuildableDependencies.length > 0) {
    throw new Error(
      `Buildable libraries can only depend on other buildable libraries. You must define the ${
        context.targetName
      } target for the following libraries: ${nonBuildableDependencies
        .map((t) => `"${t}"`)
        .join(', ')}`
    );
  }

  if (dependencies.length > 0) {
    return {
      tmpTsConfig: createTmpTsConfig(
        tsConfigPath,
        context.root,
        projectRoot,
        dependencies
      ),
      projectRoot,
      target,
      dependencies,
    };
  }

  return {
    tmpTsConfig: null,
    projectRoot,
    target,
    dependencies,
  };
}

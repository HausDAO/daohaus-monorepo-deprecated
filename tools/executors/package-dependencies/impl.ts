import { ExecutorContext, ProjectGraphProjectNode } from '@nrwl/devkit';
import {
  calculateProjectDependencies,
  createTmpTsConfig,
  DependentBuildableProjectNode,
  updateBuildableProjectPackageJsonDependencies,
} from '@nrwl/workspace/src/utilities/buildable-libs-utils';

import { updatePackageJson } from '../../utils/update-package-json';
import { join, resolve } from 'path';
import { checkDependencies } from '../../utils/check-dependencies';

import { convertNxExecutor, Executor } from '@nrwl/devkit';

import { default as viteExecutor } from './executor.impl';

export default convertNxExecutor(viteExecutor as Executor);

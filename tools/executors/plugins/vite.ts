import { defineConfig } from 'vite';
import viteNxProjectPaths from '@nxext/vite/src/executors/utils/nx-project-paths/index.js';

export function defineBaseConfig(workspaceRoot: string) {
  return defineConfig(() => {
    return {
      plugins: [viteNxProjectPaths({ workspaceRoot })],
      build: {
        target: 'esnext',
        commonjsOptions: {
          transformMixedEsModules: true,
        },
      },
    };
  });
}

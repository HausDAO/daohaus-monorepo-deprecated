import * as rollup from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/**
 * @type {import('rollup').RollupOptions}
 */

function getRollupOptions(options: rollup.RollupOptions) {
  const extraGlobals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled',
    '@emotion/react': 'emotionReact',
    '@emotion/styled': 'emotionStyled',
  };
  if (Array.isArray(options.output)) {
    options.output.forEach((o) => {
      o.globals = { ...o.globals, ...extraGlobals };
    });
  } else {
    options.output = {
      ...options.output,
      globals: {
        ...options?.output?.globals,
        ...extraGlobals,
      },
    };
  }
  options.plugins = [nodeResolve()];
  return options;
}

module.exports = getRollupOptions;

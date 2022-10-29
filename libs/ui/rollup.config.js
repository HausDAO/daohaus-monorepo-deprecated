// const rollup = import('rollup');

// module.exports = function rollupOptions(options) {
//   const extraGlobals = {
//     'styled-components': 'styled',
//   };
//   return {
//     ...options,
//     output: {
//       ...options.output,
//       globals: {
//         ...(options?.output as any)?.globals,
//         extraGlobals,
//       },
//     },
//   };
// };

const nrwlConfig = require('@nrwl/react/plugins/bundle-rollup');

module.exports = (config) => {
  console.log('|_____________BASE_CONFIG_____________]');
  const custom = {
    ...config,
    output: {
      ...config.output,
      format: 'umd',
      inlineDynamicImports: true,
      globals: { 'styled-components': 'styled' },
    },
    external: ['react', 'react-dom', 'styled-components'],
  };
  console.log('|_____________WITH_CUSTOM_____________]');
  console.log('custom', custom);

  const nxConfig = nrwlConfig(custom);
  console.log('|_____________NX_CONFIG_____________]');
  console.log('nxConfig', nxConfig);
  return nxConfig;
};

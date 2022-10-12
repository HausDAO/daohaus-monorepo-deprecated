import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      root: '../..',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'daohaus-connect-feature',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'styled-components', 'react-router'],
      // Provide global variables to use in the UMD build
      // for externalized deps
      output: {
        globals: { 'styled-components': 'styled' },
        format: 'umd',
        inlineDynamicImports: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths({
      root: '../..',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'umd',
        inlineDynamicImports: true,
      },
    },
  },
});

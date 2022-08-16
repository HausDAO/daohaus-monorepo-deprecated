import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/

/// <reference types="vite/client" />
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

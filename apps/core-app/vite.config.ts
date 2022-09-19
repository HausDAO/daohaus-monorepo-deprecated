import { defineConfig, splitVendorChunkPlugin } from 'vite';
export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
});

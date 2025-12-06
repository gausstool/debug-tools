import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

export default defineConfig(async () => ({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [nodePolyfills(), vue()],
  clearScreen: false,
  server: {
    port: 1998,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  build: {
    outDir: process.env.VITE_BUILD_DIR || 'dist',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules') || id.includes('.pnpm')) {
            if (id.includes('monaco-editor/esm')) {
              return 'editor';
            }
            if (id.includes('sql-formatter')) {
              return 'sql-formatter';
            }
            if (id.includes('js-base64')) {
              return 'js-base64';
            }
            if (id.includes('/vue') || id.includes('/pinia')) {
              return 'core';
            }
          }
        },
      },
    },
  },
}));

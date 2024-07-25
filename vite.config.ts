import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'src/manifest.json', dest: 'dist' },
        { src: 'src/assets', dest: 'dist' },
      ],
      hook: 'writeBundle',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      input: ['index.html', 'src/background.ts', 'src/contentScript.ts'],
      output: {
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        entryFileNames: '[name].js',
        dir: 'dist',
      },
    },
  },
}))

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  },

  server: {
    proxy: {
      "/api": {
        target: '',
        changeOrigin: true,
        rewrite: path => path.replace("/api/v1", "")
      }
    }
  }
})

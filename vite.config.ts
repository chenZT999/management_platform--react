import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  
})

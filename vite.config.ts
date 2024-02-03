import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: {
      "@": resolve(__dirname, "src"),
      "@img": resolve(__dirname, "src/assets/imgs"),
     }
  },
  
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["pdfmake/build/pdfmake", "pdfmake/build/vfs_fonts"],
  },
  build: {
    chunkSizeWarningLimit: 4000,
  },
  server: {
    middlewareMode: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path,
      }
    }
  }
});

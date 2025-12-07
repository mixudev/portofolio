import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path
  base: './',
  
  // Server configuration
  server: {
    port: 3000,
    open: true, // Auto open browser
    cors: true,
    host: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    open: true
  }
});
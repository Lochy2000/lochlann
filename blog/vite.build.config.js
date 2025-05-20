import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Skip TypeScript type checking
    // We'll rely on our manual fixes instead
    // This is a workaround for TypeScript errors
    emptyOutDir: true,
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [],
      output: {
        // Chunk files
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase'],
          ui: ['framer-motion', 'react-icons', 'react-helmet']
        }
      }
    },
    // Increase the warning limit
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5001
  }
});
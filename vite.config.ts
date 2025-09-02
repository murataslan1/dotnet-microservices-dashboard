import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Match the port specified in the README
    proxy: {
      // Proxy API requests to the Ocelot Gateway to avoid CORS issues in development
      '/catalog': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/orders': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/ai': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
    },
  },
});

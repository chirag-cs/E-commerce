import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/task': {
        target: 'http://stageapi.monkcommerce.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/task/, '/task')
      }
    }
  }
});

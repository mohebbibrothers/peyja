import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project pages, set PEYJA_BASE=/peyja/ in CI.
// Defaults to '/' for local dev / custom-domain deploys.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.PEYJA_BASE || '/';
  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      allowedHosts: true,
    },
    build: {
      chunkSizeWarningLimit: 800,
    },
  };
});

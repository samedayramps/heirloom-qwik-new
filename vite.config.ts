/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */
export default defineConfig({
  plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
  
  // Basic server configuration
  server: {
    headers: {
      "Cache-Control": "no-cache",
    },
  },
  
  // Preview configuration
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600",
    },
  },
  
  // Build configuration
  build: {
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
    // Simplified chunk handling
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Basic minification
    minify: true,
  }
});

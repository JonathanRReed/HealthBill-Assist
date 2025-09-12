import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path for GitHub Pages (set via VITE_BASE in CI). Defaults to "/" for local/dev.
  base: process.env.VITE_BASE || "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Enable React Compiler via Babel plugin
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for production
    sourcemap: mode === "development",
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Better chunk splitting for improved caching
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            return 'vendor';
          }
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500,
  },
  // Performance optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
}));

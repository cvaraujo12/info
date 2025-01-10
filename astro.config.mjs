import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    react({
      experimentalReactChildren: true,
      include: ['**/react/*'],
    }),
    tailwind(),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: true,
      SVG: true
    })
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'chart-vendor': ['chart.js', 'react-chartjs-2'],
            'map-vendor': ['mapbox-gl']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': './src'
      }
    },
    ssr: {
      noExternal: ['react-chartjs-2', 'chart.js']
    }
  },
  prefetch: true,
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
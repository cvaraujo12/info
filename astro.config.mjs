import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import image from '@astrojs/image';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    react({
      experimentalReactChildren: true,
      include: ['**/react/*'],
    }),
    image({
      serviceEntrypoint: '@astrojs/image/sharp',
      cacheDir: './.cache/image',
      logLevel: 'debug'
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
      noExternal: ['react-icons']
    }
  },
  prefetch: true,
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
}); 
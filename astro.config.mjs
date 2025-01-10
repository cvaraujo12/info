import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
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
  adapter: vercel({
    analytics: true,
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    },
    imageService: true,
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920],
      domains: [],
      minimumCacheTTL: 60
    }
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
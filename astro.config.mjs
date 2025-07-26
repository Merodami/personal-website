import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://damianmeroni.dev',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: true,
      js: true,
      svg: true,
      logger: 1,
    }),
  ],
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [tailwind()],
    ssr: {
      noExternal: ['tailwindcss'],
    },
    build: {
      cssCodeSplit: true,
      assetsInlineLimit: 4096, // Inline small CSS files
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[hash][extname]',
          chunkFileNames: 'assets/chunks/[hash].js',
          entryFileNames: 'assets/[hash].js',
          manualChunks: {
            // Group CSS by route to reduce requests
            critical: ['src/styles/base/reset.css', 'src/styles/base/typography.css'],
          },
        },
      },
    },
  },
});

import type { APIRoute } from 'astro';

const pages = [
  '',
  'news',
  'statistics',
  'maps',
  'routes',
  'projects',
  'analysis',
  'about',
  'contact',
  'privacy'
];

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('site is undefined');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${new URL(page, site).href}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}; 
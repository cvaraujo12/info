import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('site is undefined');

  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${new URL('sitemap.xml', site).href}

# Diretórios e arquivos para não indexar
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /*.xml$
Disallow: /*?*

# Crawl-delay
Crawl-delay: 10
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}; 
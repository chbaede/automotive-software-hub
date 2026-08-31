import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://chbaede.github.io/automotive-software-hub';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const routes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'stack', priority: '0.95', changefreq: 'weekly' },
  { path: 'tools', priority: '0.90', changefreq: 'monthly' },
  { path: 'resources', priority: '0.85', changefreq: 'weekly' },
  { path: 'open-source', priority: '0.85', changefreq: 'monthly' },
  { path: 'events', priority: '0.80', changefreq: 'weekly' },
  { path: 'companies', priority: '0.80', changefreq: 'monthly' },
  { path: 'about', priority: '0.70', changefreq: 'monthly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlUrls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}/${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`✅ Generated sitemap.xml at ${sitemapPath} (${routes.length} URLs)`);
}

generateSitemap();

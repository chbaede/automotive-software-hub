import fs from 'fs';
import path from 'path';
import { stackTechnologies } from '../src/data/stackTechnologies';
import { architectureProfiles } from '../src/data/architectureProfiles';
import { CANONICAL_STATIC_ROUTES } from '../src/app/routes';

const SITE_URL = 'https://autohub.yocto.co.kr';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const staticRoutes = CANONICAL_STATIC_ROUTES.map((r) => ({
  path: r.path,
  priority: r.priority,
  changefreq: r.changefreq,
}));

const archRoutes = architectureProfiles.map((arch) => ({
  path: `architectures/${arch.id}`,
  priority: '0.85',
  changefreq: 'weekly',
}));

const techRoutes = stackTechnologies.map((tech) => ({
  path: `stack/${tech.id}`,
  priority: '0.85',
  changefreq: 'weekly',
}));

const routes = [...staticRoutes, ...archRoutes, ...techRoutes];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlUrls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path ? '/' + r.path : '/'}</loc>
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
  console.log(`✅ Generated sitemap.xml at ${sitemapPath} (${routes.length} URLs for ${SITE_URL})`);
}

generateSitemap();

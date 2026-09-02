import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');
const sitemapPath = path.join(distDir, 'sitemap.xml');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found! Could not generate dist/404.html');
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
console.log('✅ Generated dist/404.html SPA fallback for GitHub Pages.');

if (!fs.existsSync(sitemapPath)) {
  const publicSitemap = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, sitemapPath);
    console.log('✅ Synced sitemap.xml to dist/sitemap.xml.');
  } else {
    console.error('❌ public/sitemap.xml not found!');
    process.exit(1);
  }
}

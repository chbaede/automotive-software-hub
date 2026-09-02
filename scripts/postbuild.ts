import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log('✅ Generated dist/404.html SPA fallback for GitHub Pages.');
} else {
  console.error('❌ dist/index.html not found! Could not generate dist/404.html');
  process.exit(1);
}

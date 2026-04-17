import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

const BASE_DIR = new URL('../public/', import.meta.url).pathname;

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function download(url, destPath) {
  if (existsSync(destPath)) {
    console.log(`  SKIP ${destPath} (exists)`);
    return;
  }
  ensureDir(path.dirname(destPath));
  const proto = url.startsWith('https') ? https : http;
  return new Promise((resolve, reject) => {
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        resolve(download(res.headers.location, destPath));
        return;
      }
      if (res.statusCode !== 200) {
        console.error(`  FAIL ${url} => ${res.statusCode}`);
        resolve();
        return;
      }
      const ws = createWriteStream(destPath);
      pipeline(res, ws).then(resolve).catch(reject);
    }).on('error', reject);
  });
}

async function downloadBatch(items, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(({ url, dest }) => {
      console.log(`  GET ${dest}`);
      return download(url, dest).catch(e => console.error(`  ERR ${url}: ${e.message}`));
    }));
  }
}

// ── Assets ──────────────────────────────────────────────────────────────────

const fonts = [
  { url: 'https://www.bareface.com/static/fonts/Radikal/radikal-thin.woff2', dest: `${BASE_DIR}fonts/radikal-thin.woff2` },
  { url: 'https://www.bareface.com/static/fonts/Cassannet/cassannet_plus_bold-webfont.woff2', dest: `${BASE_DIR}fonts/cassannet_plus_bold.woff2` },
  { url: 'https://www.bareface.com/static/fonts/Cassannet/cassannet_plus_regular-webfont.woff2', dest: `${BASE_DIR}fonts/cassannet_plus_regular.woff2` },
];

const logo = [
  { url: 'https://www.bareface.com/static/images/logo.svg', dest: `${BASE_DIR}images/logo.svg` },
];

const heroImages = [
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/052.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/053.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/044.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/054.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/058.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/038.jpg',
  'https://cdn.portfoliopad.com/images/10884/2954998/Xlarge/055.jpg',
].map(url => ({ url, dest: `${BASE_DIR}images/hero/${path.basename(url)}` }));

const featuredImages = [
  { url: 'https://cdn.portfoliopad.com/images/10884/3013298/Xlarge/053.jpg', dest: `${BASE_DIR}images/featured/alicia.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/3028361/Xlarge/025.jpg', dest: `${BASE_DIR}images/featured/ape.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/3013505/Xlarge/019.jpg', dest: `${BASE_DIR}images/featured/bianca.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2972695/Xlarge/024.jpg', dest: `${BASE_DIR}images/featured/camila.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/3028402/Xlarge/061.jpg', dest: `${BASE_DIR}images/featured/cezar.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2972694/Xlarge/028.jpg', dest: `${BASE_DIR}images/featured/izzy.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2970431/Xlarge/043.jpg', dest: `${BASE_DIR}images/featured/luana.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2970992/Xlarge/065.jpg', dest: `${BASE_DIR}images/featured/nathan.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/3013512/Xlarge/058.jpg', dest: `${BASE_DIR}images/featured/van.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2971931/Xlarge/061.jpg', dest: `${BASE_DIR}images/featured/vanessa.jpg` },
  { url: 'https://cdn.portfoliopad.com/images/10884/2971907/Xlarge/077.jpg', dest: `${BASE_DIR}images/featured/vitoria.jpg` },
];

// Instagram images - these are CDN URLs that may expire; using best-effort
// Actual IG images use signed CDN URLs - we capture a few representative ones
const instagramImages = [
  'https://scontent-lhr6-1.cdninstagram.com/v/t51.82787-15/671184968_18583979644015238_1461202043464576',
].map((url, i) => ({ url, dest: `${BASE_DIR}images/instagram/ig_${i + 1}.jpg` }));

console.log('Downloading fonts...');
await downloadBatch(fonts);

console.log('Downloading logo...');
await downloadBatch(logo);

console.log('Downloading hero images...');
await downloadBatch(heroImages);

console.log('Downloading featured model images...');
await downloadBatch(featuredImages);

console.log('Done!');

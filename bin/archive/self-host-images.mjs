// One-time tool: move the changelog's images off the june-changelog S3 bucket and into
// public/images, so the static site has no external image host.
//
// Reads every https://june-changelog.s3.eu-central-1.amazonaws.com/<key> URL in the changelog
// MDX files and team.json, takes <key> from a local copy of the bucket, and writes an optimized
// copy to public/images/<key>: at most 1600px wide, and re-encoded as WebP when that is smaller
// (animated WebP for GIFs). Header images keep their format, since they are also the posts'
// social preview images. Then it points the URLs at /images/<key>.
//
// sharp is not a dependency of the site, so install it first (Node 18.17+ or 20.3+):
//   npm install --no-save sharp
//   node bin/archive/self-host-images.mjs <directory with a copy of the bucket>
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, 'public', 'images');
const BUCKET_URL = /https:\/\/june-changelog\.s3\.eu-central-1\.amazonaws\.com\/([^\s"'()<>]+)/g;
const HEADER_IMAGE = /headerImage:\s*"https:\/\/june-changelog\.s3\.eu-central-1\.amazonaws\.com\/([^"]+)"/g;
// Changelog images are shown in a ~700px column; 1600px covers 2x displays.
const MAX_WIDTH = 1600;

const bucket = process.argv[2];
if (!bucket) {
  console.error('Usage: node bin/archive/self-host-images.mjs <directory with a copy of the bucket>');
  process.exit(1);
}

const changelogs = path.join(ROOT, 'pages', 'changelogs');
const sources = [
  ...fs.readdirSync(changelogs).filter((f) => f.endsWith('.mdx')).map((f) => path.join(changelogs, f)),
  path.join(ROOT, 'team.json'),
];

async function reencode(body, ext, format) {
  // rotate() applies the EXIF orientation, which re-encoding would otherwise drop.
  const image = sharp(body, { animated: ext === '.gif', limitInputPixels: false }).rotate();
  const { width = 0 } = await image.metadata();
  const resized = width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;
  if (format === 'webp') return resized.webp({ quality: ext === '.gif' ? 85 : 90, effort: 4 }).toBuffer();
  if (ext === '.png') return resized.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }).toBuffer();
  if (ext === '.jpg' || ext === '.jpeg') return resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  if (ext === '.gif') return resized.gif().toBuffer();
  return body;
}

/** The smallest acceptable encoding of an image, and the key it is stored under. */
async function optimize(key, isHeader) {
  const body = fs.readFileSync(path.join(bucket, key));
  const ext = path.extname(key).toLowerCase();
  let best = [body, key];
  const consider = (candidate, candidateKey) => {
    if (candidate.length < best[0].length) best = [candidate, candidateKey];
  };
  consider(await reencode(body, ext, ext.slice(1)), key);
  if (!isHeader) consider(await reencode(body, ext, 'webp'), key.replace(/\.[a-z]+$/i, '.webp'));
  return best;
}

async function main() {
  const texts = new Map(sources.map((file) => [file, fs.readFileSync(file, 'utf8')]));
  const keys = new Set();
  const headers = new Set();
  for (const text of texts.values()) {
    for (const [, key] of text.matchAll(BUCKET_URL)) keys.add(key);
    for (const [, key] of text.matchAll(HEADER_IMAGE)) headers.add(key);
  }

  const renamed = new Map();
  let [before, after] = [0, 0];
  for (const key of [...keys].sort()) {
    const [body, outKey] = await optimize(key, headers.has(key));
    const target = path.join(OUT, outKey);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
    renamed.set(key, outKey);
    before += fs.statSync(path.join(bucket, key)).size;
    after += body.length;
  }

  for (const [file, text] of texts) {
    const updated = text.replace(BUCKET_URL, (_, key) => `/images/${renamed.get(key)}`);
    if (updated !== text) fs.writeFileSync(file, updated);
  }
  const mb = (n) => `${(n / 1e6).toFixed(1)} MB`;
  console.log(`${keys.size} images: ${mb(before)} -> ${mb(after)} in ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Post-processing of the static export (`out/`) for GitHub Pages. Runs as part of `yarn build`.
//
// 1. Page/directory collisions: `out/years/2024.html` and `out/years/2024/` both exist. GitHub
//    Pages answers `/years/2024` by redirecting to `/years/2024/`, so the directory gets an
//    index.html copy of the page.
// 2. Old entry URLs: entries used to live at /changelog/<slug>, and links to those are still
//    around. Each entry gets a small HTML page there that forwards to /changelogs/<slug>.
// 3. Guard: fail if any file still references the old S3 bucket (images live in public/images).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const SITE_URL = 'https://changelog.june.so';
const OLD_BUCKET = 'june-changelog.s3.eu-central-1.amazonaws.com';

function redirectPage(destination) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${SITE_URL}${destination}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${destination}">
<script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${destination}">${destination}</a>.</p></body>
</html>
`;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const files = walk(OUT);
let copied = 0;
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const dir = file.slice(0, -'.html'.length);
  const index = path.join(dir, 'index.html');
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory() && !fs.existsSync(index)) {
    fs.copyFileSync(file, index);
    copied++;
  }
}
console.log(`Copied ${copied} pages into directories of the same name`);

const entries = fs.readdirSync(path.join(OUT, 'changelogs')).filter((f) => f.endsWith('.html'));
fs.mkdirSync(path.join(OUT, 'changelog'), { recursive: true });
for (const file of entries) {
  fs.writeFileSync(path.join(OUT, 'changelog', file), redirectPage(`/changelogs/${file.slice(0, -'.html'.length)}`));
}
console.log(`Wrote ${entries.length} redirect pages from /changelog/<slug>`);

const offenders = files.filter((f) => /\.(html|json|xml|js|txt)$/.test(f) && fs.readFileSync(f, 'utf8').includes(OLD_BUCKET));
if (offenders.length) {
  console.error(`These files still reference ${OLD_BUCKET}:\n${offenders.map((f) => `  ${path.relative(OUT, f)}`).join('\n')}`);
  process.exit(1);
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const funcDir = path.resolve(__dirname, '../.vercel/output/functions/__server.func');
const nftFile = path.join(funcDir, 'index.mjs.nft.json');

if (fs.existsSync(funcDir)) {
  const content = {
    version: 1,
    files: [
      "node_modules/tslib/package.json",
      "node_modules/tslib/tslib.js",
      "node_modules/tslib/tslib.es6.js",
      "node_modules/tslib/tslib.es6.mjs",
      "package.json"
    ]
  };
  fs.writeFileSync(nftFile, JSON.stringify(content, null, 2));
  console.log('✅ Successfully injected .nft.json trace to preserve tslib on Vercel.');
} else {
  console.warn('⚠️ Vercel output directory not found, skipping trace injection.');
}

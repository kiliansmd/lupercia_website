import { readFile } from 'node:fs/promises';

const encodedLogo = await readFile(new URL('../assets/lupercia-logo.png.base64', import.meta.url), 'utf8');
const logo = Buffer.from(encodedLogo.replaceAll(/\s/g, ''), 'base64');
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

if (!logo.subarray(0, 8).equals(pngSignature)) {
  throw new Error('Logo source does not decode to a PNG file.');
}

const width = logo.readUInt32BE(16);
const height = logo.readUInt32BE(20);
const bitDepth = logo[24];
const colorType = logo[25];

if (width !== 1024 || height !== 1024 || bitDepth !== 8 || colorType !== 6) {
  throw new Error(`Expected a transparent 1024×1024 RGBA PNG, received ${width}×${height}, depth ${bitDepth}, color type ${colorType}.`);
}

console.log('Logo asset: OK (transparent 1024×1024 RGBA PNG, text-only source)');

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

if (width !== 1254 || height !== 1254 || bitDepth !== 8 || colorType !== 2) {
  throw new Error(`Expected the white-backed 1254×1254 RGB PNG, received ${width}×${height}, depth ${bitDepth}, color type ${colorType}.`);
}

console.log('Logo asset: OK (white-backed 1254×1254 RGB PNG, text-only source)');

const heroImages = new Map([
  ['lupercia-fensterplatz.png', [765, 1020]],
  ['lupercia-schaufenster.png', [742, 1020]],
]);

for (const [image, [expectedWidth, expectedHeight]] of heroImages) {
  const encodedImage = await readFile(new URL(`../assets/images/${image}.base64`, import.meta.url), 'utf8');
  const imageData = Buffer.from(encodedImage.replaceAll(/\s/g, ''), 'base64');

  if (!imageData.subarray(0, 8).equals(pngSignature)) {
    throw new Error(`${image} source does not decode to a PNG file.`);
  }

  const imageWidth = imageData.readUInt32BE(16);
  const imageHeight = imageData.readUInt32BE(20);
  if (imageWidth !== expectedWidth || imageHeight !== expectedHeight) {
    throw new Error(`Expected ${image} to be ${expectedWidth}×${expectedHeight}, received ${imageWidth}×${imageHeight}.`);
  }
}

console.log('Hero assets: OK (2 portrait PNGs, text-only sources)');

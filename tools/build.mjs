import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const outputDirectory = new URL('../dist/', import.meta.url);
const sourceDirectory = new URL('../', import.meta.url);

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(new URL('assets/images/', outputDirectory), { recursive: true });

for (const file of ['index.html', 'styles.css', 'script.js']) {
  await cp(new URL(file, sourceDirectory), new URL(file, outputDirectory));
}

for (const directory of ['content', 'tee-genuss', 'veranstaltungen', 'maria', 'salon']) {
  await cp(new URL(`${directory}/`, sourceDirectory), new URL(`${directory}/`, outputDirectory), { recursive: true });
}

for (const asset of ['hero-tea-salon.svg']) {
  await cp(new URL(`assets/${asset}`, sourceDirectory), new URL(`assets/${asset}`, outputDirectory));
}

// Keep Git text-only: PNG files are stored as Base64 sources and only
// materialized in the generated, ignored deployment directory.
const encodedLogo = await readFile(new URL('../assets/lupercia-logo.png.base64', import.meta.url), 'utf8');
await writeFile(new URL('assets/lupercia-logo.png', outputDirectory), Buffer.from(encodedLogo.replaceAll(/\s/g, ''), 'base64'));

for (const image of ['lupercia-fensterplatz.png', 'lupercia-schaufenster.png']) {
  const encodedImage = await readFile(new URL(`../assets/images/${image}.base64`, import.meta.url), 'utf8');
  await writeFile(new URL(`assets/images/${image}`, outputDirectory), Buffer.from(encodedImage.replaceAll(/\s/g, ''), 'base64'));
}

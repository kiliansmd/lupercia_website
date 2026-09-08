import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// TECH-01/TECH-02: Das Logo war 1,5 MB gross, die Schriften 1,1 MB unkomprimiertes TTF.
const root = new URL('../assets/', import.meta.url).pathname;
const limits = [
  [/^lupercia-logo\.webp$/, 32 * 1024, 'TECH-01 Logo'],
  [/^favicon\.png$/, 16 * 1024, 'TECH-01 Favicon'],
  [/\.woff2$/, 96 * 1024, 'TECH-02 Schriftschnitt'],
  [/\.(webp|png|jpg)$/, 480 * 1024, 'Foto'],
];
const fail = [];
let checked = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { await walk(full); continue; }
    if (/\.(ttf|otf|eot)$/.test(entry.name)) {
      fail.push(`TECH-02: ${entry.name} — unkomprimiertes Schriftformat, WOFF2 erwartet.`);
      continue;
    }
    const rule = limits.find(([pattern]) => pattern.test(entry.name));
    if (!rule) continue;
    const { size } = await stat(full);
    checked += 1;
    if (size > rule[1]) {
      fail.push(`${rule[2]}: ${entry.name} ist ${Math.round(size / 1024)} KB, erlaubt sind ${Math.round(rule[1] / 1024)} KB.`);
    }
  }
}
await walk(root);

if (fail.length) {
  console.error('Asset-Check fehlgeschlagen:\n  - ' + fail.join('\n  - '));
  process.exit(1);
}
console.log(`Assets: OK (${checked} Dateien innerhalb der Budgets)`);

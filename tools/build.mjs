import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';

// Die Seite ist statisches HTML/CSS/JS. Der Build kopiert den Quellbaum nach
// dist/ und versieht styles.css und script.js mit einem Inhalts-Hash im
// Dateinamen. Ohne den halten Browser nach einem Deploy ein altes Stylesheet
// zu neuem HTML - genau das hatte die Geschenkbox-Seite zerlegt. Mit Hash
// aendert sich bei jeder Aenderung die URL, und die Dateien duerfen dauerhaft
// gecacht werden.
const out = new URL('../dist/', import.meta.url);
const src = new URL('../', import.meta.url);

await rm(out, { force: true, recursive: true });
await mkdir(out, { recursive: true });

const hashed = new Map();
for (const file of ['styles.css', 'script.js']) {
  const body = await readFile(new URL(file, src));
  const hash = createHash('sha256').update(body).digest('hex').slice(0, 8);
  const [name, ext] = file.split('.');
  const target = `${name}.${hash}.${ext}`;
  await writeFile(new URL(target, out), body);
  hashed.set(`/${file}`, `/${target}`);
}

for (const dir of ['assets', 'salon', 'tee-genuss', 'veranstaltungen', 'geschenkbox', 'maria', 'impressum', 'datenschutz']) {
  await cp(new URL(`${dir}/`, src), new URL(`${dir}/`, out), { recursive: true });
}
await cp(new URL('index.html', src), new URL('index.html', out));

// Verweise in allen ausgelieferten Seiten auf die gehashten Namen umschreiben.
async function* pages(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const child = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, dir);
    if (entry.isDirectory()) yield* pages(child);
    else if (entry.name.endsWith('.html')) yield child;
  }
}
let rewritten = 0;
for await (const page of pages(out)) {
  let html = await readFile(page, 'utf8');
  const before = html;
  for (const [from, to] of hashed) html = html.replaceAll(`"${from}"`, `"${to}"`);
  if (html !== before) { await writeFile(page, html); rewritten += 1; }
}

console.log(`Build: dist/ erstellt, ${hashed.size} Dateien gehasht, ${rewritten} Seiten umgeschrieben.`);

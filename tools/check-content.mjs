import { readFile } from 'node:fs/promises';

// INHALT-01/02 und TYPO-03: Inhaltliche Zusagen, die das Audit eingefordert hat.
const pages = ['index.html', 'salon/index.html', 'tee-genuss/index.html',
  'veranstaltungen/index.html', 'geschenkbox/index.html', 'maria/index.html',
  'impressum/index.html', 'datenschutz/index.html'];
// Impressum und Datenschutz tragen bewusst den reduzierten Header ohne Hauptnavigation.
const legalPages = new Set(['impressum/index.html', 'datenschutz/index.html']);
const nav = ['/salon/', '/tee-genuss/', '/veranstaltungen/', '/geschenkbox/', '/maria/'];
const fail = [];

for (const page of pages) {
  const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');

  if (!legalPages.has(page)) {
    for (const href of nav) {
      if (!html.includes(`href="${href}"`)) fail.push(`${page}: Navigationsziel ${href} fehlt.`);
    }
  }
  // INHALT-02: ein tel:-Link darf nicht als Reservierung beschriftet sein.
  if (/>\s*Tisch reservieren\s*</.test(html)) {
    fail.push(`${page}: INHALT-02 — "Tisch reservieren" beschriftet einen tel:-Link, der keine Buchung ausloest.`);
  }
  // TECH-01/TECH-02: keine Rueckkehr der schweren Assets.
  for (const stale of ['lupercia-logo.png', 'Cinzel.ttf', 'Fraunces.ttf', 'SourceSans3.ttf', 'schaufenster.png']) {
    if (html.includes(stale)) fail.push(`${page}: veraltetes Asset ${stale} referenziert.`);
  }
}

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
// INHALT-01: Adresse und Oeffnungszeiten muessen oberhalb des Footers stehen.
const beforeFooter = home.slice(0, home.indexOf('<footer'));
for (const [id, needle] of [['Adresse', 'Argelanderstraße 75'], ['Öffnungszeiten', '11:00–19:00'], ['Telefon', 'tel:+4915167970350']]) {
  if (!beforeFooter.includes(needle)) fail.push(`INHALT-01: ${id} fehlt im Besuchsblock vor dem Footer.`);
}
// TYPO-03: jede Sektion der Startseite braucht ihr Label.
const sections = (home.match(/<section /g) || []).length;
const eyebrows = (home.match(/class="eyebrow"/g) || []).length;
if (eyebrows < sections) fail.push(`TYPO-03: ${eyebrows} Eyebrows fuer ${sections} Sektionen.`);

if (fail.length) {
  console.error('Content-Check fehlgeschlagen:\n  - ' + fail.join('\n  - '));
  process.exit(1);
}
console.log(`Content: OK (${pages.length} Seiten, ${sections} Sektionen, ${eyebrows} Eyebrows)`);

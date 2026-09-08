import { readFile } from 'node:fs/promises';

// Sichert die Befunde des Designaudits vom 26.08.2026 als Regressionstest ab.
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const fail = [];

const mustContain = [
  ['RASTER-01', 'ein gemeinsames Spaltenverhaeltnis als Token', '--split:'],
  ['RAUM-03', 'eigener Blockabstand neben dem Sektionsabstand', '--block-y:'],
  ['TYPO-02', 'eigene Groesse fuer die Ankerueberschrift', '--step-h2-anchor:'],
  ['TYPO-03', 'Eyebrow-Ebene vorhanden', '.eyebrow {'],
  ['FARBE-01', 'dunkle Flaeche als Rhythmusbruch', '.surface-dark {'],
  ['NAV-01', 'Layout und Navigation schalten bei derselben Breite', '@media (min-width: 56rem)'],
];
for (const [id, why, needle] of mustContain) {
  if (!css.includes(needle)) fail.push(`${id}: ${why} — "${needle}" fehlt.`);
}

const mustNotContain = [
  // Fotos in einer Rasterspalte muessen die Spalte fuellen. Die Zaesur zentriert
  // bewusst - sie hat keine zweite Spalte, gegen die sie verrutschen koennte.
  ['RASTER-02', 'Spaltenfotos duerfen nicht in ihrer Spalte zentriert werden', 'justify-self: center; overflow: hidden'],
  ['RAUM-01', 'Text und Bild starten an derselben Oberkante', 'align-items: center; gap: var(--layout-gap)'],
  ['RAUM-02', 'keine feste Mindesthoehe, die die Nachbarspalte aufreisst', 'min-height: 40rem'],
  ['NAV-01', 'kein zweiter, spaeterer Navigations-Breakpoint', '@media (min-width: 72rem)'],
  ['TECH-02', 'Schriften werden als WOFF2 ausgeliefert, nicht als TTF', 'format("truetype'],
];
for (const [id, why, needle] of mustNotContain) {
  if (css.includes(needle)) fail.push(`${id}: ${why} — "${needle}" ist zurueck.`);
}

// RASTER-01: es darf kein zweites Spaltenverhaeltnis neben --split geben.
// Ein redaktioneller Zweispalter ist ein Paar rein fraktionaler Spalten ohne rem-Boden.
// Label-Innenraster (minmax(9rem, ...)) und Kopf-/Fusszeilen sind bewusst anders.
const ratios = [...css.matchAll(/grid-template-columns:\s*minmax\(0,\s*[\d.]+fr\)\s*minmax\(0,\s*[\d.]+fr\)\s*;/g)].map((m) => m[0]);
const offenders = ratios;
if (offenders.length) {
  fail.push(`RASTER-01: ${offenders.length} eigenes Spaltenverhaeltnis neben --split:\n    ` + offenders.join('\n    '));
}

if (fail.length) {
  console.error('Styles-Check fehlgeschlagen:\n  - ' + fail.join('\n  - '));
  process.exit(1);
}
console.log(`Styles: OK (${mustContain.length} geforderte, ${mustNotContain.length} verbotene Muster, 0 abweichende Zweispalter)`);

import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

const requiredPatterns = [
  ['design tokens', ':root'],
  ['brand gold token', '--color-gold'],
  ['soft brand gold token', '--color-gold-soft'],
  ['brand logo', '.brand-logo'],
  ['mobile baseline', '.site-header'],
  ['tablet breakpoint', '@media (min-width: 48rem)'],
  ['desktop breakpoint', '@media (min-width: 64rem)'],
  ['reduced motion', '@media (prefers-reduced-motion: reduce)'],
  ['primary button', '.button--primary'],
  ['secondary button', '.button--secondary'],
  ['text link', '.text-link'],
  ['scrolled header', '.site-header.is-scrolled'],
  ['footer component', '.site-footer'],
  ['hero media', '.hero-media'],
  ['editorial products', '.product-editorial'],
  ['event list', '.event-list'],
  ['tea enjoyment hero', '.tea-hero'],
  ['tea families', '.tea-families'],
  ['mate editorial', '.mate-editorial'],
  ['events hero', '.events-hero'],
  ['event system cards', '.event-system-card'],
  ['Maria story hero', '.maria-hero'],
  ['Maria portrait', '.maria-portrait'],
  ['salon hero', '.salon-hero'],
  ['room photography placeholder', '.room-photo-placeholder'],
  ['balanced headings', 'text-wrap: balance'],
  ['selection color', '::selection'],
];

const missing = requiredPatterns
  .filter(([, pattern]) => !css.includes(pattern))
  .map(([label]) => label);

const openingBraces = (css.match(/{/g) ?? []).length;
const closingBraces = (css.match(/}/g) ?? []).length;

if (openingBraces !== closingBraces) {
  missing.push(`balanced CSS blocks (${openingBraces} opening, ${closingBraces} closing)`);
}

if (missing.length) {
  console.error(`Design-system check failed: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Design-system structure: OK (mobile, tablet, desktop, reduced motion)');

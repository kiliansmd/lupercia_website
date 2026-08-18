import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

const requiredPatterns = [
  ['design tokens', ':root'],
  ['humanist sans-serif display typography', '--font-display: "Source Sans 3"'],
  ['compact reading width', '--copy-max: 34rem'],
  ['restrained border color', '--color-line: rgb(50 31 23 / 10%)'],
  ['brand gold token', '--color-gold'],
  ['soft brand gold token', '--color-gold-soft'],
  ['light sage wash', '--color-sage-wash'],
  ['light peach wash', '--color-peach-wash'],
  ['warm deep contrast', '--color-deep-warm'],
  ['maximum container width', '--container-max'],
  ['small radius token', '--radius-small'],
  ['media shadow token', '--shadow-media'],
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
  ['line-led featured event', 'border-top: 2px solid var(--color-burgundy)'],
  ['typographic pending action', '.event-action { display: inline-flex'],
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

if (/(?:Georgia|Times New Roman|Cormorant(?: Garamond)?|(?:^|[,\s])serif\b)/im.test(css)) {
  missing.push('serif-free typography');
}

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

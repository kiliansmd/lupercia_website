import { readFile } from 'node:fs/promises';
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const required = [':root','--paper: #f3eee4','--paper-deep: #e9e0d0','--ink: #241b15','--ink-soft: #6b5c52','--tea-green: #2c3a2b','--seal-gold: #b08a3c','@font-face','"Lupercia Serif"','--tracking-display: -0.015em','--leading-display: 1.02','.gift-label','.tea-daily','.button--primary','.instagram-grid','@media (prefers-reduced-motion:reduce)'];
const missing=required.filter((pattern)=>!css.includes(pattern));
if (missing.length) throw new Error(`Design system missing: ${missing.join(', ')}`);
if ((css.match(/{/g)??[]).length !== (css.match(/}/g)??[]).length) throw new Error('Unbalanced CSS blocks.');
console.log('Design-system structure: OK (six-color identity, local typography, responsive label components)');

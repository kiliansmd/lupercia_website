const root = document.documentElement;
const viewportCanResizeFreely = window.matchMedia('(hover: hover) and (pointer: fine)');
let measuredViewportWidth = 0;
let viewportResizeFrame;

const syncInitialViewport = ({ force = false } = {}) => {
  const viewport = window.visualViewport;
  const width = viewport?.width ?? window.innerWidth;
  const height = viewport?.height ?? window.innerHeight;
  const widthChanged = Math.abs(width - measuredViewportWidth) > 1;
  root.style.setProperty('--dynamic-viewport', `${Math.round(height * 100) / 100}px`);
  if (!force && !viewportCanResizeFreely.matches && !widthChanged) return;

  root.style.setProperty('--initial-viewport', `${Math.round(height * 100) / 100}px`);
  measuredViewportWidth = width;
};

const scheduleViewportSync = () => {
  window.cancelAnimationFrame(viewportResizeFrame);
  viewportResizeFrame = window.requestAnimationFrame(() => syncInitialViewport());
};

syncInitialViewport({ force: true });
window.addEventListener('pageshow', () => {
  syncInitialViewport({ force: true });
});
window.addEventListener('resize', scheduleViewportSync, { passive: true });
window.visualViewport?.addEventListener('resize', scheduleViewportSync, { passive: true });

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-navigation');
const pageRegions = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);

const closeMenu = ({ restoreFocus = false } = {}) => {
  header.classList.remove('open');
  document.body.classList.remove('menu-open');
  pageRegions.forEach((region) => { region.inert = false; });
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menü öffnen');
  if (restoreFocus) menuButton.focus();
};

const openMenu = () => {
  header.classList.add('open');
  document.body.classList.add('menu-open');
  pageRegions.forEach((region) => { region.inert = true; });
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Menü schließen');
  navigation.querySelector('a')?.focus();
};

menuButton.addEventListener('click', () => {
  if (header.classList.contains('open')) closeMenu({ restoreFocus: true });
  else openMenu();
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('open')) closeMenu({ restoreFocus: true });
  if (event.key !== 'Tab' || !header.classList.contains('open')) return;

  const focusable = [...header.querySelectorAll('a[href], button:not([disabled])')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

window.matchMedia('(min-width: 72rem)').addEventListener('change', ({ matches }) => {
  if (matches && header.classList.contains('open')) closeMenu();
});

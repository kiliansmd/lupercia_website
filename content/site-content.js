/**
 * Zentrale, frameworkunabhängige Content-Struktur für die nächsten Ausbauschritte.
 * Noch nicht verfügbare Ziele werden ausdrücklich als solche modelliert.
 */
export const siteContent = Object.freeze({
  brand: {
    name: 'Lupercia',
    claim: 'Tee · Zeit · Lieblingssorten',
  },
  navigation: [
    { label: 'Tees', href: '#tees' },
    { label: 'Geschichte', href: '#geschichte' },
    { label: 'Mate', href: '#mate' },
    { label: 'Besuch', href: '#besuch' },
  ],
  teaCategories: [
    { id: 'black', name: 'Schwarzer Tee', profile: ['kräftig', 'malzig', 'klassisch'] },
    { id: 'green', name: 'Grüner Tee', profile: ['frisch', 'fein', 'vielschichtig'] },
    { id: 'herbal-fruit', name: 'Kräuter & Früchte', profile: ['wohltuend', 'duftend', 'bunt'] },
    { id: 'white-oolong', name: 'Weißer & Oolong Tee', profile: ['sanft', 'floral', 'besonders'] },
    { id: 'mate', name: 'Mate', profile: ['charaktervoll', 'belebend', 'Lupercia'], featured: true },
  ],
  contact: {
    phone: { label: 'Telefon', href: null, status: 'coming-soon' },
    email: { label: 'E-Mail', href: null, status: 'coming-soon' },
  },
  links: {
    instagram: { label: 'Instagram', href: null, status: 'coming-soon' },
    imprint: { label: 'Impressum', href: null, status: 'coming-soon' },
    privacy: { label: 'Datenschutz', href: null, status: 'coming-soon' },
  },
});

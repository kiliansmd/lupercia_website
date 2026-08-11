/**
 * Zentrale, frameworkunabhängige Inhalte der Lupercia-Startseite.
 * Unbestätigte oder noch nicht verfügbare Angebote sind explizit modelliert.
 */
export const siteContent = Object.freeze({
  brand: {
    name: 'Lupercia',
    claim: 'Tee. Genuss. Begegnung.',
    location: 'Bonn · Südstadt',
  },
  locale: {
    current: 'de',
    available: ['de'],
    planned: ['en', 'es'],
  },
  navigation: [
    { id: 'salon', label: 'Salon', href: '#salon', status: 'available' },
    { id: 'tea', label: 'Tee & Genuss', href: '#tee-genuss', status: 'available' },
    { id: 'events', label: 'Veranstaltungen', href: '#veranstaltungen', status: 'available' },
    { id: 'maria', label: 'Maria', href: '#maria', status: 'available' },
    { id: 'gift-box', label: 'Geschenkbox', href: '#geschenkbox', status: 'coming-soon' },
    { id: 'visit', label: 'Besuch', href: '#besuch', status: 'available' },
  ],
  teaOfTheDay: {
    name: null,
    origin: null,
    flavorProfile: [],
    image: null,
    active: false,
    fallback: 'Die heutige Auswahl erfahren Sie direkt im Salon.',
  },
  productWorld: [
    {
      id: 'tea',
      eyebrow: '01 — Tee',
      title: 'Tee ist unser Mittelpunkt.',
      text: 'Bio-Tee sowie ausgewählte Schwarz-, Grün-, Weiß-, Kräuter-, Früchte- und weitere Tees.',
    },
    {
      id: 'mate',
      eyebrow: '02 — Mate aus Argentinien',
      title: 'Ein Stück Argentinien in Bonn.',
      text: 'Unsere Welt beginnt beim Tee. Und manchmal führt sie bis nach Argentinien.',
    },
    {
      id: 'tableware',
      eyebrow: '03 — Geschirr',
      title: 'Für die Tea Time zu Hause.',
      text: 'Kuratiertes Geschirr, insbesondere von europäischen Herstellern aus England und Deutschland.',
    },
    {
      id: 'delicacies',
      eyebrow: '04 — Feinkost',
      title: 'Was zu gutem Tee gehört.',
      text: 'Scones mit Clotted Cream, argentinisches Gebäck, Sandwiches, Marmelade und hausgemachter Kuchen.',
    },
  ],
  salonOffer: [
    { label: 'Warmer Tee', priority: 'primary', status: 'available' },
    { label: 'Eistee', priority: 'primary', status: 'available' },
    { label: 'Alkoholfreie Tea Cocktails', priority: 'primary', status: 'available' },
    { label: 'Tea Time', priority: 'primary', status: 'available' },
    { label: 'Coffee', priority: 'secondary', status: 'available' },
    { label: 'Frühstück', priority: 'secondary', status: 'coming-soon' },
  ],
  events: [
    {
      id: 'tea-circle',
      title: 'Lupercias Teerunde',
      date: 'Ein- bis zweimal pro Woche',
      summary: 'Ein Tisch. Eine Kanne Tee. Neue Begegnungen.',
      description: 'Maria lädt zu einer offenen Teerunde ein – zum Kennenlernen, Austauschen und gemeinsamen Teetrinken.',
      status: 'recurring',
      featured: true,
    },
    {
      id: 'women-tea-time',
      title: 'Tea Time unter Frauen',
      date: 'Termine folgen',
      summary: 'Von einer Frau für Frauen.',
      description: 'Ein entspannter Nachmittag für Gespräche, Begegnungen und guten Tee.',
      status: 'coming-soon',
    },
    {
      id: 'tango-tea',
      title: 'Tango & Tea',
      date: '18. August',
      summary: 'Argentinische Kultur trifft Tea Time.',
      description: 'Ein besonderer Nachmittag mit Tango und gemeinsamem Tee.',
      status: 'announced',
    },
    {
      id: 'tastings',
      title: 'Verkostungen & Workshops',
      date: 'Termine folgen',
      summary: 'Tee verstehen und gemeinsam probieren.',
      description: '',
      status: 'coming-soon',
    },
    {
      id: 'tea-books',
      title: 'Leserunden · Tea & Books',
      date: 'Termine folgen',
      summary: 'Geschichten, Gespräche und eine Kanne Tee.',
      description: '',
      status: 'coming-soon',
    },
    {
      id: 'winter-seminars',
      title: 'Winterseminare',
      date: 'Termine folgen',
      summary: 'Vertiefende Teemomente in der kalten Jahreszeit.',
      description: '',
      status: 'coming-soon',
    },
  ],
  quality: {
    certifications: [],
    certificationStatus: 'not-published',
  },
  visit: {
    address: { value: null, status: 'coming-soon' },
    openingHours: { value: null, status: 'coming-soon' },
    phone: { label: 'Telefon', href: null, status: 'coming-soon' },
    email: { label: 'E-Mail', href: null, status: 'coming-soon' },
    reservation: { href: null, status: 'coming-soon' },
    map: { embed: null, status: 'not-configured' },
  },
  links: {
    instagram: { label: 'Instagram', href: null, status: 'coming-soon' },
    imprint: { label: 'Impressum', href: null, status: 'coming-soon' },
    privacy: { label: 'Datenschutz', href: null, status: 'coming-soon' },
  },
});

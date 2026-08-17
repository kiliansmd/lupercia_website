import { siteContent } from '../content/site-content.js';

const expectedNavigation = ['Salon', 'Tee & Genuss', 'Veranstaltungen', 'Maria', 'Geschenkbox', 'Besuch'];
const requiredEventFields = ['slug', 'title', 'category', 'date', 'time', 'description', 'shortDescription', 'image', 'status', 'bookingType', 'featured'];
const slugs = new Set();

if (siteContent.navigation.map(({ label }) => label).join('|') !== expectedNavigation.join('|')) {
  throw new Error('Primary navigation does not match the information architecture.');
}

for (const event of siteContent.events) {
  const missing = requiredEventFields.filter((field) => !(field in event));
  if (missing.length) throw new Error(`${event.title ?? 'Event'} is missing: ${missing.join(', ')}`);
  if (!siteContent.eventSystem.categories.includes(event.category)) throw new Error(`Unsupported event category: ${event.category}`);
  if (!siteContent.eventSystem.statuses.includes(event.status)) throw new Error(`Unsupported event status: ${event.status}`);
  if (slugs.has(event.slug)) throw new Error(`Duplicate event slug: ${event.slug}`);
  slugs.add(event.slug);
}

const expectedActions = ['Tisch reservieren', 'Event ansehen', 'Event anmelden', 'Geschenkbox anfragen', 'Lupercia besuchen'];
const actualActions = [siteContent.conversionActions.reservation.label, siteContent.conversionActions.event.viewLabel, siteContent.conversionActions.event.bookingLabel, siteContent.conversionActions.giftBox.label, siteContent.conversionActions.visit.label];

if (siteContent.locale.available.length !== 1 || siteContent.productWorld.length !== 4 || siteContent.teaEnjoyment.teaFamilies.length < 5 || siteContent.teaEnjoyment.delicacies.length !== 5 || typeof siteContent.teaOfTheDay.active !== 'boolean' || siteContent.maria.roles.length !== 4 || siteContent.salonVisit.map.consentRequired !== true || actualActions.join('|') !== expectedActions.join('|')) {
  throw new Error('Core content model is incomplete.');
}

if (siteContent.salonVisit.address.status !== 'available' || siteContent.salonVisit.openingHours.status !== 'available' || siteContent.salonVisit.phone.href !== 'tel:+4915167970350' || siteContent.links.instagram.href !== 'https://www.instagram.com/lupercia.de/') {
  throw new Error('Published visit and social details are incomplete.');
}

console.log(`Content model: OK (${siteContent.events.length} events, ${siteContent.eventSystem.categories.length} categories)`);

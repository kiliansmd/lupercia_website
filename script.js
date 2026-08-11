import { siteContent } from './content/site-content.js';

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-navigation');

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

const closeMenu = ({ restoreFocus = false } = {}) => {
  header.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menü öffnen');
  if (restoreFocus) menuButton.focus();
};

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('open')) closeMenu({ restoreFocus: true });
});

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const renderTeaOfTheDay = () => {
  const target = document.querySelector('[data-today-tea]');
  if (!target) return;
  const tea = siteContent.teaOfTheDay;
  target.replaceChildren();

  if (!tea.active) {
    target.append(element('span', '', 'Heutige Auswahl'), element('strong', '', tea.fallback));
    return;
  }

  target.append(
    element('span', '', [tea.origin, ...tea.flavorProfile].filter(Boolean).join(' · ')),
    element('strong', '', tea.name),
  );
};

const renderNextEvent = () => {
  const target = document.querySelector('[data-next-event]');
  if (!target) return;
  const nextEvent = siteContent.events.find(({ status }) => status === 'upcoming') ?? siteContent.events[0];
  target.replaceChildren(element('h3', '', nextEvent.title), element('p', '', nextEvent.date ?? 'Weitere Termine folgen.'));
};

const renderProductWorld = () => {
  const target = document.querySelector('[data-product-world]');
  if (!target) return;
  const classNames = { tea: 'tea', mate: 'mate', tableware: 'tableware', delicacies: 'food' };

  target.replaceChildren(...siteContent.productWorld.map((product) => {
    const article = element('article', `product-story product-story--${classNames[product.id]}`);
    article.append(
      element('p', 'eyebrow', product.eyebrow),
      element('h3', '', product.title),
      element('p', '', product.text),
    );
    return article;
  }));
};

const renderSalonOffer = () => {
  const target = document.querySelector('[data-salon-offer]');
  if (!target) return;
  target.replaceChildren(...siteContent.salonOffer.map((offer, index) => {
    const classes = [offer.priority === 'secondary' ? 'is-secondary' : '', offer.status === 'coming-soon' ? 'is-coming' : ''].filter(Boolean).join(' ');
    const item = element('li', classes);
    item.append(element('span', '', String(index + 1).padStart(2, '0')), document.createTextNode(offer.label));
    if (offer.status === 'coming-soon') item.append(element('small', '', 'demnächst'));
    return item;
  }));
};

const renderEvents = () => {
  const target = document.querySelector('[data-events]');
  if (!target) return;
  target.replaceChildren(...siteContent.events.map((event) => {
    const isDetailed = event.featured || event.description;
    const article = element('article', `event${event.featured ? ' event--featured' : ''}${isDetailed ? '' : ' event--compact'}`);

    if (!isDetailed) {
      article.append(element('h3', '', event.title), element('span', '', event.date));
      return article;
    }

    const heading = element('div');
    heading.append(element('p', 'eyebrow', event.date ?? event.recurrence ?? 'Weitere Termine folgen.'), element('h3', '', event.title));
    const detail = element('div');
    if (event.shortDescription) detail.append(element(event.featured ? 'strong' : 'p', '', event.shortDescription));
    if (event.description) detail.append(element('p', '', event.description));
    article.append(heading, detail);
    return article;
  }));
};

const renderTeaFamilies = () => {
  const target = document.querySelector('[data-tea-families]');
  if (!target) return;

  target.replaceChildren(...siteContent.teaEnjoyment.teaFamilies.map((family) => {
    const article = element('article');
    article.append(element('h3', '', family.name), element('p', '', family.note));
    return article;
  }));
};

const renderDelicacies = () => {
  const target = document.querySelector('[data-delicacies]');
  if (!target) return;
  target.replaceChildren(...siteContent.teaEnjoyment.delicacies.map((item) => element('li', '', item)));
};

const createEventArticle = (event, modifier = '') => {
  const article = element('article', `event-system-card${modifier ? ` ${modifier}` : ''}`);
  article.dataset.eventSlug = event.slug;
  const meta = element('p', 'eyebrow', [event.category, event.date ?? event.recurrence ?? 'Weitere Termine folgen.', event.time].filter(Boolean).join(' · '));
  const heading = element('h3', '', event.title);
  const summary = element('p', '', event.shortDescription);
  const status = element('span', `event-status event-status--${event.status}`, event.status === 'upcoming' ? 'Kommender Termin' : event.status === 'sold-out' ? 'Ausgebucht' : event.status === 'past' ? 'Vergangen' : 'Weitere Termine folgen');
  article.append(meta, heading, summary, status);
  return article;
};

const renderEventPage = () => {
  const nextTarget = document.querySelector('[data-featured-event]');
  const upcomingTarget = document.querySelector('[data-upcoming-events]');
  const recurringTarget = document.querySelector('[data-recurring-events]');
  if (!nextTarget && !upcomingTarget && !recurringTarget) return;

  const upcoming = siteContent.events.filter(({ status }) => status === 'upcoming');
  const recurring = siteContent.events.filter(({ recurrence }) => recurrence);
  const nextEvent = upcoming.find(({ featured }) => featured) ?? upcoming[0];

  if (nextTarget) nextTarget.replaceChildren(nextEvent ? createEventArticle(nextEvent, 'event-system-card--featured') : element('p', 'event-empty', 'Weitere Termine folgen.'));
  if (upcomingTarget) upcomingTarget.replaceChildren(...(upcoming.length ? upcoming.map((event) => createEventArticle(event)) : [element('p', 'event-empty', 'Weitere Termine folgen.') ]));
  if (recurringTarget) recurringTarget.replaceChildren(...recurring.map((event) => createEventArticle(event)));
};

renderTeaOfTheDay();
renderNextEvent();
renderProductWorld();
renderSalonOffer();
renderEvents();
renderTeaFamilies();
renderDelicacies();
renderEventPage();

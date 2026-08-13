export const SITE_URL = 'https://wilde-muschel.vercel.app';
export const SITE_NAME = 'Wilde Muschel';

export const PAGE_META = {
  landing: {
    name: 'Landing',
    title: 'Landing 18+ | Wilde Muschel Podcast',
    description:
      'Wilde Muschel Landing: 18+ Eintritt zum St. Pauli Podcast. Wilde Guschel über ihre Muschel.',
  },
  home: {
    name: 'Home',
    title: 'Home | Wilde Muschel — St. Pauli Podcast',
    description:
      'Wilde Muschel Home: 18+ Real Talk vom Kiez. Podcast mit Sex-Stories, Freier-Anekdoten und Hamburger Schnauze.',
  },
  ueber: {
    name: 'Über',
    title: 'Über Wilde Muschel | St. Pauli Podcast',
    description:
      'Wer ist die Wilde Muschel? 47, St. Pauli Original, ungeschminkte Geschichten vom Rotlicht und der Reeperbahn.',
  },
  themen: {
    name: 'Themen',
    title: 'Themen | Wilde Muschel Podcast',
    description:
      'Themen der Wilden Muschel: Reeperbahn, Freier, Sex-Stories und Real Talk vom Hamburger Kiez.',
  },
  folgen: {
    name: 'Folgen',
    title: 'Folgen | Wilde Muschel Podcast',
    description:
      'Alle Folgen von Wilde Muschel anhören. Guschel-Radio direkt vom St. Pauli Kiez.',
  },
  kontakt: {
    name: 'Kontakt',
    title: 'Kontakt | Wilde Muschel Podcast',
    description:
      'Kontakt zur Wilden Muschel: Kiez-Post Newsletter und Nachrichten an die Guschel.',
  },
  richtlinien: {
    name: 'Datenschutz',
    title: 'Datenschutz & Richtlinien | Wilde Muschel',
    description:
      'Datenschutz, Jugendschutz 18+, Nutzung und Impressum von Wilde Muschel.',
  },
} as const;

export function metaFromHash(hash: string) {
  if (hash === '#/richtlinien' || hash === '#richtlinien') return PAGE_META.richtlinien;
  if (hash === '#ueber') return PAGE_META.ueber;
  if (hash === '#themen') return PAGE_META.themen;
  if (hash === '#episodes') return PAGE_META.folgen;
  if (hash === '#kontakt') return PAGE_META.kontakt;
  return PAGE_META.home;
}

export function applyDocumentMeta(title: string, description: string) {
  document.title = title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
}

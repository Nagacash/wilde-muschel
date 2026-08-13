export const SITE_URL = 'https://wilde-muschel.vercel.app';
export const SITE_NAME = 'Wilde Muschel';

/**
 * Path-based routes. Hash fragments (#/folgen) are NOT distinct URLs to search
 * engines — everything after '#' is stripped, so every hash route collapsed
 * into the single homepage URL and could never rank on its own.
 */
export const ROUTES = {
  home: '/',
  ueber: '/ueber',
  folgen: '/folgen',
  kontakt: '/kontakt',
  richtlinien: '/richtlinien',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const PAGE_META: Record<
  RouteKey,
  { name: string; title: string; description: string; path: string }
> = {
  home: {
    name: 'Home',
    path: ROUTES.home,
    title: 'Wilde Muschel — 18+ Podcast vom Hamburger Kiez | St. Pauli',
    description:
      'Ungeschminkter 18+ Podcast aus St. Pauli: Reeperbahn-Geschichten, Freier-Anekdoten und Real Talk mit Hamburger Schnauze. Jetzt reinhören.',
  },
  ueber: {
    name: 'Über',
    path: ROUTES.ueber,
    title: 'Über die Wilde Muschel — 47, St. Pauli Original | Wilde Muschel',
    description:
      'Wer ist die Wilde Muschel? 47 Jahre, St. Pauli Original, Jahre im Hamburger Rotlicht. Ungeschminkte Geschichten von der Reeperbahn — ohne Romantisierung.',
  },
  folgen: {
    name: 'Folgen',
    path: ROUTES.folgen,
    title: 'Alle Folgen anhören — Kiez-Podcast | Wilde Muschel',
    description:
      'Alle Folgen von Wilde Muschel kostenlos anhören. Guschel-Radio direkt vom St. Pauli Kiez — Reeperbahn, Freier und Real Talk, 18+.',
  },
  kontakt: {
    name: 'Kontakt',
    path: ROUTES.kontakt,
    title: 'Kontakt & Kiez-Post | Wilde Muschel',
    description:
      'Kontakt zur Wilden Muschel: Kiez-Post Newsletter abonnieren und Nachrichten direkt an die Guschel schicken.',
  },
  richtlinien: {
    name: 'Datenschutz',
    path: ROUTES.richtlinien,
    title: 'Datenschutz, Jugendschutz & Impressum | Wilde Muschel',
    description:
      'Datenschutz, Jugendschutz (18+), Nutzungsbedingungen und Impressum von Wilde Muschel.',
  },
};

/** Legacy hash links kept working so existing shares and bookmarks don't 404. */
export const LEGACY_HASH_REDIRECTS: Record<string, string> = {
  '#hero': ROUTES.home,
  '#/hero': ROUTES.home,
  '#ueber': ROUTES.ueber,
  '#/ueber': ROUTES.ueber,
  '#themen': ROUTES.ueber,
  '#/themen': ROUTES.ueber,
  '#episodes': ROUTES.folgen,
  '#/episodes': ROUTES.folgen,
  '#/folgen': ROUTES.folgen,
  '#kontakt': ROUTES.kontakt,
  '#/kontakt': ROUTES.kontakt,
  '#richtlinien': ROUTES.richtlinien,
  '#/richtlinien': ROUTES.richtlinien,
};

export function routeKeyFromPath(pathname: string): RouteKey {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const hit = (Object.keys(ROUTES) as RouteKey[]).find((k) => ROUTES[k] === clean);
  return hit ?? 'home';
}

export function metaFromPath(pathname: string) {
  return PAGE_META[routeKeyFromPath(pathname)];
}

/**
 * Keeps title, description, canonical and social tags in sync on navigation.
 * Canonical matters most here: without it every route would self-report the
 * homepage URL and compete with itself.
 */
export function applyDocumentMeta(title: string, description: string, path: string) {
  document.title = title;

  const setAttr = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  const absolute = `${SITE_URL}${path === '/' ? '/' : path}`;

  setAttr('meta[name="description"]', 'content', description);
  setAttr('meta[property="og:title"]', 'content', title);
  setAttr('meta[property="og:description"]', 'content', description);
  setAttr('meta[property="og:url"]', 'content', absolute);
  setAttr('meta[name="twitter:title"]', 'content', title);
  setAttr('meta[name="twitter:description"]', 'content', description);
  setAttr('link[rel="canonical"]', 'href', absolute);
}

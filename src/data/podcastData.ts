import { Episode, KiezTopic } from '../types';

// Image assets generated for Wilde Muschel
export const HOST_IMAGE_URL = '/src/assets/images/wilde_muschel_host_1786604060045.jpg';
export const HOST_CURVY_IMAGE_URL = '/src/assets/images/curvy_host_portrait_1786606115876.jpg';
export const BANNER_IMAGE_URL = '/src/assets/images/wilde_muschel_banner_1786604073835.jpg';
export const COVER_IMAGE_URL = '/src/assets/images/wilde_muschel_cover_1786604087047.jpg';
export const HERO_IMAGE_URL = '/src/assets/hero-wilde-muschel.png';
export const GATE_VIDEO_URL =
  'https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp/5d556d31-eaba-4e27-bffe-873a96e7d45c-F0cRnGZkuroJU6y8KzAL_A-output.mp4?x-kcdn-pid=112372';

// Trademark Collection - Her Signature Feature (CDN hosted)
export const TRADEMARK_IMAGES = [
  {
    id: 'signature-trademark',
    title: 'Signature Trademark',
    description: 'Displaying iconic curves with total pride and swagger. Confidence radiates.',
    url: 'https://pub.hyperagent.com/api/published/pbf01KZX82R6A_Y2TGT13TEWMTPDP1/d198ed92-61bd-49d7-9f7e-41a578c58815.png'
  },
  {
    id: 'unmistakable-feature',
    title: 'Unmistakable Feature',
    description: 'Her most legendary attribute celebrated in bold pop art. THAT\'S the brand.',
    url: 'https://pub.hyperagent.com/api/published/pbf01KZX82RK8_Q35N8CYW6JTKZGHP/9c18c3ce-d297-43c8-a621-e62825b0cfe7.png'
  },
  {
    id: 'brand-trademark',
    title: 'The Brand Trademark',
    description: 'Powerful pose showcasing the famous curves that define her. St. Pauli queen energy.',
    url: 'https://pub.hyperagent.com/api/published/pbf01KZX82S0G_1MBH06JZFZPJ3N40/3129b143-510c-432c-9980-9ae6f7930628.png'
  },
  {
    id: 'iconic-curves',
    title: 'Iconic Curves Brand',
    description: 'Distinctive feature that makes her unmistakable. High fashion meets street soul.',
    url: 'https://pub.hyperagent.com/api/published/pbf01KZX82SE9_X0WJFXZJWTVJJ0AY/df879f08-4abe-4351-930c-1f87648c5f6e.png'
  }
];

export const PODCAST_INFO = {
  name: 'Wilde Muschel',
  slogan: 'Wilde Guschel über ihre Muschel',
  hostName: 'Die Wilde Muschel',
  hostAge: 47,
  location: 'Hamburg St. Pauli / Reeperbahn',
  description: 'Der ungeschönte, ehrliche Podcast direkt vom Kiez. Keine Tabus, unschlagbares Erzähltalent und stolzer Kiez-Charme – echte Sex-Stories, Freier-Anekdoten und Lebensweisheiten frei Schnauze.',
  socials: {
    spotify: 'https://open.spotify.com',
    apple: 'https://podcasts.apple.com',
    instagram: '@wilde_muschel_podcast',
    youtube: 'https://youtube.com',
    tiktok: '@wilde.muschel.kiez'
  }
};

export const SAMPLE_EPISODES: Episode[] = [
  {
    id: 'ep-01',
    episodeNumber: 1,
    title: 'Nachts um halb zwei auf der Ritze',
    subtitle: 'Der Auftakt: Wer ich bin und warum die Guschel nicht schweigt',
    duration: '6:10',
    durationSeconds: 370,
    publishDate: '13. August 2026',
    category: 'Reeperbahn',
    description: 'Im Premieren-Talk erzählt die Wilde Muschel, wie sie mit 20 auf dem Kiez landete, warum mit 47 Jahren Schluss mit Versteckspielen ist und was “Guschel über ihre Muschel” wirklich bedeutet.',
    teaserSnippet: '„Mädels, wer 15 Jahre auf St. Pauli hinter den Kulissen gearbeitet hat, lässt sich von keinem Heuchler mehr die Welt erklären!”',
    tags: ['Premierenfolge', 'Reeperbahn', 'St. Pauli', 'Lebensweg'],
    audioUrl: '/episodes/ep1.mp3',
    plays: 24300,
    isExplicit: true,
    featured: true
  }
];

export const KIEZ_TOPICS: KiezTopic[] = [
  {
    id: 'reeperbahn',
    title: 'Reeperbahn & St. Pauli',
    tagline: 'Das echte Leben der Meile',
    description: 'Geschichten direkt vom Pflaster der Reeperbahn, der Herbertsstraße und der Ritze. Ein authentischer Blick hinter die leuchtenden Neonreklamen.',
    icon: 'Flame',
    quoteSnippet: 'Auf dem Kiez gilt: Wer austeilt, muss auch einstecken können – aber immer mit Haltung.',
    episodesCount: 12
  },
  {
    id: 'freier',
    title: 'Die Welt der Freier',
    tagline: 'Geld, Lust & Einsamkeit',
    description: 'Wer sind die Männer, die zahlen? Psychologie, Begegnungen und tiefmenschliche Momente abseits von Klischees.',
    icon: 'Users',
    quoteSnippet: 'Geld kauft Zeit und Haut, aber niemals echte Zuneigung. Das verwechseln viele.',
    episodesCount: 9
  },
  {
    id: 'sex-stories',
    title: 'Sex-Stories unschminkt',
    tagline: 'Echt, humorvoll, direkt',
    description: 'Keine Pornografie, sondern ehrliche Geschichten: Peinlichkeiten, lustige Pannen und ungeschönter Real-Talk über Lust.',
    icon: 'HeartHandshake',
    quoteSnippet: 'Wer sich für seinen eigenen Körper schämt, hat noch nicht mit der Wilden Muschel geschnackt.',
    episodesCount: 15
  },
  {
    id: 'real-talk',
    title: 'Ausstieg & Neuanfang',
    tagline: 'Frauenpower mit 47',
    description: 'Vom Rotlicht ins freie Leben: Wie die Gastgeberin mit Vorurteilen aufräumt, ihr Selbstbewusstsein feiert und klare Grenzen setzt.',
    icon: 'Sparkles',
    quoteSnippet: 'Ich bin 47, blond, habe Kurven und trage meine Narben wie ein Diadem!',
    episodesCount: 8
  }
];

export const FULL_GERMAN_CONCEPT = {
  gesamtstimmung: {
    title: '1. Gesamtstimmung & Atmosphäre',
    summary: 'Sündig, stilvoll, ungeschminkt und hanseatisch-herzlich',
    body: `Die Website verkörpert die faszinierende Mischung aus St. Pauli Nachtleben, rauer Ehrlichkeit und warmer Menschlichkeit. Es ist kein billiger Erotikauftritt, sondern ein mutiges, selbstbewusstes Comic-Portrait einer 47-jährigen Frau, die das Leben auf der Reeperbahn von A bis Z kennt.

Die Atmosphäre ist nocturn und neongetränkt – schummriges Rotlicht, kühles Petrol/Cyan für hanseatischen Kontrast, blitzendes Gold für Selbstbewusstsein und tiefes Matt-Schwarz als stilvoller Rahmen. Der Visuelle Ton verbindet Pop-Art Comic-Ästhetik mit modernem Neo-Noir.`
  },
  farbTypo: {
    title: '2. Farb- & Typo-Konzept',
    summary: 'Neon-Akzente auf dunkler Kiez-Schatten-Palette',
    colors: [
      { name: 'Kiez-Schwarz / Charcoal', hex: '#0D0C10', role: 'Haupt-Hintergrund, Tiefe' },
      { name: 'Rotlicht-Rubin', hex: '#E6004C', role: 'Primärer Accent, Neon Glow, Lips' },
      { name: 'Neon-Pink / Magenta', hex: '#FF2A85', role: 'CTA-Buttons, Active States, Highlights' },
      { name: 'St. Pauli Gold', hex: '#FFB800', role: 'Badges, Slogan „Wilde Guschel“, Sterne' },
      { name: 'Elbe-Petrol / Cyan', hex: '#00E5FF', role: 'Kühler Kontrast, Audio-Waveform, Links' },
      { name: 'Cream-White', hex: '#F4EFEA', role: 'Gut lesbarer Fließtext (kein reines #FFF)' }
    ],
    typography: [
      { name: 'Headlines', font: 'Bungee / Bebas Neue / Display ExtraBold', note: 'Fett, leicht verspielt, leicht gekippt / rotlicht-artig' },
      { name: 'Subtitles & Badges', font: 'Plus Jakarta Sans Bold', note: 'Moderne Lesbarkeit mit hoher X-Höhe' },
      { name: 'Fließtext', font: 'Inter / Plus Jakarta Sans Regular', note: 'Optimaler Kontrast, 16px+, 1.6 Line-Height' }
    ]
  },
  heroSection: {
    title: '3. Hero-Sektion (Comic-Figur + Slogan + Player)',
    summary: 'Dominante Comic-Figur mit leuchtendem Slogan und direktem Quick-Play',
    body: `Im Zentrum des Hero-Bereichs steht die lebensgroße Comic-Figur der Gastgeberin:
- **Pose**: Leicht schräg, eine Hand am Vintage-Studiomikrofon, die andere lässig in der Hüfte. Selbstbewusster, verschmitzter Blick mit leicht geöffneten, vollen Lippen.
- **Gesicht / Details**: 47 Jahre alt, volles golden-blondes Haar, stechend blaue Augen, markanter Ring-Piercing über der Oberlippe, Schönheitsfleck unter der Nase.
- **Outfit**: Stylischer Leo-Print-Kragen über dunkelviolettem Korsett und goldener Kiez-Kette.
- **Hintergrund**: St. Pauli Reeperbahn Silhouette mit animierten Neon-Schriftzügen ("WILDE MUSCHEL", "ST. PAULI").
- **Slogan**: In riesiger leuchtend goldener/pinker Typografie: „Wilde Guschel über ihre Muschel“.
- **Quick-Play Widget**: Direkt am unteren Rand des Heros dockt der schwebende Audio-Player an, mit dem die neueste Folge per Klick startet.`
  },
  ueberWildeMuschel: {
    title: '4. Über Wilde Muschel',
    summary: 'Echte Frau, echte Narben, kein Sugarcoating',
    body: `Die Biografie der Gastgeberin als visuelles Story-Grid:
1. **Ehemalige Prostituierte**: 15 Jahre Erfahrung auf der Reeperbahn – sie kennt Freier, Sehnsüchte, Ängste und die Abgründe.
2. **Echte Frau mit 47**: Kein künstlicher Jugendwahn, sondern ungefiltertes Selbstbewusstsein, Rundungen und Lebensmut.
3. **Der Name & Slogan**: "Guschel" ist der Hamburger Begriff für den Mund / die Schnüss. "Guschel über ihre Muschel" bringt das Konzept perfekt auf den Punkt: Freche Klappe trifft auf ehrliche Frauenperspektive.`
  },
  themenStories: {
    title: '5. Themen & Stories',
    summary: 'Die 4 Kern-Säulen des Podcasts',
    items: [
      'Reeperbahn & St. Pauli Anekdoten',
      'Die Psychologie der Freier',
      'Sex-Stories ohne Tabus & mit viel Humor',
      'Leben nach dem Rotlicht / Frauenpower'
    ]
  },
  folgenPlayer: {
    title: '6. Folgen / Player-Sektion',
    summary: 'Audio-Erlebnis mit interaktiver Waveform und Filtern',
    body: `Der Podcast-Player ist das Herzstück der Funktionalität:
- Waveform-Canvas mit Live-Frequenzbalken bei Abspielung.
- Play, Pause, 15s Vor/Zurück, Lautstärke, Scrubbing-Zeitleiste.
- Umschaltbarer Kiez-Atmosphären-Sound (Reeperbahn Hintergrund-Ambiente).
- Schnelle Filterung nach Themen (Reeperbahn, Freier, Real-Talk, Sex-Stories).`
  },
  gsapAnimationen: {
    title: '7. GSAP-Animationen im Detail',
    summary: 'Dynamische Scroll- & Parallax-Effekte für Lebendigkeit',
    effects: [
      { element: 'Hero Comic-Figur', effect: 'GSAP Parallax float & leichtes Atmen/Winken bei Mouse-Move' },
      { element: 'Neon-Schriftzüge', effect: 'GSAP Flicker & Pulsing Glow Loop (Neon-Rohr Simulation)' },
      { element: 'Lippen-Akzent', effect: 'Subtiles Pulsieren um die Lippen beim Abspielen von Audio' },
      { element: 'ScrollTrigger', effect: 'Fade-in-Up für Episodenkarten mit Stagger (0.15s Verzögerung)' },
      { element: 'Audio Waveform', effect: 'GSAP Canvas Frame Updates synchron zur Audio-Frequenz' }
    ]
  },
  technischeUmsetzung: {
    title: '8. Technische Umsetzung (Next.js + Tailwind + GSAP)',
    summary: 'Moderne App Router Architektur für Performance und SEO',
    techStack: [
      'Next.js 14/15 App Router (Single-Page Layout)',
      'Tailwind CSS v4 für responsive utility styling',
      'GSAP (GreenSock) + ScrollTrigger für flüssige Motion Graphics',
      'HTML5 Web Audio API / Howler.js für latenzfreie Audio-Player Steuerung',
      'Express + Gemini API Route für den interaktiven Kiez-Spruch-Generator'
    ]
  }
};

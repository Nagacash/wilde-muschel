/**
 * /api/feed — RSS 2.0 podcast feed (iTunes / Podcast Index compatible)
 *
 * HOW IT WORKS
 * ─────────────────────────────────────────────────────────────────
 * Spotify, Apple Podcasts and every other directory work the same way:
 *
 *   1. You give them this URL once (submission step, done by you).
 *   2. They fetch it on a schedule (usually every few hours).
 *   3. They display whatever episodes they find in the <item> list.
 *   4. When you add a new episode, add it to EPISODES below, push to
 *      GitHub, Vercel redeploys, and the directories pick it up
 *      automatically on their next fetch — no re-submission needed.
 *
 * ADDING A NEW EPISODE
 * ─────────────────────────────────────────────────────────────────
 * Copy the episode object at the top of EPISODES, fill in the fields,
 * and push. The feed URL never changes.
 *
 * SUBMIT TO:
 *   Spotify  → https://podcasters.spotify.com  (click "Add your podcast")
 *   Apple    → https://podcastsconnect.apple.com
 *   Google   → https://podcastsmanager.google.com
 *
 * Use this feed URL when asked:
 *   https://wilde-muschel.vercel.app/api/feed
 *
 * NOTE ON EXPLICIT CONTENT
 * ─────────────────────────────────────────────────────────────────
 * The feed is marked explicit="yes". Spotify and Apple both carry
 * explicit content but add an E badge and may restrict under-18
 * users from seeing it. Neither platform auto-bans the show for
 * being explicit — they review content against their guidelines.
 */

const SITE_URL = 'https://wilde-muschel.vercel.app';

const PODCAST = {
  title: 'Wilde Muschel',
  subtitle: 'Wilde Guschel über ihre Muschel',
  description:
    'Ungeschminkt. Ehrlich. Kiez. — Die Wilde Muschel, 47-jährige St. Pauli-Ikone, erzählt ' +
    'ungeschönte Geschichten vom Hamburger Kiez. Real Talk, Rotlicht-Wahrheit und Hamburger ' +
    'Schnauze. 18+ | Nur für Erwachsene.',
  link: SITE_URL,
  feedUrl: `${SITE_URL}/api/feed`,
  language: 'de',
  author: 'Die Wilde Muschel',
  ownerName: 'Wilde Muschel',
  ownerEmail: 'chosenfewrecords@hotmail.de',
  // podcast-cover.png must be at least 1400×1400 px for Apple Podcasts.
  // Replace with a high-res square image if the current one is smaller.
  image: `${SITE_URL}/podcast-cover.png`,
  // iTunes categories — pick from the official list:
  // https://podcasters.apple.com/support/1691-apple-podcasts-categories
  category: 'Society & Culture',
  subcategory: 'Personal Journals',
  explicit: 'yes',
  copyright: `© 2026 Wilde Muschel`,
};

/**
 * Episode list — newest first.
 *
 * guid    : permanent unique ID — never change this once the episode is live
 * audioUrl: publicly reachable .mp3 — Spotify/Apple stream directly from here
 * pubDate : RFC 2822 date (Mon, DD Mon YYYY HH:MM:SS +ZZZZ)
 */
const EPISODES = [
  {
    guid: 'wilde-muschel-ep-08',
    episodeNumber: 8,
    season: 1,
    title: 'Die mit der Lust und der schöne Klaus',
    subtitle: 'Echte Lust schlägt Pretty Face — und der Kiez von damals',
    description:
      'Eine Kiez-Geschichte über eine Kollegin, die nicht dem Schönheitsideal entsprach — und trotzdem absahnte, weil sie Sex wirklich liebte und die Freier das gespürt haben. Dazu, wie sich St. Pauli verändert hat, und die Begegnungen mit dem legendären „schönen Klaus“.',
    pubDate: 'Wed, 19 Aug 2026 18:00:00 +0200',
    durationSeconds: 374,
    duration: '06:14',
    audioUrl: `${SITE_URL}/episodes/ep-08.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 14962937,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-07',
    episodeNumber: 7,
    season: 1,
    title: 'Die goldene Ära von St. Pauli',
    subtitle: 'Als der Kiez noch ein Dorf war',
    description:
      'Ein nostalgischer Rückblick auf die Blütezeit des Hamburger Kiez. Die Sprecherin teilt Geschichten über legendäre Kieztypen wie „Den schönen Klaus“ und vergleicht das einmalige Gemeinschaftsgefühl von damals mit dem durchkommerzialisierten Nachtleben von heute.',
    pubDate: 'Wed, 19 Aug 2026 10:00:00 +0200',
    durationSeconds: 117,
    duration: '01:57',
    audioUrl: `${SITE_URL}/episodes/ep-07.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 4663378,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-06',
    episodeNumber: 6,
    season: 1,
    title: 'Zwischen Rolle und Realität',
    subtitle: 'Sexarbeit als Schauspiel — ohne echte Intimität',
    description:
      'Ein Blick hinter die Kulissen exklusiver Etablissements und der Techniken, Kunden ohne echte Intimität zu steuern. Die Sprecherin beschreibt ihre Arbeit als reine Schauspielkunst, bei der klare Grenzen, Täuschung und Psychologie der Schlüssel zum Erfolg waren.',
    pubDate: 'Tue, 18 Aug 2026 10:00:00 +0200',
    durationSeconds: 126,
    duration: '02:06',
    audioUrl: `${SITE_URL}/episodes/ep-06.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 5055215,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-05',
    episodeNumber: 5,
    season: 1,
    title: 'Der Wandel des Rotlichtmilieus',
    subtitle: 'Vom Bargeld-Kiez zum digitalen Rotlicht',
    description:
      'Ein kritischer Blick auf die Entwicklung der Sexarbeit im Laufe der Jahre. Die Sprecherin vergleicht die bargeldintensive, alte Schule des Kiez-Lebens mit modernen digitalen Bezahlsystemen, sich verändernden Kundendynamiken und dem Wandel des gesellschaftlichen Klimas.',
    pubDate: 'Mon, 17 Aug 2026 10:00:00 +0200',
    durationSeconds: 73,
    duration: '01:13',
    audioUrl: `${SITE_URL}/episodes/ep-05.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 2929893,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-04',
    episodeNumber: 4,
    season: 1,
    title: 'Die Kunst des Geschäfts',
    subtitle: 'Skurrile Wünsche, klares Geschäft',
    description:
      'Von getragener Unterwäsche zu Spitzenpreisen bis hin zum Verkauf ungewöhnlicher Alltagsgegenstände: Mit viel Humor erzählt die Sprecherin, wie sie selbst die skurrilsten Kundenanfragen in lukrative Einnahmequellen verwandelte.',
    pubDate: 'Sun, 16 Aug 2026 10:00:00 +0200',
    durationSeconds: 109,
    duration: '01:49',
    audioUrl: `${SITE_URL}/episodes/ep-04.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 4365582,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-03',
    episodeNumber: 3,
    season: 1,
    title: 'Das Trauma hinter dem Fetisch',
    subtitle: 'Was hinter extremen Neigungen wirklich steckt',
    description:
      'Ein tiefer Einblick in die psychologischen Hintergründe extremer Neigungen. Die Sprecherin reflektiert, wie die Intimwünsche eines Stammkunden mit schweren Vergangenheits-Traumata verknüpft waren und wie diese Erkenntnis ihren Blick auf das Gewerbe nachhaltig veränderte.',
    pubDate: 'Sat, 15 Aug 2026 10:00:00 +0200',
    durationSeconds: 113,
    duration: '01:53',
    audioUrl: `${SITE_URL}/episodes/ep-03.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 4531721,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-02',
    episodeNumber: 2,
    season: 1,
    title: 'Grenzen & Tabus',
    subtitle: 'Wenn ein Wunsch die Grenze überschreitet',
    description:
      'Die Protagonistin spricht über extrem ausgefallene Kundenwünsche – von speziellen Fetischen bis hin zu medizinischen Szenarien – und schildert den genauen Moment, in dem eine Anfrage ihre persönlichen Grenzen überschritt und sie den Job abbrach.',
    pubDate: 'Fri, 14 Aug 2026 10:00:00 +0200',
    durationSeconds: 315,
    duration: '05:15',
    audioUrl: `${SITE_URL}/episodes/ep-02.mp3`,
    audioType: 'audio/mpeg',
    audioBytes: 12601468,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
  {
    guid: 'wilde-muschel-ep-01',
    episodeNumber: 1,
    season: 1,
    title: 'Nachts um halb zwei auf der Ritze',
    subtitle: 'Der Auftakt: Wer ich bin und warum die Guschel nicht schweigt',
    description:
      'Im Premieren-Talk erzählt die Wilde Muschel, wie sie mit 20 auf dem Kiez landete, ' +
      'warum mit 47 Jahren Schluss mit Versteckspielen ist und was "Guschel über ihre Muschel" ' +
      'wirklich bedeutet.',
    pubDate: 'Wed, 13 Aug 2026 10:00:00 +0200',
    durationSeconds: 153,
    duration: '02:33',
    audioUrl:
      'https://pub.hyperagent.com/api/published/pbf01KZXE9ZN9_Y0HVKDP0SDQFCVVN/wilde%20muschel%20ep1.mp3',
    audioType: 'audio/mpeg',
    audioBytes: 6139819,
    explicit: 'yes',
    episodeType: 'full',
    link: `${SITE_URL}/folgen`,
  },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildFeed() {
  const items = EPISODES.map((ep) => `
    <item>
      <title>${escapeXml(ep.title)}</title>
      <itunes:title>${escapeXml(ep.title)}</itunes:title>
      <itunes:subtitle>${escapeXml(ep.subtitle)}</itunes:subtitle>
      <description><![CDATA[${ep.description}]]></description>
      <itunes:summary><![CDATA[${ep.description}]]></itunes:summary>
      <link>${escapeXml(ep.link)}</link>
      <guid isPermaLink="false">${escapeXml(ep.guid)}</guid>
      <pubDate>${ep.pubDate}</pubDate>
      <enclosure
        url="${escapeXml(ep.audioUrl)}"
        length="${ep.audioBytes}"
        type="${ep.audioType}"
      />
      <itunes:duration>${ep.duration}</itunes:duration>
      <itunes:explicit>${ep.explicit}</itunes:explicit>
      <itunes:episodeType>${ep.episodeType}</itunes:episodeType>
      <itunes:episode>${ep.episodeNumber}</itunes:episode>
      <itunes:season>${ep.season}</itunes:season>
      <itunes:author>${escapeXml(PODCAST.author)}</itunes:author>
      <itunes:image href="${escapeXml(PODCAST.image)}" />
    </item>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:podcast="https://podcastindex.org/namespace/1.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">

  <channel>
    <title>${escapeXml(PODCAST.title)}</title>
    <link>${escapeXml(PODCAST.link)}</link>
    <language>${PODCAST.language}</language>
    <copyright>${escapeXml(PODCAST.copyright)}</copyright>
    <description><![CDATA[${PODCAST.description}]]></description>
    <image>
      <url>${escapeXml(PODCAST.image)}</url>
      <title>${escapeXml(PODCAST.title)}</title>
      <link>${escapeXml(PODCAST.link)}</link>
    </image>

    <!-- Self-referencing atom:link is required by some validators -->
    <atom:link href="${escapeXml(PODCAST.feedUrl)}" rel="self" type="application/rss+xml" />

    <itunes:title>${escapeXml(PODCAST.title)}</itunes:title>
    <itunes:subtitle>${escapeXml(PODCAST.subtitle)}</itunes:subtitle>
    <itunes:summary><![CDATA[${PODCAST.description}]]></itunes:summary>
    <itunes:author>${escapeXml(PODCAST.author)}</itunes:author>
    <itunes:explicit>${PODCAST.explicit}</itunes:explicit>
    <itunes:image href="${escapeXml(PODCAST.image)}" />
    <itunes:category text="${escapeXml(PODCAST.category)}">
      <itunes:category text="${escapeXml(PODCAST.subcategory)}" />
    </itunes:category>
    <itunes:owner>
      <itunes:name>${escapeXml(PODCAST.ownerName)}</itunes:name>
      <itunes:email>${escapeXml(PODCAST.ownerEmail)}</itunes:email>
    </itunes:owner>
    <itunes:type>episodic</itunes:type>
${items}
  </channel>
</rss>`;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const xml = buildFeed();
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  // Cache for 1 hour on edge, 15 min revalidation — fast for listeners,
  // fresh enough for directories checking for new episodes.
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=900');
  res.status(200).send(xml);
}

import React, { useEffect } from 'react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { PODCAST_INFO } from '../data/podcastData';
import { PAGE_META, applyDocumentMeta } from '../seo';

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: 'jugendschutz',
    title: 'Jugendschutz (18+)',
    body: (
      <>
        <p>
          {PODCAST_INFO.name} richtet sich ausschließlich an volljährige Personen.
          Inhalte behandeln Rotlicht, Sexualität, Freier-Geschichten und das Leben
          auf St. Pauli — offen, ungeschminkt und ohne Sugarcoating.
        </p>
        <p>
          Mit der Bestätigung „Ja, ich bin 18+“ erklärst du, dass du mindestens
          18 Jahre alt bist. Wer jünger ist, darf die Website nicht nutzen.
        </p>
      </>
    ),
  },
  {
    id: 'nutzung',
    title: 'Nutzung der Website',
    body: (
      <>
        <p>
          Die Seite dient der Präsentation des Podcasts, dem Abspielen von Folgen
          und dem Kontakt zur Redaktion. Du darfst Inhalte für den privaten
          Gebrauch ansehen und anhören. Kopieren, Weiterverbreiten oder
          kommerzielle Nutzung der Texte, Bilder, Videos oder Audios ist ohne
          schriftliche Zustimmung nicht erlaubt.
        </p>
        <p>
          Beleidigungen, Belästigung oder das Umgehen der Altersprüfung sind
          untersagt. Wir können den Zugang bei Missbrauch sperren.
        </p>
      </>
    ),
  },
  {
    id: 'datenschutz',
    title: 'Datenschutz',
    body: (
      <>
        <p>
          Wir erheben so wenig wie möglich. Es gibt kein Tracking-Pixel, keine
          Werbenetzwerke und kein verpflichtendes Nutzerkonto.
        </p>
        <p>
          Nach der Altersbestätigung speichert dein Browser lokal den Schlüssel{' '}
          <code className="text-gold">wilde-muschel-18plus</code>. So musst du
          dich nicht bei jedem Besuch erneut bestätigen. Der Eintrag bleibt auf
          deinem Gerät, wird nicht an uns gesendet und kann jederzeit über die
          Browser-Einstellungen gelöscht werden.
        </p>
        <p>
          Newsletter- und Kontaktformulare auf dieser Demo-Seite werden im
          Browser verarbeitet und derzeit nicht an einen Server weitergeleitet.
          Sobald ein echter Versand aktiv ist, gilt die dann ausgewiesene
          Datenschutzerklärung des Versanddienstes.
        </p>
      </>
    ),
  },
  {
    id: 'medien',
    title: 'Medien & Drittanbieter',
    body: (
      <>
        <p>
          Auf der Einstiegsseite laufen ein lokales Video und ein lokales
          Audio-Bed. Beides wird nur auf dem Landing abgespielt und stoppt,
          sobald du die Seite betrittst oder diese Richtlinien öffnest.
        </p>
        <p>
          Podcast-Folgen können von externen Audio-Hosts geladen werden. Beim
          Abspielen kann der jeweilige Anbieter technisch notwendige
          Verbindungsdaten (z.&nbsp;B. IP-Adresse) erhalten. Social-Links führen
          zu Spotify, Apple, Instagram und TikTok — dort gelten deren eigene
          Bedingungen.
        </p>
      </>
    ),
  },
  {
    id: 'urheberrecht',
    title: 'Urheberrecht',
    body: (
      <p>
        Comic-Artwork, Marke, Slogan „{PODCAST_INFO.slogan}“, Texte und das
        Audio-Material von {PODCAST_INFO.name} sind urheberrechtlich geschützt.
        Zitate mit Quellenangabe für journalistische Zwecke bleiben zulässig.
      </p>
    ),
  },
  {
    id: 'haftung',
    title: 'Haftung',
    body: (
      <p>
        Geschichten aus dem Podcast spiegeln persönliche Erfahrungen und Meinungen
        der Gastgeberin. Sie sind Unterhaltung und Real Talk, keine Rechts-,
        Medizin- oder Lebensberatung. Für Inhalte verlinkter Drittseiten sind
        deren Betreiber verantwortlich.
      </p>
    ),
  },
  {
    id: 'impressum',
    title: 'Impressum (Angaben gemäß § 5 DDG)',
    body: (
      <>
        <p>
          Betreiberin / Verantwortlich für den Inhalt:<br />
          {PODCAST_INFO.hostName}<br />
          {PODCAST_INFO.location}
        </p>
        <p className="text-dim">
          Anschrift, E-Mail und ggf. USt-IdNr. bitte durch die echten
          Betreiberdaten ersetzen, bevor die Seite öffentlich geht. Bis dahin
          gilt dieser Block als Platzhalter.
        </p>
        <p>
          Konzept &amp; Umsetzung: Naga Codex
        </p>
      </>
    ),
  },
];

export const PolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    applyDocumentMeta(
      PAGE_META.richtlinien.title,
      PAGE_META.richtlinien.description,
      PAGE_META.richtlinien.path,
    );
  }, []);

  return (
    <div className="min-h-svh bg-kiez text-cream" data-page="richtlinien">
      <header className="sticky top-0 z-50 border-b border-line bg-kiez/85 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <a
            href="/"
            className="min-h-11 inline-flex items-center gap-2 px-4 rounded-full border border-line text-sm font-semibold text-muted hover:text-cream hover:border-gold transition-[color,border-color] duration-fast"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </a>
          <div className="flex items-center gap-2 text-rotlicht text-[11px] font-semibold tracking-[0.2em] uppercase">
            <ShieldAlert className="w-4 h-4" />
            18+
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <p
          className="pointer-events-none select-none absolute -right-4 top-8 font-anton text-[clamp(6rem,28vw,14rem)] leading-none text-rotlicht/8"
          aria-hidden="true"
        >
          18+
        </p>

        <article className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-24" aria-labelledby="richtlinien-title">
          <p className="text-gold text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Rechtliches
          </p>
          <h1 id="richtlinien-title" className="font-cinzel text-3xl sm:text-4xl text-cream text-balance mb-4">
            Datenschutz &amp; Richtlinien
          </h1>
          <p className="text-muted text-base leading-relaxed max-w-[68ch] mb-12">
            Klare Kante vom Kiez: Wer reinkommt, ist erwachsen. Hier steht, was
            mit deinen Daten passiert, welche Regeln gelten und wofür{' '}
            {PODCAST_INFO.name} verantwortlich ist.
          </p>

          <nav className="flex flex-wrap gap-2 mb-14" aria-label="Abschnitte">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="min-h-11 inline-flex items-center px-3.5 rounded-full border border-line text-[11px] font-semibold uppercase tracking-wider text-muted hover:text-gold hover:border-gold cursor-pointer transition-[color,border-color] duration-fast"
              >
                {String(index + 1).padStart(2, '0')} {section.title.split(' (')[0]}
              </button>
            ))}
          </nav>

          <div className="space-y-12 border-l-2 border-rotlicht/70 pl-6 sm:pl-8">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <p className="text-rotlicht text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-cinzel text-xl sm:text-2xl text-cream mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3 text-base leading-relaxed text-muted max-w-[68ch] [&_p]:text-pretty">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-16 text-xs text-dim uppercase tracking-widest">
            Stand: 13. August 2026 · {PODCAST_INFO.name} · {PODCAST_INFO.location}
          </p>
        </article>
      </main>
    </div>
  );
};

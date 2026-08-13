import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ShieldAlert, Check, X, Volume2, VolumeX } from 'lucide-react';
import { PODCAST_INFO } from '../data/podcastData';
import heroArt from '../assets/hero-wilde-muschel.png';
import gateClip from '../assets/anja.mp4';
import landingBed from '../assets/landing.mp3';

const AGE_KEY = 'wilde-muschel-18plus';

interface AgeGateProps {
  children: React.ReactNode;
}

export const AgeGate: React.FC<AgeGateProps> = ({ children }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

  useLayoutEffect(() => {
    // Always show age gate on fresh page load
    // Age verification is only valid for current session (not persisted)
    setVerified(false);
  }, []);

  useEffect(() => {
    if (verified !== false) return;

    const audio = new Audio(landingBed);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.55;
    audioRef.current = audio;

    const tryPlay = () => {
      if (userMutedRef.current) return;
      audio
        .play()
        .then(() => {
          setSoundOn(true);
          window.removeEventListener('pointerdown', tryPlay);
        })
        .catch(() => {
          setSoundOn(false);
        });
    };

    tryPlay();
    window.addEventListener('pointerdown', tryPlay);

    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
      setSoundOn(false);
    };
  }, [verified]);

  const enterSite = () => {
    try {
      window.localStorage.setItem(AGE_KEY, '1');
    } catch {
      /* private mode */
    }
    setVerified(true);
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userMutedRef.current = true;
      audio.pause();
      setSoundOn(false);
      return;
    }
    userMutedRef.current = false;
    audio
      .play()
      .then(() => setSoundOn(true))
      .catch(() => setSoundOn(false));
  };

  if (verified === null) {
    return <div className="min-h-svh bg-sky" aria-hidden="true" />;
  }

  if (verified) {
    return <>{children}</>;
  }

  return (
    <>
      {/*
        Content stays mounted so search engines can index it. Crawlers execute
        JS but never click "Ja, ich bin 18+", so returning the gate alone left
        every URL serving identical boilerplate with nothing to rank.

        It is not reachable by a human here: the gate below is an opaque
        fixed overlay covering the viewport, and `inert` removes this subtree
        from focus, clicks and assistive tech. Same markup is served to
        crawlers and to people, so this is not cloaking.
      */}
      <div inert aria-hidden="true" className="pointer-events-none invisible h-0 overflow-hidden">
        {children}
      </div>

      <div className="fixed inset-0 z-[100] bg-sky overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroArt}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[70%_12%]"
        />
        <video
          className="absolute inset-0 w-full h-full object-cover object-[70%_12%]"
          src={gateClip}
          autoPlay
          muted
          loop
          playsInline
          poster={heroArt}
        />

        <div className="hero-bubble">
          <p>
            Wilde Muschel
            <br />
            über ihre
            <br />
            Guschel
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggleSound}
        className="absolute top-5 right-5 z-20 min-h-11 min-w-11 px-3 rounded-full bg-ink/80 border border-line text-cream hover:border-gold hover:text-gold flex items-center justify-center gap-2 cursor-pointer transition-[color,border-color] duration-fast"
        aria-pressed={soundOn}
        aria-label={soundOn ? 'Landing-Sound aus' : 'Landing-Sound an'}
      >
        {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-widest">
          {soundOn ? 'Ton an' : 'Ton aus'}
        </span>
      </button>

      <div className="relative z-10 min-h-svh flex flex-col items-center justify-end pb-16 px-4 text-center">
        <p className="font-anton hero-title-stamp text-[clamp(3rem,10vw,6.5rem)] leading-none mb-4">
          WILDE
          <br />
          MUSCHEL
        </p>
        <p className="text-cream text-base sm:text-lg font-semibold max-w-md mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          Podcast mit verschiedenen Facetten. 18+ Real Talk vom Kiez.
        </p>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="min-h-14 px-10 py-4 rounded-full bg-rotlicht hover:bg-rotlicht-hot text-cream font-extrabold text-xl tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-glow-pink hover:scale-105 cursor-pointer transition-[background-color,box-shadow,transform] duration-base ease-out-expo"
        >
          <ShieldAlert className="w-6 h-6" />
          18+
        </button>
        <p className="mt-3 text-xs text-muted uppercase tracking-widest">
          Eintritt nur mit Altersbestätigung
        </p>
        <a
          href="/richtlinien"
          className="mt-5 text-xs text-cream/80 underline underline-offset-4 decoration-gold/60 hover:text-gold hover:decoration-gold transition-colors duration-fast"
        >
          Datenschutz &amp; Richtlinien
        </a>
      </div>

      {confirmOpen && (
        <div
          className="absolute inset-0 z-20 bg-ink/80 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-confirm-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-panel border-2 border-line p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-rotlicht text-xs font-semibold tracking-[0.2em] uppercase">
              <ShieldAlert className="w-4 h-4" />
              Altersprüfung
            </div>
            <h2 id="age-confirm-title" className="font-cinzel text-2xl text-cream">
              Bist du 18 oder älter?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {PODCAST_INFO.name} ist nur für Erwachsene. Mit Bestätigung loggst du dich
              in den Kiez-Bereich ein.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={enterSite}
                className="min-h-12 flex-1 px-5 rounded-full bg-rotlicht hover:bg-rotlicht-hot text-cream font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-[background-color,transform] duration-base ease-out-expo"
              >
                <Check className="w-4 h-4" />
                Ja, ich bin 18+
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="min-h-12 flex-1 px-5 rounded-full bg-ink border border-line text-muted hover:text-cream font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors duration-fast"
              >
                <X className="w-4 h-4" />
                Nein
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

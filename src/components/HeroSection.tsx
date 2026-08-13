import React from 'react';
import { Play, Pause, Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { Episode } from '../types';
import { PODCAST_INFO } from '../data/podcastData';
import heroArt from '../assets/hero-wilde-muschel.png';

interface HeroSectionProps {
  latestEpisode: Episode;
  isPlaying: boolean;
  currentEpisodeId: string | null;
  onPlayEpisode: (episode: Episode) => void;
  onOpenOracle: () => void;
}

const MusselMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M32 6c-9 10-18 20-18 34 0 12 8 18 18 18s18-6 18-18C50 26 41 16 32 6Z"
      fill="#f4efea"
      stroke="#0a0a0a"
      strokeWidth="3"
    />
    <path
      d="M32 14c-5 8-11 16-11 26 0 8 5 12 11 12"
      fill="none"
      stroke="#0a0a0a"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  latestEpisode,
  isPlaying,
  currentEpisodeId,
  onPlayEpisode,
  onOpenOracle
}) => {
  const isCurrentPlaying = isPlaying && currentEpisodeId === latestEpisode.id;

  return (
    <section
      id="hero"
      className="hero-billboard relative min-h-svh overflow-hidden"
    >
      <div className="hero-grain" />

      <div className="hero-enter-figure hero-figure">
        <img
          src={heroArt}
          alt="Wilde Muschel — Comic-Gastgeberin, Blick über die Schulter"
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

      <MusselMark className="hero-mussel hero-mussel-2 w-9 h-9 sm:w-12 sm:h-12 left-[8%] top-[28%] lg:left-[18%] lg:top-[22%]" />
      <MusselMark className="hero-mussel w-7 h-7 sm:w-10 sm:h-10 left-[22%] bottom-[22%] lg:left-[28%] lg:bottom-[16%]" />

      <div className="relative z-10 min-h-svh max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end lg:items-center pt-28 pb-10">
        <div className="hero-enter-copy w-full max-w-xl lg:max-w-136 space-y-6 rounded-xl lg:rounded-none bg-linear-to-t from-kiez via-kiez/80 to-transparent lg:bg-none p-5 sm:p-6 lg:p-0 -mx-1">

          <div className="inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-ink/90 border-2 border-ink text-rotlicht text-xs font-semibold tracking-[0.16em] uppercase shadow-md">
            <Flame className="w-4 h-4 text-gold" />
            <span>St. Pauli Real Talk</span>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>18+</span>
          </div>

          <h1 className="font-anton hero-title-stamp text-[clamp(3.4rem,11vw,7rem)]">
            <span className="block">WILDE</span>
            <span className="block">MUSCHEL</span>
          </h1>

          <p className="text-base sm:text-lg text-cream lg:text-ink max-w-md leading-relaxed font-semibold lg:bg-cream/70 lg:backdrop-blur-sm lg:px-4 lg:py-3 lg:rounded-md lg:border-2 lg:border-ink">
            Podcast mit verschiedenen Facetten. Keine Tabus, kein Sugarcoating —
            Kiez-Schnauze, Sex-Stories und echte Lebensweisheiten.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onPlayEpisode(latestEpisode)}
              className="min-h-12 px-8 py-4 rounded-full bg-rotlicht hover:bg-rotlicht-hot text-cream font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-glow-pink hover:scale-105 cursor-pointer transition-[background-color,box-shadow,transform] duration-base ease-out-expo"
            >
              {isCurrentPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Episode {latestEpisode.episodeNumber} pausieren</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current ml-1" />
                  <span>Folge {latestEpisode.episodeNumber} anhören</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenOracle}
              className="min-h-12 px-6 py-4 rounded-full bg-ink hover:bg-panel border-2 border-gold text-gold font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-gold cursor-pointer shadow-glow-gold transition-[background-color,border-color,box-shadow] duration-base ease-out-expo"
            >
              <Sparkles className="w-4 h-4" />
              <span>Kiez-Spruch hoi’n</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted lg:text-ink">
            <span className="uppercase tracking-widest text-[10px] font-semibold">Jetzt streamen:</span>
            <a
              href={PODCAST_INFO.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-rotlicht transition-colors duration-fast"
            >
              Spotify
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={PODCAST_INFO.socials.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-gold transition-colors duration-fast"
            >
              Apple Podcasts
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={PODCAST_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-cream lg:hover:text-ink transition-colors duration-fast"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-kiez to-transparent z-10" />
    </section>
  );
};

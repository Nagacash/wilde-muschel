import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { SAMPLE_EPISODES } from '../data/podcastData';
import { ROUTES } from '../seo';
import { Episode } from '../types';

interface HomePageProps {
  isPlaying: boolean;
  currentEpisodeId: string | null;
  onPlayEpisode: (ep: Episode) => void;
  onOpenOracle: () => void;
  onNavigate: (path: string) => void;
  playCount: number;
  playCountHighlight: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  isPlaying,
  currentEpisodeId,
  onPlayEpisode,
  onOpenOracle,
  onNavigate,
  playCount,
  playCountHighlight,
}) => {
  return (
    <main className="min-h-screen bg-[#050505]">
      <HeroSection
        latestEpisode={SAMPLE_EPISODES[0]}
        isPlaying={isPlaying}
        currentEpisodeId={currentEpisodeId}
        onPlayEpisode={onPlayEpisode}
        onOpenOracle={onOpenOracle}
        playCount={playCount}
        playCountHighlight={playCountHighlight}
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
            Ungeschminkt. Ehrlich. Kiez.
          </h2>
          <p className="text-lg text-[#A0A0A0] max-w-2xl mx-auto">
            Der ungeschönte, ehrliche Podcast direkt vom Kiez. Keine Tabus, unschlagbares Erzähltalent und stolzer Kiez-Charme – echte Sex-Stories, Freier-Anekdoten und Lebensweisheiten frei Schnauze.
          </p>
          <div className="pt-4">
            <a
              href={ROUTES.folgen}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(ROUTES.folgen);
              }}
              className="inline-block px-8 py-3 bg-[#FF2D55] hover:bg-[#FF2A85] text-white font-bold rounded-full transition-colors"
            >
              Zu den Folgen →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

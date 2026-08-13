import React from 'react';
import { EpisodesPlayerSection } from '../components/EpisodesPlayerSection';
import { Episode } from '../types';

interface FolgenPageProps {
  episodes: Episode[];
  currentEpisode: Episode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onPlayEpisode: (ep: Episode) => void;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const FolgenPage: React.FC<FolgenPageProps> = ({
  episodes,
  currentEpisode,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  selectedCategory,
  onSelectCategory,
  onPlayEpisode,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
}) => {
  return (
    <main className="min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-[#F5F5F5] mb-8">Folgen & Player</h1>
      </div>

      <EpisodesPlayerSection
        episodes={episodes}
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onPlayEpisode={onPlayEpisode}
        onTogglePlay={onTogglePlay}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        onToggleMute={onToggleMute}
      />
    </main>
  );
};

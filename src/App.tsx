import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { AgeGate } from './components/AgeGate';
import { PolicyPage } from './components/PolicyPage';
import { KiezOracleModal } from './components/KiezOracleModal';
import { HomePage } from './pages/HomePage';
import { UberPage } from './pages/UberPage';
import { FolgenPage } from './pages/FolgenPage';
import { KontaktPage } from './pages/KontaktPage';
import { SAMPLE_EPISODES } from './data/podcastData';
import { Episode } from './types';

const isPolicyHash = (hash: string) =>
  hash === '#/richtlinien' || hash === '#richtlinien';

const getCurrentPage = (hash: string): string => {
  if (hash === '#/uber') return 'uber';
  if (hash === '#/folgen') return 'folgen';
  if (hash === '#/kontakt') return 'kontakt';
  return 'home';
};

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  const [episodes] = useState<Episode[]>(SAMPLE_EPISODES);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(SAMPLE_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SAMPLE_EPISODES[0].durationSeconds);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [oracleOpen, setOracleOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPage = getCurrentPage(hash);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Sync Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Sync Episode Change
  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.audioUrl;
      setCurrentTime(0);
      setDuration(currentEpisode.durationSeconds);
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.warn("Audio auto-play prevented:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentEpisode]);

  // Sync Play / Pause State
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback error:", err);
        setIsPlaying(true);
      });
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    if (currentEpisode.id === episode.id) {
      togglePlay();
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (vol > 0 && isMuted) setIsMuted(false);
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  if (isPolicyHash(hash)) {
    return <PolicyPage />;
  }

  return (
    <AgeGate>
      <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#FF2D55] selection:text-white">

        {/* Navigation Header */}
        <Header
          currentEpisode={currentEpisode}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onOpenOracle={() => setOracleOpen(true)}
        />

        {/* Page Routing */}
        {currentPage === 'home' && (
          <HomePage
            isPlaying={isPlaying}
            onPlayEpisode={handlePlayEpisode}
            onOpenOracle={() => setOracleOpen(true)}
          />
        )}

        {currentPage === 'uber' && (
          <UberPage
            onSelectTopic={(topicId) => {
              setSelectedCategory(topicId);
              window.location.hash = '#/folgen';
            }}
          />
        )}

        {currentPage === 'folgen' && (
          <FolgenPage
            episodes={episodes}
            currentEpisode={currentEpisode}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onPlayEpisode={handlePlayEpisode}
            onTogglePlay={togglePlay}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
          />
        )}

        {currentPage === 'kontakt' && (
          <KontaktPage />
        )}

        {/* Interactive Kiez Oracle Modal */}
        <KiezOracleModal
          isOpen={oracleOpen}
          onClose={() => setOracleOpen(false)}
        />
      </div>
    </AgeGate>
  );
}

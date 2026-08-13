import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { AgeGate } from './components/AgeGate';
import { PolicyPage } from './components/PolicyPage';
import { KiezOracleModal } from './components/KiezOracleModal';
import { HomePage } from './pages/HomePage';
import { UberPage } from './pages/UberPage';
import { FolgenPage } from './pages/FolgenPage';
import { KontaktPage } from './pages/KontaktPage';
import { SiteFooter } from './components/SiteFooter';
import { SAMPLE_EPISODES } from './data/podcastData';
import { Episode } from './types';
import {
  ROUTES,
  LEGACY_HASH_REDIRECTS,
  routeKeyFromPath,
  metaFromPath,
  applyDocumentMeta,
} from './seo';

const PLAY_COUNT_BASE = 2412;
const PLAY_COUNT_KEY = 'wm-extra-plays';

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [episodes] = useState<Episode[]>(SAMPLE_EPISODES);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(SAMPLE_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(SAMPLE_EPISODES[0].durationSeconds);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [oracleOpen, setOracleOpen] = useState<boolean>(false);
  const [playCount, setPlayCount] = useState<number>(PLAY_COUNT_BASE);
  const [playCountHighlight, setPlayCountHighlight] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const countedEpisodesRef = useRef<Set<string>>(new Set());
  const currentPage = routeKeyFromPath(pathname);

  useEffect(() => {
    try {
      const extra = Number(localStorage.getItem(PLAY_COUNT_KEY) || '0');
      if (Number.isFinite(extra) && extra > 0) {
        setPlayCount(PLAY_COUNT_BASE + extra);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const registerPlay = (episodeId: string) => {
    if (countedEpisodesRef.current.has(episodeId)) return;
    countedEpisodesRef.current.add(episodeId);
    setPlayCount((n) => {
      const next = n + 1;
      try {
        localStorage.setItem(PLAY_COUNT_KEY, String(next - PLAY_COUNT_BASE));
      } catch {
        /* ignore */
      }
      return next;
    });
    setPlayCountHighlight(true);
    window.setTimeout(() => setPlayCountHighlight(false), 700);
  };

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setPathname(path);
    window.scrollTo(0, 0);
  }, []);

  // Back/forward buttons.
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Old #/folgen style links still resolve — rewrite them to the real path once.
  useEffect(() => {
    const target = LEGACY_HASH_REDIRECTS[window.location.hash];
    if (target) {
      window.history.replaceState({}, '', target);
      setPathname(target);
    }
  }, []);

  // Per-route title, description and canonical.
  useEffect(() => {
    const meta = metaFromPath(pathname);
    applyDocumentMeta(meta.title, meta.description, meta.path);
  }, [pathname]);

  // Sync Audio Element
  useEffect(() => {
    const audio = new Audio();
    // No crossOrigin: the episode CDN does not send an
    // access-control-allow-origin header, so requesting a CORS fetch makes the
    // load fail silently and the player stays pinned at 00:00.
    audio.preload = 'metadata';
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
        if (currentEpisode) registerPlay(currentEpisode.id);
      }).catch(err => {
        console.warn("Audio playback error:", err);
        setIsPlaying(true);
        if (currentEpisode) registerPlay(currentEpisode.id);
      });
    }
  };

  const handlePlayEpisode = (episode: Episode) => {
    if (currentEpisode.id === episode.id) {
      togglePlay();
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
      registerPlay(episode.id);
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

  if (currentPage === 'richtlinien') {
    return <PolicyPage />;
  }

  return (
    <AgeGate>
      <div className="min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#FF2D55] selection:text-white">

        {/* Navigation Header */}
        <Header
          currentEpisode={currentEpisode}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onOpenOracle={() => setOracleOpen(true)}
          onNavigate={navigate}
          currentPath={pathname}
        />

        {/* Page Routing */}
        {currentPage === 'home' && (
          <HomePage
            isPlaying={isPlaying}
            currentEpisodeId={currentEpisode?.id || null}
            onPlayEpisode={handlePlayEpisode}
            onOpenOracle={() => setOracleOpen(true)}
            onNavigate={navigate}
            playCount={playCount}
            playCountHighlight={playCountHighlight}
          />
        )}

        {currentPage === 'ueber' && (
          <UberPage
            onSelectTopic={(topicId) => {
              setSelectedCategory(topicId);
              navigate(ROUTES.folgen);
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
            playCount={playCount}
            playCountHighlight={playCountHighlight}
          />
        )}

        {currentPage === 'kontakt' && (
          <KontaktPage />
        )}

        <SiteFooter onNavigate={navigate} />

        {/* Interactive Kiez Oracle Modal */}
        <KiezOracleModal
          isOpen={oracleOpen}
          onClose={() => setOracleOpen(false)}
        />
      </div>
    </AgeGate>
  );
}

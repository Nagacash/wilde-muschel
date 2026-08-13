import React, { useState } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Sparkles, Tag, Clock, Share2, Check, ShieldAlert, Radio, FileText } from 'lucide-react';
import { Episode } from '../types';
import { COVER_IMAGE_URL } from '../data/podcastData';
import { AudioWaveformCanvas } from './AudioWaveformCanvas';
import { PlayCounter } from './PlayCounter';

interface EpisodesPlayerSectionProps {
  episodes: Episode[];
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onPlayEpisode: (episode: Episode) => void;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  playCount: number;
  playCountHighlight: boolean;
}

export const EpisodesPlayerSection: React.FC<EpisodesPlayerSectionProps> = ({
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
  playCount,
  playCountHighlight
}) => {
  const [activeShowNotesEp, setActiveShowNotesEp] = useState<Episode | null>(null);
  const [copiedEpId, setCopiedEpId] = useState<number | null>(null);

  const handleShareEpisode = async (ep: Episode, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?episode=${ep.id}#episodes`;
    const shareData = {
      title: `Wilde Muschel - Folge ${ep.episodeNumber}: ${ep.title}`,
      text: `Hör dir Folge ${ep.episodeNumber} vom Wilde Muschel Podcast an: „${ep.title}“`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedEpId(ep.id);
      setTimeout(() => setCopiedEpId(null), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEpId(ep.id);
      setTimeout(() => setCopiedEpId(null), 2500);
    }
  };

  const categories = ['Alle', 'Reeperbahn', 'Freier', 'Real-Talk', 'Sex-Stories', 'Kiez-Geflüster'];

  const filteredEpisodes = selectedCategory === 'Alle'
    ? episodes
    : episodes.filter(ep => ep.category.toLowerCase() === selectedCategory.toLowerCase() || ep.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase()));

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section
      id="episodes"
      className="py-20 bg-[#050505] border-t border-[#1a1a1a] relative"
      aria-labelledby="folgen-title"
      data-page="folgen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#2a2a2a] text-[#D4AF37] text-[11px] font-semibold tracking-[0.25em] uppercase">
            <Radio className="w-3.5 h-3.5 text-[#D4AF37]" /> PODCAST PLAYER & EPISODEN
          </div>
          <h2 id="folgen-title" className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight font-cinzel">
            Folgen: Guschel-Radio — <span className="text-[#FF2D55]">Alle Folgen</span>
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0]">
            Direkt im integrierten Player anhören. Wählen Sie eine Folge oder stöbern Sie nach Themen.
          </p>
        </div>

        {/* Featured Main Interactive Player Widget */}
        {currentEpisode && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-[#2a2a2a] hover:border-[#FF2D55]/50 shadow-[0_0_35px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF2D55]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Cover Artwork & Badge */}
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[#D4AF37]/60 shrink-0 shadow-lg bg-[#0A0A0A]">
                  <img
                    src={COVER_IMAGE_URL}
                    alt={currentEpisode.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-[#FF2D55]/30 flex items-center justify-center backdrop-blur-[1px]">
                      <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF2D55]/20 text-[#FF2D55] text-[10px] font-bold tracking-wider uppercase">
                    <span>FOLGE {currentEpisode.episodeNumber}</span>
                    {currentEpisode.isExplicit && <ShieldAlert className="w-3 h-3 text-[#FF2D55]" />}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] font-cinzel leading-tight line-clamp-2">
                    {currentEpisode.title}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-medium line-clamp-1 font-serif-italic">
                    {currentEpisode.subtitle}
                  </p>
                  <p className="text-[11px] text-[#888]">
                    Dauer: {currentEpisode.duration} • {currentEpisode.publishDate}
                  </p>
                  <PlayCounter count={playCount} highlight={playCountHighlight} />
                </div>
              </div>

              {/* Player Controls & Waveform Timeline */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Waveform & Time Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="w-full sm:w-auto">
                    <AudioWaveformCanvas isPlaying={isPlaying} barColor="#FF2D55" />
                  </div>

                  {/* Main Playback Buttons */}
                  <div className="flex items-center gap-3">
                    {/* Rewind 15s */}
                    <button
                      onClick={() => onSeek(Math.max(0, currentTime - 15))}
                      className="p-2.5 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                      title="15 Sekunden zurück"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Play/Pause Main */}
                    <button
                      onClick={onTogglePlay}
                      className="p-4 rounded-full bg-[#FF2D55] hover:bg-[#d02244] text-white shadow-[0_0_20px_rgba(255,45,85,0.5)] hover:scale-105 transition-all cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* Forward 15s */}
                    <button
                      onClick={() => onSeek(Math.min(duration || currentEpisode.durationSeconds, currentTime + 15))}
                      className="p-2.5 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors cursor-pointer"
                      title="15 Sekunden vor"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Volume Control & Share */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShareEpisode(currentEpisode)}
                      className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      title="Aktuelle Folge teilen"
                    >
                      {copiedEpId === currentEpisode.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold text-[11px]">Kopiert!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                          <span className="text-[11px]">Teilen</span>
                        </>
                      )}
                    </button>

                    <div className="hidden md:flex items-center gap-2">
                      <button
                        onClick={onToggleMute}
                        className="p-2 text-[#888] hover:text-white cursor-pointer"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-[#FF2D55]" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                        className="w-20 accent-[#FF2D55] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Scrubbing Timeline */}
                <div className="space-y-1">
                  <div className="relative w-full h-2 bg-[#0A0A0A] border border-[#2a2a2a] rounded-full overflow-hidden cursor-pointer group">
                    <input
                      type="range"
                      min="0"
                      max={duration || currentEpisode.durationSeconds || 100}
                      value={currentTime}
                      onChange={(e) => onSeek(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="h-full bg-gradient-to-r from-[#FF2D55] to-[#D4AF37] rounded-full transition-all"
                      style={{
                        width: `${((currentTime / (duration || currentEpisode.durationSeconds || 1)) * 100)}%`
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#888] font-mono font-medium">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration || currentEpisode.durationSeconds)}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#1a1a1a] pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#888] mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#FF2D55] text-white shadow-[0_0_12px_rgba(255,45,85,0.4)]'
                    : 'bg-[#121212] text-[#888] hover:text-[#F5F5F5] border border-[#2a2a2a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#888] font-medium">
            Zeige <span className="text-[#D4AF37] font-bold">{filteredEpisodes.length}</span> Episoden
          </div>
        </div>

        {/* Episodes List Grid */}
        <div className="space-y-4">
          {filteredEpisodes.map((ep) => {
            const isThisPlaying = isPlaying && currentEpisode?.id === ep.id;

            return (
              <div
                key={ep.id}
                className={`p-5 rounded-2xl bg-[#121212] hover:bg-[#161616] border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  currentEpisode?.id === ep.id
                    ? 'border-[#FF2D55] shadow-[0_0_20px_rgba(255,45,85,0.25)]'
                    : 'border-[#2a2a2a] hover:border-[#3a3a3a]'
                }`}
              >
                {/* Left Info */}
                <div className="flex items-start gap-4 space-y-1">
                  
                  {/* Episode Number Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#2a2a2a] flex flex-col items-center justify-center shrink-0 text-[#F5F5F5] font-cinzel">
                    <span className="text-[9px] text-[#D4AF37] tracking-widest font-semibold">EP</span>
                    <span className="text-base font-extrabold leading-none">{ep.episodeNumber}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#FF2D55] uppercase tracking-wider">
                        {ep.category}
                      </span>
                      {ep.isExplicit && (
                        <span className="px-1.5 py-0.5 rounded bg-[#1f0a0e] text-[#FF2D55] text-[10px] font-bold border border-[#FF2D55]/30">
                          18+ Explicit
                        </span>
                      )}
                      <span className="text-xs text-[#888]">• {ep.publishDate}</span>
                    </div>

                    <h4 className="text-lg font-bold text-[#F5F5F5] font-cinzel hover:text-[#D4AF37] transition-colors">
                      {ep.title}
                    </h4>

                    <p className="text-xs text-[#A0A0A0] line-clamp-2">
                      {ep.description}
                    </p>

                    <p className="text-xs text-[#D4AF37] font-serif-italic">
                      {ep.teaserSnippet}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      {ep.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#0A0A0A] border border-[#1a1a1a] text-[#888]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#1a1a1a]">
                  
                  <div className="text-xs text-[#888] flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#888]" />
                    <span>{ep.duration}</span>
                  </div>

                  <button
                    onClick={(e) => handleShareEpisode(ep, e)}
                    className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="Folge teilen"
                  >
                    {copiedEpId === ep.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                        <span>Teilen</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveShowNotesEp(ep)}
                    className="px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> Show Notes
                  </button>

                  <button
                    onClick={() => onPlayEpisode(ep)}
                    className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      isThisPlaying
                        ? 'bg-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.6)]'
                        : 'bg-[#1a1a1a] hover:bg-[#FF2D55] text-white'
                    }`}
                  >
                    {isThisPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current ml-0.5" /> Anhören
                      </>
                    )}
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Show Notes Modal */}
      {activeShowNotesEp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setActiveShowNotesEp(null)}
              className="absolute top-4 right-4 text-[#888] hover:text-white text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">EPISODE {activeShowNotesEp.episodeNumber} SHOW NOTES</span>
              <h3 className="text-xl font-bold text-[#F5F5F5] font-cinzel">{activeShowNotesEp.title}</h3>
            </div>
            <p className="text-sm text-[#A0A0A0] leading-relaxed">{activeShowNotesEp.description}</p>
            <div className="p-3 bg-[#0A0A0A] rounded-xl border border-[#1a1a1a]">
              <p className="text-xs text-[#FF2D55] font-semibold mb-1">Kiez-Zitat der Folge:</p>
              <p className="text-xs text-[#D4AF37] font-serif-italic">{activeShowNotesEp.teaserSnippet}</p>
            </div>
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => handleShareEpisode(activeShowNotesEp)}
                className="px-4 py-2 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEpId === activeShowNotesEp.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Link kopiert</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#FF2D55]" />
                    <span>Teilen</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onPlayEpisode(activeShowNotesEp);
                  setActiveShowNotesEp(null);
                }}
                className="px-5 py-2 rounded-full bg-[#FF2D55] hover:bg-[#d02244] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" /> Jetzt abspielen
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState } from 'react';
import { Play, Pause, Sparkles, Volume2, Mic, Flame } from 'lucide-react';
import { PODCAST_INFO, COVER_IMAGE_URL } from '../data/podcastData';
import { Episode } from '../types';

interface HeaderProps {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenOracle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentEpisode,
  isPlaying,
  onTogglePlay,
  onOpenOracle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-kiez/40 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Branding */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#FF2D55]/60 p-0.5 shadow-[0_0_15px_rgba(255,45,85,0.4)] group-hover:scale-105 transition-transform duration-300">
            <img 
              src={COVER_IMAGE_URL} 
              alt="Wilde Muschel Cover" 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-wider text-[#F5F5F5] flex items-center gap-1.5 font-cinzel">
              <span className="text-[#FF2D55] drop-shadow-[0_0_8px_rgba(255,45,85,0.6)]">WILDE</span>
              <span className="text-[#F5F5F5]">MUSCHEL</span>
            </div>
            <p className="text-[11px] text-[#D4AF37] font-serif-italic tracking-tight -mt-0.5">
              „{PODCAST_INFO.slogan}“
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#888]">
          <a href="#ueber" className="hover:text-[#FF2D55] transition-colors flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-[#FF2D55]" /> Über
          </a>
          <a href="#themen" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37]" /> Themen
          </a>
          <a href="#episodes" className="hover:text-[#FF2D55] transition-colors flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#FF2D55]" /> Folgen
          </a>
          <a href="#kontakt" className="hover:text-[#F5F5F5] transition-colors">
            Kiez-Post
          </a>
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Kiez Oracle Button */}
          <button
            onClick={onOpenOracle}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] transition-all text-xs font-semibold tracking-wider shadow-[0_0_12px_rgba(212,175,55,0.2)] cursor-pointer"
            title="Frage die Wilde Muschel nach echtem Kiez-Rat"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
            <span>KIEZ-ORAKEL</span>
          </button>

          {/* Quick Header Play Status */}
          {currentEpisode && (
            <button
              onClick={onTogglePlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF2D55] hover:bg-[#d02244] text-white text-xs font-bold shadow-[0_0_15px_rgba(255,45,85,0.5)] transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">Läuft: Ep. {currentEpisode.episodeNumber}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span className="hidden sm:inline">Abspielen</span>
                </>
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#A0A0A0] hover:text-white"
            aria-label="Menü öffnen"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#2a2a2a] px-4 py-4 space-y-3">
          <a
            href="#ueber"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F5F5F5] hover:text-[#FF2D55] text-xs uppercase tracking-widest py-1 font-semibold"
          >
            Über Wilde Muschel
          </a>
          <a
            href="#themen"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F5F5F5] hover:text-[#D4AF37] text-xs uppercase tracking-widest py-1 font-semibold"
          >
            Themen & Stories
          </a>
          <a
            href="#episodes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F5F5F5] hover:text-[#FF2D55] text-xs uppercase tracking-widest py-1 font-semibold"
          >
            Folgen & Player
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#F5F5F5] hover:text-white text-xs uppercase tracking-widest py-1 font-semibold"
          >
            Kiez-Post Newsletter
          </a>
          <div className="pt-2 border-t border-[#1a1a1a] flex flex-wrap gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOracle(); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" /> Kiez-Orakel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

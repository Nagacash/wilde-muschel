import React, { useState } from 'react';
import { Mail, Send, Heart, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { PODCAST_INFO } from '../data/podcastData';

export const ContactNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  };

  return (
    <section
      id="kontakt"
      className="pt-20 pb-10 bg-kiez border-t border-line relative"
      aria-labelledby="kontakt-title"
      data-page="kontakt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-panel border border-line text-rotlicht text-[11px] font-semibold tracking-[0.25em] uppercase">
            <Mail className="w-3.5 h-3.5" /> KONTAKT
          </div>
          <h2 id="kontakt-title" className="text-3xl sm:text-5xl font-black text-cream tracking-tight font-cinzel">
            Kontakt <span className="text-rotlicht">Wilde Muschel</span>
          </h2>
          <p className="text-base sm:text-lg text-muted">
            Kiez-Post Newsletter und Nachrichten an die Guschel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Kiez-Post Newsletter */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#121212] border border-[#2a2a2a] hover:border-[#FF2D55]/40 transition-colors shadow-2xl space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] text-[#FF2D55] text-[11px] font-semibold tracking-[0.2em] uppercase">
                <Mail className="w-3.5 h-3.5 text-[#FF2D55]" /> KIEZ-POST NEWSLETTER
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#F5F5F5] font-cinzel">
                Frischer Schnack ins <span className="text-[#D4AF37]">Postfach</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0A0]">
                Erfahre zuerst von neuen Episoden, exklusiven Kiez-Anekdoten und Bonus-Geschichten der Wilden Muschel.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-emerald-500/50 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Moin! Du bist dabei. Willkommen bei der Kiez-Post der Wilden Muschel!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Deine E-Mail-Adresse..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#0A0A0A] border border-[#2a2a2a] focus:border-[#FF2D55] rounded-xl px-4 py-3 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#FF2D55] hover:bg-[#d02244] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <span>Eintragen</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-[#888]">
                  Kein Spam. Jederzeit abbestellbar. Nur echte Geschichten vom St. Pauli Kiez.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Send Show Ideas or Stories */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#121212] border border-[#2a2a2a] hover:border-[#D4AF37]/40 transition-colors shadow-2xl space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] text-[#D4AF37] text-[11px] font-semibold tracking-[0.2em] uppercase">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" /> POST AN DIE GUSCHEL
              </div>
              <h3 className="text-2xl font-black text-[#F5F5F5] font-cinzel">
                Hast du eine <span className="text-[#FF2D55]">Story</span> für den Podcast?
              </h3>
              <p className="text-xs text-[#A0A0A0]">
                Eigene Anekdote, eine Frage an die Gastgeberin oder Themenwunsch? Schreib direkt an die Wilde Muschel.
              </p>
            </div>

            {feedbackSent ? (
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Danke! Deine Nachricht ist angekommen. Die Guschel liest mit!</span>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  placeholder="Deine Geschichte oder Frage an die Wilde Muschel..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2a2a2a] focus:border-[#D4AF37] rounded-xl p-3 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Nachricht an die Wilde Muschel abschicken
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-line space-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-dim">
            <div className="flex items-center gap-2 text-center lg:text-left">
              <ShieldAlert className="w-4 h-4 text-rotlicht shrink-0" />
              <span>© 2026 Wilde Muschel Podcast · St. Pauli Hamburg · 18+</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-semibold" aria-label="Social">
              <a href={PODCAST_INFO.socials.spotify} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-rotlicht transition-colors duration-fast">
                Spotify
              </a>
              <span className="text-line" aria-hidden="true">·</span>
              <a href={PODCAST_INFO.socials.apple} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold transition-colors duration-fast">
                Apple Podcasts
              </a>
              <span className="text-line" aria-hidden="true">·</span>
              <a href={PODCAST_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-rotlicht transition-colors duration-fast">
                Instagram
              </a>
              <span className="text-line" aria-hidden="true">·</span>
              <a href={PODCAST_INFO.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold transition-colors duration-fast">
                TikTok
              </a>
            </nav>

            <a
              href="/richtlinien"
              className="text-muted hover:text-gold font-semibold uppercase tracking-[0.18em] transition-colors duration-fast"
            >
              Datenschutz
            </a>
          </div>

          <div className="flex flex-col items-center gap-2.5 pt-8 pb-4 border-t border-line">
            <p className="sr-only">Gemacht für St. Pauli von Naga Codex</p>
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="block h-px w-12 bg-gold/50" />
              <Heart className="w-4 h-4 text-rotlicht fill-current drop-shadow-[0_0_10px_rgba(255,45,85,0.65)]" />
              <span className="block h-px w-12 bg-gold/50" />
            </div>
            <p className="font-serif-italic text-[0.95rem] text-cream/85">
              für St. Pauli
            </p>
            <p className="font-cinzel text-sm tracking-[0.32em] uppercase text-gold">
              Naga Codex
            </p>
          </div>
        </footer>

      </div>
    </section>
  );
};

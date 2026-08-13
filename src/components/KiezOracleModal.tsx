import React, { useState } from 'react';
import { Sparkles, MessageCircle, Send, RefreshCw, Volume2 } from 'lucide-react';

interface KiezOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KiezOracleModal: React.FC<KiezOracleModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Reeperbahn Real-Talk');
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<string | null>(
    'Moin Moin! Schnack nicht lang um den heißen Brei rum – wer auf St. Pauli bestehen will, braucht Rückgrat, ehrliche Worte und ein warmes Herz!'
  );

  if (!isOpen) return null;

  const categories = [
    'Reeperbahn Real-Talk',
    'Freier-Weisheiten',
    'Männer & Beziehungen',
    'Selbstbewusstsein mit 40+',
    'Ehrlichkeit ohne Filter'
  ];

  const handleGenerate = async (selectedCat = category) => {
    setLoading(true);
    try {
      const res = await fetch('/api/kiez-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCat, customTopic: topic }),
      });
      const data = await res.json();
      setQuote(data.quote || 'Moin! Aufm Kiez zählt nur die Wahrheit!');
    } catch (e) {
      console.error(e);
      setQuote('Moin Digga! Der Kiez-Funk knackt kurz, aber die Wilde Muschel schwätzt fröhlich weiter!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888] hover:text-[#F5F5F5] p-1.5 rounded-full hover:bg-[#1a1a1a] transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" /> KIEZ-GUSCHEL ORAKEL
          </div>
          <h3 className="text-2xl font-black text-[#F5F5F5] font-cinzel">
            Frage die <span className="text-[#FF2D55]">Wilde Muschel</span>
          </h3>
          <p className="text-xs text-[#A0A0A0]">
            Hole dir direkten, ungefilterten Hamburger Kiez-Rat von der 47-jährigen Gastgeberin!
          </p>
        </div>

        {/* Category Pills */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#888]">Wähle ein Kiez-Thema:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  handleGenerate(cat);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  category === cat
                    ? 'bg-[#D4AF37] text-black font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-[#0A0A0A] border border-[#2a2a2a] text-[#888] hover:text-[#F5F5F5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Topic Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Dein Stichwort (z. B. 'Ex-Freund', 'Vorstellungsgespräch', 'Kiez')..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 bg-[#0A0A0A] border border-[#2a2a2a] focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#555] focus:outline-none"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-[#FF2D55] hover:bg-[#d02244] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Spruch</span>
          </button>
        </div>

        {/* Output Quote Card */}
        <div className="p-5 rounded-2xl bg-[#0A0A0A] border border-[#2a2a2a] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#FF2D55] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" /> Kiez-Weisheit von der Wilden Muschel:
            </span>
            <Volume2 className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <p className="text-sm text-[#F5F5F5] font-serif-italic leading-relaxed pt-1">
            „{quote}“
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-[#888]">
            <span>Motto: „Wilde Guschel über ihre Muschel“</span>
            <span className="text-[#D4AF37] font-semibold">St. Pauli Stimmungs-Garantie</span>
          </div>
        </div>

        {/* Close Button CTA */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#0A0A0A] border border-[#2a2a2a] hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#F5F5F5] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          Orakel schließen & zurück zur Website
        </button>

      </div>
    </div>
  );
};

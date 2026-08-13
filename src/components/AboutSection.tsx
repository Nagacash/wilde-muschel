import React, { useState } from 'react';
import { Sparkles, HeartHandshake, Shield, CheckCircle, Flame, MessageCircle, AlertCircle, Camera } from 'lucide-react';
import { HOST_IMAGE_URL, HOST_CURVY_IMAGE_URL } from '../data/podcastData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'persona' | 'philosophie'>('persona');
  const [selectedImg, setSelectedImg] = useState<'studio' | 'silhouette'>('studio');

  return (
    <section id="ueber" className="py-20 bg-[#050505] border-t border-[#1a1a1a] relative overflow-hidden">
      
      {/* Background Neon Accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FF2D55]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#2a2a2a] text-[#D4AF37] text-[11px] font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> DIE FRAU HINTER DER GUSCHEL
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight font-cinzel">
            Wer ist die <span className="text-[#FF2D55]">Wilde Muschel</span>?
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0]">
            Keine geschönte Kunstfigur, keine Heuchelei. Eine 47-jährige St. Pauli-Ikone packt aus – ungeniert, ehrlich und voller Herz.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('persona')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'persona'
                  ? 'bg-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.4)]'
                  : 'text-[#888] hover:text-[#F5F5F5]'
              }`}
            >
              Die Persona
            </button>
            <button
              onClick={() => setActiveTab('philosophie')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'philosophie'
                  ? 'bg-[#FF2D55] text-white shadow-[0_0_15px_rgba(255,45,85,0.4)]'
                  : 'text-[#888] hover:text-[#F5F5F5]'
              }`}
            >
              Philosophie & Reeperbahn
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'persona' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Image Card & Gallery Switcher */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#2a2a2a] shadow-2xl bg-[#0A0A0A]">
                <img
                  src={selectedImg === 'studio' ? HOST_IMAGE_URL : HOST_CURVY_IMAGE_URL}
                  alt="Wilde Muschel Host Portrait"
                  className="w-full h-80 sm:h-96 object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-[#F5F5F5] pointer-events-none">
                  <p className="text-[10px] uppercase text-[#D4AF37] tracking-[0.2em] font-semibold">
                    {selectedImg === 'studio' ? 'Studio Portrait' : 'Kiez Silhouette & Kurven'}
                  </p>
                  <p className="text-base sm:text-lg font-bold font-cinzel">47 Jahre • St. Pauli Original</p>
                </div>
              </div>

              {/* Image Selector Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedImg('studio')}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedImg === 'studio'
                      ? 'bg-[#121212] border-[#FF2D55] text-[#FF2D55]'
                      : 'bg-[#0A0A0A] border-[#2a2a2a] text-[#888] hover:text-[#F5F5F5]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" /> Studio-Porträt
                </button>
                <button
                  onClick={() => setSelectedImg('silhouette')}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedImg === 'silhouette'
                      ? 'bg-[#121212] border-[#FF2D55] text-[#FF2D55]'
                      : 'bg-[#0A0A0A] border-[#2a2a2a] text-[#888] hover:text-[#F5F5F5]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" /> Kiez-Silhouette
                </button>
              </div>
            </div>

            {/* Right Column: Persona Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#F5F5F5] font-cinzel flex items-center gap-2">
                  <Flame className="w-6 h-6 text-[#FF2D55]" /> Vom Rotlicht zur ungeschminkten Wahrheit
                </h3>
                <p className="text-[#A0A0A0] leading-relaxed">
                  Die Gastgeberin von „Wilde Muschel“ ist eine 47-jährige St. Pauli-Ikone mit unverwechselbarer Ausstrahlung: Ein unverkennbares Markenzeichen sind ihre stolzen Kurven und ihr beachtlicher Booty, gepaart mit der Fähigkeit, frei Schnauze zu erzählen, wie es sonst keine zweite kann.
                </p>
                <p className="text-[#A0A0A0] leading-relaxed">
                  Jahrelang arbeitete sie im Hamburger Rotlichtmilieu. Ihre Geschichten sind weder romantisierte Fiktion noch voyeuristischer Müll – sie redet schlagfertig, spritzig, direkt und zutiefst menschlich über alles, was auf und neben dem Kiez passiert.
                </p>
              </div>

              {/* Key Traits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-xl bg-[#121212] border border-[#2a2a2a] space-y-1">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37]" /> Direkt & Ungeschminkt
                  </div>
                  <p className="text-xs text-[#888]">Kein Heucheln, kein Moralisieren. Das Kind wird beim Namen genannt.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#121212] border border-[#2a2a2a] space-y-1">
                  <div className="flex items-center gap-2 text-[#FF2D55] font-bold text-sm">
                    <HeartHandshake className="w-4 h-4 text-[#FF2D55]" /> Warmherziger Kiez-Humor
                  </div>
                  <p className="text-xs text-[#888]">Lachen über Pannen, Mitgefühl für schräge Seelen, Echte Empathie.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#121212] border border-[#2a2a2a] space-y-1">
                  <div className="flex items-center gap-2 text-[#F5F5F5] font-bold text-sm">
                    <Shield className="w-4 h-4 text-[#D4AF37]" /> Volle Souveränität mit 47
                  </div>
                  <p className="text-xs text-[#888]">Kein Jugendwahn. Starke Ausstrahlung, Selbstliebe und ehrliche Kurven.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#121212] border border-[#2a2a2a] space-y-1">
                  <div className="flex items-center gap-2 text-[#FF2D55] font-bold text-sm">
                    <MessageCircle className="w-4 h-4 text-[#FF2D55]" /> Guschel mit Herz
                  </div>
                  <p className="text-xs text-[#888]">Guschel ist Hamburger Schnauze: Schnörkellos, laut, aber liebevoll.</p>
                </div>

              </div>

            </div>

          </div>
        )}

        {activeTab === 'philosophie' && (
          <div className="p-8 rounded-2xl bg-[#121212] border border-[#2a2a2a] space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#FF2D55]/20 text-[#FF2D55] shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#F5F5F5] font-cinzel">Keine Pornografie – Nur echte Geschichten</h4>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">
                  „Wilde Muschel“ verzichtet bewusst auf günstige Vulgarität oder Hardcore-Inhalte. Es ist eine Unterhaltungssendung für Erwachsene, die sich mit Vorurteilen, menschlicher Psychologie und ungeschminkter Realität auseinandersetzt.
                </p>
                <div className="pt-2 text-xs text-[#D4AF37] font-serif-italic">
                  „Wer die Wahrheit sucht, findet sie oft auf der Reeperbahn – nachts um halb zwei!“
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

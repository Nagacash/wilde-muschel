import React from 'react';
import { KIEZ_TOPICS } from '../data/podcastData';
import { Flame, Users, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

interface TopicsSectionProps {
  onSelectTopic: (topicId: string) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({ onSelectTopic }) => {
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-[#FF2D55]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#D4AF37]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#F5F5F5]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#FF2D55]" />;
      default: return <Flame className="w-5 h-5 text-[#FF2D55]" />;
    }
  };

  return (
    <section id="themen" className="py-20 bg-[#050505] border-t border-[#1a1a1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-[#2a2a2a] text-[#D4AF37] text-[11px] font-semibold tracking-[0.25em] uppercase">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37]" /> THEMEN & REEPERBAHN-STORIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight font-cinzel">
            Worüber die <span className="text-[#FF2D55]">Guschel</span> redet
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0A0]">
            Vier Schwerpunkte ohne Tabus. Klicken Sie auf ein Thema, um die passenden Episoden im Player anzuzeigen.
          </p>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KIEZ_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => {
                onSelectTopic(topic.id);
                const el = document.getElementById('episodes');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group p-6 rounded-2xl bg-[#121212] hover:bg-[#161616] border border-[#2a2a2a] hover:border-[#FF2D55]/60 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-xl hover:shadow-[0_0_25px_rgba(255,45,85,0.25)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1a1a1a] group-hover:scale-110 transition-transform">
                    {getTopicIcon(topic.icon)}
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-[#0A0A0A] border border-[#2a2a2a] text-[#A0A0A0] group-hover:bg-[#FF2D55] group-hover:text-white transition-colors">
                    {topic.episodesCount} Folgen
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors font-cinzel">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-[#FF2D55] font-semibold mt-0.5">
                    {topic.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                  {topic.description}
                </p>

                <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1a1a1a] text-[11px] text-[#D4AF37] font-serif-italic">
                  „{topic.quoteSnippet}“
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-[#D4AF37] group-hover:text-[#FF2D55] transition-colors">
                <span>Folgen anzeigen</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

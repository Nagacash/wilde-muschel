import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { TopicsSection } from '../components/TopicsSection';

interface UberPageProps {
  onSelectTopic: (topic: string) => void;
}

export const UberPage: React.FC<UberPageProps> = ({ onSelectTopic }) => {
  return (
    <main className="min-h-screen bg-[#050505]">
      <AboutSection />
      <TopicsSection onSelectTopic={onSelectTopic} />
    </main>
  );
};

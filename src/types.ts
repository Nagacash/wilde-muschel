export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  publishDate: string;
  category: 'Reeperbahn' | 'Sex-Stories' | 'Freier' | 'Real-Talk' | 'Kiez-Geflüster';
  description: string;
  teaserSnippet: string;
  tags: string[];
  audioUrl: string;
  plays: number;
  isExplicit: boolean;
  featured?: boolean;
}

export interface CharacterDetail {
  feature: string;
  description: string;
  visualNote: string;
}

export interface DesignConceptSection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  contentGermanText: string;
  keyPoints: string[];
}

export interface KiezTopic {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  quoteSnippet: string;
  episodesCount: number;
}

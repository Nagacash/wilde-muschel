import React from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  episodeId: string;
  count: number;
  liked: boolean;
  disabled?: boolean;
  onToggle: (episodeId: string) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  episodeId,
  count,
  liked,
  disabled = false,
  onToggle,
}) => {
  const formatted = count.toLocaleString('de-DE');

  return (
    <button
      type="button"
      onClick={() => onToggle(episodeId)}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={liked ? `${formatted} Likes, gefällt dir` : `${formatted} Likes`}
      title={liked ? 'Like entfernen' : 'Folge liken'}
      className={`min-h-11 px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-[background-color,border-color,color,box-shadow] duration-base ease-out-expo disabled:opacity-60 disabled:cursor-wait ${
        liked
          ? 'bg-rotlicht/15 border-rotlicht text-rotlicht shadow-[0_0_12px_rgba(255,45,85,0.35)]'
          : 'bg-ink border-line text-[#A0A0A0] hover:text-cream hover:border-rotlicht/50'
      }`}
    >
      <Heart
        className={`w-3.5 h-3.5 ${liked ? 'fill-current text-rotlicht' : 'text-rotlicht'}`}
        aria-hidden="true"
      />
      <span className="tabular-nums font-semibold leading-none">{formatted}</span>
      <span className="uppercase tracking-wider text-[10px]">Likes</span>
    </button>
  );
};

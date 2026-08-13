import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import {
  EpisodeComment,
  getStoredCommentName,
} from '../hooks/useEpisodeComments';

interface EpisodeCommentsProps {
  episodeId: string;
  comments: EpisodeComment[];
  loading: boolean;
  sending: boolean;
  error: string | null;
  onSend: (episodeId: string, authorName: string, body: string) => Promise<boolean>;
}

function formatStamp(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const EpisodeComments: React.FC<EpisodeCommentsProps> = ({
  episodeId,
  comments,
  loading,
  sending,
  error,
  onSend,
}) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setName(getStoredCommentName());
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [comments.length, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onSend(episodeId, name, body);
    if (ok) setBody('');
  };

  return (
    <div className="mt-4 rounded-2xl border border-line bg-ink overflow-hidden">
      <div className="px-4 py-2.5 border-b border-line flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Kiez-Chat
        </p>
        <p className="text-[11px] text-dim">
          {comments.length.toLocaleString('de-DE')}{' '}
          {comments.length === 1 ? 'Kommentar' : 'Kommentare'}
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="max-h-72 overflow-y-auto px-3 py-3 space-y-2"
        aria-live="polite"
      >
        {loading && (
          <p className="text-xs text-dim text-center py-6">Lade Kommentare…</p>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-xs text-dim text-center py-6">
            Noch still hier. Schreib den ersten Kommentar.
          </p>
        )}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`flex ${comment.mine ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                comment.mine
                  ? 'bg-rotlicht text-cream rounded-2xl rounded-br-sm'
                  : 'bg-panel border border-line text-cream rounded-2xl rounded-bl-sm'
              }`}
            >
              <p
                className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${
                  comment.mine ? 'text-cream/80' : 'text-gold'
                }`}
              >
                {comment.mine ? 'Du' : comment.authorName}
                <span className="ml-2 font-normal tracking-normal opacity-70">
                  {formatStamp(comment.createdAt)}
                </span>
              </p>
              <p className="whitespace-pre-wrap wrap-break-word">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-line p-3 grid grid-cols-1 sm:grid-cols-[8rem_1fr_auto] gap-2"
      >
        <label className="sr-only" htmlFor={`comment-name-${episodeId}`}>
          Name
        </label>
        <input
          id={`comment-name-${episodeId}`}
          type="text"
          maxLength={32}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dein Name"
          autoComplete="nickname"
          required
          className="min-h-11 px-3 rounded-xl bg-panel border border-line text-cream text-sm placeholder:text-dim"
        />
        <label className="sr-only" htmlFor={`comment-body-${episodeId}`}>
          Kommentar
        </label>
        <input
          id={`comment-body-${episodeId}`}
          type="text"
          maxLength={400}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Schreib was, frei Schnauze…"
          required
          className="min-h-11 px-3 rounded-xl bg-panel border border-line text-cream text-sm placeholder:text-dim"
        />
        <button
          type="submit"
          disabled={sending}
          className="min-h-11 px-4 rounded-xl bg-rotlicht hover:bg-rotlicht-hot text-cream font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          <Send className="w-3.5 h-3.5" aria-hidden="true" />
          Senden
        </button>
        {error && (
          <p className="sm:col-span-3 text-xs text-rotlicht" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

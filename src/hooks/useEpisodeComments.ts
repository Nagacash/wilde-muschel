import { useCallback, useEffect, useState } from 'react';
import { getVisitorId } from '../lib/visitorId';

export interface EpisodeComment {
  id: string;
  episodeId: string;
  authorName: string;
  body: string;
  createdAt: string;
  mine: boolean;
}

const NAME_KEY = 'wm-comment-name';

export function getStoredCommentName(): string {
  try {
    return window.localStorage.getItem(NAME_KEY) || '';
  } catch {
    return '';
  }
}

export function storeCommentName(name: string) {
  try {
    window.localStorage.setItem(NAME_KEY, name);
  } catch {
    /* ignore */
  }
}

export function useEpisodeComments() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [openId, setOpenId] = useState<string | null>(null);
  const [comments, setComments] = useState<EpisodeComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/comments')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { counts?: Record<string, number> }) => {
        setCounts(data.counts || {});
      })
      .catch(() => {
        /* keep zeros */
      });
  }, []);

  useEffect(() => {
    if (!openId) {
      setComments([]);
      setError(null);
      return;
    }
    const visitorId = getVisitorId();
    setLoading(true);
    setError(null);
    fetch(
      `/api/comments?episodeId=${encodeURIComponent(openId)}&visitorId=${encodeURIComponent(visitorId)}`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { counts?: Record<string, number>; comments?: EpisodeComment[] }) => {
        setCounts(data.counts || {});
        setComments(data.comments || []);
      })
      .catch(() => {
        setError('Kommentare konnten nicht geladen werden.');
      })
      .finally(() => setLoading(false));
  }, [openId]);

  const toggleOpen = useCallback((episodeId: string) => {
    setOpenId((prev) => (prev === episodeId ? null : episodeId));
  }, []);

  const postComment = useCallback(async (episodeId: string, authorName: string, body: string) => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          episodeId,
          visitorId: getVisitorId(),
          authorName,
          body,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.comment) {
        throw new Error(data.error || 'comment failed');
      }
      storeCommentName(authorName);
      setComments((prev) => [...prev, data.comment]);
      setCounts(data.counts || {});
      return true;
    } catch {
      setError('Konnte nicht gesendet werden. Kurz warten und nochmal versuchen.');
      return false;
    } finally {
      setSending(false);
    }
  }, []);

  return {
    counts,
    openId,
    comments,
    loading,
    sending,
    error,
    toggleOpen,
    postComment,
  };
}

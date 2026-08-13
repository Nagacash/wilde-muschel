import { useCallback, useEffect, useState } from 'react';
import { getVisitorId } from '../lib/visitorId';

interface LikeState {
  counts: Record<string, number>;
  liked: Set<string>;
  pendingId: string | null;
  ready: boolean;
}

export function useEpisodeLikes() {
  const [state, setState] = useState<LikeState>({
    counts: {},
    liked: new Set(),
    pendingId: null,
    ready: false,
  });

  useEffect(() => {
    const visitorId = getVisitorId();
    fetch(`/api/likes?visitorId=${encodeURIComponent(visitorId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { counts?: Record<string, number>; liked?: string[] }) => {
        setState((prev) => ({
          ...prev,
          counts: data.counts || {},
          liked: new Set(data.liked || []),
          ready: true,
        }));
      })
      .catch(() => {
        setState((prev) => ({ ...prev, ready: true }));
      });
  }, []);

  const toggleLike = useCallback(async (episodeId: string) => {
    setState((prev) => {
      if (prev.pendingId) return prev;
      const wasLiked = prev.liked.has(episodeId);
      const nextLiked = new Set(prev.liked);
      if (wasLiked) nextLiked.delete(episodeId);
      else nextLiked.add(episodeId);
      return {
        ...prev,
        pendingId: episodeId,
        liked: nextLiked,
        counts: {
          ...prev.counts,
          [episodeId]: Math.max(0, (prev.counts[episodeId] || 0) + (wasLiked ? -1 : 1)),
        },
      };
    });

    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ episodeId, visitorId: getVisitorId() }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.count !== 'number') {
        throw new Error(data.error || 'like failed');
      }
      setState((prev) => {
        const nextLiked = new Set(prev.liked);
        if (data.liked) nextLiked.add(episodeId);
        else nextLiked.delete(episodeId);
        return {
          ...prev,
          pendingId: null,
          liked: nextLiked,
          counts: { ...prev.counts, [episodeId]: data.count },
        };
      });
    } catch {
      setState((prev) => {
        const nextLiked = new Set(prev.liked);
        const currentlyLiked = nextLiked.has(episodeId);
        if (currentlyLiked) nextLiked.delete(episodeId);
        else nextLiked.add(episodeId);
        return {
          ...prev,
          pendingId: null,
          liked: nextLiked,
          counts: {
            ...prev.counts,
            [episodeId]: Math.max(
              0,
              (prev.counts[episodeId] || 0) + (currentlyLiked ? -1 : 1)
            ),
          },
        };
      });
    }
  }, []);

  return {
    counts: state.counts,
    liked: state.liked,
    pendingId: state.pendingId,
    ready: state.ready,
    toggleLike,
  };
}

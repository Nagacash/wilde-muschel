const VISITOR_KEY = 'wm-visitor-id';

export function getVisitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing && /^[a-z0-9-]{8,64}$/i.test(existing)) {
      return existing;
    }
    const next = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return 'anon-session';
  }
}

import { neon } from '@neondatabase/serverless';

const EPISODE_ID = /^[a-z0-9-]{1,64}$/i;
const VISITOR_ID = /^[a-z0-9-]{8,64}$/i;

// One play counted per visitor per episode per session — same pattern as likes.
// Prevents a single person inflating the counter by refreshing or replaying.

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    const err = new Error('DATABASE_URL is not set');
    err.statusCode = 503;
    throw err;
  }
  return neon(url);
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS episode_plays (
      id           BIGSERIAL PRIMARY KEY,
      episode_id   TEXT      NOT NULL,
      visitor_id   TEXT      NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (episode_id, visitor_id)
    )
  `;
}

async function handleGet(_req, res) {
  const sql = getSql();
  await ensureTable(sql);

  const rows = await sql`
    SELECT episode_id, COUNT(*)::int AS count
    FROM episode_plays
    GROUP BY episode_id
  `;

  const counts = {};
  for (const row of rows) counts[row.episode_id] = row.count;

  res.json({ counts });
}

async function handlePost(req, res) {
  const episodeId = String(req.body?.episodeId || '').trim();
  const visitorId = String(req.body?.visitorId || '').trim();

  if (!EPISODE_ID.test(episodeId)) {
    res.status(400).json({ error: 'Invalid episodeId' });
    return;
  }
  if (!VISITOR_ID.test(visitorId)) {
    res.status(400).json({ error: 'Invalid visitorId' });
    return;
  }

  const sql = getSql();
  await ensureTable(sql);

  // INSERT … ON CONFLICT DO NOTHING — idempotent, one row per visitor/episode
  await sql`
    INSERT INTO episode_plays (episode_id, visitor_id)
    VALUES (${episodeId}, ${visitorId})
    ON CONFLICT (episode_id, visitor_id) DO NOTHING
  `;

  const [row] = await sql`
    SELECT COUNT(*)::int AS count
    FROM episode_plays
    WHERE episode_id = ${episodeId}
  `;

  res.json({ episodeId, count: row?.count ?? 1 });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') { await handleGet(req, res); return; }
    if (req.method === 'POST') { await handlePost(req, res); return; }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const status = err.statusCode || 500;
    console.error('Plays API error:', err);
    res.status(status).json({
      error: status === 503 ? 'Play tracking temporarily unavailable' : 'Could not record play',
    });
  }
}

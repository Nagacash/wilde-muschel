import { neon } from '@neondatabase/serverless';

const EPISODE_ID = /^[a-z0-9-]{1,64}$/i;
const VISITOR_ID = /^[a-z0-9-]{8,64}$/i;

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    const err = new Error('DATABASE_URL is not set');
    err.statusCode = 503;
    throw err;
  }
  return neon(url);
}

function badRequest(res, message) {
  res.status(400).json({ error: message });
}

async function handleGet(req, res) {
  const visitorId = String(req.query?.visitorId || '').trim();
  const sql = getSql();

  const countsRows = await sql`
    SELECT episode_id, COUNT(*)::int AS count
    FROM episode_likes
    GROUP BY episode_id
  `;

  const counts = {};
  for (const row of countsRows) {
    counts[row.episode_id] = row.count;
  }

  let liked = [];
  if (visitorId && VISITOR_ID.test(visitorId)) {
    const likedRows = await sql`
      SELECT episode_id
      FROM episode_likes
      WHERE visitor_id = ${visitorId}
    `;
    liked = likedRows.map((row) => row.episode_id);
  }

  res.json({ counts, liked });
}

async function handlePost(req, res) {
  const episodeId = String(req.body?.episodeId || '').trim();
  const visitorId = String(req.body?.visitorId || '').trim();

  if (!EPISODE_ID.test(episodeId)) {
    badRequest(res, 'Invalid episodeId');
    return;
  }
  if (!VISITOR_ID.test(visitorId)) {
    badRequest(res, 'Invalid visitorId');
    return;
  }

  const sql = getSql();
  const existing = await sql`
    SELECT 1
    FROM episode_likes
    WHERE episode_id = ${episodeId} AND visitor_id = ${visitorId}
    LIMIT 1
  `;

  let liked;
  if (existing.length > 0) {
    await sql`
      DELETE FROM episode_likes
      WHERE episode_id = ${episodeId} AND visitor_id = ${visitorId}
    `;
    liked = false;
  } else {
    await sql`
      INSERT INTO episode_likes (episode_id, visitor_id)
      VALUES (${episodeId}, ${visitorId})
    `;
    liked = true;
  }

  const [row] = await sql`
    SELECT COUNT(*)::int AS count
    FROM episode_likes
    WHERE episode_id = ${episodeId}
  `;

  res.json({ episodeId, liked, count: row?.count ?? 0 });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await handleGet(req, res);
      return;
    }
    if (req.method === 'POST') {
      await handlePost(req, res);
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const status = err.statusCode || 500;
    console.error('Likes API error:', err);
    res.status(status).json({
      error: status === 503 ? 'Likes are temporarily unavailable' : 'Could not update likes',
    });
  }
}

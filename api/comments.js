import { neon } from '@neondatabase/serverless';

const EPISODE_ID = /^[a-z0-9-]{1,64}$/i;
const VISITOR_ID = /^[a-z0-9-]{8,64}$/i;
const MAX_NAME = 32;
const MAX_BODY = 400;
const MAX_PER_VISITOR = 8;
const COOLDOWN_MS = 8000;

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    const err = new Error('DATABASE_URL is not set');
    err.statusCode = 503;
    throw err;
  }
  return neon(url);
}

function cleanText(value, max) {
  return String(value || '')
    .replace(/[\u0000-\u001F<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function mapComment(row, visitorId) {
  return {
    id: row.id,
    episodeId: row.episode_id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
    mine: Boolean(visitorId) && row.visitor_id === visitorId,
  };
}

async function getCounts(sql) {
  const rows = await sql`
    SELECT episode_id, COUNT(*)::int AS count
    FROM episode_comments
    GROUP BY episode_id
  `;
  const counts = {};
  for (const row of rows) counts[row.episode_id] = row.count;
  return counts;
}

async function handleGet(req, res) {
  const episodeId = String(req.query?.episodeId || '').trim();
  const visitorId = String(req.query?.visitorId || '').trim();
  const sql = getSql();
  const counts = await getCounts(sql);

  if (!episodeId) {
    res.json({ counts, comments: [] });
    return;
  }
  if (!EPISODE_ID.test(episodeId)) {
    res.status(400).json({ error: 'Invalid episodeId' });
    return;
  }

  const rows = await sql`
    SELECT id, episode_id, visitor_id, author_name, body, created_at
    FROM episode_comments
    WHERE episode_id = ${episodeId}
    ORDER BY created_at ASC
    LIMIT 100
  `;

  const safeVisitor = VISITOR_ID.test(visitorId) ? visitorId : '';
  res.json({
    counts,
    comments: rows.map((row) => mapComment(row, safeVisitor)),
  });
}

async function handlePost(req, res) {
  const episodeId = String(req.body?.episodeId || '').trim();
  const visitorId = String(req.body?.visitorId || '').trim();
  const authorName = cleanText(req.body?.authorName, MAX_NAME);
  const body = cleanText(req.body?.body, MAX_BODY);

  if (!EPISODE_ID.test(episodeId)) {
    res.status(400).json({ error: 'Invalid episodeId' });
    return;
  }
  if (!VISITOR_ID.test(visitorId)) {
    res.status(400).json({ error: 'Invalid visitorId' });
    return;
  }
  if (authorName.length < 2) {
    res.status(400).json({ error: 'Name is too short' });
    return;
  }
  if (body.length < 1) {
    res.status(400).json({ error: 'Comment is empty' });
    return;
  }

  const sql = getSql();

  const [quota] = await sql`
    SELECT COUNT(*)::int AS count
    FROM episode_comments
    WHERE episode_id = ${episodeId} AND visitor_id = ${visitorId}
  `;
  if ((quota?.count || 0) >= MAX_PER_VISITOR) {
    res.status(429).json({ error: 'Comment limit reached for this episode' });
    return;
  }

  const [recent] = await sql`
    SELECT created_at
    FROM episode_comments
    WHERE visitor_id = ${visitorId}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  if (recent?.created_at) {
    const age = Date.now() - new Date(recent.created_at).getTime();
    if (age < COOLDOWN_MS) {
      res.status(429).json({ error: 'Please wait a moment before commenting again' });
      return;
    }
  }

  const [created] = await sql`
    INSERT INTO episode_comments (episode_id, visitor_id, author_name, body)
    VALUES (${episodeId}, ${visitorId}, ${authorName}, ${body})
    RETURNING id, episode_id, visitor_id, author_name, body, created_at
  `;

  const counts = await getCounts(sql);
  res.status(201).json({
    comment: mapComment(created, visitorId),
    counts,
  });
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
    console.error('Comments API error:', err);
    res.status(status).json({
      error: status === 503 ? 'Comments are temporarily unavailable' : 'Could not save comment',
    });
  }
}

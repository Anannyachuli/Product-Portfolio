import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.query.key;
  if (secret !== process.env.CONVERSATIONS_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return res.status(500).json({ error: 'Redis not configured' });
  }

  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const raw = await redis.lrange('portfolio:conversations', 0, limit - 1);

    const conversations = raw.map((entry) => {
      if (typeof entry === 'string') {
        try { return JSON.parse(entry); } catch { return entry; }
      }
      return entry;
    });

    return res.status(200).json({
      count: conversations.length,
      conversations,
    });
  } catch (err) {
    console.error('Conversations API error:', err);
    return res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}

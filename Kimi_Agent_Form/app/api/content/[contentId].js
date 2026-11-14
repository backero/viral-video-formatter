import { get } from '@vercel/blob';

// Vercel Serverless Function: fetch a previously saved project snapshot by
// its share-link ID. useCache: false ensures a collaborator's latest save
// is read immediately rather than a stale CDN-cached copy.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Invalid request method. Use GET.' });
  }

  const { contentId } = req.query;

  if (!contentId) {
    return res.status(400).json({ error: 'Content ID required' });
  }

  try {
    const pathname = `content/${contentId}.json`;
    const result = await get(pathname, { access: 'private', useCache: false });

    if (!result) {
      return res.status(404).json({ error: 'Shared content not found. The link may be invalid or expired.' });
    }

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Get content error:', error);
    return res.status(500).json({ error: error.message || 'Failed to load shared content' });
  }
}

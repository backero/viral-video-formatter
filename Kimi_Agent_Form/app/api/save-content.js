import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

// Vercel Serverless Function: persist a project snapshot to Blob storage so
// it can be opened via a share link from any device/browser, and re-saved
// in place by whoever is editing it (pass the same contentId back to update
// instead of creating a new blob).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Invalid request method. Use POST.' });
  }

  const { contentId, phase1Data, phase2Data, phase3Data, phase4Data, phase5Data } = req.body;

  try {
    const id = contentId || randomUUID();
    const pathname = `content/${id}.json`;

    const payload = JSON.stringify({
      phase1Data: phase1Data || {},
      phase2Data: phase2Data || {},
      phase3Data: phase3Data || {},
      phase4Data: phase4Data || {},
      phase5Data: phase5Data || {},
      updatedAt: new Date().toISOString(),
    });

    await put(pathname, payload, {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers.host;
    const shareUrl = `${proto}://${host}/#/share/${id}`;

    return res.status(200).json({ success: true, contentId: id, shareUrl });
  } catch (error) {
    console.error('Save content error:', error);
    return res.status(500).json({ error: error.message || 'Failed to save content' });
  }
}

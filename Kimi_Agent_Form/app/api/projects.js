import { put, get } from '@vercel/blob';

// Vercel Serverless Function: shared team project list, backed by one JSON
// blob (projects/index.json). This is what makes the Dashboard the same for
// everyone on the team instead of each browser's private localStorage.
const INDEX_PATHNAME = 'projects/index.json';

async function readIndex() {
  const result = await get(INDEX_PATHNAME, { access: 'private', useCache: false });
  if (!result) return [];
  const text = await new Response(result.stream).text();
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function writeIndex(projects) {
  await put(INDEX_PATHNAME, JSON.stringify(projects), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const projects = await readIndex();
      return res.status(200).json({ projects });
    }

    if (req.method === 'POST') {
      const { project } = req.body;
      if (!project || !project.id) {
        return res.status(400).json({ error: 'Project with an id is required' });
      }
      const projects = await readIndex();
      const idx = projects.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        projects[idx] = project;
      } else {
        projects.push(project);
      }
      await writeIndex(projects);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id || req.body?.id;
      if (!id) {
        return res.status(400).json({ error: 'Project id is required' });
      }
      const projects = await readIndex();
      await writeIndex(projects.filter((p) => p.id !== id));
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Invalid request method. Use GET, POST, or DELETE.' });
  } catch (error) {
    console.error('Projects API error:', error);
    return res.status(500).json({ error: error.message || 'Failed to process projects request' });
  }
}

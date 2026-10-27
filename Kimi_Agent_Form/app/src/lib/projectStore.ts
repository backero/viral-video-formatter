import type { FormData } from '@/context/FormDataContext';

export interface ProjectSummary {
  id: string;
  title: string;
  creator: string;
  phase: number; // 1-6, current furthest phase reached
  status: 'Draft' | 'In Progress' | 'Pending Approval' | 'Approved' | 'Complete';
  updatedAt: number;
  data: FormData;
}

const PROJECTS_KEY = 'viralform_projects';

function readAll(): ProjectSummary[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(projects: ProjectSummary[]) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function listProjects(): ProjectSummary[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getProject(id: string): ProjectSummary | null {
  return readAll().find((p) => p.id === id) || null;
}

function deriveTitle(data: FormData): string {
  return (
    data.thePoint ||
    (data.nuggetOptions && data.selectedNuggetIndex !== null
      ? (data.nuggetOptions[data.selectedNuggetIndex] as any)?.point
      : null) ||
    data.research?.slice(0, 60) ||
    'Untitled Video'
  );
}

function deriveStatus(phase: number): ProjectSummary['status'] {
  if (phase <= 1) return 'Draft';
  if (phase <= 3) return 'In Progress';
  if (phase === 4) return 'Pending Approval';
  return 'Approved';
}

/**
 * Save or update a project snapshot. If data.projectId already exists, updates that
 * entry; otherwise creates a new one and returns its generated id.
 */
export function saveProject(
  data: FormData,
  phase: number,
  existingId?: string | null,
  statusOverride?: ProjectSummary['status']
): string {
  const projects = readAll();
  const id = existingId || `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const idx = projects.findIndex((p) => p.id === id);

  const summary: ProjectSummary = {
    id,
    title: deriveTitle(data),
    creator: data.creator || 'You',
    phase,
    status: statusOverride || deriveStatus(phase),
    updatedAt: Date.now(),
    data,
  };

  if (idx >= 0) {
    projects[idx] = summary;
  } else {
    projects.push(summary);
  }
  writeAll(projects);
  return id;
}

export function deleteProject(id: string) {
  writeAll(readAll().filter((p) => p.id !== id));
}

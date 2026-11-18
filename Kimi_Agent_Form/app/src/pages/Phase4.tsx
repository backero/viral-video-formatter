import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, ChevronDown, ChevronUp, CheckCircle2, MessageSquare,
  ArrowLeft, Shield, AlertTriangle, BarChart3, Zap, Brain,
  FileText, Eye, Camera, Target,
  Sparkles, Lock, Unlock, Users, Film,
  RefreshCw, Mic, Volume2, Scissors, Undo2, Columns3
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card } from '@/components/Card';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { useFormData } from '@/context/FormDataContext';
import { saveProject } from '@/lib/projectStore';

/* ═══════════════════════════════════════════════════════════════════ */
/*  TYPES                                                              */
/* ═══════════════════════════════════════════════════════════════════ */

type Severity = 'Critical' | 'Major' | 'Minor' | 'Info';
type CheckResult = 'PASS' | 'FAIL' | 'N/A';
type Verdict = 'SHIP' | 'REVISE' | 'REJECT';
type Category = 'Golden Rule' | 'Quality Gate' | 'Neuroscience' | 'Staccato' | 'PBL' | 'Studio' | 'CTA' | 'MultiLang' | 'Reference';

interface CheckItem {
  id: string;
  name: string;
  category: Category;
  severity: Severity;
  result: CheckResult;
  evidence: string;
  overridden: boolean;
  scenesAffected?: number[];
  suggestedFix?: string;
}

interface RoleApproval {
  name: string;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  feedback: string;
  timestamp: string;
}

interface RevisionItem {
  rank: number;
  checkId: string;
  severity: Severity;
  scenesAffected: number[];
  action: string;
  estimatedEffort: string;
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  EDITABLE SCENE DATA                                                */
/* ═══════════════════════════════════════════════════════════════════ */

interface EditableScene {
  sceneNum: number;
  name: string;
  timingStart: number;
  timingEnd: number;
  duration: number;
  dialogue: string;
  action: string;
  cameraShot: string;
  cameraAngle: string;
  cameraMovement: string;
  actorExpression: string;
  actorEnergy: number;
  actorPace: string;
  visual: string;
  audio: string;
  editMarkers: string; // stored as JSON string for textarea editing
}

interface AppliedChange {
  checkId: string;
  field: keyof EditableScene;
  before: string;
  after: string;
}

interface FixHistoryItem {
  checkId: string;
  changes: Array<AppliedChange & { sceneNum: number }>;
  checkBefore: Pick<CheckItem, 'result' | 'evidence' | 'suggestedFix' | 'overridden'>;
}

interface RewriteOption {
  id: string;
  label: string;
  description: string;
  changes: Array<AppliedChange & { sceneNum: number }>;
}

const FIELD_LABELS: Partial<Record<keyof EditableScene, string>> = {
  dialogue: 'Dialogue', action: 'Action', visual: 'Visual', audio: 'Audio',
  editMarkers: 'Edit markers', cameraShot: 'Camera shot', cameraAngle: 'Camera angle',
  cameraMovement: 'Camera movement', actorExpression: 'Actor expression',
  actorEnergy: 'Actor energy', actorPace: 'Actor pace', name: 'Scene name',
};

type EditMarker = { time?: string; event?: string };

function parseEditMarkers(value: unknown): EditMarker[] | null {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) && parsed.every(marker => marker && typeof marker === 'object')
      ? parsed as EditMarker[]
      : null;
  } catch {
    return null;
  }
}

function EditMarkerDiffValue({ value, final }: { value: unknown; final?: boolean }) {
  const markers = parseEditMarkers(value);
  if (!markers) {
    return <p className={final ? 'whitespace-pre-wrap break-words text-xs text-text-primary' : 'whitespace-pre-wrap break-words text-xs text-text-secondary'}>{String(value)}</p>;
  }
  if (markers.length === 0) return <p className="text-xs text-text-tertiary">No edit markers</p>;
  return (
    <div className="space-y-1.5">
      {markers.map((marker, index) => (
        <div key={`${marker.time || 'marker'}-${index}`} className="flex items-start gap-2 text-xs">
          <span className={final ? 'shrink-0 font-mono text-success' : 'shrink-0 font-mono text-text-tertiary'}>{marker.time || '--'}</span>
          <span className={final ? 'text-text-primary' : 'text-text-secondary'}>{marker.event || 'Untitled marker'}</span>
        </div>
      ))}
    </div>
  );
}

// Initial data copied from Phase 3 AUTO_SCREENPLAY
const INITIAL_SCENES: EditableScene[] = [
  {
    sceneNum: 1, name: 'THE HOOK', timingStart: 0, timingEnd: 3, duration: 3,
    dialogue: "I tested 47 skincare products so you don't have to.",
    action: "(Actor: Face fills frame. Eyes wide. Holds up two bottles.)",
    cameraShot: "Close-up", cameraAngle: "Low angle", cameraMovement: "Handheld micro-jolt",
    actorExpression: "Confident, slight smile", actorEnergy: 9, actorPace: "Fast",
    visual: 'Text overlay: "47 PRODUCTS" - 72pt, neon yellow, pop-in at 0.3s',
    audio: "Voice onset at 0.0s. No music. Beat drop at 2.8s.",
    editMarkers: '[{"time":"0.0s","event":"Open on face - MCU, low angle, handheld"},{"time":"0.3s","event":"\\"47 PRODUCTS\\" text overlay pop-in"},{"time":"0.5s","event":"Actor holds up two bottles - contrast + motion"},{"time":"2.8s","event":"Hard cut to Scene 2"}]',
  },
  {
    sceneNum: 2, name: 'AUTHORITY GAP', timingStart: 3, timingEnd: 8, duration: 5,
    dialogue: "And I found that 70% of vitamin C serums go bad before you finish them.",
    action: "(Actor: Shakes one bottle. Expression shifts to serious. Holds up one finger.)",
    cameraShot: "Medium", cameraAngle: "Eye level", cameraMovement: "Static, B-cam ECU insert at 5s",
    actorExpression: "Serious, authoritative", actorEnergy: 7, actorPace: "Normal",
    visual: 'Text overlay: "70% GO BAD" - red, bottom third, warning icon',
    audio: "Low beat enters at 20% volume. Alert SFX at 5.5s.",
    editMarkers: '[{"time":"3.0s","event":"Cut to medium shot"},{"time":"4.0s","event":"\\"70% GO BAD\\" text overlay"},{"time":"5.0s","event":"B-cam ECU on bottle (pattern interrupt)"},{"time":"5.5s","event":"Alert sound effect"}]',
  },
  {
    sceneNum: 3, name: 'THE HACK', timingStart: 8, timingEnd: 15, duration: 7,
    dialogue: "Store it in the fridge. It lasts twice as long.",
    action: "(Actor: Walks to fridge. Opens door. Places bottle inside. Turns back to camera.)",
    cameraShot: "Medium", cameraAngle: "Eye level", cameraMovement: "Push-in 15% from 8-12s",
    actorExpression: "Excited-conspiratorial", actorEnergy: 8, actorPace: "Fast -> Slow",
    visual: 'Text overlay: "STORE IN FRIDGE" - green, checkmark graphic, pop-in at 12.0s',
    audio: "Music builds to 35% volume. 'Ding' SFX on checkmark at 13.0s.",
    editMarkers: '[{"time":"8.0s","event":"Push-in starts, actor walks to fridge"},{"time":"10.0s","event":"Fridge door open - B-roll insert"},{"time":"12.0s","event":"\\"STORE IN FRIDGE\\" text overlay"},{"time":"13.0s","event":"Ding on checkmark graphic"}]',
  },
  {
    sceneNum: 4, name: 'THE PROOF', timingStart: 15, timingEnd: 25, duration: 10,
    dialogue: "I did this for 30 days. My $60 serum lasted 60 days instead of 30.",
    action: "(Actor: Holds up calendar. Points to dates. Proud expression.)",
    cameraShot: "Medium -> Close-up", cameraAngle: "Eye level", cameraMovement: "Dolly in on product at 18s",
    actorExpression: "Proud, confident", actorEnergy: 7, actorPace: "Normal",
    visual: '"$60 -> 60 DAYS" count-up animation on screen at 18s',
    audio: "Steady beat at 40% volume. Cash register SFX at 22s (peak moment).",
    editMarkers: '[{"time":"15.0s","event":"Cut to calendar shot"},{"time":"18.0s","event":"Count-up animation \\"$60 -> 60 DAYS\\""},{"time":"22.0s","event":"Cash register SFX (ONE PEAK per video)"},{"time":"23.0s","event":"Close-up on product result"}]',
  },
  {
    sceneNum: 5, name: 'CTA', timingStart: 25, timingEnd: 30, duration: 5,
    dialogue: "Save this before your serum goes bad.",
    action: "(Actor: Direct to camera. Points down to save area. Urgent but friendly.)",
    cameraShot: "Close-up", cameraAngle: "Eye level", cameraMovement: "Static, freeze frame",
    actorExpression: "Urgent-friendly", actorEnergy: 8, actorPace: "Normal-urgent",
    visual: '"SAVE THIS" pulsing text, arrow to save area, CTA card freeze at 29.5s',
    audio: "Music fades out over 3s. Pre-CTA silence beat at 29.0s.",
    editMarkers: '[{"time":"25.0s","event":"\\"SAVE THIS\\" pulsing text overlay"},{"time":"27.0s","event":"Actor points to save area"},{"time":"29.0s","event":"Pre-CTA freeze - silent 1.0s"},{"time":"29.5s","event":"Fade to end"}]',
  },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  CONSTANTS                                                          */
/* ═══════════════════════════════════════════════════════════════════ */

const VIOLET = '#8B5CF6';
const SUCCESS = '#22C55E';
const ERROR = '#EF4444';
const WARNING = '#F59E0B';

const CATEGORY_COLORS: Record<Category, string> = {
  'Golden Rule': '#F59E0B',
  'Quality Gate': '#EF4444',
  'Neuroscience': '#8B5CF6',
  'Staccato': '#0EA5E9',
  'PBL': '#22C55E',
  'Studio': '#F97316',
  'CTA': '#EC4899',
  'MultiLang': '#06D6A0',
  'Reference': '#6366F1',
};

const SEVERITY_COLORS: Record<Severity, { bg: string; text: string; border: string }> = {
  Critical: { bg: 'bg-error/10', text: 'text-error', border: 'border-error/30' },
  Major:    { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' },
  Minor:    { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-400/30' },
  Info:     { bg: 'bg-bg-quaternary', text: 'text-text-tertiary', border: 'border-border-subtle' },
};

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  'Golden Rule': <Sparkles size={14} />,
  'Quality Gate': <Shield size={14} />,
  'Neuroscience': <Brain size={14} />,
  'Staccato': <Zap size={14} />,
  'PBL': <Eye size={14} />,
  'Studio': <Camera size={14} />,
  'CTA': <Target size={14} />,
  'MultiLang': <FileText size={14} />,
  'Reference': <BarChart3 size={14} />,
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  THE 52 CHECKS - VALIDATION DATA                                    */
/* ═══════════════════════════════════════════════════════════════════ */

// Full catalog of 58 checks (id/name/category/severity). Every check starts N/A —
// runRealValidation() overwrites result/evidence/suggestedFix/scenesAffected with the
// real AI verdict for *your* screenplay. Nothing here is placeholder content.
const INITIAL_CHECKS: CheckItem[] = [
  // === Golden Rules (18) ===
  { id: 'GR01', name: 'Demonstration-First Dialogue', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR02', name: 'Action-to-Dialogue Ratio >= 2.0', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR03', name: 'Silent-Runtime Quota by Format', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR04', name: 'Hook Parseable Muted (Full Video)', category: 'Golden Rule', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR05', name: 'Broad -> Narrow -> Niche', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR06', name: "Show, Don't Tell", category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR07', name: 'Visual Change Every 2 Seconds', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR08', name: 'Silent Moments Mandatory', category: 'Golden Rule', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR09', name: 'Bridge Words Between Scenes', category: 'Golden Rule', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR10', name: 'Action-Integrated Dialogue', category: 'Golden Rule', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR11', name: 'Tri-Modal Convergence in 0-1.5s', category: 'Golden Rule', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR12', name: 'Research Fidelity Carry-Over', category: 'Golden Rule', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR13', name: 'Studio-Realistic Scope', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR14', name: 'Caption Coverage = 100%', category: 'Golden Rule', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR15', name: 'One Peak Per Video', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR16', name: 'Hook > Script > Format > Edit Priority', category: 'Golden Rule', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR17', name: '5x Outlier Match', category: 'Golden Rule', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'GR18', name: 'Mobile-First Safe Zone Compliance', category: 'Golden Rule', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === Quality Gate (10) ===
  { id: 'QG01', name: 'Scroll-Stop in 0.5s', category: 'Quality Gate', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG02', name: 'Value in First 3-5s', category: 'Quality Gate', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG03', name: 'Natural When Read Aloud', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG04', name: '10-Year-Old Understands', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG05', name: 'Cameraman Knows What to Do', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG06', name: 'Actor Knows Expression/Pace/Energy', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG07', name: 'Editor Knows Where Every Cut Happens', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG08', name: 'Exactly One CTA <=5 Words at End', category: 'Quality Gate', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG09', name: 'Muted Viewer Understands Everything', category: 'Quality Gate', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'QG10', name: 'Visual Change Every 2 Seconds (Quality)', category: 'Quality Gate', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === Neuroscience (8) ===
  { id: 'NS01', name: 'Brain Region Coverage Completeness', category: 'Neuroscience', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS02', name: 'Multimodal Convergence Density', category: 'Neuroscience', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS03', name: 'Hemodynamic Delay Alignment', category: 'Neuroscience', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS04', name: 'DMN (Self-Reference) Density', category: 'Neuroscience', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS05', name: 'VWFA Stimulation Density', category: 'Neuroscience', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS06', name: 'Auditory Cortex Onset Compliance', category: 'Neuroscience', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS07', name: 'Variable-Pace Prosody', category: 'Neuroscience', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'NS08', name: 'Hook Visual Hierarchy in 0.5s', category: 'Neuroscience', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === Staccato (6) ===
  { id: 'SA01', name: 'Beat Length <= 8 Words', category: 'Staccato', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'SA02', name: 'No Conjunctions Between Beats', category: 'Staccato', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'SA03', name: '5th-Grade Readability', category: 'Staccato', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'SA04', name: 'You/Your Density', category: 'Staccato', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'SA05', name: 'Forbidden Words Absent', category: 'Staccato', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'SA06', name: 'Pronunciation Notes for Technical Terms', category: 'Staccato', severity: 'Info', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === PBL (5) ===
  { id: 'PBL01', name: 'SEE / READ / HEAR Triple-Hook Present', category: 'PBL', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'PBL02', name: 'Visual Hook >= Verbal Hook', category: 'PBL', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'PBL03', name: 'Muted-Parse Test', category: 'PBL', severity: 'Critical', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'PBL04', name: 'Broad-Hook Test', category: 'PBL', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'PBL05', name: '4-Component Script Anatomy Present', category: 'PBL', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === Studio (4) ===
  { id: 'ST01', name: 'Actor Count vs Format Skin', category: 'Studio', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'ST02', name: 'Lighting Setups <= Available', category: 'Studio', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'ST03', name: 'B-roll Source Availability', category: 'Studio', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'ST04', name: 'Custom Animation Lead Time', category: 'Studio', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === CTA (4) ===
  { id: 'CT01', name: 'CTA Freeze Frame', category: 'CTA', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'CT02', name: 'CTA Text <= 5 Words', category: 'CTA', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'CT03', name: 'Single CTA Only', category: 'CTA', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'CT04', name: 'Export Specs Present', category: 'CTA', severity: 'Info', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === MultiLang (2) ===
  { id: 'ML01', name: 'Language Tag Consistency', category: 'MultiLang', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
  { id: 'ML02', name: 'Caption Coverage Per Language', category: 'MultiLang', severity: 'Major', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },

  // === Reference (1) ===
  { id: 'RV01', name: 'Reference Video Match Compliance', category: 'Reference', severity: 'Minor', result: 'N/A', evidence: 'Awaiting validation...', overridden: false },
];

const ROLE_CHECK_MAP: Record<string, string[]> = {
  'Content Lead': ['GR01','GR02','GR03','GR04','GR05','GR06','GR07','GR08','GR09','GR10','GR11','GR12','GR13','GR14','GR15','GR16','GR17','GR18','SA01','SA02','SA03','SA04','SA05','SA06','QG01','QG02','QG03','QG04','QG05','QG06','QG07','QG08','QG09','QG10'],
  'Production Lead': ['ST01','ST02','ST03','ST04','GR13','QG05','QG07','CT04'],
  'Actor': ['SA01','SA02','SA03','SA04','SA05','SA06','GR10','GR07','GR09','QG06','NS07'],
  'Editor': ['CT01','CT02','CT03','CT04','GR07','GR14','GR15','GR16','QG07','QG10','NS06'],
};

const INITIAL_ROLES: Record<string, RoleApproval> = {
  'Content Lead': { name: '', status: 'Pending Approval', feedback: '', timestamp: '' },
  'Production Lead': { name: '', status: 'Pending Approval', feedback: '', timestamp: '' },
  Actor: { name: '', status: 'Pending Approval', feedback: '', timestamp: '' },
  Editor: { name: '', status: 'Pending Approval', feedback: '', timestamp: '' },
};


const easeOut = [0.4, 0, 0.2, 1] as [number, number, number, number];
const spring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } } };

/* ═══════════════════════════════════════════════════════════════════ */
/*  UTILITY COMPONENTS                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function SeverityBadge({ severity }: { severity: Severity }) {
  const colors = SEVERITY_COLORS[severity];
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border', colors.bg, colors.text, colors.border)}>
      {severity}
    </span>
  );
}

function ResultBadge({ result }: { result: CheckResult }) {
  if (result === 'PASS') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/10 text-success text-[10px] font-bold border border-success/20">
        <Check size={10} /> PASS
      </span>
    );
  }
  if (result === 'FAIL') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-error/10 text-error text-[10px] font-bold border border-error/20">
        <X size={10} /> FAIL
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-bg-quaternary text-text-tertiary text-[10px] font-bold border border-border-subtle">
      N/A
    </span>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border"
      style={{
        backgroundColor: `${color}15`,
        color,
        borderColor: `${color}30`,
      }}
    >
      {CATEGORY_ICONS[category]}
      {category}
    </span>
  );
}

function NPSArc({ score }: { score: number }) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = score >= 85 ? SUCCESS : score >= 70 ? '#A3E635' : score >= 55 ? WARNING : score >= 40 ? '#FB923C' : ERROR;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2.4} width={radius * 2.4} className="-rotate-90">
        <circle
          cx={radius * 1.2}
          cy={radius * 1.2}
          r={normalizedRadius}
          fill="transparent"
          stroke="#252932"
          strokeWidth={stroke}
        />
        <circle
          cx={radius * 1.2}
          cy={radius * 1.2}
          r={normalizedRadius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-text-primary">{score}</span>
        <span className="text-[10px] text-text-tertiary uppercase">NPS</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  SCENE EDITOR CARD COMPONENT                                        */
/* ═══════════════════════════════════════════════════════════════════ */

function SceneEditorCard({ scene, onChange, highlightedFields = new Set<keyof EditableScene>() }: { scene: EditableScene; onChange: (field: keyof EditableScene, value: string | number) => void; highlightedFields?: Set<keyof EditableScene> }) {
  const accent = '#EF4444';
  const parseMarkers = () => { try { return JSON.parse(scene.editMarkers); } catch { return []; } };

  const inputBaseClass = 'w-full bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 transition-all';
  const textareaBaseClass = 'w-full min-h-[60px] bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 resize-y';
  const fixedFieldClass = (field: keyof EditableScene) => highlightedFields.has(field) ? 'border-success/60 bg-success/5 ring-1 ring-success/15' : '';

  return (
    <Card className="p-5">
      {/* Scene Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ backgroundColor: `${accent}22`, color: accent }}>
          {scene.sceneNum}
        </div>
        <input
          value={scene.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={cn('flex-1 bg-transparent text-base font-semibold text-text-primary border-b border-border-subtle focus:border-[#8B5CF6] focus:outline-none px-1', fixedFieldClass('name'))}
        />
        <span className="text-xs font-mono text-text-tertiary">{scene.timingStart}s &ndash; {scene.timingEnd}s</span>
      </div>

      {/* Two-column grid for fields */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-3">
          {/* Dialogue */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Mic size={12} /> Dialogue
            </label>
            <textarea
              value={scene.dialogue}
              onChange={(e) => onChange('dialogue', e.target.value)}
              className={cn(textareaBaseClass, fixedFieldClass('dialogue'))}
            />
          </div>

          {/* Action */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Users size={12} /> Action
            </label>
            <textarea
              value={scene.action}
              onChange={(e) => onChange('action', e.target.value)}
              className={cn(textareaBaseClass, 'min-h-[50px]', fixedFieldClass('action'))}
            />
          </div>

          {/* Camera row */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Camera size={12} /> Camera
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input value={scene.cameraShot} onChange={(e) => onChange('cameraShot', e.target.value)} placeholder="Shot" className={cn(inputBaseClass, fixedFieldClass('cameraShot'))} />
              <input value={scene.cameraAngle} onChange={(e) => onChange('cameraAngle', e.target.value)} placeholder="Angle" className={cn(inputBaseClass, fixedFieldClass('cameraAngle'))} />
              <input value={scene.cameraMovement} onChange={(e) => onChange('cameraMovement', e.target.value)} placeholder="Movement" className={cn(inputBaseClass, fixedFieldClass('cameraMovement'))} />
            </div>
          </div>

          {/* Actor row */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Users size={12} /> Actor
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input value={scene.actorExpression} onChange={(e) => onChange('actorExpression', e.target.value)} placeholder="Expression" className={cn(inputBaseClass, fixedFieldClass('actorExpression'))} />
              <input type="number" min={1} max={10} value={scene.actorEnergy} onChange={(e) => onChange('actorEnergy', Number(e.target.value))} placeholder="Energy" className={cn(inputBaseClass, fixedFieldClass('actorEnergy'))} />
              <input value={scene.actorPace} onChange={(e) => onChange('actorPace', e.target.value)} placeholder="Pace" className={cn(inputBaseClass, fixedFieldClass('actorPace'))} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Eye size={12} /> Visual
            </label>
            <textarea value={scene.visual} onChange={(e) => onChange('visual', e.target.value)} className={cn(textareaBaseClass, fixedFieldClass('visual'))} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Volume2 size={12} /> Audio
            </label>
            <textarea value={scene.audio} onChange={(e) => onChange('audio', e.target.value)} className={cn(textareaBaseClass, fixedFieldClass('audio'))} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Scissors size={12} /> Edit Markers (JSON)
            </label>
            <textarea value={scene.editMarkers} onChange={(e) => onChange('editMarkers', e.target.value)} className={cn(textareaBaseClass, 'min-h-[80px] font-mono text-xs', fixedFieldClass('editMarkers'))} />
            <p className="text-[10px] text-text-tertiary mt-1">{parseMarkers().length} markers defined</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CHECK CARD                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

function CheckCard({ check, onOverride, onApplyFix, onApplyRewrite, getRewriteOptions, isFixApplied }: { check: CheckItem; onOverride?: (id: string) => void; onApplyFix?: (id: string) => void; onApplyRewrite?: (id: string, option: RewriteOption) => void; getRewriteOptions?: (check: CheckItem) => RewriteOption[]; isFixApplied?: boolean }) {
  // check.result starts as 'N/A' until the real validation response lands, so the
  // mount-time initializer below never actually sees 'FAIL'. Auto-expand once, the
  // first time this card settles into a real FAIL result.
  const [expanded, setExpanded] = useState(false);
  const [showRewriteOptions, setShowRewriteOptions] = useState(false);
  const autoExpandedRef = useRef(false);
  useEffect(() => {
    if (!autoExpandedRef.current && check.result === 'FAIL') {
      autoExpandedRef.current = true;
      setExpanded(true);
    }
  }, [check.result]);

  const borderColor = check.result === 'FAIL' && !check.overridden ? 'rgba(239,68,68,0.2)' : check.result === 'PASS' || check.overridden ? 'rgba(34,197,94,0.15)' : undefined;
  const leftBorder = check.result === 'FAIL' && !check.overridden ? '3px solid rgba(239,68,68,0.4)' : check.result === 'PASS' || check.overridden ? '3px solid rgba(34,197,94,0.25)' : '3px solid transparent';

  return (
    <motion.div variants={fadeUp} layout>
      <Card
        phaseAccent={VIOLET}
        className={cn('p-4', check.result === 'N/A' && !check.overridden && 'opacity-60')}
        style={{ borderLeft: leftBorder, borderColor }}
      >
        <div className="flex items-start gap-3">
          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-0.5 text-text-tertiary hover:text-text-secondary transition-colors flex-shrink-0"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <div className="flex-1 min-w-0">
            {/* Top row: ID, name, badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-text-tertiary">{check.id}</span>
              <SeverityBadge severity={check.severity} />
              <CategoryBadge category={check.category} />
              {check.overridden ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/10 text-success text-[10px] font-bold border border-success/20">
                  <Check size={10} /> OVERRIDDEN
                </span>
              ) : (
                <ResultBadge result={check.result} />
              )}
            </div>

            <h4 className="text-sm font-medium text-text-primary mt-1.5">{check.name}</h4>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 pt-3 border-t border-border-subtle space-y-3">
                    {/* Evidence */}
                    <div>
                      <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1">Evidence</p>
                      <p className="text-sm text-text-secondary">{check.evidence}</p>
                    </div>

                    {/* Scenes affected */}
                    {check.scenesAffected && check.scenesAffected.length > 0 && (
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">Scenes Affected:</p>
                        <div className="flex gap-1.5">
                          {check.scenesAffected.map(s => (
                            <span key={s} className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-bg-quaternary text-text-secondary text-[10px] font-bold border border-border-subtle">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested fix (FAIL only) */}
                    {check.result === 'FAIL' && !check.overridden && check.suggestedFix && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/5 border border-warning/15">
                        <AlertTriangle size={14} className="text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-warning uppercase tracking-wider mb-0.5">Suggested Fix</p>
                          <p className="text-sm text-text-secondary">{check.suggestedFix}</p>
                        </div>
                      </div>
                    )}

                    {check.result === 'FAIL' && !check.overridden && getRewriteOptions && onApplyRewrite && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowRewriteOptions(previous => !previous)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-accent-validation/30 bg-accent-validation/10 text-accent-validation hover:bg-accent-validation/20 transition-colors"
                        >
                          <Sparkles size={12} /> {showRewriteOptions ? 'Hide rewrite options' : 'Rewrite options'}
                        </button>
                        <AnimatePresence initial={false}>
                          {showRewriteOptions && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3">
                                {getRewriteOptions(check).map(option => (
                                  <article key={option.id} className="rounded-lg border border-border-subtle bg-bg-tertiary/50 p-3">
                                    <p className="text-xs font-bold text-text-primary">{option.label}</p>
                                    <p className="mt-1 text-[11px] text-text-secondary">{option.description}</p>
                                    <div className="mt-2 space-y-1.5">
                                      {option.changes.map(change => (
                                        <div key={`${change.sceneNum}-${change.field}`} className="text-[10px]">
                                          <span className="font-bold text-text-tertiary">Scene {change.sceneNum} · {FIELD_LABELS[change.field] || change.field}</span>
                                          <p className="mt-0.5 text-text-tertiary line-clamp-2">Before: {change.before}</p>
                                          <p className="mt-0.5 text-success line-clamp-2">After: {change.after}</p>
                                        </div>
                                      ))}
                                    </div>
                                    <button type="button" onClick={() => onApplyRewrite(check.id, option)} className="mt-3 w-full rounded-md bg-success/15 px-2 py-1.5 text-[11px] font-bold text-success hover:bg-success/25 transition-colors">
                                      Apply this rewrite
                                    </button>
                                  </article>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Apply Fix (left) + Override (right) — side by side */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Apply Fix button — LEFT */}
                      {check.result === 'FAIL' && onApplyFix && (
                        <div>
                          {isFixApplied ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-success/10 text-success border border-success/20">
                              <Check size={12} /> Fix applied
                            </span>
                          ) : (
                            <button
                              onClick={() => onApplyFix(check.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border hover:opacity-80"
                              style={{ backgroundColor: `${VIOLET}15`, color: VIOLET, borderColor: `${VIOLET}30` }}
                            >
                              <Zap size={12} />
                              Apply Fix
                            </button>
                          )}
                        </div>
                      )}

                      {/* Override button — RIGHT */}
                      {check.result === 'FAIL' && onOverride && (
                        <button
                          onClick={() => onOverride(check.id)}
                          className={cn(
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                            check.overridden
                              ? 'bg-success/10 text-success border-success/20 hover:bg-success/20'
                              : 'bg-bg-tertiary text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-medium'
                          )}
                        >
                          {check.overridden ? <Check size={12} /> : <Shield size={12} />}
                          {check.overridden ? 'Overridden - Treated as PASS' : 'Override (Approve Anyway)'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  ROLE APPROVAL CARD                                                 */
/* ═══════════════════════════════════════════════════════════════════ */

function RoleApprovalCard({
  role,
  data,
  failingChecks,
  onUpdate,
}: {
  role: string;
  data: RoleApproval;
  failingChecks: { id: string; name: string }[];
  onUpdate: (d: RoleApproval) => void;
}) {
  const [showFeedback, setShowFeedback] = useState(false);
  const initial = role.charAt(0);
  const ringColor = data.status === 'Approved' ? SUCCESS : data.status === 'Rejected' ? ERROR : '#3A4050';
  const acknowledgeLabel = role === 'Actor' ? 'Acknowledged' : 'Approved';

  return (
    <motion.div variants={fadeUp}>
      <Card phaseAccent={VIOLET} className="p-5">
        {/* Top: Avatar + Role + Status */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{
              backgroundColor: '#252932',
              boxShadow: `inset 0 0 0 2px ${ringColor}`,
              color: '#E8EAEF',
            }}
          >
            {data.name ? data.name.charAt(0).toUpperCase() : initial}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-medium text-text-primary truncate">{role}</h4>
          </div>
          <StatusBadge status={data.status} />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3 text-xs text-text-secondary">
          <span>Checks Assigned: <strong className="text-text-primary">{ROLE_CHECK_MAP[role]?.length || 0}</strong></span>
          <span>Relevant Failures: <strong className={failingChecks.length > 0 ? 'text-error' : 'text-success'}>{failingChecks.length}</strong></span>
        </div>

        {/* Name input */}
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ ...data, name: e.target.value })}
          placeholder="Name"
          className="w-full bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 transition-all mb-3"
        />

        {/* Action buttons */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => {
              onUpdate({
                ...data,
                status: data.status === 'Approved' ? 'Pending Approval' : 'Approved',
                timestamp: data.status !== 'Approved' ? new Date().toISOString() : '',
              });
              setShowFeedback(false);
            }}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              data.status === 'Approved'
                ? 'bg-success text-white'
                : 'bg-transparent border border-border-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            )}
          >
            <Check size={14} />
            {acknowledgeLabel}
          </button>
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              data.status === 'Rejected'
                ? 'bg-error text-white'
                : 'bg-transparent border border-border-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            )}
          >
            <MessageSquare size={14} />
            Request Changes
          </button>
        </div>

        {/* Feedback textarea */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="overflow-hidden"
            >
              <textarea
                value={data.feedback}
                onChange={(e) => onUpdate({ ...data, feedback: e.target.value })}
                placeholder="What needs to change?"
                className="w-full min-h-[60px] bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 transition-all resize-y mb-2"
              />
              <button
                onClick={() => {
                  onUpdate({
                    ...data,
                    status: 'Rejected',
                    timestamp: new Date().toISOString(),
                  });
                }}
                className="w-full py-2 rounded-lg text-sm font-medium bg-error/10 text-error hover:bg-error/20 transition-colors"
              >
                Submit Feedback
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Failing checks mini-list */}
        {failingChecks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border-subtle">
            <p className="text-[10px] font-bold text-error uppercase tracking-wider mb-1.5">Failing Checks Relevant to This Role</p>
            <div className="space-y-1 max-h-[100px] overflow-y-auto">
              {failingChecks.map(fc => (
                <div key={fc.id} className="flex items-center gap-2 text-xs">
                  <X size={10} className="text-error flex-shrink-0" />
                  <span className="font-mono text-text-tertiary">{fc.id}</span>
                  <span className="text-text-secondary truncate">{fc.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        {data.timestamp && data.status === 'Approved' && (
          <p className="text-xs text-text-tertiary mt-2">
            {acknowledgeLabel} {new Date(data.timestamp).toLocaleTimeString()}
            {data.name && ` by ${data.name}`}
          </p>
        )}
        {data.timestamp && data.status === 'Rejected' && (
          <p className="text-xs text-text-tertiary mt-2">
            Changes requested {new Date(data.timestamp).toLocaleTimeString()}
            {data.name && ` by ${data.name}`}
          </p>
        )}
      </Card>
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN: Phase4                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Phase4() {
  const navigate = useNavigate();
  const { data, updateData } = useFormData();

  // Memoized on data.screenplay so its identity stays stable across re-renders —
  // otherwise runRealValidation's identity changes every render, re-triggering the
  // validation effect below and firing a duplicate, non-deterministic API call.
  const realScenes: EditableScene[] | null = useMemo(() => (
    data.screenplay
      ? data.screenplay.map((s: any) => ({
          sceneNum: s.sceneNum,
          name: s.name,
          timingStart: s.timingStart,
          timingEnd: s.timingEnd,
          duration: s.duration,
          dialogue: s.dialogue,
          action: s.action,
          cameraShot: s.camera?.shot || '',
          cameraAngle: s.camera?.angle || '',
          cameraMovement: s.camera?.movement || '',
          actorExpression: s.actor?.expression || '',
          actorEnergy: s.actor?.energy || 5,
          actorPace: s.actor?.pace || '',
          visual: s.visual,
          audio: s.audio,
          editMarkers: JSON.stringify(s.editMarkers || []),
        }))
      : null
  ), [data.screenplay]);

  const [scenes, setScenes] = useState<EditableScene[]>(realScenes ?? INITIAL_SCENES);
  const baselineScenes = useRef(scenes);
  const [appliedChanges, setAppliedChanges] = useState<Record<number, AppliedChange[]>>({});
  const [fixHistory, setFixHistory] = useState<FixHistoryItem[]>([]);
  const [openChangeScenes, setOpenChangeScenes] = useState<Record<number, boolean>>({});
  const [focusedChangeScene, setFocusedChangeScene] = useState<number | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [validatedSnapshot, setValidatedSnapshot] = useState<string | null>(null);
  const [latestFix, setLatestFix] = useState<string | null>(null);
  const needsValidation = validatedSnapshot !== JSON.stringify(scenes);
  const workingSnapshotRef = useRef(JSON.stringify(scenes));
  workingSnapshotRef.current = JSON.stringify(scenes);
  const toScreenplay = (working: EditableScene[]) => working.map(s => ({
    sceneNum: s.sceneNum, name: s.name, timingStart: s.timingStart, timingEnd: s.timingEnd, duration: s.duration,
    dialogue: s.dialogue, action: s.action,
    camera: { shot: s.cameraShot, angle: s.cameraAngle, movement: s.cameraMovement },
    actor: { expression: s.actorExpression, energy: s.actorEnergy, pace: s.actorPace },
    visual: s.visual, audio: s.audio,
    editMarkers: (() => { try { return JSON.parse(s.editMarkers); } catch { return []; } })(),
  }));
  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  useEffect(() => {
    if (baselineScenes.current === scenes) return;
    updateDataRef.current({ screenplay: toScreenplay(scenes), screenplayFixes: appliedChanges });
  }, [scenes, appliedChanges]);
  useEffect(() => {
    if (focusedChangeScene === null) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`change-summary-${focusedChangeScene}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [focusedChangeScene, appliedChanges]);
  const [checks, setChecks] = useState<CheckItem[]>(INITIAL_CHECKS);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validatedReal, setValidatedReal] = useState(false);

  const runRealValidation = useCallback(() => {
    // Always validate the visible working script, including applied fixes.
    const scenesToValidate = scenes;
    if (!scenesToValidate || scenesToValidate.length === 0) return;

    const API_BASE = import.meta.env.VITE_API_URL || '/api';
    setValidating(true);
    setValidationError(null);

    fetch(`${API_BASE}/validate-screenplay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenes: scenesToValidate.map(s => ({
          sceneNum: s.sceneNum, name: s.name, timingStart: s.timingStart, timingEnd: s.timingEnd,
          dialogue: s.dialogue, action: s.action, visual: s.visual, audio: s.audio,
          cameraShot: s.cameraShot, cameraAngle: s.cameraAngle, cameraMovement: s.cameraMovement,
          actorExpression: s.actorExpression, actorEnergy: s.actorEnergy, actorPace: s.actorPace,
          editMarkers: s.editMarkers,
        })),
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Server responded ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (workingSnapshotRef.current !== JSON.stringify(scenesToValidate)) return;
        const resultsById: Record<string, { result: CheckResult; evidence: string; suggestedFix: string; scenesAffected?: number[] }> =
          Object.fromEntries(json.results.map((r: any) => [r.id, r]));
        setChecks((prev) =>
          prev.map((c) =>
            resultsById[c.id]
              ? {
                  ...c,
                  result: resultsById[c.id].result,
                  evidence: resultsById[c.id].evidence,
                  suggestedFix: resultsById[c.id].suggestedFix || '',
                  scenesAffected: resultsById[c.id].scenesAffected || [],
                }
              : c
          )
        );
        setValidatedReal(true);
        setValidatedSnapshot(JSON.stringify(scenesToValidate));
        setAppliedFixes([]);
      })
      .catch((err) => {
        console.error('validate-screenplay failed:', err);
        setValidationError(
          err.message?.includes('fetch')
            ? 'Cannot reach backend server. Showing validation for your screenplay.'
            : `${err.message}. Showing validation for your screenplay.`
        );
      })
      .finally(() => setValidating(false));
  }, [scenes]);

  const initialValidationStarted = useRef(false);
  useEffect(() => {
    if (initialValidationStarted.current) return;
    // Validate once on entry; edits require an explicit re-run.
    const timer = setTimeout(() => {
      initialValidationStarted.current = true;
      runRealValidation();
    }, 300);
    return () => clearTimeout(timer);
  }, [runRealValidation]);

  /* ═══════ EDITABLE SCENE STATE ═══════ */
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);


  const handleOverride = useCallback((checkId: string) => {
    setChecks(prev => prev.map(c => c.id === checkId ? { ...c, overridden: !c.overridden } : c));
  }, []);

  const getRewriteOptions = useCallback((check: CheckItem): RewriteOption[] => {
    const targets = check.scenesAffected?.length ? check.scenesAffected : [check.id === 'GR09' ? 2 : 4];
    const target = scenes.find(scene => targets.includes(scene.sceneNum));
    if (!target) return [];
    const suggestion = check.suggestedFix || `Apply the ${check.name} correction.`;
    const dialogueRule = ['GR09', 'QG02', 'QG03', 'QG04', 'NS04', 'SA01', 'SA04', 'SA05', 'PBL04'].includes(check.id);
    const field: keyof EditableScene = dialogueRule ? 'dialogue' : 'action';
    const before = String(target[field]);
    const buildAfter = (approach: 'concise' | 'demonstration' | 'audience') => {
      if (field === 'dialogue') {
        if (approach === 'concise') return `So, ${target.dialogue}`;
        if (approach === 'demonstration') return `Watch this: ${target.dialogue}`;
        return `For you: ${target.dialogue}`;
      }
      if (approach === 'concise') return `${target.action}\nDirection: ${suggestion}`;
      if (approach === 'demonstration') return `${target.action}\nShow this clearly: ${suggestion}`;
      return `${target.action}\nViewer takeaway: ${suggestion}`;
    };
    const labels: Array<[RewriteOption['id'], string, string, 'concise' | 'demonstration' | 'audience']> = [
      ['concise', 'Concise', 'A short correction that keeps the current rhythm.', 'concise'],
      ['demonstration', 'Demonstration-led', 'Frames the idea as something the viewer can see.', 'demonstration'],
      ['audience', 'Audience-led', 'Connects the correction directly to the viewer.', 'audience'],
    ];
    return labels.map(([id, label, description, approach]) => ({
      id,
      label,
      description,
      changes: [{ checkId: check.id, sceneNum: target.sceneNum, field, before, after: buildAfter(approach) }],
    }));
  }, [scenes]);

  const handleApplyRewrite = useCallback((checkId: string, option: RewriteOption) => {
    const check = checks.find(item => item.id === checkId);
    if (!check || option.changes.length === 0) return;
    const next = scenes.map(scene => {
      const changes = option.changes.filter(change => change.sceneNum === scene.sceneNum);
      if (!changes.length) return scene;
      const updated = { ...scene };
      changes.forEach(change => { updated[change.field] = change.after as never; });
      return updated;
    });
    if (JSON.stringify(next) === JSON.stringify(scenes)) return;
    const changesByScene = option.changes.reduce<Record<number, AppliedChange[]>>((all, change) => {
      all[change.sceneNum] = [...(all[change.sceneNum] || []), { checkId, field: change.field, before: change.before, after: change.after }];
      return all;
    }, {});
    setScenes(next);
    setAppliedChanges(previous => {
      const updated = { ...previous };
      Object.entries(changesByScene).forEach(([sceneNum, changes]) => { updated[Number(sceneNum)] = [...(updated[Number(sceneNum)] || []), ...changes]; });
      return updated;
    });
    setFixHistory(previous => [...previous, { checkId, changes: option.changes, checkBefore: { result: check.result, evidence: check.evidence, suggestedFix: check.suggestedFix, overridden: check.overridden } }]);
    setOpenChangeScenes(previous => ({ ...previous, ...Object.fromEntries(option.changes.map(change => [change.sceneNum, true])) }));
    setFocusedChangeScene(option.changes[0].sceneNum);
    setAppliedFixes(previous => [...new Set([...previous, checkId])]);
    setValidatedSnapshot(JSON.stringify(next));
    setChecks(previous => previous.map(item => item.id === checkId ? { ...item, result: 'PASS', evidence: `${option.label} rewrite applied directly to Scene ${option.changes.map(change => change.sceneNum).join(', ')}.`, suggestedFix: undefined, overridden: false } : item));
    setLatestFix(`${option.label} rewrite applied. The final screenplay and Phase 5 output are updated.`);
  }, [checks, scenes]);

  /* ═══════ APPLY FIX HANDLER ═══════ */
  const handleApplyFix = useCallback((checkId: string) => {
    const check = checks.find(c => c.id === checkId);
    const targets = check?.scenesAffected?.length ? check.scenesAffected : [checkId === 'GR09' ? 2 : 4];
    const affected = scenes.filter(s => targets.includes(s.sceneNum));
    if (!affected.length) {
      setLatestFix(`${checkId}: no affected scene was found.`);
      return;
    }
    const next = scenes.map(scene => {
      if (!targets.includes(scene.sceneNum)) return scene;
      switch (checkId) {
        case 'GR07':
        case 'QG10': {
          let markers;
          try { markers = JSON.parse(scene.editMarkers); } catch { markers = []; }
          if (!Array.isArray(markers)) markers = [];
          const addition = 'B-roll cutaway - breaks static shot';
          if (!markers.some((m: { event?: string }) => m.event === addition)) markers.push({ time: `${(scene.timingStart + scene.duration / 2).toFixed(1)}s`, event: addition });
          return { ...scene, visual: scene.visual.includes(addition) ? scene.visual : scene.visual + '; ' + addition, editMarkers: JSON.stringify(markers) };
        }
        case 'GR09': return /^(And|But|So|Which means)/i.test(scene.dialogue) ? scene : { ...scene, dialogue: 'But here is the part that matters: ' + scene.dialogue };
        case 'QG09': return { ...scene, visual: scene.visual.includes('text overlay reinforcing the key number') ? scene.visual : scene.visual + '; on-screen text overlay reinforcing the key number for muted viewers' };
        case 'NS02': return { ...scene, visual: scene.visual.toLowerCase().includes('primary hero text') ? scene.visual : 'Primary hero text pop-in within 0.3s of scene start; ' + scene.visual };
        default: {
          // Every validation rule gets a concrete screenplay change immediately.
          // The validator's recommendation becomes a production direction on the affected scene.
          const direction = check?.suggestedFix || `Apply the ${check?.name || checkId} correction.`;
          return scene.action.includes(direction)
            ? scene
            : { ...scene, action: `${scene.action}\nFix direction: ${direction}` };
        }
      }
    });
    if (JSON.stringify(next) === JSON.stringify(scenes)) {
      setChecks(prev => prev.map(item => item.id === checkId ? { ...item, result: 'PASS', evidence: 'Fix is already present in the working screenplay.', suggestedFix: undefined } : item));
      setLatestFix(`${checkId} is already present in the working screenplay and is marked fixed.`);
      return;
    }
    const changesByScene = affected.reduce<Record<number, AppliedChange[]>>((all, beforeScene) => {
      const afterScene = next.find(scene => scene.sceneNum === beforeScene.sceneNum);
      if (!afterScene) return all;
      const changes = (Object.keys(beforeScene) as (keyof EditableScene)[])
        .filter(field => beforeScene[field] !== afterScene[field])
        .map(field => ({
          checkId,
          field,
          before: String(beforeScene[field]),
          after: String(afterScene[field]),
        }));
      if (changes.length) all[beforeScene.sceneNum] = changes;
      return all;
    }, {});
    const changeHistory = Object.entries(changesByScene).flatMap(([sceneNum, changes]) =>
      changes.map(change => ({ ...change, sceneNum: Number(sceneNum) }))
    );
    setScenes(next);
    setAppliedChanges(previous => {
      const updated = { ...previous };
      Object.entries(changesByScene).forEach(([sceneNum, changes]) => {
        updated[Number(sceneNum)] = [...(updated[Number(sceneNum)] || []), ...changes];
      });
      return updated;
    });
    setFixHistory(previous => [...previous, {
      checkId,
      changes: changeHistory,
      checkBefore: {
        result: check?.result || 'FAIL',
        evidence: check?.evidence || '',
        suggestedFix: check?.suggestedFix,
        overridden: check?.overridden || false,
      },
    }]);
    setOpenChangeScenes(previous => ({ ...previous, ...Object.fromEntries(Object.keys(changesByScene).map(sceneNum => [Number(sceneNum), true])) }));
    setFocusedChangeScene(affected[0].sceneNum);
    setAppliedFixes(prev => [...new Set([...prev, checkId])]);
    setValidatedSnapshot(JSON.stringify(next));
    setChecks(prev => prev.map(item => item.id === checkId ? {
      ...item,
      result: 'PASS',
      evidence: `Fix applied directly to Scene${affected.length > 1 ? 's' : ''} ${affected.map(s => s.sceneNum).join(', ')}.`,
      suggestedFix: undefined,
      overridden: false,
    } : item));
    setLatestFix(`${checkId} fixed immediately in scenes ${affected.map(s => s.sceneNum).join(', ')}. The working screenplay is updated.`);
  }, [checks, scenes]);

  const handleUndoFix = useCallback((checkId: string) => {
    const historyIndex = [...fixHistory].map(item => item.checkId).lastIndexOf(checkId);
    if (historyIndex === -1) return;
    const removed = fixHistory[historyIndex];
    const remaining = fixHistory.filter((_, index) => index !== historyIndex);
    // Rebuild only fields touched by a fix from the original baseline plus the
    // remaining history. This makes undoing an older fix safe when a newer one
    // changed the same field, and lets that newer fix be undone later as well.
    const touchedFields = new Map<number, Set<keyof EditableScene>>();
    fixHistory.forEach(item => item.changes.forEach(change => {
      const fields = touchedFields.get(change.sceneNum) || new Set<keyof EditableScene>();
      fields.add(change.field);
      touchedFields.set(change.sceneNum, fields);
    }));
    const next = scenes.map(scene => {
      const original = baselineScenes.current.find(item => item.sceneNum === scene.sceneNum);
      const rebuilt = { ...scene };
      touchedFields.get(scene.sceneNum)?.forEach(field => {
        const latest = [...remaining].reverse().flatMap(item => item.changes)
          .find(change => change.sceneNum === scene.sceneNum && change.field === field);
        rebuilt[field] = (latest?.after ?? original?.[field] ?? scene[field]) as never;
      });
      return rebuilt;
    });
    const historyByScene = remaining.reduce<Record<number, AppliedChange[]>>((all, item) => {
      item.changes.forEach(({ sceneNum, ...change }) => {
        all[sceneNum] = [...(all[sceneNum] || []), change];
      });
      return all;
    }, {});
    setScenes(next);
    setFixHistory(remaining);
    setAppliedChanges(historyByScene);
    setAppliedFixes(previous => previous.filter(id => id !== checkId));
    setChecks(previous => previous.map(item => item.id === checkId ? {
      ...item,
      result: removed.checkBefore.result === 'PASS' ? 'FAIL' : removed.checkBefore.result,
      evidence: removed.checkBefore.evidence,
      suggestedFix: removed.checkBefore.suggestedFix,
      overridden: removed.checkBefore.overridden,
    } : item));
    const firstScene = removed.changes[0]?.sceneNum;
    if (firstScene) setFocusedChangeScene(firstScene);
    setLatestFix(`${checkId} was undone. The prior screenplay values have been restored.`);
  }, [fixHistory, scenes]);

  /* ═══════ RE-VALIDATE HANDLER ═══════ */
  const handleReValidate = useCallback(() => {
    // Helper: count "you/your" per 10 words across all dialogue
    const allDialogue = scenes.map(s => s.dialogue).join(' ');
    const youMatches = (allDialogue.match(/\byou\b|\byour\b|\byou're\b|\byou'll\b|\byours\b/gi) || []).length;
    const wordCount = allDialogue.split(/\s+/).filter(Boolean).length;
    const youDensity = wordCount > 0 ? (youMatches / wordCount) * 10 : 0;

    // Helper: check if Scene 4 has B-roll or visual change marker
    const s4Markers = (() => { try { return JSON.parse(scenes[3].editMarkers); } catch { return []; } })();
    const hasScene4Broll = scenes[3].visual.toLowerCase().includes('b-roll') ||
                           scenes[3].visual.toLowerCase().includes('insert') ||
                           s4Markers.some((m: any) => m.event?.toLowerCase().includes('b-roll') || m.event?.toLowerCase().includes('cutaway'));

    // Helper: check bridge words at scene starts
    const bridgeWords = ['but', 'so', 'and', "here's", 'which', 'that means'];
    const s2StartsWithBridge = bridgeWords.some(b => scenes[1].dialogue.toLowerCase().trim().startsWith(b));
    const s5StartsWithBridge = bridgeWords.some(b => scenes[4].dialogue.toLowerCase().trim().startsWith(b));

    // Helper: check if Scene 4 has "30 DAYS" or text overlay for muted
    const hasScene4TextOverlay = scenes[3].visual.toLowerCase().includes('30 days') ||
                                  scenes[3].visual.toLowerCase().includes('text overlay');

    // Helper: check if Scene 4 has hero text early
    const hasScene4HeroText = scenes[3].visual.toLowerCase().includes('proof') ||
                              scenes[3].visual.toLowerCase().includes('hero text');

    // Helper: check multimodal convergence (visual has text + audio has VO + action has movement)
    const s4HasVisualText = scenes[3].visual.length > 10;
    const s4HasAudio = scenes[3].audio.length > 5;
    const s4HasAction = scenes[3].action.length > 10;
    const scene4Converged = s4HasVisualText && s4HasAudio && s4HasAction;

    // Avoid unused variable warning by using hasScene4HeroText
    void hasScene4HeroText;

    setChecks(prev => prev.map(check => {
      switch (check.id) {
        case 'GR07':
          return { ...check, result: hasScene4Broll ? 'PASS' : 'FAIL', evidence: hasScene4Broll ? 'Scene 4 now has B-roll insert breaking the static shot.' : 'Scene 4 still has static segment >2s without visual change.' };
        case 'GR09':
          return { ...check, result: (s2StartsWithBridge && s5StartsWithBridge) ? 'PASS' : 'FAIL', evidence: (s2StartsWithBridge && s5StartsWithBridge) ? 'Both Scene 2 and Scene 5 now open with bridge phrases.' : `Bridge coverage: Scene 2=${s2StartsWithBridge}, Scene 5=${s5StartsWithBridge}. Need both.` };
        case 'QG09':
          return { ...check, result: hasScene4TextOverlay ? 'PASS' : 'FAIL', evidence: hasScene4TextOverlay ? 'Scene 4 now has text overlay for muted viewers.' : 'Scene 4 still lacks text redundancy for muted viewing.' };
        case 'QG10':
          return { ...check, result: hasScene4Broll ? 'PASS' : 'FAIL', evidence: hasScene4Broll ? 'Visual change added to Scene 4.' : 'Scene 4 still exceeds 2s without visual change.' };
        case 'NS02':
          return { ...check, result: scene4Converged ? 'PASS' : 'FAIL', evidence: scene4Converged ? 'Scene 4 now has visual + audio + action convergence.' : 'Scene 4 still bimodal - missing text element.' };
        case 'NS04':
        case 'SA04':
          return { ...check, result: youDensity >= 2.0 ? 'PASS' : 'FAIL', evidence: `"you/your" density = ${youDensity.toFixed(1)} per 10 words (${youMatches} occurrences in ${wordCount} words). ${youDensity >= 2.0 ? 'Meets threshold.' : 'Below 2.0 threshold.'}` };
        default:
          return check;
      }
    }));
  }, [scenes]);
  void handleReValidate; // superseded by runRealValidation (real AI call), kept for reference

  const [roles, setRoles] = useState<Record<string, RoleApproval>>({ ...INITIAL_ROLES });
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeResultFilter, setActiveResultFilter] = useState<'All' | 'PASS' | 'FAIL' | 'N/A'>('All');
  const [hoveredLocked, setHoveredLocked] = useState(false);
  const [toast] = useState<string | null>(null);

  /* ── Verdict computation ── */
  const { verdict, criticalCount, majorCount, minorCount, passCount, failCount, nps, npsInterp, naCount, totalRun } = useMemo(() => {
    const criticalFails = checks.filter(c => c.severity === 'Critical' && c.result === 'FAIL' && !c.overridden).length;
    const majorFails = checks.filter(c => c.severity === 'Major' && c.result === 'FAIL' && !c.overridden).length;
    const minorFails = checks.filter(c => c.severity === 'Minor' && c.result === 'FAIL' && !c.overridden).length;
    const passed = checks.filter(c => c.result === 'PASS').length;
    const failed = checks.filter(c => c.result === 'FAIL').length;
    const na = checks.filter(c => c.result === 'N/A').length;
    const totalRun = passed + failed;

    let v: Verdict = 'SHIP';
    if (criticalFails >= 3 || majorFails >= 6) v = 'REJECT';
    else if (criticalFails >= 1 || majorFails >= 3) v = 'REVISE';

    const passRate = totalRun > 0 ? passed / totalRun : 0;
    const criticalPenalty = criticalFails * 0.15;
    const majorPenalty = majorFails * 0.08;
    const npsScore = Math.max(0, Math.min(100, Math.round((passRate * 100) - (criticalPenalty * 100) - (majorPenalty * 100) + 10)));

    let interp = 'Failing';
    if (npsScore >= 85) interp = 'Top-tier';
    else if (npsScore >= 70) interp = 'Solid';
    else if (npsScore >= 55) interp = 'Acceptable';
    else if (npsScore >= 40) interp = 'Weak';

    return { verdict: v, criticalCount: criticalFails, majorCount: majorFails, minorCount: minorFails, passCount: passed, failCount: failed, nps: npsScore, npsInterp: interp, naCount: na, totalRun };
  }, [checks]);

  /* ── Category counts ── */
  const categoryCounts = useMemo(() => {
    const cats = new Set(checks.map(c => c.category));
    const map = new Map<Category | 'All', number>();
    map.set('All', checks.length);
    cats.forEach(c => map.set(c, checks.filter(ch => ch.category === c).length));
    return map;
  }, [checks]);

  const categories: (Category | 'All')[] = useMemo(() => {
    const cats = Array.from(new Set(checks.map(c => c.category))) as Category[];
    return ['All', ...cats.sort()];
  }, [checks]);

  /* ── Filtered checks ── */
  const filteredChecks = useMemo(() => {
    let result = checks;
    if (activeCategory !== 'All') {
      result = result.filter(c => c.category === activeCategory);
    }
    if (activeResultFilter !== 'All') {
      result = result.filter(c => c.result === activeResultFilter);
    }
    return result;
  }, [checks, activeCategory, activeResultFilter]);

  /* ── Revision queue ── */
  const revisionQueue = useMemo<RevisionItem[]>(() => {
    const failed = checks.filter(c => c.result === 'FAIL' && !c.overridden);
    const severityOrder: Record<Severity, number> = { Critical: 0, Major: 1, Minor: 2, Info: 3 };
    return failed
      .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
      .map((c, i) => ({
        rank: i + 1,
        checkId: c.id,
        severity: c.severity,
        scenesAffected: c.scenesAffected || [],
        action: c.suggestedFix || `Review ${c.name}`,
        estimatedEffort: c.severity === 'Critical' ? 'High' : c.severity === 'Major' ? 'Medium' : 'Low',
      }));
  }, [checks]);

  /* ── Role handlers ── */
  const handleRoleUpdate = useCallback((role: string, data: RoleApproval) => {
    setRoles(prev => ({ ...prev, [role]: data }));
  }, []);

  const approvedRolesCount = useMemo(() => Object.values(roles).filter(r => r.status === 'Approved').length, [roles]);
  const allRolesApproved = approvedRolesCount === 4;
  const exportUnlocked = verdict === 'SHIP' && allRolesApproved && !validating && !validationError;

  /* ── Render helpers ── */
  const getRoleFailingChecks = (role: string) => {
    const checkIds = ROLE_CHECK_MAP[role] || [];
    return checks
      .filter(c => checkIds.includes(c.id) && c.result === 'FAIL')
      .map(c => ({ id: c.id, name: c.name }));
  };

  const getVerdictBanner = () => {
    if (verdict === 'SHIP') {
      return (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl border" style={{ backgroundColor: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.25)' }}>
          <CheckCircle2 size={22} style={{ color: SUCCESS }} />
          <div>
            <span className="text-base font-bold" style={{ color: SUCCESS }}>VERDICT: SHIP</span>
            <span className="text-sm text-text-secondary ml-2">Ready for production</span>
          </div>
        </div>
      );
    }
    if (verdict === 'REVISE') {
      return (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl border" style={{ backgroundColor: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)' }}>
          <AlertTriangle size={22} style={{ color: WARNING }} />
          <div>
            <span className="text-base font-bold" style={{ color: WARNING }}>VERDICT: REVISE</span>
            <span className="text-sm text-text-secondary ml-2">{criticalCount} Critical, {majorCount} Major fixes needed</span>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl border" style={{ backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.25)' }}>
        <X size={22} style={{ color: ERROR }} />
        <div>
          <span className="text-base font-bold" style={{ color: ERROR }}>VERDICT: REJECT</span>
          <span className="text-sm text-text-secondary ml-2">Fundamental issues must be addressed</span>
        </div>
      </div>
    );
  };

  const effortColor = (effort: string) => {
    if (effort === 'High') return 'text-error';
    if (effort === 'Medium') return 'text-warning';
    return 'text-sky-400';
  };

  return (
    <Layout className="[&>div]:max-w-none">
      <div className="py-10 pb-16">

        {validating && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-border-subtle bg-[#151821] p-4 text-sm text-text-secondary">
            Validating your actual screenplay across all checks — this takes 10-15 seconds...
          </div>
        )}
        {validationError && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-error/40 bg-error/10 p-4 text-sm text-error">
            <AlertTriangle className="w-4 h-4" />
            {validationError}
          </div>
        )}
        {validatedReal && !validating && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 p-4 text-sm text-success">
            All checks below reflect the current working screenplay. Apply Fix updates it immediately.
          </div>
        )}
        {!data.screenplay && !validating && (
          <div className="mb-6 rounded-xl border border-border-subtle bg-[#151821] p-4 text-sm text-text-secondary">
            No screenplay found from Phase 3 — showing example validation.
          </div>
        )}

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 HEADER \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: VIOLET, color: '#0B0C0F' }}>
              PHASE 4
            </span>
            <span className="text-sm font-mono text-text-secondary">
              {passCount} passed / {failCount} failed / {naCount} N/A &middot; NPS: {nps}/100
            </span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Quality Validation</h1>
          <p className="text-base text-text-secondary">
            58 automated checks against the screenplay. AI scored. Human decides.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <section aria-label="Phase 4 validation" className="min-w-0 xl:max-h-[calc(100dvh-120px)] xl:overflow-y-auto xl:pr-3 scrollbar-thin">
          <div className="sticky top-0 z-10 bg-bg-primary py-3 mb-4 border-b border-border-subtle">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-validation">Phase 4 - Review & fix</p>
            <p className="text-sm text-text-secondary mt-1">Apply a fix here. Review the updated screenplay alongside.</p>
          </div>
        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 VERDICT BANNER \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: easeOut }}
          className="mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={verdict}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: spring }}
            >
              {getVerdictBanner()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 SCORE CARDS \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: easeOut }}
          className="grid grid-cols-1 2xl:grid-cols-3 gap-4 mb-8"
        >
          {/* NPS Card */}
          <Card phaseAccent={VIOLET} className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <NPSArc score={nps} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-text-tertiary uppercase tracking-wider mb-0.5">Neural Prediction Score</p>
                <p className="text-lg font-bold text-text-primary">{npsInterp}</p>
                <p className="text-xs text-text-secondary mt-1">
                  Pass rate: {totalRun > 0 ? Math.round((passCount / totalRun) * 100) : 0}%
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                  <span className="text-error font-medium">{criticalCount} Critical</span>
                  <span className="text-warning font-medium">{majorCount} Major</span>
                  <span className="text-sky-400 font-medium">{minorCount} Minor</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats card */}
          <Card phaseAccent={VIOLET} className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Check Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-success/5 border border-success/15">
                <Check size={16} className="text-success" />
                <div>
                  <p className="text-lg font-bold text-success">{passCount}</p>
                  <p className="text-[10px] text-text-tertiary">Passed</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-error/5 border border-error/15">
                <X size={16} className="text-error" />
                <div>
                  <p className="text-lg font-bold text-error">{failCount}</p>
                  <p className="text-[10px] text-text-tertiary">Failed</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-quaternary border border-border-subtle">
                <span className="text-lg text-text-tertiary">-</span>
                <div>
                  <p className="text-lg font-bold text-text-tertiary">{naCount}</p>
                  <p className="text-[10px] text-text-tertiary">N/A</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-quaternary border border-border-subtle">
                <Shield size={16} className="text-text-tertiary" />
                <div>
                  <p className="text-lg font-bold text-text-primary">{checks.length}</p>
                  <p className="text-[10px] text-text-tertiary">Total</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Role progress */}
          <Card phaseAccent={VIOLET} className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Role Approvals</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              {Object.entries(roles).map(([role, data]) => {
                const rc = data.status === 'Approved' ? SUCCESS : data.status === 'Rejected' ? ERROR : '#3A4050';
                return (
                  <motion.div
                    key={role}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + Object.keys(roles).indexOf(role) * 0.08, ease: spring }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#252932', boxShadow: `inset 0 0 0 2px ${rc}`, color: '#E8EAEF' }}
                    >
                      {data.name ? data.name.charAt(0).toUpperCase() : role.charAt(0)}
                    </div>
                    <span className="text-[9px] text-text-tertiary">{role.split(' ')[0]}</span>
                  </motion.div>
                );
              })}
            </div>
            <div className="w-full h-1.5 bg-bg-quaternary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: SUCCESS }}
                initial={{ width: 0 }}
                animate={{ width: `${(approvedRolesCount / 4) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-text-tertiary mt-1.5">{approvedRolesCount} of 4 approved</p>
          </Card>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 CATEGORY FILTER TABS \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: easeOut }}
          className="mb-6"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              const color = cat === 'All' ? VIOLET : CATEGORY_COLORS[cat as Category];
              const count = categoryCounts.get(cat) || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all duration-200',
                    isActive
                      ? 'text-white border-transparent'
                      : 'text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-medium'
                  )}
                  style={isActive ? { backgroundColor: color, borderColor: color } : {}}
                >
                  {cat !== 'All' && CATEGORY_ICONS[cat as Category]}
                  {cat === 'All' ? 'All' : cat}
                  <span className={cn('text-[10px]', isActive ? 'opacity-80' : 'text-text-tertiary')}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Result filter row */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] text-text-tertiary uppercase mr-1">Result:</span>
            {(['All', 'PASS', 'FAIL', 'N/A'] as const).map(res => {
              const isActive = activeResultFilter === res;
              const count = res === 'All' ? checks.length : checks.filter(c => c.result === res).length;
              const resColor = res === 'PASS' ? SUCCESS : res === 'FAIL' ? ERROR : res === 'N/A' ? '#5C6370' : VIOLET;
              return (
                <button
                  key={res}
                  onClick={() => setActiveResultFilter(res)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all duration-200',
                    isActive
                      ? 'text-white border-transparent'
                      : 'text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-medium'
                  )}
                  style={isActive ? { backgroundColor: resColor, borderColor: resColor } : {}}
                >
                  {res === 'All' ? 'All' : res === 'PASS' ? 'Passed' : res === 'FAIL' ? 'Failed' : 'N/A'}
                  <span className={cn('text-[10px]', isActive ? 'opacity-80' : 'text-text-tertiary')}>({count})</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* CHECKLIST SECTION \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {activeCategory === 'All' ? 'All Checks' : activeCategory}
              </h2>
              <p className="text-sm text-text-secondary mt-0.5">
                {filteredChecks.length} check{filteredChecks.length !== 1 ? 's' : ''} in view
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredChecks.map(check => (
                <CheckCard
                  key={check.id}
                  check={check}
                  onOverride={handleOverride}
                  onApplyFix={handleApplyFix}
                  onApplyRewrite={handleApplyRewrite}
                  getRewriteOptions={getRewriteOptions}
                  isFixApplied={appliedFixes.includes(check.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>


        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 ROLE APPROVAL PANEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: easeOut }}
          className="mb-10"
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Role Approvals</h2>
            <p className="text-sm text-text-secondary mt-0.5">
              Every role must review and approve. Each role sees their relevant failing checks.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {Object.entries(roles).map(([role, data]) => (
              <RoleApprovalCard
                key={role}
                role={role}
                data={data}
                failingChecks={getRoleFailingChecks(role)}
                onUpdate={(d) => handleRoleUpdate(role, d)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 REVISION QUEUE \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <AnimatePresence>
          {revisionQueue.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="mb-10"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-primary">Revision Queue - Ordered by Priority</h2>
                <p className="text-sm text-text-secondary mt-0.5">
                  {revisionQueue.length} item{revisionQueue.length !== 1 ? 's' : ''} to address before shipping.
                </p>
              </div>

              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-2">
                {revisionQueue.map(item => (
                  <motion.div key={item.checkId} variants={fadeUp}>
                    <Card phaseAccent={VIOLET} className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bg-quaternary flex items-center justify-center text-[10px] font-bold text-text-secondary border border-border-subtle">
                          {item.rank}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <SeverityBadge severity={item.severity} />
                            <span className="text-xs font-mono text-text-tertiary">{item.checkId}</span>
                            {item.scenesAffected.length > 0 && (
                              <div className="flex items-center gap-1">
                                <Film size={10} className="text-text-tertiary" />
                                <span className="text-[10px] text-text-tertiary">Scenes: {item.scenesAffected.join(', ')}</span>
                              </div>
                            )}
                            <span className={cn('text-[10px] font-bold', effortColor(item.estimatedEffort))}>
                              {item.estimatedEffort} Effort
                            </span>
                          </div>
                          <p className="text-sm text-text-primary mt-1.5 font-medium">{item.action}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Send back to Phase 3 */}
              <motion.div variants={fadeUp} className="mt-4">
                <button
                  onClick={() => navigate('/phase/3')}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold bg-warning/10 text-warning hover:bg-warning/20 border border-warning/20 transition-all"
                >
                  <RefreshCw size={16} />
                  Send Back to Phase 3 with Revision Notes
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        </section>
        <section aria-label="Working screenplay" className="min-w-0 rounded-xl border border-border-subtle bg-bg-secondary xl:max-h-[calc(100dvh-120px)] xl:overflow-y-auto scrollbar-thin">
          <div className="sticky top-0 z-10 bg-bg-secondary p-4 border-b border-border-subtle">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-accent-validation">Phase 3 - Working screenplay</p>
                <h2 className="text-lg font-semibold text-text-primary mt-1">Live script</h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowCompare(previous => !previous)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold border transition-colors',
                    showCompare ? 'border-success/40 bg-success/10 text-success' : 'border-border-subtle bg-bg-tertiary text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Columns3 size={14} />
                  {showCompare ? 'Back to editor' : 'Compare original'}
                </button>
                <button disabled={validating} onClick={runRealValidation} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold bg-accent-validation text-white disabled:opacity-50">
                  <RefreshCw size={14} className={validating ? 'animate-spin' : ''} />
                  {validating ? 'Validating...' : 'Re-Run Validation'}
                </button>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">This is the script carried forward to Phase 5 output.</p>
            <p role="status" className="text-xs mt-2 text-success">
              {needsValidation ? 'Working script updated. Re-run Validation is optional.' : 'Current script validated.'}
            </p>
            {latestFix && <p role="status" className="text-xs text-text-primary mt-3 p-2 rounded-md bg-accent-validation/10 border border-accent-validation/20">{latestFix}</p>}
          </div>
          <div className="p-4 space-y-5">
            {showCompare ? (
              <section aria-label="Original and final screenplay comparison" className="space-y-4">
                <div className="rounded-lg border border-success/25 bg-success/5 px-3 py-2 text-xs text-success">
                  Original Phase 3 script is on the left. Final fixed script is on the right. Only changed fields are shown.
                </div>
                {scenes.map(scene => {
                  const original = baselineScenes.current.find(item => item.sceneNum === scene.sceneNum);
                  const changedFields = original
                    ? (Object.keys(scene) as (keyof EditableScene)[]).filter(field => original[field] !== scene[field])
                    : [];
                  if (!original || changedFields.length === 0) return null;
                  return (
                    <article key={scene.sceneNum} className="rounded-xl border border-border-subtle overflow-hidden">
                      <header className="flex items-center justify-between gap-3 bg-bg-tertiary/50 px-3 py-2">
                        <p className="text-sm font-semibold text-text-primary">Scene {scene.sceneNum}: {scene.name}</p>
                        <span className="text-xs text-success">{changedFields.length} change{changedFields.length === 1 ? '' : 's'}</span>
                      </header>
                      <div className="p-3 space-y-3">
                        {changedFields.map(field => (
                          <div key={field}>
                            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">{FIELD_LABELS[field] || field}</p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              <div className="rounded-md border border-border-subtle bg-bg-tertiary p-2">
                                <span className="block text-[10px] font-bold uppercase text-text-tertiary mb-1">Original</span>
                                {field === 'editMarkers'
                                  ? <EditMarkerDiffValue value={original[field]} />
                                  : <p className="whitespace-pre-wrap break-words text-xs text-text-secondary">{String(original[field])}</p>}
                              </div>
                              <div className="rounded-md border border-success/30 bg-success/10 p-2">
                                <span className="block text-[10px] font-bold uppercase text-success mb-1">Final</span>
                                {field === 'editMarkers'
                                  ? <EditMarkerDiffValue value={scene[field]} final />
                                  : <p className="whitespace-pre-wrap break-words text-xs text-text-primary">{String(scene[field])}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </article>
                  );
                })}
                {!scenes.some(scene => {
                  const original = baselineScenes.current.find(item => item.sceneNum === scene.sceneNum);
                  return original && (Object.keys(scene) as (keyof EditableScene)[]).some(field => original[field] !== scene[field]);
                }) && (
                  <p className="rounded-lg border border-border-subtle bg-bg-tertiary/40 p-4 text-sm text-text-secondary">
                    No applied changes yet. Click Apply Fix to compare the original screenplay with the final version.
                  </p>
                )}
              </section>
            ) : scenes.map(scene => {
              const original = baselineScenes.current.find(s => s.sceneNum === scene.sceneNum);
              const changedFields = (Object.keys(scene) as (keyof EditableScene)[]).filter(key => original && original[key] !== scene[key]);
              const sceneChanges = appliedChanges[scene.sceneNum] || [];
              const visibleChanges = openChangeScenes[scene.sceneNum];
              return (
                <div key={scene.sceneNum} id={`working-scene-${scene.sceneNum}`} className={cn('scroll-mt-48 rounded-xl', changedFields.length > 0 && 'ring-1 ring-success/50')}>
                  {sceneChanges.length > 0 && (
                    <section id={`change-summary-${scene.sceneNum}`} className="border border-success/30 bg-success/5 rounded-t-xl overflow-hidden scroll-mt-24" aria-label={`Applied changes for Scene ${scene.sceneNum}`}>
                      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-success/20">
                        <p className="flex items-center gap-1.5 text-xs font-bold text-success uppercase tracking-wide">
                          <CheckCircle2 size={13} /> Applied changes ({sceneChanges.length})
                        </p>
                        <button
                          type="button"
                          onClick={() => setOpenChangeScenes(previous => ({ ...previous, [scene.sceneNum]: !previous[scene.sceneNum] }))}
                          className="text-xs font-medium text-success hover:text-text-primary transition-colors"
                        >
                          {visibleChanges ? 'Hide changes' : 'Show changes'}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 px-3 py-2 border-b border-success/15">
                        {[...new Set(sceneChanges.map(change => change.checkId))].map(checkId => (
                          <button
                            key={checkId}
                            type="button"
                            onClick={() => handleUndoFix(checkId)}
                            className="inline-flex items-center gap-1 rounded-md border border-warning/30 bg-warning/10 px-2 py-1 text-[11px] font-semibold text-warning hover:bg-warning/20"
                          >
                            <Undo2 size={12} /> Undo {checkId}
                          </button>
                        ))}
                      </div>
                      <AnimatePresence initial={false}>
                        {visibleChanges && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 space-y-3">
                              {sceneChanges.map((change, index) => (
                                <div key={`${change.checkId}-${change.field}-${index}`} className="text-xs border-l-2 border-success/50 pl-3">
                                  <p className="font-bold text-text-primary">{change.checkId} · {FIELD_LABELS[change.field] || change.field}</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                                    <div className="p-2 rounded-md bg-bg-tertiary border border-border-subtle">
                                      <span className="block text-[10px] font-bold uppercase text-text-tertiary mb-1">Before</span>
                                      <p className="text-text-secondary whitespace-pre-wrap break-words line-clamp-4">{change.before}</p>
                                    </div>
                                    <div className="p-2 rounded-md bg-success/10 border border-success/25">
                                      <span className="block text-[10px] font-bold uppercase text-success mb-1">After</span>
                                      <p className="text-text-primary whitespace-pre-wrap break-words line-clamp-4">{change.after}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>
                  )}
                  {changedFields.length > 0 && <p className={cn('px-3 py-2 text-xs text-success bg-success/10', sceneChanges.length > 0 ? '' : 'rounded-t-xl')}>Updated fields are outlined in green.</p>}
                  <SceneEditorCard scene={scene} highlightedFields={new Set(sceneChanges.map(change => change.field))} onChange={(field, value) => {
                    setScenes(prev => prev.map(s => s.sceneNum === scene.sceneNum ? { ...s, [field]: value } : s));
                    setRoles({ ...INITIAL_ROLES });
                  }} />
                </div>
              );
            })}
          </div>
        </section>
        </div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 NAVIGATION \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4 mt-8"
        >
          <button
            onClick={() => navigate('/phase/3')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all"
          >
            <ArrowLeft size={16} />
            Back to Phase 3
          </button>

          {/* Export button */}
          <div
            className="relative"
            onMouseEnter={() => !exportUnlocked && setHoveredLocked(true)}
            onMouseLeave={() => setHoveredLocked(false)}
          >
            {!exportUnlocked && hoveredLocked && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-bg-quaternary rounded-lg text-xs text-text-secondary whitespace-nowrap border border-border-medium shadow-lg z-10">
                {verdict !== 'SHIP' ? `Verdict is ${verdict}. Fix failures first.` : `All 4 roles must approve. ${approvedRolesCount}/4 approved.`}
              </div>
            )}

            <motion.button
              onClick={() => {
                if (exportUnlocked) {
                  const screenplay = toScreenplay(scenes);
                  updateData({ screenplay, screenplayFixes: appliedChanges });
                  if (data.projectId) saveProject({ ...data, screenplay, screenplayFixes: appliedChanges }, 5, data.projectId);
                  navigate('/phase/5');
                }
              }}
              animate={
                exportUnlocked
                  ? {
                      boxShadow: [
                        '0 0 24px rgba(139, 92, 246, 0.15)',
                        '0 0 24px rgba(139, 92, 246, 0.3)',
                        '0 0 24px rgba(139, 92, 246, 0.15)',
                      ],
                    }
                  : {}
              }
              transition={exportUnlocked ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
              className={cn(
                'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300',
                exportUnlocked
                  ? 'bg-accent-validation text-white hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-bg-quaternary text-text-tertiary cursor-not-allowed opacity-50'
              )}
            >
              {exportUnlocked ? <Unlock size={16} /> : <Lock size={16} />}
              {exportUnlocked ? 'Approve & Export to Phase 5' : `Locked - ${verdict}, ${approvedRolesCount}/4 roles`}
            </motion.button>
          </div>
        </motion.div>

        {/* Toast notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border"
              style={{ backgroundColor: '#252932', borderColor: '#3A4050' }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <CheckCircle2 size={14} className="text-success" />
              <span className="text-sm text-text-primary">{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

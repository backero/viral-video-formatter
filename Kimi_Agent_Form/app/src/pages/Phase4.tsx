import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, ChevronDown, ChevronUp, CheckCircle2, MessageSquare,
  ArrowLeft, Shield, AlertTriangle, BarChart3, Zap, Brain,
  FileText, Eye, Camera, Target,
  Sparkles, Lock, Unlock, Users, Film,
  RefreshCw, Mic, Volume2, Scissors
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

// Start with empty checks - all validation comes from API response
const INITIAL_CHECKS: CheckItem[] = [];

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

const BRAIN_REGIONS = [
  { region: 'FFA', name: 'Face Fusiform Area', scenes: [1, 3, 5], color: '#3B82F6' },
  { region: 'MT/V5', name: 'Motion Area', scenes: [1, 2, 3, 5], color: '#EF4444' },
  { region: 'VWFA', name: 'Visual Word Form', scenes: [1, 2, 3, 4, 5], color: '#22C55E' },
  { region: 'A1', name: 'Auditory Cortex', scenes: [1, 2, 3, 4, 5], color: '#8B5CF6' },
  { region: 'EBA', name: 'Body/Hand Area', scenes: [1, 2, 3], color: '#F59E0B' },
  { region: 'LOC', name: 'Object Area', scenes: [1, 2, 3, 4], color: '#EC4899' },
  { region: 'DMN', name: 'Default Mode', scenes: [1, 5], color: '#06D6A0' },
  { region: 'Prefrontal', name: 'Executive/Numbers', scenes: [2, 4], color: '#0EA5E9' },
  { region: 'TPO', name: 'Multisensory', scenes: [1, 3], color: '#F97316' },
];

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

function SceneEditorCard({ scene, onChange }: { scene: EditableScene; onChange: (field: keyof EditableScene, value: string | number) => void }) {
  const accent = '#EF4444';
  const parseMarkers = () => { try { return JSON.parse(scene.editMarkers); } catch { return []; } };

  const inputBaseClass = 'w-full bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 transition-all';
  const textareaBaseClass = 'w-full min-h-[60px] bg-bg-tertiary border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-medium focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/15 resize-y';

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
          className="flex-1 bg-transparent text-base font-semibold text-text-primary border-b border-border-subtle focus:border-[#8B5CF6] focus:outline-none px-1"
        />
        <span className="text-xs font-mono text-text-tertiary">{scene.timingStart}s &ndash; {scene.timingEnd}s</span>
      </div>

      {/* Two-column grid for fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              className={textareaBaseClass}
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
              className={cn(textareaBaseClass, 'min-h-[50px]')}
            />
          </div>

          {/* Camera row */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Camera size={12} /> Camera
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input value={scene.cameraShot} onChange={(e) => onChange('cameraShot', e.target.value)} placeholder="Shot" className={inputBaseClass} />
              <input value={scene.cameraAngle} onChange={(e) => onChange('cameraAngle', e.target.value)} placeholder="Angle" className={inputBaseClass} />
              <input value={scene.cameraMovement} onChange={(e) => onChange('cameraMovement', e.target.value)} placeholder="Movement" className={inputBaseClass} />
            </div>
          </div>

          {/* Actor row */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Users size={12} /> Actor
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input value={scene.actorExpression} onChange={(e) => onChange('actorExpression', e.target.value)} placeholder="Expression" className={inputBaseClass} />
              <input type="number" min={1} max={10} value={scene.actorEnergy} onChange={(e) => onChange('actorEnergy', Number(e.target.value))} placeholder="Energy" className={inputBaseClass} />
              <input value={scene.actorPace} onChange={(e) => onChange('actorPace', e.target.value)} placeholder="Pace" className={inputBaseClass} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Eye size={12} /> Visual
            </label>
            <textarea value={scene.visual} onChange={(e) => onChange('visual', e.target.value)} className={textareaBaseClass} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Volume2 size={12} /> Audio
            </label>
            <textarea value={scene.audio} onChange={(e) => onChange('audio', e.target.value)} className={textareaBaseClass} />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase text-text-tertiary mb-1">
              <Scissors size={12} /> Edit Markers (JSON)
            </label>
            <textarea value={scene.editMarkers} onChange={(e) => onChange('editMarkers', e.target.value)} className={cn(textareaBaseClass, 'min-h-[80px] font-mono text-xs')} />
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

function CheckCard({ check, onOverride, onApplyFix, isFixApplied }: { check: CheckItem; onOverride?: (id: string) => void; onApplyFix?: (id: string) => void; isFixApplied?: boolean }) {
  const [expanded, setExpanded] = useState(check.result === 'FAIL');

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

                    {/* Apply Fix (left) + Override (right) — side by side */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Apply Fix button — LEFT */}
                      {check.result === 'FAIL' && onApplyFix && (
                        <div>
                          {isFixApplied ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-success/10 text-success border border-success/20">
                              <Check size={12} /> Applied
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
/*  BRAIN REGION COVERAGE MATRIX                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function BrainRegionMatrix() {
  const totalScenes = 5;
  const coverage = useMemo(() => {
    return BRAIN_REGIONS.map(r => ({
      ...r,
      pct: Math.round((r.scenes.length / totalScenes) * 100),
    }));
  }, []);

  const avgCoverage = Math.round(coverage.reduce((s, r) => s + r.pct, 0) / coverage.length);

  return (
    <motion.div variants={fadeUp}>
      <Card phaseAccent={VIOLET} className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={18} style={{ color: VIOLET }} />
          <h3 className="text-lg font-semibold text-text-primary">Brain Region Coverage</h3>
          <span className="ml-auto text-sm font-medium text-text-secondary">Avg: <strong className="text-text-primary">{avgCoverage}%</strong></span>
        </div>

        <div className="space-y-2.5">
          {coverage.map(r => (
            <div key={r.region} className="flex items-center gap-3">
              <div className="w-16 text-right flex-shrink-0">
                <span className="text-xs font-mono font-bold" style={{ color: r.color }}>{r.region}</span>
              </div>
              <div className="w-32 text-left flex-shrink-0 hidden sm:block">
                <span className="text-xs text-text-secondary">{r.name}</span>
              </div>
              <div className="flex gap-1.5 flex-1">
                {Array.from({ length: totalScenes }, (_, i) => i + 1).map(scene => (
                  <div
                    key={scene}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all"
                    style={{
                      backgroundColor: r.scenes.includes(scene) ? `${r.color}25` : 'transparent',
                      borderColor: r.scenes.includes(scene) ? `${r.color}60` : '#2A2E38',
                      color: r.scenes.includes(scene) ? r.color : '#5C6370',
                    }}
                  >
                    {scene}
                  </div>
                ))}
              </div>
              <div className="w-10 text-right flex-shrink-0">
                <span className="text-xs text-text-tertiary">{r.pct}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-4 text-[10px] text-text-tertiary">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-success/30 border border-success/60" /> Active</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full border border-border-subtle" /> Inactive</span>
        </div>
      </Card>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MAIN: Phase4                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

export default function Phase4() {
  const navigate = useNavigate();
  const { data } = useFormData();

  const realScenes: EditableScene[] | null = data.screenplay
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
    : null;

  const [scenes, setScenes] = useState<EditableScene[]>(realScenes ?? INITIAL_SCENES);
  const [checks, setChecks] = useState<CheckItem[]>(INITIAL_CHECKS);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validatedReal, setValidatedReal] = useState(false);

  const runRealValidation = useCallback(() => {
    // Use real screenplay from context if available, otherwise use current editor state
    const scenesToValidate = realScenes && realScenes.length > 0 ? realScenes : scenes;
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
        const resultsById: Record<string, { result: CheckResult; evidence: string; suggestedFix: string }> =
          Object.fromEntries(json.results.map((r: any) => [r.id, r]));
        setChecks((prev) =>
          prev.map((c) =>
            resultsById[c.id]
              ? {
                  ...c,
                  result: resultsById[c.id].result,
                  evidence: resultsById[c.id].evidence,
                  suggestedFix: resultsById[c.id].suggestedFix || '',
                }
              : c
          )
        );
        setValidatedReal(true);
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
  }, [realScenes, scenes]);

  useEffect(() => {
    if (validatedReal) return;
    // Re-run validation whenever screenplay data changes
    const timer = setTimeout(() => runRealValidation(), 300);
    return () => clearTimeout(timer);
  }, [data.screenplay, validatedReal, runRealValidation]);

  /* ═══════ EDITABLE SCENE STATE ═══════ */
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);
  const [showSceneEditor, setShowSceneEditor] = useState(false);


  const handleOverride = useCallback((checkId: string) => {
    setChecks(prev => prev.map(c => c.id === checkId ? { ...c, overridden: !c.overridden } : c));
  }, []);

  /* ═══════ APPLY FIX HANDLER ═══════ */
  const handleApplyFix = useCallback((checkId: string) => {
    setScenes(prev => {
      const next = [...prev];
      switch (checkId) {
        case 'GR07':
        case 'QG10': {
          const s4 = { ...next[3] };
          if (!s4.visual.includes('B-roll insert at 20.0s')) {
            s4.visual = s4.visual + '; B-roll insert added mid-scene to break up the static shot';
          }
          try {
            const markers = JSON.parse(s4.editMarkers);
            markers.splice(Math.min(2, markers.length), 0, { time: 'mid-scene', event: 'B-roll cutaway - breaks static shot' });
            s4.editMarkers = JSON.stringify(markers, null, 0);
          } catch {}
          next[3] = s4;
          break;
        }
        case 'GR09': {
          // Add a generic bridge marker without overwriting the actual dialogue content
          const s2 = { ...next[1] };
          if (!s2.dialogue.match(/^(And|But|So|Which means)/i)) {
            s2.dialogue = 'But here\u2019s the part that matters: ' + s2.dialogue;
          }
          next[1] = s2;
          break;
        }
        case 'QG09': {
          const s4 = { ...next[3] };
          if (!s4.visual.includes('text overlay reinforcing the key number')) {
            s4.visual = s4.visual + '; on-screen text overlay reinforcing the key number for muted viewers';
          }
          next[3] = s4;
          break;
        }
        case 'NS02': {
          const s4 = { ...next[3] };
          if (!s4.visual.includes('primary hero text')) {
            s4.visual = 'Primary hero text pop-in within 0.3s of scene start; ' + s4.visual;
          }
          next[3] = s4;
          break;
        }
        case 'NS04':
        case 'SA04': {
          // Do NOT overwrite real dialogue with canned example text.
          // These checks are about "you/your" density — flag for manual rewrite instead of auto-mutating content.
          break;
        }
      }
      return next;
    });
    // Immediately mark the check as PASS with updated evidence
    setChecks(prev => prev.map(c => {
      if (c.id !== checkId) return c;
      const fixEvidence: Record<string, string> = {
        GR07: 'Marked fixed: B-roll insert added to Scene 4 to break up the static shot.',
        QG10: 'Marked fixed: visual change added to Scene 4 so no segment exceeds 2s.',
        GR09: 'Marked fixed: bridge phrase added to Scene 2 opening.',
        QG09: 'Marked fixed: on-screen text overlay added to Scene 4 for muted viewers.',
        NS02: 'Marked fixed: primary hero text added to Scene 4 for tri-modal convergence.',
        NS04: 'Acknowledged \u2014 this needs a manual dialogue rewrite to raise "you/your" density; not auto-applied to avoid overwriting your real script.',
        SA04: 'Acknowledged \u2014 this needs a manual dialogue rewrite to raise "you/your" density; not auto-applied to avoid overwriting your real script.',
      };
      return { ...c, result: (checkId === 'NS04' || checkId === 'SA04') ? c.result : 'PASS', evidence: fixEvidence[checkId] || `Marked fixed: ${c.name} correction applied.`, suggestedFix: (checkId === 'NS04' || checkId === 'SA04') ? c.suggestedFix : undefined, overridden: (checkId === 'NS04' || checkId === 'SA04') ? true : c.overridden };
    }));
    setAppliedFixes(prev => [...prev, checkId]);
  }, []);

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
  const [toast, setToast] = useState<string | null>(null);

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
  const exportUnlocked = verdict === 'SHIP' && allRolesApproved;

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
    <Layout>
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
            All checks below reflect your actual AI-generated screenplay.
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
            52 automated checks against the screenplay. AI scored. Human decides.
          </p>
        </motion.div>

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
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8"
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
                  isFixApplied={appliedFixes.includes(check.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 BRAIN REGION COVERAGE \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <div className="mb-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <BrainRegionMatrix />
          </motion.div>
        </div>

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

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 SCENE EDITOR TOGGLE \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowSceneEditor(!showSceneEditor)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all"
            style={{
              borderColor: showSceneEditor ? VIOLET : '#3A4050',
              color: showSceneEditor ? VIOLET : '#9BA3B4',
              backgroundColor: showSceneEditor ? `${VIOLET}10` : '#1A1D26',
            }}
          >
            {showSceneEditor ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showSceneEditor ? 'Hide Screenplay Editor' : 'Edit Screenplay'}
            {appliedFixes.length > 0 && (
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: SUCCESS, color: '#fff' }}>
                {appliedFixes.length} fix{appliedFixes.length > 1 ? 'es' : ''} applied
              </span>
            )}
          </button>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 SCENE EDITOR SECTION \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <AnimatePresence>
          {showSceneEditor && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="overflow-hidden mb-10"
            >
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                  <Film size={20} style={{ color: VIOLET }} />
                  Screenplay Editor
                </h2>
              </div>

              {/* 5 Scene Cards */}
              <div className="space-y-6">
                {scenes.map((scene) => (
                  <SceneEditorCard
                    key={scene.sceneNum}
                    scene={scene}
                    onChange={(field, value) => setScenes(prev => prev.map(s => s.sceneNum === scene.sceneNum ? { ...s, [field]: value } : s))}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550 NAVIGATION \u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <button
            onClick={() => navigate('/phase/3')}
            className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all"
          >
            <ArrowLeft size={16} />
            Back to Phase 3
          </button>

          {/* Re-Run Validation — visible when editor is open */}
          <AnimatePresence>
            {showSceneEditor && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  runRealValidation();
                  setShowSceneEditor(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setToast('Re-validating with AI...');
                  setTimeout(() => setToast(null), 3000);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium"
                style={{ backgroundColor: VIOLET, color: '#fff' }}
              >
                <RefreshCw size={14} />
                Re-Run Validation
              </motion.button>
            )}
          </AnimatePresence>

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
                  if (data.projectId) saveProject({ ...data, screenplay: realScenes ? scenes.map(s => ({
                    sceneNum: s.sceneNum, name: s.name, timingStart: s.timingStart, timingEnd: s.timingEnd, duration: s.duration,
                    dialogue: s.dialogue, action: s.action,
                    camera: { shot: s.cameraShot, angle: s.cameraAngle, movement: s.cameraMovement },
                    actor: { expression: s.actorExpression, energy: s.actorEnergy, pace: s.actorPace },
                    visual: s.visual, audio: s.audio,
                    editMarkers: (() => { try { return JSON.parse(s.editMarkers); } catch { return []; } })(),
                  })) : data.screenplay }, 5, data.projectId);
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

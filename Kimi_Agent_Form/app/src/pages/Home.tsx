import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  FileVideo,
  Clock,
  AlertCircle,
  ListVideo,
  Plus,
  FolderOpen,
  Bot,
  Pencil,
  Eye,
  Trash2,
  ArrowUp,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { useFormData } from '@/context/FormDataContext';
import { listProjects, deleteProject, type ProjectSummary } from '@/lib/projectStore';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const cardItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Phase display lookups                                               */
/* ------------------------------------------------------------------ */

const phaseColors = ['', '#06D6A0', '#F59E0B', '#EF4444', '#8B5CF6', '#0EA5E9', '#F59E0B'];
const phaseNames = ['', 'Input', 'Structure', 'Execution', 'Validation', 'Output', 'Node Editor'];
const phaseLabels = ['Phase 1: Input', 'Phase 2: Structure', 'Phase 3: Execution', 'Phase 4: Validation', 'Phase 5: Output', 'Phase 6: Node Editor'];

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function MetricCard({
  icon: Icon, iconColor, label, metric, trend, trendColor = 'text-success',
  bottomColor, pulse = false, children,
}: {
  icon: React.ElementType; iconColor: string; label: string; metric: string;
  trend?: string; trendColor?: string; bottomColor: string; pulse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardItem}
      className={cn(
        'bg-bg-secondary border border-border-subtle rounded-xl p-6 relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 group',
        pulse && 'animate-pulse-border'
      )}
      onMouseEnter={(e) => { if (bottomColor) e.currentTarget.style.borderColor = `${bottomColor}4D`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} style={{ color: iconColor }} />
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <div className="text-[3rem] font-extrabold text-text-primary leading-none tracking-tight mb-2">
        {metric}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          {trendColor === 'text-success' && <ArrowUp size={14} className={trendColor} />}
          <span className={cn('text-sm', trendColor)}>{trend}</span>
        </div>
      )}
      {children}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] opacity-40 group-hover:opacity-60 transition-opacity"
        style={{ backgroundColor: bottomColor }}
      />
    </motion.div>
  );
}

function QuickActionCard({
  icon: Icon, iconColor, title, subtitle, gradient,
  borderColor, hoverBorderColor, shadowClass, onClick,
}: {
  icon: React.ElementType; iconColor: string; title: string; subtitle: string;
  gradient: string; borderColor: string; hoverBorderColor: string;
  shadowClass: string; onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.button
      variants={cardItem}
      onClick={onClick}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className="text-left w-full h-[120px] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between"
      style={{
        background: gradient,
        border: `1px solid ${hovered ? hoverBorderColor : borderColor}`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px ${shadowClass}` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <Icon size={24} style={{ color: iconColor }} />
      <div>
        <div className="text-xl font-semibold text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-0.5">{subtitle}</div>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  const navigate = useNavigate();
  const { loadData, resetData } = useFormData();
  const [dateRange, setDateRange] = React.useState('Last 30 days');
  const [showDateDropdown, setShowDateDropdown] = React.useState(false);
  const [projects, setProjects] = React.useState<ProjectSummary[]>([]);

  React.useEffect(() => {
    setProjects(listProjects());
  }, []);

  const dateOptions = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'];
  const recentBriefs = projects.slice(0, 3);

  const totalVideos = projects.length;
  const inProgressCount = projects.filter(p => p.phase >= 1 && p.phase <= 3).length;
  const pendingApprovalCount = projects.filter(p => p.status === 'Pending Approval').length;

  const pipelineData = [1, 2, 3, 4, 5, 6].map(phase => ({
    phase,
    items: projects.filter(p => p.phase === phase),
  }));

  const openProject = (p: ProjectSummary) => {
    loadData(p.data);
    navigate(`/phase/${p.phase}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject(id);
    setProjects(listProjects());
  };

  return (
    <Layout>
      {/* ========== SECTION 1: Welcome Header ========== */}
      <motion.section
        className="pt-12 pb-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="flex items-start justify-between">
          <div>
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-3xl font-bold text-text-primary tracking-tight"
            >
              Video Production Dashboard
            </motion.h1>
            <motion.p
              custom={0.08}
              variants={fadeUp}
              className="text-base text-text-secondary mt-2"
            >
              Track, manage, and approve viral video briefs across your team.
            </motion.p>
          </div>

          <motion.div custom={0.15} variants={fadeUp} className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              <Calendar size={16} />
              {dateRange}
              <ChevronDown size={14} />
            </button>
            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-bg-quaternary border border-border-medium rounded-lg shadow-xl py-1 z-50 min-w-[160px]">
                {dateOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setDateRange(opt); setShowDateDropdown(false); }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm transition-colors',
                      dateRange === opt ? 'text-text-primary bg-bg-tertiary' : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ========== SECTION 2: Metric Cards ========== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        <MetricCard
          icon={FileVideo} iconColor="#6366F1" label="Total Videos" metric={String(totalVideos)}
          bottomColor="#6366F1"
        />
        <MetricCard
          icon={Clock} iconColor="#06D6A0" label="In Progress" metric={String(inProgressCount)}
          trend={totalVideos === 0 ? undefined : `${inProgressCount} across Phases 1-3`}
          trendColor="text-text-tertiary" bottomColor="#06D6A0"
        />
        <MetricCard
          icon={AlertCircle} iconColor="#F59E0B" label="Pending Approvals" metric={String(pendingApprovalCount)}
          trend={pendingApprovalCount > 0 ? 'Waiting on role approvals in Phase 4' : undefined}
          trendColor="text-text-tertiary" bottomColor="#F59E0B" pulse={pendingApprovalCount > 0}
        />
        <MetricCard
          icon={ListVideo} iconColor="#0EA5E9" label="Recent Activity" metric=""
          bottomColor="#0EA5E9"
        >
          <div className="mt-3 space-y-2">
            {recentBriefs.length === 0 && (
              <span className="text-sm text-text-tertiary">No videos yet — create one to get started.</span>
            )}
            {recentBriefs.map((brief) => (
              <div key={brief.id} className="flex items-center gap-2 group/mini cursor-pointer" onClick={() => openProject(brief)}>
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: phaseColors[brief.phase] }}
                />
                <span className="text-sm text-text-primary truncate group-hover/mini:text-accent-dashboard transition-colors">
                  {brief.title.length > 28 ? brief.title.slice(0, 28) + '...' : brief.title}
                </span>
                <span className="text-xs text-text-tertiary flex-shrink-0">{timeAgo(brief.updatedAt)}</span>
              </div>
            ))}
          </div>
        </MetricCard>
      </motion.section>

      {/* ========== SECTION 3: Quick Actions ========== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mt-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <QuickActionCard
            icon={Plus} iconColor="#06D6A0"
            title="Create New Video Brief"
            subtitle="Start Phase 1 — Input your research and topic"
            gradient="linear-gradient(135deg, rgba(6, 214, 160, 0.08) 0%, rgba(6, 214, 160, 0.02) 100%)"
            borderColor="rgba(6, 214, 160, 0.2)"
            hoverBorderColor="rgba(6, 214, 160, 0.4)"
            shadowClass="rgba(6, 214, 160, 0.1)"
            onClick={() => { resetData(); navigate('/phase/1'); }}
          />
          <QuickActionCard
            icon={FolderOpen} iconColor="#6366F1"
            title="View All Briefs"
            subtitle="Browse and filter the full brief archive"
            gradient="linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 100%)"
            borderColor="rgba(99, 102, 241, 0.2)"
            hoverBorderColor="rgba(99, 102, 241, 0.4)"
            shadowClass="rgba(99, 102, 241, 0.1)"
            onClick={() => { }}
          />
          <QuickActionCard
            icon={Bot} iconColor="#0EA5E9"
            title="AI Agent Prompt Pack Archive"
            subtitle="Access structured prompts for automation pipelines"
            gradient="linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(14, 165, 233, 0.02) 100%)"
            borderColor="rgba(14, 165, 233, 0.2)"
            hoverBorderColor="rgba(14, 165, 233, 0.4)"
            shadowClass="rgba(14, 165, 233, 0.1)"
            onClick={() => { }}
          />
        </div>
      </motion.section>

      {/* ========== SECTION 4: Recent Briefs Table ========== */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="mt-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-text-primary">Recent Briefs</h2>
        </div>

        <div className="bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden">
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <FileVideo size={32} className="text-text-tertiary mb-3" />
              <p className="text-text-secondary text-sm mb-1">No video briefs yet</p>
              <p className="text-text-tertiary text-xs mb-4">Create your first one to see it here.</p>
              <button
                onClick={() => { resetData(); navigate('/phase/1'); }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-accent-dashboard text-text-inverse hover:opacity-90 transition-opacity"
              >
                Create New Video Brief
              </button>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Video Name</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Current Phase</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Creator</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Last Updated</th>
                  <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((brief, index) => (
                  <motion.tr
                    key={brief.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3, delay: 0.55 + index * 0.03,
                      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                    }}
                    className="border-b border-border-subtle last:border-b-0 hover:bg-bg-tertiary transition-colors cursor-pointer group"
                    onClick={() => openProject(brief)}
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-base font-medium text-text-primary max-w-[280px] truncate block">
                        {brief.title}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${phaseColors[brief.phase]}1E`,
                          color: phaseColors[brief.phase],
                        }}
                      >
                        {phaseLabels[brief.phase - 1]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={brief.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-bg-tertiary border border-border-medium flex items-center justify-center text-[10px] font-medium text-text-secondary">
                          {initialsOf(brief.creator)}
                        </div>
                        <span className="text-sm text-text-secondary">{brief.creator}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-text-tertiary">{timeAgo(brief.updatedAt)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          className="w-8 h-8 rounded-lg hover:bg-bg-quaternary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                          onClick={(e) => { e.stopPropagation(); openProject(brief); }}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg hover:bg-bg-quaternary flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                          onClick={(e) => { e.stopPropagation(); openProject(brief); }}
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="w-8 h-8 rounded-lg hover:bg-bg-quaternary flex items-center justify-center text-text-secondary hover:text-error transition-colors"
                          onClick={(e) => handleDelete(brief.id, e)}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </motion.section>

      {/* ========== SECTION 5: Pipeline Visualization ========== */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="mt-12 pb-20"
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-text-primary">Production Pipeline</h2>
          <p className="text-sm text-text-secondary mt-1">Current distribution of briefs across phases</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
          {pipelineData.map((col, colIndex) => (
            <motion.div
              key={col.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5, delay: 0.9 + colIndex * 0.1,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="bg-bg-secondary border border-border-subtle rounded-xl min-h-[200px] flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: phaseColors[col.phase] }} />
                <span className="text-sm font-medium text-text-primary flex-1">
                  Phase {col.phase}: {phaseNames[col.phase]}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-bg-quaternary text-text-secondary">
                  {col.items.length}
                </span>
              </div>

              <div className="p-3 space-y-2 flex-1">
                {col.items.length === 0 && (
                  <div className="text-center py-6 text-xs text-text-tertiary">No items</div>
                )}
                {col.items.slice(0, 5).map((brief, bIndex) => (
                  <motion.div
                    key={brief.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3, delay: 1.0 + colIndex * 0.1 + bIndex * 0.05,
                      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
                    }}
                    className="bg-bg-tertiary rounded-lg p-3 flex items-center gap-2 cursor-pointer hover:bg-bg-quaternary transition-colors"
                    onClick={() => openProject(brief)}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: phaseColors[col.phase] }} />
                    <span className="flex-1 text-sm text-text-primary truncate">
                      {brief.title.length > 30 ? brief.title.slice(0, 30) + '...' : brief.title}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-bg-quaternary flex items-center justify-center text-[8px] font-medium text-text-secondary flex-shrink-0">
                      {initialsOf(brief.creator)}
                    </div>
                  </motion.div>
                ))}
                {col.items.length > 5 && (
                  <div className="text-center py-2 text-xs text-text-tertiary">
                    +{col.items.length - 5} more
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </Layout>
  );
}

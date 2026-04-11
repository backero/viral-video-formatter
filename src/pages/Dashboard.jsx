import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  FileDown,
  Edit3,
  Plus,
  Loader2,
  FileText,
  Trash2,
  Calendar,
  Check,
  Sparkles,
} from "lucide-react";
import { listSessions, deleteSession } from "../lib/sessionService";
import { generatePDF } from "../utils/generatePDF";

// ── Workflow stage definitions ───────────────────────────────────────────────
const STAGES = [
  {
    key: "content_writer",
    label: "Content Writer",
    check: (d) => !!(d.script?.trim()),
    done: "bg-purple-500/15 text-purple-400 border border-purple-400/30",
    filter: "bg-purple-500 text-white border-purple-500",
  },
  {
    key: "for_approval",
    label: "For Approval",
    check: (d) => d.scriptCompleted === "YES",
    done: "bg-yellow-500/15 text-yellow-500 border border-yellow-400/30",
    filter: "bg-yellow-500 text-white border-yellow-500",
  },
  {
    key: "editor_discussion",
    label: "Editor Discussion",
    check: (d) => !!(d.techDiscussion?.trim()),
    done: "bg-blue-500/15 text-blue-400 border border-blue-400/30",
    filter: "bg-blue-500 text-white border-blue-500",
  },
  {
    key: "pre_shoot",
    label: "Pre-Shoot",
    check: (d) => !!(d.shootDate),
    done: "bg-orange-500/15 text-orange-400 border border-orange-400/30",
    filter: "bg-orange-500 text-white border-orange-500",
  },
  {
    key: "post_shoot",
    label: "Post-Shoot",
    check: (d) => !!(d.videoLink?.trim()),
    done: "bg-cyan-500/15 text-cyan-400 border border-cyan-400/30",
    filter: "bg-cyan-500 text-white border-cyan-500",
  },
  {
    key: "completed",
    label: "Completed",
    check: (d, s) => d.founderApproval === "APPROVED" || !!s?.is_submitted,
    done: "bg-ok/15 text-ok border border-ok/30",
    filter: "bg-ok text-white border-ok",
  },
];

function getStagesDone(session) {
  return STAGES.map((st) => st.check(session.data || {}, session));
}

// ── Stage chips row shown on each form ────────────────────────────────────────
function StageChips({ session }) {
  const flags = getStagesDone(session);
  return (
    <div className="flex flex-wrap gap-1">
      {STAGES.map((st, i) => {
        const done = flags[i];
        return (
          <span
            key={st.key}
            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-all ${
              done
                ? st.done
                : "bg-transparent text-dim/40 border-wire/50"
            }`}
          >
            {done && <Check size={9} strokeWidth={3} />}
            {st.label}
          </span>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await listSessions();
      setSessions(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const toggleFilter = (key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const filteredSessions =
    activeFilters.length === 0
      ? sessions
      : sessions.filter((s) => {
          const flags = getStagesDone(s);
          return activeFilters.every((fk) => {
            const idx = STAGES.findIndex((st) => st.key === fk);
            return idx !== -1 && flags[idx];
          });
        });

  const handleDownloadPDF = (e, session) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setGeneratingId(session.id);
      generatePDF(session.data);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setTimeout(() => setGeneratingId(null), 500);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    setDeletingId(id);
    try {
      const success = await deleteSession(id);
      if (success) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete the form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="bg-surface border-b border-wire sticky top-0 z-10 px-4">
        <div className="max-w-[1000px] mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              <Play />
            </span>
            <span className="text-[1.1rem] font-bold text-body tracking-tight">
              Content Formatter
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/generate"
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 text-[13px] sm:text-[14px] font-semibold rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
            >
              <Sparkles size={15} />
              <span className="hidden sm:inline">Generate Script</span>
            </Link>
            <Link
              to="/f/new"
              target="_blank"
              className="flex items-center gap-2 btn-primary px-3 sm:px-4 py-1.5 text-[13px] sm:text-[14px]"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Form</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 py-10 px-4 flex justify-center">
        <div className="w-full max-w-[1000px] flex flex-col gap-6">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-body mb-1">
                Recent Forms
              </h1>
              <p className="text-dim text-[14px]">
                Create, edit, and download your content reports.
              </p>
            </div>
          </div>

          {/* ── Stage Filter Pills ──────────────────────────── */}
          {!loading && sessions.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-dim uppercase tracking-wider shrink-0">
                  Filter by stage:
                </span>
                {activeFilters.length > 0 && (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="text-[11px] font-semibold text-dim hover:text-bad transition-colors underline underline-offset-2"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((st) => {
                  const active = activeFilters.includes(st.key);
                  const count = sessions.filter((s) =>
                    st.check(s.data || {}, s),
                  ).length;
                  return (
                    <button
                      key={st.key}
                      onClick={() => toggleFilter(st.key)}
                      className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        active
                          ? st.filter + " border"
                          : "bg-surface text-dim border-wire hover:border-accent/40 hover:text-body"
                      }`}
                    >
                      {active && <Check size={11} strokeWidth={3} />}
                      {st.label}
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          active ? "bg-white/20" : "bg-lifted"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {activeFilters.length > 0 && (
                <p className="text-[12px] text-dim">
                  Showing{" "}
                  <span className="font-semibold text-body">
                    {filteredSessions.length}
                  </span>{" "}
                  of {sessions.length} forms matching all selected stages.
                </p>
              )}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 border border-wire bg-surface rounded-2xl border-dashed">
              <Loader2 size={30} className="text-accent animate-spin" />
              <p className="text-dim text-[15px] font-medium">Loading items…</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 border border-wire bg-surface rounded-2xl border-dashed">
              <div className="w-14 h-14 rounded-full bg-lifted flex items-center justify-center text-dim text-2xl">
                <FileText size={24} />
              </div>
              <p className="text-dim text-[15px] max-w-sm text-center">
                You haven't created any forms yet. Click "New Form" to get
                started.
              </p>
              <Link
                to="/f/new"
                className="btn-primary flex items-center gap-2 mt-2"
              >
                <Plus size={16} /> Create your first form
              </Link>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 border border-wire bg-surface rounded-2xl border-dashed">
              <p className="text-dim text-[15px]">
                No forms match the selected filters.
              </p>
              <button
                onClick={() => setActiveFilters([])}
                className="btn-ghost text-[13px]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Mobile View (Cards) */}
              <div className="grid grid-cols-1 gap-5 md:hidden">
                {filteredSessions.map((s) => {
                  const title = s.data?.formTitle || "Unnamed Form";
                  const date = new Date(s.updated_at).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  );
                  const format = s.data?.format || "No format selected";
                  const company = s.data?.company || "No company";

                  return (
                    <div
                      key={s.id}
                      className="group bg-surface border border-wire rounded-2xl p-5 flex flex-col gap-4 hover:border-accent/40 transition-all hover:shadow-lg relative"
                    >
                      <div>
                        <h3
                          className="text-lg font-bold text-body mb-1 truncate pr-8"
                          title={title}
                        >
                          {title}
                        </h3>
                        <div className="flex items-center gap-2 text-[12px] text-dim font-medium">
                          <Calendar size={12} className="opacity-70" /> {date}
                        </div>
                      </div>

                      {/* Stage chips */}
                      <StageChips session={s} />

                      <div className="flex flex-col gap-1.5 text-[13px] text-body">
                        <div className="flex gap-2">
                          <span className="text-dim w-16 shrink-0">Brand:</span>
                          <span className="truncate">{company}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-dim w-16 shrink-0">
                            Format:
                          </span>
                          <span className="truncate text-accent font-medium">
                            {format}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-wire flex items-center justify-between gap-2 mt-auto">
                        <Link
                          to={`/f/${s.data?.slug || s.id}`}
                          className="flex-1 flex items-center justify-center gap-2 bg-lifted text-body font-medium px-3 py-2 text-[13px] rounded-lg hover:bg-wire transition-colors"
                        >
                          <Edit3 size={15} /> Resume Edit
                        </Link>
                        <button
                          onClick={(e) => handleDownloadPDF(e, s)}
                          disabled={generatingId === s.id}
                          title="Download PDF"
                          className="flex items-center justify-center w-10 h-10 bg-lifted text-body rounded-lg hover:bg-wire hover:text-accent transition-colors shrink-0 disabled:opacity-50"
                        >
                          {generatingId === s.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <FileDown size={16} />
                          )}
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, s.id)}
                          disabled={deletingId === s.id}
                          title="Delete Form"
                          className="flex items-center justify-center w-10 h-10 bg-lifted text-body rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors shrink-0 disabled:opacity-50"
                        >
                          {deletingId === s.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop View (Table) */}
              <div className="hidden md:block bg-surface border border-wire rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-lifted border-b border-wire text-dim text-[13px] uppercase tracking-wider">
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">
                          Form Title
                        </th>
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">
                          Brand / Company
                        </th>
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">
                          Workflow Stages
                        </th>
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">
                          Updated
                        </th>
                        <th className="px-5 py-4 font-semibold text-right whitespace-nowrap">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-wire">
                      {filteredSessions.map((s) => {
                        const title = s.data?.formTitle || "Unnamed Form";
                        const date = new Date(s.updated_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        );
                        const company = s.data?.company || "N/A";

                        return (
                          <tr
                            key={s.id}
                            className="hover:bg-lifted/50 transition-colors group cursor-pointer"
                            onClick={() =>
                              navigate(`/f/${s.data?.slug || s.id}`)
                            }
                          >
                            <td className="px-5 py-4">
                              <span
                                className="font-bold text-body max-w-[180px] truncate block"
                                title={title}
                              >
                                {title}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-[14px] text-body">
                              <span
                                className="max-w-[120px] truncate block"
                                title={company}
                              >
                                {company}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <StageChips session={s} />
                            </td>
                            <td className="px-5 py-4 text-[13px] text-dim whitespace-nowrap">
                              {date}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div
                                className="flex items-center justify-end gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Link
                                  to={`/f/${s.data?.slug || s.id}`}
                                  className="flex items-center justify-center gap-1.5 bg-lifted text-body font-medium px-3 py-1.5 text-[13px] rounded-md hover:bg-wire transition-colors"
                                >
                                  <Edit3 size={14} />{" "}
                                  <span className="hidden sm:inline">Edit</span>
                                </Link>
                                <button
                                  onClick={(e) => handleDownloadPDF(e, s)}
                                  disabled={generatingId === s.id}
                                  title="Download PDF"
                                  className="flex items-center justify-center w-8 h-8 bg-lifted text-body rounded-md hover:bg-wire hover:text-accent transition-colors disabled:opacity-50"
                                >
                                  {generatingId === s.id ? (
                                    <Loader2
                                      size={14}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <FileDown size={14} />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => handleDelete(e, s.id)}
                                  disabled={deletingId === s.id}
                                  title="Delete Form"
                                  className="flex items-center justify-center w-8 h-8 bg-lifted text-body rounded-md hover:bg-red-500/20 hover:text-red-500 transition-colors disabled:opacity-50"
                                >
                                  {deletingId === s.id ? (
                                    <Loader2
                                      size={14}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2 size={14} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

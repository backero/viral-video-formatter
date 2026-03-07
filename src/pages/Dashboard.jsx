import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  FileDown,
  Edit3,
  Plus,
  Loader2,
  Calendar,
  Layers,
  FileText,
} from "lucide-react";
import { listSessions } from "../lib/sessionService";
import { generatePDF } from "../utils/generatePDF";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await listSessions();
      setSessions(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleDownloadPDF = (e, session) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setGeneratingId(session.id);
      generatePDF(session.data);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setTimeout(() => setGeneratingId(null), 500); // UI feedback
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
          <div className="flex items-center">
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sessions.map((s) => {
                const title = s.data?.formTitle || "Unnamed Form";
                const date = new Date(s.updated_at).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                );
                const format = s.data?.format || "No format selected";
                const company = s.data?.company || "No company";

                return (
                  <div
                    key={s.id}
                    className="group bg-surface border border-wire rounded-2xl p-5   flex flex-col gap-4 hover:border-accent/40 transition-all hover:shadow-lg relative"
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

                    <div className="flex flex-col gap-1.5 text-[13px] text-body flex-1 mt-2">
                      <div className="flex gap-2">
                        <span className="text-dim w-16 shrink-0">Brand:</span>
                        <span className="truncate">{company}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-dim w-16 shrink-0">Format:</span>
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

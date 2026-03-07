import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TIER_KEY } from "../constants/formData";
import { generatePDF } from "../utils/generatePDF";
import {
  createSession,
  loadSessionBySlug,
  updateSession,
} from "../lib/sessionService";

import Page01_Details from "./Page01_Details";
import Page02_NicheTopic from "./Page02_NicheTopic";
import Page03_Value from "./Page03_Value";
import Page04_Formats from "./Page04_Formats";
import Page05_ScriptStructure from "./Page05_ScriptStructure";
import Page06_Hook from "./Page06_Hook";
import Page07_Script from "./Page07_Script";
import Page08_CTA from "./Page08_CTA";
import Page09_PreCamera from "./Page09_PreCamera";
import Page10_Editor from "./Page10_Editor";
import Page11_FinalOut from "./Page11_FinalOut";

import {
  Play,
  FileDown,
  Link2,
  Check,
  Loader2,
  ChevronLeft,
} from "lucide-react";

const INITIAL_DATA = {
  formTitle: "Unnamed Form",
  slug: "",
  // Page 1
  startDate: "",
  creatorFirst: "",
  creatorDept: "",
  actorFirst: "",
  actorDept: "",
  company: "",
  // Page 2
  niche: "",
  subNiche: "",
  topic: "",
  topicCheckboxes: [],
  // Page 3
  value: "",
  // Page 4
  format: "",
  scriptStructure: "",
  // Page 6
  viralHook: "",
  viralHookOther: "",
  visualHook: "",
  visualHookFiles: [],
  writtenHook: "",
  audioHook: "",
  physiologicalFactors: [],
  // Page 7
  script: "",
  scriptRefVideo: "",
  // Page 8
  cta: "",
  scriptCompleted: "",
  contentCompletedDate: "",
  contentCompletedTime: "",
  // Page 9
  refVideoShoot: "",
  techDiscussion: "",
  discussionDate: "",
  discussionTime: "",
  discussionAmPm: "AM",
  // Page 10
  editorNotes: "",
  preShootApproval: [],
  shootDate: "",
  // Page 11
  videoLink: "",
  finalApprovalMembers: [],
  founderApproval: "",
  rectification: "",
  reCorrectionDone: "",
  reApproval: "",
  finalVideoLink: "",
};

function validateAll(data) {
  const errs = {};

  if (!data.company) errs.company = "Please select a company";
  if (!data.topic?.trim()) errs.topic = "Topic is required";

  if (!data.format) errs.format = "Please select a format";
  const tierKey = data.format ? TIER_KEY(data.format) : null;
  if (tierKey && tierKey !== "F" && !data.scriptStructure) {
    errs.scriptStructure = "Please choose a script structure";
  }

  if (!data.viralHook) errs.viralHook = "Please select a viral hook type";
  if (!data.visualHook?.trim())
    errs.visualHook = "Visual hook action is required";
  if (!data.writtenHook?.trim()) errs.writtenHook = "Written hook is required";
  if (!data.audioHook?.trim()) errs.audioHook = "Audio hook is required";
  if (!data.physiologicalFactors?.length)
    errs.physiologicalFactors = "Select at least one physiological factor";

  return errs;
}

export default function FormEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Session / DB state
  const [sessionId, setSessionId] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Editable Title state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef(null);

  // Debounce timer ref
  const saveTimerRef = useRef(null);
  // Auto-focus title if newly made
  const justCreatedRef = useRef(false);

  // ── Session Init (on mount / slug change) ─────────────────────────
  useEffect(() => {
    async function initSession() {
      setSessionLoading(true);

      if (slug === "new") {
        // Create fresh
        const newId = await createSession(INITIAL_DATA, 1);
        if (newId) {
          // fetch back to get generated slug
          const doc = await loadSessionBySlug(slug); // wait, it might not have "new"!
          // Actually, we should just query by ID to get the newly generated data
          const { supabase } = await import("../lib/supabase");
          const { data: row } = await supabase
            .from("form_sessions")
            .select("data")
            .eq("id", newId)
            .single();

          if (row) {
            justCreatedRef.current = true; // Focus title!
            navigate(`/f/${row.data.slug}`, { replace: true });
          }
        }
        return;
      }

      if (slug) {
        // Attempt to resume from existing session by slug
        const session = await loadSessionBySlug(slug);
        if (session) {
          setData((prev) => ({ ...prev, ...session.data }));
          setSubmitted(session.is_submitted || false);
          setSessionId(session.id);
        } else {
          // Not found => Maybe treat this slug as a new form title?
          // Fall back: create a new form with this specific slug as the title!
          const titleFromName = slug.replace(/-/g, " ");
          const newData = {
            ...INITIAL_DATA,
            formTitle: titleFromName,
            slug: slug,
          };
          const newId = await createSession(newData, 1);
          if (newId) {
            setData(newData);
            setSessionId(newId);
          } else {
            navigate("/", { replace: true });
          }
        }
      } else {
        // No slug at all
        navigate("/", { replace: true });
      }

      setSessionLoading(false);

      // Focus title if new
      if (justCreatedRef.current) {
        setIsEditingTitle(true);
        setTimeout(() => titleInputRef.current?.select(), 50);
        justCreatedRef.current = false;
      }
    }

    initSession();
  }, [slug, navigate]);

  // ── Debounced Auto-Save ─────────────────────────────────────────────────
  const scheduleSave = useCallback(
    (updatedData, isSubmittedState = false) => {
      if (!sessionId) return;
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        setIsSaving(true);
        setSaveError(false);
        try {
          await updateSession(sessionId, updatedData, 1, isSubmittedState);
        } catch {
          setSaveError(true);
        } finally {
          setIsSaving(false);
        }
      }, 800); // 800ms debounce
    },
    [sessionId],
  );

  // ── Field Update ────────────────────────────────────────────────────────
  const updateField = (key, val) => {
    setData((prev) => {
      const updated = { ...prev, [key]: val };
      scheduleSave(updated);
      return updated;
    });
    if (errors[key])
      setErrors((prev) => {
        const e = { ...prev };
        delete e[key];
        return e;
      });
  };

  // ── Title Renaming ──────────────────────────────────────────────────────
  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (!data.formTitle.trim()) {
      updateField("formTitle", "Unnamed Form");
      return;
    }

    const newSlug = data.formTitle
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    if (newSlug !== data.slug) {
      updateField("slug", newSlug);
      navigate(`/f/${newSlug}`, { replace: true });
    } else {
      // Just save the title change
      scheduleSave(data);
    }
  };

  // ── Share Link ──────────────────────────────────────────────────────────
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  // ── PDF ─────────────────────────────────────────────────────────────────
  const handleGeneratePDF = () => {
    try {
      setIsGeneratingPDF(true);
      generatePDF(data);
      setIsGeneratingPDF(false);
    } catch (e) {
      console.error("PDF generation failed:", e);
      setIsGeneratingPDF(false);
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errs = validateAll(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("formID", "260484735728063");
    fd.append(
      "q155_startDate[day]",
      data.startDate ? data.startDate.split("-")[2] : "",
    );
    fd.append(
      "q155_startDate[month]",
      data.startDate ? data.startDate.split("-")[1] : "",
    );
    fd.append(
      "q155_startDate[year]",
      data.startDate ? data.startDate.split("-")[0] : "",
    );
    fd.append("q140_nameOf[first]", data.creatorFirst || "");
    fd.append("q140_nameOf[last]", data.creatorDept || "");
    fd.append("q162_nameOf162[first]", data.actorFirst || "");
    fd.append("q162_nameOf162[last]", data.actorDept || "");
    fd.append("q154_whichCompany", data.company || "");
    fd.append("q145_whatIs145", data.niche || "");
    fd.append("q146_whatIs146", data.subNiche || "");
    fd.append("q6_topicDecide", data.topic || "");
    (data.topicCheckboxes || []).forEach((v) => fd.append("q7_doesThe[]", v));
    fd.append("q44_valueMust44", data.value || "");
    fd.append("q109_whatIs109", data.format || "");
    const tierKey = data.format ? TIER_KEY(data.format) : null;
    if (tierKey === "S") fd.append("q53_chooseThe", data.scriptStructure || "");
    if (tierKey === "A")
      fd.append("q114_chooseThe114", data.scriptStructure || "");
    if (tierKey === "B")
      fd.append("q115_chooseThe115", data.scriptStructure || "");
    const hookVal =
      data.viralHook === "other" ? data.viralHookOther : data.viralHook;
    fd.append("q99_viralHook", hookVal || "");
    fd.append("q12_visualHook", data.visualHook || "");
    fd.append("q28_writtenHook28", data.writtenHook || "");
    fd.append("q29_audioHook29", data.audioHook || "");
    (data.physiologicalFactors || []).forEach((v) =>
      fd.append("q20_whatDoes[]", v),
    );
    fd.append("q101_whatIs", data.script || "");
    fd.append("q138_refrenceVideo", data.scriptRefVideo || "");
    fd.append("q153_whatIs153", data.cta || "");
    fd.append("q159_scriptCompleted", data.scriptCompleted || "");
    if (data.contentCompletedDate) {
      fd.append(
        "q157_contentCompleted[day]",
        data.contentCompletedDate.split("-")[2],
      );
      fd.append(
        "q157_contentCompleted[month]",
        data.contentCompletedDate.split("-")[1],
      );
      fd.append(
        "q157_contentCompleted[year]",
        data.contentCompletedDate.split("-")[0],
      );
      fd.append(
        "q157_contentCompleted[timeInput]",
        data.contentCompletedTime || "",
      );
    }
    fd.append("q120_refVideo120", data.refVideoShoot || "");
    fd.append("q139_discussionTech", data.techDiscussion || "");
    if (data.discussionDate) {
      fd.append(
        "q160_discussionCompleted[day]",
        data.discussionDate.split("-")[2],
      );
      fd.append(
        "q160_discussionCompleted[month]",
        data.discussionDate.split("-")[1],
      );
      fd.append(
        "q160_discussionCompleted[year]",
        data.discussionDate.split("-")[0],
      );
      fd.append(
        "q160_discussionCompleted[timeInput]",
        data.discussionTime || "",
      );
      fd.append("q160_discussionCompleted[ampm]", data.discussionAmPm || "AM");
    }
    fd.append("q124_typeA124", data.editorNotes || "");
    (data.preShootApproval || []).forEach((v) =>
      fd.append("q137_preshootScript[]", v),
    );
    if (data.shootDate) {
      fd.append("q161_dateFor[day]", data.shootDate.split("-")[2]);
      fd.append("q161_dateFor[month]", data.shootDate.split("-")[1]);
      fd.append("q161_dateFor[year]", data.shootDate.split("-")[0]);
    }
    fd.append("q132_videoLink", data.videoLink || "");
    (data.finalApprovalMembers || []).forEach((v) =>
      fd.append("q127_finalApproval[]", v),
    );
    fd.append("q128_finalApproval128", data.founderApproval || "");
    fd.append("q129_whatNeeds", data.rectification || "");
    fd.append("q133_recorrectionCompleted", data.reCorrectionDone || "");
    fd.append("q130_approvalAfter", data.reApproval || "");
    fd.append("q131_linkOf", data.finalVideoLink || "");
    (data.visualHookFiles || []).forEach((file) => {
      fd.append("q103_fileUpload[]", file);
    });

    try {
      await fetch("https://submit.jotform.com/submit/260484735728063", {
        method: "POST",
        body: fd,
        mode: "no-cors",
      });
    } catch (_) {
      // no-cors will throw a network error, but submission goes through
    }

    // Mark session as submitted in DB
    if (sessionId) {
      await updateSession(sessionId, data, 1, true);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Session Loading Screen ───────────────────────────────────────────────
  if (sessionLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-canvas">
        <Loader2 size={36} className="text-accent animate-spin" />
        <p className="text-dim text-[15px] font-medium">Loading session…</p>
      </div>
    );
  }

  /* ── Success Screen ─────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-canvas">
        <div className="w-full max-w-md bg-surface border border-wire rounded-2xl p-10   text-center">
          <div className="w-14 h-14 rounded-full bg-ok/15 border border-ok/30 flex items-center justify-center text-ok text-2xl font-bold mx-auto mb-5">
            ✓
          </div>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-body mb-2">
            Submitted Successfully!
          </h2>
          <p className="text-dim text-[14px] sm:text-[15px] leading-relaxed mb-7">
            Your Viral Video Formatter has been submitted. The team will review
            and proceed with production.
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="btn-primary w-full justify-center"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              <FileDown size={16} />
              {isGeneratingPDF ? "Generating PDF…" : "Download PDF Report"}
            </button>
            <button
              className="btn-ghost w-full justify-center"
              onClick={() => navigate("/f/new")}
            >
              Start New Form
            </button>
            <Link
              to="/"
              className="text-dim hover:text-accent font-medium text-[14px] mt-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="bg-surface border-b border-wire sticky top-0 z-10 px-4">
        <div className="max-w-[1000px] mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Link
              to="/"
              className="text-dim hover:text-body transition-colors shrink-0"
            >
              <ChevronLeft size={22} />
            </Link>

            <div className="w-[1px] h-6 bg-wire mx-1"></div>

            <span className="text-xl text-accent hidden sm:block">
              <Play size={20} />
            </span>

            {/* Title Input inside the Header mimicking Google Docs */}
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                className="bg-lifted border border-accent rounded px-2 py-1 text-[1rem] sm:text-[1.1rem] font-bold text-body tracking-tight outline-none focus:ring-2 focus:ring-accent/30 w-full min-w-0"
                value={data.formTitle || ""}
                onChange={(e) => updateField("formTitle", e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
              />
            ) : (
              <h1
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename form"
                className="text-[1rem] sm:text-[1.1rem] font-bold text-body tracking-tight px-2 py-1 border border-transparent hover:border-wire hover:bg-lifted rounded cursor-pointer transition-colors max-w-full truncate min-w-0"
              >
                {data.formTitle || "Unnamed Form"}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4 shrink-0">
            {/* ── Save status indicator ── */}
            {isSaving && (
              <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-dim">
                <Loader2 size={12} className="animate-spin" />
                Saving…
              </span>
            )}
            {!isSaving && saveError && (
              <span className="text-[12px] text-bad hidden sm:block">
                Save failed
              </span>
            )}
            {!isSaving && !saveError && sessionId && (
              <span className="text-[12px] text-dim opacity-60 hidden sm:block">
                Saved
              </span>
            )}

            {/* ── Share button ── */}
            <button
              id="share-link-btn"
              onClick={handleCopyLink}
              title="Copy shareable link"
              className={`flex items-center gap-1.5 text-[13px] font-semibold rounded-full px-4 py-1.5 border transition-all duration-200 ${
                linkCopied
                  ? "bg-ok/15 border-ok/30 text-ok"
                  : "bg-surface border-wire text-dim hover:text-body hover:border-accent/40"
              }`}
            >
              {linkCopied ? (
                <>
                  <Check size={14} />
                  Copied URL!
                </>
              ) : (
                <>
                  <Link2 size={14} />
                  <span className="hidden sm:inline">Share Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 py-10 px-4 flex justify-center">
        <div className="w-full max-w-[800px] flex flex-col gap-6">
          {/* Validation error banner */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-bad/8 border border-bad/25 rounded-xl px-5 py-4 text-bad text-[14px] font-medium shadow-sm sticky top-20 z-10 backdrop-blur-md">
              ⚠ Please fix the highlighted fields in the form before submitting.
            </div>
          )}

          {/* Form Pages Stacked */}
          <div className="bg-surface border border-wire rounded-2xl p-8  flex flex-col gap-8">
            <section id="page-01">
              <Page01_Details
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-02">
              <Page02_NicheTopic
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-03">
              <Page03_Value
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-04">
              <Page04_Formats
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-05">
              <Page05_ScriptStructure
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-06">
              <Page06_Hook data={data} onChange={updateField} errors={errors} />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-07">
              <Page07_Script
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-08">
              <Page08_CTA data={data} onChange={updateField} errors={errors} />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-09">
              <Page09_PreCamera
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-10">
              <Page10_Editor
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>

            <div className="border-t border-wire"></div>

            <section id="page-11">
              <Page11_FinalOut
                data={data}
                onChange={updateField}
                errors={errors}
              />
            </section>
          </div>

          {/* ── Submit Section ──────────────────────────────── */}
          <div className="bg-surface border border-wire rounded-2xl p-6 sm:p-8   flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="text-[14px] text-dim">
              All done? Review your entries above and submit.
            </div>

            {/* Right actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="btn-ghost flex items-center gap-2 justify-center w-full sm:w-auto px-6 py-2.5"
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
              >
                <FileDown size={16} />
                {isGeneratingPDF ? "Generating…" : "Download PDF"}
              </button>
              <button
                type="button"
                className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto px-8 py-2.5 text-[15px]"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit ✓"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useState } from "react";
import { PAGES, TIER_KEY } from "./constants/formData";
import ProgressBar from "./components/ProgressBar";
import FormNavigation from "./components/FormNavigation";
import ReviewEdit from "./components/ReviewEdit";
import { generatePDF } from "./utils/generatePDF";

import Page01_Details from "./pages/Page01_Details";
import Page02_NicheTopic from "./pages/Page02_NicheTopic";
import Page03_Value from "./pages/Page03_Value";
import Page04_Formats from "./pages/Page04_Formats";
import Page05_ScriptStructure from "./pages/Page05_ScriptStructure";
import Page06_Hook from "./pages/Page06_Hook";
import Page07_Script from "./pages/Page07_Script";
import Page08_CTA from "./pages/Page08_CTA";
import Page09_PreCamera from "./pages/Page09_PreCamera";
import Page10_Editor from "./pages/Page10_Editor";
import Page11_FinalOut from "./pages/Page11_FinalOut";
import { Play, FileDown, ClipboardCheck, ChevronRight } from "lucide-react";

const INITIAL_DATA = {
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

function validate(page, data) {
  const errs = {};

  if (page === 1) {
    if (!data.company) errs.company = "Please select a company";
  }

  if (page === 2) {
    if (!data.topic?.trim()) errs.topic = "Topic is required";
  }

  if (page === 4) {
    if (!data.format) errs.format = "Please select a format";
    const tierKey = data.format ? TIER_KEY(data.format) : null;
    if (tierKey && tierKey !== "F" && !data.scriptStructure) {
      errs.scriptStructure = "Please choose a script structure";
    }
  }

  if (page === 6) {
    if (!data.viralHook) errs.viralHook = "Please select a viral hook type";
    if (!data.visualHook?.trim())
      errs.visualHook = "Visual hook action is required";
    if (!data.writtenHook?.trim())
      errs.writtenHook = "Written hook is required";
    if (!data.audioHook?.trim()) errs.audioHook = "Audio hook is required";
    if (!data.physiologicalFactors?.length)
      errs.physiologicalFactors = "Select at least one physiological factor";
  }

  return errs;
}

const PAGE_COMPONENTS = [
  Page01_Details,
  Page02_NicheTopic,
  Page03_Value,
  Page04_Formats,
  Page05_ScriptStructure,
  Page06_Hook,
  Page07_Script,
  Page08_CTA,
  Page09_PreCamera,
  Page10_Editor,
  Page11_FinalOut,
];

// Review mode is a synthetic "page 12" after page 11
const TOTAL_PAGES = PAGES.length; // 11
const REVIEW_PAGE = PAGES.length + 1; // 12

export default function App() {
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Whether we're on the review page (current === REVIEW_PAGE)
  const isReviewPage = current === REVIEW_PAGE;

  const updateField = (key, val) => {
    setData((prev) => ({ ...prev, [key]: val }));
    if (errors[key])
      setErrors((prev) => {
        const e = { ...prev };
        delete e[key];
        return e;
      });
  };

  const handleNext = () => {
    const errs = validate(current, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    if (current === TOTAL_PAGES) {
      // Go to review page after completing page 11
      setCurrent(REVIEW_PAGE);
    } else {
      setCurrent((p) => Math.min(p + 1, TOTAL_PAGES));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setErrors({});
    if (isReviewPage) {
      setCurrent(TOTAL_PAGES);
    } else {
      setCurrent((p) => Math.max(p - 1, 1));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Called from ReviewEdit to jump to any specific page for editing
  const handleGoToPage = (pageNum) => {
    setErrors({});
    setCurrent(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGeneratePDF = () => {
    try {
      generatePDF(data);
    } catch (e) {
      console.error("PDF generation failed:", e);
    }
  };

  const handleSubmit = async () => {
    const errs = validate(current, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
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

    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PageComponent =
    current <= TOTAL_PAGES ? PAGE_COMPONENTS[current - 1] : null;

  /* ── Success Screen ─────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-canvas">
        <div className="w-full max-w-md bg-surface border border-wire rounded-2xl p-10 shadow-card text-center">
          <div className="w-14 h-14 rounded-full bg-ok/15 border border-ok/30 flex items-center justify-center text-ok text-2xl font-bold mx-auto mb-5">
            ✓
          </div>
          <h2 className="text-[22px] font-bold text-body mb-2">
            Submitted Successfully!
          </h2>
          <p className="text-dim text-[15px] leading-relaxed mb-7">
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
              onClick={() => {
                setSubmitted(false);
                setCurrent(1);
                setData(INITIAL_DATA);
              }}
            >
              Start New Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Effective progress for bar: show 11/11 while on review page ── */
  const progressPage = isReviewPage ? TOTAL_PAGES : current;

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="bg-surface border-b border-wire sticky top-0 z-10 px-4">
        <div className="max-w-[800px] mx-auto h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              <Play />
            </span>
            <span className="text-[1rem] font-bold text-body tracking-tight">
              Viral Video Formatter
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isReviewPage && (
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                <ClipboardCheck size={13} />
                Review Mode
              </span>
            )}
            <span className="text-[13px] text-dim font-medium">
              Creator Workflow
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────── */}
      <main className="flex-1 py-8 px-4 flex justify-center">
        <div className="w-full max-w-[780px] bg-surface border border-wire rounded-2xl p-8 shadow-card self-start">
          {/* Validation error banner */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-bad/8 border border-bad/25 rounded-lg px-4 py-3 text-bad text-[14px] font-medium mb-5">
              ⚠ Please fix the highlighted fields before continuing
            </div>
          )}

          {/* Progress bar (pins to 11/11 on review page) */}
          <ProgressBar current={progressPage} />

          {/* ── REVIEW PAGE ─────────────────────────────── */}
          {isReviewPage ? (
            <ReviewEdit data={data} onGoToPage={handleGoToPage} />
          ) : (
            /* ── NORMAL FORM PAGE ───────────────────────── */
            <PageComponent data={data} onChange={updateField} errors={errors} />
          )}

          {/* ── Navigation ──────────────────────────────── */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-wire">
            {/* Back */}
            <button
              type="button"
              className={`btn-ghost ${current === 1 && !isReviewPage ? "invisible" : ""}`}
              onClick={handleBack}
              disabled={current === 1 && !isReviewPage}
            >
              ← Back
            </button>

            <span className="text-[13px] text-dim">
              {isReviewPage ? "Review" : `${current} / ${TOTAL_PAGES}`}
            </span>

            {/* Right actions */}
            {isReviewPage ? (
              /* Review page: "Download PDF" + "Submit" */
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="btn-ghost flex items-center gap-2"
                  onClick={handleGeneratePDF}
                  disabled={isGeneratingPDF}
                >
                  <FileDown size={16} />
                  {isGeneratingPDF ? "Generating…" : "Download PDF"}
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting…" : "Submit ✓"}
                </button>
              </div>
            ) : current === TOTAL_PAGES ? (
              /* Page 11: "Next → Review" instead of Submit */
              <button
                type="button"
                className="btn-primary flex items-center gap-2"
                onClick={handleNext}
              >
                <span>Review & Submit</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              /* Normal pages: Next → */
              <button
                type="button"
                className="btn-primary"
                onClick={handleNext}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

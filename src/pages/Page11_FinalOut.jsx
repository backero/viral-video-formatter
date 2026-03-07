import {
  FINAL_APPROVAL_MEMBERS,
  FOUNDER_APPROVAL_OPTIONS,
} from "../constants/formData";

export default function Page11_FinalOut({ data, onChange }) {
  const set = (key) => (e) => onChange(key, e.target.value);

  const toggleMember = (val) => {
    const arr = data.finalApprovalMembers || [];
    onChange(
      "finalApprovalMembers",
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    );
  };

  const needsCorrection =
    data.founderApproval && data.founderApproval !== "APPROVED";

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">
          Final Out
        </h2>
        <p className="text-[14px] text-dim">
          Include the final link of the video and get approval
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="fl">Video Link</label>
          <textarea
            className="fi"
            placeholder="Paste the final video URL here…"
            value={data.videoLink || ""}
            onChange={set("videoLink")}
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Final Approval</label>
          <div className="flex flex-col gap-1.5">
            {FINAL_APPROVAL_MEMBERS.map((m) => {
              const checked = (data.finalApprovalMembers || []).includes(m);
              return (
                <label key={m} className={`check-card ${checked ? "on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleMember(m)}
                  />
                  <span>{m}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Final Approval by Founder</label>
          <select
            className="fi-select"
            value={data.founderApproval || ""}
            onChange={set("founderApproval")}
          >
            <option value="">Please Select</option>
            {FOUNDER_APPROVAL_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {needsCorrection && (
          <div className="border-l-2 border-bad pl-4 flex flex-col gap-4">
            <div className="bg-bad/10 border border-bad/30 rounded-lg px-4 py-3 text-bad font-semibold text-[14px]">
              ⚠ Correction required — {data.founderApproval}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">What Needs to be Rectified</label>
              <textarea
                className="fi"
                placeholder="Describe what needs to be fixed…"
                value={data.rectification || ""}
                onChange={set("rectification")}
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">Re-Correction Completed</label>
              <label
                className={`check-card ${data.reCorrectionDone === "YES" ? "on" : ""}`}
              >
                <input
                  type="radio"
                  name="reCorrectionDone"
                  value="YES"
                  checked={data.reCorrectionDone === "YES"}
                  onChange={set("reCorrectionDone")}
                />
                <span>YES</span>
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">
                Approval after Re-Correction by Founder Only
              </label>
              <select
                className="fi-select"
                value={data.reApproval || ""}
                onChange={set("reApproval")}
              >
                <option value="">Please Select</option>
                <option value="APPROVED">APPROVED</option>
                <option value="DISAPPROVED">DISAPPROVED</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">Link of the Video / Final Out</label>
              <textarea
                className="fi"
                placeholder="Paste the corrected video link…"
                value={data.finalVideoLink || ""}
                onChange={set("finalVideoLink")}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Submission summary */}
        <div className="info-box">
          <div className="text-[12px] font-semibold text-dim uppercase tracking-widest mb-4">
            Submission Summary
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {[
              ["Company", data.company || "—"],
              [
                "Creator",
                data.creatorFirst
                  ? `${data.creatorFirst} (${data.creatorDept || ""})`
                  : "—",
              ],
              [
                "Actor",
                data.actorFirst
                  ? `${data.actorFirst} (${data.actorDept || ""})`
                  : "—",
              ],
              ["Format", data.format?.split("=")[0]?.trim() || "—"],
              ["Script Structure", data.scriptStructure || "—"],
              ["Hook Type", data.viralHook?.split("→")[0]?.trim() || "—"],
              ["Script Completed", data.scriptCompleted || "—"],
              ["Start Date", data.startDate || "—"],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="text-[11px] text-dim uppercase tracking-wide mb-0.5">
                  {label}
                </div>
                <div className="text-[14px] text-body font-medium">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

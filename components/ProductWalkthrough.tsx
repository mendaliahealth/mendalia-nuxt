"use client";
import { useState, useEffect, useCallback } from "react";

const STEPS = [
  {
    num: "01", label: "Patient Evaluation",
    title: "Every consultation begins with a single decision.",
    desc: "Open a new case for any patient. Choose between ambient AI scribing or structured manual entry. The reasoning engine activates the moment you begin.",
    chips: ["Any Setting", "Any Specialty", "One Tap Start"],
  },
  {
    num: "02", label: "Ambient Capture",
    title: "Speak naturally. The AI listens to everything.",
    desc: "Record the consultation in any language. The ambient engine captures clinical context in real time, surfacing gaps and follow-up questions as the conversation unfolds.",
    chips: ["50+ Languages", "Live Waveform", "Real-time Gap Detection"],
  },
  {
    num: "03", label: "Clinical Documentation",
    title: "SOAP note. Complete. The moment you stop speaking.",
    desc: "A structured SOAP note appears instantly alongside identified clinical gaps. Review, edit, address gaps, then finalize and proceed to diagnostic analysis.",
    chips: ["Subjective", "Objective", "Assessment", "Plan"],
  },
  {
    num: "04", label: "Evidence Upload",
    title: "Add blood reports, imaging, or any clinical document.",
    desc: "Upload lab results, radiology reports, referral letters, or photograph physical documents with your phone camera. The AI incorporates every piece of evidence.",
    chips: ["PDF", "JPEG", "DOCX", "Camera Capture"],
  },
  {
    num: "05", label: "AI Reasoning",
    title: "Primary impression. Differentials. Ranked by likelihood.",
    desc: "The clinical reasoning engine analyses the full case and generates a primary impression with a differential diagnosis, each backed by clinical evidence extracted from the consultation.",
    chips: ["Evidence-Based", "Likelihood Scores", "Specialty-Aware"],
  },
  {
    num: "06", label: "Accept or Reject",
    title: "You decide. The AI adapts.",
    desc: "Accept or reject each differential diagnosis. The care plan, medication review, and letters all update to reflect your clinical decision. You stay in full control.",
    chips: ["Clinician-Led", "Adaptive Planning", "Full Audit Trail"],
  },
  {
    num: "07", label: "Care Plan",
    title: "Urgency-coded actions. Investigation plan. Medications.",
    desc: "A complete care plan with urgency-tagged clinical actions, a prioritised investigation plan, and a medication safety review covering dosing, contraindications, and monitoring.",
    chips: ["Immediate", "Urgent", "Routine", "Medication Safety"],
  },
  {
    num: "08", label: "Clinical Letters",
    title: "Every letter. Instantly. In any language.",
    desc: "Referral letters, patient correspondence, and clinical summaries are generated immediately. Translate into any language. Adjust the tone. Send directly from the platform.",
    chips: ["Referral Letter", "Patient Letter", "Clinical Summary"],
  },
  {
    num: "09", label: "Case Discussion AI",
    title: "Ask anything. The AI knows the whole case.",
    desc: "An AI agent with full case context. Challenge a diagnosis, request a second opinion, ask for a literature reference, or order the AI to draft a new letter. All in natural language.",
    chips: ["Full Context", "Challenge Diagnoses", "Order Actions"],
  },
];

export default function ProductWalkthrough() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const DURATION = 5000;
  const TICK = 50;

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
  }, []);

  // Re-runs whenever active step changes or paused state changes.
  // Uses a setTimeout (not a state updater) to advance the step, avoiding
  // React Strict Mode's double-invocation of updater functions which caused
  // the component to skip every other step.
  useEffect(() => {
    if (paused) return;

    setProgress(0);
    let elapsed = 0;

    const progressId = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, TICK);

    const advanceId = setTimeout(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, DURATION);

    return () => {
      clearInterval(progressId);
      clearTimeout(advanceId);
    };
  }, [paused, active]);

  const step = STEPS[active];

  return (
    <section id="product" className="bg-[var(--ink)] py-28 px-[5%] relative overflow-hidden" aria-labelledby="walkthrough-title">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(10,107,90,0.12),transparent 65%)", filter: "blur(80px)" }} aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(77,217,172,0.06),transparent 65%)", filter: "blur(80px)" }} aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[#4DD9AC]/80 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DD9AC]" />
            Interactive Product Walkthrough
          </div>
          <h2 id="walkthrough-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-white leading-[1.08]">
            Follow a real consultation.{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg,#4DD9AC,#0A6B5A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Start to finish.
            </span>
          </h2>
          <p className="text-[var(--muted)] text-[0.95rem] mt-3 max-w-[520px] mx-auto leading-relaxed">
            Nine steps. One platform. Every step of the clinical workflow, completely.
          </p>
        </div>

        {/* Step pills */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Walkthrough steps"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {STEPS.map((s, i) => (
            <button
              key={s.num}
              role="tab"
              aria-selected={i === active}
              aria-controls={`step-panel-${i}`}
              onClick={() => { goTo(i); setPaused(true); }}
              className={`text-[0.7rem] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                i === active
                  ? "bg-[#4DD9AC] text-[var(--ink)] border-[#4DD9AC]"
                  : "bg-white/5 text-white/40 border-white/10 hover:text-white/70 hover:border-white/25"
              }`}
            >
              {s.num}. {s.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          id={`step-panel-${active}`}
          role="tabpanel"
        >
          {/* Left: step info */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(77,217,172,0.12)] border border-[rgba(77,217,172,0.2)] flex items-center justify-center text-[0.7rem] font-black text-[#4DD9AC]">
                {step.num}
              </div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#4DD9AC]/70">{step.label}</span>
            </div>

            <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-black text-white leading-[1.12] tracking-tight">
              {step.title}
            </h3>

            <p className="text-[0.9rem] text-white/50 leading-[1.8]">{step.desc}</p>

            <div className="flex flex-wrap gap-2">
              {step.chips.map((c) => (
                <span key={c} className="text-[0.65rem] font-bold text-[#4DD9AC] bg-[rgba(77,217,172,0.1)] border border-[rgba(77,217,172,0.2)] px-3 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[0.65rem] text-white/30 mb-2">
                <span>Step {active + 1} of {STEPS.length}</span>
                <button onClick={() => setPaused((p) => !p)} className="text-white/40 hover:text-white/70 transition-colors">
                  {paused ? "▶ Resume" : "⏸ Pause"}
                </button>
              </div>
              <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div className="progress-fill h-full bg-[#4DD9AC] rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Nav arrows */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => { goTo((active - 1 + STEPS.length) % STEPS.length); setPaused(true); }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                aria-label="Previous step"
              >
                ←
              </button>
              <button
                onClick={() => { goTo((active + 1) % STEPS.length); setPaused(true); }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                aria-label="Next step"
              >
                →
              </button>
            </div>
          </div>

          {/* Right: animated mockup */}
          <div className="relative bg-[#0D1611] border border-white/10 rounded-2xl overflow-hidden min-h-[480px] shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
            {/* Browser chrome */}
            <div className="bg-[#1A211E] border-b border-white/[0.06] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-4 bg-white/5 rounded-md px-3 py-1 text-[0.62rem] text-white/25">
                ai.mendalia.com
              </div>
            </div>

            {/* Frame content */}
            <div className="relative" style={{ minHeight: "440px" }}>
              {active === 0 && <Frame1 />}
              {active === 1 && <Frame2 />}
              {active === 2 && <Frame3 />}
              {active === 3 && <Frame4 />}
              {active === 4 && <Frame5 />}
              {active === 5 && <Frame6 />}
              {active === 6 && <Frame7 />}
              {active === 7 && <Frame8 />}
              {active === 8 && <Frame9 />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Frame components ─── */

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full" style={{ minHeight: "440px" }}>
      {/* Sidebar — hidden on small screens */}
      <div className="hidden sm:flex w-24 bg-[var(--brand)]/90 flex-shrink-0 flex-col pt-3 px-2 gap-1">
        <div className="text-white font-black text-[0.6rem] mb-3 px-1">mendalia</div>
        {["Dashboard","Workspace","Emergency"].map((item, i) => (
          <div key={item} className={`text-[0.55rem] font-semibold px-2 py-1 rounded-lg ${i === 1 ? "bg-white/20 text-white" : "text-white/50"}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-hidden min-w-0">{children}</div>
    </div>
  );
}

function Chip({ label, green }: { label: string; green?: boolean }) {
  return (
    <span className={`text-[0.55rem] font-bold px-2 py-0.5 rounded-full ${green ? "bg-[rgba(10,107,90,0.1)] text-[var(--brand)]" : "bg-[var(--linen)] text-[var(--sage)]"}`}>
      {label}
    </span>
  );
}

function Frame1() {
  return (
    <MockShell>
      <div className="text-[0.62rem] text-white/40 mb-3">ML, Male 49 Y · Comprehensive AI Analysis</div>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center max-w-[320px] mx-auto mt-4">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(10,107,90,0.2)] flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#4DD9AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        </div>
        <div className="text-white font-bold text-sm mb-1">Begin Patient Evaluation</div>
        <div className="text-white/40 text-[0.62rem] mb-5">Select your preferred method for clinical data capture to initialize the reasoning engine.</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--brand)] rounded-xl p-3 cursor-pointer">
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-2">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <div className="text-white font-bold text-[0.6rem]">Medical Scribe</div>
            <div className="text-white/60 text-[0.52rem] mt-0.5">Ambient AI</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer">
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-2">
              <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <div className="text-white/60 font-bold text-[0.6rem]">Manual Entry</div>
            <div className="text-white/30 text-[0.52rem] mt-0.5">Type directly</div>
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function Frame2() {
  const bars = [0.3,0.8,0.5,1,0.6,0.9,0.4,0.7,0.5,0.9,0.3,0.8,0.6,1,0.4,0.7,0.5,0.8,0.3,0.9,0.6,0.4,0.8,0.5];
  const gaps = ["Can you describe the character of your headache?","When did fever begin? Any rigors?","Any neck stiffness or photophobia?"];
  return (
    <MockShell>
      <div className="grid grid-cols-2 gap-3 h-full">
        {/* Recording */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute w-16 h-16 rounded-full bg-red-500/10 recording-ring" />
            <div className="absolute w-16 h-16 rounded-full bg-red-500/10 recording-ring" style={{ animationDelay: "0.5s" }} />
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div className="text-[0.6rem] font-bold text-white mb-1">LIVE SESSION</div>
          <div className="text-white font-bold text-[0.75rem] mb-1">Capturing Clinical Data</div>
          <div className="text-white/40 text-[0.58rem] text-center mb-4">Ambient AI is listening. Speak naturally with the patient.</div>
          {/* Waveform */}
          <div className="flex items-end gap-[2px] h-8">
            {bars.map((h, i) => (
              <div key={i} className="wave-bar" style={{ height: `${h * 28}px`, animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </div>
        {/* Gaps */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-[0.6rem] font-bold text-[#4DD9AC] uppercase tracking-widest mb-3">Required Clinical Information</div>
          <div className="flex flex-col gap-2">
            {gaps.map((g, i) => (
              <div key={i} className="bg-white/5 border border-white/[0.06] rounded-lg p-2.5 dx-appear" style={{ animationDelay: `${i * 0.3}s` }}>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--brand)] text-[0.6rem] font-black mt-0.5">{i+1}</span>
                  <span className="text-white/70 text-[0.58rem] leading-relaxed">{g}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

function Frame3() {
  return (
    <MockShell>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[0.62rem] text-white/40">Scribing Session Data Available</div>
        <div className="flex gap-2">
          <button className="text-[0.58rem] font-bold text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Address Clinical Gaps</button>
          <button className="text-[0.58rem] font-bold text-[var(--brand)] bg-[rgba(10,107,90,0.15)] border border-[rgba(10,107,90,0.3)] px-3 py-1 rounded-full">Finalize and Proceed</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-[0.58rem] font-bold text-[#4DD9AC] mb-2">Consultation Dialogue</div>
          {["Identified gap: Can you describe the headache?","Full Transcript: Patient reports headache for 3 days, fever since yesterday night, and vomiting."].map((t, i) => (
            <div key={i} className="text-white/50 text-[0.55rem] leading-relaxed mb-2 border-l-2 border-[#4DD9AC]/30 pl-2">{t}</div>
          ))}
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-[0.58rem] font-bold text-[#4DD9AC] mb-2">SOAP Note</div>
          {[
            { label: "SUBJECTIVE", text: "Headaches, fever, and vomiting for 3 days. Fever since yesterday night." },
            { label: "ASSESSMENT", text: "A patient presenting with a 3-day history of headache, fever, and vomiting requiring urgent evaluation." },
          ].map((s) => (
            <div key={s.label} className="mb-2">
              <div className="text-[0.52rem] font-black tracking-widest text-white/30 mb-0.5">{s.label}</div>
              <div className="text-white/60 text-[0.56rem] leading-relaxed">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function Frame4() {
  return (
    <MockShell>
      <div className="max-w-[320px] mx-auto mt-6">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div className="text-white font-bold text-sm mb-1">Supplementary Documents</div>
          <div className="text-white/40 text-[0.6rem] leading-relaxed">Upload lab results, imaging reports, or old medical records to provide the AI with full clinical visibility.</div>
        </div>
        <div className="border-2 border-dashed border-white/10 rounded-xl p-5 text-center mb-3 hover:border-[#4DD9AC]/40 transition-colors cursor-pointer">
          <div className="text-white/25 text-[0.62rem]">Click to browse or drag and drop</div>
          <div className="text-white/15 text-[0.55rem] mt-1">PDF, images, DOCX or TXT up to 10MB</div>
        </div>
        {[
          { name: "blood_report_CBC.pdf", pct: 100, icon: "📄" },
          { name: "chest_xray.jpg", pct: 78, icon: "🩻" },
        ].map((f) => (
          <div key={f.name} className="flex items-center gap-3 bg-white/5 border border-white/[0.06] rounded-lg px-3 py-2 mb-2">
            <span className="text-sm">{f.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white/70 text-[0.58rem] truncate">{f.name}</div>
              <div className="w-full h-0.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-[#4DD9AC] rounded-full transition-all duration-1000" style={{ width: `${f.pct}%` }} />
              </div>
            </div>
            <span className="text-[0.55rem] text-[#4DD9AC] font-bold">{f.pct}%</span>
          </div>
        ))}
        <button className="w-full bg-[var(--brand)] text-white text-[0.65rem] font-bold py-2.5 rounded-xl mt-2 hover:bg-[var(--brand-light)] transition-colors">
          Commence Diagnostic Analysis
        </button>
      </div>
    </MockShell>
  );
}

function Frame5() {
  return (
    <MockShell>
      <div className="flex items-center gap-2 mb-3 overflow-x-auto">
        {["Patient Context","AI Reasoning","Care Plan","Letters","Lab Reports","Radiology"].map((t) => (
          <div key={t} className={`text-[0.55rem] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap border ${t === "AI Reasoning" ? "bg-[var(--brand)] text-white border-[var(--brand)]" : "bg-white/5 text-white/40 border-white/10"}`}>{t}</div>
        ))}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
        <div className="text-[0.58rem] font-bold text-white/50 mb-2">Primary Impression</div>
        <div className="text-white font-bold text-[0.85rem] mb-1">Meningitis / Encephalitis</div>
        <p className="text-white/50 text-[0.58rem] leading-relaxed mb-3">Acute presentation of headache, fever, and vomiting — highly suggestive of a central nervous system infection such as meningitis or encephalitis, requiring urgent evaluation.</p>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[0.55rem] text-white/30">Likelihood</span>
          <span className="text-[0.58rem] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Medium</span>
        </div>
        <button className="text-[0.6rem] font-bold text-[#4DD9AC] bg-[rgba(77,217,172,0.08)] border border-[rgba(77,217,172,0.15)] px-3 py-1.5 rounded-lg hover:bg-[rgba(77,217,172,0.15)] transition-colors">
          Generate Related Articles
        </button>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="text-[0.58rem] font-bold text-white/50 mb-2">Differential Diagnosis</div>
        {["Bacterial Meningitis","Viral Encephalitis","Subarachnoid Haemorrhage"].map((dx, i) => (
          <div key={dx} className="flex items-center gap-3 mb-2 dx-appear" style={{ animationDelay: `${i * 0.2}s` }}>
            <span className="text-[0.58rem] text-white/70 flex-1">{dx}</span>
            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#4DD9AC] rounded-full" style={{ width: `${[85,62,35][i]}%` }} /></div>
            <span className="text-[0.55rem] text-white/40">{[85,62,35][i]}%</span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function Frame6() {
  const [accepted, setAccepted] = useState<number | null>(null);
  return (
    <MockShell>
      <div className="text-white/40 text-[0.6rem] mb-3">Differential Diagnosis — Accept or Reject</div>
      <div className="flex flex-col gap-2.5">
        {[
          { name: "Meningitis / Encephalitis", evidence: "Headache + fever + vomiting triad — classic CNS infection presentation.", score: 85 },
          { name: "Viral Encephalitis", evidence: "Fever and altered sensorium. Less likely without neurological deficit.", score: 62 },
          { name: "Subarachnoid Haemorrhage", evidence: "Sudden severe headache not described as thunderclap. Lower probability.", score: 35 },
        ].map((dx, i) => (
          <div key={dx.name} className={`bg-white/5 border rounded-xl p-3.5 transition-all duration-300 ${accepted === i ? "border-[#4DD9AC]/50 bg-[rgba(77,217,172,0.06)]" : "border-white/10"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-white text-[0.68rem] font-bold">{dx.name}</div>
                  <div className="text-[0.52rem] text-[#4DD9AC]/70 bg-[rgba(77,217,172,0.08)] px-1.5 py-0.5 rounded-full">{dx.score}%</div>
                </div>
                <div className="text-white/40 text-[0.56rem] leading-relaxed">{dx.evidence}</div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0 mt-0.5">
                <button onClick={() => setAccepted(i)} className={`text-[0.58rem] font-bold px-2.5 py-1 rounded-lg transition-colors ${accepted === i ? "bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}`}>Accept</button>
                <button onClick={() => { if (accepted === i) setAccepted(null); }} className="text-[0.58rem] font-bold px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Reject</button>
              </div>
            </div>
          </div>
        ))}
        {accepted !== null && (
          <div className="bg-[rgba(77,217,172,0.06)] border border-[rgba(77,217,172,0.2)] rounded-xl p-3 text-[0.6rem] text-[#4DD9AC] dx-appear">
            Diagnosis accepted. Care plan is updating to reflect your decision.
          </div>
        )}
      </div>
    </MockShell>
  );
}

function Frame7() {
  const actions = [
    { text: "Initiate empiric broad-spectrum IV antibiotics and antiviral therapy.", urgency: "IMMEDIATE", color: "red" },
    { text: "Perform urgent CT scan of the head before lumbar puncture.", urgency: "1-2 HRS", color: "amber" },
    { text: "Lumbar puncture for cerebrospinal fluid analysis after imaging.", urgency: "AFTER CT", color: "amber" },
    { text: "Obtain blood cultures before first dose of antibiotics.", urgency: "IMMEDIATE", color: "red" },
  ];
  return (
    <MockShell>
      <div className="flex items-center gap-2 mb-3">
        {["Actions Required","Investigation Plan","Medication Considerations"].map((t) => (
          <div key={t} className={`text-[0.55rem] font-semibold px-2 py-1 rounded-full border whitespace-nowrap ${t === "Actions Required" ? "bg-[var(--brand)] text-white border-[var(--brand)]" : "bg-white/5 text-white/40 border-white/10"}`}>{t}</div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {actions.map((a, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 dx-appear" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="flex items-start justify-between gap-3">
              <div className="text-white/70 text-[0.58rem] leading-relaxed flex-1">{a.text}</div>
              <span className={`text-[0.5rem] font-black px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${a.color === "red" ? "bg-red-500/15 text-red-400" : "bg-amber-500/15 text-amber-400"}`}>{a.urgency}</span>
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function Frame8() {
  return (
    <MockShell>
      <div className="flex items-center gap-2 mb-3">
        {["Referral Letter","Patient Letter","Clinical Summary"].map((t, i) => (
          <div key={t} className={`text-[0.55rem] font-semibold px-2.5 py-1 rounded-full border ${i === 0 ? "bg-[var(--brand)] text-white border-[var(--brand)]" : "bg-white/5 text-white/40 border-white/10"}`}>{t}</div>
        ))}
      </div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[0.58rem] font-bold text-white/50">Referral Letter</div>
          <div className="flex gap-1.5">
            <span className="text-[0.52rem] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">Translate</span>
            <span className="text-[0.52rem] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">Edit tone</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-white/60 text-[0.6rem] font-bold">Dear Neurologist,</div>
          {["I am referring ML, a 49-year-old male, for urgent assessment of suspected meningitis/encephalitis.",
            "The patient presents with a 3-day history of severe headache, fever, and vomiting. Clinical reasoning analysis indicates high probability of central nervous system infection.",
            "Urgent CT imaging and lumbar puncture are recommended. IV antibiotics have been initiated empirically. Please assess at your earliest convenience.",
          ].map((line, i) => (
            <div key={i} className="text-white/40 text-[0.56rem] leading-relaxed typewriter-text">{line}</div>
          ))}
          <div className="pt-2 text-white/40 text-[0.56rem]">Yours sincerely,<br/><span className="text-white/60 font-bold">Dr. Admin User</span></div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="text-[0.58rem] font-bold text-white bg-[var(--brand)] px-3 py-1.5 rounded-lg">Copy letter</button>
          <button className="text-[0.58rem] font-bold text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">Download PDF</button>
        </div>
      </div>
    </MockShell>
  );
}

function Frame9() {
  const messages = [
    { role: "user", text: "What is the rationale for choosing meningitis over viral encephalitis as the primary impression?" },
    { role: "ai", text: "The triad of headache, fever, and vomiting — combined with the acute onset — is classically associated with bacterial meningitis. Viral encephalitis typically presents with more prominent neurological deficit or altered consciousness, which is not documented here. The uploaded CBC also shows elevated WBC consistent with bacterial infection." },
    { role: "user", text: "Order a patient-friendly version of the clinical summary." },
    { role: "ai", text: "Generating patient letter now — written in plain English, avoiding clinical jargon..." },
  ];
  return (
    <MockShell>
      <div className="text-[0.6rem] font-bold text-[#4DD9AC] mb-3">Case Discussion AI — Full Context Active</div>
      <div className="flex flex-col gap-2.5 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} dx-appear`} style={{ animationDelay: `${i * 0.2}s` }}>
            <div className={`max-w-[85%] text-[0.58rem] leading-relaxed px-3 py-2 rounded-2xl ${m.role === "user" ? "bg-[var(--brand)] text-white rounded-br-sm" : "bg-white/5 border border-white/10 text-white/70 rounded-bl-sm"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[0.58rem] text-white/25">
          Ask anything about this case...
        </div>
        <button className="bg-[var(--brand)] text-white w-8 h-8 rounded-xl flex items-center justify-center text-[0.7rem] hover:bg-[var(--brand-light)] transition-colors">→</button>
      </div>
    </MockShell>
  );
}

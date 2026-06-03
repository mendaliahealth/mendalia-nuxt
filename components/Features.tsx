"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Bot, GitBranch, CheckSquare, Zap, Mic } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Side rising fragments ─── */
const SIDE_FRAGS = [
  // Left side — Mendie / clinical updates
  { text: "SOAP updated",              x: 1,  fs: 10,   op: 0.16, blue: true,  dur: 30, del: -6  },
  { text: "BP: 138/92 mmHg",          x: 2,  fs: 11,   op: 0.18, blue: false, dur: 26, del: -18 },
  { text: "Assessment: modified",      x: 0.5,fs: 10,   op: 0.13, blue: true,  dur: 34, del: -9  },
  { text: "COVID-19 positive",         x: 3,  fs: 11.5, op: 0.19, blue: false, dur: 28, del: -24 },
  { text: "Clinical Update Detected",  x: 1,  fs: 9.5,  op: 0.13, blue: true,  dur: 32, del: -3  },
  { text: "Plan: isolation protocol",  x: 2.5,fs: 10,   op: 0.14, blue: false, dur: 29, del: -31 },
  { text: "SpO₂: 97%",                x: 1.5,fs: 12,   op: 0.17, blue: false, dur: 24, del: -14 },
  { text: "Temp: 38.4 °C",            x: 3.5,fs: 10,   op: 0.14, blue: false, dur: 27, del: -40 },
  { text: "Workspace aware",           x: 0.8,fs: 9.5,  op: 0.12, blue: true,  dur: 31, del: -20 },
  { text: "Documents synced ✓",       x: 2,  fs: 10,   op: 0.13, blue: true,  dur: 25, del: -36 },

  // Right side — follow-up / case data  (x as % from left, so ~75–88 keeps them in right margin)
  { text: "Follow-up #2848",          x: 76, fs: 11,   op: 0.17, blue: false, dur: 28, del: -7  },
  { text: "History inherited",         x: 79, fs: 10,   op: 0.13, blue: true,  dur: 32, del: -19 },
  { text: "Feb 3, 2025",              x: 74, fs: 12,   op: 0.19, blue: false, dur: 25, del: -11 },
  { text: "All docs carried over",     x: 81, fs: 9.5,  op: 0.13, blue: false, dur: 30, del: -28 },
  { text: "No re-entry needed",        x: 77, fs: 10,   op: 0.12, blue: true,  dur: 34, del: -4  },
  { text: "Case #2847 closed",         x: 83, fs: 10.5, op: 0.15, blue: false, dur: 27, del: -22 },
  { text: "Diagnosis remembered",      x: 75, fs: 10,   op: 0.13, blue: true,  dur: 29, del: -37 },
  { text: "Recovery: ongoing",         x: 80, fs: 11,   op: 0.16, blue: false, dur: 26, del: -15 },
  { text: "WBC: 11.2 K/μL ↑",        x: 73, fs: 10,   op: 0.14, blue: false, dur: 31, del: -43 },
  { text: "Context synced",            x: 82, fs: 9.5,  op: 0.12, blue: true,  dur: 33, del: -8  },
];

function SideFragments() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
      maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
    }}>
      <style>{`@keyframes feat-rise { from { transform: translateY(110vh) } to { transform: translateY(-15vh) } }`}</style>
      {SIDE_FRAGS.map((f, i) => (
        <span key={i} style={{
          position: "absolute",
          top: 0,
          left: `${f.x}%`,
          fontSize: f.fs,
          fontWeight: f.blue ? 700 : 500,
          color: f.blue ? "#0ea5e9" : "#1E293B",
          opacity: f.op,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-montserrat), sans-serif",
          letterSpacing: f.blue ? "0.02em" : "-0.01em",
          animation: `feat-rise ${f.dur}s linear ${f.del}s infinite`,
        }}>{f.text}</span>
      ))}
    </div>
  );
}

/* ─── Background: Mendie awareness network ─── */
function MendieBg() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1080 480"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Concentric signal rings from top-right — Mendie's awareness radiating */}
      {[70, 150, 250, 380].map((r, i) => (
        <circle key={r} cx={1020} cy={60} r={r} fill="none" stroke="#0ea5e9"
          strokeWidth="0.8" opacity={0.075 - i * 0.014} />
      ))}
      {/* Spoke lines to workspace nodes */}
      {[
        { x: 60,  y: 90  },
        { x: 180, y: 30  },
        { x: 40,  y: 280 },
        { x: 280, y: 160 },
        { x: 500, y: 40  },
      ].map((n, i) => (
        <g key={i}>
          <line x1={1020} y1={60} x2={n.x} y2={n.y}
            stroke="#0ea5e9" strokeWidth="0.6" opacity="0.045"
            strokeDasharray="5 9" />
          <circle cx={n.x} cy={n.y} r="3" fill="#0ea5e9" opacity="0.07" />
        </g>
      ))}
      {/* Mendie core dot */}
      <circle cx={1020} cy={60} r="5" fill="#0ea5e9" opacity="0.12" />
    </svg>
  );
}

/* ─── Background: Case branching tree ─── */
function BranchBg() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 1080 560"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#0ea5e9" fill="none" strokeWidth="1.1">
        {/* Main trunk from top */}
        <path d="M 900 0 C 900 80 880 160 860 260" opacity="0.06" />
        {/* Branch 1 — upper left */}
        <path d="M 880 130 C 820 130 720 110 600 90" opacity="0.055" />
        <path d="M 600 90 C 540 80 460 78 380 65" opacity="0.045" />
        <path d="M 380 65 C 310 55 240 60 160 70" opacity="0.035" />
        {/* Branch 2 — mid */}
        <path d="M 860 260 C 790 250 680 230 560 210" opacity="0.05" />
        <path d="M 560 210 C 480 200 400 195 300 185" opacity="0.04" />
        {/* Sub from branch 1 */}
        <path d="M 600 90 C 610 130 620 170 640 220" opacity="0.04" />
        <path d="M 380 65 C 370 110 365 155 360 200" opacity="0.035" />
        {/* Nodes */}
        {[
          [860, 130], [600, 90], [380, 65], [160, 70],
          [860, 260], [560, 210], [300, 185],
          [640, 220], [360, 200],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#0ea5e9" opacity="0.07" />
        ))}
      </g>
    </svg>
  );
}

/* ─── Flowing wave divider ─── */
function WaveDivider() {
  return (
    <div style={{
      position: "relative", height: 44,
      margin: "100px -40px",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes wf1 { from { transform: translateX(0) } to { transform: translateX(-960px) } }
        @keyframes wf2 { from { transform: translateX(-160px) } to { transform: translateX(-1120px) } }
      `}</style>
      {/* Primary wave */}
      <svg width="2880" height="44" style={{ position: "absolute", animation: "wf1 5s linear infinite" }}>
        <path
          d="M 0 22 C 120 6, 240 38, 360 22 C 480 6, 600 38, 720 22 C 840 6, 960 38, 1080 22 C 1200 6, 1320 38, 1440 22 C 1560 6, 1680 38, 1800 22 C 1920 6, 2040 38, 2160 22 C 2280 6, 2400 38, 2520 22 C 2640 6, 2760 38, 2880 22"
          stroke="rgba(14,165,233,0.18)" strokeWidth="1.5" fill="none"
        />
      </svg>
      {/* Ghost wave — opposite phase, slower */}
      <svg width="2880" height="44" style={{ position: "absolute", animation: "wf2 8s linear infinite" }}>
        <path
          d="M 0 22 C 120 38, 240 6, 360 22 C 480 38, 600 6, 720 22 C 840 38, 960 6, 1080 22 C 1200 38, 1320 6, 1440 22 C 1560 38, 1680 6, 1800 22 C 1920 38, 2040 6, 2160 22 C 2280 38, 2400 6, 2520 22 C 2640 38, 2760 6, 2880 22"
          stroke="rgba(14,165,233,0.09)" strokeWidth="1" fill="none"
        />
      </svg>
    </div>
  );
}

/* ─── Mendie animated mockup ─── */
function MendieDemo({ play }: { play: boolean }) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!play) return;
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 900);
      setTimeout(() => setStep(2), 2200);
      setTimeout(() => setStep(3), 3500);
    };
    run();
    const id = setInterval(run, 6200);
    return () => clearInterval(id);
  }, [play]);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 4px 6px rgba(0,0,0,0.02), 0 20px 60px rgba(14,165,233,0.08), 0 4px 20px rgba(0,0,0,0.06)",
      overflow: "hidden",
      width: "100%",
      maxWidth: 580,
    }}>
      {/* Tab bar */}
      <div style={{
        padding: "0 16px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", gap: 0,
        background: "#FAFAFA",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {["Notes", "Transcript", "SOAP Note ✦", "Case Summary"].map((t, i) => (
          <div key={t} style={{
            padding: "11px 14px",
            fontSize: 11.5,
            fontFamily: "var(--font-montserrat)",
            fontWeight: i === 2 ? 700 : 500,
            color: i === 2 ? "#0ea5e9" : "#9CA3AF",
            borderBottom: i === 2 ? "2px solid #0ea5e9" : "2px solid transparent",
            cursor: "default", whiteSpace: "nowrap",
            flexShrink: 0,
          }}>{t}</div>
        ))}
      </div>

      {/* Body */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : 320 }}>
        {/* SOAP note */}
        <div style={{ flex: 1, padding: "18px", overflowY: isMobile ? "visible" : "hidden", borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.05)", borderBottom: isMobile ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#CBD5E1", fontFamily: "var(--font-montserrat)", marginBottom: 14 }}>AI SCRIBED</p>
          {[
            { label: "SUBJECTIVE", text: "Patient reports fever and shortness of breath for 3 days. History of Type 2 DM and hypertension, controlled." },
            { label: "ASSESSMENT", text: "Community-acquired pneumonia.", highlight: step >= 3 ? " COVID-19 positive." : "" },
            { label: "PLAN",       text: "Amoxicillin 875 mg BID x 7d. Follow-up in 7 days.", highlight: step >= 3 ? " Isolation protocol initiated." : "" },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: "#94A3B8", fontFamily: "var(--font-montserrat)", marginBottom: 5 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: "#374151", fontFamily: "var(--font-montserrat)", lineHeight: 1.65 }}>
                {s.text}
                {s.highlight && (
                  <motion.span key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    style={{ color: "#0ea5e9", fontWeight: 600 }}>{s.highlight}</motion.span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Mendie chat */}
        <div style={{ width: isMobile ? "100%" : 190, height: isMobile ? 272 : undefined, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 12px 10px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={12} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#0A0A0A", fontFamily: "var(--font-montserrat)", lineHeight: 1 }}>Mendie</p>
                <p style={{ fontSize: 9, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", marginTop: 1 }}>AI Assistant</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 0 2px rgba(16,185,129,0.2)" }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: "#10B981", fontFamily: "var(--font-montserrat)" }}>LIVE</span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 0, overflow: "hidden", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
            <AnimatePresence>
              {step >= 1 && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease }}
                  style={{ alignSelf: "flex-end", background: "#0ea5e9", color: "#fff", borderRadius: "10px 10px 2px 10px", padding: "7px 10px", fontSize: 10.5, fontFamily: "var(--font-montserrat)", lineHeight: 1.45, maxWidth: "88%" }}>
                  Patient is COVID-19 positive
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease }}
                  style={{ background: "#F1F5F9", borderRadius: "2px 10px 10px 10px", padding: "8px 10px", fontSize: 10.5, color: "#374151", fontFamily: "var(--font-montserrat)", lineHeight: 1.55 }}>
                  Noted. This changes the clinical picture significantly. Updating your documents now.
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, delay: 0.1, ease }}
                  style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.22)", borderRadius: 9, padding: "9px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <Zap size={10} color="#0ea5e9" strokeWidth={2.5} />
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: "#0369a1", fontFamily: "var(--font-montserrat)" }}>Documents updated</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ flex: 1, background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 6, padding: "5px 0", fontSize: 9.5, fontWeight: 700, fontFamily: "var(--font-montserrat)", cursor: "pointer" }}>Review</button>
                    <button style={{ padding: "5px 10px", background: "transparent", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 6, fontSize: 9.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", cursor: "pointer" }}>Skip</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ flexShrink: 0, borderTop: "1px solid rgba(0,0,0,0.05)", padding: "8px 10px" }}>
            <input readOnly placeholder="Ask about this case…" style={{ flex: 1, border: "none", outline: "none", fontSize: 9.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", background: "transparent", width: "100%" }} />
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "8px 12px", display: "flex", alignItems: "center", gap: isMobile ? 2 : 8, background: "#FAFAFA" }}>
        {[{ icon: <Mic size={10} strokeWidth={2.5} />, label: "Scribe" }, { icon: <Zap size={10} strokeWidth={2.5} />, label: "AI Command" }, { icon: <Bot size={10} strokeWidth={2.5} />, label: "AI Assistant" }].map(({ icon, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", padding: isMobile ? "4px 7px" : "4px 8px", borderRadius: 6, cursor: "default" }}>
            {icon}{!isMobile && <span>{label}</span>}
          </div>
        ))}
        <div style={{ marginLeft: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#0ea5e9", color: "#fff", borderRadius: 7, padding: "5px 10px", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-montserrat)", cursor: "default", whiteSpace: "nowrap" }}>
            <GitBranch size={10} strokeWidth={2.5} />{isMobile ? "Augment" : "Open Augmented Case"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Follow-up visual ─── */
function FollowUpDemo({ play }: { play: boolean }) {
  const [showBranch, setShowBranch] = useState(false);
  useEffect(() => {
    if (!play) return;
    const t = setTimeout(() => setShowBranch(true), 600);
    return () => clearTimeout(t);
  }, [play]);

  return (
    <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 9.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", marginBottom: 3, letterSpacing: "0.04em" }}>JAN 15, 2025  ·  CASE #2847</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0A0A0A", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.025em" }}>SB, 58y  ·  Pneumonia + COVID-19</p>
          </div>
          <span style={{ fontSize: 9.5, color: "#9CA3AF", background: "#F4F4F5", padding: "3px 8px", borderRadius: 10, fontFamily: "var(--font-montserrat)", fontWeight: 500, whiteSpace: "nowrap" }}>Closed</span>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["SOAP", "Transcript", "Docs", "Context", "Augmentation"].map(t => (
            <span key={t} style={{ fontSize: 9.5, color: "#9CA3AF", background: "#F8F9FA", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 5, padding: "2px 7px", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </motion.div>

      <div style={{ display: "flex", alignItems: "center", padding: "4px 0 4px 28px", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div initial={{ height: 0 }} animate={showBranch ? { height: 14 } : {}} transition={{ duration: 0.25 }} style={{ width: 1.5, background: "rgba(14,165,233,0.35)" }} />
          <AnimatePresence>
            {showBranch && (
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                <GitBranch size={13} color="#0ea5e9" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div initial={{ height: 0 }} animate={showBranch ? { height: 14 } : {}} transition={{ duration: 0.25, delay: 0.15 }} style={{ width: 1.5, background: "rgba(14,165,233,0.35)" }} />
        </div>
        <AnimatePresence>
          {showBranch && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
              style={{ fontSize: 10, color: "#94A3B8", fontFamily: "var(--font-montserrat)" }}>Feb 3  ·  follow-up opened</motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showBranch && (
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15, ease }}
            style={{ background: "#fff", border: "1.5px solid rgba(14,165,233,0.25)", borderRadius: 14, padding: "18px 20px", boxShadow: "0 4px 28px rgba(14,165,233,0.1)", marginLeft: 20 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 9.5, color: "#0ea5e9", fontFamily: "var(--font-montserrat)", fontWeight: 700, marginBottom: 3, letterSpacing: "0.02em" }}>FOLLOW-UP OF #2847</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0A0A0A", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.025em" }}>SB, 58y  ·  Recovery check</p>
              </div>
              <span style={{ fontSize: 9.5, color: "#10B981", fontWeight: 700, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", padding: "3px 8px", borderRadius: 10, fontFamily: "var(--font-montserrat)" }}>Active</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Full clinical history inherited", "COVID-19 diagnosis remembered", "All docs and context synced", "No re-entry needed"].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckSquare size={12} color="#0ea5e9" strokeWidth={2} />
                  <span style={{ fontSize: 11, color: "#4B5563", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main ─── */
export default function Features() {
  const secRef = useRef<HTMLDivElement>(null);
  const ref1   = useRef<HTMLDivElement>(null);
  const ref2   = useRef<HTMLDivElement>(null);
  const inSec  = useInView(secRef, { once: true, amount: 0.05 });
  const inView1 = useInView(ref1,  { once: true, amount: 0.2 });
  const inView2 = useInView(ref2,  { once: true, amount: 0.2 });

  return (
    <section id="features" ref={secRef} style={{ background: "#fff", position: "relative", overflow: "hidden" }}>

      {/* Rising side fragments */}
      <SideFragments />

      {/* Blend from FlowCanvas */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #FFFDF9, #fff)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "120px 40px 140px", position: "relative", zIndex: 2 }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inSec ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", textAlign: "center", marginBottom: 88 }}
        >Platform Features</motion.p>

        {/* ── Feature 1: Mendie ── */}
        <div ref={ref1} style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "48px 0", marginBottom: 0 }}>
          <MendieBg />
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(36px, 5vw, 80px)", flexWrap: "wrap" }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ flex: "1 1 280px", minWidth: 260 }}
            >
              <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 16 }}>AI Agent</p>
              <h2 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(26px, 2.8vw, 40px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 16 }}>
                Meet Mendie,<br />always watching,<br />always updating.
              </h2>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 14.5, color: "#6B7280", lineHeight: 1.72, letterSpacing: "-0.01em", maxWidth: 340 }}>
                Mendie lives across your workspace. She knows every detail of the smart case. The moment anything changes, she updates every document automatically.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              animate={inView1 ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease }}
              style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}
            >
              <MendieDemo play={inView1} />
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <WaveDivider />

        {/* ── Feature 2: Follow-up ── */}
        <div ref={ref2} style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "48px 0" }}>
          <BranchBg />
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "clamp(36px, 5vw, 80px)", flexWrap: "wrap-reverse" }}>
            <motion.div
              initial={{ opacity: 0, x: -24, scale: 0.97 }}
              animate={inView2 ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease }}
              style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}
            >
              <FollowUpDemo play={inView2} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease }}
              style={{ flex: "1 1 280px", minWidth: 260 }}
            >
              <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 16 }}>Follow-up Cases</p>
              <h2 style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(26px, 2.8vw, 40px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 16 }}>
                Every follow-up<br />starts with<br />everything.
              </h2>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 14.5, color: "#6B7280", lineHeight: 1.72, letterSpacing: "-0.01em", maxWidth: 340 }}>
                Follow-up cases branch from the original and carry the complete history forward. Every diagnosis, every document, every prior decision. Nothing repeated.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

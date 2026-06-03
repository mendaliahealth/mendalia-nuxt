"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mic, Activity, ClipboardList, Files, Brain, Zap, Search, Calendar } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ─── Language cycling ─────────────────────────────────
   Fixed-height + absolute child = zero layout shift      */
const LANGS = [
  { tag: "EN", text: "Shortness of breath…" },
  { tag: "ES", text: "Dificultad para respirar…" },
  { tag: "FR", text: "Essoufflement depuis 3j…" },
  { tag: "DE", text: "Atemnot seit 3 Tagen…" },
  { tag: "HI", text: "सांस लेने में तकलीफ…" },
  { tag: "AR", text: "ضيق في التنفس…" },
];

function LangCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % LANGS.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ height: 13, position: "relative", overflow: "hidden", marginTop: 5 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 4 }}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.2 }}
        >
          <span style={{
            fontSize: 7.5, fontWeight: 800, color: "#0ea5e9",
            background: "rgba(14,165,233,0.09)", borderRadius: 3,
            padding: "1px 4px", letterSpacing: "0.05em",
            fontFamily: "var(--font-montserrat)", flexShrink: 0,
          }}>{LANGS[i].tag}</span>
          <span style={{
            fontSize: 9, color: "#9CA3AF", fontStyle: "italic",
            fontFamily: "var(--font-montserrat)", whiteSpace: "nowrap",
          }}>{LANGS[i].text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Geometry ──────────────────────────────────────── */
// Center card
const CX = 470, CY = 290;
const CW = 108, CH = 80;          // Mendalia card size

// Conversation input
const CONV = { x: 88, y: 260, r: 38 };

// Outputs (4) — fan from center card. Clinical Context is last.
const OUT_X = 760;
const OUTPUTS = [
  { id: "tx",   Icon: Activity,     label: "Live Transcript",  y:  80, r: 30, d: 0.00 },
  { id: "soap", Icon: ClipboardList,label: "SOAP Note",        y: 178, r: 30, d: 0.10 },
  { id: "docs", Icon: Files,        label: "Clinical Docs",    y: 276, r: 30, d: 0.20 },
  { id: "ctx",  Icon: Brain,        label: "Clinical Context", y: 374, r: 30, d: 0.30 },
] as const;

// Case Augmentation — branches off Clinical Context
const CASE = { x: 920, y: 374, r: 34 };

// Branches off Case Aug
const BR_X = 1050;
const BRANCHES = [
  { id: "dx",   Icon: Search,   label: "Diagnosis Dx", color: "#B91C1C", bg: "#FEF2F2", bdr: "#FECACA", y: 330, r: 26, d: 0.52 },
  { id: "care", Icon: Calendar, label: "Care Plan",    color: "#1E40AF", bg: "#EFF6FF", bdr: "#BFDBFE", y: 420, r: 26, d: 0.60 },
] as const;

const W = 1140, H = 520;

/* ─── Path builders ─────────────────────────────────── */
const cardL = CX - CW / 2, cardR = CX + CW / 2;

// Solid strokes — gradients can silently fail on some browsers
const pathConvToCenter = `M ${CONV.x + CONV.r} ${CONV.y} C ${(CONV.x + CONV.r + cardL) / 2} ${CONV.y} ${(CONV.x + CONV.r + cardL) / 2} ${CY} ${cardL} ${CY}`;

const pathCenterToOut = (oy: number) =>
  `M ${cardR} ${CY} C ${cardR + 110} ${CY} ${cardR + 110} ${oy} ${OUT_X - 30} ${oy}`;

const pathCtxToCase = `M ${OUT_X + 30} 374 C ${(OUT_X + 30 + CASE.x - CASE.r) / 2} 374 ${(OUT_X + 30 + CASE.x - CASE.r) / 2} 374 ${CASE.x - CASE.r} 374`;
const pathCaseToBr  = (by: number) => `M ${CASE.x + CASE.r} ${CASE.y} C ${CASE.x + CASE.r + 50} ${CASE.y} ${CASE.x + CASE.r + 50} ${by} ${BR_X - 26} ${by}`;

const pathCaseToB = (by: number) => {
  const caseR = OUT_X + 36;
  return `M ${caseR} 464 C ${caseR + 55} 464 ${caseR + 55} ${by} ${BR_X - 26} ${by}`;
};

/* ─── Animation presets ─────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

const popIn = (delay: number, inView: boolean) => ({
  initial: { opacity: 0, scale: 0.78 },
  animate: inView ? { opacity: 1, scale: 1 } : {},
  transition: { delay, duration: 0.48, ease },
});

const drawLine = (delay: number, inView: boolean) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: inView ? { pathLength: 1, opacity: 1 } : {},
  transition: {
    pathLength: { delay, duration: 0.7, ease: "easeInOut" as const },
    opacity:    { delay, duration: 0.01 },
  },
});

/* ─── Circle node ───────────────────────────────────── */
type NodeProps = {
  cx: number; cy: number; r: number;
  children: React.ReactNode;
  hero?: boolean;
  tealRing?: boolean;
};
function CircleNode({ cx, cy, r, children, hero, tealRing }: NodeProps) {
  return (
    <div style={{
      position: "absolute",
      left: cx - r, top: cy - r,
      width: r * 2, height: r * 2,
      borderRadius: "50%",
      background: hero ? "#0ea5e9" : "#fff",
      border: `1.5px solid ${tealRing ? "rgba(14,165,233,0.35)" : hero ? "transparent" : "rgba(0,0,0,0.09)"}`,
      boxShadow: hero
        ? "0 4px 20px rgba(14,165,233,0.25), 0 1px 4px rgba(0,0,0,0.08)"
        : tealRing
        ? "0 0 0 4px rgba(14,165,233,0.06), 0 2px 10px rgba(0,0,0,0.07)"
        : "0 1px 4px rgba(0,0,0,0.06), 0 4px 14px rgba(0,0,0,0.04)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {children}
    </div>
  );
}

/* ─── Mobile vertical flow ───────────────────────────── */
// Spine connector: sits in the circle-column so the line is always
// flush below the node circle, not separated by label text.
function SpineConnector({ active }: { active?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ flexShrink: 0, width: 54, display: "flex", justifyContent: "center" }}>
        <svg width="4" height="32" style={{ overflow: "visible" }}>
          <line x1="2" y1="0" x2="2" y2="32" stroke="rgba(14,165,233,0.35)" strokeWidth="1.5" />
          {active && (
            <circle r="2" fill="#0ea5e9" opacity="0.55">
              <animateMotion dur="1.1s" repeatCount="indefinite" path="M 2 0 L 2 32" />
            </circle>
          )}
        </svg>
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
}

function FlowMobile({ inView }: { inView: boolean }) {
  const e = [0.16, 1, 0.3, 1] as const;
  const pop = (d: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { delay: d, duration: 0.45, ease: e },
  });

  // Fork SVG: viewBox 320 wide so 25% = 80 (left branch) and 75% = 240 (right branch)
  // These match the flex:1 branch circles which land at 25%/75% of container.
  const forkH = 40;
  const forkL = `M 27 0 C 27 ${forkH * 0.6} 80 ${forkH * 0.6} 80 ${forkH}`;
  const forkR = `M 27 0 C 27 ${forkH * 0.6} 240 ${forkH * 0.6} 240 ${forkH}`;

  return (
    <div style={{ padding: "0 20px", maxWidth: 360, margin: "0 auto" }}>
      <style>{`
        @keyframes wv0m{to{height:10px}} @keyframes wv1m{to{height:16px}} @keyframes wv2m{to{height:7px}}
        @keyframes recpm{0%,100%{opacity:1}50%{opacity:0.2}}
      `}</style>

      {/* ── Step 1 — Conversation (circle left, label right) ── */}
      <motion.div {...pop(0.1)} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ flexShrink: 0, width: 54, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%",
            border: "1.5px solid rgba(14,165,233,0.35)",
            boxShadow: "0 0 0 5px rgba(14,165,233,0.06)",
            background: "#fff",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
          }}>
            <Mic size={14} color="#0ea5e9" strokeWidth={2} />
            <div style={{ display: "flex", gap: 1.5, alignItems: "center" }}>
              {[3, 6, 9, 5, 8, 3, 6].map((h, k) => (
                <div key={k} style={{ width: 2, borderRadius: 1, background: "#0ea5e9", opacity: 0.45, height: h,
                  animation: `wv${k % 3}m ${0.48 + k * 0.07}s ease-in-out infinite alternate` }} />
              ))}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#111", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em", marginBottom: 4 }}>Doctor–Patient Conversation</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", animation: "recpm 1.8s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "var(--font-montserrat)" }}>Live recording</span>
          </div>
          <LangCycle />
        </div>
      </motion.div>

      <SpineConnector active={inView} />

      {/* ── Step 2 — Mendalia card ── */}
      <motion.div {...pop(0.25)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ flexShrink: 0, width: 54, display: "flex", justifyContent: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(14,165,233,0.14)", border: "1.5px solid rgba(14,165,233,0.4)" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            borderRadius: 14,
            background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #38bdf8 100%)",
            padding: 1.5,
            boxShadow: "0 6px 24px rgba(14,165,233,0.22)",
          }}>
            <div style={{
              background: "#fff", borderRadius: 12.5,
              padding: "12px 20px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                {[10, 16, 10].map((h, k) => (
                  <div key={k} style={{ width: 4, height: h, borderRadius: 2,
                    background: k === 1 ? "#0ea5e9" : "rgba(14,165,233,0.35)",
                    animation: `wv${k}m ${0.7 + k * 0.15}s ease-in-out infinite alternate` }} />
                ))}
              </div>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.04em", color: "#0ea5e9", fontFamily: "var(--font-montserrat)", textTransform: "uppercase" }}>mendalia</p>
            </div>
          </div>
        </div>
      </motion.div>

      <SpineConnector active={inView} />

      {/* ── Step 3 — Outputs grid ── */}
      <motion.div {...pop(0.4)} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ flexShrink: 0, width: 54, display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(14,165,233,0.12)", border: "1.5px solid rgba(14,165,233,0.32)" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {OUTPUTS.map(o => (
              <div key={o.id} style={{
                display: "flex", alignItems: "center", gap: 7,
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 10, padding: "9px 10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}>
                <o.Icon size={12} color="#6B7280" strokeWidth={1.8} />
                <span style={{ fontSize: 10.5, fontWeight: 600, color: "#374151", fontFamily: "var(--font-montserrat)", lineHeight: 1.3 }}>{o.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <SpineConnector active={inView} />

      {/* ── Step 4 — Case Augmentation ── */}
      <motion.div {...pop(0.55)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ flexShrink: 0, width: 54, display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%",
            background: "#0ea5e9",
            boxShadow: "0 4px 20px rgba(14,165,233,0.28)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={16} color="#fff" strokeWidth={2.2} />
          </div>
        </div>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: "#0ea5e9", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>Case Augmentation</p>
      </motion.div>

      {/* ── Fork — SVG bezier paths from spine to each branch circle ── */}
      <motion.div {...pop(0.62)}>
        <svg width="100%" viewBox={`0 0 320 ${forkH}`} style={{ display: "block", overflow: "visible" }}>
          <path d={forkL} fill="none" stroke="rgba(203,213,225,0.85)" strokeWidth="1.4" strokeDasharray="3 4" />
          <path d={forkR} fill="none" stroke="rgba(203,213,225,0.85)" strokeWidth="1.4" strokeDasharray="3 4" />
          {inView && (
            <>
              <circle r="2" fill="#CBD5E1" opacity="0.8">
                <animateMotion dur="1.0s" repeatCount="indefinite" path={forkL} />
              </circle>
              <circle r="2" fill="#CBD5E1" opacity="0.8">
                <animateMotion dur="1.25s" repeatCount="indefinite" path={forkR} />
              </circle>
            </>
          )}
        </svg>
      </motion.div>

      {/* ── Step 5 — Branches (flex:1 each so centers land at 25%/75% matching fork ends) ── */}
      <motion.div {...pop(0.7)} style={{ display: "flex" }}>
        {BRANCHES.map(b => (
          <div key={b.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
            <div style={{
              width: 46, height: 46, borderRadius: "50%",
              background: b.bg, border: `1.5px solid ${b.bdr}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <b.Icon size={14} color={b.color} strokeWidth={2} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: b.color, fontFamily: "var(--font-montserrat)", textAlign: "center", letterSpacing: "-0.01em" }}>{b.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────── */
export default function FlowCanvas() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  return (
    <section id="how-it-works" ref={ref} style={{ background: "#FFFDF9", padding: "96px 0 110px", position: "relative" }}>

      {/* Dot grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.042) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Ghost clinical words — continue rising from hero blend seam */}
      <div aria-hidden style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 200,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
        maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
      }}>
        <style>{`@keyframes clinical-rise-2{from{transform:translateY(110vh)}to{transform:translateY(-15vh)}}`}</style>
        {[
          { text: "BP: 138/92 mmHg", x: 6,  fs: 11, op: 0.11, teal: false, dur: 22, del: -4  },
          { text: "ICD-10: J18.9",   x: 20, fs: 11, op: 0.10, teal: false, dur: 19, del: -11 },
          { text: "Assessment:",     x: 35, fs: 10, op: 0.09, teal: true,  dur: 24, del: -7  },
          { text: "SpO₂: 97 %",     x: 50, fs: 11, op: 0.10, teal: false, dur: 20, del: -15 },
          { text: "Plan:",           x: 66, fs: 10, op: 0.09, teal: true,  dur: 21, del: -3  },
          { text: "NKDA",           x: 80, fs: 12, op: 0.11, teal: false, dur: 18, del: -9  },
          { text: "HPI:",           x: 92, fs: 10, op: 0.09, teal: true,  dur: 23, del: -17 },
        ].map((f, i) => (
          <span key={i} style={{
            position: "absolute",
            top: 0,
            left: `${f.x}%`,
            fontSize: f.fs,
            fontWeight: f.teal ? 700 : 500,
            color: f.teal ? "#0ea5e9" : "#0A0A0A",
            opacity: f.op,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-montserrat), sans-serif",
            letterSpacing: f.teal ? "0.03em" : "-0.01em",
            animation: `clinical-rise-2 ${f.dur}s linear ${f.del}s infinite`,
          }}>{f.text}</span>
        ))}
      </div>

      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: 68, padding: "0 32px", position: "relative" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-montserrat)" }}
        >The flow</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease }}
          style={{ fontSize: "clamp(28px, 3vw, 50px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.03em", lineHeight: 1.1, fontFamily: "var(--font-montserrat)" }}
        >
          One conversation.{" "}
          <span style={{ color: "#0ea5e9" }}>Everything documented.</span>
        </motion.h2>
      </div>

      {/* Canvas — vertical on mobile, horizontal diagram on desktop */}
      {isMobile ? (
        <FlowMobile inView={inView} />
      ) : (
      <div style={{ overflowX: "auto", padding: "0 32px" }}>
        <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>

          {/* ── SVG paths + particles ── */}
          <svg viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            {/* Conv → center */}
            <motion.path d={pathConvToCenter} fill="none"
              stroke="#0ea5e9" strokeWidth="1.3" strokeOpacity="0.35" strokeLinecap="round"
              {...drawLine(0.55, inView)} />

            {/* Center → outputs */}
            {OUTPUTS.map(o => (
              <motion.path key={o.id} d={pathCenterToOut(o.y)} fill="none"
                stroke="#0ea5e9" strokeWidth="1.2" strokeOpacity="0.28" strokeLinecap="round"
                {...drawLine(1.35 + o.d, inView)} />
            ))}

            {/* Clinical Context → Case Aug */}
            <motion.path d={pathCtxToCase} fill="none"
              stroke="#0ea5e9" strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round"
              {...drawLine(1.35 + 0.30 + 0.22, inView)} />

            {/* Case Aug → branches */}
            {BRANCHES.map(b => (
              <motion.path key={b.id} d={pathCaseToBr(b.y)} fill="none"
                stroke="#CBD5E1" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="3 3"
                {...drawLine(1.35 + 0.30 + b.d, inView)} />
            ))}

            {/* Particles — conv → center */}
            {inView && [0, 1.1].map((off, j) => (
              <circle key={j} r="2" fill="#0ea5e9" opacity="0.5">
                <animateMotion dur="2.2s" begin={`${1.6 + off}s`} repeatCount="indefinite" path={pathConvToCenter} />
              </circle>
            ))}

            {/* Particles — center → outputs */}
            {inView && OUTPUTS.map(o =>
              [0, 1.4].map((off, j) => (
                <circle key={`${o.id}-${j}`} r="2" fill="#0ea5e9" opacity="0.38">
                  <animateMotion dur="2.6s" begin={`${2.3 + o.d + off}s`} repeatCount="indefinite" path={pathCenterToOut(o.y)} />
                </circle>
              ))
            )}

            {/* Particles — Clinical Context → Case Aug */}
            {inView && [0, 1.1].map((off, j) => (
              <circle key={`ctx-case-${j}`} r="2" fill="#0ea5e9" opacity="0.55">
                <animateMotion dur="1.6s" begin={`${2.8 + off}s`} repeatCount="indefinite" path={pathCtxToCase} />
              </circle>
            ))}

            {/* Particles — Case Aug → branches */}
            {inView && BRANCHES.map(b =>
              [0, 0.9].map((off, j) => (
                <circle key={`br-${b.id}-${j}`} r="2" fill={b.color} opacity="0.45">
                  <animateMotion dur="1.8s" begin={`${3.2 + off}s`} repeatCount="indefinite" path={pathCaseToBr(b.y)} />
                </circle>
              ))
            )}
          </svg>

          {/* ── Conversation node ── */}
          <motion.div {...popIn(0.1, inView)}>
            <CircleNode cx={CONV.x} cy={CONV.y} r={CONV.r} tealRing>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Mic size={14} color="#0ea5e9" strokeWidth={2} />
                {/* Mini waveform */}
                <div style={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  {[3, 6, 9, 5, 8, 3, 6].map((h, k) => (
                    <div key={k} style={{
                      width: 2, borderRadius: 1, background: "#0ea5e9", opacity: 0.45,
                      height: h, animation: `wv${k % 3} ${0.48 + k * 0.07}s ease-in-out infinite alternate`,
                    }} />
                  ))}
                </div>
              </div>
            </CircleNode>

            {/* Label + language below the circle */}
            <div style={{ position: "absolute", left: CONV.x - 72, top: CONV.y + CONV.r + 10, width: 144, textAlign: "center" }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: "#111", fontFamily: "var(--font-montserrat)", lineHeight: 1.3 }}>
                Doctor–Patient<br />Conversation
              </p>
              {/* Recording indicator */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#EF4444", animation: "recpulse 1.8s ease-in-out infinite" }} />
                <span style={{ fontSize: 8.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)" }}>Live recording</span>
              </div>
              <LangCycle />
            </div>
          </motion.div>

          {/* ── Mendalia center card — gradient border, premium ── */}
          <motion.div {...popIn(1.1, inView)} style={{ position: "absolute", left: CX - CW / 2 - 2, top: CY - CH / 2 - 2, zIndex: 2 }}>
            {/* Gradient border wrapper */}
            <div style={{
              width: CW + 4, height: CH + 4,
              borderRadius: 20,
              background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #38bdf8 100%)",
              padding: 1.5,
              boxShadow: "0 8px 32px rgba(14,165,233,0.22), 0 2px 8px rgba(0,0,0,0.08)",
            }}>
              <div style={{
                width: "100%", height: "100%",
                borderRadius: 18.5, background: "#fff",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 7,
              }}>
                {/* Animated triple dot mark */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  {[10, 16, 10].map((h, k) => (
                    <div key={k} style={{
                      width: 4, height: h, borderRadius: 2,
                      background: k === 1 ? "#0ea5e9" : "rgba(14,165,233,0.35)",
                      animation: `wv${k} ${0.7 + k * 0.15}s ease-in-out infinite alternate`,
                    }} />
                  ))}
                </div>
                <p style={{
                  fontSize: 9.5, fontWeight: 800, letterSpacing: "0.04em",
                  color: "#0ea5e9", fontFamily: "var(--font-montserrat)",
                  textTransform: "uppercase",
                }}>mendalia</p>
              </div>
            </div>
          </motion.div>

          {/* ── Output nodes ── */}
          {OUTPUTS.map(o => (
            <motion.div key={o.id} {...popIn(1.6 + o.d, inView)}>
              <CircleNode cx={OUT_X} cy={o.y} r={o.r}>
                <o.Icon size={13} color="#6B7280" strokeWidth={1.8} />
              </CircleNode>
              <p style={{
                position: "absolute",
                left: OUT_X - 52, top: o.y + o.r + 8,
                width: 104, textAlign: "center",
                fontSize: 10, fontWeight: 600, color: "#374151",
                fontFamily: "var(--font-montserrat)", lineHeight: 1.3,
              }}>{o.label}</p>
            </motion.div>
          ))}

          {/* ── Case Augmentation — branches off Clinical Context ── */}
          <motion.div {...popIn(1.6 + 0.30 + 0.28, inView)}>
            <CircleNode cx={CASE.x} cy={CASE.y} r={CASE.r} hero>
              <Zap size={15} color="#fff" strokeWidth={2.2} />
            </CircleNode>
            <p style={{
              position: "absolute",
              left: CASE.x - 58, top: CASE.y + CASE.r + 8,
              width: 116, textAlign: "center",
              fontSize: 10.5, fontWeight: 700, color: "#0ea5e9",
              fontFamily: "var(--font-montserrat)", lineHeight: 1.3,
            }}>Case Augmentation</p>
          </motion.div>

          {/* ── Branch nodes (Dx + Care Plan) ── */}
          {BRANCHES.map(b => (
            <motion.div key={b.id} {...popIn(1.6 + b.d, inView)}>
              <div style={{
                position: "absolute",
                left: BR_X - b.r, top: b.y - b.r,
                width: b.r * 2, height: b.r * 2, borderRadius: "50%",
                background: b.bg, border: `1.5px solid ${b.bdr}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <b.Icon size={11} color={b.color} strokeWidth={2} />
              </div>
              <p style={{
                position: "absolute",
                left: BR_X - 46, top: b.y + b.r + 6,
                width: 92, textAlign: "center",
                fontSize: 9.5, fontWeight: 600,
                color: b.color, fontFamily: "var(--font-montserrat)",
              }}>{b.label}</p>
            </motion.div>
          ))}

          <style>{`
            @keyframes wv0 { to { height: 10px; } }
            @keyframes wv1 { to { height: 16px; } }
            @keyframes wv2 { to { height: 7px;  } }
            @keyframes recpulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
            @keyframes pring {
              0%   { transform:scale(1);   opacity:0.6; }
              100% { transform:scale(2.6); opacity:0;   }
            }
          `}</style>
        </div>
      </div>
      )}

      {/* ── Claim ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          padding: "44px 32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0em",
          color: "#0ea5e9",
          padding: "3px 10px",
          border: "1px solid rgba(14,165,233,0.30)",
          borderRadius: 20,
          background: "rgba(14,165,233,0.06)",
        }}>{"< 60s"}</span>
        <span style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#9CA3AF",
          letterSpacing: "-0.01em",
        }}>Everything processed after your conversation ends, start to finish.</span>
      </motion.div>
    </section>
  );
}

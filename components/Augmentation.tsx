"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Tab = "dx" | "cp";

/* ─── Data ─── */
const diffs = [
  {
    rank: "01",
    name: "Acute Alcohol-Induced Gastritis / Pancreatitis",
    conf: "HIGH",
    accepted: true,
    evidence: "Abdominal pain, vomiting, regular alcohol use.",
    reasoning: "Alcohol is a direct irritant to the gastric mucosa and a common cause of acute pancreatitis, leading to abdominal pain and vomiting.",
    ruleIn: "Elevated serum amylase and lipase, upper GI endoscopy showing gastritis or ulcers.",
    ruleOut: "Normal serum amylase and lipase, normal upper GI endoscopy.",
  },
  {
    rank: "02",
    name: "Alcohol Withdrawal Syndrome",
    conf: "MODERATE",
    accepted: false,
    evidence: "Regular alcohol use, risk of autonomic hyperactivity on cessation.",
    reasoning: "Abrupt cessation can lead to autonomic hyperactivity, manifesting as palpitations, diaphoresis, and dizziness.",
    ruleIn: "Tremors, diaphoresis, tachycardia, elevated CIWA-Ar score.",
    ruleOut: "No observed tremors, vital signs stable at admission.",
  },
];

const cpActions = [
  {
    n: "01",
    title: "Initiate aggressive IV fluid resuscitation and electrolyte repletion.",
    rationale: "Acute pancreatitis leads to significant dehydration. Hypokalemia may exacerbate dizziness and palpitations, and can lead to organ dysfunction. Early and adequate repletion is critical.",
    urgency: "30-60 min",
    level: "critical",
  },
  {
    n: "02",
    title: "Perform a comprehensive cardiac assessment including ECG and cardiac enzyme evaluation.",
    rationale: "Palpitations in context of acute alcohol-induced illness, potential electrolyte disturbances, and dehydration warrant assessment for arrhythmias. Alcohol can have direct cardiotoxic effects.",
    urgency: "1 hour",
    level: "urgent",
  },
  {
    n: "03",
    title: "Assess for alcohol withdrawal syndrome risk and initiate appropriate prophylaxis if indicated.",
    rationale: "Alcohol withdrawal can range from mild tremors to life-threatening delirium and seizures. Early screening and management is essential to prevent severe complications.",
    urgency: "1-2 hours",
    level: "moderate",
  },
];

const features = [
  {
    label: "Differential Diagnosis",
    desc: "Up to 10 ranked differentials, each with evidence cited from the clinical encounter, full reasoning, and explicit rule-in and rule-out criteria.",
  },
  {
    label: "Urgency-Coded Care Plan",
    desc: "Every action tied to a timeframe. From immediate resuscitation to hourly assessments, each step is rationale-cited and ready to act on.",
  },
  {
    label: "Investigation Plan",
    desc: "Targeted investigations mapped precisely to each differential, reducing unnecessary testing and sharpening the workup.",
  },
];

/* ─── Badges ─── */
function ConfBadge({ level }: { level: string }) {
  const map: Record<string, [string, string]> = {
    HIGH:     ["rgba(14,165,233,0.12)", "#0369a1"],
    MODERATE: ["rgba(234,179,8,0.12)",  "#b45309"],
  };
  const [bg, color] = map[level] ?? map.HIGH;
  return (
    <span style={{
      background: bg, color, fontSize: 9, fontWeight: 800,
      letterSpacing: "0.1em", padding: "3px 7px", borderRadius: 4,
      fontFamily: "var(--font-montserrat)", whiteSpace: "nowrap",
    }}>{level}</span>
  );
}

function UrgencyChip({ level, urgency }: { level: string; urgency: string }) {
  const map: Record<string, [string, string]> = {
    critical: ["rgba(239,68,68,0.09)",  "#dc2626"],
    urgent:   ["rgba(234,179,8,0.09)",  "#b45309"],
    moderate: ["rgba(14,165,233,0.09)", "#0369a1"],
  };
  const [bg, color] = map[level] ?? map.moderate;
  return (
    <span style={{
      background: bg, color, fontSize: 9.5, fontWeight: 700,
      padding: "3px 9px", borderRadius: 20,
      fontFamily: "var(--font-montserrat)", letterSpacing: "0.03em", whiteSpace: "nowrap",
    }}>within {urgency}</span>
  );
}

/* ─── Diagnosis view ─── */
function DiagnosisView({ inV }: { inV: boolean }) {
  const [exp, setExp] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22 }}
    >
      {/* Confidence row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 9.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", letterSpacing: "0.1em", fontWeight: 600 }}>ANALYSIS CONFIDENCE</span>
        <ConfBadge level="HIGH" />
      </div>

      {/* Primary Impression */}
      <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
        <p style={{ fontSize: 9.5, color: "#0ea5e9", fontWeight: 700, letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)", marginBottom: 7 }}>PRIMARY IMPRESSION</p>
        <p style={{ fontSize: 15, fontWeight: 800, color: "#0A0A0A", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.025em", lineHeight: 1.22, marginBottom: 7 }}>
          Acute Alcohol-Related Syndrome
        </p>
        <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.58, fontFamily: "var(--font-montserrat)" }}>
          Acute Alcohol-Related Gastropathy / Pancreatitis with Electrolyte Imbalance and Potential Alcohol Withdrawal in a 34-year-old male with regular alcohol and tobacco use.
        </p>
      </div>

      {/* Differential header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 9.5, color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.1em", fontFamily: "var(--font-montserrat)" }}>DIFFERENTIAL DIAGNOSIS</span>
        <span style={{ fontSize: 9.5, color: "#0ea5e9", fontWeight: 600, fontFamily: "var(--font-montserrat)" }}>6 findings</span>
      </div>

      {/* Differentials */}
      {diffs.map((d, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28 + i * 0.12, duration: 0.38, ease }}
          style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 12, marginBottom: 8, overflow: "hidden",
          }}
        >
          <div
            onClick={() => setExp(exp === i ? null : i)}
            style={{ padding: "11px 14px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
          >
            <span style={{ fontSize: 10, color: "#D1D5DB", fontWeight: 700, fontFamily: "var(--font-montserrat)", minWidth: 18 }}>{d.rank}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#111", fontFamily: "var(--font-montserrat)", flex: 1, letterSpacing: "-0.015em", lineHeight: 1.3 }}>{d.name}</span>
            <ConfBadge level={d.conf} />
            {d.accepted && (
              <span style={{ fontSize: 9, fontWeight: 700, color: "#059669", fontFamily: "var(--font-montserrat)", background: "rgba(16,185,129,0.1)", padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>
                ACCEPTED
              </span>
            )}
          </div>

          <AnimatePresence>
            {exp === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <p style={{ fontSize: 11, color: "#6B7280", marginTop: 10, lineHeight: 1.52, fontFamily: "var(--font-montserrat)" }}>
                    <span style={{ color: "#374151", fontWeight: 600 }}>Evidence: </span>{d.evidence}
                  </p>
                  <p style={{ fontSize: 11, color: "#6B7280", marginTop: 6, lineHeight: 1.52, fontFamily: "var(--font-montserrat)" }}>
                    <span style={{ color: "#374151", fontWeight: 600 }}>Reasoning: </span>{d.reasoning}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                    <div style={{ background: "rgba(14,165,233,0.05)", borderRadius: 8, padding: "8px 10px" }}>
                      <p style={{ fontSize: 9, color: "#0ea5e9", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "var(--font-montserrat)", marginBottom: 4 }}>RULE IN</p>
                      <p style={{ fontSize: 10.5, color: "#374151", lineHeight: 1.42, fontFamily: "var(--font-montserrat)" }}>{d.ruleIn}</p>
                    </div>
                    <div style={{ background: "rgba(239,68,68,0.05)", borderRadius: 8, padding: "8px 10px" }}>
                      <p style={{ fontSize: 9, color: "#dc2626", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "var(--font-montserrat)", marginBottom: 4 }}>RULE OUT</p>
                      <p style={{ fontSize: 10.5, color: "#374151", lineHeight: 1.42, fontFamily: "var(--font-montserrat)" }}>{d.ruleOut}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <div style={{ textAlign: "center", padding: "4px 0 2px" }}>
        <span style={{ fontSize: 10, color: "#D1D5DB", fontFamily: "var(--font-montserrat)", fontWeight: 500 }}>+ 4 more findings</span>
      </div>
    </motion.div>
  );
}

/* ─── Care plan view ─── */
function CarePlanView({ inV }: { inV: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22 }}
    >
      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
        {[["Actions Required", true], ["Investigation Plan", false], ["Medications", false]].map(([label, active], i) => (
          <span key={i} style={{
            fontSize: 10, fontWeight: active ? 700 : 500,
            color: active ? "#0ea5e9" : "#9CA3AF",
            padding: "4px 10px",
            background: active ? "rgba(14,165,233,0.08)" : "transparent",
            borderRadius: 20,
            fontFamily: "var(--font-montserrat)",
            cursor: "pointer",
            border: active ? "none" : "1px solid rgba(0,0,0,0.07)",
          }}>{label as string}</span>
        ))}
      </div>

      {cpActions.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 + i * 0.13, duration: 0.38, ease }}
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, padding: "13px 15px", marginBottom: 9 }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "#D1D5DB", fontWeight: 700, fontFamily: "var(--font-montserrat)", marginTop: 1, minWidth: 18 }}>{a.n}</span>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#111", fontFamily: "var(--font-montserrat)", flex: 1, lineHeight: 1.4, letterSpacing: "-0.015em" }}>{a.title}</p>
            <UrgencyChip level={a.level} urgency={a.urgency} />
          </div>
          <p style={{ fontSize: 10.5, color: "#6B7280", lineHeight: 1.58, fontFamily: "var(--font-montserrat)", marginLeft: 26 }}>
            <span style={{ color: "#374151", fontWeight: 600 }}>Rationale. </span>{a.rationale}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function Augmentation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inSec = useInView(sectionRef, { once: true, amount: 0.12 });
  const [tab, setTab] = useState<Tab>("dx");

  return (
    <section
      ref={sectionRef}
      style={{ background: "#FFFDF9", padding: "110px 0 130px", position: "relative", overflow: "hidden" }}
    >
      {/* Top blend from Features (#fff) */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, #fff, transparent)", pointerEvents: "none", zIndex: 1 }} />
      {/* Bottom blend */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #fff, transparent)", pointerEvents: "none", zIndex: 1 }} />

      {/* Subtle ambient orbs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -80, right: -100, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Responsive grid */}
      <style>{`
        .aug-grid { display: grid; grid-template-columns: 1fr 1.55fr; gap: 72px; align-items: start; }
        @media (max-width: 840px) { .aug-grid { grid-template-columns: 1fr; gap: 48px; } }
        .aug-scrollpanel::-webkit-scrollbar { width: 0px; }
      `}</style>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 16 }}
          >Augmentation</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 18 }}
          >
            Clinical reasoning,<br />
            <span style={{ color: "#0ea5e9" }}>built and cited automatically.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.5, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 15, color: "#9CA3AF", letterSpacing: "-0.01em", maxWidth: 500, margin: "0 auto" }}
          >
            Mendalia surfaces a full intelligence layer. Ranked differentials with evidence trails. A care plan coded by urgency. Every finding reasoned, every action cited.
          </motion.p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="aug-grid">

          {/* Left: features + stat */}
          <div style={{ paddingTop: 6 }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={inSec ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
                style={{ marginBottom: 34, paddingBottom: 34, borderBottom: i < features.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 9 }}>{f.label}</p>
                <p style={{ fontSize: 14.5, color: "#4B5563", lineHeight: 1.68, fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>{f.desc}</p>
              </motion.div>
            ))}

            {/* Stat chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inSec ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.62, duration: 0.45, ease }}
              style={{ padding: "20px 22px", background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.12)", borderRadius: 16 }}
            >
              <p style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 8 }}>PER ENCOUNTER</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: "#0ea5e9", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.04em", lineHeight: 1 }}>10+</span>
                <span style={{ fontSize: 13, color: "#6B7280", fontFamily: "var(--font-montserrat)" }}>clinical signals surfaced</span>
              </div>
              <p style={{ fontSize: 11.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", marginTop: 5 }}>differentials, care steps, and investigations</p>
            </motion.div>
          </div>

          {/* Right: glass mockup panel */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            animate={inSec ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ delay: 0.18, duration: 0.65, ease }}
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 22,
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07), 0 48px 96px rgba(14,165,233,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Patient header bar */}
            <div style={{
              padding: "13px 18px",
              background: "rgba(14,165,233,0.04)",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              {/* Patient info */}
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.08))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: "#0369a1", fontFamily: "var(--font-montserrat)" }}>AM</span>
                </div>
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: "#111", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>Arjun Mehra</p>
                  <p style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "var(--font-montserrat)" }}>Male</p>
                </div>
              </div>

              {/* Tab switcher */}
              <div style={{ display: "flex", gap: 2, background: "rgba(0,0,0,0.06)", borderRadius: 9, padding: 3 }}>
                {([["dx", "Diagnosis"], ["cp", "Care Plan"]] as [Tab, string][]).map(([t, label]) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: "5px 12px",
                      borderRadius: 7, border: "none", cursor: "pointer",
                      fontFamily: "var(--font-montserrat)",
                      background: tab === t ? "#fff" : "transparent",
                      color: tab === t ? "#0ea5e9" : "#9CA3AF",
                      boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.09)" : "none",
                      transition: "all 0.18s",
                    }}
                  >{label}</button>
                ))}
              </div>
            </div>

            {/* Scrollable content area */}
            <div
              className="aug-scrollpanel"
              style={{ padding: "18px 18px 20px", maxHeight: 580, overflowY: "auto" }}
            >
              <AnimatePresence mode="wait">
                {tab === "dx"
                  ? <DiagnosisView key="dx" inV={inSec} />
                  : <CarePlanView key="cp" inV={inSec} />
                }
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

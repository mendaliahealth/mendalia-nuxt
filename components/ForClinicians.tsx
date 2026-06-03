"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Send } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Floating hearts ─── */
const HEARTS = [
  { x:  9, fs: 11, op: 0.10, dur: 44, del:  -8, color: "#f87171" },
  { x: 22, fs:  8, op: 0.07, dur: 52, del: -19, color: "#0ea5e9" },
  { x: 38, fs: 14, op: 0.09, dur: 38, del: -31, color: "#f87171" },
  { x: 54, fs:  9, op: 0.07, dur: 48, del:  -5, color: "#0ea5e9" },
  { x: 67, fs: 12, op: 0.10, dur: 41, del: -24, color: "#f87171" },
  { x: 79, fs:  8, op: 0.07, dur: 55, del: -13, color: "#0ea5e9" },
  { x: 91, fs: 13, op: 0.09, dur: 46, del: -39, color: "#f87171" },
  { x: 30, fs: 10, op: 0.08, dur: 43, del: -17, color: "#f87171" },
  { x: 47, fs:  8, op: 0.06, dur: 58, del: -42, color: "#0ea5e9" },
  { x: 72, fs: 11, op: 0.09, dur: 37, del:  -3, color: "#f87171" },
  { x: 15, fs:  9, op: 0.07, dur: 50, del: -28, color: "#0ea5e9" },
  { x: 85, fs: 10, op: 0.08, dur: 40, del: -11, color: "#f87171" },
];

/* ─── Background: clinical words floating like ghosts ─── */
const FLOATERS = [
  { text: "First, do no harm",        x:  4, fs: 11, op: 0.042, dur: 58, del:   0 },
  { text: "Primum non nocere",        x: 87, fs: 11, op: 0.028, dur: 64, del: -22 },
  { text: "compassion",               x: 13, fs: 14, op: 0.048, dur: 49, del: -11 },
  { text: "differential dx",         x: 25, fs: 11, op: 0.028, dur: 55, del: -33 },
  { text: "evidence-based",          x: 71, fs: 11, op: 0.028, dur: 60, del:  -7 },
  { text: "patient-centred",         x: 36, fs: 12, op: 0.034, dur: 52, del: -18 },
  { text: "care",                     x: 81, fs: 17, op: 0.044, dur: 45, del: -28 },
  { text: "SOAP",                     x: 56, fs: 11, op: 0.024, dur: 56, del:  -5 },
  { text: "diagnosis",                x: 64, fs: 13, op: 0.038, dur: 48, del: -38 },
  { text: "Hippocratic oath",         x:  8, fs: 11, op: 0.028, dur: 59, del: -14 },
  { text: "prognosis",                x: 43, fs: 11, op: 0.026, dur: 53, del: -24 },
  { text: "healing",                  x: 92, fs: 13, op: 0.040, dur: 51, del:  -3 },
  { text: "do no harm",               x: 50, fs: 12, op: 0.028, dur: 55, del: -42 },
  { text: "clinical judgment",        x: 19, fs: 11, op: 0.024, dur: 59, del: -19 },
  { text: "empathy",                  x: 76, fs: 14, op: 0.040, dur: 47, del: -31 },
  { text: "continuity of care",       x: 31, fs: 11, op: 0.022, dur: 61, del: -10 },
  { text: "informed consent",         x: 61, fs: 11, op: 0.024, dur: 54, del: -25 },
  { text: "auscultation",             x:  1, fs: 11, op: 0.022, dur: 63, del: -36 },
  { text: "evidence",                 x: 47, fs: 13, op: 0.032, dur: 50, del: -16 },
  { text: "trust",                    x: 83, fs: 16, op: 0.046, dur: 46, del:  -6 },
  { text: "ICD-10",                   x: 17, fs: 11, op: 0.024, dur: 57, del: -29 },
  { text: "anamnesis",                x: 94, fs: 11, op: 0.022, dur: 65, del: -41 },
  { text: "the art of medicine",      x: 40, fs: 12, op: 0.032, dur: 62, del: -47 },
  { text: "service",                  x:  6, fs: 15, op: 0.038, dur: 44, del: -21 },
  { text: "long nights",              x: 69, fs: 12, op: 0.028, dur: 53, del: -13 },
];

/* ─── Cycling clinician types ─── */
const SPECIALISTS = [
  "cardiologists",
  "pediatricians",
  "surgeons",
  "intensivists",
  "oncologists",
  "neurologists",
  "general practitioners",
  "radiologists",
  "psychiatrists",
  "every clinician",
];

export default function ForClinicians() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const [specIdx, setSpecIdx] = useState(0);
  const [msg,     setMsg]     = useState("");
  const [sent,    setSent]    = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setSpecIdx(i => (i + 1) % SPECIALISTS.length), 2600);
    return () => clearInterval(id);
  }, [inView]);

  const handleSend = () => {
    if (!msg.trim()) return;
    window.open(
      `mailto:mohitxsirohi@gmail.com?subject=Feature Request — From a Clinician&body=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSent(true);
    setTimeout(() => { setSent(false); setMsg(""); }, 3500);
  };

  return (
    <section
      ref={ref}
      style={{
        background: "#FFFDF9",
        position: "relative",
        overflow: "hidden",
        padding: "128px 0 152px",
      }}
    >
      {/* Floating clinical word-stars — dark ink, very low opacity */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 9%, black 91%, transparent 100%)",
      }}>
        <style>{`@keyframes fc-rise { from { transform: translateY(110vh) } to { transform: translateY(-18vh) } }`}</style>
        {FLOATERS.map((f, i) => (
          <span key={i} style={{
            position: "absolute", top: 0, left: `${f.x}%`,
            fontSize: f.fs, color: "#0A0A0A", opacity: f.op,
            whiteSpace: "nowrap", fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 400, letterSpacing: "0.005em",
            animation: `fc-rise ${f.dur}s linear ${f.del}s infinite`,
          }}>{f.text}</span>
        ))}
        {HEARTS.map((h, i) => (
          <span key={`h${i}`} style={{
            position: "absolute", top: 0, left: `${h.x}%`,
            fontSize: h.fs, color: h.color, opacity: h.op,
            animation: `fc-rise ${h.dur}s linear ${h.del}s infinite`,
            userSelect: "none",
          }}>♥</span>
        ))}
      </div>

      {/* Subtle warm teal centre glow */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(14,165,233,0.022) 0%, transparent 100%)",
      }} />

      {/* Content */}
      <div style={{
        maxWidth: 660, margin: "0 auto", padding: "0 32px",
        position: "relative", zIndex: 1,
        textAlign: "center",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>

        {/* Overline with pulsing hearts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 44 }}
        >
          <motion.span
            animate={{ scale: [1, 1.32, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={13} fill="#0ea5e9" color="#0ea5e9" strokeWidth={0} />
          </motion.span>
          <span style={{
            fontSize: 10, letterSpacing: "0.18em", fontWeight: 700,
            color: "rgba(14,165,233,0.7)", fontFamily: "var(--font-montserrat)",
            textTransform: "uppercase",
          }}>From the Mendalia team</span>
          <motion.span
            animate={{ scale: [1, 1.32, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <Heart size={13} fill="#0ea5e9" color="#0ea5e9" strokeWidth={0} />
          </motion.span>
        </motion.div>

        {/* "To the [cycling specialty]" */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.6, ease }}
          style={{ marginBottom: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          <p style={{
            fontSize: "clamp(15px, 1.5vw, 19px)",
            color: "rgba(10,10,10,0.32)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 400, letterSpacing: "-0.01em",
          }}>To the</p>
          <div style={{
            height: "clamp(30px, 3.2vw, 42px)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={specIdx}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{   opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.3, ease }}
                style={{
                  display: "block",
                  fontSize: "clamp(18px, 1.9vw, 28px)",
                  fontWeight: 700, color: "#0ea5e9",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "-0.025em", whiteSpace: "nowrap",
                }}
              >
                {SPECIALISTS[specIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.75, ease }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(52px, 8vw, 108px)",
            fontWeight: 900,
            color: "#0A0A0A",
            letterSpacing: "-0.045em",
            lineHeight: 0.96,
            marginBottom: 44,
          }}
        >
          We thank you.
        </motion.h2>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.65, ease }}
          style={{ maxWidth: 500 }}
        >
          <p style={{
            fontSize: "clamp(14px, 1.15vw, 16px)",
            color: "rgba(10,10,10,0.46)",
            fontFamily: "var(--font-montserrat), sans-serif",
            lineHeight: 1.88, letterSpacing: "-0.005em", marginBottom: 18,
          }}>
            You chose a path of endless service: long hours, impossible decisions, and other
            people&apos;s fears carried quietly on your shoulders. We see you. We built Mendalia for you.
          </p>
          <p style={{
            fontSize: "clamp(14px, 1.15vw, 16px)",
            color: "rgba(10,10,10,0.46)",
            fontFamily: "var(--font-montserrat), sans-serif",
            lineHeight: 1.88, letterSpacing: "-0.005em",
          }}>
            We might miss things. If there is anything that would make your workflow lighter,
            a feature, a flow, anything at all, tell us.{" "}
            <span style={{ color: "rgba(10,10,10,0.80)", fontWeight: 600 }}>
              We will build it.
            </span>
          </p>
        </motion.div>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.52, duration: 0.8, ease }}
          style={{
            width: 40, height: 1,
            background: "rgba(14,165,233,0.22)",
            margin: "44px auto",
          }}
        />

        {/* Input form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.62, duration: 0.6, ease }}
          style={{ width: "100%", maxWidth: 460 }}
        >
          <style>{`
            .fc-textarea::placeholder { color: rgba(10,10,10,0.22); }
            .fc-textarea:focus { outline: none; }
            .fc-box:focus-within { border-color: rgba(14,165,233,0.32) !important; box-shadow: 0 0 0 3px rgba(14,165,233,0.07) !important; }
          `}</style>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                style={{
                  padding: "26px 24px",
                  background: "rgba(14,165,233,0.05)",
                  border: "1px solid rgba(14,165,233,0.18)",
                  borderRadius: 16,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                }}
              >
                <Heart size={15} fill="#0ea5e9" color="#0ea5e9" strokeWidth={0} />
                <span style={{
                  fontSize: 14, color: "rgba(10,10,10,0.62)",
                  fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500,
                }}>
                  Thank you. We&apos;ll read every word.
                </span>
              </motion.div>
            ) : (
              <motion.div key="form">
                <div
                  className="fc-box"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 16, overflow: "hidden",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <textarea
                    className="fc-textarea"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend(); }}
                    placeholder="Tell us what you'd build — a feature, a flow, a workflow you wish existed."
                    rows={3}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      resize: "none", padding: "18px 20px 12px",
                      fontSize: 13.5, color: "rgba(10,10,10,0.82)",
                      fontFamily: "var(--font-montserrat), sans-serif",
                      lineHeight: 1.68, letterSpacing: "-0.005em",
                      boxSizing: "border-box",
                    }}
                  />
                  <div style={{
                    padding: "8px 12px 10px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    borderTop: "1px solid rgba(0,0,0,0.05)",
                    background: "rgba(0,0,0,0.012)",
                  }}>
                    <span style={{
                      fontSize: 10.5, color: "rgba(0,0,0,0.22)",
                      fontFamily: "var(--font-montserrat)", letterSpacing: "0.01em",
                    }}>
                      ⌘ + Enter to send
                    </span>
                    <button
                      onClick={handleSend}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: msg.trim() ? "#0ea5e9" : "rgba(14,165,233,0.09)",
                        color: msg.trim() ? "#fff" : "rgba(14,165,233,0.42)",
                        border: "none", borderRadius: 9,
                        padding: "8px 16px",
                        fontSize: 12, fontWeight: 700,
                        fontFamily: "var(--font-montserrat), sans-serif",
                        cursor: msg.trim() ? "pointer" : "default",
                        transition: "all 0.18s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <Send size={10} strokeWidth={2.5} />
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            marginTop: 48,
            fontSize: 13,
            color: "rgba(0,0,0,0.20)",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          The Mendalia Team
        </motion.p>

      </div>
    </section>
  );
}

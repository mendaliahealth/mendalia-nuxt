"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const SOAP = [
  {
    prefix: "S",
    text: "Patient presents with 3-day h/o chest pain, 7/10, radiating to left arm. Exertional dyspnoea. No prior cardiac history. Metformin 500mg BD.",
  },
  {
    prefix: "O",
    text: "HR 94 · BP 138/88 · SpO₂ 97% · Temp 37.1°C. ECG: ST depression V4–V6. Troponin-I: 0.08 ng/mL ↑. CXR: mild cardiomegaly.",
  },
  {
    prefix: "A",
    text: "NSTEMI (type 1). Hypertension — uncontrolled. Suspected dyslipidaemia. T2DM.",
  },
  {
    prefix: "P",
    text: "Aspirin 325mg stat + Ticagrelor 180mg. UFH per protocol. Serial troponins q6h. Urgent cardiology consult. Echo ordered.",
  },
];

function WaveBar({ delay, height }: { delay: number; height: number }) {
  return (
    <motion.div
      style={{ width: 3, borderRadius: 4, backgroundColor: "#046460", minHeight: 4 }}
      animate={{
        height: [
          `${height * 0.25}px`,
          `${height}px`,
          `${height * 0.45}px`,
          `${height * 0.85}px`,
          `${height * 0.25}px`,
        ],
        opacity: [0.35, 0.85, 0.5, 0.8, 0.35],
      }}
      transition={{
        duration: 1.5 + Math.random() * 0.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [shown, setShown] = useState("");
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      ref.current = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length && ref.current) clearInterval(ref.current);
      }, 15);
    }, delay);
    return () => {
      clearTimeout(t);
      if (ref.current) clearInterval(ref.current);
    };
  }, [text, delay]);

  return (
    <span>
      {shown}
      {shown.length < text.length && shown.length > 0 && (
        <span
          style={{
            display: "inline-block",
            width: 1.5,
            height: 11,
            background: "#046460",
            marginLeft: 1,
            verticalAlign: "middle",
            animation: "pulse 1s ease-in-out infinite",
          }}
        />
      )}
    </span>
  );
}

const bars = Array.from({ length: 38 }, (_, i) => ({
  delay: i * 0.04,
  height: 8 + Math.abs(Math.sin(i * 0.7)) * 16 + (i % 3 === 0 ? 10 : 0),
}));

export default function MockUI() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto" }}>
      {/* Very subtle lift shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: "rgba(4,100,96,0.07)",
          filter: "blur(32px)",
          transform: "translateY(12px) scale(0.96)",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.04)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: "1px solid #F0EDE7",
            background: "#FAFAF8",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBDBD" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFE0A3" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#A9F0C0" }} />
          </div>
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 11,
              color: "#B0A99E",
              fontFamily: "var(--font-inter), monospace",
              letterSpacing: "0.02em",
            }}
          >
            mendalia — case workspace
          </span>
        </div>

        {/* Patient header */}
        <div
          style={{
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #F0EDE7",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #EDF5F4, #D0EAE8)",
                border: "1px solid rgba(4,100,96,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#046460",
                letterSpacing: "0.02em",
              }}
            >
              SM
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111110", lineHeight: 1.3 }}>
                Sarah Mitchell
              </p>
              <p style={{ fontSize: 11, color: "#9B958E", marginTop: 2 }}>
                42F · Cardiology · Case #2847
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.div
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#046460" }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span style={{ fontSize: 11, color: "#046460", fontWeight: 500 }}>
              Live Recording
            </span>
          </div>
        </div>

        {/* Waveform */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #F0EDE7" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(4,100,96,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#046460" }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: "#9B958E",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                AI Medical Scribe
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#C4BDB4", fontFamily: "monospace" }}>
              02:34
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 36 }}>
            {bars.map((b, i) => (
              <WaveBar key={i} delay={b.delay} height={b.height} />
            ))}
          </div>
        </div>

        {/* SOAP notes */}
        <div style={{ padding: "16px 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#9B958E",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              SOAP Note
            </span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <svg width="13" height="13" viewBox="0 0 20 20" fill="#046460">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span style={{ fontSize: 11, color: "#046460", fontWeight: 500 }}>Generated</span>
            </motion.div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SOAP.map(({ prefix, text }, i) => (
              <motion.div
                key={prefix}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                style={{ display: "flex", gap: 10 }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#046460",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                    marginTop: 1,
                    width: 14,
                  }}
                >
                  {prefix}:
                </span>
                <p style={{ fontSize: 11, color: "#4A4540", lineHeight: 1.6 }}>
                  <TypewriterLine text={text} delay={500 + i * 400} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #F0EDE7",
            background: "#FAFAF8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "#9B958E",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-inter)",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#046460")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B958E")}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Inject to EMR
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              style={{
                fontSize: 11,
                color: "#9B958E",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "5px 10px",
                borderRadius: 6,
                fontFamily: "var(--font-inter)",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F0EDE7";
                e.currentTarget.style.color = "#4A4540";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#9B958E";
              }}
            >
              Lab Trends
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 600,
                color: "#046460",
                background: "rgba(4,100,96,0.07)",
                border: "1px solid rgba(4,100,96,0.15)",
                padding: "5px 12px",
                borderRadius: 7,
                cursor: "pointer",
                fontFamily: "var(--font-inter)",
                letterSpacing: "-0.01em",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(4,100,96,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(4,100,96,0.07)")}
            >
              Full Analysis
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: -14,
          right: -14,
          display: "none",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderRadius: 12,
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
        className="ui-badge"
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "rgba(4,100,96,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" fill="none" stroke="#046460" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#111110", lineHeight: 1.3 }}>
            Analysis ready
          </p>
          <p style={{ fontSize: 10, color: "#9B958E", marginTop: 1 }}>Generated in 52s</p>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const POINTS = [
  "No hidden fees. No per-seat surprises.",
  "Scales with your clinic or hospital size.",
  "One conversation. We'll find what works.",
];

export default function Pricing() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ background: "#fff", padding: "120px 0 140px", position: "relative" }}
    >
      {/* Top blend from FAQ */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 80,
        background: "linear-gradient(to bottom, #fff, transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: 11, letterSpacing: "0.14em",
            color: "#0ea5e9", fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "var(--font-montserrat)",
            marginBottom: 16,
          }}
        >
          Pricing
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.55, ease }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(30px, 4vw, 52px)",
            fontWeight: 800, color: "#0A0A0A",
            letterSpacing: "-0.038em", lineHeight: 1.08,
            marginBottom: 20,
          }}
        >
          Simple.{" "}
          <span style={{ color: "#0ea5e9" }}>Honest.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.5, ease }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 16, color: "#6B7280",
            letterSpacing: "-0.01em", lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          We'll sit with you and find what works for you.
        </motion.p>

        {/* Points */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.24, duration: 0.5, ease }}
          style={{
            listStyle: "none",
            display: "flex", flexDirection: "column", gap: 10,
            marginBottom: 48,
            textAlign: "left",
            maxWidth: 360,
            margin: "0 auto 48px",
          }}
        >
          {POINTS.map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                <circle cx="8" cy="8" r="7.25" stroke="#0ea5e9" strokeWidth="1.5" />
                <path d="M5 8l2.2 2.2L11 6" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 14, fontWeight: 500,
                color: "#374151", letterSpacing: "-0.01em",
              }}>
                {p}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.34, duration: 0.5, ease }}
        >
          <a
            href="#"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#111111", color: "#ffffff",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 15, fontWeight: 700,
              letterSpacing: "-0.02em",
              padding: "14px 32px", borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)",
              transition: "background 0.15s, box-shadow 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "#2A2A2A";
              el.style.transform = "translateY(-1px)";
              el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.22), 0 12px 32px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "#111111";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)";
            }}
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7.5 4l3 3-3 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

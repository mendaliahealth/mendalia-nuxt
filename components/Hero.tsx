"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import FloatingClinical from "@/components/FloatingClinical";
import { HEADER_H } from "@/components/Nav";

const WORDS = ["patients", "smiles", "recoveries", "diagnoses"];
const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  };
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(
        () => setWordIdx((i) => (i + 1) % WORDS.length),
        2400
      );
      return () => clearInterval(id);
    }, 3400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: HEADER_H,
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {/* Full-bleed clinical language cloud */}
      <FloatingClinical />

      {/* Soft radial glow — keeps center text crisp while terms show at edges */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 75% at 50% 50%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.82) 45%, rgba(255,255,255,0.30) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 680,
          padding: "0 32px",
        }}
      >
        {/* Headline line 1 */}
        <motion.h1
          {...fadeUp(0.40)}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px, 4vw, 62px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            marginBottom: 4,
          }}
        >
          You focus on your
        </motion.h1>

        {/* Rotating word */}
        <motion.div
          {...fadeUp(0.50)}
          style={{
            minHeight: "clamp(40px, 4.6vw, 74px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(10px)", opacity: 0 }}
              transition={{ duration: 0.36, ease }}
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(34px, 4vw, 62px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#0ea5e9",
              }}
            >
              {WORDS[wordIdx]},
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Headline line 3 */}
        <motion.h1
          {...fadeUp(0.58)}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 300,
            fontSize: "clamp(34px, 4vw, 62px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            marginBottom: 24,
          }}
        >
          let us do the rest.
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...fadeUp(0.66)}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.1vw, 17px)",
            lineHeight: 1.72,
            color: "#717171",
            maxWidth: 420,
            marginBottom: 36,
            letterSpacing: "-0.005em",
          }}
        >
          From words to documentation to case augmentation, all in your workflow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.76)}
          style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
        >
          {/* Premium Book a Demo CTA */}
          <style>{`
            @keyframes shimmer {
              0%   { background-position: -200% center; }
              100% { background-position:  200% center; }
            }
            .cta-demo {
              background: linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%);
              background-size: 200% auto;
              box-shadow: 0 2px 8px rgba(14,165,233,0.28), 0 8px 28px rgba(3,105,161,0.20);
              transition: box-shadow 0.2s, transform 0.2s;
            }
            .cta-demo::after {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 12px;
              background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%);
              background-size: 200% auto;
              animation: shimmer 2.8s linear infinite;
              pointer-events: none;
            }
            .cta-demo:hover {
              box-shadow: 0 4px 16px rgba(14,165,233,0.40), 0 12px 40px rgba(3,105,161,0.28);
              transform: translateY(-2px);
            }
          `}</style>
          <Link
            href="https://calendly.com/mohitxsirohi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-demo"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#FFFFFF",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              fontSize: 14,
              padding: "14px 28px",
              borderRadius: 12,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              overflow: "hidden",
            }}
          >
            Book a Demo
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            href="#demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color: "#3A3A3A",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: 14,
              padding: "13px 20px",
              borderRadius: 11,
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(0,0,0,0.02)",
              letterSpacing: "-0.01em",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
              e.currentTarget.style.background = "rgba(0,0,0,0.035)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              e.currentTarget.style.background = "rgba(0,0,0,0.02)";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="#046460">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Watch a demo
          </a>
        </motion.div>

      </div>
    </section>
  );
}

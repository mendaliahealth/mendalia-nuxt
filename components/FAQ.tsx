"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "Is it compulsory to augment a case after using the AI Scribe?",
    a: "No. The AI Scribe is our primary driver and works as a complete, standalone documentation tool. Once the consultation ends, it immediately generates your full transcripts, SOAP notes, and one-click clinical letters. Moving to an Augmented Case is entirely optional and is only meant for times when you want to simulate deep clinical reasoning or analyze multi-modal files like MRIs and blood reports.",
  },
  {
    q: "How do I handle interruptions or pauses during a live patient consultation?",
    a: "You have full control over the live recording. If you are interrupted or need to step away mid-consultation, simply press the Pause button. Once you are ready to continue, press Resume. The system will pick up right where you left off, keeping the entire conversation within a single, continuous file without splitting your notes.",
  },
  {
    q: "What should I do if a patient provides new clinical updates after the recording is finished?",
    a: "You do not need to re-record or restart the case. You can use the persistent AI Agent embedded directly inside your workspace. If a patient takes an on-the-spot rapid test right after the interview and tests positive for COVID-19, simply type that update into the AI Agent. The system will instantly recalculate and regenerate your SOAP notes and clinical letters to match the new reality.",
  },
  {
    q: "How does the system handle returning patients who come back for a follow-up?",
    a: "Instead of creating a brand-new, disconnected patient file, you simply open the patient's existing record and click Create Follow-Up Case. This creates a chronological branch directly out of their original history, linking past visits, old lab reports, and medication history together so you maintain perfect clinical continuity over time.",
  },
  {
    q: "Which languages does the AI Scribe support for recording?",
    a: "The system supports multilingual scribing. Doctors can speak in English, Hindi, or any major regional languages during the consultation, and the AI will accurately capture the conversation and translate it directly into standard, professional medical notes.",
  },
  {
    q: "Can I use my phone or camera to upload physical reports?",
    a: "Yes. When using Mendalia AI on a mobile device or tablet, doctors can use the recording function for scribes. For camera usage, tap the upload area and choose the camera option to take a direct, high-quality photo of any physical lab report, X-ray, or paper document to upload it instantly.",
  },
  {
    q: "How is patient data protected and secured?",
    a: "We take data privacy seriously. Mendalia AI is built on enterprise-grade infrastructure aligned with HIPAA, GDPR, APP (Australian Privacy Principles), and DPDP Act 2023 (India) design principles, keeping our systems fully aligned with SOC 2, ISO 27001, and CE compliance standards. All data is protected using AES-256 Encryption at rest and TLS 1.3 in transit.",
  },
];

function FAQItem({ item, index, isOpen, onToggle, inSec }: {
  item: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inSec: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inSec ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 + index * 0.06, duration: 0.5, ease }}
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 20,
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{
          fontSize: 16,
          fontWeight: 700,
          color: isOpen ? "#0ea5e9" : "#111827",
          fontFamily: "var(--font-montserrat)",
          letterSpacing: "-0.02em",
          lineHeight: 1.4,
          transition: "color 0.2s ease",
          flex: 1,
        }}>
          {item.q}
        </span>

        {/* Chevron */}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isOpen ? "#0ea5e9" : "rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background 0.2s ease",
          marginTop: 2,
        }}>
          <motion.svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#fff" : "#9ca3af"}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: 15,
              color: "#6B7280",
              lineHeight: 1.78,
              fontFamily: "var(--font-montserrat)",
              letterSpacing: "-0.005em",
              paddingBottom: 22,
              paddingRight: 48,
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inSec = useInView(sectionRef, { once: true, amount: 0.08 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef}
      style={{ background: "#fff", padding: "110px 0 130px", position: "relative" }}
    >
      {/* Top blend from TwoModes (#FFFDF9) */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #FFFDF9, transparent)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 16 }}
          >
            FAQ
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(28px, 3.5vw, 52px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 18 }}
          >
            You have questions.<br />
            <span style={{ color: "#0ea5e9" }}>We have answers.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.5, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 15, color: "#9CA3AF", letterSpacing: "-0.01em", maxWidth: 400, margin: "0 auto" }}
          >
            Everything you need to know about Mendalia.
          </motion.p>
        </div>

        {/* Accordion */}
        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              inSec={inSec}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inSec ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5, ease }}
          style={{ textAlign: "center", marginTop: 60 }}
        >
          <p style={{ fontSize: 14, color: "#9CA3AF", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>
            Still have questions?{" "}
            <a
              href="mailto:connect@mendalia.com"
              style={{ color: "#0ea5e9", fontWeight: 700, textDecoration: "none", borderBottom: "1.5px solid rgba(14,165,233,0.3)", paddingBottom: 1, transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#0ea5e9")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)")}
            >
              Get in touch
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}

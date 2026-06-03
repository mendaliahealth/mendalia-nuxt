"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Types ─── */
type TextCard = {
  type: "text";
  initials: string;
  name: string;
  role: string;
  location: string;
  quote: string;
};

type VideoCard = {
  type: "video";
  name: string;
  role: string;
  location: string;
  src: string;
  aspect: "portrait" | "landscape";
  overlayQuote: string;
  extendedReview: string;
};

type Card = TextCard | VideoCard;

/* ─── Data ─── */
const COL1: Card[] = [
  {
    type: "text", initials: "SG",
    name: "Dr Suraj Kumar Gupta", role: "Sr Consultant Physician", location: "Norvic International Hospital",
    quote: "The multilingual scribing is a game-changer. I see patients who speak multiple languages and Mendalia handles the transitions seamlessly. The SOAP note is ready before the patient leaves the room. Our documentation quality has improved significantly since adoption.",
  },
  {
    type: "text", initials: "NP",
    name: "Dr Naresh Parajuli", role: "Internal Medicine", location: "TUTH",
    quote: "As an educator, I am impressed by the clinical accuracy and evidence-based reasoning that Mendalia produces. The differential diagnosis is grounded in sound clinical logic. It is the kind of tool that helps train the next generation of physicians to think systematically.",
  },
  {
    type: "text", initials: "AR",
    name: "Dr Aditya Rajan", role: "Cardiologist", location: "Apollo Hospitals, Hyderabad",
    quote: "Mendalia understands cardiology context in a way no other tool has. The reasoning engine catches relevant comorbidities from the transcript and generates a care plan I would actually sign off on. The case discussion feature is invaluable for complex patients.",
  },
];

const COL2: Card[] = [
  {
    type: "video", src: "/bikrant.mp4", aspect: "landscape",
    name: "Dr Bikrant Dhakal", role: "Sr Dermatologist", location: "Nepal",
    overlayQuote: "For dermatology, the clinical reasoning engine catches things I sometimes need to deliberate on. The care plan generation is exceptional.",
    extendedReview: "In 25 years of practice I have never had a tool that kept up with my clinical thinking. Mendalia doesn't just scribe. It reasons. The differential diagnosis engine is remarkably accurate, and the care plan gives me a structured second opinion on every case. This is what AI in medicine should look like.",
  },
  {
    type: "text", initials: "AB",
    name: "Dr Arjun Burlakoti", role: "Senior Anatomy Lecturer", location: "University of Adelaide",
    quote: "It is the kind of tool that helps train the next generation of physicians to think systematically. The clinical accuracy is impressive and the reasoning is grounded in evidence-based medicine.",
  },
];

const COL3: Card[] = [
  {
    type: "video", src: "/kundan.mp4", aspect: "portrait",
    name: "Dr Kundan Nivangune", role: "Sr Consultant Physician", location: "India",
    overlayQuote: "Mendalia has fundamentally changed how I document and reason through complex cases.",
    extendedReview: "It is not just a scribe. It is a clinical thinking partner. The way it surfaces differential diagnoses and care plans from a conversation is unlike anything I have used in practice. The depth of reasoning it provides has genuinely improved the quality of my consultations.",
  },
  {
    type: "text", initials: "PD",
    name: "Dr Pritam Deo", role: "Senior Anatomy Lecturer", location: "Australia",
    quote: "I was sceptical about AI scribing tools after trying several that missed clinical nuance entirely. Mendalia is different. The reasoning engine understands clinical context, catches relevant comorbidities from the transcript, and generates a care plan I would actually sign off on.",
  },
  {
    type: "text", initials: "VS",
    name: "Dr Vikram Sharma", role: "General Physician", location: "Max Super Speciality Hospital, Delhi",
    quote: "The speed at which Mendalia generates accurate SOAP notes is remarkable. My time spent on documentation has dropped by more than half, and the quality has only gone up. I recommend it to every clinician I know.",
  },
];

/* ─── Text card ─── */
function TCard({ card }: { card: TextCard }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 18,
      padding: "22px 22px 20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      marginBottom: 14,
      flexShrink: 0,
    }}>
      <p style={{
        fontSize: 13.5, color: "#4B5563", lineHeight: 1.72,
        fontFamily: "var(--font-montserrat)", letterSpacing: "-0.005em",
        marginBottom: 18,
      }}>
        &ldquo;{card.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(14,165,233,0.06))",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(14,165,233,0.14)",
        }}>
          <span style={{ fontSize: 9.5, fontWeight: 800, color: "#0369a1", fontFamily: "var(--font-montserrat)" }}>
            {card.initials}
          </span>
        </div>
        <div>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#111", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>
            {card.name}
          </p>
          <p style={{ fontSize: 10.5, color: "#9CA3AF", fontFamily: "var(--font-montserrat)" }}>
            {card.role} · {card.location}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Video card ─── */
function VCard({ card }: { card: VideoCard }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const isPortrait = card.aspect === "portrait";

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div style={{ marginBottom: 14, flexShrink: 0 }}>
      {/* Video */}
      <div style={{
        position: "relative",
        borderRadius: "18px 18px 0 0",
        overflow: "hidden",
        background: "#0A0A0A",
        aspectRatio: isPortrait ? "9/16" : "16/9",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
      }}>
        <video
          ref={videoRef}
          src={card.src}
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Bottom gradient */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 40%, transparent 65%)",
        }} />

        {/* Name overlay */}
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 52 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em", marginBottom: 2 }}>
            {card.name}
          </p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-montserrat)" }}>
            {card.role} · {card.location}
          </p>
        </div>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          style={{
            position: "absolute", bottom: 16, right: 14,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background 0.18s, transform 0.18s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "scale(1.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "scale(1)"; }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted
            ? <VolumeX size={13} color="#fff" strokeWidth={2} />
            : <Volume2 size={13} color="#fff" strokeWidth={2} />
          }
        </button>

        {/* Live pulse */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          display: "flex", alignItems: "center", gap: 5,
          background: "rgba(0,0,0,0.36)", backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20, padding: "4px 9px",
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.25)",
            animation: "tv-pulse 1.6s infinite",
          }} />
          <style>{`@keyframes tv-pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
          <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-montserrat)", letterSpacing: "0.06em" }}>LIVE</span>
        </div>
      </div>

      {/* Extended review below video */}
      <div style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderTop: "none",
        borderRadius: "0 0 18px 18px",
        padding: "18px 18px 18px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
      }}>
        <p style={{
          fontSize: 13, color: "#4B5563", lineHeight: 1.72,
          fontFamily: "var(--font-montserrat)", fontStyle: "italic",
          marginBottom: 14, letterSpacing: "-0.005em",
        }}>
          &ldquo;{card.extendedReview}&rdquo;
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(14,165,233,0.06))",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(14,165,233,0.14)", flexShrink: 0,
          }}>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: "#0369a1", fontFamily: "var(--font-montserrat)" }}>
              {card.name.split(" ").map(w => w[0]).filter((_, i) => i === 1 || i === 2).join("")}
            </span>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#111", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>{card.name}</p>
            <p style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "var(--font-montserrat)" }}>{card.role} · {card.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll column ─── */
function ScrollColumn({ cards, dir, duration }: { cards: Card[]; dir: "up" | "down"; duration: number }) {
  const doubled = [...cards, ...cards];
  const anim = dir === "up"
    ? `twall-up ${duration}s linear infinite`
    : `twall-down ${duration}s linear infinite`;

  return (
    <div style={{ overflow: "hidden", height: "100%" }}>
      <div
        style={{ animation: anim }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((card, i) =>
          card.type === "video"
            ? <VCard key={i} card={card as VideoCard} />
            : <TCard key={i} card={card as TextCard} />
        )}
      </div>
    </div>
  );
}

const ALL_CARDS: Card[] = [...COL1, ...COL2, ...COL3];

/* ─── Main section ─── */
export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inSec = useInView(sectionRef, { once: true, amount: 0.1 });
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      style={{ background: "#fff", padding: isMobile ? "72px 0 80px" : "110px 0 130px", position: "relative", overflow: "hidden" }}
    >
      <style>{`
        @keyframes twall-up   { 0% { transform: translateY(0) }    100% { transform: translateY(-50%) } }
        @keyframes twall-down { 0% { transform: translateY(-50%) } 100% { transform: translateY(0) }    }
      `}</style>

      {/* Top blend */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, #fff, transparent)", pointerEvents: "none", zIndex: 1 }} />
      {/* Bottom blend */}
      <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #fff, transparent)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9", fontWeight: 700, textTransform: "uppercase", fontFamily: "var(--font-montserrat)", marginBottom: 16 }}
          >What People Are Saying</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "clamp(28px, 3.2vw, 48px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 16 }}
          >
            Physicians who use it<br />
            <span style={{ color: "#0ea5e9" }}>every single day.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.5, ease }}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 15, color: "#9CA3AF", letterSpacing: "-0.01em", maxWidth: 420, margin: "0 auto" }}
          >
            From internal medicine to dermatology, physicians across specialities.
          </motion.p>
        </div>

        {/* Testimonial wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inSec ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.6, ease }}
          style={isMobile
            ? { position: "relative" }
            : { position: "relative", height: 680, overflow: "hidden" }}
        >
          {!isMobile && (
            <>
              {/* Top + bottom fade */}
              <div aria-hidden style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: "linear-gradient(to bottom, #fff 0%, transparent 14%, transparent 86%, #fff 100%)",
              }} />
              {/* Three columns */}
              <div style={{ display: "flex", gap: 14, height: "100%", alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 290px", height: "100%" }}>
                  <ScrollColumn cards={COL1} dir="up" duration={30} />
                </div>
                <div style={{ flex: "0 0 346px", height: "100%" }}>
                  <ScrollColumn cards={COL2} dir="down" duration={42} />
                </div>
                <div style={{ flex: "0 0 290px", height: "100%" }}>
                  <ScrollColumn cards={COL3} dir="up" duration={36} />
                </div>
              </div>
            </>
          )}

          {isMobile && (
            <div style={{ position: "relative", height: 600, overflow: "hidden" }}>
              <div aria-hidden style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: "linear-gradient(to bottom, #fff 0%, transparent 14%, transparent 86%, #fff 100%)",
              }} />
              <ScrollColumn cards={ALL_CARDS} dir="up" duration={58} />
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}

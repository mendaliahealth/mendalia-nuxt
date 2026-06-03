"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Animated gradient orbs + cursor spotlight ─── */
function MagicBg() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const spotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = -1000, ty = -1000;
    let cx = -1000, cy = -1000;

    const onMove = (e: MouseEvent) => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${cx - 280}px, ${cy - 280}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <style>{`
        @keyframes ob1{0%,100%{transform:translate(0,0)scale(1)}40%{transform:translate(48px,-36px)scale(1.07)}75%{transform:translate(-24px,52px)scale(0.94)}}
        @keyframes ob2{0%,100%{transform:translate(0,0)scale(1)}35%{transform:translate(-54px,28px)scale(0.93)}70%{transform:translate(32px,-44px)scale(1.09)}}
        @keyframes ob3{0%,100%{transform:translate(0,0)scale(1)}50%{transform:translate(58px,-18px)scale(1.12)}}
        @keyframes ob4{0%,100%{transform:translate(0,0)scale(1)}45%{transform:translate(-28px,46px)scale(0.9)}85%{transform:translate(22px,-14px)scale(1.05)}}
      `}</style>

      {/* Cursor spotlight */}
      <div ref={spotRef} style={{
        position: "absolute", top: 0, left: 0,
        width: 560, height: 560, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.13) 0%, rgba(14,165,233,0.04) 45%, transparent 70%)",
        willChange: "transform", pointerEvents: "none",
      }} />

      {/* Orb 1 — blue, top-left */}
      <div style={{
        position: "absolute", top: -120, left: -100,
        width: 520, height: 520, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)",
        filter: "blur(72px)",
        animation: "ob1 20s ease-in-out infinite", willChange: "transform",
      }} />

      {/* Orb 2 — sky, top-right */}
      <div style={{
        position: "absolute", top: -80, right: -120,
        width: 440, height: 440, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
        filter: "blur(80px)",
        animation: "ob2 24s ease-in-out infinite", willChange: "transform",
      }} />

      {/* Orb 3 — violet, bottom-center */}
      <div style={{
        position: "absolute", bottom: -100, left: "25%",
        width: 640, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
        filter: "blur(90px)",
        animation: "ob3 28s ease-in-out infinite", willChange: "transform",
      }} />

      {/* Orb 4 — cyan, bottom-right */}
      <div style={{
        position: "absolute", bottom: -60, right: -80,
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "ob4 22s ease-in-out infinite", willChange: "transform",
      }} />
    </div>
  );
}

export default function VideoReel() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inSec  = useInView(sectionRef,   { once: true, amount: 0.1 });
  const inView = useInView(containerRef, { amount: 0.3 });

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Play / pause based on viewport
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [inView]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      id="demo"
      ref={sectionRef}
      style={{
        background: "#FFFDF9",
        padding: "100px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Magic background — orbs + cursor spotlight */}
      <MagicBg />

      {/* Blend from FlowCanvas — top */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 80,
        background: "linear-gradient(to bottom, #FFFDF9, transparent)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Blend into Features — bottom */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(to top, #fff, transparent)",
        pointerEvents: "none", zIndex: 1,
      }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 11, letterSpacing: "0.14em", color: "#0ea5e9",
              fontWeight: 700, textTransform: "uppercase",
              fontFamily: "var(--font-montserrat)", marginBottom: 16,
            }}
          >Walkthrough</motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.55, ease }}
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(28px, 3vw, 48px)",
              fontWeight: 800, color: "#0A0A0A",
              letterSpacing: "-0.035em", lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            See exactly how<br />
            <span style={{ color: "#0ea5e9" }}>Mendalia works.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inSec ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.5, ease }}
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 15, color: "#9CA3AF",
              letterSpacing: "-0.01em",
            }}
          >
            From conversation to full documentation, in real time.
          </motion.p>
        </div>

        {/* Video container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inSec ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.22, duration: 0.7, ease }}
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 24px 64px rgba(14,165,233,0.08), 0 40px 80px rgba(0,0,0,0.08)",
            background: "#000",
            aspectRatio: "16/9",
          }}
        >
          <video
            ref={videoRef}
            src="/walkthrough.mp4"
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Subtle top vignette so edges blend into the container */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.12) 100%)",
          }} />

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            style={{
              position: "absolute", bottom: 16, right: 16,
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.28)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted
              ? <VolumeX size={15} color="#fff" strokeWidth={2} />
              : <Volume2 size={15} color="#fff" strokeWidth={2} />
            }
          </button>

          {/* Live badge */}
          {playing && (
            <div style={{
              position: "absolute", top: 14, left: 14,
              display: "flex", alignItems: "center", gap: 5,
              background: "rgba(0,0,0,0.38)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20, padding: "4px 10px",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 0 3px rgba(239,68,68,0.25)",
                animation: "reel-pulse 1.6s infinite",
              }} />
              <style>{`@keyframes reel-pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              <span style={{
                fontSize: 9.5, fontWeight: 700, color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-montserrat)", letterSpacing: "0.06em",
              }}>PLAYING</span>
            </div>
          )}
        </motion.div>


      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

/* ── News items ── */
const NEWS = [
  {
    text: (
      <>
        Mendalia enters India in partnership with Lupin{" "}
        <Image src="/lupin-logo-new.png" alt="" width={14} height={18}
          style={{ display: "inline-block", objectFit: "contain", verticalAlign: "middle", marginBottom: 1 }} />
      </>
    ),
    cta: true,
  },
  {
    text: "Mendalia launching soon in Sri Lanka, Bhutan and Bangladesh",
    cta: false,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Lupin announcement modal ── */
function LupinModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f0f0f",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 22,
          width: "100%",
          maxWidth: 520,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
      >
        {/* Photo */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
          <Image
            src="/lupin-photo.jpeg"
            alt="Mendalia × Lupin partnership meeting"
            fill
            style={{ objectFit: "cover" }}
          />
          {/* Gradient overlay at bottom of image */}
          <div aria-hidden style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
            background: "linear-gradient(to bottom, transparent, #0f0f0f)",
            pointerEvents: "none",
          }} />
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", color: "rgba(255,255,255,0.7)",
              fontSize: 16, transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.72)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "28px 32px 36px" }}>
          {/* Logos */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Image src="/mendalia-logo.png" alt="Mendalia" width={80} height={80}
              style={{ height: 28, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }} />
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18, fontWeight: 300 }}>×</span>
            <Image src="/lupin-logo-new.png" alt="Lupin" width={40} height={50}
              style={{ height: 28, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }} />
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 20, fontWeight: 800,
            color: "#ffffff", letterSpacing: "-0.03em",
            lineHeight: 1.2, marginBottom: 14,
          }}>
            Mendalia Partners with Lupin for its First Indian Market Rollout
          </h2>

          {/* Body */}
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 13.5, color: "rgba(255,255,255,0.48)",
            letterSpacing: "-0.005em", lineHeight: 1.78, marginBottom: 12,
          }}>
            We're proud to mark our entry into India alongside Lupin, one of the country's most
            respected pharmaceutical organisations. This partnership brings Mendalia's AI-native
            clinical documentation and decision-support capabilities to doctors across the Indian
            healthcare system.
          </p>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 13.5, color: "rgba(255,255,255,0.32)",
            letterSpacing: "-0.005em", lineHeight: 1.78,
          }}>
            India is the first of several markets we are entering through strategic partnerships
            with leading healthcare and pharmaceutical organisations. More announcements to follow.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Nav constants ── */
const links = [
  { label: "Features",     href: "#features"    },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing"      },
  { label: "Support",      href: "#support"      },
];

const NEWS_BAR_H = 36;
const NAV_H = 68;
export const HEADER_H = NEWS_BAR_H + NAV_H;
const T = "0.42s cubic-bezier(0.16, 1, 0.3, 1)";

export default function Nav() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [newsIdx,     setNewsIdx]    = useState(0);
  const [lupinOpen,   setLupinOpen]  = useState(false);
  const newsRef = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      newsRef.current = (newsRef.current + 1) % NEWS.length;
      setNewsIdx(newsRef.current);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const mobileTop = scrolled ? 10 + 54 : HEADER_H;

  return (
    <>
      <AnimatePresence>
        {lupinOpen && <LupinModal onClose={() => setLupinOpen(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          padding: scrolled ? "10px 20px" : "0",
          transition: `padding ${T}`,
        }}
      >
        {/* ── News bar ── */}
        <div style={{
          height: scrolled ? 0 : NEWS_BAR_H,
          overflow: "hidden",
          transition: `height ${T}`,
          background: "#0A0A0A",
        }}>
          <div style={{
            height: NEWS_BAR_H,
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={newsIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: 12, fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  letterSpacing: "-0.01em", whiteSpace: "nowrap",
                }}
              >
                {NEWS[newsIdx].text}
                {NEWS[newsIdx].cta && (
                  <button
                    onClick={() => setLupinOpen(true)}
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: 11, fontWeight: 600,
                      color: "rgba(255,255,255,0.45)",
                      background: "none", border: "none",
                      cursor: "pointer", padding: 0,
                      letterSpacing: "0.01em",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.88)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    Read more →
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Main nav ── */}
        <div style={{
          height: scrolled ? 54 : NAV_H,
          maxWidth: scrolled ? 820 : "100%",
          margin: "0 auto",
          borderRadius: scrolled ? 40 : 0,
          background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: scrolled ? "1px solid rgba(0,0,0,0.09)" : "1px solid rgba(0,0,0,0.04)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.09)" : "1px solid rgba(0,0,0,0.07)",
          boxShadow: scrolled
            ? "0 4px 6px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)"
            : "none",
          overflow: "hidden",
          transition: `height ${T}, max-width ${T}, border-radius ${T}, background ${T}, border ${T}, box-shadow ${T}`,
        }}>
          <div style={{
            maxWidth: scrolled ? "100%" : 1280,
            margin: "0 auto",
            padding: scrolled ? "0 20px" : "0 32px",
            height: "100%",
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
            gap: scrolled ? 12 : 32,
            transition: `padding ${T}, gap ${T}`,
          }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
              <div style={{ height: 40, width: 140, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <Image
                  src="/mendalia-logo.png" alt="Mendalia"
                  width={1563} height={1563}
                  style={{
                    position: "absolute", height: 120, width: 120, objectFit: "contain",
                    top: "50%", left: "50%", transform: "translate(-60%, -46%)",
                  }}
                />
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="nav-desktop" style={{ alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              {links.map(({ label, href }) => (
                <Link key={label} href={href} style={{
                  padding: scrolled ? "6px 11px" : "8px 16px",
                  fontSize: scrolled ? 13 : 14,
                  color: "#6B665F", textDecoration: "none",
                  borderRadius: 8,
                  transition: `color 0.15s, background 0.15s, padding ${T}, font-size ${T}`,
                  fontWeight: 500,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  letterSpacing: "-0.01em",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#111110"; e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6B665F"; e.currentTarget.style.background = "transparent"; }}
                >{label}</Link>
              ))}
            </nav>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <Link href="https://ai.mendalia.com" className="nav-sign-in" style={{
                fontSize: 13, color: "#6B665F", textDecoration: "none",
                padding: "8px 12px", transition: "color 0.15s", fontWeight: 500,
                fontFamily: "var(--font-montserrat), sans-serif", letterSpacing: "-0.01em",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111110")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B665F")}
              >Sign in</Link>

              <Link href="https://calendly.com/mohitxsirohi/30min" target="_blank" rel="noopener noreferrer" style={{
                background: "#111111", color: "#FFFFFF", fontWeight: 600,
                fontSize: scrolled ? 12.5 : 14,
                padding: scrolled ? "7px 16px" : "9px 20px",
                borderRadius: scrolled ? 22 : 10,
                textDecoration: "none", whiteSpace: "nowrap",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-montserrat), sans-serif",
                boxShadow: "0 1px 2px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)",
                transition: `background 0.15s, box-shadow 0.15s, transform 0.15s, padding ${T}, border-radius ${T}, font-size ${T}`,
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2A2A2A";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.22), 0 8px 20px rgba(0,0,0,0.14)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111111";
                  e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >Book a Call</Link>

              <button onClick={() => setMobileOpen((v) => !v)} className="nav-mobile-btn" style={{
                padding: 8, color: "#6B665F", background: "transparent",
                border: "none", cursor: "pointer", borderRadius: 8,
                display: "flex", alignItems: "center",
              }}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              top: mobileTop,
              left: scrolled ? 20 : 0,
              right: scrolled ? 20 : 0,
              zIndex: 40,
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(20px)",
              borderRadius: scrolled ? 20 : 0,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 2 }}>
              {links.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setMobileOpen(false)} style={{
                  padding: "12px 16px", fontSize: 15, color: "#4A4540",
                  textDecoration: "none", borderRadius: 8, fontWeight: 500,
                }}>{label}</Link>
              ))}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: 8, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="https://ai.mendalia.com" style={{ padding: "12px 16px", fontSize: 15, color: "#6B665F", textDecoration: "none" }}>Sign in</Link>
                <Link href="https://calendly.com/mohitxsirohi/30min" target="_blank" rel="noopener noreferrer" style={{ background: "#111111", color: "#FFFFFF", fontWeight: 600, fontSize: 15, padding: "13px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}>Book a Call</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

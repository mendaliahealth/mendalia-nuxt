"use client";

import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const FRAGMENTS = [
  // Far-left
  { text: "Chief Complaint:",              x:  3, fs: 11, op: 0.13, teal: true,  dur: 22, del:   0 },
  { text: "Shortness of breath × 3d",     x:  1, fs: 14, op: 0.22, teal: false, dur: 27, del: -10 },
  { text: "Subjective:",                   x:  7, fs: 11, op: 0.13, teal: true,  dur: 20, del:  -5 },
  { text: "Fever 38.4 °C",                x:  4, fs: 13, op: 0.19, teal: false, dur: 25, del: -18 },
  { text: "Fatigue, malaise",              x:  5, fs: 12, op: 0.16, teal: false, dur: 21, del: -27 },

  // Left
  { text: "BP: 138/92 mmHg",              x: 17, fs: 13, op: 0.23, teal: false, dur: 20, del:  -7 },
  { text: "HR: 76 bpm",                   x: 20, fs: 12, op: 0.20, teal: false, dur: 23, del: -16 },
  { text: "SpO₂: 97 %",                  x: 15, fs: 13, op: 0.22, teal: false, dur: 18, del:  -3 },
  { text: "Objective:",                   x: 22, fs: 11, op: 0.13, teal: true,  dur: 25, del: -12 },
  { text: "Temp: 38.4 °C",               x: 18, fs: 12, op: 0.17, teal: false, dur: 21, del: -21 },
  { text: "RR: 18 / min",                x: 21, fs: 11, op: 0.16, teal: false, dur: 19, del: -31 },

  // Centre-left
  { text: "Assessment:",                  x: 35, fs: 11, op: 0.13, teal: true,  dur: 20, del:  -6 },
  { text: "Community-acquired pneumonia", x: 30, fs: 12, op: 0.21, teal: false, dur: 29, del: -14 },
  { text: "ICD-10: J18.9",               x: 38, fs: 11, op: 0.17, teal: false, dur: 19, del:  -2 },
  { text: "WBC: 11.2 K/μL ↑",           x: 33, fs: 12, op: 0.18, teal: false, dur: 22, del: -20 },
  { text: "CRP: 48 mg/L ↑",             x: 40, fs: 11, op: 0.15, teal: false, dur: 24, del:  -9 },
  { text: "Chest X-ray: RLL infiltrate", x: 28, fs: 11, op: 0.14, teal: false, dur: 26, del: -25 },
  { text: "Impression:",                 x: 37, fs: 11, op: 0.13, teal: true,  dur: 23, del: -35 },

  // Centre-right
  { text: "Plan:",                        x: 58, fs: 11, op: 0.13, teal: true,  dur: 21, del:  -4 },
  { text: "Amoxicillin 875 mg BID × 7d", x: 53, fs: 12, op: 0.21, teal: false, dur: 25, del: -11 },
  { text: "Follow-up in 7 days",         x: 60, fs: 11, op: 0.17, teal: false, dur: 18, del: -17 },
  { text: "No drug interactions",        x: 51, fs: 11, op: 0.14, teal: false, dur: 20, del: -33 },
  { text: "Azithromycin PRN",            x: 63, fs: 11, op: 0.13, teal: false, dur: 22, del: -22 },

  // Right
  { text: "HPI:",                         x: 74, fs: 11, op: 0.13, teal: true,  dur: 19, del:  -1 },
  { text: "Normal sinus rhythm",          x: 70, fs: 12, op: 0.17, teal: false, dur: 22, del: -13 },
  { text: "NKDA",                         x: 78, fs: 13, op: 0.18, teal: false, dur: 20, del: -19 },
  { text: "PMH: Type 2 DM",              x: 72, fs: 11, op: 0.14, teal: false, dur: 24, del:  -6 },
  { text: "Differential:",               x: 77, fs: 11, op: 0.13, teal: true,  dur: 21, del: -23 },
  { text: "ECG: NSR",                    x: 75, fs: 11, op: 0.17, teal: false, dur: 18, del:  -3 },
  { text: "A1c: 7.2 %",                 x: 73, fs: 11, op: 0.14, teal: false, dur: 26, del: -29 },

  // Far-right
  { text: "CBC: WNL",                    x: 85, fs: 11, op: 0.15, teal: false, dur: 20, del:  -8 },
  { text: "Review of systems:",          x: 88, fs: 11, op: 0.13, teal: true,  dur: 23, del: -15 },
  { text: "Past medical history:",       x: 86, fs: 11, op: 0.13, teal: true,  dur: 18, del: -24 },
  { text: "Hypertension, controlled",    x: 84, fs: 12, op: 0.17, teal: false, dur: 25, del:  -4 },
  { text: "Type 2 DM",                  x: 90, fs: 12, op: 0.16, teal: false, dur: 21, del: -32 },
  { text: "Metformin 1000 mg BID",      x: 87, fs: 11, op: 0.13, teal: false, dur: 19, del: -11 },
];

export default function FloatingClinical() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const reset = () => {
      const container = containerRef.current;
      if (!container) return;
      container.querySelectorAll<HTMLElement>("span[data-idx]").forEach((span) => {
        const baseOp = parseFloat(span.dataset.baseOp ?? "0.15");
        const isTeal = span.dataset.teal === "true";
        span.style.opacity = String(baseOp);
        span.style.color = isTeal ? "#046460" : "#0A0A0A";
        span.style.fontWeight = isTeal ? "700" : "500";
        span.style.textShadow = "none";
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      container.querySelectorAll<HTMLElement>("span[data-idx]").forEach((span) => {
        const sr = span.getBoundingClientRect();
        const sx = sr.left + sr.width / 2 - rect.left;
        const sy = sr.top + sr.height / 2 - rect.top;
        const dist = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2);

        const baseOp = parseFloat(span.dataset.baseOp ?? "0.15");
        const isTeal = span.dataset.teal === "true";

        if (dist < 160) {
          const factor = 1 - dist / 160;
          span.style.opacity = String(Math.min(baseOp + factor * 0.55, 0.78));
          span.style.color = "#046460";
          span.style.fontWeight = "700";
          span.style.textShadow = `0 0 ${Math.round(factor * 18)}px rgba(4,100,96,${(factor * 0.3).toFixed(2)})`;
        } else {
          span.style.opacity = String(baseOp);
          span.style.color = isTeal ? "#046460" : "#0A0A0A";
          span.style.fontWeight = isTeal ? "700" : "500";
          span.style.textShadow = "none";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", reset);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        maskImage:
          "linear-gradient(to top, transparent 0%, black 5%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top, transparent 0%, black 5%, black 88%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes clinical-rise {
          from { transform: translateY(110vh); }
          to   { transform: translateY(-15vh); }
        }
      `}</style>

      {FRAGMENTS.map((f, i) => (
        <span
          key={i}
          data-idx={i}
          data-base-op={f.op}
          data-dur={f.dur}
          data-teal={f.teal}
          style={{
            position: "absolute",
            top: 0,
            left: `${f.x}%`,
            fontSize: f.fs,
            fontWeight: f.teal ? 700 : 500,
            color: f.teal ? "#046460" : "#0A0A0A",
            opacity: f.op,
            whiteSpace: "nowrap",
            letterSpacing: f.teal ? "0.03em" : "-0.01em",
            fontFamily: "var(--font-montserrat), sans-serif",
            animation: `clinical-rise ${f.dur}s linear ${f.del}s infinite`,
            transition: "opacity 0.35s ease, color 0.35s ease, font-weight 0.2s ease, text-shadow 0.35s ease",
            cursor: "default",
          }}
        >
          {f.text}
        </span>
      ))}
    </div>
  );
}

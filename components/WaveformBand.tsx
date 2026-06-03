"use client";

import { useRef, useEffect } from "react";

const BAR_W = 2;
const GAP   = 1.5;
const STEP  = BAR_W + GAP;

// How many bars span one full revolution of the cylinder.
// ~4 wave crests visible across a 1440px screen.
const REVOLUTION = 100;
const CYCLE = 600; // seed array — 6× the revolution for variety

function sr(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// "Audio signal" — the physical height of each bar on the cylinder surface
const BARS = Array.from({ length: CYCLE }, (_, i) => {
  const t = i / CYCLE;
  const h = Math.max(0.04, Math.min(0.96,
    0.20
    + 0.16 * Math.sin(t * Math.PI *  5 + 0.4)
    + 0.10 * Math.sin(t * Math.PI * 13 + 1.1)
    + 0.07 * Math.sin(t * Math.PI * 27 + 2.7)
    + 0.20 * sr(i * 7 + 3)
  ));
  const accent = sr(i * 31 + 17) > 0.935;
  return { h, accent };
});

export default function WaveformBand() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, offset = 0, raf = 0;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      offset += 0.8;

      const scrolledBars = offset / STEP;
      const startIdx     = Math.floor(scrolledBars);
      const count        = Math.ceil(W / STEP) + 2;

      for (let i = 0; i < count; i++) {
        const bar = BARS[(startIdx + i) % CYCLE];

        // Angular position of this bar on the cylinder, coupled to scroll.
        // As the cylinder rotates, each bar travels around the circumference.
        const angle = (2 * Math.PI * (scrolledBars + i)) / REVOLUTION;

        // Cylindrical projection: sin maps the bar's position on the
        // circumference to a [0,1] visibility factor.
        // Front face (sin≈1) → full height; back face (sin≈−1) → tiny stub.
        const sinVal = Math.sin(angle);
        const proj   = 0.05 + 0.95 * (1 + sinVal) / 2;  // 0.05 → 1.0

        const barH = bar.h * proj * H * 0.84;
        const x    = i * STEP - (offset % STEP);
        const y    = (H - barH) / 2;
        const r    = Math.min(1.5, BAR_W / 2);

        // Alpha also driven by projection so back-face bars fade out
        const alpha = bar.accent
          ? 0.18 + 0.62 * proj
          : 0.10 + 0.38 * proj;

        ctx.fillStyle = bar.accent
          ? `rgba(204,112,0,${alpha.toFixed(3)})`
          : `rgba(152,143,131,${alpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + BAR_W - r, y);
        ctx.quadraticCurveTo(x + BAR_W, y,        x + BAR_W, y + r);
        ctx.lineTo(x + BAR_W, y + barH - r);
        ctx.quadraticCurveTo(x + BAR_W, y + barH, x + BAR_W - r, y + barH);
        ctx.lineTo(x + r,    y + barH);
        ctx.quadraticCurveTo(x,         y + barH, x,         y + barH - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x,         y,        x + r,     y);
        ctx.closePath();
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener("resize", setup);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setup); };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        height: 120,
        background: "#FFFDF9",
        overflow: "hidden",
        borderTop:    "1px solid rgba(0,0,0,0.055)",
        borderBottom: "1px solid rgba(0,0,0,0.055)",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, display: "block" }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, #FFFDF9 0%, transparent 6%, transparent 94%, #FFFDF9 100%)",
      }} />
    </div>
  );
}

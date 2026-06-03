"use client";

import { useRef, useEffect } from "react";

// Proper P–QRS–T cardiac cycle. p ∈ [0, 1).
function beat(p: number): number {
  p = ((p % 1) + 1) % 1;
  let y = 0;
  // P wave
  y += 0.20 * Math.exp(-600  * (p - 0.15) ** 2);
  // Q dip
  y -= 0.12 * Math.exp(-5000 * (p - 0.295) ** 2);
  // R spike — tall and sharp
  y += 1.00 * Math.exp(-6000 * (p - 0.330) ** 2);
  // S dip
  y -= 0.24 * Math.exp(-5000 * (p - 0.365) ** 2);
  // T wave
  y += 0.28 * Math.exp(-180  * (p - 0.570) ** 2);
  return y;
}

export default function ECGBand() {
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
      offset += 1.6;

      const cy    = H * 0.52;
      const ampPx = H * 0.34; // R peak reaches ~18% from top on a 130px band
      const cycleW = 220;     // px per beat — ~6-7 beats visible on 1440px

      // Glow pass
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = cy - beat((x + offset) / cycleW) * ampPx;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(14,165,233,0.12)";
      ctx.lineWidth   = 9;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();

      // Core line
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = cy - beat((x + offset) / cycleW) * ampPx;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(14,165,233,0.62)";
      ctx.lineWidth   = 1.6;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();

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
      style={{ position: "relative", height: 130, background: "#fff", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, display: "block" }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: [
          "linear-gradient(to right,  #fff 0%, transparent  7%, transparent 93%, #fff 100%)",
          "linear-gradient(to bottom, #fff 0%, transparent 22%, transparent 78%, #fff 100%)",
        ].join(", "),
      }} />
    </div>
  );
}

"use client";

import { useRef, useEffect } from "react";

export default function PulseLine() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, phase = 0, raf = 0;

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
      phase += 0.012;

      const cy  = H / 2;
      const amp = H * 0.28;

      // Glow pass — wide, soft
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const y = cy + amp * Math.sin((x / W) * Math.PI * 5 - phase);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(14,165,233,0.10)";
      ctx.lineWidth   = 10;
      ctx.lineJoin    = "round";
      ctx.lineCap     = "round";
      ctx.stroke();

      // Core line
      ctx.beginPath();
      for (let x = 0; x <= W; x += 1) {
        const y = cy + amp * Math.sin((x / W) * Math.PI * 5 - phase);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0,    "rgba(14,165,233,0)");
      grad.addColorStop(0.08, "rgba(14,165,233,0.55)");
      grad.addColorStop(0.5,  "rgba(14,165,233,0.75)");
      grad.addColorStop(0.92, "rgba(14,165,233,0.55)");
      grad.addColorStop(1,    "rgba(14,165,233,0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.8;
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
      style={{ position: "relative", height: 90, background: "#fff", overflow: "hidden" }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
}

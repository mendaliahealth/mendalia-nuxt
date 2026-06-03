"use client";

import { useRef, useEffect } from "react";

interface Particle {
  hx: number; hy: number;
  x: number;  y: number;
  vx: number; vy: number;
  r: number;
}

export default function AlwaysActiveBand() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING  = 22;
    const REPEL_R  = 110;
    const REPEL_F  = 5.5;
    const SPRING   = 0.062;
    const DAMP     = 0.78;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999, inside: false };
    let raf: number;

    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);

      particles = [];
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      const ox = ((W % SPACING) + SPACING) / 2;
      const oy = ((H % SPACING) + SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = ox + c * SPACING;
          const hy = oy + r * SPACING;
          particles.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0, r: 1.1 + Math.random() * 0.7 });
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // Repulsion
        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < REPEL_R && d > 0.5) {
            const f = (1 - d / REPEL_R) * REPEL_F;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        // Spring to home
        p.vx += (p.hx - p.x) * SPRING;
        p.vy += (p.hy - p.y) * SPRING;

        // Damping
        p.vx *= DAMP;
        p.vy *= DAMP;

        p.x += p.vx;
        p.y += p.vy;

        const alpha = 0.22;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect   = canvas.getBoundingClientRect();
      mouse.x      = e.clientX - rect.left;
      mouse.y      = e.clientY - rect.top;
      mouse.inside = true;
    };

    const onLeave = () => { mouse.inside = false; };
    const onResize = () => { build(); };

    build();
    tick();

    canvas.addEventListener("mousemove",  onMove,    { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",     onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",     onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        height: 90,
        background: "#fff",
        borderTop:    "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        overflow: "hidden",
        cursor: "crosshair",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, display: "block" }}
      />

      {/* Centered pill */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(14,165,233,0.28)",
          borderRadius: 24,
          padding: "7px 20px",
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
            color: "#0ea5e9", fontFamily: "var(--font-montserrat)",
            textTransform: "uppercase",
          }}>Always Active</span>
        </div>
      </div>
    </div>
  );
}

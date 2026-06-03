"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Particle ── */
type P = {
  x: number; y: number;
  vx: number; vy: number;
  r: number; op: number;
};

/* ── Star sparkle ── */
type S = {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; angle: number; spin: number;
};

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) {
  const inner = r * 0.28;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = angle + (i / 8) * Math.PI * 2;
    const rad = i % 2 === 0 ? r : inner;
    const px = x + rad * Math.cos(a);
    const py = y + rad * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, wrapRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    let mx = -999, my = -999;
    let lastSpawnX = -999, lastSpawnY = -999, lastSpawnT = 0;

    const particles: P[] = [];
    const stars: S[] = [];

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);

      particles.length = 0;
      const count = Math.round((W * H) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 1.5 + Math.random() * 2.5,
          op: 0.10 + Math.random() * 0.22,
        });
      }
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;

      // Throttle: spawn star only if moved enough + 28ms gap
      const now = Date.now();
      const dx = mx - lastSpawnX, dy = my - lastSpawnY;
      if (now - lastSpawnT > 28 && dx * dx + dy * dy > 36 && stars.length < 60) {
        stars.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2 - 0.6,
          life: 0,
          maxLife: 38 + Math.random() * 22,
          size: 3.5 + Math.random() * 5,
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.12,
        });
        lastSpawnX = mx; lastSpawnY = my; lastSpawnT = now;
      }
    };

    const onLeave = () => { mx = -9999; my = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Particles
      for (const p of particles) {
        const dx = p.x - mx, dy = p.y - my;
        const dist2 = dx * dx + dy * dy;
        const repel = 110;

        if (dist2 < repel * repel && dist2 > 0.01) {
          const dist = Math.sqrt(dist2);
          const force = ((repel - dist) / repel) ** 1.6 * 3.2;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x  += p.vx;
        p.y  += p.vy;

        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        // Glow when repelled
        const speed2 = p.vx * p.vx + p.vy * p.vy;
        const glow   = Math.min(1, speed2 / 4);
        const op     = p.op + glow * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${op.toFixed(3)})`;
        ctx.fill();
      }

      // Stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.life++;
        s.x    += s.vx;
        s.y    += s.vy;
        s.vy   += 0.04;
        s.angle += s.spin;

        if (s.life >= s.maxLife) { stars.splice(i, 1); continue; }

        const t    = s.life / s.maxLife;
        const alpha = (1 - t) * 0.9;
        const r    = s.size * (1 - t * 0.4);

        ctx.save();
        ctx.globalAlpha = alpha;
        drawStar(ctx, s.x, s.y, r, s.angle);
        ctx.fillStyle = "#0ea5e9";
        ctx.fill();
        // small core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setup);
    };
  }, [canvasRef, wrapRef]);
}

export default function Support() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.2 });

  useParticleCanvas(canvasRef, sectionRef);

  return (
    <section
      id="support"
      ref={sectionRef}
      style={{ background: "#fff", padding: "0 0 140px", position: "relative", overflow: "hidden" }}
    >
      {/* Interactive canvas behind content */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "block" }}
      />

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 1 }}>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ height: 1, background: "rgba(0,0,0,0.07)", marginBottom: 80, transformOrigin: "left" }}
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            fontSize: 11, letterSpacing: "0.14em",
            color: "#0ea5e9", fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "var(--font-montserrat)",
            marginBottom: 16,
          }}
        >
          Support
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.55, ease }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800, color: "#0A0A0A",
            letterSpacing: "-0.038em", lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          We're here when<br />
          <span style={{ color: "#0ea5e9" }}>you need us.</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.24, duration: 0.5, ease }}
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: 15.5, color: "#6B7280",
            letterSpacing: "-0.01em", lineHeight: 1.78,
            marginBottom: 36,
          }}
        >
          Have a question, hit a snag, or want to talk through how Mendalia
          fits your workflow? Our team reads every message and gets back to
          you promptly, usually within one business day.
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.32, duration: 0.5, ease }}
        >
          <a
            href="mailto:connect@mendalia.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 16, fontWeight: 700,
              color: "#0A0A0A", textDecoration: "none",
              letterSpacing: "-0.02em",
              borderBottom: "2px solid rgba(14,165,233,0.35)",
              paddingBottom: 2,
              transition: "color 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0ea5e9";
              e.currentTarget.style.borderColor = "#0ea5e9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#0A0A0A";
              e.currentTarget.style.borderColor = "rgba(14,165,233,0.35)";
            }}
          >
            connect@mendalia.com
          </a>
        </motion.div>

      </div>
    </section>
  );
}

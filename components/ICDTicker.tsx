"use client";

import { useRef, useEffect } from "react";

const FONT = "14px 'Courier New', Courier, monospace";

const RAND = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789";

const CODES = [
  "J18.9","I21.0","E11.9","N18.3","C34.11","F32.1","A41.9",
  "K92.1","G35","I10","J44.1","M54.5","I48.0","N17.9",
  "E78.5","I25.10","J96.00","B18.1","R00.0","K29.70",
  "Z87.891","R06.00","N39.0","L40.0","D50.9","H35.30","C50.919",
  "I63.9","K57.30","M16.11","N20.0","R51","G43.909","E03.9",
];

function sr(s: number): number {
  return Math.abs(Math.sin(s * 127.1 + 311.7) * 43758.5453) % 1;
}

type G = { ch: string; hi: boolean };

// Build a long looping sequence of noise chars with ICD codes embedded
const SEQ: G[] = [];
{
  let s = 0;
  while (SEQ.length < 5600) {
    const gap = 10 + Math.floor(sr(s++) * 22);
    for (let j = 0; j < gap; j++)
      SEQ.push({ ch: RAND[Math.floor(sr(s++ * 7 + j * 3) * RAND.length)], hi: false });
    const code = CODES[Math.floor(sr(s++) * CODES.length)];
    for (const c of code) SEQ.push({ ch: c, hi: true });
  }
}
const N = SEQ.length;

export default function ICDTicker() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, cw = 8.4, offset = 0, raf = 0;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      W = wrap.offsetWidth;
      H = wrap.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      ctx.font = FONT;
      cw = ctx.measureText("m").width;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      offset += 1.1;

      ctx.font = FONT;
      ctx.textBaseline = "middle";

      const startIdx = Math.floor(offset / cw);
      const count    = Math.ceil(W / cw) + 2;
      const y        = H / 2;

      for (let i = 0; i < count; i++) {
        const g = SEQ[(startIdx + i) % N];
        const x = i * cw - (offset % cw);
        ctx.fillStyle = g.hi ? "#0ea5e9" : "rgba(148,138,125,0.4)";
        ctx.fillText(g.ch, x, y);
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
        height: 58,
        background: "#FFFDF9",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, #FFFDF9 0%, transparent 7%, transparent 93%, #FFFDF9 100%)",
      }} />
    </div>
  );
}

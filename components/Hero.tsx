"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("sr-visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sr-hidden").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center text-center pt-[100px] pb-0 px-[5%] overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 100% 55% at 50% -5%, rgba(10,107,90,0.09) 0%, transparent 65%), linear-gradient(180deg,#EFF7F5 0%,#F8FCF9 35%,#fff 65%)",
      }}
      aria-labelledby="hero-headline"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(10,107,90,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,107,90,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 20%,black,transparent)",
        }}
        aria-hidden="true"
      />

      {/* Orbs */}
      <div className="absolute w-[600px] h-[450px] -top-24 -left-36 rounded-full pointer-events-none animate-drift-a" style={{ background: "radial-gradient(circle,rgba(10,107,90,0.1),transparent 70%)", filter: "blur(70px)" }} aria-hidden="true" />
      <div className="absolute w-[500px] h-[380px] -top-20 -right-28 rounded-full pointer-events-none animate-drift-b" style={{ background: "radial-gradient(circle,rgba(13,138,114,0.08),transparent 70%)", filter: "blur(70px)" }} aria-hidden="true" />

      {/* Pill badge */}
      

      {/* Headline */}
      <h1
        id="hero-headline"
        className="relative z-10 text-[clamp(2.8rem,6.5vw,5.4rem)] font-black leading-[1.01] tracking-[-0.04em] text-[var(--ink)] max-w-[940px] animate-fade-up delay-100"
      >
        The ambient reasoning engine
        <span className="block" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
          that thinks with you.
        </span>
      </h1>

      {/* Subheading */}
      <p className="relative z-10 mt-5 text-[1.05rem] text-[var(--sage)] max-w-[600px] leading-[1.74] animate-fade-up delay-200">
        The AI-native Ambient Clinical Reasoning Engine that goes end to end. From the first spoken word to differential diagnosis, care plan, medications, and every clinical letter. Nothing else does all of this.
      </p>

      {/* CTAs */}
      <div className="relative z-10 mt-9 flex gap-3 items-center flex-wrap justify-center animate-fade-up delay-300">
        <a
          href="#pricing"
          className="bg-[var(--brand)] text-white font-bold px-8 py-3.5 rounded-full text-[0.96rem] hover:bg-[var(--brand-light)] transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(10,107,90,0.28)]"
        >
          Start for free
        </a>
        <a
          href="#product"
          className="border-[1.5px] border-[rgba(10,20,16,0.16)] text-[var(--ink)] font-bold px-8 py-3.5 rounded-full text-[0.96rem] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
        >
          See how it works
        </a>
      </div>

      {/* Social proof */}
      <div className="relative z-10 mt-5 flex items-center gap-3 text-[0.78rem] text-[var(--muted)] animate-fade-up delay-400">
        <div className="flex">
          {["AR","BD","AB","SK","DW"].map((init, i) => (
            <div key={init} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[0.55rem] font-black text-white -ml-1.5 first:ml-0" style={{ background: ["#0A6B5A","#0D5C4A","#1A5C50","#2E7A6A","#0E4A3C"][i] }}>
              {init}
            </div>
          ))}
        </div>
        <span>Trusted by <strong className="text-[var(--ink)]">200+ clinicians</strong> worldwide</span>
      </div>

      {/* Browser mockup with animated product preview */}
      <div className="relative z-10 mt-14 w-full max-w-[1100px] animate-fade-up" style={{ animationDelay: "0.45s" }}>
        <div className="bg-[#EAEAEA] border border-black/10 border-b-0 rounded-t-[14px] px-4 py-2.5 flex items-center gap-1.5">
          <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
          <div className="flex-1 mx-3 bg-white rounded-[5px] px-3 py-1 text-[0.67rem] text-[#999] border border-black/[0.06] truncate">
            ai.mendalia.com/comprehensive/workspace
          </div>
        </div>
        <div className="border border-black/[0.08] border-t-0 rounded-b-sm overflow-x-auto shadow-[0_30px_100px_rgba(10,107,90,0.10)]">
          <div className="min-w-[680px]">
            <HeroBrowserMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBrowserMockup() {
  return (
    <div className="bg-[#F4F7F6] min-h-[420px] flex">
      {/* Sidebar */}
      <div className="w-28 bg-[var(--brand)] flex-shrink-0 flex flex-col pt-4 px-3 gap-1">
        <div className="text-white font-black text-[0.7rem] mb-4 px-1">mendalia AI</div>
        {["Dashboard","Workspace","Emergency"].map((item, i) => (
          <div key={item} className={`text-[0.6rem] font-semibold px-2 py-1.5 rounded-lg cursor-pointer ${i === 1 ? "bg-white/20 text-white" : "text-white/60 hover:text-white/90"}`}>
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-5">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[0.75rem] font-bold text-[var(--ink)]">ML, Male 49 Y</div>
            <div className="text-[0.62rem] text-[var(--muted)]">Comprehensive AI Analysis</div>
          </div>
          <div className="flex gap-2">
            {["Patient Context","AI Reasoning","Care Plan","Letters","Lab Reports"].map((t) => (
              <div key={t} className={`text-[0.58rem] font-semibold px-2 py-1 rounded-full ${t === "AI Reasoning" ? "bg-[var(--brand)] text-white" : "bg-white border border-[var(--border)] text-[var(--muted)]"}`}>{t}</div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left: Primary impression */}
          <div className="bg-white rounded-xl p-4 border border-[var(--border)]">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--brand)] mb-2">Primary Impression</div>
            <div className="text-[0.78rem] font-bold text-[var(--ink)] mb-1">Meningitis / Encephalitis</div>
            <p className="text-[0.62rem] text-[var(--sage)] leading-relaxed mb-3">Acute presentation of headache, fever and vomiting, highly suggestive of central nervous system infection. Requiring urgent evaluation.</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[0.58rem] text-[var(--muted)]">Likelihood</span>
              <span className="text-[0.6rem] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Medium</span>
            </div>
            <button className="w-full text-[0.62rem] font-bold text-[var(--brand)] bg-[var(--brand-mist)] border border-[var(--border)] rounded-lg py-1.5 hover:bg-[var(--brand-faint)]">
              Generate Related Articles
            </button>
          </div>

          {/* Right: Differential + actions */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl p-4 border border-[var(--border)]">
              <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--brand)] mb-2">Differential Diagnosis</div>
              {[
                { name: "Meningitis/Encephalitis", score: 85 },
                { name: "Viral Encephalitis", score: 62 },
                { name: "Subarachnoid Haemorrhage", score: 41 },
              ].map((dx) => (
                <div key={dx.name} className="flex items-center justify-between mb-2">
                  <span className="text-[0.62rem] text-[var(--ink)]">{dx.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1 bg-[var(--linen)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--brand)] rounded-full" style={{ width: `${dx.score}%` }} />
                    </div>
                    <div className="flex gap-1">
                      <button className="text-[0.55rem] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">✓</button>
                      <button className="text-[0.55rem] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">✗</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-[var(--border)]">
              <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--brand)] mb-2">Care Plan Actions</div>
              {[
                { action: "Initiate IV antibiotics", urgency: "IMMEDIATE" },
                { action: "Perform urgent CT scan", urgency: "1-2 HRS" },
                { action: "Lumbar puncture analysis", urgency: "AFTER CT" },
              ].map((cp) => (
                <div key={cp.action} className="flex items-center justify-between mb-1.5">
                  <span className="text-[0.62rem] text-[var(--ink)]">{cp.action}</span>
                  <span className={`text-[0.52rem] font-bold px-1.5 py-0.5 rounded-full ${cp.urgency === "IMMEDIATE" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>{cp.urgency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

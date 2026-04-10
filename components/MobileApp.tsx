import Image from "next/image";

export default function MobileApp() {
  const mobileFeatures = [
    "Record consultations at bedside without a laptop",
    "Photograph physical lab reports, X-rays, or ECG printouts",
    "Access the full reasoning engine and care plan on the go",
    "Dictate and review clinical letters between patients",
    "Works offline for environments with limited connectivity",
  ];

  return (
    <section id="mobile" className="py-24 px-[5%] bg-[var(--off)] overflow-hidden" aria-labelledby="mobile-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="sr-hidden">
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
              Mobile App
            </div>
            <h2 id="mobile-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08] mb-5">
              The full clinical OS.{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
                In your pocket.
              </span>
            </h2>
            <p className="text-[var(--sage)] text-[0.97rem] leading-relaxed mb-8">
              The native iOS and Android app brings the complete Mendalia platform to every clinical setting — ED corridors, ward rounds, remote clinics, and everything in between.
            </p>
            <ul className="flex flex-col gap-4 mb-8">
              {mobileFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--brand-mist)] border border-[var(--border)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[var(--sage)] text-[0.9rem] leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 flex-wrap">
              <a href="#" className="flex items-center gap-2.5 bg-[var(--ink)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--ink2)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div>
                  <div className="text-[0.58rem] opacity-60">Download on the</div>
                  <div className="text-[0.82rem] font-bold -mt-0.5">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2.5 bg-[var(--ink)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--ink2)] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.18 23.76c.28.15.59.23.9.23.4 0 .79-.12 1.12-.33L16.87 17l-3.52-3.52L3.18 23.76zM20.67 9.59L17.78 8l-3.84 3.83 3.84 3.84 2.9-1.59c.83-.45.83-1.54-.01-2.49zM1.08 1.4C1.03 1.59 1 1.79 1 2v20c0 .21.03.41.08.6l.04.03 11.2-11.2v-.27L1.12 1.37l-.04.03zM16.87 7l-11.67-6.7c-.33-.21-.72-.33-1.12-.33-.31 0-.62.08-.9.23l10.17 10.17L16.87 7z"/></svg>
                <div>
                  <div className="text-[0.58rem] opacity-60">Get it on</div>
                  <div className="text-[0.82rem] font-bold -mt-0.5">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center items-center min-h-[500px] sr-hidden">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle,rgba(10,107,90,0.08),transparent 70%)", filter: "blur(40px)" }} aria-hidden="true" />
            <div className="relative mobile-float">
              <div className="relative w-[240px] h-[500px] bg-[var(--ink)] rounded-[40px] border-[5px] border-[#1A2620] shadow-[0_40px_120px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-[var(--ink)] rounded-full z-10" />
                {/* Screen content */}
                <div className="absolute inset-[4px] rounded-[36px] bg-[#EFF7F5] overflow-hidden">
                  <div className="bg-[var(--brand)] h-14 flex items-end px-4 pb-2">
                    <div className="text-white font-black text-[0.7rem]">mendalia AI</div>
                  </div>
                  <div className="p-3">
                    <div className="bg-white rounded-xl p-3 mb-2 shadow-sm">
                      <div className="text-[0.55rem] font-bold text-[var(--muted)] mb-1">PATIENT</div>
                      <div className="text-[0.65rem] font-bold text-[var(--ink)]">ML, Male 49 Y</div>
                      <div className="text-[0.55rem] text-[var(--sage)]">Comprehensive Analysis</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 mb-2 shadow-sm">
                      <div className="text-[0.55rem] font-bold text-[var(--brand)] mb-1">PRIMARY IMPRESSION</div>
                      <div className="text-[0.62rem] font-bold text-[var(--ink)]">Meningitis / Encephalitis</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-12 h-1 bg-[var(--linen)] rounded-full overflow-hidden"><div className="h-full bg-[var(--brand)] rounded-full w-[80%]" /></div>
                        <span className="text-[0.5rem] text-amber-600 font-bold">Medium</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="text-[0.55rem] font-bold text-[var(--brand)] mb-2">CARE PLAN</div>
                      {["IV Antibiotics","CT Head","LP Analysis"].map((a, i) => (
                        <div key={a} className="flex items-center gap-2 mb-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-red-500" : "bg-amber-500"}`} />
                          <span className="text-[0.55rem] text-[var(--sage)]">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Record button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg recording-ring">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

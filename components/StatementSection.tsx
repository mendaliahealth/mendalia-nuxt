export default function StatementSection() {
  const steps = [
    { num: "01", title: "Speak. In any language. In any setting.", desc: "Record in Arabic, Mandarin, Hindi, English, or dozens more. Works in ED, outpatient, wards, and remote settings. Uploads too.", badge: "Unique" },
    { num: "02", title: "AI reasons through the full case.", desc: "Primary impression, differential with clinical evidence and likelihood scores. Accept or reject each diagnosis.", badge: "Unique" },
    { num: "03", title: "Complete care plan — every time.", desc: "Urgency-coded actions, investigation plan, medication safety with contraindications and monitoring requirements.", badge: "Unique" },
    { num: "04", title: "Every letter. Challenge the case. Change the language.", desc: "Referral, patient, and clinical letters instantly. Ask the AI to challenge, explain, or translate — in the chat.", badge: "Unique" },
  ];

  return (
    <section className="bg-[var(--ink)] py-24 px-[5%] relative overflow-hidden">
      <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(10,107,90,0.12),transparent 65%)" }} aria-hidden="true" />
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[rgba(77,217,172,0.8)] mb-5 sr-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DD9AC]" />
            Only Mendalia
          </div>
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-black tracking-tight text-white leading-[1.05] mb-5 sr-hidden">
            The only platform that goes from words{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg,#4DD9AC,#0A6B5A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              to diagnosis
            </span>{" "}
            — completely.
          </h2>
          <p className="text-white/40 text-[0.95rem] leading-[1.8] mb-8 sr-hidden">
            Every other tool stops at notes. Mendalia reasons through the full case: differential, care plan, medications, and letters. Then keeps the conversation going through a case discussion AI that knows everything.
          </p>
          <a href="#product" className="inline-flex items-center gap-2 bg-[var(--brand)] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[var(--brand-light)] transition-all hover:-translate-y-0.5 sr-hidden">
            See the full workflow
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="flex gap-4 items-start bg-white/[0.04] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.07] hover:border-[rgba(10,107,90,0.3)] hover:translate-x-1.5 transition-all duration-300 sr-hidden"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="w-7 h-7 rounded-xl bg-[rgba(10,107,90,0.2)] flex items-center justify-center flex-shrink-0 text-[0.65rem] font-black text-[#4DD9AC]">
                {s.num}
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-[0.87rem] mb-1">{s.title}</div>
                <div className="text-white/40 text-[0.78rem] leading-relaxed">{s.desc}</div>
              </div>
              <div className="text-[0.55rem] font-black tracking-widest uppercase text-[#4DD9AC] bg-[rgba(10,107,90,0.15)] border border-[rgba(10,107,90,0.25)] px-2 py-1 rounded-full flex-shrink-0">
                {s.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

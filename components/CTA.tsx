export default function CTA() {
  return (
    <section className="relative py-28 px-[5%] bg-[var(--ink)] overflow-hidden text-center" aria-labelledby="cta-title">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(10,107,90,0.18),transparent 65%)", filter: "blur(80px)" }} aria-hidden="true" />
      <div className="relative z-10 max-w-[740px] mx-auto">
        <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-white/25 mb-6 sr-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          Get started today
        </div>
        <h2 id="cta-title" className="text-[clamp(2rem,4.5vw,3.8rem)] font-black tracking-tight text-white leading-[1.05] mb-6 sr-hidden">
          The ambient reasoning engine.
          <br />
          <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg,#4DD9AC,#0D8A72)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            By your side.
          </span>
          <br />
          Starting free.
        </h2>
        <p className="text-white/40 text-[0.97rem] leading-relaxed mb-10 sr-hidden">
          Join 200+ clinicians worldwide who have made Mendalia the operating system for their clinical day.
        </p>
        <div className="flex gap-4 justify-center flex-wrap sr-hidden">
          <a
            href="#pricing"
            className="bg-[var(--brand)] text-white font-bold px-10 py-4 rounded-full text-[0.96rem] hover:bg-[var(--brand-light)] transition-all hover:-translate-y-0.5 shadow-[0_4px_30px_rgba(10,107,90,0.4)]"
          >
            Get started free
          </a>
          <a
            href="mailto:hello@mendalia.com"
            className="border border-white/20 text-white font-bold px-10 py-4 rounded-full text-[0.96rem] hover:border-[#4DD9AC] hover:text-[#4DD9AC] transition-all"
          >
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
}

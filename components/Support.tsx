"use client";

export default function Support() {
  return (
    <section id="support" className="py-24 px-[5%] bg-white" aria-labelledby="support-title">
      <div className="max-w-[820px] mx-auto text-center">

        <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
          Support
        </div>

        <h2 id="support-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08] mb-5">
          We're here when{" "}
          <br />
          <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
            you need us.
          </span>
        </h2>

        <p className="text-[var(--sage)] text-base leading-[1.8] max-w-[520px] mx-auto mb-12">
          Have a question, hit a snag, or want to talk through how Mendalia fits your workflow? Our team reads every message and gets back to you promptly — usually within one business day.
        </p>

        
          href="mailto:connect@mendalia.com"
          className="inline-flex items-center gap-2.5 bg-[var(--brand)] text-white text-[0.9rem] font-semibold no-underline px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          connect@mendalia.com
        </a>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: "General enquiries",
              desc: "Questions about features, plans, or getting started with Mendalia.",
              icon: <circle cx="12" cy="12" r="10"/>,
            },
            {
              title: "Privacy & security",
              desc: "Questions about data handling, HIPAA, GDPR, or audit trails.",
              icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
            },
            {
              title: "Enterprise & integrations",
              desc: "Multi-clinician workspaces, EHR integration, or custom onboarding.",
              icon: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[var(--border)] rounded-2xl p-6 text-left">
              <div className="w-9 h-9 bg-[var(--brand-mist)] rounded-[10px] flex items-center justify-center mb-3.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </div>
              <p className="font-bold text-[0.88rem] text-[var(--ink)] mb-1.5">{item.title}</p>
              <p className="text-[0.82rem] text-[var(--sage)] leading-[1.7]">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[0.8rem] text-[var(--sage)] opacity-70">
          Typical response time: within one business day · Sydney, Australia
        </p>

      </div>
    </section>
  );
}
const SPECIALTIES = [
  "Emergency Medicine","Internal Medicine","General Practice",
  "Cardiology","Neurology","Psychiatry","Dermatology","Oncology",
  "Paediatrics","Obstetrics and Gynaecology","Orthopaedics","Surgery",
  "Radiology","Pathology","Infectious Disease","Geriatrics",
  "Endocrinology","Nephrology","Pulmonology","Gastroenterology",
  "Rheumatology","Haematology","Ophthalmology","ENT",
];

export default function Specialties() {
  return (
    <section id="features" className="py-24 px-[5%] bg-[var(--ink)]" aria-labelledby="specialties-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-14 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[rgba(77,217,172,0.8)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DD9AC]" />
            Built for your specialty
          </div>
          <h2 id="specialties-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-white leading-[1.08]">
            Every specialty.{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg,#4DD9AC,#0A6B5A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              One platform.
            </span>
          </h2>
          <p className="text-white/40 text-[0.97rem] mt-3 max-w-[500px] mx-auto leading-relaxed">
            The clinical reasoning engine is trained to understand specialty-specific context, terminology, and decision-making patterns.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center sr-hidden">
          {SPECIALTIES.map((spec, i) => (
            <div
              key={spec}
              className="bg-white/5 border border-white/10 text-white/60 text-[0.78rem] font-medium px-4 py-2 rounded-full hover:bg-white/10 hover:text-white hover:border-[rgba(77,217,172,0.3)] transition-all duration-200 cursor-default"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              {spec}
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sr-hidden">
          {[
            {
              icon: "🧠",
              title: "Specialty-aware reasoning",
              desc: "The differential diagnosis engine understands the clinical patterns, red flags, and standard-of-care protocols unique to each specialty.",
            },
            {
              icon: "🌐",
              title: "50+ languages natively",
              desc: "Scribe in any language without translation loss. The AI understands clinical context across languages as a native speaker would.",
            },
            {
              icon: "⚡",
              title: "Any clinical setting",
              desc: "Emergency department, outpatient clinic, inpatient ward, telehealth, or rural setting. Mendalia adapts to the pace and context automatically.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-200">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-white font-bold text-[1rem] mb-3">{item.title}</h3>
              <p className="text-white/40 text-[0.84rem] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Compliance() {
  const badges = [
    { name: "HIPAA", desc: "Health Insurance Portability and Accountability Act", icon: "🛡️" },
    { name: "ISO 27001", desc: "Information Security Management", icon: "🔐" },
    { name: "SOC 2", desc: "Service Organisation Control", icon: "✅" },
    { name: "ISO 9001", desc: "Quality Management Systems", icon: "📋" },
    { name: "ISO 42001", desc: "Artificial Intelligence Management", icon: "🤖" },
    { name: "GDPR", desc: "General Data Protection Regulation", icon: "🇪🇺" },
  ];

  return (
    <section className="py-24 px-[5%] bg-white" aria-labelledby="compliance-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="sr-hidden">
            <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
              Security and Compliance
            </div>
            <h2 id="compliance-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08] mb-5">
              Built with compliance{" "}
              <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
                in mind.
              </span>
            </h2>
            <p className="text-[var(--sage)] text-[0.97rem] leading-relaxed mb-5">
              Patient data is the most sensitive data that exists. Mendalia is architected from the ground up with privacy-first principles, enterprise-grade encryption, and a commitment to every major international health data standard.
            </p>
            <p className="text-[var(--sage)] text-[0.9rem] leading-relaxed mb-8">
              Every AI-assisted clinical decision is logged and auditable. We never sell or share patient data with third parties. Our infrastructure is designed to meet HIPAA, GDPR, and the emerging ISO 42001 standard for AI management — because trust in healthcare AI is non-negotiable.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "AES-256 Encryption at Rest" },
                { label: "TLS 1.3 in Transit" },
                { label: "Full Audit Trail" },
                { label: "No Data Selling" },
                { label: "Zero-Knowledge Architecture" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-[var(--brand-mist)] border border-[var(--border)] rounded-full px-4 py-1.5">
                  <svg className="w-3.5 h-3.5 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[0.72rem] font-semibold text-[var(--brand)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sr-hidden">
            {/* HIPAA highlight */}
            <div className="bg-[var(--ink)] rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[rgba(77,217,172,0.12)] border border-[rgba(77,217,172,0.2)] flex items-center justify-center text-2xl shield-glow">
                  🛡️
                </div>
                <div>
                  <div className="text-white font-black text-lg">HIPAA Compliant</div>
                  <div className="text-white/40 text-[0.72rem]">Health Insurance Portability and Accountability Act</div>
                </div>
              </div>
              <p className="text-white/50 text-[0.82rem] leading-relaxed">
                Mendalia adheres to HIPAA requirements for the protection of individually identifiable health information. Our Business Associate Agreement (BAA) is available for all enterprise deployments.
              </p>
            </div>

            {/* Compliance grid */}
            <div className="grid grid-cols-2 gap-3">
              {badges.slice(1).map((b) => (
                <div key={b.name} className="bg-[var(--off)] border border-[var(--border)] rounded-2xl p-4 card-hover">
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <div className="font-black text-[var(--ink)] text-[0.9rem]">{b.name}</div>
                  <div className="text-[var(--muted)] text-[0.66rem] mt-0.5 leading-snug">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const ROWS = [
  { capability: "Ambient multilingual scribing (50+ languages)", mendalia: true, heidi: "partial", glass: false },
  { capability: "Real-time clinical gap detection during consultation", mendalia: true, heidi: false, glass: false },
  { capability: "AI clinical reasoning engine", mendalia: true, heidi: false, glass: "partial" },
  { capability: "Differential diagnosis with evidence and likelihood", mendalia: true, heidi: false, glass: "partial" },
  { capability: "Accept or reject diagnosis workflow", mendalia: true, heidi: false, glass: false },
  { capability: "Full care plan with urgency-coded actions", mendalia: true, heidi: false, glass: false },
  { capability: "Medication safety and contraindication review", mendalia: true, heidi: false, glass: false },
  { capability: "Investigation planning and prioritisation", mendalia: true, heidi: "partial", glass: "partial" },
  { capability: "All letter types (referral, patient, clinical)", mendalia: true, heidi: true, glass: true },
  { capability: "Imaging upload and multimodal analysis", mendalia: true, heidi: false, glass: false },
  { capability: "Camera report capture (mobile)", mendalia: true, heidi: false, glass: false },
  { capability: "Context-aware case discussion AI", mendalia: true, heidi: false, glass: "partial" },
  { capability: "Native iOS and Android app", mendalia: true, heidi: true, glass: false },
  { capability: "Free tier (no credit card required)", mendalia: true, heidi: true, glass: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <span className="text-[var(--brand)] font-bold text-[0.78rem]">✓</span>;
  if (value === false) return <span className="text-red-400 text-[0.78rem]">✕</span>;
  return <span className="text-amber-500 text-[0.72rem] font-semibold">Partial</span>;
}

export default function CompareSection() {
  return (
    <section className="py-24 px-[5%] bg-white" aria-labelledby="compare-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-12 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            How we compare
          </div>
          <h2 id="compare-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            Nothing else does{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
              all of this.
            </span>
          </h2>
          <p className="text-[var(--sage)] text-[0.97rem] mt-3 max-w-[520px] mx-auto leading-relaxed">
            Every other tool stops somewhere. Mendalia is the only platform covering the complete clinical workflow, end to end.
          </p>
        </div>

        <div className="overflow-x-auto sr-hidden">
        <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] bg-[var(--off)] border-b border-[var(--border)]">
            <div className="p-4 text-[0.72rem] font-bold text-[var(--muted)] uppercase tracking-widest">Capability</div>
            <div className="p-4 text-center">
              <div className="inline-flex flex-col items-center gap-1">
                <span className="text-[0.72rem] font-black text-[var(--brand)] uppercase tracking-wider">Mendalia</span>
                <span className="text-[0.55rem] text-[var(--brand)] bg-[var(--brand-mist)] px-2 py-0.5 rounded-full">Full Platform</span>
              </div>
            </div>
            <div className="p-4 text-center">
              <span className="text-[0.72rem] font-bold text-[var(--muted)] uppercase tracking-wider">Other Scribing Tools</span>
            </div>
            <div className="p-4 text-center">
              <span className="text-[0.72rem] font-bold text-[var(--muted)] uppercase tracking-wider">Other reasoning engines</span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.capability}
              className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-[var(--border)] last:border-0 hover:bg-[var(--off)] transition-colors ${i % 2 === 0 ? "" : "bg-[rgba(10,107,90,0.01)]"}`}
            >
              <div className="p-4 text-[0.82rem] text-[var(--sage)]">{row.capability}</div>
              <div className="p-4 flex justify-center items-center"><Cell value={row.mendalia} /></div>
              <div className="p-4 flex justify-center items-center"><Cell value={row.heidi} /></div>
              <div className="p-4 flex justify-center items-center"><Cell value={row.glass} /></div>
            </div>
          ))}
        </div>
        </div>

        <div className="text-center mt-8 sr-hidden">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[0.84rem] font-bold text-[var(--brand)] hover:text-[var(--brand-light)] transition-colors"
          >
            See the full detailed comparison
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

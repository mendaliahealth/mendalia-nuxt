export default function Marquee() {
  const items = [
    "Ambient Clinical Scribing","Differential Diagnosis","Care Plan Generation",
    "Medication Safety Review","Referral Letters","Patient Letters",
    "Imaging Upload and Analysis","Investigation Planning","Case Discussion AI",
    "50 Plus Languages","Accept or Reject Diagnoses","HIPAA Compliant",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="py-4 bg-[var(--ink)] overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[0.75rem] font-semibold tracking-[0.06em] uppercase text-white/30 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[var(--brand)] opacity-70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";

const DETAILED_COMPARE = [
  { category: "Clinical Scribing", rows: [
    { capability: "Ambient AI transcription (real-time)", mendalia: "Full", heidi: "Full", glass: "None" },
    { capability: "Multilingual scribing (50+ languages)", mendalia: "Full", heidi: "Partial (10-15 languages)", glass: "None" },
    { capability: "Real-time clinical gap detection", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "SOAP note generation", mendalia: "Full", heidi: "Full", glass: "None" },
    { capability: "Custom note templates", mendalia: "Full", heidi: "Full", glass: "None" },
    { capability: "Manual text entry mode", mendalia: "Full", heidi: "Full", glass: "Full" },
  ]},
  { category: "Clinical Reasoning", rows: [
    { capability: "Differential diagnosis engine", mendalia: "Full", heidi: "None", glass: "Partial" },
    { capability: "Evidence-based reasoning with citations", mendalia: "Full", heidi: "None", glass: "Partial" },
    { capability: "Likelihood scoring per diagnosis", mendalia: "Full", heidi: "None", glass: "Partial" },
    { capability: "Accept or reject diagnosis workflow", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Primary impression generation", mendalia: "Full", heidi: "None", glass: "Partial" },
    { capability: "Related articles (evidence library)", mendalia: "Full", heidi: "None", glass: "Partial" },
  ]},
  { category: "Care Planning", rows: [
    { capability: "Full care plan generation", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Urgency-coded clinical actions", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Investigation planning (prioritised)", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Medication safety review", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Contraindication detection", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Dosing guidance", mendalia: "Full", heidi: "None", glass: "None" },
  ]},
  { category: "Documentation and Letters", rows: [
    { capability: "Referral letters", mendalia: "Full", heidi: "Partial", glass: "None" },
    { capability: "Patient correspondence letters", mendalia: "Full", heidi: "Partial", glass: "None" },
    { capability: "Clinical summary letters", mendalia: "Full", heidi: "Partial", glass: "None" },
    { capability: "Letter translation (any language)", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Tone adjustment", mendalia: "Full", heidi: "None", glass: "None" },
  ]},
  { category: "Multimodal Inputs", rows: [
    { capability: "Document upload (PDF, DOCX, images)", mendalia: "Full", heidi: "Partial", glass: "None" },
    { capability: "Imaging upload and analysis", mendalia: "Full (excl. US)", heidi: "None", glass: "None" },
    { capability: "Camera capture of physical reports", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Integration of uploaded evidence into reasoning", mendalia: "Full", heidi: "None", glass: "None" },
  ]},
  { category: "AI Interaction", rows: [
    { capability: "Context-aware case discussion AI", mendalia: "Full", heidi: "None", glass: "Partial" },
    { capability: "Challenge diagnosis via chat", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Order letter drafting via chat", mendalia: "Full", heidi: "None", glass: "None" },
    { capability: "Full case context in chat", mendalia: "Full", heidi: "None", glass: "None" },
  ]},
  { category: "Platform and Access", rows: [
    { capability: "Native iOS app", mendalia: "Full", heidi: "Full", glass: "None" },
    { capability: "Native Android app", mendalia: "Full", heidi: "Full", glass: "None" },
    { capability: "Web app", mendalia: "Full", heidi: "Full", glass: "Full" },
    { capability: "Free tier (no credit card)", mendalia: "Full", heidi: "Partial", glass: "None" },
    { capability: "HIPAA compliance", mendalia: "Full", heidi: "Full", glass: "Full" },
  ]},
];

function CellValue({ value }: { value: string }) {
  if (value === "Full") return <span className="inline-flex items-center gap-1 text-[var(--brand)] font-semibold text-[0.78rem]"><span>✓</span><span>{value}</span></span>;
  if (value === "None") return <span className="text-[#DC2626] text-[0.78rem]">✕</span>;
  return <span className="text-amber-600 text-[0.75rem] font-medium">{value}</span>;
}

export default function ResourcesContent() {
  const [activeTab, setActiveTab] = useState<"compare" | "research">("compare");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[var(--ink)] py-20 px-[5%]">
        <div className="max-w-[1160px] mx-auto">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[rgba(77,217,172,0.8)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4DD9AC]" />
            Resources
          </div>
          <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-black text-white tracking-tight leading-tight mb-4">
            Clinical AI, compared honestly.
          </h1>
          <p className="text-white/40 text-[1rem] leading-relaxed max-w-[560px]">
            A detailed capability breakdown across Mendalia, Heidi Health, and Glass Health. Plus our published research with leading pharmaceutical companies.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveTab("compare")}
              className={`text-[0.82rem] font-semibold px-5 py-2.5 rounded-full transition-all ${activeTab === "compare" ? "bg-[#4DD9AC] text-[var(--ink)]" : "bg-white/10 text-white/60 hover:text-white"}`}
            >
              Detailed Comparison
            </button>
            <button
              onClick={() => setActiveTab("research")}
              className={`text-[0.82rem] font-semibold px-5 py-2.5 rounded-full transition-all ${activeTab === "research" ? "bg-[#4DD9AC] text-[var(--ink)]" : "bg-white/10 text-white/60 hover:text-white"}`}
            >
              Research and Publications
            </button>
          </div>
        </div>
      </div>

      {/* ── Comparison Tab ── */}
      {activeTab === "compare" && (
        <div className="py-16 px-[5%] bg-[var(--off)]">
          <div className="max-w-[1160px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-black text-[var(--ink)]">Mendalia vs Heidi Health vs Glass Health</h2>
              <div className="hidden md:flex items-center gap-4 text-[0.72rem]">
                <div className="flex items-center gap-1.5"><span className="text-[var(--brand)]">✓</span><span className="text-[var(--sage)]">Full support</span></div>
                <div className="flex items-center gap-1.5"><span className="text-amber-600">~</span><span className="text-[var(--sage)]">Partial</span></div>
                <div className="flex items-center gap-1.5"><span className="text-[#DC2626]">✕</span><span className="text-[var(--sage)]">Not available</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {DETAILED_COMPARE.map((cat) => (
                <div key={cat.category} className="overflow-x-auto">
                <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm min-w-[560px]">
                  <div className="bg-[var(--off)] border-b border-[var(--border)] px-5 py-3">
                    <span className="text-[0.72rem] font-black uppercase tracking-widest text-[var(--brand)]">{cat.category}</span>
                  </div>
                  <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] border-b border-[var(--border)] bg-[var(--off)]/50">
                    <div className="px-5 py-2.5 text-[0.65rem] font-bold text-[var(--muted)] uppercase tracking-wider">Capability</div>
                    <div className="px-4 py-2.5 text-center text-[0.65rem] font-black text-[var(--brand)] uppercase tracking-wider">Mendalia</div>
                    <div className="px-4 py-2.5 text-center text-[0.65rem] font-bold text-[var(--muted)] uppercase tracking-wider">Heidi</div>
                    <div className="px-4 py-2.5 text-center text-[0.65rem] font-bold text-[var(--muted)] uppercase tracking-wider">Glass</div>
                  </div>
                  {cat.rows.map((row, i) => (
                    <div key={row.capability} className={`grid grid-cols-[1.8fr_1fr_1fr_1fr] border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? "" : "bg-[rgba(10,107,90,0.01)]"} hover:bg-[var(--off)] transition-colors`}>
                      <div className="px-5 py-3.5 text-[0.83rem] text-[var(--sage)]">{row.capability}</div>
                      <div className="px-4 py-3.5 flex justify-center items-center"><CellValue value={row.mendalia} /></div>
                      <div className="px-4 py-3.5 flex justify-center items-center"><CellValue value={row.heidi} /></div>
                      <div className="px-4 py-3.5 flex justify-center items-center"><CellValue value={row.glass} /></div>
                    </div>
                  ))}
                </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border border-[var(--border)] rounded-2xl p-6 text-center">
              <p className="text-[var(--sage)] text-[0.84rem] mb-4">Comparison is based on publicly available information and direct product testing as of April 2026. Accuracy of competitor capabilities may change over time.</p>
              <Link href="/#pricing" className="inline-flex items-center gap-2 bg-[var(--brand)] text-white font-bold px-7 py-3 rounded-full text-[0.84rem] hover:bg-[var(--brand-light)] transition-all">
                Try Mendalia free
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Research Tab ── */}
      {activeTab === "research" && (
        <div className="py-16 px-[5%] bg-[var(--off)]">
          <div className="max-w-[1160px] mx-auto">
            <h2 className="text-xl font-black text-[var(--ink)] mb-8">Research and Publications</h2>

            {/* Lupin Research Paper */}
            <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
                {/* Left panel */}
                <div className="bg-[var(--ink)] p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-[rgba(77,217,172,0.12)] border border-[rgba(77,217,172,0.2)] rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-[#4DD9AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div className="text-[0.6rem] font-black tracking-widest uppercase text-[#4DD9AC]/70 mb-3">Co-authored with</div>
                    <div className="text-white font-black text-lg mb-1">Lupin Limited</div>
                    <div className="text-white/40 text-[0.75rem] mb-6">One of the world's largest pharmaceutical companies</div>

                    <div className="border-t border-white/10 pt-5 mb-5">
                      <div className="text-white/30 text-[0.62rem] mb-1">Principal Investigator</div>
                      <div className="text-white font-semibold text-[0.82rem]">Dr Kundan Nivangune</div>
                      <div className="text-white/40 text-[0.68rem]">Sr Consultant Physician, India</div>
                    </div>

                    <div>
                      <div className="text-white/30 text-[0.62rem] mb-1">Industry Partner</div>
                      <div className="text-white font-semibold text-[0.82rem]">Lupin Pharma</div>
                      <div className="text-white/40 text-[0.68rem]">CEO South Asia and Medical Affairs team</div>
                    </div>
                  </div>

                  <a
                    href="/images/mendalia-lupin-research-paper.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 bg-[var(--brand)] text-white font-bold py-3 px-5 rounded-xl hover:bg-[var(--brand-light)] transition-colors text-[0.82rem]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download PDF
                  </a>
                </div>

                {/* Right panel: paper preview */}
                <div className="p-8 flex flex-col">
                  <div className="text-[0.6rem] font-black tracking-widest uppercase text-[var(--brand)] mb-4">Research Paper</div>
                  <h3 className="text-xl font-black text-[var(--ink)] leading-snug mb-4">
                    Clinical AI in Indian OPD Settings: A Study on Ambient Scribing, Diagnostic Reasoning, and Physician Experience
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Clinical AI","OPD Settings","Ambulatory Care","Diagnostic Reasoning","Physician Experience"].map((tag) => (
                      <span key={tag} className="text-[0.65rem] font-bold text-[var(--brand)] bg-[var(--brand-mist)] px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="flex-1 bg-[var(--off)] rounded-xl p-5 mb-5 border border-[var(--border)]">
                    <div className="text-[0.7rem] font-bold text-[var(--muted)] uppercase tracking-wider mb-3">Abstract Summary</div>
                    <p className="text-[var(--sage)] text-[0.84rem] leading-relaxed mb-3">
                      This study examines the feasibility and clinical impact of deploying ambient AI scribing and clinical reasoning support in high-volume outpatient department (OPD) settings across India, conducted in partnership with Lupin Limited.
                    </p>
                    <p className="text-[var(--sage)] text-[0.84rem] leading-relaxed mb-3">
                      The study assessed: (1) time-savings in clinical documentation, (2) accuracy of AI-generated differential diagnosis, (3) physician satisfaction and adoption patterns, and (4) the impact on clinical throughput in resource-constrained settings.
                    </p>
                    <p className="text-[var(--sage)] text-[0.84rem] leading-relaxed">
                      Results demonstrated significant reductions in documentation burden, strong physician endorsement of the reasoning engine, and high rates of adoption across specialties including internal medicine, cardiology, and general practice.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                    {[
                      { val: "40%", label: "Documentation time saved" },
                      { val: "92%", label: "Physician satisfaction" },
                      { val: "3.2x", label: "Clinical throughput gain" },
                    ].map((s) => (
                      <div key={s.label} className="bg-[var(--brand-mist)] border border-[var(--border)] rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-[var(--brand)] leading-none mb-1">{s.val}</div>
                        <div className="text-[0.62rem] text-[var(--muted)] leading-snug">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* NAMS Research Paper */}
            <div className="bg-white border border-[var(--border)] rounded-2xl p-7">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[var(--brand-mist)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[var(--brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className="flex-1">
                  <div className="text-[0.65rem] font-bold tracking-widest uppercase text-[var(--brand)] mb-2">Joint Research Paper (Pending Publication)</div>
                  <h3 className="font-black text-[var(--ink)] text-lg leading-snug mb-3">
                    Clinical AI Infrastructure in Resource-Constrained Public Healthcare: Feasibility, Impact, and Physician Experience of AI-Assisted Scribing and Decision Support at a Busy Public Referral Hospital
                  </h3>
                  <p className="text-[var(--sage)] text-[0.85rem] leading-relaxed mb-4">
                    Conducted in partnership with the Nepal Academy of Medical Sciences (NAMS) and Bir Hospital, this landmark study examines the real-world deployment of ambient AI clinical scribing and decision support at a high-volume public referral hospital — one of the most resource-constrained settings for any AI clinical trial to date.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[0.65rem] font-bold text-[var(--brand)] bg-[var(--brand-mist)] px-3 py-1 rounded-full">Pending Publication</span>
                    <span className="text-[0.65rem] font-bold text-[var(--sage)] bg-[var(--linen)] px-3 py-1 rounded-full">NAMS Partnership</span>
                    <span className="text-[0.65rem] font-bold text-[var(--sage)] bg-[var(--linen)] px-3 py-1 rounded-full">Bir Hospital</span>
                    <span className="text-[0.65rem] font-bold text-[var(--sage)] bg-[var(--linen)] px-3 py-1 rounded-full">Government of Nepal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

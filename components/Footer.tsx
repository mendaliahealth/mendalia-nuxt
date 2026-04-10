"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LEGAL_CONTENT = {
  tnc: {
    title: "Terms and Conditions",
    sections: [
      { heading: "1. Acceptance of Terms", body: "By accessing or using Mendalia AI, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the platform. Mendalia AI is operated by Sirohi Corporation Pty Ltd (ABN 73 683 661 181), headquartered in Sydney, Australia." },
      { heading: "2. Clinical Disclaimer", body: "Mendalia AI is a clinical decision support tool and is NOT a substitute for professional medical judgment. All AI-generated content — including differential diagnoses, care plans, and clinical letters — must be reviewed and verified by a qualified clinician before use. The clinician retains full clinical responsibility for all patient care decisions." },
      { heading: "3. Permitted Use", body: "Mendalia is intended for use by licensed healthcare professionals in clinical settings. You must not use Mendalia to provide direct medical advice to patients without appropriate clinical oversight, or in any way that violates applicable laws and regulations." },
      { heading: "4. Intellectual Property", body: "All content, software, and technology within the Mendalia platform is the intellectual property of Sirohi Corporation Pty Ltd. You may not copy, reverse-engineer, or redistribute any part of the platform without written permission." },
      { heading: "5. Limitation of Liability", body: "To the fullest extent permitted by law, Sirohi Corporation Pty Ltd shall not be liable for any clinical outcomes, errors, or damages arising from reliance on AI-generated content. All clinical decisions remain the sole responsibility of the treating clinician." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { heading: "1. Data We Collect", body: "We collect information necessary to provide the Mendalia service, including account details, consultation transcripts (processed in real time), and uploaded clinical documents. We do not collect more data than is necessary." },
      { heading: "2. How We Use Data", body: "Patient data is used solely to generate clinical outputs (transcripts, diagnoses, care plans, letters) within your session. We do not use patient data to train AI models without explicit written consent from the institution." },
      { heading: "3. Data Storage and Security", body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We store data on secure cloud infrastructure in compliance with applicable data residency requirements. Audit logs are maintained for all AI-assisted decisions." },
      { heading: "4. Data Sharing", body: "We do not sell, share, or monetise patient data with any third party, ever. Data may only be shared where required by law or with your explicit consent." },
      { heading: "5. Your Rights", body: "You have the right to access, correct, or delete your personal data at any time. Contact privacy@mendalia.com to exercise these rights. We will respond within 30 days." },
    ],
  },
  clinical: {
    title: "Clinical Safety",
    sections: [
      { heading: "AI as a Support Tool", body: "Mendalia is designed as a clinical decision support system, not a diagnostic authority. The platform is intended to augment — not replace — clinical judgment. All outputs must be reviewed by a qualified clinician." },
      { heading: "Accuracy and Limitations", body: "While the clinical reasoning engine is trained on extensive medical knowledge, it may make errors, particularly in rare conditions, atypical presentations, or complex multi-morbidity cases. Clinicians should apply their own judgment at all times." },
      { heading: "Reporting Concerns", body: "If you identify a clinical safety concern with Mendalia output, please report it immediately to safety@mendalia.com. We take all safety reports seriously and investigate them within 24 hours." },
    ],
  },
};

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<keyof typeof LEGAL_CONTENT>("tnc");

  const openLegal = (tab: keyof typeof LEGAL_CONTENT) => { setLegalTab(tab); setLegalOpen(true); };

  return (
    <>
      <footer className="bg-[var(--ink)] pt-16 pb-8 px-[5%]">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Image src="/images/mendalia-logo-light.png" alt="Mendalia AI" width={140} height={36} className="mb-4 brightness-0 invert" />
              <p className="text-white/40 text-[0.84rem] leading-relaxed mb-5 max-w-[320px]">
                The AI-native Ambient Clinical Reasoning Engine. From spoken words to complete diagnosis. End to end.
              </p>
              <p className="text-white/20 text-[0.72rem] leading-relaxed mb-6">
                Mendalia AI<br />
                Trading under <span className="text-white/30">Sirohi Corporation Pty Ltd</span><br />
                ABN: 73 683 661 181 · ACN: 683 661 181<br />
                Headquartered in Sydney, Australia
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Terms", tab: "tnc" as const },
                  { label: "Privacy", tab: "privacy" as const },
                  { label: "Clinical Safety", tab: "clinical" as const },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => openLegal(item.tab)}
                    className="text-white/30 text-[0.7rem] hover:text-white/60 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h5 className="text-white text-[0.78rem] font-bold mb-4">Product</h5>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Reasoning Engine", href: "#product" },
                  { label: "Multilingual Scribing", href: "#product" },
                  { label: "Care Plans", href: "#product" },
                  { label: "Clinical Letters", href: "#product" },
                  { label: "Mobile Apps", href: "#mobile" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Resources", href: "/resources" },
                ].map((l) => (
                  <Link key={l.label} href={l.href} className="text-white/35 text-[0.78rem] hover:text-white/70 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div>
              <h5 className="text-white text-[0.78rem] font-bold mb-4">Specialties</h5>
              <div className="flex flex-col gap-2.5">
                {["Emergency Medicine","Internal Medicine","General Practice","Cardiology","Neurology","Dermatology","Oncology","Paediatrics"].map((s) => (
                  <span key={s} className="text-white/35 text-[0.78rem]">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-[0.72rem]">
              {new Date().getFullYear()} Sirohi Corporation Pty Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: "HIPAA", icon: "🛡️" },
                { name: "ISO 27001", icon: "🔐" },
                { name: "SOC 2", icon: "✅" },
              ].map((b) => (
                <div key={b.name} className="flex items-center gap-1.5 text-white/20 text-[0.65rem]">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
            <p className="text-white/15 text-[0.67rem] text-center max-w-[460px]">
              Mendalia AI is a clinical reasoning support tool and is not a substitute for professional medical judgment. All clinical decisions remain the responsibility of the treating clinician.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalOpen && (
        <div
          className="fixed inset-0 z-[3000] bg-black/75 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-5"
          onClick={(e) => { if (e.target === e.currentTarget) setLegalOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div className="bg-white rounded-2xl w-full max-w-[840px] relative shadow-[0_60px_200px_rgba(0,0,0,0.4)] my-auto">
            <button
              onClick={() => setLegalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[var(--linen)] flex items-center justify-center text-[var(--sage)] hover:bg-[var(--brand-mist)] hover:text-[var(--brand)] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="p-8 md:p-12">
              <h2 id="legal-modal-title" className="text-2xl font-black text-[var(--ink)] mb-1">{LEGAL_CONTENT[legalTab].title}</h2>
              <p className="text-[var(--muted)] text-[0.72rem] mb-6">Last updated: April 2026 · Mendalia AI / Sirohi Corporation Pty Ltd</p>

              <div className="flex bg-[var(--linen)] rounded-xl p-1 mb-8 gap-1">
                {(Object.keys(LEGAL_CONTENT) as Array<keyof typeof LEGAL_CONTENT>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLegalTab(tab)}
                    className={`flex-1 py-2 px-3 rounded-lg text-[0.72rem] font-semibold transition-all ${legalTab === tab ? "bg-white text-[var(--brand)] shadow-sm" : "text-[var(--muted)]"}`}
                  >
                    {LEGAL_CONTENT[tab].title.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {LEGAL_CONTENT[legalTab].sections.map((s) => (
                  <div key={s.heading}>
                    <h3 className="font-bold text-[var(--ink)] text-[0.96rem] mb-2">{s.heading}</h3>
                    <p className="text-[var(--sage)] text-[0.84rem] leading-[1.8]">{s.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[var(--brand-mist)] border border-[var(--border)] rounded-xl">
                <p className="text-[var(--ink)] text-[0.82rem] font-medium leading-relaxed">
                  For questions about these documents, contact us at <a href="mailto:legal@mendalia.com" className="text-[var(--brand)] underline">legal@mendalia.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

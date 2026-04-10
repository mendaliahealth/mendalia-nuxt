"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "What is Mendalia?",
    a: "Mendalia is the AI-native Ambient Clinical Reasoning Engine — the only platform that takes a consultation in any language and produces a differential diagnosis, full care plan, medication safety review, investigation plan, and every clinical letter, end to end. No other tool covers the complete clinical workflow.",
  },
  {
    q: "Which languages does scribing support?",
    a: "Mendalia supports scribing in 50+ languages including Arabic, Mandarin, Hindi, Spanish, French, Portuguese, Swahili, Nepali, and many more. The AI understands and transcribes natively — there is no separate translation step that risks losing clinical nuance.",
  },
  {
    q: "Can I use my camera to upload reports?",
    a: "Yes — on the mobile app you can photograph lab reports, X-ray printouts, referral letters, or any clinical document with your camera. Mendalia instantly ingests the image as diagnostic evidence and incorporates it into the clinical reasoning and care plan. You can also upload PDF, JPG, PNG, and DOCX files directly.",
  },
  {
    q: "What clinical settings does it work in?",
    a: "Emergency department, outpatient clinics, inpatient wards, telehealth, rural and remote settings. Mendalia adapts to the context, specialty, and pace of each setting automatically. The mobile app is designed specifically for bedside and corridor use.",
  },
  {
    q: "How does the differential diagnosis work?",
    a: "The clinical reasoning engine analyses the full patient context — symptoms, history, transcribed consultation, uploaded documents and imaging — to produce a primary impression with likelihood score and a complete differential with clinical evidence for each entry. Clinicians can accept or reject each diagnosis, and the care plan adapts accordingly.",
  },
  {
    q: "What can I do in the Case Discussion?",
    a: "The Case Discussion AI knows everything about the case — the full history, transcript, uploaded documents, and AI reasoning. You can challenge a diagnosis, ask for a second opinion, request a letter translated into another language, upload additional files, or ask any clinical question. It stays with you for the full case.",
  },
  {
    q: "Is patient data secure?",
    a: "We take this seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We maintain a full audit trail on every AI-assisted decision. We do not sell or share patient data with third parties. Mendalia is designed to meet HIPAA, GDPR, and international health data regulations.",
  },
  {
    q: "Is imaging analysis available everywhere?",
    a: "Imaging upload and analysis is available in all regions except the United States, where it is currently not available due to regulatory considerations. All other features are available globally.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes — the Free plan is free forever with no credit card required. You get 20 consultations per month. Paid plans: Pro at USD $65/month (from $75), Pro + Imaging at USD $90/month. Enterprise is custom-priced.",
  },
  {
    q: "Who is behind Mendalia?",
    a: "Mendalia AI is operated by Sirohi Corporation Pty Ltd, headquartered in Sydney, Australia. We are a team of clinicians and engineers who have experienced the administrative burden of modern medicine firsthand — and built Mendalia to fix it.",
  },
  {
    q: "How does Enterprise work?",
    a: "Enterprise is for hospitals, health networks, and clinic groups. It includes multi-clinician workspaces, EHR and EMR integration (on roadmap), full audit trails, SLA guarantees, and a dedicated clinical onboarding team. Contact us at enterprise@mendalia.com to discuss.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-[5%] bg-[var(--off)]" aria-labelledby="faq-title">
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-14 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            FAQ
          </div>
          <h2 id="faq-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            Everything you{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
              want to know.
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-3 sr-hidden">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? "border-[rgba(10,107,90,0.25)] shadow-sm" : "border-[var(--border)]"}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold text-[var(--ink)] text-[0.9rem] leading-snug">{faq.q}</span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[var(--sage)] transition-all duration-300 ${open === i ? "bg-[var(--brand-mist)] text-[var(--brand)] rotate-45" : "bg-[var(--linen)]"}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}
              >
                <p className="px-5 pb-5 text-[var(--sage)] text-[0.87rem] leading-[1.8]">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

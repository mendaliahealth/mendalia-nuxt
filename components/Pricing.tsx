"use client";
import { useState } from "react";

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    desc: "Try Mendalia today. No credit card. No catch.",
    cta: "Get started free",
    ctaHref: "https://ai.mendalia.com/register",
    highlight: false,
    features: [
      "Clinical reasoning engine",
      "20 consultations per month",
      "Basic SOAP note generation",
      "Basic differential diagnosis",
      "Web and mobile access",
    ],
  },
  {
    name: "Pro",
    price: 65,
    originalPrice: 75,
    period: "USD / month",
    badge: "Most popular",
    desc: "The complete ambient scribing and reasoning platform.",
    cta: "Start Pro",
    ctaHref: "https://ai.mendalia.com/register?plan=pro",
    highlight: true,
    features: [
      "Everything in Free",
      "Unlimited consultations",
      "Multilingual scribing (50+ languages)",
      "Full differential diagnosis with evidence",
      "Complete care plan generation",
      "Medication safety and contraindication review",
      "All letter types — referral, patient, clinical",
      "Investigation planning",
      "Case discussion AI",
      "Priority support",
    ],
  },
  {
    name: "Pro + Imaging",
    price: 90,
    period: "USD / month",
    desc: "Everything in Pro, plus multimodal imaging intelligence.",
    note: "Imaging analysis not available in the United States.",
    cta: "Start Pro + Imaging",
    ctaHref: "https://ai.mendalia.com/register?plan=imaging",
    highlight: false,
    features: [
      "Everything in Pro",
      "Imaging upload and analysis",
      "Camera report capture",
      "Multimodal clinical reasoning",
      "Unlimited file uploads per case",
    ],
  },
  {
    name: "Enterprise",
    price: null,
    period: "Custom pricing",
    desc: "For hospitals, health networks, and clinic groups deploying Mendalia at scale.",
    cta: "Contact us",
    ctaHref: "mailto:enterprise@mendalia.com",
    highlight: false,
    features: [
      "Everything in Pro + Imaging",
      "Multi-clinician workspace",
      "EHR and EMR integration (roadmap)",
      "Full audit trails",
      "SLA and dedicated support",
      "Clinical onboarding team",
      "Volume pricing",
      "Custom contracts",
    ],
  },
];

function Check() {
  return (
    <svg className="w-4 h-4 text-[var(--brand)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-[5%] bg-[var(--off)]" aria-labelledby="pricing-title">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-14 sr-hidden">
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[var(--brand)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
            Pricing
          </div>
          <h2 id="pricing-title" className="text-[clamp(1.9rem,3.8vw,3rem)] font-black tracking-tight text-[var(--ink)] leading-[1.08]">
            Simple, honest{" "}
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>
              pricing.
            </span>
          </h2>
          <p className="text-[var(--sage)] text-[0.97rem] mt-3 max-w-[460px] mx-auto leading-relaxed">
            Start free. Upgrade when you are ready. No contracts, no surprises. All prices in USD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sr-hidden">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-[var(--brand)] text-white shadow-[0_20px_60px_rgba(10,107,90,0.35)] scale-[1.02]"
                  : "bg-white border border-[var(--border)] card-hover"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4DD9AC] text-[var(--ink)] text-[0.58rem] font-black px-3 py-1 rounded-full whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className={`text-[0.7rem] font-bold tracking-widest uppercase mb-3 ${plan.highlight ? "text-white/60" : "text-[var(--muted)]"}`}>
                {plan.name}
              </div>

              <div className="flex items-end gap-1.5 mb-1">
                {plan.price === null ? (
                  <div className={`text-2xl font-black leading-none ${plan.highlight ? "text-white" : "text-[var(--ink)]"}`}>
                    Custom
                  </div>
                ) : (
                  <>
                    <div className={`text-4xl font-black leading-none ${plan.highlight ? "text-white" : "text-[var(--ink)]"}`}>
                      ${plan.price}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-lg font-bold line-through opacity-40 mb-1">${plan.originalPrice}</div>
                    )}
                  </>
                )}
              </div>

              <div className={`text-[0.7rem] mb-4 ${plan.highlight ? "text-white/60" : "text-[var(--muted)]"}`}>
                {plan.period}
              </div>

              <p className={`text-[0.82rem] leading-relaxed mb-5 ${plan.highlight ? "text-white/75" : "text-[var(--sage)]"}`}>
                {plan.desc}
              </p>

              {plan.note && (
                <p className={`text-[0.7rem] mb-4 px-3 py-2 rounded-lg ${plan.highlight ? "bg-white/10 text-white/60" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                  {plan.note}
                </p>
              )}

              <a
                href={plan.ctaHref}
                className={`block text-center font-bold text-[0.84rem] py-3 rounded-xl mb-6 transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white text-[var(--brand)] hover:bg-white/90"
                    : "bg-[var(--brand)] text-white hover:bg-[var(--brand-light)]"
                }`}
              >
                {plan.cta}
              </a>

              <ul className="flex flex-col gap-2.5 mt-auto">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check />
                    <span className={`text-[0.78rem] leading-snug ${plan.highlight ? "text-white/80" : "text-[var(--sage)]"}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-[var(--muted)] text-[0.75rem] mt-8 sr-hidden">
          All plans include a 30-day free trial on paid tiers. No credit card required for Free plan. Enterprise contracts available on request.
        </p>
      </div>
    </section>
  );
}

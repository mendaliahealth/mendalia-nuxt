"use client";

const ROW1 = [
  { text: "Differential Diagnosis",    accent: false },
  { text: "Evidence-Cited Reasoning",  accent: false },
  { text: "Urgency-Coded Care Plan",   accent: false },
  { text: "SOAP Documentation",        accent: false },
  { text: "Primary Impression",        accent: false },
  { text: "Investigation Plan",        accent: false },
  { text: "Clinical Intelligence",     accent: true  },
  { text: "Analysis Confidence",       accent: false },
];

const ROW2 = [
  { text: "Follow-up Cases",           accent: false },
  { text: "< 60 Seconds",             accent: true  },
  { text: "Full History Inherited",    accent: false },
  { text: "Mendie AI Agent",           accent: false },
  { text: "HIPAA Compliant",           accent: true  },
  { text: "Zero Re-entry Needed",      accent: false },
  { text: "10+ Signals per Encounter", accent: true  },
  { text: "Automated Augmentation",    accent: false },
];

function Row({ items, dir }: { items: typeof ROW1; dir: "left" | "right" }) {
  const tripled = [...items, ...items, ...items];
  const anim = dir === "left" ? "cap-tick-l 34s linear infinite" : "cap-tick-r 28s linear infinite";

  return (
    <div style={{
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", width: "max-content", animation: anim }}>
        {tripled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <span style={{
              fontSize: 12.5,
              fontWeight: item.accent ? 700 : 500,
              color: item.accent ? "#0ea5e9" : "#C4C4BC",
              fontFamily: "var(--font-montserrat)",
              letterSpacing: item.accent ? "-0.01em" : "0.005em",
              padding: "0 22px",
              whiteSpace: "nowrap",
            }}>{item.text}</span>
            <span style={{ fontSize: 5, color: "rgba(14,165,233,0.35)", lineHeight: 1 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapabilitiesTicker() {
  return (
    <div style={{
      background: "#fff",
      borderTop: "1px solid rgba(0,0,0,0.05)",
      borderBottom: "1px solid rgba(0,0,0,0.05)",
      padding: "22px 0",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes cap-tick-l { 0% { transform: translateX(0) } 100% { transform: translateX(-33.333%) } }
        @keyframes cap-tick-r { 0% { transform: translateX(-33.333%) } 100% { transform: translateX(0) } }
      `}</style>

      <Row items={ROW1} dir="left" />
      <div style={{ height: 10 }} />
      <Row items={ROW2} dir="right" />
    </div>
  );
}

"use client";

/* Three-node connector: Mobile → Mendalia Cloud → Web */
const DOT_COUNT = 5;

function FlowDots({ delay = 0 }: { delay?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "0 10px" }}>
      <style>{`
        @keyframes fdot {
          0%, 100% { opacity: 0.08; transform: scale(0.7); }
          50%       { opacity: 0.7;  transform: scale(1);   }
        }
      `}</style>
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 4, height: 4, borderRadius: "50%",
            background: "#0ea5e9",
            animation: `fdot 1.6s ease-in-out infinite`,
            animationDelay: `${delay + i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

function Node({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 13,
        background: accent ? "#0ea5e9" : "rgba(14,165,233,0.07)",
        border: accent ? "none" : "1px solid rgba(14,165,233,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: accent ? "0 6px 20px rgba(14,165,233,0.28)" : "none",
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: 9, fontWeight: accent ? 700 : 600,
        color: accent ? "#0ea5e9" : "#9CA3AF",
        fontFamily: "var(--font-montserrat)", letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>{label}</span>
    </div>
  );
}

export default function ModesBridge() {
  return (
    <div style={{
      background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "28px 0 32px",
    }}>
      <Node
        label="Mobile"
        icon={
          <svg width="16" height="18" viewBox="0 0 24 28" fill="none" stroke="rgba(14,165,233,0.7)" strokeWidth="1.8" strokeLinecap="round">
            <rect x="4" y="1" width="16" height="26" rx="3" />
            <circle cx="12" cy="22.5" r="1.2" fill="rgba(14,165,233,0.7)" stroke="none" />
          </svg>
        }
      />

      <FlowDots delay={0} />

      <Node
        label="Mendalia"
        accent
        icon={
          <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 8c0-3.31-3.58-6-8-6S4 4.69 4 8c0 2.21 1.37 4.17 3.5 5.4L7 17l3.5-1.75c.48.07.98.1 1.5.1 4.42 0 8-2.69 8-6z" />
            <path d="M9 8h6M12 6v4" />
          </svg>
        }
      />

      <FlowDots delay={0.5} />

      <Node
        label="Web App"
        icon={
          <svg width="18" height="14" viewBox="0 0 24 18" fill="none" stroke="rgba(14,165,233,0.7)" strokeWidth="1.8" strokeLinecap="round">
            <rect x="1" y="1" width="22" height="13" rx="2" />
            <path d="M7 17h10M12 14v3" />
          </svg>
        }
      />
    </div>
  );
}

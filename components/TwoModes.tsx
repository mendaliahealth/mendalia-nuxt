"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ══════════════════════════════════════
   SHARED
══════════════════════════════════════ */

function Dots({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onSelect(i)} style={{
          width: i === active ? 20 : 6, height: 6, borderRadius: 3, padding: 0,
          background: i === active ? "#0ea5e9" : "rgba(14,165,233,0.22)",
          border: "none", cursor: "pointer",
          transition: "width 0.3s ease, background 0.3s ease",
        }} aria-label={`Screen ${i + 1}`} />
      ))}
    </div>
  );
}

function StoreButton({ store }: { store: "ios" | "android" }) {
  const isIos = store === "ios";
  return (
    <a href="#" style={{
      display: "flex", alignItems: "center", gap: 9,
      background: "#0A0A0A", borderRadius: 12, padding: "10px 18px",
      textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.08)",
      transition: "transform 0.18s ease, opacity 0.18s ease", cursor: "pointer", flexShrink: 0,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.88"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}
    >
      {isIos ? (
        <svg width="14" height="17" viewBox="0 0 814 1000" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.3-57.1-155.3-127.7C46.7 790.7 0 681.9 0 575.8c0-152.3 99.5-232.7 196.5-232.7 65.6 0 120.4 43.3 161.4 43.3 39.2 0 100.7-46 174.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M3.18 23.76c.36.2.78.22 1.16.07L15.93 12 4.34.17C3.96.02 3.54.04 3.18.24 2.46.64 2 1.44 2 2.32v19.36c0 .88.46 1.68 1.18 2.08z"/>
          <path d="M19.93 10.03l-2.9-1.66L13.75 12l3.28 3.63 2.9-1.66c.83-.48 1.07-1.48 1.07-1.97s-.24-1.49-1.07-1.97z" opacity=".85"/>
          <path d="M4.34.17l11.59 11.49-3.28-3.63 3.28-3.64L4.34.17z" opacity=".7"/>
          <path d="M4.34 23.83l11.59-11.49-3.28 3.63 3.28 3.64L4.34 23.83z" opacity=".7"/>
        </svg>
      )}
      <div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-montserrat)", letterSpacing: "0.04em", lineHeight: 1.2 }}>
          {isIos ? "Download on the" : "Get it on"}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          {isIos ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}

/* ══════════════════════════════════════
   MOBILE SCREENS
══════════════════════════════════════ */

function PhoneSB() {
  return (
    <div style={{ height: 38, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 15px 0", flexShrink: 0 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "var(--font-montserrat)" }}>9:41</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
          {[0,1,2].map(i => <rect key={i} x={i*4.2} y={8-i*2.5} width="3" height={i*2.5+1} rx="0.6" fill="white" opacity={0.35+i*0.28}/>)}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
          <div style={{ width: 17, height: 8, border: "1.2px solid rgba(255,255,255,0.55)", borderRadius: 2, padding: "1.2px", display: "flex" }}>
            <div style={{ width: "78%", background: "#fff", borderRadius: 1 }}/>
          </div>
          <div style={{ width: 1.5, height: 4, background: "rgba(255,255,255,0.45)", borderRadius: 1 }}/>
        </div>
      </div>
    </div>
  );
}

const NAV_SVGS = [
  <svg key="h" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  <svg key="m" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v5c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>,
  <svg key="d" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8zm0-4h8v2H8z"/></svg>,
  <svg key="s" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
];

function PhoneNav({ active }: { active: number }) {
  return (
    <div style={{ height: 46, background: "#080C15", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0 }}>
      {NAV_SVGS.map((icon, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: i === active ? "#0ea5e9" : "rgba(255,255,255,0.25)" }}>
          {icon}
          {i === active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0ea5e9" }}/>}
        </div>
      ))}
    </div>
  );
}

/* Screen 0: Dashboard */
function PhoneDashboard() {
  return (
    <div style={{ height: "100%", background: "#0B0F1A", display: "flex", flexDirection: "column" }}>
      <PhoneSB />
      <div style={{ padding: "2px 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-montserrat)", marginBottom: 2 }}>Good morning</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.025em" }}>Dr. Vikram</p>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #0369a1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 8.5, fontWeight: 800, color: "#fff", fontFamily: "var(--font-montserrat)" }}>VS</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "0 14px 12px" }}>
        {[["5","Today"],["12","Week"],["2.4h","Saved"]].map(([v,l]) => (
          <div key={l} style={{ flex:1, background:"rgba(255,255,255,0.055)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:9, padding:"7px 4px", textAlign:"center" }}>
            <p style={{ fontSize:14, fontWeight:800, color:"#0ea5e9", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.03em", lineHeight:1 }}>{v}</p>
            <p style={{ fontSize:7, color:"rgba(255,255,255,0.32)", fontFamily:"var(--font-montserrat)", marginTop:3, letterSpacing:"0.04em" }}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 14px 12px" }}>
        <div style={{ background: "linear-gradient(135deg, #0369a1, #0ea5e9)", borderRadius: 10, padding: "9px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 4px 16px rgba(14,165,233,0.28)" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--font-montserrat)", letterSpacing: "-0.01em" }}>Start New Session</span>
        </div>
      </div>
      <div style={{ padding: "0 14px", flex: 1, overflow: "hidden" }}>
        <p style={{ fontSize: 7.5, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", fontFamily: "var(--font-montserrat)", marginBottom: 7 }}>RECENT CASES</p>
        {[
          { name: "Arjun Mehra", spec: "General Medicine", ini: "AM", time: "Just now", ok: true },
          { name: "Rohit Kapoor", spec: "Cardiology", ini: "RK", time: "2h ago", ok: true },
          { name: "Dev Prasad", spec: "Internal Medicine", ini: "DP", time: "Yesterday", ok: false },
        ].map((pt, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 0", borderBottom: i<2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ width:26, height:26, borderRadius:"50%", background:"rgba(14,165,233,0.16)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:7, fontWeight:800, color:"#38bdf8", fontFamily:"var(--font-montserrat)" }}>{pt.ini}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:10.5, fontWeight:600, color:"#fff", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.01em", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{pt.name}</p>
              <p style={{ fontSize:7.5, color:"rgba(255,255,255,0.28)", fontFamily:"var(--font-montserrat)" }}>{pt.spec}</p>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <p style={{ fontSize:7.5, color:"rgba(255,255,255,0.22)", fontFamily:"var(--font-montserrat)" }}>{pt.time}</p>
              {pt.ok && <p style={{ fontSize:7.5, color:"#10b981", fontFamily:"var(--font-montserrat)", fontWeight:700, marginTop:1 }}>Done</p>}
            </div>
          </div>
        ))}
      </div>
      <PhoneNav active={0} />
    </div>
  );
}

/* Screen 1: Active Recording */
function PhoneRecording() {
  return (
    <div style={{ height: "100%", background: "#0B0F1A", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes wvbar{0%,100%{transform:scaleY(0.22);opacity:0.28}50%{transform:scaleY(1);opacity:1}}
        @keyframes blink-rec{0%,100%{opacity:1}50%{opacity:0.18}}
      `}</style>
      <PhoneSB />
      <div style={{ padding:"2px 14px 10px", display:"flex", alignItems:"center", gap:7 }}>
        <p style={{ fontSize:12, fontWeight:800, color:"#fff", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.02em", flex:1 }}>Active Session</p>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", animation:"blink-rec 1.4s infinite" }}/>
          <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.45)", fontFamily:"var(--font-montserrat)" }}>04:32</span>
        </div>
      </div>
      <div style={{ padding:"0 14px 12px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(14,165,233,0.1)", border:"1px solid rgba(14,165,233,0.22)", borderRadius:20, padding:"5px 12px" }}>
          <div style={{ width:16, height:16, borderRadius:"50%", background:"#0ea5e9", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:5.5, fontWeight:800, color:"#fff", fontFamily:"var(--font-montserrat)" }}>AM</span>
          </div>
          <span style={{ fontSize:10, fontWeight:600, color:"#7dd3fc", fontFamily:"var(--font-montserrat)" }}>Arjun Mehra</span>
        </div>
      </div>
      <div style={{ padding:"4px 14px 10px", display:"flex", alignItems:"center", justifyContent:"center", gap:2.5, height:46, flexShrink:0 }}>
        {[0.0,0.15,0.3,0.1,0.4,0.05,0.25,0.35,0.0,0.2,0.45,0.1,0.3,0.15,0.4,0.05,0.2,0.35,0.0,0.25].map((d,i) => (
          <div key={i} style={{ width:2.5, height:36, borderRadius:2, background:"linear-gradient(to top, #0369a1, #38bdf8)", transformOrigin:"center", animation:`wvbar ${0.55+d*0.9}s ease-in-out infinite`, animationDelay:`${d*0.45}s` }}/>
        ))}
      </div>
      <div style={{ margin:"0 14px", background:"rgba(255,255,255,0.038)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"10px 12px", flex:1 }}>
        <p style={{ fontSize:7.5, fontWeight:700, color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", fontFamily:"var(--font-montserrat)", marginBottom:7 }}>LIVE TRANSCRIPT</p>
        <p style={{ fontSize:9.5, color:"rgba(255,255,255,0.6)", lineHeight:1.65, fontFamily:"var(--font-montserrat)" }}>
          "...patient presents with sharp epigastric pain for 3 days, radiating to the back. History of regular alcohol use. Nausea and vomiting since this morning..."
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:8 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#0ea5e9", animation:"blink-rec 1.2s infinite" }}/>
          <span style={{ fontSize:8, color:"#0ea5e9", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>Transcribing</span>
        </div>
      </div>
      <div style={{ padding:"10px 14px 8px" }}>
        <div style={{ background:"rgba(239,68,68,0.11)", border:"1px solid rgba(239,68,68,0.26)", borderRadius:10, padding:"8px", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
          <div style={{ width:8, height:8, borderRadius:2, background:"#ef4444", flexShrink:0 }}/>
          <span style={{ fontSize:11, fontWeight:700, color:"#ef4444", fontFamily:"var(--font-montserrat)" }}>End and Generate</span>
        </div>
      </div>
      <PhoneNav active={1} />
    </div>
  );
}

/* Screen 2: SOAP Note */
function PhoneSOAP() {
  const secs = [
    { k:"S", label:"Subjective", c:"#0ea5e9", t:"Sharp epigastric pain x3 days, radiating to back. Nausea, vomiting. Regular alcohol use." },
    { k:"O", label:"Objective",  c:"#8b5cf6", t:"Temp 37.2°C, BP 118/76, HR 92. Epigastric tenderness, mild guarding." },
    { k:"A", label:"Assessment", c:"#f59e0b", t:"Acute Alcohol-Related Gastropathy/Pancreatitis with electrolyte imbalance." },
    { k:"P", label:"Plan",       c:"#10b981", t:"IV fluids, NPO, IV PPI, amylase/lipase, ECG. Monitor withdrawal signs." },
  ];
  return (
    <div style={{ height:"100%", background:"#0B0F1A", display:"flex", flexDirection:"column" }}>
      <PhoneSB />
      <div style={{ padding:"2px 14px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <p style={{ fontSize:12, fontWeight:800, color:"#fff", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.02em" }}>SOAP Note</p>
        <div style={{ display:"flex", gap:5 }}>
          <div style={{ padding:"3px 8px", background:"rgba(14,165,233,0.12)", border:"1px solid rgba(14,165,233,0.22)", borderRadius:5 }}>
            <span style={{ fontSize:7.5, fontWeight:700, color:"#38bdf8", fontFamily:"var(--font-montserrat)" }}>COPY</span>
          </div>
          <div style={{ padding:"3px 8px", background:"rgba(255,255,255,0.06)", borderRadius:5 }}>
            <span style={{ fontSize:7.5, fontWeight:700, color:"rgba(255,255,255,0.35)", fontFamily:"var(--font-montserrat)" }}>SHARE</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"0 14px 8px", display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:18, height:18, borderRadius:"50%", background:"rgba(14,165,233,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:6, fontWeight:800, color:"#7dd3fc", fontFamily:"var(--font-montserrat)" }}>AM</span>
        </div>
        <span style={{ fontSize:9.5, fontWeight:600, color:"rgba(255,255,255,0.62)", fontFamily:"var(--font-montserrat)" }}>Arjun Mehra</span>
        <span style={{ fontSize:8, color:"rgba(255,255,255,0.22)", fontFamily:"var(--font-montserrat)" }}>· Just now</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", padding:"0 14px 6px" }}>
        {secs.map((s) => (
          <div key={s.k} style={{ marginBottom:7, background:"rgba(255,255,255,0.038)", borderRadius:8, padding:"8px 10px 8px 12px", borderLeft:`2.5px solid ${s.c}` }}>
            <p style={{ fontSize:7.5, fontWeight:700, color:s.c, letterSpacing:"0.1em", fontFamily:"var(--font-montserrat)", marginBottom:4 }}>{s.k} — {s.label}</p>
            <p style={{ fontSize:9, color:"rgba(255,255,255,0.55)", lineHeight:1.55, fontFamily:"var(--font-montserrat)" }}>{s.t}</p>
          </div>
        ))}
      </div>
      <PhoneNav active={2} />
    </div>
  );
}

/* ══════════════════════════════════════
   IPHONE FRAME
══════════════════════════════════════ */

const MOBILE_SCREENS = [PhoneDashboard, PhoneRecording, PhoneSOAP];

function IPhoneFrame() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % MOBILE_SCREENS.length), 3600);
    return () => clearInterval(t);
  }, []);

  const W = 200, H = 424, R = 38;
  const Screen = MOBILE_SCREENS[active];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
      <div style={{ width:W, height:H, borderRadius:R, background:"linear-gradient(160deg,#2e2e30 0%,#1a1a1c 100%)", border:"2px solid #3a3a3c", boxShadow:"inset 0 0 0 1px rgba(255,255,255,0.07), 0 40px 90px rgba(0,0,0,0.32), 0 10px 30px rgba(0,0,0,0.18)", position:"relative", flexShrink:0 }}>
        {/* Side buttons */}
        <div style={{ position:"absolute", right:-3, top:95, width:3, height:48, background:"#3a3a3c", borderRadius:"0 3px 3px 0" }}/>
        <div style={{ position:"absolute", left:-3, top:78, width:3, height:26, background:"#3a3a3c", borderRadius:"3px 0 0 3px" }}/>
        <div style={{ position:"absolute", left:-3, top:113, width:3, height:30, background:"#3a3a3c", borderRadius:"3px 0 0 3px" }}/>
        <div style={{ position:"absolute", left:-3, top:152, width:3, height:46, background:"#3a3a3c", borderRadius:"3px 0 0 3px" }}/>
        {/* Screen bezel */}
        <div style={{ position:"absolute", top:6, left:6, right:6, bottom:6, borderRadius:R-5, overflow:"hidden", background:"#000" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.35 }} style={{ position:"absolute", inset:0 }}>
              <Screen />
            </motion.div>
          </AnimatePresence>
          {/* Dynamic Island */}
          <div style={{ position:"absolute", top:9, left:"50%", transform:"translateX(-50%)", width:78, height:22, borderRadius:12, background:"#000", zIndex:20 }}/>
          {/* Home indicator */}
          <div style={{ position:"absolute", bottom:6, left:"50%", transform:"translateX(-50%)", width:80, height:3, borderRadius:2, background:"rgba(255,255,255,0.28)", zIndex:20 }}/>
        </div>
      </div>
      <Dots count={MOBILE_SCREENS.length} active={active} onSelect={setActive} />
    </div>
  );
}

/* ══════════════════════════════════════
   WEB SCREENS — match real app screenshots
══════════════════════════════════════ */

/* Dark-green sidebar exactly as in the real app */
function WebSidebar() {
  const navItems = [
    { label: "Dashboard", icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg> },
    { label: "My Patients", icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
    { label: "Account",    icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg> },
  ];
  return (
    <div style={{ width:90, background:"#0C2B1A", display:"flex", flexDirection:"column", flexShrink:0 }}>
      {/* Top: close button only, no logo text */}
      <div style={{ padding:"7px 9px 7px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", justifyContent:"flex-end" }}>
        <div style={{ width:13, height:13, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="6" height="6" viewBox="0 0 10 10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M1 1l8 8M9 1l-8 8"/>
          </svg>
        </div>
      </div>

      {/* WORKSPACE */}
      <div style={{ padding:"5px 0 3px" }}>
        <p style={{ fontSize:5.5, fontWeight:700, color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", padding:"0 9px", marginBottom:3, fontFamily:"var(--font-montserrat)", textTransform:"uppercase" }}>Workspace</p>
        {navItems.map(({ label, icon }, i) => (
          <div key={label} style={{ padding:"5px 9px", display:"flex", alignItems:"center", gap:6, background:i===1?"rgba(255,255,255,0.09)":"transparent" }}>
            <span style={{ color:i===1?"rgba(255,255,255,0.92)":"rgba(255,255,255,0.42)", flexShrink:0 }}>{icon}</span>
            <span style={{ fontSize:7.5, color:i===1?"rgba(255,255,255,0.92)":"rgba(255,255,255,0.42)", fontFamily:"var(--font-montserrat)", fontWeight:i===1?600:400, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* CLINICAL PEARL */}
      <div style={{ padding:"6px 9px 5px", borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:2 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#fbbf24", flexShrink:0 }}/>
          <p style={{ fontSize:5.5, fontWeight:700, color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", fontFamily:"var(--font-montserrat)", textTransform:"uppercase" }}>Clinical Pearl</p>
        </div>
        <p style={{ fontSize:7, color:"rgba(255,255,255,0.42)", lineHeight:1.5, fontFamily:"var(--font-montserrat)" }}>D-dimer rules out PE only in low pre-test probability patients.</p>
      </div>

      {/* AI SYSTEMS */}
      <div style={{ padding:"6px 9px 5px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize:5.5, fontWeight:700, color:"rgba(255,255,255,0.25)", letterSpacing:"0.12em", fontFamily:"var(--font-montserrat)", marginBottom:5, textTransform:"uppercase" }}>AI Systems</p>
        {[["AI Engine","Live"],["Data","Encrypted"],["Systems","All Up"]].map(([lbl,st]) => (
          <div key={lbl} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3.5 }}>
            <span style={{ fontSize:7, color:"rgba(255,255,255,0.4)", fontFamily:"var(--font-montserrat)" }}>{lbl}</span>
            <div style={{ display:"flex", alignItems:"center", gap:3 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"#4ade80" }}/>
              <span style={{ fontSize:6.5, color:"#4ade80", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>{st}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SUPPORTED BY — Lupin logo placeholder */}
      <div style={{ padding:"5px 9px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize:5.5, fontWeight:700, color:"rgba(255,255,255,0.2)", letterSpacing:"0.12em", fontFamily:"var(--font-montserrat)", marginBottom:4, textTransform:"uppercase" }}>Supported By</p>
        <div style={{ width:28, height:12, background:"rgba(255,255,255,0.12)", borderRadius:3 }}/>
      </div>

      {/* User profile */}
      <div style={{ marginTop:"auto", padding:"5px 9px 6px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:16, height:16, borderRadius:"50%", background:"rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:5.5, fontWeight:700, color:"#fff", fontFamily:"var(--font-montserrat)" }}>VS</span>
          </div>
          <div style={{ minWidth:0 }}>
            <p style={{ fontSize:7, fontWeight:600, color:"rgba(255,255,255,0.78)", fontFamily:"var(--font-montserrat)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>Dr. Vikram</p>
            <p style={{ fontSize:6, color:"rgba(255,255,255,0.3)", fontFamily:"var(--font-montserrat)" }}>Internal Medicine</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Web Screen 0: Diagnosis — matches web1.png */
function WebDiagnosis() {
  return (
    <div style={{ height:"100%", background:"#F3F4F6", display:"flex" }}>
      <WebSidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Patient header bar */}
        <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"6px 11px", display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          <div style={{ width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#0369a1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:5.5, fontWeight:800, color:"#fff", fontFamily:"var(--font-montserrat)" }}>AM</span>
          </div>
          <div>
            <p style={{ fontSize:9, fontWeight:700, color:"#111827", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.01em", lineHeight:1.2 }}>Arjun Mehra</p>
            <p style={{ fontSize:6.5, color:"#9ca3af", fontFamily:"var(--font-montserrat)" }}>Male</p>
          </div>
          <div style={{ display:"flex", gap:3, marginLeft:4 }}>
            {["Diagnosis","Care Plan +"].map((t,i) => (
              <div key={t} style={{ padding:"3px 7px", borderRadius:4, background:i===0?"rgba(14,165,233,0.1)":"transparent", border:i===0?"1px solid rgba(14,165,233,0.22)":"1px solid #e5e7eb" }}>
                <span style={{ fontSize:7, fontWeight:i===0?700:400, color:i===0?"#0ea5e9":"#9ca3af", fontFamily:"var(--font-montserrat)" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ marginLeft:"auto", padding:"3px 8px", background:"#0ea5e9", borderRadius:4 }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:"#fff", fontFamily:"var(--font-montserrat)" }}>+ Complete</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"8px 10px", overflow:"hidden" }}>
          {/* Analysis confidence */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
            <span style={{ fontSize:6.5, color:"#9ca3af", fontFamily:"var(--font-montserrat)", fontWeight:600, letterSpacing:"0.08em" }}>ANALYSIS CONFIDENCE</span>
            <span style={{ fontSize:6.5, fontWeight:700, color:"#059669", background:"rgba(5,150,105,0.1)", padding:"1.5px 5px", borderRadius:3, fontFamily:"var(--font-montserrat)" }}>High</span>
          </div>

          {/* Primary Impression */}
          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:7, padding:"7px 10px", marginBottom:7 }}>
            <p style={{ fontSize:6.5, fontWeight:700, color:"#0ea5e9", letterSpacing:"0.1em", fontFamily:"var(--font-montserrat)", marginBottom:4 }}>PRIMARY IMPRESSION</p>
            <p style={{ fontSize:11, fontWeight:800, color:"#111827", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.025em", marginBottom:3, lineHeight:1.15 }}>Acute Alcohol-Related Syndrome</p>
            <p style={{ fontSize:7.5, color:"#6B7280", lineHeight:1.5, fontFamily:"var(--font-montserrat)" }}>Acute Alcohol-Related Gastropathy/Pancreatitis with Electrolyte Imbalance and Potential Alcohol Withdrawal in a 34-year-old male.</p>
          </div>

          {/* Differential header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:"#9ca3af", letterSpacing:"0.08em", fontFamily:"var(--font-montserrat)" }}>DIFFERENTIAL DIAGNOSIS</span>
            <span style={{ fontSize:6.5, color:"#0ea5e9", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>6 findings</span>
          </div>

          {/* Differential 01 — expanded with evidence/rule in/rule out */}
          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:7, padding:"7px 9px", marginBottom:5, borderLeft:"3px solid #059669" }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
              <span style={{ fontSize:6.5, color:"#d1d5db", fontWeight:700, fontFamily:"var(--font-montserrat)", minWidth:14 }}>01</span>
              <span style={{ fontSize:8.5, fontWeight:700, color:"#111827", fontFamily:"var(--font-montserrat)", flex:1, letterSpacing:"-0.01em", lineHeight:1.2 }}>Acute Alcohol-Induced Gastritis/Pancreatitis</span>
              <span style={{ fontSize:6, fontWeight:700, padding:"1.5px 5px", borderRadius:3, background:"rgba(5,150,105,0.1)", color:"#059669", fontFamily:"var(--font-montserrat)" }}>HIGH</span>
              <span style={{ fontSize:6, fontWeight:700, color:"#059669", background:"rgba(5,150,105,0.08)", padding:"1.5px 5px", borderRadius:3, fontFamily:"var(--font-montserrat)", whiteSpace:"nowrap" }}>✓ Accepted</span>
            </div>
            <p style={{ fontSize:7, color:"#6B7280", marginBottom:3, fontFamily:"var(--font-montserrat)", lineHeight:1.45 }}>
              <span style={{ color:"#374151", fontWeight:600 }}>Evidence — </span>Abdominal pain, vomiting, regular alcohol use.
            </p>
            <p style={{ fontSize:7, color:"#6B7280", marginBottom:6, fontFamily:"var(--font-montserrat)", lineHeight:1.45 }}>
              <span style={{ color:"#374151", fontWeight:600 }}>Reasoning — </span>Alcohol is a direct irritant to gastric mucosa and a common cause of acute pancreatitis.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
              <div style={{ background:"rgba(14,165,233,0.05)", borderRadius:5, padding:"4px 6px" }}>
                <p style={{ fontSize:5.5, fontWeight:700, color:"#0369a1", letterSpacing:"0.1em", fontFamily:"var(--font-montserrat)", marginBottom:2 }}>RULE IN</p>
                <p style={{ fontSize:6.5, color:"#374151", lineHeight:1.4, fontFamily:"var(--font-montserrat)" }}>Elevated serum amylase and lipase, upper GI endoscopy showing gastritis.</p>
              </div>
              <div style={{ background:"rgba(239,68,68,0.05)", borderRadius:5, padding:"4px 6px" }}>
                <p style={{ fontSize:5.5, fontWeight:700, color:"#dc2626", letterSpacing:"0.1em", fontFamily:"var(--font-montserrat)", marginBottom:2 }}>RULE OUT</p>
                <p style={{ fontSize:6.5, color:"#374151", lineHeight:1.4, fontFamily:"var(--font-montserrat)" }}>Normal serum amylase and lipase, normal upper GI endoscopy.</p>
              </div>
            </div>
          </div>

          {/* Differential 02 — collapsed with Accept/Reject */}
          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:7, padding:"6px 9px", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ fontSize:6.5, color:"#d1d5db", fontWeight:700, fontFamily:"var(--font-montserrat)", minWidth:14 }}>02</span>
            <span style={{ fontSize:8, fontWeight:600, color:"#374151", fontFamily:"var(--font-montserrat)", flex:1, letterSpacing:"-0.01em" }}>Alcohol Withdrawal Syndrome</span>
            <div style={{ display:"flex", gap:3, flexShrink:0 }}>
              <div style={{ padding:"2px 6px", background:"rgba(14,165,233,0.08)", borderRadius:4 }}>
                <span style={{ fontSize:6.5, fontWeight:700, color:"#0ea5e9", fontFamily:"var(--font-montserrat)" }}>Accept</span>
              </div>
              <div style={{ padding:"2px 6px", background:"rgba(239,68,68,0.08)", borderRadius:4 }}>
                <span style={{ fontSize:6.5, fontWeight:700, color:"#dc2626", fontFamily:"var(--font-montserrat)" }}>Reject</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Web Screen 1: SOAP Note — matches web2.png */
function WebSOAP() {
  return (
    <div style={{ height:"100%", background:"#F3F4F6", display:"flex" }}>
      <WebSidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Patient header with SOAP-specific tabs */}
        <div style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"6px 11px", display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          <div style={{ width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#0369a1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:5.5, fontWeight:800, color:"#fff", fontFamily:"var(--font-montserrat)" }}>AM</span>
          </div>
          <div style={{ marginRight:6 }}>
            <p style={{ fontSize:9, fontWeight:700, color:"#111827", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.01em", lineHeight:1.2 }}>Arjun Mehra</p>
            <p style={{ fontSize:6.5, color:"#9ca3af", fontFamily:"var(--font-montserrat)" }}>Male</p>
          </div>
          {/* Underline-style tabs matching web2.png */}
          <div style={{ display:"flex", gap:0, borderBottom:"1px solid #E5E7EB", marginBottom:-7, paddingBottom:0, alignSelf:"flex-end" }}>
            {["Notes","Transcript","SOAP Note","Case Summary"].map((t,i) => (
              <div key={t} style={{ padding:"0 7px 5px", borderBottom:i===2?"2px solid #0ea5e9":"2px solid transparent" }}>
                <span style={{ fontSize:7, fontWeight:i===2?700:400, color:i===2?"#0ea5e9":"#9ca3af", fontFamily:"var(--font-montserrat)", whiteSpace:"nowrap" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"8px 10px 0", overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {/* SOAP Note section header */}
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
            <div style={{ width:16, height:16, borderRadius:4, background:"rgba(14,165,233,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><polyline points="14,2 14,8 20,8"/></svg>
            </div>
            <div>
              <p style={{ fontSize:9, fontWeight:700, color:"#111827", fontFamily:"var(--font-montserrat)" }}>SOAP Note</p>
              <p style={{ fontSize:6.5, fontWeight:600, color:"#9ca3af", letterSpacing:"0.08em", fontFamily:"var(--font-montserrat)", textTransform:"uppercase" }}>Scribe Generated</p>
            </div>
          </div>

          {/* SOAP card — white card with AI SCRIBED badge */}
          <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:8, flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {/* Card header */}
            <div style={{ padding:"5px 9px", borderBottom:"1px solid #F3F4F6", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
              <div style={{ width:15, height:15, borderRadius:4, background:"#0ea5e9", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <span style={{ fontSize:8, fontWeight:700, color:"#111827", fontFamily:"var(--font-montserrat)" }}>SOAP Note</span>
              <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#0ea5e9" }}/>
                <span style={{ fontSize:6.5, color:"#0ea5e9", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>AI SCRIBED</span>
              </div>
              <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
                <span style={{ fontSize:7, fontWeight:600, color:"#6B7280", fontFamily:"var(--font-montserrat)", cursor:"pointer" }}>Copy All</span>
                <span style={{ fontSize:7, fontWeight:600, color:"#6B7280", fontFamily:"var(--font-montserrat)", cursor:"pointer" }}>Edit</span>
              </div>
            </div>

            {/* SOAP sections — matching web2.png layout */}
            <div style={{ padding:"7px 9px", overflow:"hidden", flex:1 }}>
              {[
                { k:"SUBJECTIVE",  t:"The patient reports dizziness, abdominal pain, and vomiting. He also mentions experiencing palpitations and reports regular use of tobacco and alcohol." },
                { k:"ASSESSMENT",  t:"The patient presents with symptoms suggestive of gastrointestinal distress and palpitations." },
                { k:"PLAN",        t:"The doctor plans to conduct further tests including amylase/lipase, ECG, and electrolyte panel." },
              ].map((s, i, arr) => (
                <div key={s.k} style={{ marginBottom: i < arr.length-1 ? 6 : 0 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2 }}>
                    <p style={{ fontSize:6.5, fontWeight:700, color:"#374151", letterSpacing:"0.1em", fontFamily:"var(--font-montserrat)" }}>{s.k}</p>
                    <span style={{ fontSize:6, color:"#0ea5e9", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>Copy</span>
                  </div>
                  <p style={{ fontSize:7.5, color:"#4B5563", lineHeight:1.55, fontFamily:"var(--font-montserrat)" }}>{s.t}</p>
                  {i < arr.length-1 && <div style={{ height:1, background:"#F3F4F6", marginTop:6 }}/>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action bar — matches web2.png */}
        <div style={{ background:"#111827", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"5px 10px", flexShrink:0 }}>
          {[
            { label:"SCRIBE",       dot:"#0ea5e9" },
            { label:"AI Command",   dot:"#8b5cf6" },
            { label:"AI Assistant", dot:"#10b981" },
          ].map(({ label, dot }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:3 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:dot }}/>
              <span style={{ fontSize:6.5, color:"rgba(255,255,255,0.55)", fontFamily:"var(--font-montserrat)", fontWeight:600 }}>{label}</span>
            </div>
          ))}
          <div style={{ padding:"3px 8px", background:"linear-gradient(135deg,#0369a1,#0ea5e9)", borderRadius:5, display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:6.5, fontWeight:700, color:"#fff", fontFamily:"var(--font-montserrat)", whiteSpace:"nowrap" }}>Open Augmented Case</span>
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   BROWSER FRAME
══════════════════════════════════════ */

const WEB_SCREENS = [WebDiagnosis, WebSOAP];

function BrowserFrame() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % WEB_SCREENS.length), 4400);
    return () => clearInterval(t);
  }, []);

  const Screen = WEB_SCREENS[active];

  return (
    <div style={{ width:"100%" }}>
      <div style={{ borderRadius:"13px 13px 0 0", overflow:"hidden", border:"1.5px solid #cecece", borderBottom:"none", boxShadow:"0 -4px 28px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.11)", background:"#e8e8e8" }}>
        {/* Chrome bar */}
        <div style={{ background:"#f2f2f2", borderBottom:"1px solid #ddd", padding:"8px 12px", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ display:"flex", gap:5, flexShrink:0 }}>
            {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
              <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>
            ))}
          </div>
          <div style={{ flex:1, background:"#fff", border:"1px solid #d4d4d4", borderRadius:5, padding:"3px 9px", display:"flex", alignItems:"center", gap:5 }}>
            <svg width="8" height="10" viewBox="0 0 9 11" fill="none">
              <rect x=".75" y="4.5" width="7.5" height="6" rx="1" stroke="#aaa" strokeWidth="1"/>
              <path d="M2.5 4.5V3a2 2 0 014 0v1.5" stroke="#aaa" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize:10, color:"#555", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.01em" }}>ai.mendalia.com</span>
          </div>
        </div>
        {/* Content area */}
        <div style={{ position:"relative", aspectRatio:"16/10", overflow:"hidden", background:"#f8f9fb" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }} transition={{ duration:0.35, ease }} style={{ position:"absolute", inset:0 }}>
              <Screen />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Hinge */}
      <div style={{ height:11, background:"linear-gradient(180deg,#d0d0d0 0%,#bcbcbc 100%)", borderRadius:"0 0 2px 2px" }}/>
      {/* Base */}
      <div style={{ height:6, background:"#b6b6b6", borderRadius:"0 0 5px 5px", margin:"0 -14px", boxShadow:"0 4px 14px rgba(0,0,0,0.12)" }}/>
      <Dots count={WEB_SCREENS.length} active={active} onSelect={setActive} />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════ */

export default function TwoModes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inSec = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} style={{ background:"#FFFDF9", padding:"80px 0 120px", position:"relative", overflow:"hidden" }}>
      {/* Ambient orbs */}
      <div aria-hidden style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:-60, left:"5%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.055) 0%,transparent 70%)", filter:"blur(80px)" }}/>
        <div style={{ position:"absolute", bottom:-40, right:"5%", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,0.04) 0%,transparent 70%)", filter:"blur(70px)" }}/>
      </div>
      {/* Top blend */}
      <div aria-hidden style={{ position:"absolute", top:0, left:0, right:0, height:72, background:"linear-gradient(to bottom,#fff,transparent)", pointerEvents:"none", zIndex:1 }}/>

      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:2 }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <motion.p initial={{ opacity:0, y:8 }} animate={inSec?{opacity:1,y:0}:{}} transition={{ duration:0.4 }}
            style={{ fontSize:11, letterSpacing:"0.14em", color:"#0ea5e9", fontWeight:700, textTransform:"uppercase", fontFamily:"var(--font-montserrat)", marginBottom:16 }}>
            Zero Minute Integration
          </motion.p>
          <motion.h2 initial={{ opacity:0, y:14 }} animate={inSec?{opacity:1,y:0}:{}} transition={{ delay:0.08, duration:0.55, ease }}
            style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:"clamp(28px,3.5vw,52px)", fontWeight:800, color:"#0A0A0A", letterSpacing:"-0.038em", lineHeight:1.08, marginBottom:18 }}>
            Two modes.<br/><span style={{ color:"#0ea5e9" }}>Zero friction.</span>
          </motion.h2>
          <motion.p initial={{ opacity:0, y:10 }} animate={inSec?{opacity:1,y:0}:{}} transition={{ delay:0.16, duration:0.5, ease }}
            style={{ fontFamily:"var(--font-montserrat),sans-serif", fontSize:15, color:"#9CA3AF", letterSpacing:"-0.01em", maxWidth:440, margin:"0 auto" }}>
            Phone in your pocket or laptop on your desk. Install and go, or log in and go.
          </motion.p>
        </div>

        {/* Grid */}
        <style>{`.modes-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:stretch}@media(max-width:760px){.modes-grid{grid-template-columns:1fr}}`}</style>
        <div className="modes-grid">

          {/* Mobile card */}
          <motion.div initial={{ opacity:0, y:32 }} animate={inSec?{opacity:1,y:0}:{}} transition={{ delay:0.24, duration:0.65, ease }}
            style={{ background:"rgba(255,255,255,0.88)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:28, padding:"32px 28px 30px", boxShadow:"0 1px 2px rgba(0,0,0,0.04),0 8px 40px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:"100%", marginBottom:26 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:30, height:30, borderRadius:9, background:"rgba(14,165,233,0.08)", border:"1px solid rgba(14,165,233,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="11" height="14" viewBox="0 0 22 26" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"><rect x="3" y="1" width="16" height="24" rx="3"/><circle cx="11" cy="21" r="1.1" fill="#0ea5e9" stroke="none"/></svg>
                </div>
                <span style={{ fontSize:10, fontWeight:700, color:"#0ea5e9", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--font-montserrat)" }}>Mobile App</span>
              </div>
              <h3 style={{ fontSize:23, fontWeight:800, color:"#0A0A0A", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.03em", lineHeight:1.16, marginBottom:9 }}>Install and go.</h3>
              <p style={{ fontSize:13.5, color:"#6B7280", lineHeight:1.65, fontFamily:"var(--font-montserrat)" }}>Download on iOS or Android. Open it at your next consultation. No training, no setup.</p>
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:4 }}>
              <IPhoneFrame />
            </div>
            <div style={{ display:"flex", gap:10, marginTop:26, justifyContent:"center", flexWrap:"wrap" }}>
              <StoreButton store="ios" />
              <StoreButton store="android" />
            </div>
          </motion.div>

          {/* Web card */}
          <motion.div initial={{ opacity:0, y:32 }} animate={inSec?{opacity:1,y:0}:{}} transition={{ delay:0.36, duration:0.65, ease }}
            style={{ background:"rgba(255,255,255,0.88)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:28, padding:"32px 28px 30px", boxShadow:"0 1px 2px rgba(0,0,0,0.04),0 8px 40px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column" }}>
            <div style={{ marginBottom:26 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:30, height:30, borderRadius:9, background:"rgba(14,165,233,0.08)", border:"1px solid rgba(14,165,233,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="14" height="11" viewBox="0 0 22 17" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round"><rect x="1" y="1" width="20" height="12" rx="2"/><path d="M6 16h10M11 13v3"/></svg>
                </div>
                <span style={{ fontSize:10, fontWeight:700, color:"#0ea5e9", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"var(--font-montserrat)" }}>Web App</span>
              </div>
              <h3 style={{ fontSize:23, fontWeight:800, color:"#0A0A0A", fontFamily:"var(--font-montserrat)", letterSpacing:"-0.03em", lineHeight:1.16, marginBottom:9 }}>Log in and go.</h3>
              <p style={{ fontSize:13.5, color:"#6B7280", lineHeight:1.65, fontFamily:"var(--font-montserrat)" }}>Open any browser, log in with your credentials. Full workspace, full intelligence, zero install.</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
              <BrowserFrame />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";

export default function MendieCharacter({ size = 260 }: { size?: number }) {
  const h = Math.round(size * 1.6); // 200:320 viewbox

  return (
    <motion.div
      style={{ width: size, height: h }}
      initial={{ opacity: 0, y: 22, scale: 0.91 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 14, stiffness: 110, delay: 0.12 }}
    >
      <svg viewBox="0 0 200 320" width={size} height={h} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Float idle */}
        <motion.g
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
        >
          {/* ── Hair back layer (drawn before face so sides appear behind it) ── */}
          <path d="M56 76 Q50 58 60 44 Q70 32 84 34 Q92 31 100 33" stroke="#2B1A0D" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M144 76 Q150 58 140 44 Q130 32 116 34 Q108 31 100 33" stroke="#2B1A0D" strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M76 44 Q86 28 100 27 Q114 28 124 44" stroke="#2B1A0D" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* ── Coat ── */}
          <path d="M58 148 Q50 168 46 212 Q42 254 46 292 Q100 304 154 292 Q158 254 154 212 Q150 168 142 148 Z" fill="#F5F7FA" />
          {/* Side shadows */}
          <path d="M58 148 Q52 170 50 208 Q48 242 52 272 Q60 266 66 258 Q68 228 70 198 Q72 170 74 148 Z" fill="#E8EBF2" />
          <path d="M142 148 Q148 170 150 208 Q152 242 148 272 Q140 266 134 258 Q132 228 130 198 Q128 170 126 148 Z" fill="#E8EBF2" />
          {/* Lapels */}
          <path d="M88 148 L74 180 L82 204 L100 192 Z" fill="#E8EBF2" />
          <path d="M112 148 L126 180 L118 204 L100 192 Z" fill="#E8EBF2" />
          {/* Scrub peek between lapels */}
          <path d="M88 148 L100 192 L112 148 Q100 140 88 148 Z" fill="#D2E8EA" />

          {/* ── Left arm (static) ── */}
          <path d="M58 148 Q36 162 32 194 Q28 222 34 244 Q42 256 52 250 Q62 242 62 218 Q62 192 64 165 Q65 152 62 148 Z" fill="#EDBA94" />
          <ellipse cx="35" cy="248" rx="10" ry="8" fill="#EDBA94" />

          {/* ── Right arm (waves once on load) ── */}
          <motion.g
            style={{ transformOrigin: "142px 152px" }}
            animate={{ rotate: [0, -40, 7, -35, 4, -18, 0] }}
            transition={{ duration: 1.65, delay: 0.9, ease: "easeInOut" }}
          >
            <path d="M142 148 Q164 162 168 194 Q172 222 166 244 Q158 256 148 250 Q138 242 138 218 Q138 192 136 165 Q135 152 138 148 Z" fill="#EDBA94" />
            <ellipse cx="165" cy="248" rx="10" ry="8" fill="#EDBA94" />
          </motion.g>

          {/* ── Neck ── */}
          <path d="M88 124 Q88 150 100 152 Q112 150 112 124 Z" fill="#EDBA94" />

          {/* ── Face ── */}
          <ellipse cx="100" cy="88" rx="46" ry="54" fill="#F3C5A3" />

          {/* ── Hair bun (drawn after face so it sits on top) ── */}
          <ellipse cx="100" cy="36" rx="24" ry="18" fill="#2B1A0D" />
          <ellipse cx="108" cy="31" rx="8" ry="5" fill="#3E2418" opacity="0.45" />
          {/* Teal hairpin */}
          <path d="M116 29 Q120 32 124 37" stroke="#046460" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="124.5" cy="38" r="2.2" fill="#046460" />

          {/* ── Ears + pearl earrings ── */}
          <ellipse cx="54" cy="92" rx="6" ry="8" fill="#EDBA94" />
          <ellipse cx="146" cy="92" rx="6" ry="8" fill="#EDBA94" />
          <circle cx="54" cy="100" r="3.5" fill="white" stroke="#CEC0B0" strokeWidth="0.6" />
          <circle cx="146" cy="100" r="3.5" fill="white" stroke="#CEC0B0" strokeWidth="0.6" />
          <circle cx="53" cy="99" r="1" fill="rgba(255,255,255,0.6)" />
          <circle cx="145" cy="99" r="1" fill="rgba(255,255,255,0.6)" />

          {/* ── Eyebrows ── */}
          <path d="M70 69 Q78 64 87 66" stroke="#38200A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M113 66 Q122 64 130 69" stroke="#38200A" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* ── Left eye (almond, clean lid — no individual lash strokes) ── */}
          <path d="M69 80 Q79 74 88 80 Q79 86 69 80 Z" fill="white" />
          <circle cx="78.5" cy="80" r="4.5" fill="#4A2E12" />
          <circle cx="78.5" cy="80" r="2.6" fill="#1A0C04" />
          <circle cx="80" cy="78" r="1.2" fill="white" />
          <path d="M69 80 Q79 73.5 88 80" stroke="#1A0C04" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M71 81 Q79 85 87 81" stroke="#C49070" strokeWidth="0.7" strokeLinecap="round" fill="none" />

          {/* ── Right eye ── */}
          <path d="M112 80 Q121 74 130 80 Q121 86 112 80 Z" fill="white" />
          <circle cx="121" cy="80" r="4.5" fill="#4A2E12" />
          <circle cx="121" cy="80" r="2.6" fill="#1A0C04" />
          <circle cx="122.5" cy="78" r="1.2" fill="white" />
          <path d="M112 80 Q121 73.5 130 80" stroke="#1A0C04" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M114 81 Q121 85 128 81" stroke="#C49070" strokeWidth="0.7" strokeLinecap="round" fill="none" />

          {/* ── Nose (minimal) ── */}
          <path d="M96 102 Q100 108 104 102" stroke="#D0946C" strokeWidth="1.3" strokeLinecap="round" fill="none" />

          {/* ── Lips ── */}
          <path d="M87 115 Q93 111 100 113 Q107 111 113 115 Q107 120 100 118 Q93 120 87 115 Z" fill="#B85C60" />
          <path d="M87 115 Q93 123 100 124 Q107 123 113 115 Q107 120 100 118 Q93 120 87 115 Z" fill="#CA7474" />
          <path d="M95 117 Q100 115 105 117" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* ── Cheek blush ── */}
          <ellipse cx="68" cy="98" rx="9" ry="6" fill="rgba(208,128,108,0.09)" />
          <ellipse cx="132" cy="98" rx="9" ry="6" fill="rgba(208,128,108,0.09)" />

          {/* ── Stethoscope ── */}
          <path d="M82 150 Q80 164 78 178 Q75 198 79 212 Q83 224 93 224 Q100 227 108 220 Q114 208 110 196 Q106 182 106 164 Q106 156 104 150" stroke="#C0C8D8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="96" cy="224" r="7" fill="#C0C8D8" stroke="#AAB2C4" strokeWidth="1.2" />

          {/* ── Medical cross ── */}
          <rect x="116" y="184" width="12" height="3.5" rx="1.75" fill="#046460" />
          <rect x="120.25" y="180" width="3.5" height="12" rx="1.75" fill="#046460" />

          {/* ── Coat buttons ── */}
          <circle cx="100" cy="215" r="2.2" fill="#D2D8E4" />
          <circle cx="100" cy="230" r="2.2" fill="#D2D8E4" />
          <circle cx="100" cy="245" r="2.2" fill="#D2D8E4" />

          {/* ── Blink overlays (skin-colored, normally invisible via scaleY:0) ── */}
          <motion.path
            d="M69 80 Q79 74 88 80 Q79 86 69 80 Z"
            fill="#F3C5A3"
            style={{ transformOrigin: "78.5px 80px" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 0.18, delay: 4, repeat: Infinity, repeatDelay: 5.5 }}
          />
          <motion.path
            d="M112 80 Q121 74 130 80 Q121 86 112 80 Z"
            fill="#F3C5A3"
            style={{ transformOrigin: "121px 80px" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 0.18, delay: 4, repeat: Infinity, repeatDelay: 5.5 }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

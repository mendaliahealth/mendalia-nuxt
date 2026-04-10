import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A6B5A",
          light: "#0D8A72",
          mist: "#E6F4F1",
          faint: "#F0F8F5",
        },
        ink: {
          DEFAULT: "#0A0F0D",
          2: "#1B2D28",
        },
        sage: "#4E7268",
        muted: "#7A9690",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      animation: {
        "drift-a": "drift-a 16s ease-in-out infinite alternate",
        "drift-b": "drift-b 20s ease-in-out infinite alternate-reverse",
        marquee: "marquee 32s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "waveform": "waveform 1.2s ease-in-out infinite",
        "typing-cursor": "typing-cursor 1s step-end infinite",
      },
      keyframes: {
        "drift-a": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(35px, 25px)" },
        },
        "drift-b": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-30px, 20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.5)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "waveform": {
          "0%, 100%": { scaleY: "0.4" },
          "50%": { scaleY: "1" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

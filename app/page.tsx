import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FlowCanvas from "@/components/FlowCanvas";
import VideoReel from "@/components/VideoReel";
import Features from "@/components/Features";
import Augmentation from "@/components/Augmentation";
import AlwaysActiveBand from "@/components/AlwaysActiveBand";
import Testimonials from "@/components/Testimonials";
import ECGBand from "@/components/ECGBand";
import ModesBridge from "@/components/ModesBridge";
import TwoModes from "@/components/TwoModes";
import FAQ from "@/components/FAQ";
import PulseLine from "@/components/PulseLine";
import Pricing from "@/components/Pricing";
import Support from "@/components/Support";
import ICDTicker from "@/components/ICDTicker";
import ForClinicians from "@/components/ForClinicians";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#FFFDF9" }}>
      <Nav />
      <Hero />

      {/* Transparent blend — clinical words appear to rise out of the seam */}
      <div
        aria-hidden
        style={{
          height: 180,
          marginTop: -180,
          position: "relative",
          zIndex: 5,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,253,249,0.55) 40%, rgba(255,253,249,0.88) 70%, #FFFDF9 100%)",
          pointerEvents: "none",
        }}
      />

      <FlowCanvas />
      <VideoReel />
      <Features />
      <AlwaysActiveBand />
      <Augmentation />
      <ECGBand />

      {/* Fade: light → Testimonials dark */}
      <div aria-hidden style={{
        height: 120, marginTop: -120, position: "relative", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, #0A0A0A)",
        pointerEvents: "none",
      }} />

      <Testimonials />

      {/* Fade: Testimonials dark → light */}
      <div aria-hidden style={{
        height: 120, marginTop: -120, position: "relative", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, #fff)",
        pointerEvents: "none",
      }} />

      <ModesBridge />
      <TwoModes />
      <ICDTicker />
      <FAQ />
      <PulseLine />
      <Pricing />
      <Support />
      {/* Fade: Support light → ForClinicians */}
      <div aria-hidden style={{
        height: 100, marginTop: -100, position: "relative", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, #FFFDF9)",
        pointerEvents: "none",
      }} />

      <ForClinicians />

      {/* Fade: ForClinicians light → Footer dark */}
      <div aria-hidden style={{
        height: 120, marginTop: -120, position: "relative", zIndex: 5,
        background: "linear-gradient(to bottom, transparent, #0f0f0f)",
        pointerEvents: "none",
      }} />

      <Footer />
    </main>
  );
}

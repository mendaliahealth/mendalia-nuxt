import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatementSection from "@/components/StatementSection";
import ProductWalkthrough from "@/components/ProductWalkthrough";
import Traction from "@/components/Traction";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Compliance from "@/components/Compliance";
import MobileApp from "@/components/MobileApp";
import Specialties from "@/components/Specialties";
import CompareSection from "@/components/CompareSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <StatementSection />
        <ProductWalkthrough />
        <Traction />
        <Testimonials />
        <Pricing />
        <Compliance />
        <MobileApp />
        <Specialties />
        <CompareSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

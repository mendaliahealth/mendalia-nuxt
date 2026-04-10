import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ResourcesContent from "@/components/ResourcesContent";

export const metadata: Metadata = {
  title: "Resources",
  description: "Mendalia AI vs Heidi Health vs Glass Health — a detailed clinical AI comparison. Research papers, clinical evidence, and more.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <ResourcesContent />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mendalia.com"),
  title: {
    default: "Mendalia AI — The Ambient Clinical Reasoning Engine",
    template: "%s | Mendalia AI",
  },
  description:
    "The AI-native Ambient Clinical Reasoning Engine that goes end to end. From spoken words to differential diagnosis, full care plan, medications, and every clinical letter. Trusted by clinicians worldwide.",
  keywords: [
    "clinical AI","ambient AI scribe","medical AI","clinical reasoning engine",
    "AI differential diagnosis","medical scribe AI","clinical decision support",
    "SOAP note generator","care plan AI","HIPAA compliant AI",
    "multilingual medical AI","physician AI assistant","AI clinical documentation","Mendalia",
  ],
  authors: [{ name: "Mendalia AI", url: "https://www.mendalia.com" }],
  creator: "Mendalia AI",
  publisher: "Sirohi Corporation Pty Ltd",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website", locale: "en_US", url: "https://www.mendalia.com",
    siteName: "Mendalia AI",
    title: "Mendalia AI — The Ambient Clinical Reasoning Engine",
    description: "From spoken words to complete diagnosis. Differential, care plan, medications, and every clinical letter — end to end.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mendalia AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendalia AI — The Ambient Clinical Reasoning Engine",
    description: "The AI-native Ambient Clinical Reasoning Engine. End to end.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://www.mendalia.com" },
};

export const viewport: Viewport = { themeColor: "#0A6B5A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mendalia AI",
          description: "The AI-native Ambient Clinical Reasoning Engine — from spoken words to differential diagnosis, care plan, and clinical letters.",
          applicationCategory: "MedicalApplication",
          operatingSystem: "Web, iOS, Android",
          url: "https://www.mendalia.com",
          offers: [
            { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free Plan" },
            { "@type": "Offer", price: "65", priceCurrency: "USD", name: "Pro Plan" },
            { "@type": "Offer", price: "90", priceCurrency: "USD", name: "Pro + Imaging" },
          ],
          publisher: { "@type": "Organization", name: "Sirohi Corporation Pty Ltd", url: "https://www.mendalia.com" },
        })}} />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="antialiased">{children}</body>
    </html>
  );
}

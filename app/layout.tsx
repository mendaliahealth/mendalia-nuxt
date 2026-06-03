import type { Metadata } from "next";
import { Montserrat, Instrument_Serif } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const BASE = "https://mendalia.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Mendalia AI | Clinical Reasoning OS",
    template: "%s | Mendalia AI",
  },
  description:
    "Mendalia AI is the Clinical Reasoning OS for modern physicians. AI-powered ambient scribing, clinical reasoning, SOAP documentation, differential diagnosis, and case augmentation — from spoken words to complete diagnosis.",
  keywords: [
    "clinical reasoning",
    "clinical reasoning AI",
    "clinical reasoning OS",
    "AI clinical reasoning",
    "ambient clinical AI",
    "AI medical scribe",
    "clinical documentation",
    "SOAP notes AI",
    "differential diagnosis AI",
    "EMR integration",
    "physician AI assistant",
    "Mendalia AI",
    "clinical intelligence",
    "medical AI platform",
    "doctor productivity",
    "AI scribe for doctors",
    "clinical decision support",
    "ambient scribe",
    "healthcare AI",
  ],
  authors: [{ name: "Mendalia AI", url: BASE }],
  creator: "Mendalia AI",
  publisher: "Sirohi Corporation Pty Ltd",
  category: "Healthcare Technology",
  classification: "Medical Software",
  alternates: {
    canonical: BASE,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    title: "Mendalia AI | Clinical Reasoning OS",
    description:
      "The Clinical Reasoning OS for modern physicians. From spoken words to complete diagnosis — ambient scribing, SOAP notes, differential diagnosis, and case augmentation.",
    url: BASE,
    siteName: "Mendalia AI",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/mendalia-logo.png",
        width: 1200,
        height: 630,
        alt: "Mendalia AI — Clinical Reasoning OS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mendalia AI | Clinical Reasoning OS",
    description:
      "The Clinical Reasoning OS for modern physicians. From spoken words to complete diagnosis.",
    images: ["/mendalia-logo.png"],
    creator: "@mendaliaai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",   // add Google Search Console token when available
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Mendalia AI",
      legalName: "Sirohi Corporation Pty Ltd",
      url: BASE,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/mendalia-logo.png`,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressCountry: "AU",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "connect@mendalia.com",
        contactType: "customer support",
      },
      sameAs: [],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE}/#software`,
      name: "Mendalia AI",
      alternateName: "Mendalia Clinical Reasoning OS",
      applicationCategory: "HealthcareApplication",
      applicationSubCategory: "Clinical Decision Support",
      operatingSystem: "Web, iOS, Android, Chrome Extension",
      url: BASE,
      description:
        "Mendalia AI is an ambient Clinical Reasoning OS for physicians. It transcribes live consultations, generates SOAP notes, differential diagnoses, clinical letters, and enables deep case augmentation with AI — turning spoken words into complete clinical documentation.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Mendalia AI",
        },
      },
      publisher: {
        "@id": `${BASE}/#organization`,
      },
      keywords:
        "clinical reasoning, clinical reasoning AI, ambient scribe, AI medical scribe, SOAP notes, differential diagnosis, clinical documentation",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Mendalia AI",
      description: "Clinical Reasoning OS for modern physicians",
      publisher: {
        "@id": `${BASE}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

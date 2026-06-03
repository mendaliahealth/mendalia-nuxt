import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Nav />
      
      <article className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Sirohi Corporation Pty Ltd ("we", "us") is committed to protecting the privacy of clinicians and patients whose data is processed through Mendalia AI. This Policy explains how we collect, use, and safeguard personal information.
          </p>
        </header>

        <div className="space-y-8 text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect account information (name, email, organisation), session metadata, and clinical documentation generated during use of the Platform. We do not sell or share this data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How We Use Your Data</h2>
            <p>Data is used solely to provide and improve the Platform's clinical documentation features. De-identified, aggregated data may be used to improve AI model performance with your consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Data Storage & Security</h2>
            <p>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Clinical data is stored on Google Cloud Platform infrastructure in the Asia-Pacific region. We maintain controls aligned with SOC 2, ISO 27001, and CE standards.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Compliance</h2>
            <p>We operate in accordance with the Australian Privacy Act 1988 (APP), GDPR (EU), HIPAA (US), and India's DPDP Act 2023.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data at any time. Contact us at <a href="mailto:privacy@mendalia.com" className="text-blue-600 underline">privacy@mendalia.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
            <p>We use essential cookies for authentication and session management only. We do not use tracking or advertising cookies.</p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
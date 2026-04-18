import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Mendalia AI",
  description: "Privacy Policy and data practices for Mendalia AI, a clinical reasoning support tool.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Nav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-14 lg:p-20">
          <div className="mb-12 border-b border-slate-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-slate-500 font-medium">
              <p>Mendalia AI</p>
              <span className="hidden sm:inline text-slate-300">•</span>
              <p>Effective Date: April 14, 2026</p>
              <span className="hidden sm:inline text-slate-300">•</span>
              <p>Last Updated: April 14, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate prose-lg lg:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-heading:tracking-tight prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline prose-p:text-slate-600 prose-li:text-slate-600">
            <p className="lead text-xl text-slate-700 font-medium mb-10">
              Mendalia AI ("we," "us," or "our") is committed to protecting the privacy and security of clinical and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the Mendalia AI mobile application and web platform (the "Service").
            </p>
            <p>
              Mendalia AI is a clinical reasoning support tool designed for healthcare professionals. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 className="text-2xl mt-12 mb-6">1. Information We Collect</h2>

            <h3 className="text-xl mt-8 mb-4">A. Personal Account Information</h3>
            <p>When you register for an account, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Identity Data:</strong> Full name, professional title, and gender (for avatar customization).</li>
              <li><strong>Contact Data:</strong> Email address and phone number (for OTP verification).</li>
              <li><strong>Authentication Data:</strong> Google Sign-In identifiers and Firebase Auth tokens.</li>
            </ul>

            <h3 className="text-xl mt-8 mb-4">B. Clinical &amp; Patient Data (The "Processed Data")</h3>
            <p>As an AI-native ambient reasoning engine, we process:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Audio Recordings:</strong> Ambient recordings of clinical consultations (collected only with clinician activation).</li>
              <li><strong>Transcriptions:</strong> Text-based versions of the audio recordings.</li>
              <li><strong>Medical Documents:</strong> Photos or PDFs of lab results, reports, and clinical notes uploaded by the user.</li>
              <li><strong>Patient Metadata:</strong> Names or identifiers used to organize cases within the app.</li>
            </ul>

            <h3 className="text-xl mt-8 mb-4">C. Automatically Collected Data</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Usage Data:</strong> Information on how the Service is accessed (e.g., feature usage, session duration).</li>
              <li><strong>Device Information:</strong> IP address, device type, operating system version, and unique device identifiers.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">2. How We Use Your Information</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>AI Reasoning:</strong> To generate differential diagnoses, care plans, and clinical letters using Large Language Models (LLMs).</li>
              <li><strong>Service Delivery:</strong> To maintain your account, sync cases across devices, and provide real-time updates via Firestore.</li>
              <li><strong>Communication:</strong> To send OTP codes, security alerts, and support responses.</li>
              <li><strong>Improvement:</strong> To monitor usage patterns and improve the accuracy of our clinical reasoning algorithms.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">3. Data Processing and Storage</h2>

            <h3 className="text-xl mt-8 mb-4">A. Single Source of Truth</h3>
            <p>
              All real-time analysis data is stored in Google Cloud Firestore. We employ a "Patching Strategy" to ensure data integrity and real-time synchronization between our Django backend and your mobile/web client.
            </p>

            <h3 className="text-xl mt-8 mb-4">B. AI Processing</h3>
            <p>Clinical data (transcripts and reports) is processed via secure Google Cloud Functions and Vertex AI.</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Data Isolation:</strong> We do not use your specific patient data to train global, multi-tenant Large Language Models.</li>
              <li><strong>Ephemeral Processing:</strong> Audio recordings are processed for transcription and reasoning, then handled according to our data retention schedule.</li>
            </ul>

            <h3 className="text-xl mt-8 mb-4">C. Security Measures</h3>
            <p>We implement industry-standard security protocols, including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Encryption in Transit:</strong> All data is sent via HTTPS/TLS 1.2+.</li>
              <li><strong>Encryption at Rest:</strong> Data in Firestore and GCS is encrypted at the disk level.</li>
              <li><strong>Authentication:</strong> Secure JWT (JSON Web Tokens) and Firebase Authentication.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal or clinical data. We share data only in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Service Providers:</strong> With trusted third parties like Google Cloud Platform (GCP) for hosting and AI processing.</li>
              <li><strong>Legal Requirements:</strong> If required by law to comply with a subpoena or similar legal process.</li>
              <li><strong>Safety:</strong> When we believe disclosure is necessary to protect our rights or the safety of users.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">5. Clinician Responsibility &amp; Patient Consent</h2>
            <p>Mendalia AI is a tool for healthcare professionals.</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Consent:</strong> It is the sole responsibility of the clinician to obtain the necessary verbal or written consent from patients before using the ambient recording or document upload features.</li>
              <li><strong>De-identification:</strong> While our AI assists in reasoning, clinicians are encouraged to follow best practices for data minimization.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">6. Data Retention and Deletion</h2>
            <p>
              We retain account information as long as your account is active. You may request the deletion of specific cases or your entire account at any time through the app settings or by contacting <a href="mailto:connect@mendalia.com">connect@mendalia.com</a>. Upon account deletion, all associated patient data is purged from our active databases.
            </p>

            <h2 className="text-2xl mt-12 mb-6">7. International Data Transfers</h2>
            <p>
              Your information may be transferred to—and maintained on—computers located outside of your state or country where data protection laws may differ. Our primary servers are located in the India and USA via Google Cloud Platform.
            </p>

            <h2 className="text-2xl mt-12 mb-6">8. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Object to the processing of your data.</li>
              <li>Request the portability of your data.</li>
            </ul>

            <h2 className="text-2xl mt-12 mb-6">9. Contact Us</h2>
            <p className="mb-0">
              If you have any questions about this Privacy Policy or our data practices, please contact our support team:
            </p>
            <div className="bg-slate-50 border border-slate-200 mt-6 p-6 rounded-2xl">
              <p className="m-0 font-medium text-slate-800">
                <strong>Email:</strong> <a href="mailto:connect@mendalia.com" className="text-brand">connect@mendalia.com</a><br/>
                <strong>Website:</strong> <a href="https://mendalia.com/support" target="_blank" rel="noopener noreferrer" className="text-brand">https://mendalia.com/support</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

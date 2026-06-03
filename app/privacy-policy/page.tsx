import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./privacy-policy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.container}>
      <Nav />

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Sirohi Corporation Pty Ltd ("we", "us") is committed to protecting the privacy of clinicians and patients whose data is processed through Mendalia AI. This Policy explains how we collect, use, and safeguard personal information.
          </p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <p className={styles.text}>We collect account information (name, email, organisation), session metadata, and clinical documentation generated during use of the Platform. We do not sell or share this data with third parties for marketing purposes.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. How We Use Your Data</h2>
            <p className={styles.text}>Data is used solely to provide and improve the Platform's clinical documentation features. De-identified, aggregated data may be used to improve AI model performance with your consent.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Data Storage & Security</h2>
            <p className={styles.text}>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Clinical data is stored on Google Cloud Platform infrastructure in the Asia-Pacific region. We maintain controls aligned with SOC 2, ISO 27001, and CE standards.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Compliance</h2>
            <p className={styles.text}>We operate in accordance with the Australian Privacy Act 1988 (APP), GDPR (EU), HIPAA (US), and India's DPDP Act 2023.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Your Rights</h2>
            <p className={styles.text}>You have the right to access, correct, or request deletion of your personal data at any time. Contact us at <a href="mailto:privacy@mendalia.com" className={styles.link}>privacy@mendalia.com</a>.</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Cookies</h2>
            <p className={styles.text}>We use essential cookies for authentication and session management only. We do not use tracking or advertising cookies.</p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
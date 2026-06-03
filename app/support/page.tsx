"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./support.module.css";
import { Check, Mail, Clock, ShieldCheck, Activity } from "lucide-react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Simulate sending support request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className={styles.container}>
      <Nav />

      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>Contact Support</h1>
          <p className={styles.subtitle}>
            Have a question, feedback, or need assistance with Mendalia AI? 
            Our team is here to help you integrate and optimize your clinical workflows.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Support Information sidebar */}
          <aside className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Support Info</h2>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <Mail size={12} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Direct Email
                </span>
                <span className={styles.infoValue}>
                  <a href="mailto:connect@mendalia.com" className={styles.infoLink}>
                    connect@mendalia.com
                  </a>
                </span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <Clock size={12} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Response Time
                </span>
                <span className={styles.infoValue}>
                  We typically reply within 24 hours on business days.
                </span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <Activity size={12} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  System Status
                </span>
                <span className={styles.infoValue} style={{ display: "flex", alignItems: "center", gap: 6, color: "#016B61", fontWeight: 600 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#016B61", display: "inline-block" }}></span>
                  All Systems Operational
                </span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>
                  <ShieldCheck size={12} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Privacy & Trust
                </span>
                <span className={styles.infoValue}>
                  Your data is securely handled in compliance with HIPAA, GDPR, and APPs. We never share clinical content.
                </span>
              </div>
            </div>
          </aside>

          {/* Contact form card */}
          <section className={styles.formCard}>
            {status === "success" ? (
              <div className={styles.successContainer}>
                <div className={styles.successIcon}>
                  <Check size={36} />
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. A support engineer will review your request and get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className={styles.resetButton}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. John Doe"
                    required
                    disabled={status === "submitting"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@hospital.org"
                    required
                    disabled={status === "submitting"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you today?"
                    required
                    disabled={status === "submitting"}
                    className={styles.textarea}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: 16 }}>
                    An error occurred. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={styles.button}
                >
                  {status === "submitting" ? "Sending Request..." : "Send Message"}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

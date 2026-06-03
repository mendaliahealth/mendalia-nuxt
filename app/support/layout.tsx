import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Get in touch with the Mendalia support team for any questions, feedback, or assistance with our Clinical Reasoning OS.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

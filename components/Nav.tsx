"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Product", href: "#product" },
    { label: "Traction", href: "#traction" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "/resources" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[900] h-16 flex items-center justify-between px-[5%] transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-xl border-b border-[rgba(10,107,90,0.1)] shadow-sm" : ""
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Mendalia AI Home">
          <Image src="/images/mendalia-logo-light.png" alt="Mendalia AI" width={140} height={36} priority />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 list-none absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-[0.82rem] font-medium text-[var(--sage)] hover:text-[var(--brand)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-3 items-center">
          <a
            href="https://ai.mendalia.com/auth/login"
            className="text-[0.82rem] font-semibold text-[var(--ink)] hover:text-[var(--brand)] transition-colors px-3 py-1.5 rounded-lg"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="bg-[var(--brand)] text-white text-[0.84rem] font-bold px-5 py-2.5 rounded-full hover:bg-[var(--brand-light)] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(10,107,90,0.25)]"
          >
            Get started free
          </a>
        </div>

        {/* Burger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-none border-none p-1.5 cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-5.5 h-[2px] bg-[var(--ink)] rounded" />
          <span className="block w-5.5 h-[2px] bg-[var(--ink)] rounded" />
          <span className="block w-5.5 h-[2px] bg-[var(--ink)] rounded" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[800] bg-white/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className="absolute top-5 right-5 bg-[var(--linen)] rounded-xl w-10 h-10 flex items-center justify-center text-[var(--sage)] text-lg hover:bg-[var(--brand-mist)] transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-2xl font-bold text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://ai.mendalia.com/login"
            className="text-2xl font-bold text-[var(--brand)]"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </a>
          <a
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--brand)] text-white text-base font-bold px-8 py-3.5 rounded-full"
          >
            Get started free
          </a>
        </div>
      )}
    </>
  );
}

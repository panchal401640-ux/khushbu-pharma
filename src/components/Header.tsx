"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, ChevronDown, ExternalLink } from "lucide-react";
import { cn, WHATSAPP_URL, PHONE, COMPANY_FULL } from "@/lib/constants";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white"
      )"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-industrial-900">
              {COMPANY_FULL.split(" ").map((word, i) => (
                <span key={i}>
                  {i === 0 ? (
                    <span className="text-primary-600">{word}</span>
                  ) : (
                    <span> {word}</span>
                  )}
                </span>
              ))}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:text-primary-600 hover:bg-primary-50/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={WHATSAPP_URL()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg shadow-sm transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
            >
              Request a Quote
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={WHATSAPP_URL()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="p-2 rounded-full text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className="cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className="cn(
          "fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
          <span className="text-sm font-bold text-primary-600">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md transition-colors hover:text-primary-600 hover:bg-primary-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
          <Link
            href="/request-quote"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-primary-600 rounded-lg transition-all hover:bg-primary-700"
          >
            Request a Quote
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

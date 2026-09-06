import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  PHONE,
  WHATSAPP_URL,
  EMAIL,
  ADDRESS,
  COMPANY_FULL,
} from "@/lib/constants";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Quality", href: "/quality" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Fluid Bed Dryer", href: "/products/fluid-bed-dryer" },
    { label: "Rapid Mixing Granulator", href: "/products/rapid-mixing-granulator" },
    { label: "Octagonal Blender", href: "/products/octagonal-blender" },
    { label: "Double Cone Blender", href: "/products/double-cone-blender" },
    { label: "Mass Mixer", href: "/products/mass-mixer" },
    { label: "Ribbon Blender", href: "/products/ribbon-blender" },
  ],
  resources: [
    { label: "Product Catalogue", href: "/downloads" },
    { label: "Technical Resources", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-industrial-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
                  {ADDRESS}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} {COMPANY_FULL}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="text-gray-500 hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

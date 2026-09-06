import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Ready to Discuss Your Machinery Requirements?",
  subtitle = "Contact our engineering team for technical specifications and quotation.",
}: CTASectionProps) {
  return (
    <section className="bg-gray-900 py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/request-quote"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            Request a Quote
          </Link>
          <a
            href={WHATSAPP_URL()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import { PHONE, WHATSAPP_URL, EMAIL, COMPANY_FULL } from "@/lib/constants";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function RequestQuotePage() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || undefined;

  useEffect(() => {
    document.title = `Request a Quote | ${COMPANY_FULL}`;
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Request a Quote" },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Request a Quote
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            Share your requirements with us and our engineering team will prepare
            a detailed quotation tailored to your specific needs.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Enquiry Form"
                subtitle="Fill in the details below and we will get back to you within 24 hours."
              />
              <QuoteForm preselectedProduct={preselectedProduct} />
            </div>

            <div className="space-y-6">
              <SectionHeading title="Contact Information" />

              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                </div>
                <a
                  href={`tel:${PHONE}`}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  {PHONE}
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                </div>
                <a
                  href={WHATSAPP_URL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-gray-600 hover:text-blue-600"
                >
                  {EMAIL}
                </a>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-2 font-semibold text-gray-900">
                  Our Process
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      1
                    </span>
                    Submit your enquiry with requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      2
                    </span>
                    Our team reviews your requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      3
                    </span>
                    Receive a detailed quotation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      4
                    </span>
                    Confirm order and production begins
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

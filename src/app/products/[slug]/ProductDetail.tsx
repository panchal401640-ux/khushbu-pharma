"use client";

import { useRef } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { WHATSAPP_URL } from "@/lib/constants";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const enquiryRef = useRef<HTMLDivElement>(null);

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.name },
            ]}
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex-1">
              <span className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                {product.shortDescription}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={scrollToEnquiry}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Request Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={WHATSAPP_URL(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>

            <div className="flex w-full max-w-lg items-center justify-center rounded-lg border border-gray-200 bg-gray-100 p-8 lg:w-96">
              <div className="text-center text-gray-400">
                <span className="text-5xl">📦</span>
                <p className="mt-2 text-sm">{product.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Overview" />
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>

          {product.features.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Key Features
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {product.technicalSpecifications.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Technical Specifications" />
            <div className="max-w-3xl overflow-hidden rounded-lg border border-gray-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 font-semibold text-gray-900">
                      Parameter
                    </th>
                    <th className="px-6 py-3 font-semibold text-gray-900">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {product.technicalSpecifications.map((spec, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-600">{spec.parameter}</td>
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {spec.specification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {product.applications.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Applications" />
            <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
              {product.applications.map((app, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Material of Construction" />
          <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h4 className="mb-2 font-semibold text-gray-900">Contact Parts</h4>
              <p className="text-sm text-gray-600">{product.contactParts}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h4 className="mb-2 font-semibold text-gray-900">
                Non-Contact Parts
              </h4>
              <p className="text-sm text-gray-600">{product.nonContactParts}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h4 className="mb-2 font-semibold text-gray-900">Surface Finish</h4>
              <p className="text-sm text-gray-600">{product.finish}</p>
            </div>
          </div>
        </div>
      </section>

      {product.industries.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Industries Served" />
            <div className="flex max-w-3xl flex-wrap gap-3">
              {product.industries.map((industry, index) => (
                <span
                  key={index}
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Available Configurations" />
          <ul className="grid max-w-3xl gap-2 sm:grid-cols-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Capacity: {product.capacity}
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Material: {product.materialOfConstruction}
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Power: {product.power}
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Controls: {product.controls}
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Motor: {product.motor}
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              Operating Temp: {product.operatingTemperature}
            </li>
          </ul>
        </div>
      </section>

      {product.faq.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle={`Common questions about ${product.name}`}
            />
            <div className="max-w-3xl">
              <FAQ items={product.faq} />
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Related Products"
              subtitle="You may also be interested in these products"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12" ref={enquiryRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Request a Quotation"
            subtitle="Fill in your requirements and we will get back to you with a detailed quotation."
          />
          <div className="max-w-3xl">
            <QuoteForm preselectedProduct={product.slug} />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Settings,
  Shield,
  Wrench,
  Headphones,
  Factory,
  ArrowRight,
  ChevronRight,
  Cog,
  CheckCircle,
  FlaskConical,
  Pill,
  Wheat,
  Sparkles,
  Flower,
  Leaf,
  Atom,
  Microscope,
  Trees,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import FAQ from "@/components/FAQ";
import { products, industries } from "@/data/products";
import { blogPosts } from "@/data/blog";
import { PHONE, EMAIL, ADDRESS } from "@/lib/constants";

const valueCards = [
  {
    icon: Settings,
    title: "Engineering-Focused Design",
    description:
      "Every machine is engineered to meet specific process requirements with precision and reliability.",
  },
  {
    icon: Factory,
    title: "Custom Manufacturing",
    description:
      "We fabricate equipment to your exact specifications, materials, and capacity requirements.",
  },
  {
    icon: Shield,
    title: "Quality Fabrication",
    description:
      "Committed to fabrication quality with proper material selection and surface finish.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    description:
      "Our team provides technical consultation from selection through installation.",
  },
  {
    icon: Headphones,
    title: "B2B Project Assistance",
    description:
      "End-to-end support for pharmaceutical machinery procurement projects.",
  },
];

const industryIcons: Record<string, React.ElementType> = {
  pill: Pill,
  leaf: Leaf,
  "flask-conical": FlaskConical,
  wheat: Wheat,
  sparkles: Sparkles,
  flower: Flower,
  trees: Trees,
  microscope: Microscope,
  atom: Atom,
};

const faqItems = [
  {
    question: "What types of pharmaceutical machinery do you manufacture?",
    answer:
      "We manufacture a wide range of pharmaceutical processing equipment including Fluid Bed Dryers, Rapid Mixing Granulators, Blenders (Octagonal, Double Cone, Octacone), Mixers (Mass Mixer, Ribbon Blender), Dryers (Tray Dryer, Vacuum Tray Dryer, Rotocone Vacuum Dryer), Milling equipment, Coating Pans, Storage and Manufacturing Vessels, Filtration equipment, and more.",
  },
  {
    question: "Do you offer custom fabrication?",
    answer:
      "Yes, we specialize in custom fabrication of pharmaceutical equipment. Our engineering team works closely with customers to design and manufacture equipment based on specific process requirements, capacity, and material specifications.",
  },
  {
    question: "What materials do you use?",
    answer:
      "We primarily work with SS 304, SS 316, and SS 316L stainless steel for pharmaceutical equipment. Material selection depends on the application and process requirements. Contact our team for specific material recommendations.",
  },
  {
    question: "Do you supply internationally?",
    answer:
      "We supply pharmaceutical machinery to customers across India and internationally. Our team can assist with export enquiries and provide suitable packaging for international shipment.",
  },
];

export default function HomeContent() {
  const featuredProducts = products.slice(0, 8);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-industrial-900">
        <div className="tech-grid absolute inset-0 opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-900 via-industrial-900/95 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Pharmaceutical Machinery Engineered for Performance, Reliability
                &amp; Process Excellence
              </h1>
              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Khushbu Pharma Machinery manufactures pharmaceutical and process
                equipment for demanding industrial applications, with a focus on
                engineering, fabrication, quality and customer-specific
                requirements.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                >
                  Explore Machinery
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/request-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Talk to an Engineer
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative mx-auto h-80 w-80">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cog className="h-32 w-32 text-white/20" />
                </div>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <Cog className="h-10 w-10 text-blue-400/40" />
                </div>
                <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                  <Cog className="h-14 w-14 text-blue-500/30" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/3 -translate-y-1/2">
                  <Cog className="h-8 w-8 text-blue-400/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Value Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Engineering Excellence"
            subtitle="Built for demanding pharmaceutical and industrial applications"
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-lg border border-gray-200 p-6 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="bg-industrial-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Product Range"
            subtitle="Pharmaceutical and process equipment for diverse industrial applications"
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Processing equipment for pharmaceutical, chemical, food and cosmetic applications"
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industryIcons[industry.icon] || Settings;
              return (
                <div
                  key={industry.id}
                  className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {industry.name}
                    </h3>
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                    {industry.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {industry.equipment.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="relative overflow-hidden bg-industrial-900 py-20">
        <div className="tech-grid absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Manufacturing Capabilities"
                subtitle="Engineering and fabrication of pharmaceutical processing equipment"
                className="[&_h2]:text-white [&_p]:text-gray-300"
              />
              <div className="mt-6 space-y-4 text-gray-300">
                <p>
                  Our manufacturing facility is equipped with modern fabrication
                  machinery and testing equipment to produce pharmaceutical
                  processing equipment to exacting standards.
                </p>
                <p>
                  From raw material procurement to final assembly, every stage of
                  manufacturing is monitored to ensure quality and consistency.
                  Our team of skilled technicians and engineers ensures that each
                  machine meets the required specifications.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {[
                    "CNC Machining",
                    "TIG/MIG Welding",
                    "Surface Finishing",
                    "Quality Testing",
                  ].map((cap) => (
                    <div
                      key={cap}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/manufacturing"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-industrial-900 transition-colors hover:bg-gray-100"
              >
                Learn More About Our Manufacturing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="relative mx-auto h-72 w-72 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {[
                    { label: "Capacity", value: "Custom" },
                    { label: "Materials", value: "SS 304 / 316 / 316L" },
                    { label: "Standards", value: "cGMP" },
                    { label: "Controls", value: "Manual / PLC" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/10 pb-3"
                    >
                      <span className="text-sm text-gray-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Quality Commitment"
            subtitle="Focused on material quality, fabrication standards and process consistency"
            centered
          />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-gray-600">
              We are committed to delivering pharmaceutical machinery that meets
              the required quality and performance standards. Our focus on proper
              material selection, precise fabrication, and thorough testing
              ensures that every machine performs reliably in its intended
              application.
            </p>
            <Link
              href="/quality"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Read About Our Quality Approach
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog/Resources Preview */}
      <section className="bg-industrial-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technical Resources"
            subtitle="Expert insights on pharmaceutical machinery and processing"
            centered
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <time className="text-xs text-gray-400">{post.date}</time>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-gray-500">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Read More
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            centered
          />
          <div className="mt-12">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      {/* RFQ CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Discuss Your Machinery Requirements?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Contact our engineering team for technical specifications and
            quotation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/request-quote"
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Talk to an Engineer
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get in Touch" centered />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Headphones className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Phone</h3>
              <p className="mt-1 text-sm text-gray-500">{PHONE}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Email</h3>
              <p className="mt-1 text-sm text-gray-500">{EMAIL}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Factory className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Address</h3>
              <p className="mt-1 text-sm text-gray-500">{ADDRESS}</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

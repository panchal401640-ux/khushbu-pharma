'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SectionHeading, FeatureCard } from '@/components/ui/CommonComponents';
import { ProductImage } from '@/components/ui/ProductImage';
import { categories, industriesData } from '@/lib/data';
import { useProducts } from '@/hooks/useLocalData';
import { siteConfig } from '@/lib/constants';
import { CTASection } from '@/components/layout/MobileCTA';

export default function HomePage() {
  const products = useProducts();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-industrial-950 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-industrial-950 via-industrial-900 to-primary-950" />
        <div className="relative container-main py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-primary-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-400 mb-6 border border-primary-600/30">
              Pharmaceutical Machinery Manufacturer
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Pharmaceutical Machinery Engineered for{' '}
              <span className="text-primary-400">Performance</span>,{' '}
              <span className="text-primary-400">Reliability</span> &{' '}
              <span className="text-primary-400">Process Excellence</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-industrial-300 max-w-2xl leading-relaxed">
              Khushbu Pharma Machinery manufactures pharmaceutical and process equipment for demanding industrial applications, with a focus on engineering, fabrication, quality and customer-specific requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button size="lg" className="min-w-[200px]">Explore Machinery</Button>
              </Link>
              <Link href="/quote">
                <Button variant="outline" size="lg" className="min-w-[200px] border-white/30 text-white hover:bg-white/10">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="min-w-[200px] text-white hover:bg-white/10">
                  Talk to an Engineer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-industrial-100">
        <div className="container-main py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '⚙️', label: 'Engineering-Focused Design', desc: 'Custom process solutions' },
              { icon: '🏭', label: 'Custom Manufacturing', desc: 'Built to specification' },
              { icon: '✅', label: 'Quality Fabrication', desc: 'Precision construction' },
              { icon: '🤝', label: 'Technical Support', desc: 'Pre & post delivery' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-industrial-900">{item.label}</p>
                  <p className="text-xs text-industrial-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section bg-industrial-50">
        <div className="container-main">
          <SectionHeading
            badge="Our Products"
            title="Process Equipment Range"
            subtitle="Comprehensive range of pharmaceutical, chemical, food and cosmetic processing machinery."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products/category/${cat.slug}`} className="group">
                <div className="card-hover p-6 h-full">
                  <div className="h-40 rounded-industrial bg-industrial-100 mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-4xl text-industrial-300">
                      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-industrial-900 group-hover:text-primary-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-industrial-600 line-clamp-2">{cat.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-industrial-500">{cat.productCount} Products</span>
                    <span className="text-sm font-medium text-primary-700 group-hover:translate-x-1 transition-transform">
                      View Range →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-white">
        <div className="container-main">
          <SectionHeading
            badge="Featured Equipment"
            title="Machinery for Your Process"
            subtitle="Explore our most requested equipment or browse the full product catalogue."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="card-hover overflow-hidden h-full flex flex-col">
                  <div className="h-48 bg-industrial-100 flex items-center justify-center overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <ProductImage src={product.images[0].src} alt={product.images[0].alt || product.name} name={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="h-20 w-20 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">{product.category}</span>
                    <h3 className="mt-1 text-base font-semibold text-industrial-900 group-hover:text-primary-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-industrial-600 line-clamp-2 flex-1">{product.shortDescription}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm font-medium text-primary-700 group-hover:translate-x-1 transition-transform">View Details →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section bg-industrial-50">
        <div className="container-main">
          <SectionHeading
            badge="Industries We Serve"
            title="Equipment for Diverse Applications"
            subtitle="Our machinery is used across pharmaceutical, chemical, food, and specialty processing industries."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industriesData.map((ind) => (
              <Link key={ind.id} href={`/industries#${ind.slug}`} className="group">
                <div className="card p-5 text-center hover:border-primary-300 transition-colors">
                  <h3 className="text-sm font-semibold text-industrial-900 group-hover:text-primary-700 transition-colors">
                    {ind.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Section */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
                Our Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-industrial-900 tracking-tight">
                Engineering & Manufacturing Excellence
              </h2>
              <p className="mt-4 text-lg text-industrial-600">
                From design engineering to final delivery, every piece of equipment is manufactured with attention to process requirements, material specifications, and quality standards.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  'Sheet Metal Fabrication',
                  'SS 304/316 Welding',
                  'Grinding & Finishing',
                  'Assembly & Integration',
                  'Quality Inspection',
                  'Process Testing',
                ].map((cap) => (
                  <div key={cap} className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-industrial-700">{cap}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/manufacturing">
                  <Button>Learn More About Manufacturing</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-industrial-lg bg-industrial-100 flex items-center justify-center">
                <svg className="h-32 w-32 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Enquire */}
      <section className="section bg-industrial-50">
        <div className="container-main">
          <SectionHeading
            badge="Why Khushbu Pharma Machinery"
            title="Built for Process Performance"
            subtitle="Every machine is manufactured to meet your specific process and quality requirements."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              title="Engineering-Focused"
              description="Equipment designed around your process requirements with technical consultation."
            />
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
              title="Custom Fabrication"
              description="Machines built to your exact specifications including capacity, MOC, and configuration."
            />
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
              title="Quality Documentation"
              description="Material test certificates, dimensional reports, and process documentation available."
            />
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Technical Support"
              description="Pre-delivery and post-delivery technical support for installation and commissioning."
            />
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Project Supply"
              description="Complete project support for domestic and international customers."
            />
            <FeatureCard
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
              title="Process Documentation"
              description="Technical specifications, user manuals, and process guidelines provided with each machine."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-main max-w-3xl">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
          />
          <div className="mt-10 space-y-0 divide-y divide-industrial-200 border-t border-industrial-200">
            {[
              {
                q: 'Can machines be customized according to our requirements?',
                a: 'Yes. All equipment can be customized based on capacity, material of construction, contact parts specification, control system, and other process requirements.',
              },
              {
                q: 'What materials are used for contact parts?',
                a: 'Contact parts are available in SS 304, SS 316, and SS 316L. The selection depends on the product being processed and regulatory requirements.',
              },
              {
                q: 'Do you provide technical documentation?',
                a: 'Yes. Material test certificates, dimensional inspection reports, and operation manuals are provided with equipment.',
              },
              {
                q: 'What industries do you serve?',
                a: 'We serve pharmaceutical, nutraceutical, chemical, food processing, cosmetics, ayurvedic, and research & development industries.',
              },
            ].map((faq, i) => (
              <div key={i} className="py-5">
                <h3 className="text-base font-semibold text-industrial-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-industrial-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

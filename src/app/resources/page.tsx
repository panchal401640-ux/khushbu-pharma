import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/CommonComponents';
import { siteConfig } from '@/lib/config';
import { products } from '@/data/products';;

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Resources' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Technical Resources</h1>
          <p className="mt-3 text-industrial-300">Technical articles, equipment guides, and frequently asked questions.</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-main max-w-5xl">
          <h2 className="text-2xl font-bold text-industrial-900 mb-8">Technical Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              { title: 'What is a Fluid Bed Dryer?', excerpt: 'Understanding the working principle, applications, and key features.', category: 'Equipment Guide', date: '2024-01-15' },
              { title: 'Rapid Mixing Granulator Working Principle', excerpt: 'How RMGs work, key components, and factors affecting granulation quality.', category: 'Equipment Guide', date: '2024-01-10' },
              { title: 'How to Select a Pharmaceutical Blender', excerpt: 'Guide to selecting the right blender type for your process application.', category: 'Selection Guide', date: '2024-01-05' },
              { title: 'SS 304 vs SS 316 for Pharmaceutical Equipment', excerpt: 'Understanding the differences between stainless steel grades for contact parts.', category: 'Technical', date: '2023-12-20' },
            ].map((post) => (
              <div key={post.title} className="card-hover p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 uppercase tracking-wider">{post.category}</span>
                  <span className="text-xs text-industrial-400">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-industrial-900">{post.title}</h3>
                <p className="mt-2 text-sm text-industrial-600 flex-1 line-clamp-2">{post.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-primary-700">Read More →</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-industrial-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: 'What types of pharmaceutical machinery do you manufacture?', a: 'We manufacture fluid bed dryers, rapid mixing granulators, blenders (octagonal, octacone, double cone, ribbon), dryers (tray, vacuum tray, rotocone vacuum), mixers (mass mixer), mills (multi mill), coating pans, process vessels, and filtration/sifting equipment.' },
              { q: 'Can equipment be customized?', a: 'Yes. All equipment can be customized based on capacity, material of construction, contact parts specification, control system, dimensions, and other process requirements.' },
              { q: 'What materials are used for construction?', a: 'Equipment is available in SS 304, SS 316, and SS 316L. Contact parts are typically SS 316 or SS 316L based on product compatibility and regulatory requirements.' },
              { q: 'Do you export equipment?', a: 'Yes. We supply equipment to domestic and international customers. Contact our team to discuss your project requirements.' },
              { q: 'What documentation is provided with equipment?', a: 'Material test certificates, dimensional inspection reports, operation manuals, and process documentation are provided with equipment.' },
              { q: 'How do I get a quotation?', a: 'You can request a quotation through our website quote form, WhatsApp, email, or phone. Share your requirements and we will provide specifications and pricing.' },
            ].map((faq, i) => (
              <div key={i} className="border-b border-industrial-200 pb-4 pt-4">
                <h3 className="font-medium text-industrial-900">{faq.q}</h3>
                <p className="mt-2 text-sm text-industrial-600 line-clamp-1">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-industrial-600 mb-4">Have a question not listed here?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact"><Button>Contact Us</Button></Link>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp">WhatsApp Us</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
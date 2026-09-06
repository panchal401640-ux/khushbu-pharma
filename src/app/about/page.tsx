import React from 'react';
import { Breadcrumb, SectionHeading, FeatureCard } from '@/components/ui/CommonComponents';
import { CTASection } from '@/components/layout/MobileCTA';

export default function AboutPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'About Us' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">About Khushbu Pharma Machinery</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">Pharmaceutical machinery manufacturer focused on engineering, fabrication and process equipment solutions.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Who We Are</h2>
              <p className="text-industrial-600 leading-relaxed">
                Khushbu Pharma Machinery is a manufacturer of pharmaceutical, chemical, food and cosmetic processing machinery. We design and fabricate equipment for industrial process applications, with a focus on engineering quality, material standards and customer-specific requirements.
              </p>
              <p className="mt-4 text-industrial-600 leading-relaxed">
                Our product range includes fluid bed dryers, rapid mixing granulators, blenders, dryers, mixers, mills, process vessels, filtration equipment and custom fabricated machinery. Each machine is built to meet the process and quality needs of our customers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Our Engineering Approach</h2>
              <p className="text-industrial-600 leading-relaxed">
                Every project begins with understanding the customer&apos;s process requirements. Our engineering team works closely with customers to determine the right equipment specifications, material of construction, capacity, and configuration for their application.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-8">Manufacturing Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Engineering & Design', desc: 'Process equipment design and engineering based on customer requirements.' },
                  { title: 'Sheet Metal Fabrication', desc: 'Precision cutting, bending, and forming of stainless steel and other metals.' },
                  { title: 'SS Fabrication', desc: 'Stainless steel 304, 316, and 316L fabrication for pharmaceutical applications.' },
                  { title: 'Welding', desc: 'TIG/MIG welding with attention to weld quality and surface finish.' },
                  { title: 'Grinding & Finishing', desc: 'Surface grinding, polishing, and finishing to required specifications.' },
                  { title: 'Assembly & Testing', desc: 'Complete machine assembly, testing, and documentation.' },
                ].map((item) => (
                  <FeatureCard key={item.title} icon={<div className="h-6 w-6 rounded bg-primary-100" />} title={item.title} description={item.desc} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Industries We Serve</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {['Pharmaceutical', 'Nutraceutical', 'Chemical', 'Food Processing', 'Cosmetics', 'Ayurvedic & Herbal', 'Research & Development', 'Specialty Chemicals'].map(ind => (
                  <div key={ind} className="rounded-industrial border border-industrial-200 px-4 py-3 text-sm font-medium text-industrial-700 text-center">{ind}</div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Quality Commitment</h2>
              <p className="text-industrial-600 leading-relaxed">
                We focus on material selection, fabrication quality, and dimensional accuracy in every machine we build. Documentation including material test certificates and inspection reports are available with our equipment.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-industrial-900 mb-4">Customer Support</h2>
              <p className="text-industrial-600 leading-relaxed">
                Our technical support extends from initial consultation through installation and commissioning. We provide technical documentation, user manuals and process guidelines with each machine.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

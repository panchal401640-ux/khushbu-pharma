import React from 'react';
import { Breadcrumb, SectionHeading, FeatureCard } from '@/components/ui/CommonComponents';
import { CTASection } from '@/components/layout/MobileCTA';

export default function ManufacturingPage() {
  const capabilities = [
    { title: 'Engineering & Design', desc: 'Process equipment design, 3D modeling, and engineering based on customer requirements and process specifications.' },
    { title: 'Sheet Metal Fabrication', desc: 'Precision CNC cutting, bending, and forming of stainless steel sheets and plates.' },
    { title: 'SS 304/316 Fabrication', desc: 'Stainless steel fabrication for pharmaceutical and chemical applications with proper material traceability.' },
    { title: 'TIG/MIG Welding', desc: 'Stainless steel welding with attention to weld quality, penetration, and surface finish.' },
    { title: 'Grinding & Polishing', desc: 'Surface grinding, mirror polishing, and finishing to required Ra values.' },
    { title: 'Machining', desc: 'CNC and conventional machining for precision components and fittings.' },
    { title: 'Assembly', desc: 'Complete machine assembly with mechanical, electrical, and control system integration.' },
    { title: 'Testing & Inspection', desc: 'Functional testing, dimensional inspection, and documentation.' },
    { title: 'Machine Integration', desc: 'Complete process line integration with upstream and downstream equipment.' },
  ];

  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Manufacturing' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Manufacturing Facility</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">From raw material to finished equipment — complete in-house manufacturing capabilities.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <SectionHeading
            badge="Capabilities"
            title="Our Manufacturing Process"
            subtitle="Every machine goes through a structured manufacturing process to ensure quality and consistency."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <FeatureCard key={cap.title} icon={<div className="h-6 w-6 rounded bg-primary-100" />} title={cap.title} description={cap.desc} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-industrial-50">
        <div className="container-main max-w-4xl">
          <SectionHeading badge="Facility" title="Workshop & Infrastructure" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Covered manufacturing area',
              'CNC cutting and bending machines',
              'TIG/MIG welding stations',
              'Grinding and polishing equipment',
              'Machining workshop',
              'Assembly area',
              'Testing and inspection zone',
              'Raw material storage',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-industrial border border-industrial-200 p-4">
                <svg className="h-5 w-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-industrial-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-industrial-500 italic">
              Actual facility images available on request. Share your requirements and we will provide relevant documentation.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

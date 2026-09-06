import React from 'react';
import { Breadcrumb, SectionHeading } from '@/components/ui/CommonComponents';
import { CTASection } from '@/components/layout/MobileCTA';

export default function QualityPage() {
  const qualityAspects = [
    { title: 'Material Selection', desc: 'Careful selection of stainless steel grades (SS 304, SS 316, SS 316L) based on product compatibility and process requirements. Material test certificates provided.' },
    { title: 'Fabrication Quality', desc: 'Precision sheet metal work with CNC cutting and forming for consistent dimensions and fitment.' },
    { title: 'Welding', desc: 'TIG welding for pharmaceutical contact surfaces with attention to weld penetration, consistency and finish. Weld grinding and polishing as required.' },
    { title: 'Surface Finish', desc: 'Mirror polishing, matte finishing, or bead blasting as per customer specification. Surface roughness verified as required.' },
    { title: 'Dimensional Inspection', desc: 'Dimensional checks during fabrication and at final assembly to ensure compliance with specifications.' },
    { title: 'Functional Testing', desc: 'Machine testing for mechanical operation, electrical safety, and process performance before dispatch.' },
    { title: 'Documentation', desc: 'Material test certificates, dimensional reports, and operation manuals provided with equipment.' },
    { title: 'Final Inspection', desc: 'Pre-dispatch inspection and sign-off before delivery to customer.' },
  ];

  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Quality' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Quality Assurance</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">Systematic approach to quality in material, fabrication, and documentation.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <SectionHeading
            badge="Quality Process"
            title="Our Quality Approach"
            subtitle="Quality is built into every stage of the manufacturing process, from material selection to final dispatch."
          />
          <div className="mt-12 space-y-6">
            {qualityAspects.map((aspect, i) => (
              <div key={i} className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-industrial-900">{aspect.title}</h3>
                  <p className="mt-2 text-sm text-industrial-600 leading-relaxed">{aspect.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-industrial-lg border border-industrial-200 bg-industrial-50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-industrial-900 mb-3">Certifications</h3>
            <p className="text-sm text-industrial-600 leading-relaxed">
              Certification details are available on request. Contact our team for specific certification requirements for your project.
            </p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

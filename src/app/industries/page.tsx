import React from 'react';
import { Breadcrumb, SectionHeading } from '@/components/ui/CommonComponents';
import { industriesData } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Industries' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Industries We Serve</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">Process equipment solutions for pharmaceutical, chemical, food, and specialty processing applications.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <div className="space-y-8">
            {industriesData.map((ind) => (
              <div key={ind.id} id={ind.slug} className="rounded-industrial-lg border border-industrial-200 p-6 sm:p-8 scroll-mt-24">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-industrial-900">{ind.name}</h2>
                    <p className="mt-3 text-industrial-600 leading-relaxed">{ind.description}</p>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-industrial-700 mb-2">Applications:</h3>
                      <div className="flex flex-wrap gap-2">
                        {ind.applications.map((app, i) => (
                          <span key={i} className="inline-block rounded-full bg-industrial-100 px-3 py-1 text-xs font-medium text-industrial-600">{app}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-industrial-700 mb-2">Relevant Equipment:</h3>
                      <div className="flex flex-wrap gap-2">
                        {ind.relevantProducts.slice(0, 4).map((pSlug) => (
                          <Link key={pSlug} href={`/products/${pSlug}`} className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors">
                            {pSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

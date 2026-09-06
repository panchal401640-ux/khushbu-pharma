'use client';

import React from 'react';
import { Breadcrumb, EmptyState } from '@/components/ui/CommonComponents';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/config';

const downloadCategories = [
  {
    id: 'profile',
    title: 'Company Profile',
    items: [
      { title: 'Khushbu Pharma Machinery - Company Profile', type: 'PDF', size: 'Contact us for latest version' },
    ],
  },
  {
    id: 'catalogue',
    title: 'Product Catalogue',
    items: [
      { title: 'Complete Product Catalogue', type: 'PDF', size: 'Contact us for latest version' },
    ],
  },
  {
    id: 'brochures',
    title: 'Technical Brochures',
    items: [
      { title: 'Fluid Bed Dryer - Technical Brochure', type: 'PDF', size: 'Contact us for latest version' },
      { title: 'Rapid Mixing Granulator - Technical Brochure', type: 'PDF', size: 'Contact us for latest version' },
      { title: 'Blenders Range - Technical Brochure', type: 'PDF', size: 'Contact us for latest version' },
    ],
  },
  {
    id: 'specifications',
    title: 'Machine Specifications',
    items: [
      { title: 'Equipment Range Overview', type: 'PDF', size: 'Contact us for latest version' },
    ],
  },
];

export default function DownloadsPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Downloads' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Downloads & Resources</h1>
          <p className="mt-3 text-industrial-300">Company profile, product catalogues, and technical brochures.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <div className="mb-8 rounded-industrial-lg bg-primary-50 border border-primary-200 p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">Request Documents</h3>
            <p className="text-sm text-primary-800 mb-4">
              Latest catalogues and brochures are available on request. Contact us to receive the most up-to-date documentation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello, I would like to receive the latest product catalogue and company profile.')}`} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="sm">Request via WhatsApp</Button>
              </a>
              <a href="/contact">
                <Button variant="secondary" size="sm">Contact Us</Button>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {downloadCategories.map((cat) => (
              <div key={cat.id} id={cat.id}>
                <h2 className="text-xl font-bold text-industrial-900 mb-4">{cat.title}</h2>
                <div className="space-y-3">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-industrial border border-industrial-200 p-4 hover:border-primary-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-red-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-red-600">{item.type}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-industrial-900">{item.title}</p>
                          <p className="text-xs text-industrial-500">{item.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" disabled>Request</Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { Breadcrumb, SectionHeading, EmptyState } from '@/components/ui/CommonComponents';

const galleryCategories = [
  { id: 'all', name: 'All' },
  { id: 'machines', name: 'Machines' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'fabrication', name: 'Fabrication' },
  { id: 'finished', name: 'Finished Equipment' },
  { id: 'installation', name: 'Installation' },
];

const galleryImages = [
  { id: '1', category: 'machines', alt: 'Fluid Bed Dryer' },
  { id: '2', category: 'machines', alt: 'Rapid Mixing Granulator' },
  { id: '3', category: 'machines', alt: 'Octagonal Blender' },
  { id: '4', category: 'machines', alt: 'Rotocone Vacuum Dryer' },
  { id: '5', category: 'manufacturing', alt: 'Sheet Metal Fabrication' },
  { id: '6', category: 'manufacturing', alt: 'Welding Process' },
  { id: '7', category: 'fabrication', alt: 'SS Vessel Fabrication' },
  { id: '8', category: 'fabrication', alt: 'Component Machining' },
  { id: '9', category: 'finished', alt: 'Completed Equipment' },
  { id: '10', category: 'finished', alt: 'Ready for Dispatch' },
  { id: '11', category: 'installation', alt: 'Customer Installation' },
  { id: '12', category: 'installation', alt: 'Commissioning Support' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? galleryImages : galleryImages.filter(img => img.category === activeCategory);

  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Gallery' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Gallery</h1>
          <p className="mt-3 text-industrial-300">Machines, manufacturing process, and project installations.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <div className="flex flex-wrap gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary-700 text-white'
                    : 'bg-industrial-100 text-industrial-700 hover:bg-industrial-200'
                "`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="No images" description="Gallery images will be uploaded soon." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img) => (
                <div key={img.id} className="aspect-square rounded-industrial-lg bg-industrial-100 flex items-center justify-center group cursor-pointer hover:shadow-card-hover transition-all">
                  <div className="text-center p-4">
                    <svg className="h-12 w-12 mx-auto text-industrial-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-industrial-500">{img.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-industrial-500 italic">
              Actual equipment and facility images available on request. Contact us for project-specific references.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

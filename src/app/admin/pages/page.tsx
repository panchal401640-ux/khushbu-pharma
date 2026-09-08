'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../AdminLayout';

interface PageContent {
  [page: string]: {
    [section: string]: {
      title?: string;
      subtitle?: string;
      description?: string;
      cta?: string;
      ctaLink?: string;
      image?: string;
    };
  };
}

const defaultPages: PageContent = {
  home: {
    hero: {
      title: 'Engineering Excellence in Pharmaceutical Machinery',
      subtitle: 'Manufacturing precision processing equipment for pharmaceutical, chemical, food & cosmetic industries.',
      cta: 'Explore Products',
      ctaLink: '/products',
    },
    whyUs: {
      title: 'Why Choose Khushbu Pharma?',
      subtitle: 'Trusted by 500+ pharmaceutical companies across India and export markets.',
    },
    cta: {
      title: 'Ready to Discuss Your Project?',
      subtitle: 'Get expert consultation and competitive quotation for your pharmaceutical machinery requirements.',
      cta: 'Get Free Quote',
      ctaLink: '/quote',
    },
  },
  about: {
    hero: {
      title: 'About Khushbu Pharma Machinery',
      subtitle: 'Leading manufacturer of pharmaceutical processing machinery since 2010.',
    },
    story: {
      title: 'Our Story',
      description: 'Khushbu Pharma Machinery was founded with a vision to provide world-class pharmaceutical processing equipment to the Indian and global markets. With over a decade of experience, we have established ourselves as a trusted name in the industry.',
    },
    values: {
      title: 'Our Values',
      subtitle: 'Quality, Innovation, Reliability, Customer Satisfaction',
    },
  },
  contact: {
    hero: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for enquiries, quotations, and technical support.',
    },
    info: {
      title: 'Get In Touch',
    },
  },
  manufacturing: {
    hero: {
      title: 'Our Manufacturing',
      subtitle: 'State-of-the-art manufacturing facility with modern equipment and quality controls.',
    },
  },
  quality: {
    hero: {
      title: 'Quality Assurance',
      subtitle: 'ISO certified quality management system ensuring consistent product excellence.',
    },
  },
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageContent>(defaultPages);
  const [selectedPage, setSelectedPage] = useState('home');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kpm_pages');
    if (stored) setPages(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    localStorage.setItem('kpm_pages', JSON.stringify(pages));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSection = (page: string, section: string, field: string, value: string) => {
    setPages(prev => ({
      ...prev,
      [page]: {
        ...(prev[page] || {}),
        [section]: {
          ...(prev[page]?.[section] || {}),
          [field]: value,
        },
      },
    }));
  };

  const addSection = (page: string) => {
    const name = prompt('Enter section name (e.g., "features", "testimonials"):');
    if (!name) return;
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    updateSection(page, key, 'title', 'New Section Title');
  };

  const removeSection = (page: string, section: string) => {
    if (!confirm(`Delete section "${section}"?`)) return;
    setPages(prev => {
      const updated = { ...prev };
      delete updated[page][section];
      return { ...updated, [page]: updated[page] };
    });
  };

  const pageNames: Record<string, string> = {
    home: 'Homepage',
    about: 'About Page',
    contact: 'Contact Page',
    manufacturing: 'Manufacturing Page',
    quality: 'Quality Page',
  };

  const sectionLabels: Record<string, string> = {
    hero: 'Hero Banner',
    whyUs: 'Why Choose Us',
    cta: 'Call to Action',
    story: 'Our Story',
    values: 'Our Values',
    info: 'Contact Info',
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-6">
        {saved && (
          <div className="rounded-industrial bg-green-50 border border-green-200 p-4 text-sm text-green-700">
            Page content saved!
          </div>
        )}

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Edit Any Page Content</h3>
          <p className="text-sm text-industrial-600 mb-4">Select a page and edit its sections below. Changes are saved to browser localStorage.</p>

          {/* Page Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(pages).map(page => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`px-4 py-2 rounded-industrial text-sm font-medium transition-colors ${selectedPage === page ? 'bg-primary-700 text-white' : 'bg-industrial-100 text-industrial-700 hover:bg-industrial-200'}`}
              >
                {pageNames[page] || page}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {Object.entries(pages[selectedPage] || {}).map(([sectionKey, section]) => (
              <div key={sectionKey} className="border border-industrial-200 rounded-industrial-lg p-5 relative group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-industrial-900">{sectionLabels[sectionKey] || sectionKey}</h4>
                    <span className="text-xs text-industrial-400 bg-industrial-50 px-2 py-0.5 rounded">.{sectionKey}</span>
                  </div>
                  <button
                    onClick={() => removeSection(selectedPage, sectionKey)}
                    className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Delete Section
                  </button>
                </div>
                <div className="space-y-3">
                  {section.title !== undefined && (
                    <div>
                      <label className="block text-xs font-medium text-industrial-500 mb-1">Title</label>
                      <input value={section.title || ''} onChange={e => updateSection(selectedPage, sectionKey, 'title', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                    </div>
                  )}
                  {section.subtitle !== undefined && (
                    <div>
                      <label className="block text-xs font-medium text-industrial-500 mb-1">Subtitle</label>
                      <input value={section.subtitle || ''} onChange={e => updateSection(selectedPage, sectionKey, 'subtitle', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                    </div>
                  )}
                  {section.description !== undefined && (
                    <div>
                      <label className="block text-xs font-medium text-industrial-500 mb-1">Description</label>
                      <textarea value={section.description || ''} onChange={e => updateSection(selectedPage, sectionKey, 'description', e.target.value)} rows={3} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                    </div>
                  )}
                  {section.cta !== undefined && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-industrial-500 mb-1">Button Text</label>
                        <input value={section.cta || ''} onChange={e => updateSection(selectedPage, sectionKey, 'cta', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-industrial-500 mb-1">Button Link</label>
                        <input value={section.ctaLink || ''} onChange={e => updateSection(selectedPage, sectionKey, 'ctaLink', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={() => addSection(selectedPage)}
              className="w-full py-3 border-2 border-dashed border-industrial-300 rounded-industrial text-sm text-industrial-500 hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              + Add New Section
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} className="px-6 py-3 bg-primary-700 text-white rounded-industrial text-sm font-medium hover:bg-primary-800 transition-colors">
            Save Page Content
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

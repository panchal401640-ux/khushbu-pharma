'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../AdminLayout';
import {
  Home,
  Info,
  Phone,
  LayoutTemplate,
  Save,
  Eye,
  Check,
  Edit3,
} from 'lucide-react';

interface PageContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCTA: string;
    aboutTitle: string;
    aboutText: string;
    productsTitle: string;
    productsText: string;
    contactTitle: string;
    contactText: string;
  };
  about: {
    title: string;
    mission: string;
    vision: string;
    values: string;
    history: string;
    team: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    formSuccess: string;
    mapEmbed: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    description: string;
  };
}

const defaultContent: PageContent = {
  home: {
    heroTitle: 'Precision Pharmaceutical Machinery',
    heroSubtitle: 'Engineering Excellence for Pharmaceutical, Chemical, Food & Cosmetic Industries',
    heroCTA: 'Get a Quote',
    aboutTitle: 'About Khushbu Pharma Machinery',
    aboutText: 'Leading manufacturer of pharmaceutical processing equipment with decades of experience.',
    productsTitle: 'Our Products',
    productsText: 'Explore our range of GMP-compliant machinery.',
    contactTitle: 'Contact Us',
    contactText: 'Get in touch for custom solutions.',
  },
  about: {
    title: 'About Khushbu Pharma Machinery',
    mission: 'To manufacture high-quality pharmaceutical machinery that meets global standards.',
    vision: 'To be the preferred partner for pharmaceutical processing equipment worldwide.',
    values: 'Quality, Innovation, Integrity, Customer Satisfaction',
    history: 'Established with a vision to provide world-class pharmaceutical machinery.',
    team: 'Our team of experienced engineers ensures every product meets the highest standards.',
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    formTitle: 'Send us a Message',
    formSuccess: 'Thank you! We will get back to you shortly.',
    mapEmbed: '',
  },
  footer: {
    tagline: 'Pharmaceutical Machinery Manufacturer',
    copyright: '© 2024 Khushbu Pharma Machinery. All rights reserved.',
    description: 'Leading manufacturer of pharmaceutical, chemical, food & cosmetic processing machinery.',
  },
};

type TabKey = 'home' | 'about' | 'contact' | 'footer';

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { key: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  { key: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  { key: 'footer', label: 'Footer', icon: <LayoutTemplate className="w-4 h-4" /> },
];

export default function AdminContentPage() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_pages');
      if (stored) {
        setContent((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch {}
  }, []);

  const handleSave = () => {
    localStorage.setItem('kpm_pages', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = (tab: TabKey, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }));
  };

  const renderField = (tab: TabKey, field: string, label: string, type: 'text' | 'textarea' = 'text') => {
    const value = (content[tab] as any)[field] || '';
    if (type === 'textarea') {
      return (
        <div key={field}>
          <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
          <textarea
            value={value}
            onChange={(e) => updateField(tab, field, e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
          />
        </div>
      );
    }
    return (
      <div key={field}>
        <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => updateField(tab, field, e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
        />
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Hero Section</h3>
            {renderField('home', 'heroTitle', 'Hero Title')}
            {renderField('home', 'heroSubtitle', 'Hero Subtitle')}
            {renderField('home', 'heroCTA', 'CTA Button Text')}

            <h3 className="text-lg font-semibold text-slate-900 pt-4 border-t border-slate-200">About Section</h3>
            {renderField('home', 'aboutTitle', 'Section Title')}
            {renderField('home', 'aboutText', 'Section Text', 'textarea')}

            <h3 className="text-lg font-semibold text-slate-900 pt-4 border-t border-slate-200">Products Section</h3>
            {renderField('home', 'productsTitle', 'Section Title')}
            {renderField('home', 'productsText', 'Section Text', 'textarea')}

            <h3 className="text-lg font-semibold text-slate-900 pt-4 border-t border-slate-200">Contact Section</h3>
            {renderField('home', 'contactTitle', 'Section Title')}
            {renderField('home', 'contactText', 'Section Text', 'textarea')}
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            {renderField('about', 'title', 'Page Title')}
            {renderField('about', 'mission', 'Mission Statement', 'textarea')}
            {renderField('about', 'vision', 'Vision Statement', 'textarea')}
            {renderField('about', 'values', 'Core Values', 'textarea')}
            {renderField('about', 'history', 'Company History', 'textarea')}
            {renderField('about', 'team', 'Team Description', 'textarea')}
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-6">
            {renderField('contact', 'title', 'Page Title')}
            {renderField('contact', 'subtitle', 'Subtitle')}
            {renderField('contact', 'formTitle', 'Form Title')}
            {renderField('contact', 'formSuccess', 'Success Message')}
            {renderField('contact', 'mapEmbed', 'Google Maps Embed Code', 'textarea')}
          </div>
        );
      case 'footer':
        return (
          <div className="space-y-6">
            {renderField('footer', 'tagline', 'Company Tagline')}
            {renderField('footer', 'description', 'Company Description', 'textarea')}
            {renderField('footer', 'copyright', 'Copyright Text')}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-6">
        {saved && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 font-medium flex items-center gap-2">
            <Check className="w-5 h-5" />
            Content saved successfully!
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">{renderTabContent()}</div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <a
            href="/"
            target="_blank"
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            View Website ↗
          </a>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview - {tabs.find((t) => t.key === activeTab)?.label} Page
            </h3>
            <div className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-300">
              {activeTab === 'home' && (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <h1 className="text-3xl font-bold text-slate-900">{content.home.heroTitle}</h1>
                    <p className="text-lg text-slate-600 mt-2">{content.home.heroSubtitle}</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">{content.home.heroCTA}</button>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <h2 className="text-xl font-semibold">{content.home.aboutTitle}</h2>
                    <p className="text-slate-600 mt-2">{content.home.aboutText}</p>
                  </div>
                </div>
              )}
              {activeTab === 'about' && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{content.about.title}</h1>
                  <div><strong>Mission:</strong> {content.about.mission}</div>
                  <div><strong>Vision:</strong> {content.about.vision}</div>
                  <div><strong>Values:</strong> {content.about.values}</div>
                  <div><strong>History:</strong> {content.about.history}</div>
                  <div><strong>Team:</strong> {content.about.team}</div>
                </div>
              )}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{content.contact.title}</h1>
                  <p className="text-slate-600">{content.contact.subtitle}</p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-semibold">{content.contact.formTitle}</h3>
                    <p className="text-sm text-green-600 mt-2">✓ {content.contact.formSuccess}</p>
                  </div>
                </div>
              )}
              {activeTab === 'footer' && (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white p-6 rounded-lg">
                    <p className="font-semibold">{content.footer.tagline}</p>
                    <p className="text-sm text-slate-400 mt-2">{content.footer.description}</p>
                    <p className="text-xs text-slate-500 mt-4">{content.footer.copyright}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Content is saved in browser localStorage. Changes appear on the website immediately.
        </p>
      </div>
    </AdminLayout>
  );
}

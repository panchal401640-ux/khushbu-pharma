import React from 'react';
import { Breadcrumb } from '@/components/ui/CommonComponents';
import { siteConfig } from '@/lib/constants';

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Privacy Policy' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-main max-w-3xl prose prose-industrial">
          <p className="text-industrial-600">Last updated: January 2024</p>
          <h2>Information We Collect</h2>
          <p className="text-industrial-600">When you submit an enquiry form or contact us, we collect your name, email address, phone number, company name, and any information you provide in your message.</p>
          <h2>How We Use Your Information</h2>
          <p className="text-industrial-600">We use your information to respond to your enquiries, provide quotations, and communicate about products and services relevant to your requirements.</p>
          <h2>Information Sharing</h2>
          <p className="text-industrial-600">We do not sell or share your personal information with third parties except as necessary to fulfill your requirements or as required by law.</p>
          <h2>Data Security</h2>
          <p className="text-industrial-600">We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
          <h2>Contact</h2>
          <p className="text-industrial-600">For privacy-related queries, contact us at {siteConfig.email}.</p>
        </div>
      </section>
    </>
  );
}

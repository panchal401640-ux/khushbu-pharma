'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select, FileInput } from '@/components/ui/FormElements';
import { Breadcrumb } from '@/components/ui/CommonComponents';
import { useProducts } from '@/hooks/useLocalData';
import { siteConfig } from '@/lib/constants';

function QuoteForm() {
  const products = useProducts();
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams?.get('product') || '';
  
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', country: '', city: '',
    product: preselectedProduct, requiredCapacity: '', materialOfConstruction: '',
    quantity: '', application: '', technicalRequirement: '', deliveryTimeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const productOptions = products.map(p => ({ value: p.name, label: p.name }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="section bg-white">
        <div className="container-main max-w-xl text-center py-16">
          <div className="h-16 w-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-industrial-900">Thank You!</h1>
          <p className="mt-4 text-industrial-600">Your enquiry has been received. Our team will review your requirement and contact you shortly.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products"><Button variant="secondary">View Products</Button></a>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"><Button variant="whatsapp">WhatsApp Us</Button></a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container-main max-w-3xl">
        {error && (
          <div className="mb-6 rounded-industrial bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
            <Input label="Company Name" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company name" />
            <Input label="Email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@company.com" />
            <Input label="Phone / WhatsApp" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXX XXXXXX" />
            <Input label="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="India" />
            <Input label="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Ahmedabad" />
          </div>

          <div className="border-t border-industrial-200 pt-6">
            <h2 className="text-lg font-semibold text-industrial-900 mb-4">Product Requirement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Interested Product" required options={productOptions} value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} placeholder="Select product" />
              <Input label="Required Capacity" value={formData.requiredCapacity} onChange={e => setFormData({...formData, requiredCapacity: e.target.value})} placeholder="e.g., 100 kg/batch" />
              <Input label="Material of Construction" value={formData.materialOfConstruction} onChange={e => setFormData({...formData, materialOfConstruction: e.target.value})} placeholder="e.g., SS 316" />
              <Input label="Quantity" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} placeholder="Number of machines" />
              <Input label="Delivery Timeline" value={formData.deliveryTimeline} onChange={e => setFormData({...formData, deliveryTimeline: e.target.value})} placeholder="e.g., 8-10 weeks" />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <Textarea label="Application / Process Requirement" value={formData.application} onChange={e => setFormData({...formData, application: e.target.value})} placeholder="Describe your process or application" rows={3} />
              <Textarea label="Technical Requirements" value={formData.technicalRequirement} onChange={e => setFormData({...formData, technicalRequirement: e.target.value})} placeholder="Any specific technical requirements" rows={3} />
              <Textarea label="Additional Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Any other information" rows={3} />
            </div>
          </div>

          <div className="border-t border-industrial-200 pt-6">
            <FileInput label="Attach Drawing / Reference Document (Optional)" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="min-w-[200px]" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button type="button" variant="whatsapp" size="lg">WhatsApp Instead</Button>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function QuotePage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Request a Quote' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Request a Quote</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">Tell us about your requirement and our team will provide technical specifications and pricing.</p>
        </div>
      </section>
      <Suspense fallback={<div className="section bg-white"><div className="container-main text-center py-16">Loading...</div></div>}>
        <QuoteForm />
      </Suspense>
    </>
  );
}

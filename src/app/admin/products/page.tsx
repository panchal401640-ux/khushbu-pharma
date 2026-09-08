'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function AdminProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_products');
      if (stored) {
        setAllProducts(JSON.parse(stored));
      } else {
        setAllProducts(defaultProducts);
        localStorage.setItem('kpm_products', JSON.stringify(defaultProducts));
      }
    } catch { setAllProducts(defaultProducts); }
  }, []);

  const saveProducts = (prods: Product[]) => {
    setAllProducts(prods);
    try {
      localStorage.setItem('kpm_products', JSON.stringify(prods));
      setSaveMsg('Saved successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (e) {
      setSaveMsg('ERROR: Storage full! Delete some product photos first.');
      setTimeout(() => setSaveMsg(''), 5000);
    }
  };

  const handleSave = (product: Product) => {
    if (isAdding) {
      saveProducts([...allProducts, { ...product, id: Date.now().toString() }]);
      setIsAdding(false);
    } else {
      saveProducts(allProducts.map(p => p.id === product.id ? product : p));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProducts(allProducts.filter(p => p.id !== id));
    }
  };

  const handleReset = () => {
    if (confirm('Reset all products to default?')) {
      saveProducts(defaultProducts);
    }
  };

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (editing || isAdding) {
    return (
      <AdminLayout>
        <ProductForm
          product={editing || undefined}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsAdding(false); }}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        {saveMsg && (
          <div className={`px-4 py-3 rounded-lg text-sm font-medium ${saveMsg.includes('ERROR') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
            {saveMsg}
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-primary-700 text-white rounded-industrial text-sm hover:bg-primary-800 transition-colors">
              + Add Product
            </button>
            <button onClick={handleReset} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-industrial text-sm hover:bg-red-100 transition-colors">
              Reset
            </button>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 rounded-industrial border border-industrial-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-industrial-50 border-b border-industrial-200">
                  <th className="px-4 py-3 text-left font-medium text-industrial-700 w-16">Photo</th>
                  <th className="px-4 py-3 text-left font-medium text-industrial-700">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-industrial-700">Category</th>
                  <th className="px-4 py-3 text-right font-medium text-industrial-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-100">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-industrial-50">
                    <td className="px-4 py-3">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].src} alt={product.name} className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-industrial-100 flex items-center justify-center">
                          <svg className="h-5 w-5 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-industrial-900">{product.name}</td>
                    <td className="px-4 py-3 text-industrial-600">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setEditing(product)} className="px-3 py-1 text-xs bg-industrial-100 text-industrial-700 rounded hover:bg-industrial-200">Edit</button>
                        <a href={`/products/${product.slug}`} target="_blank" className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded hover:bg-primary-100">View</a>
                        <button onClick={() => handleDelete(product.id)} className="px-3 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-industrial-500">{filtered.length} of {allProducts.length} products</p>
      </div>
    </AdminLayout>
  );
}

function ProductForm({ product, onSave, onCancel }: { product?: Product; onSave: (p: Product) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Product>(product || {
    id: '',
    slug: '',
    name: '',
    category: '',
    shortDescription: '',
    description: '',
    applications: [],
    capacity: '',
    materialOfConstruction: '',
    contactParts: '',
    nonContactParts: '',
    power: '',
    dimensions: '',
    workingVolume: '',
    operatingTemperature: '',
    operatingPressure: '',
    finish: '',
    motor: '',
    gearbox: '',
    controls: '',
    features: [],
    industries: [],
    images: [],
    technicalSpecifications: [{ parameter: '', specification: '' }],
    faq: [],
    seoTitle: '',
    seoDescription: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [featureInput, setFeatureInput] = useState('');
  const [appInput, setAppInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => { if (featureInput.trim()) { updateField('features', [...form.features, featureInput.trim()]); setFeatureInput(''); } };
  const removeFeature = (i: number) => { updateField('features', form.features.filter((_, idx) => idx !== i)); };
  const addApp = () => { if (appInput.trim()) { updateField('applications', [...form.applications, appInput.trim()]); setAppInput(''); } };
  const removeApp = (i: number) => { updateField('applications', form.applications.filter((_, idx) => idx !== i)); };
  const addIndustry = () => { if (industryInput.trim()) { updateField('industries', [...form.industries, industryInput.trim()]); setIndustryInput(''); } };
  const removeIndustry = (i: number) => { updateField('industries', form.industries.filter((_, idx) => idx !== i)); };
  const addSpec = () => { updateField('technicalSpecifications', [...form.technicalSpecifications, { parameter: '', specification: '' }]); };
  const updateSpec = (i: number, field: string, value: string) => { const specs = [...form.technicalSpecifications]; specs[i] = { ...specs[i], [field]: value }; updateField('technicalSpecifications', specs); };
  const removeSpec = (i: number) => { updateField('technicalSpecifications', form.technicalSpecifications.filter((_, idx) => idx !== i)); };
  const generateSlug = () => { updateField('slug', form.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')); };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-industrial-900">{product ? 'Edit Product' : 'Add Product'}</h2>
        <button onClick={onCancel} className="text-sm text-industrial-500 hover:text-industrial-700">Cancel</button>
      </div>

      <div className="space-y-6">
        {/* PHOTO UPLOAD */}
        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Product Photos</h3>
          <p className="text-xs text-industrial-500 mb-3">Upload product photos. First photo will be used as the main image.</p>
          <ImageUpload
            images={form.images || []}
            onChange={(images) => updateField('images', images)}
            maxImages={5}
          />
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Product Name *</label>
              <input value={form.name} onChange={e => updateField('name', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">Slug *</label>
              <div className="flex gap-2">
                <input value={form.slug} onChange={e => updateField('slug', e.target.value)} className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm font-mono focus:border-primary-500 focus:outline-none" />
                <button onClick={generateSlug} className="px-3 py-2 bg-industrial-100 text-industrial-700 rounded-industrial text-xs hover:bg-industrial-200">Generate</button>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-1">Category</label>
              <select value={form.category} onChange={e => updateField('category', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
                <option value="">Select category</option>
                <option>Dryers</option>
                <option>Granulators</option>
                <option>Blenders</option>
                <option>Mixers & Mills</option>
                <option>Coating Equipment</option>
                <option>Process Vessels</option>
                <option>Filtration & Sifting</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-1">Short Description</label>
              <textarea value={form.shortDescription} onChange={e => updateField('shortDescription', e.target.value)} rows={2} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-1">Full Description</label>
              <textarea value={form.description} onChange={e => updateField('description', e.target.value)} rows={4} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Technical Specifications</h3>
          <div className="space-y-3">
            {form.technicalSpecifications.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input value={spec.parameter} onChange={e => updateSpec(i, 'parameter', e.target.value)} placeholder="Parameter" className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                <input value={spec.specification} onChange={e => updateSpec(i, 'specification', e.target.value)} placeholder="Specification" className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
                <button onClick={() => removeSpec(i)} className="px-2 text-red-500 hover:text-red-700">×</button>
              </div>
            ))}
          </div>
          <button onClick={addSpec} className="mt-3 text-sm text-primary-600 hover:text-primary-700">+ Add Specification</button>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Features</h3>
          <div className="flex gap-2 mb-3">
            <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="Add feature..." className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            <button onClick={addFeature} className="px-4 py-2 bg-primary-700 text-white rounded-industrial text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-industrial-100 rounded-full text-xs">
                {f}
                <button onClick={() => removeFeature(i)} className="text-industrial-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Applications</h3>
          <div className="flex gap-2 mb-3">
            <input value={appInput} onChange={e => setAppInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addApp())} placeholder="Add application..." className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            <button onClick={addApp} className="px-4 py-2 bg-primary-700 text-white rounded-industrial text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.applications.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-industrial-100 rounded-full text-xs">
                {a}
                <button onClick={() => removeApp(i)} className="text-industrial-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Industries</h3>
          <div className="flex gap-2 mb-3">
            <input value={industryInput} onChange={e => setIndustryInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addIndustry())} placeholder="Add industry..." className="flex-1 rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            <button onClick={addIndustry} className="px-4 py-2 bg-primary-700 text-white rounded-industrial text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.industries.map((ind, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-industrial-100 rounded-full text-xs">
                {ind}
                <button onClick={() => removeIndustry(i)} className="text-industrial-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">Construction Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Material of Construction', field: 'materialOfConstruction' },
              { label: 'Contact Parts', field: 'contactParts' },
              { label: 'Non-Contact Parts', field: 'nonContactParts' },
              { label: 'Surface Finish', field: 'finish' },
              { label: 'Capacity', field: 'capacity' },
              { label: 'Power', field: 'power' },
              { label: 'Dimensions', field: 'dimensions' },
              { label: 'Working Volume', field: 'workingVolume' },
              { label: 'Operating Temperature', field: 'operatingTemperature' },
              { label: 'Operating Pressure', field: 'operatingPressure' },
              { label: 'Motor', field: 'motor' },
              { label: 'Gearbox', field: 'gearbox' },
              { label: 'Controls', field: 'controls' },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-industrial-700 mb-1">{label}</label>
                <input value={(form as any)[field]} onChange={e => updateField(field, e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-industrial-lg border border-industrial-200 p-6">
          <h3 className="font-semibold text-industrial-900 mb-4">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">SEO Title</label>
              <input value={form.seoTitle} onChange={e => updateField('seoTitle', e.target.value)} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-1">SEO Description</label>
              <textarea value={form.seoDescription} onChange={e => updateField('seoDescription', e.target.value)} rows={2} className="w-full rounded-industrial border border-industrial-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 -mx-6 -mb-6 rounded-b-2xl">
          <div className="flex gap-3">
            <button onClick={() => onSave(form)} className="flex-1 sm:flex-none px-8 py-4 bg-green-600 text-white rounded-xl text-base font-bold hover:bg-green-700 active:bg-green-800 transition-colors shadow-lg shadow-green-200">
              {product ? 'Save Changes' : 'Add Product'}
            </button>
            <button onClick={onCancel} className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Don't forget to save after uploading photos!</p>
        </div>
      </div>
    </div>
  );
}

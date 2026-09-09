'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import { Plus, Search, Edit3, Trash2, Eye, Save, X, ChevronDown, ChevronUp, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { loadProducts, saveProducts } from '@/hooks/useLocalData';

export default function AdminProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    loadProducts().then(prods => setAllProducts(prods));
  }, []);

  const handleSaveProducts = async (prods: Product[]) => {
    setAllProducts(prods);
    try {
      await saveProducts(prods);
      setSaveMsg('Saved successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('ERROR: Storage error! Try again.');
      setTimeout(() => setSaveMsg(''), 5000);
    }
  };

  const handleSave = (product: Product) => {
    if (isAdding) {
      handleSaveProducts([...allProducts, { ...product, id: Date.now().toString() }]);
      setIsAdding(false);
    } else {
      handleSaveProducts(allProducts.map((p) => (p.id === product.id ? product : p)));
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      handleSaveProducts(allProducts.filter((p) => p.id !== id));
    }
  };

  const handleReset = () => {
    if (confirm('Reset all products to default?')) {
      handleSaveProducts(defaultProducts);
    }
  };

  const categories = ['All', ...new Set(defaultProducts.map((p) => p.category))];

  const filtered = allProducts.filter(
    (p) =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === 'All' || p.category === categoryFilter)
  );

  if (editing || isAdding) {
    return (
      <AdminLayout>
        <ProductForm
          product={editing || undefined}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setIsAdding(false);
          }}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4">
        {saveMsg && (
          <div
            className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
              saveMsg.includes('ERROR')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}
          >
            {saveMsg}
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Reset to Default
            </button>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left font-medium text-slate-600 w-16">
                    Photo
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600 hidden sm:table-cell">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].src}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-slate-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">
                        {product.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-slate-600 text-xs truncate max-w-[300px]">
                        {product.shortDescription}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditing(product)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <a
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">
              No products found matching your search.
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400">
          {filtered.length} of {allProducts.length} products
        </p>
      </div>
    </AdminLayout>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Product>(
    product || {
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
      videos: [],
      technicalSpecifications: [{ parameter: '', specification: '' }],
      faq: [],
      seoTitle: '',
      seoDescription: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [featureInput, setFeatureInput] = useState('');
  const [appInput, setAppInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [specParam, setSpecParam] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      updateField('features', [...form.features, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  const removeFeature = (i: number) => {
    updateField('features', form.features.filter((_, idx) => idx !== i));
  };

  const addApp = () => {
    if (appInput.trim()) {
      updateField('applications', [...form.applications, appInput.trim()]);
      setAppInput('');
    }
  };
  const removeApp = (i: number) => {
    updateField('applications', form.applications.filter((_, idx) => idx !== i));
  };

  const addIndustry = () => {
    if (industryInput.trim()) {
      updateField('industries', [...form.industries, industryInput.trim()]);
      setIndustryInput('');
    }
  };
  const removeIndustry = (i: number) => {
    updateField('industries', form.industries.filter((_, idx) => idx !== i));
  };

  const addSpec = () => {
    if (specParam.trim() && specValue.trim()) {
      updateField('technicalSpecifications', [
        ...form.technicalSpecifications,
        { parameter: specParam.trim(), specification: specValue.trim() },
      ]);
      setSpecParam('');
      setSpecValue('');
    }
  };
  const removeSpec = (i: number) => {
    updateField(
      'technicalSpecifications',
      form.technicalSpecifications.filter((_, idx) => idx !== i)
    );
  };

  const addFaq = () => {
    if (faqQuestion.trim() && faqAnswer.trim()) {
      updateField('faq', [
        ...form.faq,
        { question: faqQuestion.trim(), answer: faqAnswer.trim() },
      ]);
      setFaqQuestion('');
      setFaqAnswer('');
    }
  };
  const removeFaq = (i: number) => {
    updateField('faq', form.faq.filter((_, idx) => idx !== i));
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const result = await uploadToCloudinary(file, 'kpm/products');
        updateField('images', [...form.images, { src: result.secure_url, alt: form.name || file.name }]);
      }
    } catch (err) {
      alert('Upload failed: ' + (err as Error).message);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const result = await uploadToCloudinary(file, 'kpm/videos');
        updateField('videos', [...(form.videos || []), { src: result.secure_url, title: file.name.replace(/\.[^/.]+$/, '') }]);
      }
    } catch (err) {
      alert('Upload failed: ' + (err as Error).message);
    }
    setUploading(false);
    e.target.value = '';
  };
  const removeImage = (i: number) => {
    updateField('images', form.images.filter((_, idx) => idx !== i));
  };

  const generateSlug = () => {
    updateField(
      'slug',
      form.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
    );
  };

  const categories = [
    'Dryers',
    'Granulators',
    'Blenders',
    'Mixers & Mills',
    'Coating Equipment',
    'Process Vessels',
    'Filtration & Sifting',
    'Liquid Processing',
    'Sterilization Equipment',
    'Material Handling',
    'Tableting',
    'Encapsulating',
    'R&D / Lab Equipment',
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name *
              </label>
              <input
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                placeholder="e.g., Fluid Bed Dryer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Slug *</label>
              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <button
                  onClick={generateSlug}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Short Description
              </label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => updateField('shortDescription', e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Product Images</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {form.images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-24 w-24 rounded-xl object-cover border border-slate-200"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {/* Videos */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Product Videos</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {(form.videos || []).map((vid, i) => (
              <div key={i} className="relative group">
                <video
                  src={vid.src}
                  className="h-24 w-24 rounded-xl object-cover border border-slate-200"
                  muted
                />
                <p className="text-xs text-slate-500 mt-1 truncate max-w-[96px]">{vid.title}</p>
                <button
                  onClick={() => updateField('videos', (form.videos || []).filter((_, idx) => idx !== i))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoUpload}
            className="hidden"
          />
          <button
            onClick={() => videoInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Features</h3>
          <div className="flex gap-2 mb-3">
            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              placeholder="Add feature..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <button
              onClick={addFeature}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-lg text-sm"
              >
                {f}
                <button
                  onClick={() => removeFeature(i)}
                  className="text-slate-400 hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Applications</h3>
          <div className="flex gap-2 mb-3">
            <input
              value={appInput}
              onChange={(e) => setAppInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addApp())}
              placeholder="Add application..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <button
              onClick={addApp}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.applications.map((a, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm"
              >
                {a}
                <button
                  onClick={() => removeApp(i)}
                  className="text-blue-400 hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Technical Specifications</h3>
          <div className="space-y-3 mb-4">
            {form.technicalSpecifications.map((spec, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-sm font-medium text-slate-600 min-w-[150px]">
                  {spec.parameter}
                </span>
                <span className="flex-1 text-sm text-slate-700">{spec.specification}</span>
                <button
                  onClick={() => removeSpec(i)}
                  className="p-1 text-slate-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={specParam}
              onChange={(e) => setSpecParam(e.target.value)}
              placeholder="Parameter"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <input
              value={specValue}
              onChange={(e) => setSpecValue(e.target.value)}
              placeholder="Specification"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <button
              onClick={addSpec}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">FAQs</h3>
          <div className="space-y-3 mb-4">
            {form.faq.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{faq.question}</p>
                    <p className="text-sm text-slate-600 mt-1">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => removeFaq(i)}
                    className="p-1 text-slate-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <input
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              placeholder="Question"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <textarea
              value={faqAnswer}
              onChange={(e) => setFaqAnswer(e.target.value)}
              placeholder="Answer"
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
            />
            <button
              onClick={addFaq}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add FAQ
            </button>
          </div>
        </div>

        {/* Construction Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Construction Details</h3>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                <input
                  value={(form as any)[field]}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">SEO Title</label>
              <input
                value={form.seoTitle}
                onChange={(e) => updateField('seoTitle', e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                SEO Description
              </label>
              <textarea
                value={form.seoDescription}
                onChange={(e) => updateField('seoDescription', e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Industries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Industries</h3>
          <div className="flex gap-2 mb-3">
            <input
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIndustry())}
              placeholder="Add industry..."
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            <button
              onClick={addIndustry}
              className="px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.industries.map((ind, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm"
              >
                {ind}
                <button
                  onClick={() => removeIndustry(i)}
                  className="text-purple-400 hover:text-red-500 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 -mx-6 -mb-6 rounded-b-2xl">
          <div className="flex gap-3">
            <button
              onClick={() => onSave(form)}
              className="flex-1 sm:flex-none px-8 py-4 bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {product ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-4 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

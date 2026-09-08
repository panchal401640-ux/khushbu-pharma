'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { Input } from '@/components/ui/FormElements';
import { SectionHeading, Breadcrumb } from '@/components/ui/CommonComponents';
import { categories } from '@/lib/data';
import { useProducts } from '@/hooks/useLocalData';
import { siteConfig } from '@/lib/config';

export default function ProductsPage() {
  const products = useProducts();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const allIndustries = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.industries.forEach(i => set.add(i)));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      const matchIndustry = !selectedIndustry || p.industries.includes(selectedIndustry);
      return matchSearch && matchCategory && matchIndustry;
    });
  }, [search, selectedCategory, selectedIndustry]);

  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Products' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Product Catalogue</h1>
          <p className="mt-3 text-industrial-300 max-w-2xl">Complete range of pharmaceutical, chemical, food and cosmetic processing machinery.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <Input
                  placeholder="Search machines..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                  <label className="block mb-2 text-sm font-medium text-industrial-700">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-industrial border border-industrial-300 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-industrial-700">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full rounded-industrial border border-industrial-300 bg-white px-4 py-3 text-sm"
                  >
                    <option value="">All Industries</option>
                    {allIndustries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                {(search || selectedCategory || selectedIndustry) && (
                  <button
                    onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedIndustry(''); }}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear filters
                  </button>
                )}
                <p className="text-sm text-industrial-500">{filteredProducts.length} products found</p>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="h-16 w-16 mx-auto text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-industrial-900">No products found</h3>
                  <p className="mt-2 text-sm text-industrial-600">Try adjusting your search or filters.</p>
                  <button
                    onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedIndustry(''); }}
                    className="mt-4 text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="card-hover overflow-hidden flex flex-col">
                      <Link href={`/products/${product.slug}`} className="block">
                        <div className="h-48 bg-industrial-100 flex items-center justify-center overflow-hidden">
                          <ProductImage
                            src={product.images?.[0]?.src || ''}
                            alt={product.images?.[0]?.alt || product.name}
                            name={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">{product.category}</span>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="mt-1 text-base font-semibold text-industrial-900 hover:text-primary-700 transition-colors">{product.name}</h3>
                        </Link>
                        <p className="mt-2 text-sm text-industrial-600 line-clamp-2 flex-1">{product.shortDescription}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link href={`/products/${product.slug}`}>
                            <Button size="sm" variant="secondary">View Details</Button>
                          </Link>
                          <Link href={`/quote?product=${encodeURIComponent(product.name)}`}>
                            <Button size="sm">Get Quote</Button>
                          </Link>
                          <a
                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share specifications and quotation.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="whatsapp">
                              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

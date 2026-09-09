'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { Breadcrumb, SpecificationTable, FAQItem } from '@/components/ui/CommonComponents';
import { useProductBySlug, useRelatedProducts } from '@/hooks/useLocalData';
import { siteConfig } from '@/lib/config';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = useProductBySlug(slug);
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);

  if (!product) {
    return (
      <div className="section bg-white">
        <div className="container-main text-center py-16">
          <h1 className="text-3xl font-bold text-industrial-900">Product Not Found</h1>
          <p className="mt-4 text-industrial-600">The product you are looking for does not exist or has been moved.</p>
          <Link href="/products" className="mt-6 inline-block"><Button>View All Products</Button></Link>
        </div>
      </div>
    );
  }

  const relatedProducts = useRelatedProducts(slug, 3);
  const allImages = product.images || [];

  const openLightbox = (index: number) => {
    setLightbox({ images: allImages, index });
  };

  const closeLightbox = () => setLightbox(null);

  const prevImage = () => {
    if (lightbox) setLightbox({ ...lightbox, index: lightbox.index > 0 ? lightbox.index - 1 : lightbox.images.length - 1 });
  };

  const nextImage = () => {
    if (lightbox) setLightbox({ ...lightbox, index: lightbox.index < lightbox.images.length - 1 ? lightbox.index + 1 : 0 });
  };

  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: product.name }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">{product.category}</span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{product.name}</h1>
              <p className="mt-4 text-industrial-300 max-w-2xl">{product.shortDescription}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/quote?product=${encodeURIComponent(product.name)}`}><Button size="lg">Request Quote</Button></Link>
                <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share technical specifications and quotation.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enquire on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <div className="cursor-pointer group relative overflow-hidden rounded-industrial-lg" onClick={() => openLightbox(0)}>
                  <ProductImage src={product.images?.[0]?.src || ''} alt={product.images?.[0]?.alt || product.name} name={product.name} className="w-full aspect-video object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">🔍 Click to zoom</span>
                  </div>
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {allImages.map((img, i) => (
                      <div key={i} className="cursor-pointer relative group overflow-hidden rounded-industrial border-2 border-transparent hover:border-primary-500 transition-all" onClick={() => openLightbox(i)}>
                        <ProductImage src={img.src} alt={img.alt || `${product.name} ${i + 1}`} name={`${product.name} ${i + 1}`} className="w-full h-20 object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {product.videos && product.videos.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-industrial-900 mb-4">Product Videos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.videos.map((vid, i) => (
                      <div key={i} className="rounded-industrial-lg overflow-hidden border border-industrial-200">
                        <video
                          src={vid.src}
                          controls
                          className="w-full aspect-video object-cover bg-black"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                        {vid.title && (
                          <div className="p-3 bg-industrial-50">
                            <p className="text-sm font-medium text-industrial-700">{vid.title}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Overview</h2>
                <p className="text-industrial-600 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-industrial-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Technical Specifications</h2>
                <SpecificationTable specifications={product.technicalSpecifications} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Applications</h2>
                <ul className="space-y-2">
                  {product.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary-600">•</span>
                      <span className="text-sm text-industrial-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Industries Served</h2>
                <div className="flex flex-wrap gap-2">
                  {product.industries.map((ind, i) => (
                    <span key={i} className="inline-block rounded-full bg-industrial-100 px-4 py-1.5 text-xs font-medium text-industrial-700">{ind}</span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-industrial-900 mb-4">Material of Construction</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Overall Structure', value: product.materialOfConstruction },
                    { label: 'Contact Parts', value: product.contactParts },
                    { label: 'Non-Contact Parts', value: product.nonContactParts },
                    { label: 'Surface Finish', value: product.finish },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-industrial border border-industrial-200 p-4">
                      <p className="text-sm font-medium text-industrial-900">{label}</p>
                      <p className="mt-1 text-sm text-industrial-600">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              {product.faq.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-industrial-900 mb-4">FAQ</h2>
                  <div className="space-y-0 divide-y divide-industrial-200 border-t border-industrial-200">
                    {product.faq.map((faq, i) => (
                      <FAQItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-industrial-lg border border-industrial-200 p-6">
                  <h3 className="text-lg font-semibold text-industrial-900 mb-4">Enquire About This Product</h3>
                  <p className="text-sm text-industrial-600 mb-4">Get technical specifications and quotation for the {product.name}.</p>
                  <div className="space-y-3">
                    <Link href={`/quote?product=${encodeURIComponent(product.name)}`}><Button className="w-full">Request Quote</Button></Link>
                    <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share specifications and quotation.`)}`} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="whatsapp" className="w-full">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp Enquiry
                      </Button>
                    </a>
                    <a href={`tel:${siteConfig.phone}`}><Button variant="secondary" className="w-full"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Call Us</Button></a>
                  </div>
                </div>
                <div className="rounded-industrial-lg border border-industrial-200 p-6">
                  <h3 className="text-sm font-semibold text-industrial-900 mb-3">Quick Specifications</h3>
                  <div className="space-y-2">
                    {product.technicalSpecifications.slice(0, 5).map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-industrial-500">{spec.parameter}</span>
                        <span className="font-medium text-industrial-900 text-right ml-4">{spec.specification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section bg-industrial-50">
          <div className="container-main">
            <h2 className="text-2xl font-bold text-industrial-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="card-hover p-5">
                  <span className="text-xs font-medium text-primary-700 uppercase tracking-wider">{rp.category}</span>
                  <h3 className="mt-1 text-base font-semibold text-industrial-900">{rp.name}</h3>
                  <p className="mt-2 text-sm text-industrial-600 line-clamp-2">{rp.shortDescription}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-primary-700">View Details →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-all text-xl">✕</button>
          {lightbox.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all text-2xl">‹</button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center transition-all text-2xl">›</button>
            </>
          )}
          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.images[lightbox.index].src} alt={lightbox.images[lightbox.index].alt} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />
            <p className="text-white/70 text-sm mt-3">{lightbox.images[lightbox.index].alt}</p>
            <p className="text-white/50 text-xs mt-1">{lightbox.index + 1} / {lightbox.images.length}</p>
          </div>
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {lightbox.images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: i }); }} className={`w-2 h-2 rounded-full transition-all ${i === lightbox.index ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

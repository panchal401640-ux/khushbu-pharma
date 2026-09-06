import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/CommonComponents';
import { products, categories, industriesData } from '@/lib/data';

export default function SitemapPage() {
  return (
    <>
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb items={[{ label: 'Sitemap' }]} className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold">Sitemap</h1>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-bold text-industrial-900 mb-4">Main Pages</h2>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Products', href: '/products' },
                  { label: 'Industries', href: '/industries' },
                  { label: 'Manufacturing', href: '/manufacturing' },
                  { label: 'Quality', href: '/quality' },
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'Resources', href: '/resources' },
                  { label: 'Downloads', href: '/downloads' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Request a Quote', href: '/quote' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-primary-600 hover:text-primary-700">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-industrial-900 mb-4">Products</h2>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} className="text-sm text-primary-600 hover:text-primary-700">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-industrial-900 mb-4">Industries</h2>
              <ul className="space-y-2">
                {industriesData.map((ind) => (
                  <li key={ind.id}>
                    <Link href={`/industries#${ind.slug}`} className="text-sm text-primary-600 hover:text-primary-700">{ind.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

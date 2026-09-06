import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title: 'Blog Post',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="pt-24">
        <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Resources', href: '/blog' },
                { label: 'Not Found', href: '/blog' },
              ]}
            />
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Article Not Found</h1>
            <p className="text-slate-600 mb-8">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Resources
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const relatedProducts = post.relatedProducts
    ?.map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <main className="pt-24">
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </div>
      </section>

      <section className="py-16">
        <article className="max-w-4xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{post.date}</span>
              <span>|</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-8">
            <span className="text-blue-400 text-sm font-medium">Featured Image</span>
          </div>

          <div
            className="prose prose-lg max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-blue-600 text-xs font-bold">IMG</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{product.name}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{product.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Resources
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

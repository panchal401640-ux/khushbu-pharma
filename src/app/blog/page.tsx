import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Technical Resources',
  description: 'Read the latest technical articles, insights, and news from Eline Machinery.',
};

export default function BlogPage() {
  return (
    <main className="pt-24">
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/blog' },
            ]}
          />
          <SectionHeading title="Technical Resources" className="text-white" />
          <p className="text-slate-300 max-w-2xl mt-4">
            Expert insights, technical articles, and news from the world of pharmaceutical machinery.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-blue-400 text-sm font-medium">Featured Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>{post.date}</span>
                      <span>|</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-3">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

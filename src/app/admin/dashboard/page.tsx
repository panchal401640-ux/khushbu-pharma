'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import Link from 'next/link';
import {
  Package,
  Mail,
  FileText,
  Plus,
  MessageSquare,
  Edit3,
  TrendingUp,
  ArrowRight,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_products');
      if (stored) setProducts(JSON.parse(stored));
      else {
        setProducts(defaultProducts);
        localStorage.setItem('kpm_products', JSON.stringify(defaultProducts));
      }
    } catch {
      setProducts(defaultProducts);
    }
    try {
      const stored = localStorage.getItem('kpm_enquiries');
      if (stored) setEnquiries(JSON.parse(stored));
    } catch {}
    try {
      const stored = localStorage.getItem('kpm_blog_posts');
      if (stored) setBlogPosts(JSON.parse(stored));
    } catch {}
  }, []);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      href: '/admin/products',
    },
    {
      label: 'Total Enquiries',
      value: enquiries.length,
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      href: '/admin/content',
    },
    {
      label: 'Blog Posts',
      value: blogPosts.length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      href: '/admin/content',
    },
    {
      label: 'Categories',
      value: [...new Set(products.map((p) => p.category))].length,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      href: '/admin/products',
    },
  ];

  const quickActions = [
    {
      label: 'Add Product',
      href: '/admin/products',
      icon: <Plus className="w-5 h-5" />,
      color: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
    },
    {
      label: 'Chat with DHRUV',
      href: '/admin/dhruv',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    },
    {
      label: 'Edit Content',
      href: '/admin/content',
      icon: <Edit3 className="w-5 h-5" />,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
    },
    {
      label: 'Manage Photos',
      href: '/admin/photos',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200',
    },
  ];

  const recentEnquiries = enquiries.slice(-5).reverse();

  const categoryBreakdown = [...new Set(products.map((p) => p.category))]
    .map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.bgColor} p-3 rounded-xl ${stat.textColor} group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200 border ${action.color}`}
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Products by Category
            </h2>
            <div className="space-y-3">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="text-slate-500">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${(cat.count / products.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {categoryBreakdown.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">
                  No categories yet
                </p>
              )}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Analytics Overview</h2>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-blue-200">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-3" />
              <p className="text-sm font-medium text-slate-600">Analytics Dashboard</p>
              <p className="text-xs text-slate-400 mt-1">
                Charts and analytics will appear here
              </p>
            </div>
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Enquiries</h2>
            <Link
              href="/admin/content"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                No enquiries yet. They will appear here when customers submit the form.
              </div>
            ) : (
              recentEnquiries.map((enq: any, i: number) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {enq.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{enq.name}</p>
                      <p className="text-xs text-slate-500">
                        {enq.company || 'No company'} • {enq.product || 'General'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        enq.status === 'new'
                          ? 'bg-orange-100 text-orange-700'
                          : enq.status === 'contacted'
                          ? 'bg-blue-100 text-blue-700'
                          : enq.status === 'quoted'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {enq.status || 'new'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { products as defaultProducts } from '@/lib/data';
import { Product } from '@/lib/types';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activityLog, setActivityLog] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_products');
      if (stored) setProducts(JSON.parse(stored));
      else setProducts(defaultProducts);
    } catch { setProducts(defaultProducts); }
    try {
      const stored = localStorage.getItem('kpm_enquiries');
      if (stored) setEnquiries(JSON.parse(stored));
    } catch {}
    try {
      const stored = localStorage.getItem('kpm_activity_log');
      if (stored) setActivityLog(JSON.parse(stored));
    } catch {}
  }, []);

  const stats = [
    { label: 'Total Products', value: products.length, color: 'bg-blue-500', icon: '📦', href: '/admin/products' },
    { label: 'Total Enquiries', value: enquiries.length, color: 'bg-green-500', icon: '📧', href: '/admin/enquiries' },
    { label: 'New Enquiries', value: enquiries.filter((e: any) => e.status === 'new').length, color: 'bg-orange-500', icon: '🆕', href: '/admin/enquiries' },
    { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, color: 'bg-purple-500', icon: '🏷️', href: '/admin/categories' },
  ];

  const categoryBreakdown = [...new Set(products.map(p => p.category))].map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
  })).sort((a, b) => b.count - a.count);

  const recentEnquiries = enquiries.slice(-5).reverse();
  const recentActivity = activityLog.slice(0, 10);

  const quickActions = [
    { label: 'Add Product', href: '/admin/products', icon: '➕', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
    { label: 'View Enquiries', href: '/admin/enquiries', icon: '📧', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
    { label: 'Change Theme', href: '/admin/theme', icon: '🎨', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
    { label: 'Edit Pages', href: '/admin/pages', icon: '📝', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
    { label: 'Photo Editor', href: '/admin/photo-editor', icon: '📸', color: 'bg-pink-50 text-pink-700 hover:bg-pink-100' },
    { label: 'AI Assistant', href: '/admin/ai', icon: '🤖', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
    { label: 'Site Settings', href: '/admin/settings', icon: '⚙️', color: 'bg-gray-50 text-gray-700 hover:bg-gray-100' },
    { label: 'View Website', href: '/', icon: '🌐', color: 'bg-teal-50 text-teal-700 hover:bg-teal-100', external: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <a key={stat.label} href={stat.href} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${action.color}`}
              >
                <span className="text-lg">{action.icon}</span>
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Products by Category</h2>
            <div className="space-y-3">
              {categoryBreakdown.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{cat.name}</span>
                      <span className="text-gray-500">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(cat.count / products.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No activity yet. Start managing your website!</p>
            ) : (
              <div className="space-y-2">
                {recentActivity.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-gray-400 whitespace-nowrap">{log.split(']')[0]}]</span>
                    <span className="text-gray-700">{log.split('] ')[1]}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Enquiries</h2>
            <a href="/admin/enquiries" className="text-sm text-green-700 hover:text-green-800 font-medium">View All →</a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                No enquiries yet. They will appear here when customers submit the form.
              </div>
            ) : (
              recentEnquiries.map((enq: any, i: number) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                      {enq.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{enq.name}</p>
                      <p className="text-xs text-gray-500">{enq.company || 'No company'} • {enq.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${enq.status === 'new' ? 'bg-orange-100 text-orange-700' : enq.status === 'contacted' ? 'bg-blue-100 text-blue-700' : enq.status === 'quoted' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {enq.status}
                    </span>
                    <a href={`tel:${enq.phone}`} className="text-xs text-green-600 hover:text-green-700">Call</a>
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

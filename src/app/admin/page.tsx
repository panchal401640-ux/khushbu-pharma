'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AdminLayout';
import Link from 'next/link';

interface Stats {
  products: number;
  enquiries: number;
  categories: number;
  photos: number;
}

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<Stats>({ products: 0, enquiries: 0, categories: 0, photos: 0 });
  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const products = JSON.parse(localStorage.getItem('kpm_products') || '[]');
      const enquiries = JSON.parse(localStorage.getItem('kpm_enquiries') || '[]');
      const categories = JSON.parse(localStorage.getItem('kpm_categories') || '[]');
      const photos = JSON.parse(localStorage.getItem('kpm_media') || '[]');
      setStats({
        products: products.length || 31,
        enquiries: enquiries.length,
        categories: categories.length || 11,
        photos: photos.length,
      });
      const activities = JSON.parse(localStorage.getItem('kpm_activity') || '[]');
      setRecentActivity(activities.slice(-5).reverse());
    } catch (e) {
      setStats({ products: 31, enquiries: 0, categories: 11, photos: 0 });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin! KPM website manage karein.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/products" className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📦</div>
            <div>
              <p className="text-sm text-gray-500">Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/enquiries" className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📧</div>
            <div>
              <p className="text-sm text-gray-500">Enquiries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.enquiries}</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/categories" className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📁</div>
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/media" className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📸</div>
            <div>
              <p className="text-sm text-gray-500">Media</p>
              <p className="text-2xl font-bold text-gray-900">{stats.photos}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/ai" className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-bold text-lg">DHRUV AI</h3>
          <p className="text-sm text-white/80 mt-1">Chat with Dhruv - Pharma machinery expert, costing, theme control</p>
        </Link>
        <Link href="/admin/media" className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">🎬</div>
          <h3 className="font-bold text-lg">Media Gallery</h3>
          <p className="text-sm text-white/80 mt-1">Upload photos, videos (100MB), online photo search</p>
        </Link>
        <Link href="/admin/photo-editor" className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">📸</div>
          <h3 className="font-bold text-lg">Photo Editor</h3>
          <p className="text-sm text-white/80 mt-1">Filters, crop, text overlay, resize images</p>
        </Link>
        <Link href="/admin/theme" className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">🎨</div>
          <h3 className="font-bold text-lg">Theme & Colors</h3>
          <p className="text-sm text-white/80 mt-1">12 color presets, fonts, dark/light mode</p>
        </Link>
        <Link href="/admin/pages" className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">📄</div>
          <h3 className="font-bold text-lg">Page Editor</h3>
          <p className="text-sm text-white/80 mt-1">Edit homepage, about, services pages content</p>
        </Link>
        <Link href="/admin/settings" className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="font-bold text-lg">Site Settings</h3>
          <p className="text-sm text-white/80 mt-1">Logo, company info, contact details</p>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {recentActivity.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity. Start managing your website!</p>
        ) : (
          <div className="space-y-2">
            {recentActivity.map((activity, i) => (
              <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {activity}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { AdminLayout } from '../AdminLayout';
import { categories } from '@/lib/data';

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="bg-white rounded-industrial-lg border border-industrial-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-industrial-50 border-b border-industrial-200">
                <th className="px-4 py-3 text-left font-medium text-industrial-700">Category</th>
                <th className="px-4 py-3 text-left font-medium text-industrial-700">Slug</th>
                <th className="px-4 py-3 text-left font-medium text-industrial-700">Products</th>
                <th className="px-4 py-3 text-left font-medium text-industrial-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-industrial-50">
                  <td className="px-4 py-3 font-medium text-industrial-900">{cat.name}</td>
                  <td className="px-4 py-3 text-industrial-500 font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 text-industrial-600">{cat.productCount}</td>
                  <td className="px-4 py-3 text-industrial-500 max-w-xs truncate">{cat.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-industrial-500">Categories are managed from the product data. Edit products to change categories.</p>
      </div>
    </AdminLayout>
  );
}

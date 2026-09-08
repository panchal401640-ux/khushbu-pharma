'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../AdminLayout';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Check,
  Link2,
  Grid,
  List,
} from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  alt: string;
  category: string;
  assignedTo: string;
}

const categories = [
  'All',
  'Products',
  'Factory',
  'Team',
  'Gallery',
  'Banner',
  'Other',
];

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');
  const [newCategory, setNewCategory] = useState('Products');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_photos');
      if (stored) setPhotos(JSON.parse(stored));
    } catch {}
  }, []);

  const savePhotos = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    try {
      localStorage.setItem('kpm_photos', JSON.stringify(newPhotos));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Storage is full. Please delete some photos first.');
    }
  };

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      alt: newAlt.trim() || 'Untitled image',
      category: newCategory,
      assignedTo: '',
    };
    savePhotos([...photos, newPhoto]);
    setNewUrl('');
    setNewAlt('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      savePhotos(photos.filter((p) => p.id !== id));
    }
  };

  const handleUpdateAlt = (id: string) => {
    savePhotos(photos.map((p) => (p.id === id ? { ...p, alt: editAlt } : p)));
    setEditingId(null);
  };

  const filtered =
    filterCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === filterCategory);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {saved && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 font-medium flex items-center gap-2">
            <Check className="w-5 h-5" />
            Photos saved successfully!
          </div>
        )}

        {/* Add Photo Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Photo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <button
                  onClick={handleAdd}
                  disabled={!newUrl.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alt Text (for SEO)
            </label>
            <input
              type="text"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              placeholder="Describe the image..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter and View Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">{filtered.length} photos</span>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-slate-500'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-500'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photos Gallery */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" x="50" y="55"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 text-slate-700 rounded-lg hover:bg-white shadow-lg flex items-center gap-1 text-xs font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </a>
                  </div>
                </div>
                <div className="p-3">
                  {editingId === photo.id ? (
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={editAlt}
                        onChange={(e) => setEditAlt(e.target.value)}
                        className="flex-1 text-xs border border-slate-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateAlt(photo.id)}
                        className="p-1 text-green-600 hover:text-green-700"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="text-xs text-slate-600 truncate cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        setEditingId(photo.id);
                        setEditAlt(photo.alt);
                      }}
                      title="Click to edit"
                    >
                      {photo.alt}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                      {photo.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filtered.map((photo) => (
                <div
                  key={photo.id}
                  className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" x="50" y="55"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {photo.alt}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{photo.url}</p>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full mt-1 inline-block">
                      {photo.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No photos yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Add your first photo using the form above
            </p>
          </div>
        )}

        <p className="text-xs text-slate-400">
          Photos are stored in browser localStorage. For production use, consider using a
          cloud storage service.
        </p>
      </div>
    </AdminLayout>
  );
}

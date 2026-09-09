'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdminLayout } from '../AdminLayout';

interface MediaItem {
  id: string;
  name: string;
  type: 'photo' | 'video';
  url: string;
  size: number;
  category: string;
  thumbnail?: string;
  createdAt: string;
}

function logActivity(action: string) {
  try {
    const stored = localStorage.getItem('kpm_activity_log');
    const logs = stored ? JSON.parse(stored) : [];
    logs.unshift(`[${new Date().toLocaleString()}] ${action}`);
    if (logs.length > 100) logs.pop();
    localStorage.setItem('kpm_activity_log', JSON.stringify(logs));
  } catch {}
}

function getMedia(): MediaItem[] {
  try {
    const stored = localStorage.getItem('kpm_media');
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveMedia(media: MediaItem[]) {
  try {
    localStorage.setItem('kpm_media', JSON.stringify(media));
  } catch (e) {
    alert('Storage full! Delete some media files first to free up space.');
  }
}

const CATEGORIES = ['Product Photos', 'Factory Photos', 'Team Photos', 'Gallery', 'Website Banners', 'Logos', 'Certificates', 'Other'];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedCategory, setSelectedCategory] = useState('Product Photos');
  const [showOnlineSearch, setShowOnlineSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ name: string; progress: number } | null>(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMedia(getMedia());
  }, []);

  const addMedia = (item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    const newItem: MediaItem = { ...item, id: Date.now().toString() + Math.random().toString(36).slice(2), createdAt: new Date().toISOString() };
    const updated = [newItem, ...media];
    setMedia(updated);
    saveMedia(updated);
    logActivity(`Added ${item.type}: ${item.name}`);
  };

  const deleteMedia = (id: string) => {
    const item = media.find(m => m.id === id);
    if (confirm(`"${item?.name}" delete karna hai?`)) {
      const updated = media.filter(m => m.id !== id);
      setMedia(updated);
      saveMedia(updated);
      logActivity(`Deleted media: ${item?.name}`);
    }
  };

  const processFiles = useCallback((files: FileList | File[], type: 'photo' | 'video') => {
    const fileArray = Array.from(files);
    let processed = 0;

    fileArray.forEach((file, index) => {
      if (type === 'video' && file.size > 100 * 1024 * 1024) {
        alert(`"${file.name}" bahut bada hai! Max 100MB allowed.`);
        processed++;
        return;
      }

      setUploadProgress({ name: file.name, progress: 0 });

      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress({ name: file.name, progress: Math.round((e.loaded / e.total) * 100) });
        }
      };
      reader.onload = (ev) => {
        addMedia({
          name: file.name.replace(/\.[^/.]+$/, ''),
          type,
          url: ev.target?.result as string,
          size: file.size,
          category: selectedCategory,
        });
        processed++;
        if (processed === fileArray.length) {
          setUploadProgress(null);
        } else {
          setUploadProgress({ name: fileArray[processed].name, progress: 0 });
        }
      };
      reader.readAsDataURL(file);
    });
  }, [media, selectedCategory]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files, 'photo');
    e.target.value = '';
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files, 'video');
    e.target.value = '';
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      const files = e.dataTransfer.files;
      const hasVideo = Array.from(files).some(f => f.type.startsWith('video/'));
      processFiles(files, hasVideo ? 'video' : 'photo');
    }
  }, [processFiles]);

  const addOnlinePhoto = (url: string, name: string) => {
    addMedia({ name, type: 'photo', url, size: 0, category: selectedCategory });
  };

  const searchOnlinePhotos = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results: string[] = [];
      const queries = [searchQuery, `${searchQuery} pharmaceutical`, `${searchQuery} machine`];
      for (const q of queries) {
        try {
          const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=8&client_id=demo`);
          if (response.ok) {
            const data = await response.json();
            if (data.results) data.results.forEach((r: any) => { if (r.urls?.regular) results.push(r.urls.regular); });
          }
        } catch {}
      }
      if (results.length === 0) {
        results.push(
          'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800',
          'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800',
          'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800',
          'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800',
          'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
          'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800',
        );
      }
      setSearchResults(results.slice(0, 12));
    } catch {
      setSearchResults([
        'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800',
        'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800',
      ]);
    }
    setIsSearching(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return 'Online';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const photos = media.filter(m => m.type === 'photo');
  const videos = media.filter(m => m.type === 'video');
  const filteredPhotos = filterCategory === 'All' ? photos : photos.filter(p => p.category === filterCategory);
  const filteredVideos = filterCategory === 'All' ? videos : videos.filter(v => v.category === filterCategory);
  const allCategories = ['All', ...CATEGORIES];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">Photos aur Videos upload aur manage karo</p>
        </div>

        {/* Upload Area with Drag & Drop */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-green-500 bg-green-50 scale-[1.02]'
              : 'border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/50'
          }`}
        >
          <div className="text-4xl mb-3">{dragActive ? '📥' : '📁'}</div>
          <p className="text-gray-700 font-medium">
            {dragActive ? 'Chhod do yahan pe!' : 'Files yahan drag & drop karo'}
          </p>
          <p className="text-sm text-gray-500 mt-1 mb-4">Ya buttons se upload karo</p>

          <div className="flex flex-wrap justify-center gap-3">
            <input ref={photoInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
            <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoUpload} className="hidden" />

            <button onClick={() => photoInputRef.current?.click()} className="px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 flex items-center gap-2">
              📸 Photos Upload
            </button>
            <button onClick={() => videoInputRef.current?.click()} className="px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2">
              🎬 Video Upload (Max 100MB)
            </button>
            <button onClick={() => setShowOnlineSearch(!showOnlineSearch)} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
              🌐 Online Search
            </button>
          </div>
        </div>

        {/* Upload Progress */}
        {uploadProgress && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800 truncate max-w-[70%]">{uploadProgress.name}</span>
              <span className="text-sm text-green-600">{uploadProgress.progress}%</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress.progress}%` }} />
            </div>
          </div>
        )}

        {/* Online Search */}
        {showOnlineSearch && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-900">🌐 Online Photo Search</h3>
              <button onClick={() => setShowOnlineSearch(false)} className="text-blue-500 hover:text-blue-700 text-sm">✕</button>
            </div>
            <div className="flex gap-2 mb-3">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchOnlinePhotos()} placeholder="Search... (e.g., 'pharmaceutical machine', 'tablet press')" className="flex-1 rounded-xl border border-blue-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <button onClick={searchOnlinePhotos} disabled={isSearching} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {searchResults.map((url, i) => (
                  <div key={i} className="relative group cursor-pointer">
                    <img src={url} alt={`Result ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button onClick={() => addOnlinePhoto(url, `Online Photo ${i + 1}`)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold bg-green-600 px-3 py-1 rounded-lg">+ Add</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Category Filter + Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none">
            {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? '📁 All Categories' : c}</option>)}
          </select>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none">
            <optgroup label="Upload to Category">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </optgroup>
          </select>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden ml-auto">
            <button onClick={() => setActiveTab('photos')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'photos' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              📸 Photos ({photos.length})
            </button>
            <button onClick={() => setActiveTab('videos')} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'videos' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
              🎬 Videos ({videos.length})
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === 'photos' ? (
            filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">📸</div>
                <p className="text-gray-500 font-medium">Koi photo nahi hai</p>
                <p className="text-gray-400 text-sm mt-1">Upar se upload karo ya drag & drop karo</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPhotos.map(item => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <img src={item.url} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-medium truncate">{item.name}</p>
                      <p className="text-white/60 text-[10px]">{item.category} • {formatSize(item.size)}</p>
                    </div>
                    <button onClick={() => deleteMedia(item.id)} className="absolute top-2 right-2 h-7 w-7 bg-red-500 text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 shadow-lg">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🎬</div>
                <p className="text-gray-500 font-medium">Koi video nahi hai</p>
                <p className="text-gray-400 text-sm mt-1">Video upload karo (Max 100MB)</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map(item => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <video src={item.url} className="w-full h-48 object-cover" controls preload="metadata" />
                    <div className="p-2">
                      <p className="text-gray-800 text-xs font-medium truncate">{item.name}</p>
                      <p className="text-gray-400 text-[10px]">{item.category} • {formatSize(item.size)}</p>
                    </div>
                    <button onClick={() => deleteMedia(item.id)} className="absolute top-2 right-2 h-7 w-7 bg-red-500 text-white rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600 shadow-lg">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{photos.length}</p>
            <p className="text-xs text-gray-500">Total Photos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{videos.length}</p>
            <p className="text-xs text-gray-500">Total Videos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{media.filter(m => m.size === 0).length}</p>
            <p className="text-xs text-gray-500">Online Photos</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{formatSize(media.reduce((acc, m) => acc + m.size, 0))}</p>
            <p className="text-xs text-gray-500">Total Size</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

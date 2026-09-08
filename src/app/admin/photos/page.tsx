'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdminLayout } from '../AdminLayout';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Check,
  Grid,
  List,
  Film,
  Upload,
  Download,
  Star,
  Filter,
  X,
  Search,
  AlertCircle,
  Settings,
} from 'lucide-react';
import {
  getGalleryItems,
  saveGalleryItems,
  removeGalleryItem,
  addGalleryItem,
  isConfigured,
  getConfig,
  type UploadResult,
  type UploadProgress as UploadProgressType,
  validateFile,
  uploadFile,
  ACCEPTED_TYPES,
  getGalleryCategories,
} from '@/lib/cloudinary';
import VideoPlayer from '@/components/VideoPlayer';
import PhotoLightbox from '@/components/PhotoLightbox';

const categories = ['All', 'Machines', 'Manufacturing', 'Installation', 'Videos', 'Logo'];

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState<UploadResult[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<
    {
      id: string;
      file: File;
      progress: UploadProgressType | null;
      status: 'uploading' | 'success' | 'error';
      error?: string;
      previewUrl?: string;
    }[]
  >([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [coverPhotoId, setCoverPhotoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhotos(getGalleryItems());
    try {
      const stored = localStorage.getItem('kpm_cover_photo');
      if (stored) setCoverPhotoId(stored);
    } catch {}
  }, []);

  const handleUpload = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const validation = validateFile(file);
      if (!validation.valid) {
        alert(validation.error);
        continue;
      }

      const uploadId = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
      let previewUrl: string | undefined;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      setUploads((prev) => [
        ...prev,
        { id: uploadId, file, progress: null, status: 'uploading', previewUrl },
      ]);

      try {
        const result = await uploadFile(file, (progress) => {
          setUploads((prev) =>
            prev.map((u) => (u.id === uploadId ? { ...u, progress } : u))
          );
        });

        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId
              ? { ...u, status: 'success', progress: { loaded: file.size, total: file.size, percentage: 100 } }
              : u
          )
        );

        setPhotos((prev) => {
          const updated = addGalleryItem(result);
          return updated;
        });
      } catch (err: any) {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploadId ? { ...u, status: 'error', error: err.message } : u
          )
        );
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [handleUpload]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm('Delete this file?')) return;
      const updated = removeGalleryItem(id);
      setPhotos(updated);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    []
  );

  const handleBulkDelete = useCallback(() => {
    if (!confirm(`Delete ${selectedIds.size} selected files?`)) return;
    let items = getGalleryItems();
    items = items.filter((p) => !selectedIds.has(p.publicId));
    saveGalleryItems(items);
    setPhotos(items);
    setSelectedIds(new Set());
  }, [selectedIds]);

  const handleBulkDownload = useCallback(() => {
    const selected = photos.filter((p) => selectedIds.has(p.publicId));
    selected.forEach((photo, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = photo.url;
        a.download = photo.originalName || `file-${i + 1}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 300);
    });
  }, [photos, selectedIds]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((p) => p.publicId)));
    }
  }, [selectedIds, filtered]);

  const setAsCover = useCallback((id: string) => {
    setCoverPhotoId(id);
    localStorage.setItem('kpm_cover_photo', id);
  }, []);

  const filtered = photos.filter((photo) => {
    const matchesCategory =
      filterCategory === 'All' ||
      (filterCategory === 'Videos' && photo.fileType === 'video') ||
      (filterCategory !== 'Videos' && photo.fileType === 'image');
    const matchesType =
      filterType === 'all' || photo.fileType === filterType;
    const matchesSearch =
      !searchQuery ||
      photo.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.publicId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const lightboxImages = filtered
    .filter((p) => p.fileType === 'image')
    .map((p) => ({
      url: p.url,
      alt: p.originalName,
      originalName: p.originalName,
      size: p.size,
    }));

  const cloudinaryConfigured = isConfigured();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cloudinary status */}
        {!cloudinaryConfigured && (
          <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-amber-900">Cloudinary Not Configured</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Configure Cloudinary for full upload support. Without it, only files under 5MB can be uploaded (stored as base64 in browser).
                </p>
                <a
                  href="/admin/settings"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configure Cloudinary
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isDragging && fileInputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            multiple
            onChange={(e) => {
              if (e.target.files) handleUpload(e.target.files);
              e.target.value = '';
            }}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">
                {isDragging ? 'Drop files here' : 'Click or drag to upload'}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Images (JPG, PNG, WebP) & Videos (MP4, MOV, AVI) • Max 100MB
              </p>
            </div>
          </div>
        </div>

        {/* Upload progress */}
        {uploads.length > 0 && (
          <div className="space-y-2">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  {upload.previewUrl ? (
                    <img src={upload.previewUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{upload.file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {upload.status === 'uploading' && (
                      <>
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${upload.progress?.percentage ?? 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-blue-600 font-medium">
                          {upload.progress?.percentage ?? 0}%
                        </span>
                      </>
                    )}
                    {upload.status === 'success' && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Uploaded
                      </span>
                    )}
                    {upload.status === 'error' && (
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {upload.error}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setUploads((prev) => prev.filter((u) => u.id !== upload.id))}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-full sm:w-56 pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{selectedIds.size} selected</span>
                  <button
                    onClick={handleBulkDownload}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100"
                  >
                    <Download className="w-3.5 h-3.5 inline mr-1" />
                    Download
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                    Delete
                  </button>
                </div>
              )}
              <span className="text-sm text-slate-500">{filtered.length} files</span>
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
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo) => {
              const imageIndex = lightboxImages.findIndex((l) => l.url === photo.url);
              return (
                <div
                  key={photo.publicId}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-slate-100 relative overflow-hidden">
                    {photo.fileType === 'video' ? (
                      <div
                        className="w-full h-full cursor-pointer"
                        onClick={() => setPlayingVideo(photo.url)}
                      >
                        {photo.thumbnailUrl ? (
                          <img
                            src={photo.thumbnailUrl}
                            alt={photo.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-12 h-12 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-blue-600 ml-1" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.url}
                        alt={photo.originalName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => imageIndex >= 0 && setLightboxIndex(imageIndex)}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" x="50" y="55"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    )}

                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(photo.publicId);
                        }}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                          selectedIds.has(photo.publicId)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white/80 border-white/60 text-transparent group-hover:border-slate-300'
                        }`}
                      >
                        {selectedIds.has(photo.publicId) && <Check className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Cover photo star */}
                    {coverPhotoId === photo.publicId && (
                      <div className="absolute top-2 right-2">
                        <div className="p-1.5 bg-yellow-400 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                      </div>
                    )}

                    {/* Actions overlay */}
                    <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAsCover(photo.publicId);
                        }}
                        className="p-2 bg-white/90 text-slate-700 rounded-lg hover:bg-white shadow text-xs"
                        title="Set as cover photo"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 text-slate-700 rounded-lg hover:bg-white shadow"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(photo.publicId);
                        }}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-slate-700 truncate font-medium">{photo.originalName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full flex items-center gap-1">
                        {photo.fileType === 'video' ? <Film className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                        {photo.fileType}
                      </span>
                      {photo.size > 0 && (
                        <span className="text-[10px] text-slate-400">
                          {(photo.size / 1024 / 1024).toFixed(1)}MB
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filtered.map((photo) => (
                <div
                  key={photo.publicId}
                  className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <button
                    onClick={() => toggleSelect(photo.publicId)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedIds.has(photo.publicId)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selectedIds.has(photo.publicId) && <Check className="w-3 h-3" />}
                  </button>
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {photo.fileType === 'video' ? (
                      <div
                        className="w-full h-full cursor-pointer relative"
                        onClick={() => setPlayingVideo(photo.url)}
                      >
                        {photo.thumbnailUrl ? (
                          <img src={photo.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-6 h-6 text-slate-300" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-blue-600 ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={photo.url}
                        alt={photo.originalName}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => {
                          const idx = lightboxImages.findIndex((l) => l.url === photo.url);
                          if (idx >= 0) setLightboxIndex(idx);
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{photo.originalName}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        {photo.fileType === 'video' ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        {photo.mimeType}
                      </span>
                      {photo.size > 0 && <span>{(photo.size / 1024 / 1024).toFixed(1)}MB</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {coverPhotoId === photo.publicId && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" title="Cover photo" />
                    )}
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(photo.publicId)}
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

        {filtered.length === 0 && uploads.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No files yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Upload images and videos using the area above
            </p>
          </div>
        )}

        <p className="text-xs text-slate-400">
          {cloudinaryConfigured
            ? 'Files are uploaded to Cloudinary.'
            : 'Files are stored in browser localStorage (max 5MB each). Configure Cloudinary for unlimited storage.'}
        </p>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onIndexChange={setLightboxIndex}
      />

      {/* Video Player Modal */}
      {playingVideo && (
        <VideoPlayer src={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}
    </AdminLayout>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Breadcrumb, SectionHeading } from '@/components/ui/CommonComponents';
import {
  getGalleryItems,
  type UploadResult,
  getGalleryCategories,
} from '@/lib/cloudinary';
import VideoPlayer from '@/components/VideoPlayer';
import PhotoLightbox from '@/components/PhotoLightbox';
import { Film, Image as ImageIcon, Search, Loader2 } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<UploadResult[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setItems(getGalleryItems());
  }, []);

  const categories = getGalleryCategories();

  const images = items.filter((item) => item.fileType === 'image');
  const videos = items.filter((item) => item.fileType === 'video');

  const filteredImages = images.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || activeCategory !== 'Videos';
    const matchesType = activeType === 'all' || activeType === 'image';
    return matchesCategory && matchesType;
  });

  const filteredVideos = videos.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || activeCategory === 'Videos';
    const matchesType = activeType === 'all' || activeType === 'video';
    return matchesCategory && matchesType;
  });

  const showImages = activeType === 'all' || activeType === 'image';
  const showVideos = activeType === 'all' || activeType === 'video';

  const handleImageLoad = useCallback((url: string) => {
    setLoadedImages((prev) => new Set(prev).add(url));
  }, []);

  const lightboxImages = filteredImages.map((item) => ({
    url: item.url,
    alt: item.originalName,
    originalName: item.originalName,
    size: item.size,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="bg-industrial-900 text-white section-sm">
        <div className="container-main">
          <Breadcrumb
            items={[{ label: 'Gallery' }]}
            className="mb-4 text-industrial-400 [&_a]:text-industrial-400 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl font-bold">Gallery</h1>
          <p className="mt-3 text-industrial-300">
            Explore our pharmaceutical machinery, manufacturing facility, and project installations.
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section bg-white">
        <div className="container-main">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary-700 text-white'
                      : 'bg-industrial-100 text-industrial-700 hover:bg-industrial-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-industrial-100 rounded-lg p-1">
              <button
                onClick={() => setActiveType('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeType === 'all'
                    ? 'bg-white shadow text-primary-700'
                    : 'text-industrial-500 hover:text-industrial-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveType('image')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  activeType === 'image'
                    ? 'bg-white shadow text-primary-700'
                    : 'text-industrial-500 hover:text-industrial-700'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                Photos
              </button>
              <button
                onClick={() => setActiveType('video')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
                  activeType === 'video'
                    ? 'bg-white shadow text-primary-700'
                    : 'text-industrial-500 hover:text-industrial-700'
                }`}
              >
                <Film className="w-3 h-3" />
                Videos
              </button>
            </div>
          </div>

          {/* Videos Section */}
          {showVideos && filteredVideos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-industrial-900 mb-6 flex items-center gap-2">
                <Film className="w-5 h-5 text-primary-600" />
                Videos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, index) => (
                  <div
                    key={video.publicId}
                    className="group cursor-pointer"
                    onClick={() => setPlayingVideo(video.url)}
                  >
                    <div className="aspect-video rounded-industrial-lg overflow-hidden bg-industrial-100 relative">
                      {video.thumbnailUrl ? (
                        <img
                          src={video.thumbnailUrl}
                          alt={video.originalName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="w-12 h-12 text-industrial-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-primary-600 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-industrial-900 group-hover:text-primary-600 transition-colors">
                        {video.originalName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos Section */}
          {showImages && filteredImages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-industrial-900 mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-600" />
                Photos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((photo, index) => (
                  <div
                    key={photo.publicId}
                    className="aspect-square rounded-industrial-lg overflow-hidden bg-industrial-100 relative group cursor-pointer"
                    onClick={() => setLightboxIndex(index)}
                  >
                    {!loadedImages.has(photo.url) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-industrial-300 animate-spin" />
                      </div>
                    )}
                    <img
                      src={photo.url}
                      alt={photo.originalName}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        loadedImages.has(photo.url) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(photo.url)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" x="50" y="55"%3ENo Image%3C/text%3E%3C/svg%3E';
                        handleImageLoad(photo.url);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end">
                      <div className="w-full p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium truncate">{photo.originalName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredImages.length === 0 && filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-industrial-300 mx-auto mb-4" />
              <p className="text-industrial-500 font-medium">No media found</p>
              <p className="text-sm text-industrial-400 mt-1">
                Try a different category or filter
              </p>
            </div>
          )}

          {/* Info text */}
          <div className="mt-12 text-center">
            <p className="text-sm text-industrial-500 italic">
              Actual equipment and facility images available on request. Contact us for project-specific references.
            </p>
          </div>
        </div>
      </section>

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
    </>
  );
}

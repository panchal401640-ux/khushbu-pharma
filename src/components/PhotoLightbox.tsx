'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';

interface PhotoLightboxProps {
  images: { url: string; alt: string; originalName?: string; size?: number }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function PhotoLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [index]);

  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < images.length) {
        setIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    },
    [images.length, onIndexChange]
  );

  const goNext = useCallback(() => goTo(index + 1), [index, goTo]);
  const goPrev = useCallback(() => goTo(index - 1), [index, goTo]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 5));
    } else {
      setZoom((prev) => {
        const newZoom = Math.max(prev - 0.2, 1);
        if (newZoom === 1) setPosition({ x: 0, y: 0 });
        return newZoom;
      });
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom > 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      }
    },
    [zoom, position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && zoom > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, zoom, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDownload = useCallback(() => {
    const image = images[index];
    if (!image) return;
    const a = document.createElement('a');
    a.href = image.url;
    a.download = image.originalName || `image-${index + 1}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [images, index]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'i':
          setShowInfo((prev) => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev, handleZoomIn, handleZoomOut]);

  if (!isOpen || !images[index]) return null;

  const image = images[index];

  const formatSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onWheel={handleWheel}
    >
      <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2 text-white">
            <span className="text-sm font-medium">
              {index + 1} / {images.length}
            </span>
            {image.originalName && (
              <span className="text-sm text-white/60 ml-2 hidden sm:inline">
                {image.originalName}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Image info (I)"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div
          className="w-full h-full flex items-center justify-center p-16"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            ref={imageRef}
            src={image.url}
            alt={image.alt}
            className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            }}
            draggable={false}
          />
        </div>

        {/* Navigation arrows */}
        {index > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors z-50"
            title="Previous (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {index < images.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors z-50"
            title="Next (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Bottom toolbar */}
        <div className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30"
            title="Zoom out (-)"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-white text-sm font-mono min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 5}
            className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors disabled:opacity-30"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-0 right-0 z-50 flex items-center justify-center gap-2 px-4 overflow-x-auto py-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === index
                    ? 'border-blue-500 scale-110'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Info panel */}
        {showInfo && (
          <div className="absolute top-14 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white text-sm min-w-[200px]">
            <h4 className="font-semibold mb-2">Image Details</h4>
            <div className="space-y-1.5 text-white/70">
              {image.originalName && (
                <p>
                  <span className="text-white/50">Name:</span> {image.originalName}
                </p>
              )}
              {image.size ? (
                <p>
                  <span className="text-white/50">Size:</span> {formatSize(image.size)}
                </p>
              ) : null}
              <p>
                <span className="text-white/50">Index:</span> {index + 1} of {images.length}
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/40">
              <p>Scroll to zoom • Drag to pan</p>
              <p>← → Navigate • Esc Close</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

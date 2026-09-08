'use client';

import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  name?: string;
}

export function ProductImage({ src, alt, className = '', name = '' }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-gradient-to-br from-industrial-100 to-industrial-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="h-20 w-20 mx-auto mb-3 bg-white/60 rounded-full flex items-center justify-center">
            <svg className="h-12 w-12 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {name && <p className="text-sm font-semibold text-industrial-600">{name}</p>}
          <p className="text-xs text-industrial-400 mt-1">Upload photo from Admin Panel</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`block mx-auto ${className}`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

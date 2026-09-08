'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  images: { src: string; alt: string }[];
  onChange: (images: { src: string; alt: string }[]) => void;
  maxImages?: number;
}

function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) { h = (h * maxWidth) / w; w = maxWidth; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject('No canvas'); return; }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject('Image load failed');
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject('File read failed');
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cropIdx, setCropIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); };
  const showError = (msg: string) => { setError(msg); setTimeout(() => setError(''), 5000); };

  const handleFile = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = maxImages - images.length;
    if (remaining <= 0) { showError(`Max ${maxImages} images. Delete some first.`); return; }

    setProcessing(true);
    setError('');
    const toProcess = Array.from(files).slice(0, remaining);
    const newImages: { src: string; alt: string }[] = [];

    for (const file of toProcess) {
      if (!file.type.startsWith('image/')) { showError(`"${file.name}" is not an image`); continue; }
      try {
        const compressed = await compressImage(file);
        newImages.push({ src: compressed, alt: file.name.replace(/\.[^.]+$/, '') });
      } catch { showError(`Failed: ${file.name}`); }
    }

    if (newImages.length > 0) {
      const updated = [...images, ...newImages];
      try {
        const test = JSON.stringify(updated);
        if (test.length > 4 * 1024 * 1024) {
          showError('Images too large! Use fewer or smaller photos.');
          setProcessing(false);
          return;
        }
        onChange(updated);
        showSuccess(`${newImages.length} photo(s) added! Click "Save" to keep them.`);
      } catch {
        showError('Storage error. Try fewer photos.');
      }
    }
    setProcessing(false);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
    showSuccess('Photo removed. Click "Save" to confirm.');
  };

  const updateAlt = (idx: number, alt: string) => {
    const updated = [...images];
    updated[idx] = { ...updated[idx], alt };
    onChange(updated);
  };

  const moveImage = (from: number, dir: -1 | 1) => {
    const to = from + dir;
    if (to < 0 || to >= images.length) return;
    const updated = [...images];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    onChange(updated);
  };

  const doCrop = async (idx: number, ratio: number | null) => {
    const img = images[idx];
    if (!img?.src) { setCropIdx(null); return; }
    try {
      const element = new Image();
      element.src = img.src;
      await new Promise(r => { element.onload = r; setTimeout(r, 3000); });
      const canvas = document.createElement('canvas');
      const iw = element.width, ih = element.height;
      let sx = 0, sy = 0, sw = iw, sh = ih;
      if (ratio) {
        const tr = ratio, cr = iw / ih;
        if (cr > tr) { sw = ih * tr; sx = (iw - sw) / 2; }
        else { sh = iw / tr; sy = (ih - sh) / 2; }
      }
      canvas.width = sw; canvas.height = sh;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(element, sx, sy, sw, sh, 0, 0, sw, sh);
        const updated = [...images];
        updated[idx] = { ...updated[idx], src: canvas.toDataURL('image/jpeg', 0.8) };
        onChange(updated);
        showSuccess('Image cropped! Click "Save" to keep.');
      }
    } catch { showError('Crop failed'); }
    setCropIdx(null);
  };

  return (
    <div className="space-y-3">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg font-medium">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg font-medium">{success}</div>}

      {/* Upload Button - Works on ALL browsers including mobile */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing || images.length >= maxImages}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 active:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {processing ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Photo ({images.length}/{maxImages})
            </>
          )}
        </button>
        {/* The actual file input - visible enough for mobile browsers */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => { handleFile(e.target.files); e.target.value = ''; }}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, width: 0, height: 0 }}
          aria-hidden="true"
        />
      </div>

      <p className="text-xs text-gray-400">JPG, PNG, WebP - Auto compressed to 800px. Max 10MB per file.</p>

      {/* Crop Modal */}
      {cropIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setCropIdx(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-3">Crop Photo</h3>
            <img src={images[cropIdx].src} alt="Crop" className="w-full rounded-lg border mb-4 max-h-64 object-contain bg-gray-100" />
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[{ l: 'Free', r: null }, { l: '1:1', r: 1 }, { l: '4:3', r: 4/3 }, { l: '16:9', r: 16/9 }, { l: '3:4', r: 3/4 }, { l: '9:16', r: 9/16 }].map(({ l, r }) => (
                <button key={l} onClick={() => doCrop(cropIdx, r)} className="py-2 border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-green-500 hover:bg-green-50 active:bg-green-100">{l}</button>
              ))}
            </div>
            <button onClick={() => setCropIdx(null)} className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((img, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <div className="relative flex-shrink-0">
                <img src={img.src} alt={img.alt} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border" />
                {i === 0 && <span className="absolute -top-1 -left-1 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow">MAIN</span>}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  value={img.alt}
                  onChange={e => updateAlt(i, e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-500 mb-2"
                />
                <div className="flex flex-wrap gap-1">
                  {i > 0 && <button onClick={() => moveImage(i, -1)} className="px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 active:bg-gray-300">← Left</button>}
                  {i < images.length - 1 && <button onClick={() => moveImage(i, 1)} className="px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 active:bg-gray-300">Right →</button>}
                  <button onClick={() => setCropIdx(i)} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">✂ Crop</button>
                  <button onClick={() => removeImage(i)} className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded-md hover:bg-red-100">✕ Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

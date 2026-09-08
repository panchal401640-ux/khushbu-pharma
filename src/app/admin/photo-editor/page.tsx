'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AdminLayout } from '../AdminLayout';

interface EditableImage {
  id: string;
  src: string;
  name: string;
  originalSrc: string;
  history: string[];
  historyIdx: number;
}

interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
  invert: number;
}

interface TextOverlay {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  shadow: boolean;
}

const DEFAULT_FILTERS: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  invert: 0,
};

const FILTER_PRESETS: { name: string; icon: string; filters: Partial<FilterSettings> }[] = [
  { name: 'Original', icon: '🔄', filters: {} },
  { name: 'Vibrant', icon: '✨', filters: { brightness: 110, contrast: 120, saturation: 130 } },
  { name: 'B&W', icon: '⚫', filters: { grayscale: 100 } },
  { name: 'Sepia', icon: '🟤', filters: { sepia: 80, brightness: 105 } },
  { name: 'Dramatic', icon: '🎭', filters: { contrast: 140, brightness: 90, saturation: 80 } },
  { name: 'Bright', icon: '☀️', filters: { brightness: 130, contrast: 110 } },
  { name: 'Dark', icon: '🌙', filters: { brightness: 70, contrast: 120 } },
  { name: 'Cool', icon: '❄️', filters: { hueRotate: 200, saturation: 90, brightness: 105 } },
  { name: 'Warm', icon: '🔥', filters: { hueRotate: 30, saturation: 120, brightness: 105 } },
  { name: 'Vintage', icon: '📷', filters: { sepia: 40, contrast: 110, brightness: 95 } },
  { name: 'Sharp', icon: '🔍', filters: { contrast: 150, brightness: 100, saturation: 90 } },
  { name: 'Fade', icon: '🌫️', filters: { brightness: 120, contrast: 80, saturation: 70 } },
];

const CROP_RATIOS: { label: string; value: number | null }[] = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:4', value: 3 / 4 },
  { label: '9:16', value: 9 / 16 },
];

const FONT_FAMILIES = [
  'Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Courier New',
  'Impact', 'Comic Sans MS', 'Trebuchet MS', 'Palatino', 'Garamond',
];

function generateId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }

export default function AdminPhotoEditorPage() {
  const [images, setImages] = useState<EditableImage[]>([]);
  const [selected, setSelected] = useState<EditableImage | null>(null);
  const [filters, setFilters] = useState<FilterSettings>({ ...DEFAULT_FILTERS });
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [activeTab, setActiveTab] = useState<'filters' | 'crop' | 'text' | 'resize' | 'adjust'>('filters');
  const [cropMode, setCropMode] = useState<number | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const img: EditableImage = {
          id: generateId(),
          src,
          name: file.name.replace(/\.[^.]+$/, ''),
          originalSrc: src,
          history: [src],
          historyIdx: 0,
        };
        setImages(prev => [...prev, img]);
        if (!selected) setSelected(img);
      };
      reader.readAsDataURL(file);
    }
    showMsg(`${files.length} photo(s) uploaded`);
  };

  const getFilterCSS = (f: FilterSettings) => {
    return `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) blur(${f.blur}px) grayscale(${f.grayscale}%) sepia(${f.sepia}%) hue-rotate(${f.hueRotate}deg) invert(${f.invert}%)`;
  };

  const applyFiltersToImage = useCallback(async (img: EditableImage, f: FilterSettings): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const element = new Image();
      element.onload = () => {
        canvas.width = element.width;
        canvas.height = element.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(img.src); return; }
        ctx.filter = getFilterCSS(f);
        ctx.drawImage(element, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      element.onerror = () => resolve(img.src);
      element.src = img.src;
    });
  }, []);

  const handleFilterChange = async (key: keyof FilterSettings, value: number) => {
    if (!selected) return;
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilterPreset = async (preset: typeof FILTER_PRESETS[0]) => {
    if (!selected) return;
    const newFilters = { ...DEFAULT_FILTERS, ...preset.filters };
    setFilters(newFilters);
    showMsg(`${preset.name} filter applied`);
  };

  const resetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setTextOverlays([]);
    showMsg('All filters reset');
  };

  const saveToHistory = (newSrc: string) => {
    if (!selected) return;
    const updated = images.map(img => {
      if (img.id === selected.id) {
        const newHistory = img.history.slice(0, img.historyIdx + 1);
        newHistory.push(newSrc);
        return { ...img, src: newSrc, history: newHistory, historyIdx: newHistory.length - 1 };
      }
      return img;
    });
    setImages(updated);
    setSelected(updated.find(img => img.id === selected.id) || null);
  };

  const undo = () => {
    if (!selected || selected.historyIdx <= 0) return;
    const newIdx = selected.historyIdx - 1;
    const newSrc = selected.history[newIdx];
    const updated = images.map(img => {
      if (img.id === selected.id) return { ...img, src: newSrc, historyIdx: newIdx };
      return img;
    });
    setImages(updated);
    setSelected(updated.find(img => img.id === selected.id) || null);
    showMsg('Undo');
  };

  const redo = () => {
    if (!selected || selected.historyIdx >= selected.history.length - 1) return;
    const newIdx = selected.historyIdx + 1;
    const newSrc = selected.history[newIdx];
    const updated = images.map(img => {
      if (img.id === selected.id) return { ...img, src: newSrc, historyIdx: newIdx };
      return img;
    });
    setImages(updated);
    setSelected(updated.find(img => img.id === selected.id) || null);
    showMsg('Redo');
  };

  const doCrop = async (ratio: number | null) => {
    if (!selected) return;
    setIsCropping(true);
    try {
      const element = new Image();
      element.src = selected.src;
      await new Promise(r => { element.onload = r; setTimeout(r, 2000); });

      const canvas = document.createElement('canvas');
      const iw = element.width, ih = element.height;
      let sx = 0, sy = 0, sw = iw, sh = ih;

      if (ratio) {
        const cr = iw / ih;
        if (cr > ratio) { sw = ih * ratio; sx = (iw - sw) / 2; }
        else { sh = iw / ratio; sy = (ih - sh) / 2; }
      }

      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(element, sx, sy, sw, sh, 0, 0, sw, sh);
        const cropped = canvas.toDataURL('image/jpeg', 0.85);
        saveToHistory(cropped);
        showMsg(`Cropped ${ratio ? CROP_RATIOS.find(r => r.value === ratio)?.label : 'Free'}`);
      }
    } catch { showMsg('Crop failed'); }
    setIsCropping(false);
    setCropMode(null);
  };

  const handleResize = async () => {
    if (!selected) return;
    try {
      const element = new Image();
      element.src = selected.src;
      await new Promise(r => { element.onload = r; setTimeout(r, 1000); });

      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(element, 0, 0, resizeWidth, resizeHeight);
        const resized = canvas.toDataURL('image/jpeg', 0.85);
        saveToHistory(resized);
        showMsg(`Resized to ${resizeWidth}x${resizeHeight}`);
      }
    } catch { showMsg('Resize failed'); }
  };

  const addTextOverlay = () => {
    setTextOverlays(prev => [...prev, {
      text: 'KHUSHBU PHARMA',
      x: 50,
      y: 50,
      fontSize: 32,
      color: '#ffffff',
      fontFamily: 'Arial',
      bold: true,
      italic: false,
      shadow: true,
    }]);
    setActiveTab('text');
  };

  const applyTextOverlays = async () => {
    if (!selected || textOverlays.length === 0) return;
    try {
      const element = new Image();
      element.src = selected.src;
      await new Promise(r => { element.onload = r; setTimeout(r, 1000); });

      const canvas = document.createElement('canvas');
      canvas.width = element.width;
      canvas.height = element.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(element, 0, 0);

      for (const overlay of textOverlays) {
        const x = (overlay.x / 100) * canvas.width;
        const y = (overlay.y / 100) * canvas.height;
        const style = `${overlay.italic ? 'italic ' : ''}${overlay.bold ? 'bold ' : ''}${overlay.fontSize * (canvas.width / 800)}px ${overlay.fontFamily}`;
        ctx.font = style;
        ctx.textAlign = 'center';

        if (overlay.shadow) {
          ctx.shadowColor = 'rgba(0,0,0,0.7)';
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
        }

        ctx.fillStyle = overlay.color;
        ctx.fillText(overlay.text, x, y);

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      const result = canvas.toDataURL('image/jpeg', 0.85);
      saveToHistory(result);
      showMsg('Text overlay applied');
    } catch { showMsg('Failed to apply text'); }
  };

  const downloadImage = (img: EditableImage) => {
    const link = document.createElement('a');
    link.download = `${img.name}_edited.jpg`;
    link.href = img.src;
    link.click();
    showMsg('Downloaded!');
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (selected?.id === id) setSelected(null);
    showMsg('Image deleted');
  };

  const updateTextOverlay = (idx: number, field: keyof TextOverlay, value: any) => {
    setTextOverlays(prev => prev.map((o, i) => i === idx ? { ...o, [field]: value } : o));
  };

  const removeTextOverlay = (idx: number) => {
    setTextOverlays(prev => prev.filter((_, i) => i !== idx));
  };

  const updateImageName = (id: string, name: string) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, name } : img));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, name } : null);
  };

  const formatSize = (src: string) => {
    const bytes = Math.round((src.length * 3) / 4);
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        {msg && (
          <div className="px-4 py-3 rounded-lg text-sm font-medium bg-green-50 border border-green-200 text-green-700">{msg}</div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => { handleUpload(e.target.files); e.target.value = ''; }} className="hidden" />

        {images.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Photo Editor</h2>
            <p className="text-gray-500 mb-6">Upload photos to edit with filters, crop, text overlay, and more.</p>
            <button onClick={() => fileInputRef.current?.click()} className="px-8 py-4 bg-green-600 text-white rounded-xl text-base font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
              Upload Photos to Edit
            </button>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
              {['🎨 Filters', '✂️ Crop', '📝 Text', '📐 Resize'].map(f => (
                <div key={f} className="bg-gray-50 rounded-xl p-4 text-sm font-medium text-gray-700">{f}</div>
              ))}
            </div>
          </div>
        ) : !selected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Photo Library ({images.length})</h2>
              <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700">+ Add More</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} onClick={() => { setSelected(img); setFilters({ ...DEFAULT_FILTERS }); setTextOverlays([]); }} className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                  <div className="aspect-square relative">
                    <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-3">
                    <input value={img.name} onClick={e => e.stopPropagation()} onChange={e => updateImageName(img.id, e.target.value)} className="w-full text-sm font-medium text-gray-900 border-0 bg-transparent focus:outline-none focus:ring-0 p-0" />
                    <p className="text-xs text-gray-400 mt-0.5">{formatSize(img.src)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Image Preview */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelected(null)} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">← Back</button>
                  <button onClick={undo} disabled={selected.historyIdx <= 0} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40">↩ Undo</button>
                  <button onClick={redo} disabled={selected.historyIdx >= selected.history.length - 1} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40">↪ Redo</button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => applyTextOverlays()} disabled={textOverlays.length === 0} className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-40">Apply Text</button>
                  <button onClick={() => downloadImage(selected)} className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700">Download</button>
                </div>
              </div>
              <div className="relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center" style={{ minHeight: '400px' }}>
                <img
                  ref={imgRef}
                  src={selected.src}
                  alt={selected.name}
                  className="max-w-full max-h-[500px] object-contain"
                  style={{ filter: getFilterCSS(filters) }}
                />
                {textOverlays.map((overlay, i) => (
                  <div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${overlay.x}%`,
                      top: `${overlay.y}%`,
                      transform: 'translate(-50%, -50%)',
                      color: overlay.color,
                      fontSize: `${overlay.fontSize}px`,
                      fontFamily: overlay.fontFamily,
                      fontWeight: overlay.bold ? 'bold' : 'normal',
                      fontStyle: overlay.italic ? 'italic' : 'normal',
                      textShadow: overlay.shadow ? '2px 2px 4px rgba(0,0,0,0.7)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {overlay.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Panel */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Tool Tabs */}
              <div className="flex border-b border-gray-200">
                {(['filters', 'crop', 'text', 'resize', 'adjust'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-2 py-3 text-xs font-medium capitalize transition-colors ${activeTab === tab ? 'text-green-700 border-b-2 border-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-4 max-h-[500px] overflow-y-auto">
                {/* Filters Tab */}
                {activeTab === 'filters' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {FILTER_PRESETS.map(preset => (
                        <button key={preset.name} onClick={() => applyFilterPreset(preset)} className="flex flex-col items-center gap-1 p-2 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors">
                          <span className="text-lg">{preset.icon}</span>
                          <span className="text-[10px] font-medium text-gray-700">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={resetFilters} className="w-full py-2 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Reset All</button>
                  </div>
                )}

                {/* Crop Tab */}
                {activeTab === 'crop' && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Select crop ratio:</p>
                    <div className="grid grid-cols-3 gap-2">
                      {CROP_RATIOS.map(r => (
                        <button key={r.label} onClick={() => doCrop(r.value)} disabled={isCropping} className="py-3 border-2 border-gray-200 rounded-xl text-sm font-medium hover:border-green-500 hover:bg-green-50 active:bg-green-100 disabled:opacity-40">
                          {isCropping ? '...' : r.label}
                        </button>
                      ))}
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                      Tip: Use "Free" for custom crop, or select a fixed ratio for consistent sizing.
                    </div>
                  </div>
                )}

                {/* Text Tab */}
                {activeTab === 'text' && (
                  <div className="space-y-3">
                    <button onClick={addTextOverlay} className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">+ Add Text</button>
                    {textOverlays.map((overlay, i) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">Text {i + 1}</span>
                          <button onClick={() => removeTextOverlay(i)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                        </div>
                        <input value={overlay.text} onChange={e => updateTextOverlay(i, 'text', e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter text" />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-gray-500">X Position</label>
                            <input type="range" min="0" max="100" value={overlay.x} onChange={e => updateTextOverlay(i, 'x', Number(e.target.value))} className="w-full" />
                            <span className="text-[10px] text-gray-400">{overlay.x}%</span>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500">Y Position</label>
                            <input type="range" min="0" max="100" value={overlay.y} onChange={e => updateTextOverlay(i, 'y', Number(e.target.value))} className="w-full" />
                            <span className="text-[10px] text-gray-400">{overlay.y}%</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-gray-500">Font Size</label>
                            <input type="range" min="12" max="120" value={overlay.fontSize} onChange={e => updateTextOverlay(i, 'fontSize', Number(e.target.value))} className="w-full" />
                            <span className="text-[10px] text-gray-400">{overlay.fontSize}px</span>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500">Color</label>
                            <input type="color" value={overlay.color} onChange={e => updateTextOverlay(i, 'color', e.target.value)} className="w-full h-8 rounded-lg border border-gray-200 cursor-pointer" />
                          </div>
                        </div>
                        <select value={overlay.fontFamily} onChange={e => updateTextOverlay(i, 'fontFamily', e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
                          {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => updateTextOverlay(i, 'bold', !overlay.bold)} className={`px-3 py-1 text-xs rounded-lg border ${overlay.bold ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-700'}`}>B</button>
                          <button onClick={() => updateTextOverlay(i, 'italic', !overlay.italic)} className={`px-3 py-1 text-xs rounded-lg border italic ${overlay.italic ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-700'}`}>I</button>
                          <button onClick={() => updateTextOverlay(i, 'shadow', !overlay.shadow)} className={`px-3 py-1 text-xs rounded-lg border ${overlay.shadow ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-700'}`}>Shadow</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Resize Tab */}
                {activeTab === 'resize' && (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-500">Resize image to specific dimensions:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-700 font-medium">Width (px)</label>
                        <input type="number" value={resizeWidth} onChange={e => {
                          const w = Number(e.target.value);
                          setResizeWidth(w);
                          if (maintainAspect && selected) {
                            const img = new Image();
                            img.src = selected.src;
                            img.onload = () => setResizeHeight(Math.round(w * img.height / img.width));
                          }
                        }} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-700 font-medium">Height (px)</label>
                        <input type="number" value={resizeHeight} onChange={e => {
                          const h = Number(e.target.value);
                          setResizeHeight(h);
                          if (maintainAspect && selected) {
                            const img = new Image();
                            img.src = selected.src;
                            img.onload = () => setResizeWidth(Math.round(h * img.width / img.height));
                          }
                        }} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-xs text-gray-700">
                      <input type="checkbox" checked={maintainAspect} onChange={e => setMaintainAspect(e.target.checked)} className="rounded" />
                      Maintain aspect ratio
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ w: 400, h: 300, l: 'Small' }, { w: 800, h: 600, l: 'Medium' }, { w: 1200, h: 900, l: 'Large' }].map(s => (
                        <button key={s.l} onClick={() => { setResizeWidth(s.w); setResizeHeight(s.h); }} className="py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                          {s.l}<br /><span className="text-gray-400">{s.w}x{s.h}</span>
                        </button>
                      ))}
                    </div>
                    <button onClick={handleResize} className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700">Resize Image</button>
                  </div>
                )}

                {/* Adjust Tab */}
                {activeTab === 'adjust' && (
                  <div className="space-y-4">
                    {([
                      { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
                      { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
                      { key: 'saturation', label: 'Saturation', min: 0, max: 200, unit: '%' },
                      { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
                      { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
                      { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
                      { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: 'deg' },
                      { key: 'invert', label: 'Invert', min: 0, max: 100, unit: '%' },
                    ] as const).map(({ key, label, min, max, unit }) => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-700 font-medium">{label}</span>
                          <span className="text-gray-400">{filters[key]}{unit}</span>
                        </div>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          value={filters[key]}
                          onChange={e => handleFilterChange(key, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                        />
                      </div>
                    ))}
                    <button onClick={resetFilters} className="w-full py-2 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Reset Adjustments</button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 p-4 space-y-2">
                <button onClick={() => downloadImage(selected)} className="w-full py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors">
                  Download Edited Photo
                </button>
                <button onClick={() => deleteImage(selected.id)} className="w-full py-2 bg-red-50 text-red-700 rounded-xl text-sm hover:bg-red-100 transition-colors">
                  Delete Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

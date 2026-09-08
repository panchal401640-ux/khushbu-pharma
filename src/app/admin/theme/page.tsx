'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../AdminLayout';

const defaultTheme = {
  primaryColor: '#1e6b3a',
  secondaryColor: '#2d8a50',
  accentColor: '#f59e0b',
  headerBg: '#171717',
  footerBg: '#171717',
  bodyBg: '#f5f5f4',
  textColor: '#1c1917',
  headingFont: 'Inter, sans-serif',
  bodyFont: 'Inter, sans-serif',
  borderRadius: '8px',
  buttonStyle: 'rounded',
  headerStyle: 'dark',
  layoutWidth: 'contained',
};

const presets = [
  { name: 'Industrial Green', colors: { primaryColor: '#1e6b3a', secondaryColor: '#2d8a50', accentColor: '#f59e0b' }, desc: 'Classic pharma industry look' },
  { name: 'Royal Blue', colors: { primaryColor: '#1d4ed8', secondaryColor: '#2563eb', accentColor: '#f97316' }, desc: 'Professional & trustworthy' },
  { name: 'Deep Purple', colors: { primaryColor: '#7c3aed', secondaryColor: '#8b5cf6', accentColor: '#06b6d4' }, desc: 'Modern & creative' },
  { name: 'Bold Red', colors: { primaryColor: '#dc2626', secondaryColor: '#ef4444', accentColor: '#fbbf24' }, desc: 'Energy & passion' },
  { name: 'Teal Modern', colors: { primaryColor: '#0d9488', secondaryColor: '#14b8a6', accentColor: '#f43f5e' }, desc: 'Fresh & contemporary' },
  { name: 'Slate Pro', colors: { primaryColor: '#334155', secondaryColor: '#475569', accentColor: '#3b82f6' }, desc: 'Corporate & sleek' },
  { name: 'Orange Energy', colors: { primaryColor: '#ea580c', secondaryColor: '#f97316', accentColor: '#8b5cf6' }, desc: 'Vibrant & bold' },
  { name: 'Navy Classic', colors: { primaryColor: '#1e3a5f', secondaryColor: '#2563eb', accentColor: '#eab308' }, desc: 'Traditional & elegant' },
  { name: 'Emerald', colors: { primaryColor: '#059669', secondaryColor: '#10b981', accentColor: '#f59e0b' }, desc: 'Nature-inspired' },
  { name: 'Crimson', colors: { primaryColor: '#be123c', secondaryColor: '#e11d48', accentColor: '#06b6d4' }, desc: 'Sophisticated red' },
  { name: 'Steel', colors: { primaryColor: '#475569', secondaryColor: '#64748b', accentColor: '#22d3ee' }, desc: 'Industrial metal' },
  { name: 'Midnight', colors: { primaryColor: '#1e1b4b', secondaryColor: '#312e81', accentColor: '#facc15' }, desc: 'Dark & premium' },
];

const GOOGLE_FONTS = [
  { name: 'Inter', value: 'Inter, sans-serif', category: 'Sans-serif' },
  { name: 'Roboto', value: "'Roboto', sans-serif", category: 'Sans-serif' },
  { name: 'Poppins', value: "'Poppins', sans-serif", category: 'Sans-serif' },
  { name: 'Open Sans', value: "'Open Sans', sans-serif", category: 'Sans-serif' },
  { name: 'Montserrat', value: "'Montserrat', sans-serif", category: 'Sans-serif' },
  { name: 'Nunito', value: "'Nunito', sans-serif", category: 'Sans-serif' },
  { name: 'Lato', value: "'Lato', sans-serif", category: 'Sans-serif' },
  { name: 'Raleway', value: "'Raleway', sans-serif", category: 'Sans-serif' },
  { name: 'Oswald', value: "'Oswald', sans-serif", category: 'Sans-serif' },
  { name: 'Ubuntu', value: "'Ubuntu', sans-serif", category: 'Sans-serif' },
  { name: 'Playfair Display', value: "'Playfair Display', serif", category: 'Serif' },
  { name: 'Merriweather', value: "'Merriweather', serif", category: 'Serif' },
  { name: 'Lora', value: "'Lora', serif", category: 'Serif' },
  { name: 'PT Serif', value: "'PT Serif', serif", category: 'Serif' },
  { name: 'Noto Sans', value: "'Noto Sans', sans-serif", category: 'Sans-serif' },
  { name: 'Fira Code', value: "'Fira Code', monospace", category: 'Monospace' },
  { name: 'Source Code Pro', value: "'Source Code Pro', monospace", category: 'Monospace' },
  { name: 'System Default', value: 'system-ui, sans-serif', category: 'System' },
];

function loadGoogleFonts(fonts: string[]) {
  const existing = document.getElementById('kpm-google-fonts');
  if (existing) existing.remove();
  const familyParams = fonts.map(f => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`).join('&');
  if (familyParams) {
    const link = document.createElement('link');
    link.id = 'kpm-google-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;
    document.head.appendChild(link);
  }
}

export default function AdminThemePage() {
  const [theme, setTheme] = useState(defaultTheme);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'presets' | 'colors' | 'fonts' | 'layout'>('presets');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_theme');
      if (stored) setTheme({ ...defaultTheme, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const applyThemeToSite = (t: typeof defaultTheme) => {
    const styleId = 'kpm-dynamic-theme';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) { styleEl = document.createElement('style'); styleEl.id = styleId; document.head.appendChild(styleEl); }

    loadGoogleFonts([t.headingFont.split(',')[0].replace(/'/g, ''), t.bodyFont.split(',')[0].replace(/'/g, '')]);

    styleEl.textContent = `
      :root { --primary: ${t.primaryColor}; --primary-700: ${t.primaryColor}; --primary-800: ${t.secondaryColor}; --primary-600: ${t.primaryColor}; }
      body { background-color: ${t.bodyBg} !important; color: ${t.textColor} !important; font-family: ${t.bodyFont} !important; }
      h1, h2, h3, h4, h5, h6 { font-family: ${t.headingFont} !important; }
      header { background-color: ${t.headerBg} !important; }
      footer { background-color: ${t.footerBg} !important; }
      .bg-primary-700, button[type="submit"], .btn-primary { background-color: ${t.primaryColor} !important; }
      .bg-primary-800 { background-color: ${t.secondaryColor} !important; }
      .bg-primary-600 { background-color: ${t.primaryColor} !important; }
      .text-primary-700 { color: ${t.primaryColor} !important; }
      .text-primary-600 { color: ${t.primaryColor} !important; }
      .border-primary-500 { border-color: ${t.primaryColor} !important; }
      .hover\\:bg-primary-800:hover { background-color: ${t.secondaryColor} !important; }
      .bg-primary-50 { background-color: ${t.primaryColor}0d !important; }
      .bg-primary-100 { background-color: ${t.primaryColor}1a !important; }
      .bg-industrial-900 { background-color: ${t.headerBg} !important; }
      footer.bg-industrial-900 { background-color: ${t.footerBg} !important; }
      [class*="rounded-industrial"] { border-radius: ${t.borderRadius} !important; }
    `;
  };

  const handleSave = () => {
    localStorage.setItem('kpm_theme', JSON.stringify(theme));
    applyThemeToSite(theme);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const applyPreset = (preset: typeof presets[0]) => {
    const updated = { ...theme, ...preset.colors };
    setTheme(updated);
    applyThemeToSite(updated);
  };

  const updateTheme = (updates: Partial<typeof theme>) => {
    const updated = { ...theme, ...updates };
    setTheme(updated);
    applyThemeToSite(updated);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-6">
        {saved && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700 font-medium flex items-center gap-2">
            <span className="text-lg">✅</span> Theme saved and applied! Visit your website to see changes.
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {([['presets', '🎨 Presets'], ['colors', '🎯 Colors'], ['fonts', '📝 Fonts'], ['layout', '📐 Layout']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === key ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Live Preview</h3>
            <span className="text-xs text-gray-400">Changes appear instantly</span>
          </div>
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Preview Header */}
            <div className="px-5 py-3 text-white text-sm font-medium flex items-center justify-between" style={{ backgroundColor: theme.headerBg }}>
              <span className="flex items-center gap-2" style={{ color: theme.primaryColor }}>
                <span className="text-lg">⚙</span>
                <span className="font-bold" style={{ fontFamily: theme.headingFont }}>KHUSHBU PHARMA</span>
              </span>
              <div className="flex gap-4 text-xs opacity-75" style={{ fontFamily: theme.bodyFont }}>
                <span>Home</span><span>Products</span><span>Contact</span>
              </div>
            </div>
            {/* Preview Body */}
            <div className="p-6" style={{ backgroundColor: theme.bodyBg, color: theme.textColor }}>
              <h4 className="text-xl font-bold mb-2" style={{ fontFamily: theme.headingFont }}>Engineering Excellence</h4>
              <p className="text-sm mb-4 opacity-70" style={{ fontFamily: theme.bodyFont }}>Pharmaceutical processing machinery manufacturer.</p>
              <div className="flex gap-3 mb-4">
                <span className="px-5 py-2.5 text-white text-xs font-bold" style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius, fontFamily: theme.bodyFont }}>Get Quote</span>
                <span className="px-5 py-2.5 bg-[#25d366] text-white text-xs font-bold" style={{ borderRadius: theme.borderRadius }}>WhatsApp</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Dryers', 'Blenders', 'Vessels'].map(cat => (
                  <div key={cat} className="bg-white rounded-lg p-3 border border-gray-200 text-center" style={{ borderRadius: theme.borderRadius }}>
                    <span className="text-xs font-medium" style={{ color: theme.primaryColor }}>{cat}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: theme.accentColor + '22', color: theme.accentColor }}>★ Featured</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold border-2" style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}>GMP Certified</span>
              </div>
            </div>
            {/* Preview Footer */}
            <div className="px-5 py-3 text-white text-xs" style={{ backgroundColor: theme.footerBg, fontFamily: theme.bodyFont }}>
              © 2026 Khushbu Pharma Machinery
            </div>
          </div>
        </div>

        {/* Presets Tab */}
        {tab === 'presets' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Theme Presets</h3>
            <p className="text-sm text-gray-500 mb-5">Click any preset to apply instantly. You can customize further in other tabs.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {presets.map(p => (
                <button key={p.name} onClick={() => applyPreset(p)} className="rounded-xl border-2 border-gray-200 p-4 text-left hover:shadow-lg hover:border-gray-300 transition-all group">
                  <div className="flex gap-1 mb-3">
                    <div className="h-10 w-10 rounded-full shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: p.colors.primaryColor }} />
                    <div className="h-10 w-10 rounded-full shadow-sm -ml-3 group-hover:scale-110 transition-transform" style={{ backgroundColor: p.colors.secondaryColor }} />
                    <div className="h-10 w-10 rounded-full shadow-sm -ml-3 group-hover:scale-110 transition-transform" style={{ backgroundColor: p.colors.accentColor }} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {tab === 'colors' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Custom Colors</h3>
            <p className="text-sm text-gray-500 mb-5">Pick exact colors for every part of your website.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {([
                { label: 'Primary Color', field: 'primaryColor', desc: 'Buttons, links, brand identity', icon: '🎨' },
                { label: 'Secondary Color', field: 'secondaryColor', desc: 'Hover states, secondary accents', icon: '🎯' },
                { label: 'Accent Color', field: 'accentColor', desc: 'Highlights, badges, special elements', icon: '✨' },
                { label: 'Header Background', field: 'headerBg', desc: 'Top navigation bar background', icon: '📌' },
                { label: 'Footer Background', field: 'footerBg', desc: 'Bottom footer section background', icon: '📋' },
                { label: 'Body Background', field: 'bodyBg', desc: 'Main page background color', icon: '📄' },
                { label: 'Text Color', field: 'textColor', desc: 'Main body text color', icon: '✏️' },
              ] as const).map(({ label, field, desc, icon }) => (
                <div key={field} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{icon}</span>
                    <label className="text-sm font-bold text-gray-900">{label}</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={(theme as any)[field]} onChange={e => updateTheme({ [field]: e.target.value })} className="h-12 w-16 rounded-lg border border-gray-300 cursor-pointer p-1" />
                    <input value={(theme as any)[field]} onChange={e => updateTheme({ [field]: e.target.value })} className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-mono focus:border-blue-500 focus:outline-none" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fonts Tab */}
        {tab === 'fonts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Typography</h3>
              <p className="text-sm text-gray-500 mb-5">Choose fonts that match your brand. Google Fonts are loaded automatically.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'Heading Font', field: 'headingFont', desc: 'Used for titles, headings, navigation' },
                  { label: 'Body Font', field: 'bodyFont', desc: 'Used for paragraphs, descriptions, buttons' },
                ].map(({ label, field, desc }) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-gray-900 mb-1">{label}</label>
                    <p className="text-xs text-gray-400 mb-3">{desc}</p>
                    <select value={(theme as any)[field]} onChange={e => updateTheme({ [field]: e.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none">
                      {GOOGLE_FONTS.map(f => (
                        <option key={f.value} value={f.value}>{f.name} ({f.category})</option>
                      ))}
                    </select>
                    <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-bold" style={{ fontFamily: (theme as any)[field] }}>Sample Heading</p>
                      <p className="text-sm mt-1" style={{ fontFamily: (theme as any)[field] }}>This is how your text will look with this font.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Border Radius</h3>
              <p className="text-sm text-gray-500 mb-4">Control how rounded corners appear across the site.</p>
              <input type="range" min="0" max="24" value={parseInt(theme.borderRadius)} onChange={e => updateTheme({ borderRadius: e.target.value + 'px' })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">Sharp (0px)</span>
                <span className="text-sm font-bold text-gray-700">{theme.borderRadius}</span>
                <span className="text-xs text-gray-400">Very Round (24px)</span>
              </div>
              <div className="flex gap-4 mt-4">
                {[0, 4, 8, 12, 16, 24].map(r => (
                  <button key={r} onClick={() => updateTheme({ borderRadius: r + 'px' })} className="flex flex-col items-center gap-1">
                    <div className="h-12 w-12 bg-green-600 transition-all" style={{ borderRadius: r + 'px', boxShadow: parseInt(theme.borderRadius) === r ? '0 0 0 3px rgba(22,163,74,0.3)' : 'none' }} />
                    <span className="text-[10px] text-gray-400">{r}px</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {tab === 'layout' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Header Style</h3>
              <p className="text-sm text-gray-500 mb-4">Choose how your header/navigation looks.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'dark', label: 'Dark', bg: '#171717', desc: 'Professional' },
                  { value: 'white', label: 'White', bg: '#ffffff', desc: 'Clean & minimal' },
                  { value: 'primary', label: 'Brand Color', bg: theme.primaryColor, desc: 'Bold & branded' },
                ].map(s => (
                  <button key={s.value} onClick={() => updateTheme({ headerBg: s.bg, headerStyle: s.value })} className={`rounded-xl border-2 p-4 text-center transition-all ${theme.headerStyle === s.value ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="h-8 rounded-lg mb-2" style={{ backgroundColor: s.bg }} />
                    <p className="text-sm font-bold text-gray-900">{s.label}</p>
                    <p className="text-xs text-gray-400">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Button Style</h3>
              <p className="text-sm text-gray-500 mb-4">Choose how buttons look across the site.</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: 'rounded', label: 'Rounded', radius: '8px' },
                  { value: 'pill', label: 'Pill', radius: '9999px' },
                  { value: 'sharp', label: 'Sharp', radius: '0px' },
                  { value: 'soft', label: 'Soft', radius: '16px' },
                ].map(s => (
                  <button key={s.value} onClick={() => updateTheme({ buttonStyle: s.value, borderRadius: s.radius })} className={`rounded-xl border-2 p-4 text-center transition-all ${theme.buttonStyle === s.value ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="px-4 py-2 bg-green-600 text-white text-xs font-bold mx-auto mb-2" style={{ borderRadius: s.radius }}>Button</div>
                    <p className="text-xs font-medium text-gray-700">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quick Apply</h3>
              <p className="text-sm text-gray-500 mb-4">Apply complete theme packages with one click.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => updateTheme({ headerBg: '#171717', footerBg: '#171717', bodyBg: '#f5f5f4', textColor: '#1c1917' })} className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all text-left">
                  <p className="text-sm font-bold text-gray-900">Light Mode</p>
                  <p className="text-xs text-gray-400">White background, dark text</p>
                </button>
                <button onClick={() => updateTheme({ headerBg: '#0f172a', footerBg: '#0f172a', bodyBg: '#1e293b', textColor: '#f1f5f9' })} className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all text-left">
                  <p className="text-sm font-bold text-gray-900">Dark Mode</p>
                  <p className="text-xs text-gray-400">Dark background, light text</p>
                </button>
                <button onClick={() => updateTheme({ headerBg: '#ffffff', footerBg: '#f8fafc', bodyBg: '#ffffff', textColor: '#1e293b' })} className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all text-left">
                  <p className="text-sm font-bold text-gray-900">Minimal</p>
                  <p className="text-xs text-gray-400">All white, ultra clean</p>
                </button>
                <button onClick={() => updateTheme({ headerBg: '#1e6b3a', footerBg: '#1e6b3a', bodyBg: '#f0fdf4', textColor: '#14532d' })} className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 transition-all text-left">
                  <p className="text-sm font-bold text-gray-900">Full Brand</p>
                  <p className="text-xs text-gray-400">Brand color everywhere</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleSave} className="px-8 py-3.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
            Save & Apply Theme
          </button>
          <button onClick={() => { setTheme(defaultTheme); localStorage.removeItem('kpm_theme'); location.reload(); }} className="px-6 py-3.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
            Reset to Default
          </button>
          <a href="/" target="_blank" className="px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            View Website ↗
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}

'use client';

import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_theme');
      if (!stored) return;
      const t = JSON.parse(stored);
      const styleId = 'kpm-dynamic-theme';
      let el = document.getElementById(styleId) as HTMLStyleElement;
      if (!el) { el = document.createElement('style'); el.id = styleId; document.head.appendChild(el); }
      const pc = t.primaryColor || '#1e6b3a';
      const sc = t.secondaryColor || '#2d8a50';
      const ac = t.accentColor || '#f59e0b';
      const hb = t.headerBg || '#171717';
      const fb = t.footerBg || '#171717';
      const bg = t.bodyBg || '#f5f5f4';
      const tc = t.textColor || '#1c1917';
      const hf = t.headingFont || 'Inter, sans-serif';
      const bf = t.bodyFont || 'Inter, sans-serif';
      const br = t.borderRadius || '8px';
      el.textContent = `
        :root { --primary: ${pc}; --primary-700: ${pc}; --primary-800: ${sc}; --primary-600: ${pc}; }
        body { background-color: ${bg} !important; color: ${tc} !important; font-family: ${bf} !important; }
        h1, h2, h3, h4, h5, h6 { font-family: ${hf} !important; }
        footer { background-color: ${fb} !important; }
        .bg-primary-700 { background-color: ${pc} !important; }
        .bg-primary-800 { background-color: ${sc} !important; }
        .bg-primary-600 { background-color: ${pc} !important; }
        .text-primary-700 { color: ${pc} !important; }
        .text-primary-600 { color: ${pc} !important; }
        .border-primary-500 { border-color: ${pc} !important; }
        .hover\\:bg-primary-800:hover { background-color: ${sc} !important; }
        .bg-primary-50 { background-color: ${pc}0d !important; }
        .bg-primary-100 { background-color: ${pc}1a !important; }
        [class*="rounded-industrial"] { border-radius: ${br} !important; }
      `;
    } catch {}
  }, []);

  return <>{children}</>;
}

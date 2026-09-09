'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Bot,
  FileText,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Palette,
  Mail,
  Layers,
  Sparkles,
  Folder,
} from 'lucide-react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_PASSWORD = 'khushbu2024';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('kpm_admin_auth');
    if (auth === 'true') setIsAuthenticated(true);

    try {
      const products = localStorage.getItem('kpm_products');
      if (products) {
        const parsed = JSON.parse(products);
        let cleaned = false;
        const fixed = parsed.map((p: any) => {
          if (p.images) {
            const cleanImages = p.images.filter((img: any) => {
              if (img.src && img.src.startsWith('data:image')) {
                cleaned = true;
                return false;
              }
              return true;
            });
            if (cleanImages.length !== p.images.length) {
              return { ...p, images: cleanImages };
            }
          }
          if (p.videos) {
            const cleanVideos = p.videos.filter((v: any) => {
              if (v.src && v.src.startsWith('data:video')) {
                cleaned = true;
                return false;
              }
              return true;
            });
            if (cleanVideos.length !== p.videos.length) {
              return { ...p, videos: cleanVideos };
            }
          }
          return p;
        });
        if (cleaned) {
          localStorage.setItem('kpm_products', JSON.stringify(fixed));
        }
      }
      const media = localStorage.getItem('kpm_media');
      if (media) {
        const parsed = JSON.parse(media);
        const cleanMedia = parsed.filter((m: any) => {
          if (m.url && (m.url.startsWith('data:image') || m.url.startsWith('data:video'))) {
            return false;
          }
          return true;
        });
        if (cleanMedia.length !== parsed.length) {
          localStorage.setItem('kpm_media', JSON.stringify(cleanMedia));
        }
      }
    } catch {}

    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('kpm_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('kpm_admin_auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <span className="text-white text-2xl font-black">K</span>
          </div>
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'DHRUV AI', href: '/admin/ai', icon: '🤖', highlight: true },
  { label: 'Products', href: '/admin/products', icon: '📦' },
  { label: 'Media Gallery', href: '/admin/media', icon: '🎬' },
  { label: 'Photo Editor', href: '/admin/photo-editor', icon: '📸' },
  { label: 'Theme & Colors', href: '/admin/theme', icon: '🎨' },
  { label: 'Page Editor', href: '/admin/pages', icon: '📄' },
  { label: 'Enquiries', href: '/admin/enquiries', icon: '📧' },
  { label: 'Categories', href: '/admin/categories', icon: '📁' },
  { label: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState('');
  const [companyName, setCompanyName] = useState('KHUSHBU PHARMA MACHINERY');
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    const loadLogo = () => {
      try {
        const storedLogo = localStorage.getItem('kpm_logo');
        if (storedLogo && storedLogo.length < 500000) setLogo(storedLogo);
        const settings = localStorage.getItem('kpm_settings');
        if (settings) {
          const s = JSON.parse(settings);
          if (s.name) setCompanyName(s.name);
        }
      } catch {}
    };
    loadLogo();
    window.addEventListener('kpm-logo-changed', loadLogo);
    return () => window.removeEventListener('kpm-logo-changed', loadLogo);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_products');
      if (stored && stored.length > 5000000) {
        setStorageError('localStorage is full. Some images may not save properly. Please clear browser cache (Ctrl+Shift+Delete) and re-upload smaller images.');
      }
    } catch {}
  }, []);

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt={companyName} className="w-11 h-11 rounded-xl object-contain bg-white p-1" />
            ) : (
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <span className="text-white text-xl font-black">K</span>
              </div>
            )}
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white leading-tight">{companyName}</h1>
              <p className="text-[10px] text-green-400 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        <button onClick={() => setSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 p-1 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/admin' && pathname === '/admin');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  item.highlight
                    ? isActive
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-600/30'
                      : 'bg-gradient-to-r from-green-600/10 to-blue-600/10 text-green-400 hover:from-green-600/20 hover:to-blue-600/20'
                    : isActive
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <a href="/" target="_blank" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-3 px-2">
            🌐 View Website ↗
          </a>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl text-sm font-medium transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6 sticky top-0 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg mr-3 transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {sidebarItems.find(i => i.href === pathname)?.label || 'Admin'}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {storageError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm flex items-center justify-between">
              <span>{storageError}</span>
              <button onClick={() => setStorageError('')} className="text-yellow-600 hover:text-yellow-800 ml-2">✕</button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

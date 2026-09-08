'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AdminLayout';
import { Cog, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (login(username, password)) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      <div className="w-full max-w-md relative">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-600/30 mb-6">
            <Cog className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            KHUSHBU PHARMA MACHINERY
          </h1>
          <p className="text-sm text-slate-400 mt-2">Admin Panel</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Sign in to Admin</h2>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                placeholder="Enter username"
                autoFocus
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Default credentials:{' '}
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                admin
              </span>{' '}
              /{' '}
              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                khushbu@2024
              </span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © 2024 Khushbu Pharma Machinery. All rights reserved.
        </p>
      </div>
    </div>
  );
}

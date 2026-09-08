'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../AdminLayout';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">KHUSHBU PHARMA</h1>
          <p className="text-sm text-industrial-400 mt-1">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-industrial-lg shadow-2xl p-8">
          <h2 className="text-lg font-semibold text-industrial-900 mb-6">Login</h2>
          {error && (
            <div className="mb-4 rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-industrial-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="w-full rounded-industrial border border-industrial-300 px-4 py-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full bg-primary-700 text-white py-3 rounded-industrial text-sm font-medium hover:bg-primary-800 transition-colors">
            Login
          </button>
          <p className="mt-4 text-xs text-industrial-400 text-center">
            Default password: khushbu2024
          </p>
        </form>
      </div>
    </div>
  );
}

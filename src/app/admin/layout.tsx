'use client';

import React from 'react';
import { AuthProvider } from './AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

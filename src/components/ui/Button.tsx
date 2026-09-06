'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 focus-visible:ring-primary-500 shadow-industrial',
    secondary: 'bg-industrial-100 text-industrial-900 hover:bg-industrial-200 focus-visible:ring-industrial-400 border border-industrial-200',
    outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1DB954] focus-visible:ring-[#25D366]',
    ghost: 'bg-transparent text-industrial-600 hover:bg-industrial-100 focus-visible:ring-industrial-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-industrial font-medium transition-all duration-fast ease-industrial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

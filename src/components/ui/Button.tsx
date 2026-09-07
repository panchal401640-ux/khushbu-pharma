import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = 'default', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<string, string> = {
    default: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-industrial-100 text-industrial-900 hover:bg-industrial-200',
    outline: 'border border-industrial-300 text-industrial-700 hover:bg-industrial-50',
    ghost: 'text-industrial-700 hover:bg-industrial-100',
    whatsapp: 'bg-green-500 text-white hover:bg-green-600',
  };
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button className={${base}   } {...props}>
      {children}
    </button>
  );
}

export default Button;
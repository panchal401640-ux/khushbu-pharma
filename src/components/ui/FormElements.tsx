'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  required,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-sm font-medium text-industrial-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-industrial border border-industrial-300 bg-white px-4 py-3 text-sm placeholder:text-industrial-400 transition-all duration-fast',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
          'disabled:bg-industrial-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-industrial-500">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  required,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block mb-1.5 text-sm font-medium text-industrial-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-industrial border border-industrial-300 bg-white px-4 py-3 text-sm placeholder:text-industrial-400 transition-all duration-fast resize-y min-h-[120px]',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
          'disabled:bg-industrial-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-industrial-500">{helperText}</p>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  required,
  placeholder = 'Select an option',
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-1.5 text-sm font-medium text-industrial-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full rounded-industrial border border-industrial-300 bg-white px-4 py-3 text-sm transition-all duration-fast appearance-none',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none',
          'disabled:bg-industrial-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className
        )}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

interface FileInputProps {
  label?: string;
  error?: string;
  accept?: string;
  maxSize?: number;
  onChange?: (file: File | null) => void;
  className?: string;
}

export function FileInput({
  label,
  error,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxSize = 5 * 1024 * 1024,
  onChange,
  className,
}: FileInputProps) {
  const [fileName, setFileName] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        alert(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
        return;
      }
      setFileName(file.name);
      onChange?.(file);
    } else {
      setFileName('');
      onChange?.(null);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1.5 text-sm font-medium text-industrial-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className={cn(
          'w-full rounded-industrial border border-dashed border-industrial-300 bg-industrial-50 px-4 py-8 text-center transition-all duration-fast hover:border-primary-400 hover:bg-primary-50',
          error && 'border-red-500',
          className
        )}>
          <p className="text-sm text-industrial-600">
            {fileName || 'Click to upload or drag and drop'}
          </p>
          <p className="mt-1 text-xs text-industrial-400">
            PDF, DOC, JPG, PNG (max 5MB)
          </p>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

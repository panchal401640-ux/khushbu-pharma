import React from 'react';
import { cn } from '@/lib/constants';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  badge?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', className, badge }: SectionHeadingProps) {
  return (
    <div className={cn(
      'max-w-3xl',
      align === 'center' && 'mx-auto text-center',
      align === 'right' && 'ml-auto text-right',
      className
    )}>
      {badge && (
        <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-industrial-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-industrial-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-industrial-500">
        <li>
          <a href="/" className="hover:text-primary-600 transition-colors">Home</a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span className="text-industrial-300">/</span>
            {item.href ? (
              <a href={item.href} className="hover:text-primary-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-industrial-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn(
      'group rounded-industrial-lg border border-industrial-200 bg-white p-6 shadow-card transition-all duration-normal hover:shadow-card-hover hover:-translate-y-1',
      className
    )}>
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-industrial bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-industrial-900">{title}</h3>
      <p className="mt-2 text-sm text-industrial-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface SpecificationTableProps {
  specifications: { parameter: string; specification: string }[];
  className?: string;
}

export function SpecificationTable({ specifications, className }: SpecificationTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-industrial-lg border border-industrial-200', className)}>
      <table className="w-full">
        <thead>
          <tr className="bg-industrial-900 text-white">
            <th className="px-6 py-3.5 text-left text-sm font-semibold">Parameter</th>
            <th className="px-6 py-3.5 text-left text-sm font-semibold">Specification</th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-industrial-100 transition-colors hover:bg-industrial-50',
                index % 2 === 0 ? 'bg-white' : 'bg-industrial-50/50'
              )}
            >
              <td className="px-6 py-3.5 text-sm font-medium text-industrial-900">{spec.parameter}</td>
              <td className="px-6 py-3.5 text-sm text-industrial-600">{spec.specification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ question, answer, isOpen = false, onToggle }: FAQItemProps) {
  const [open, setOpen] = React.useState(isOpen);
  const toggle = onToggle || (() => setOpen(!open));

  return (
    <div className="border-b border-industrial-200">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-industrial-900 pr-4">{question}</span>
        <svg
          className={cn(
            'h-5 w-5 flex-shrink-0 text-industrial-500 transition-transform duration-200',
            open && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-industrial-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-industrial bg-industrial-200',
            className
          )}
        />
      ))}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && (
        <div className="mb-4 h-16 w-16 rounded-full bg-industrial-100 p-4 text-industrial-400">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-industrial-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-industrial-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

import React from 'react';
import BreadcrumbComponent from '@/components/Breadcrumb';
import EmptyStateComponent from '@/components/EmptyState';
import ErrorStateComponent from '@/components/ErrorState';

interface BreadcrumbItem { label: string; href?: string; }

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return <div className={className}><BreadcrumbComponent items={items} /></div>;
}

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ badge, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={className ? 'mb-10 ' + className : 'mb-10'}>
      {badge && (
        <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-gray-500">{subtitle}</p>}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <div className={'rounded-industrial-lg border border-industrial-200 bg-white p-6 hover:shadow-card-hover transition-all ' + className}>
      <div className="mb-4 text-primary-600">{icon}</div>
      <h3 className="text-lg font-semibold text-industrial-900 mb-2">{title}</h3>
      <p className="text-sm text-industrial-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return <EmptyStateComponent title={title} description={description} action={action} />;
}

export const ErrorState = ErrorStateComponent;
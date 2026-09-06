import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="section bg-white">
      <div className="container-main max-w-xl text-center py-16">
        <h1 className="text-6xl font-bold text-industrial-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-industrial-900 mb-4">Page Not Found</h2>
        <p className="text-industrial-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/"><Button>Go to Homepage</Button></Link>
          <Link href="/products"><Button variant="secondary">View Products</Button></Link>
          <Link href="/contact"><Button variant="outline">Contact Us</Button></Link>
        </div>
      </div>
    </section>
  );
}

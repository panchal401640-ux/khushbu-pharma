'use client';

import { useState, useEffect } from 'react';
import { products as defaultProducts, categories as defaultCategories, industriesData as defaultIndustries } from '@/lib/data';
import { Product, Category, Industry } from '@/lib/types';

export function useProducts(): Product[] {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kpm_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {}
  }, []);

  return products;
}

export function useCategories(): Category[] {
  return defaultCategories;
}

export function useIndustries(): Industry[] {
  return defaultIndustries;
}

export function useProductBySlug(slug: string): Product | undefined {
  const products = useProducts();
  return products.find(p => p.slug === slug);
}

export function useRelatedProducts(slug: string, limit: number = 3): Product[] {
  const products = useProducts();
  const product = products.find(p => p.slug === slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.industries.some(i => product.industries.includes(i))))
    .slice(0, limit);
}

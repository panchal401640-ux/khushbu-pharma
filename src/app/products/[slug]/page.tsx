import { products } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}

import { NextResponse } from 'next/server';
import { products } from '@/data/products';;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const lowerQuery = query.toLowerCase();
  const results = products
    .filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.shortDescription.toLowerCase().includes(lowerQuery) ||
      p.applications.some(a => a.toLowerCase().includes(lowerQuery)) ||
      p.industries.some(i => i.toLowerCase().includes(lowerQuery))
    )
    .map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      shortDescription: p.shortDescription,
    }));

  return NextResponse.json({ results });
}

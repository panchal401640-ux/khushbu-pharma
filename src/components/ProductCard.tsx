import Link from "next/link";
import { ArrowRight, MessageCircle, FileText } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const features = product.features?.slice(0, 3) ?? [];

  return (
    <div className="group flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            {product.category}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">{product.name}</h3>
        {product.shortDescription && (
          <p className="mb-4 text-sm text-gray-500">{product.shortDescription}</p>
        )}
        {features.length > 0 && (
          <ul className="mb-6 space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <span className="mr-2 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-100 p-4 sm:flex-row">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/request-quote?product=${product.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <FileText className="h-4 w-4" />
          Request Quote
        </Link>
        <a
          href={WHATSAPP_URL(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

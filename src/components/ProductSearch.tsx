"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { searchProducts } from "@/data/products";
import { Search, X, ArrowRight } from "lucide-react";

interface ProductSearchProps {
  className?: string;
  placeholder?: string;
}

export default function ProductSearch({
  className = "",
  placeholder = "Search products...",
}: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    debounceRef.current = setTimeout(() => {
      const searchResults = searchProducts(value);
      setResults(searchResults);
      setIsOpen(true);
      setIsLoading(false);
    }, 300);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={`relative ${className"`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.trim().length > 0 && results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={handleSelect}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-lg font-bold text-gray-400">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-sm font-medium text-gray-900">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

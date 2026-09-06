"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, Package } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import ProductSearch from "@/components/ProductSearch";
import Breadcrumb from "@/components/Breadcrumb";
import { products, categories, industries } from "@/data/products";

const categoryNames = categories.map((c) => c.name);
const industryNames = industries.map((i) => i.name);

export default function ProductListing() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedIndustries.length > 0) {
      result = result.filter((p) =>
        p.industries.some((i) => selectedIndustries.includes(i))
      );
    }

    return result;
  }, [selectedCategories, selectedIndustries]);

  const hasFilters =
    selectedCategories.length > 0 || selectedIndustries.length > 0;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedIndustries([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products" },
          ]}
        />

        <SectionHeading
          title="Our Products"
          subtitle="Pharmaceutical and process equipment for diverse industrial applications"
        />

        {/* Search Bar */}
        <div className="mb-8">
          <ProductSearch
            placeholder="Search products by name, category, or application..."
            className="max-w-xl"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="mb-6 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasFilters && (
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
                {selectedCategories.length + selectedIndustries.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="w-64 shrink-0">
            <ProductFilter
              selectedCategories={selectedCategories}
              selectedIndustries={selectedIndustries}
              onCategoryChange={setSelectedCategories}
              onIndustryChange={setSelectedIndustries}
              onClearFilters={clearFilters}
              isMobileOpen={isMobileFilterOpen}
              onMobileClose={() => setIsMobileFilterOpen(false)}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {hasFilters && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 py-16 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  No products match your current filters. Try adjusting your
                  filter criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

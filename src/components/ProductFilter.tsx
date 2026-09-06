"use client";

import { useEffect } from "react";
import { categories, industries } from "@/data/products";
import { Filter, X } from "lucide-react";

interface ProductFilterProps {
  selectedCategories: string[];
  selectedIndustries: string[];
  onCategoryChange: (cats: string[]) => void;
  onIndustryChange: (inds: string[]) => void;
  onClearFilters: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

function FilterContent({
  selectedCategories,
  selectedIndustries,
  onCategoryChange,
  onIndustryChange,
  onClearFilters,
}: Omit<ProductFilterProps, "isMobileOpen" | "onMobileClose">) {
  const hasFilters =
    selectedCategories.length > 0 || selectedIndustries.length > 0;

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      onIndustryChange(selectedIndustries.filter((i) => i !== industry));
    } else {
      onIndustryChange([...selectedIndustries, industry]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-900">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.slug}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryToggle(category.name)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-900">Industry</h4>
        <div className="space-y-2">
          {industries.map((industry) => (
            <label
              key={industry.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedIndustries.includes(industry.name)}
                onChange={() => handleIndustryToggle(industry.name)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">{industry.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductFilter({
  selectedCategories,
  selectedIndustries,
  onCategoryChange,
  onIndustryChange,
  onClearFilters,
  isMobileOpen,
  onMobileClose,
}: ProductFilterProps) {
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6">
          <FilterContent
            selectedCategories={selectedCategories}
            selectedIndustries={selectedIndustries}
            onCategoryChange={onCategoryChange}
            onIndustryChange={onIndustryChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filter Products
                </h2>
                <button
                  onClick={onMobileClose}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent
                  selectedCategories={selectedCategories}
                  selectedIndustries={selectedIndustries}
                  onCategoryChange={onCategoryChange}
                  onIndustryChange={onIndustryChange}
                  onClearFilters={onClearFilters}
                />
              </div>
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={onMobileClose}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

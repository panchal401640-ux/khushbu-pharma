"use client";

interface LoadingSkeletonProps {
  variant?: "card" | "text" | "heading";
  count?: number;
}

export default function LoadingSkeleton({ variant = "card", count = 1 }: LoadingSkeletonProps) {
  const renderSkeleton = (index: number) => {
    switch (variant) {
      case "heading":
        return (
          <div key={index} className="space-y-3">
            <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
        );
      case "text":
        return (
          <div key={index} className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
          </div>
        );
      case "card":
      default:
        return (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-6 flex gap-2">
              <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
              <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </div>
  );
}

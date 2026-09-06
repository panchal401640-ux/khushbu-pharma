"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, EnquiryFormData } from "@/lib/validation";
import { products } from "@/data/products";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface QuoteFormProps {
  preselectedProduct?: string;
}

export default function QuoteForm({ preselectedProduct }: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      product: preselectedProduct || "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      setStatus("idle");
      setErrorMessage("");

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="mb-2 text-lg font-semibold text-green-800">
          Enquiry Submitted Successfully
        </h3>
        <p className="text-green-700">
          Thank you. Your enquiry has been received. Our team will review your
          requirement and contact you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-green-800 underline hover:text-green-900"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Company name"
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-600">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="+91 98765 43210"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your country"
          />
          {errors.country && (
            <p className="mt-1 text-xs text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your city"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="product"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Product <span className="text-red-500">*</span>
          </label>
          <select
            id="product"
            {...register("product")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.slug}>
                {product.name} - {product.category}
              </option>
            ))}
          </select>
          {errors.product && (
            <p className="mt-1 text-xs text-red-600">
              {errors.product.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="requiredCapacity"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Required Capacity
          </label>
          <input
            id="requiredCapacity"
            type="text"
            {...register("requiredCapacity")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., 500 kg/hr"
          />
        </div>

        <div>
          <label
            htmlFor="materialOfConstruction"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Material of Construction
          </label>
          <input
            id="materialOfConstruction"
            type="text"
            {...register("materialOfConstruction")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., SS 316L"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="text"
            {...register("quantity")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Number of units"
          />
        </div>

        <div>
          <label
            htmlFor="deliveryTimeline"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Delivery Timeline
          </label>
          <input
            id="deliveryTimeline"
            type="text"
            {...register("deliveryTimeline")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g., 8-10 weeks"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="application"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Application / Process Requirement
          </label>
          <textarea
            id="application"
            {...register("application")}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Describe your application or process requirements"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="technicalRequirement"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Technical Requirement
          </label>
          <textarea
            id="technicalRequirement"
            {...register("technicalRequirement")}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Any specific technical requirements"
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Additional information or questions"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Enquiry
          </>
        )}
      </button>
    </form>
  );
}

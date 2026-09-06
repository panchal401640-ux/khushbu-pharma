"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-gray-500" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-gray-500" />
              )}
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="px-6 pb-4 text-sm text-gray-600">{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

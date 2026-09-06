"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { PHONE, WHATSAPP_URL } from "@/lib/constants";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-800 bg-gray-900 md:hidden">
      <div className="grid grid-cols-3 divide-x divide-gray-800">
        <a
          href={`tel:${PHONE}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white min-h-[48px]"
        >
          <Phone className="h-5 w-5" />
          <span className="text-xs font-medium">Call</span>
        </a>
        <a
          href={WHATSAPP_URL()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white min-h-[48px]"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>
        <Link
          href="/request-quote"
          className="flex flex-col items-center justify-center gap-1 py-3 text-white min-h-[48px]"
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs font-medium">Enquire</span>
        </Link>
      </div>
    </div>
  );
}

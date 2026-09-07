import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COMPANY_NAME = "KHUSHBU PHARMA MACHINERY";
export const COMPANY_FULL = "Khushbu Pharma Machinery";
export const PHONE = "+91 XXXXX XXXXX";
export const WHATSAPP = "91XXXXX XXXXX";
export const EMAIL = "info@khushbupharmamachinery.com";
export const ADDRESS = "Ahmedabad, Gujarat, India";

export const WHATSAPP_MESSAGE = (product?: string) => {
  const base = "Hello " + COMPANY_FULL + ", I am interested in your pharmaceutical machinery.";
  if (product) {
    return base + " I would like to enquire about " + product + ". Please share technical specifications and quotation.";
  }
  return base + " Please share your product catalogue and quotation.";
};

export const WHATSAPP_URL = (product?: string) =>
  "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE(product));

export const siteConfig = {
  name: COMPANY_NAME,
  description: "Khushbu Pharma Machinery manufactures pharmaceutical and process equipment for demanding industrial applications.",
  url: "https://khushbupharmamachinery.com",
  ogImage: "/og-image.png",
  phone: PHONE,
  whatsapp: WHATSAPP,
  email: EMAIL,
  address: {
    street: "Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    pincode: "380001",
  },
  businessHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 9:00 AM - 2:00 PM",
    sunday: "Sunday: Closed",
  },
};
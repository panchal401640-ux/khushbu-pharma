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
  const base = `Hello ${COMPANY_FULL}, I am interested in your pharmaceutical machinery.`;
  if (product) {
    return `${base} I would like to enquire about ${product}. Please share technical specifications and quotation.`;
  }
  return `${base} Please share your product catalogue and quotation.`;
};
export const WHATSAPP_URL = (product?: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE(product))}`;


// ── Site Config ──
export const siteConfig = {
  name: 'KHUSHBU PHARMA MACHINERY',
  description: 'Pharmaceutical, Chemical, Food & Cosmetic Processing Machinery Manufacturer. Engineering-focused design, custom fabrication, and quality manufacturing for demanding industrial applications.',
  url: 'https://khushbupharmamachinery.com',
  ogImage: '/images/og-image.jpg',
  phone: '+91 9328030074',
  phone2: '+91 8849936218',
  whatsapp: '919328030074',
  email: 'khushbupharma.sales@gmail.com',
  gst: '24CBPP7842P1ZY',
  contacts: [
    { name: 'Dhruv Panchal', phone: '+91 9328030074' },
    { name: 'Bharat Panchal', phone: '+91 8849936218' },
  ],
  address: {
    street: 'Opp. Ramvadi Bridge, B/H Metrix Plaza, Shed No -9, 26, Gajanan Industrial Hub - 2, Vatva GIDC Road, Vinzol',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pincode: '382445',
  },
  businessHours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Sat: 9:00 AM - 2:00 PM',
    sunday: 'Closed',
  },
  social: {
    linkedin: 'https://linkedin.com/company/khushbu-pharma-machinery',
    youtube: 'https://youtube.com/@khushbupharmamachinery',
  },
};

// ── Nav Items ──
export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'Fluid Bed Dryer', href: '/products/fluid-bed-dryer' },
      { label: 'Rapid Mixing Granulator', href: '/products/rapid-mixing-granulator' },
      { label: 'Blenders', href: '/products/category/blenders' },
      { label: 'Dryers', href: '/products/category/dryers' },
      { label: 'Mixers & Mills', href: '/products/category/mixers-mills' },
      { label: 'Vessels', href: '/products/category/vessels' },
      { label: 'Filtration & Sifting', href: '/products/category/filtration-sifting' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Quality', href: '/quality' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

// ── Footer Links ──
export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'Quality', href: '/quality' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
  products: [
    { label: 'Fluid Bed Dryer', href: '/products/fluid-bed-dryer' },
    { label: 'Rapid Mixing Granulator', href: '/products/rapid-mixing-granulator' },
    { label: 'Blenders', href: '/products/category/blenders' },
    { label: 'Dryers', href: '/products/category/dryers' },
    { label: 'Mixers & Mills', href: '/products/category/mixers-mills' },
    { label: 'Vessels', href: '/products/category/vessels' },
  ],
  resources: [
    { label: 'Company Profile', href: '/downloads#profile' },
    { label: 'Product Catalogue', href: '/downloads#catalogue' },
    { label: 'Technical Brochures', href: '/downloads#brochures' },
    { label: 'Blog', href: '/resources/blog' },
    { label: 'FAQs', href: '/resources/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
};

// ── getCurrentYear (re-export for convenience) ──
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

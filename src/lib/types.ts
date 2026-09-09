export interface TechnicalSpecification {
  parameter: string;
  specification: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  applications: string[];
  capacity: string;
  materialOfConstruction: string;
  contactParts: string;
  nonContactParts: string;
  power: string;
  dimensions: string;
  workingVolume: string;
  operatingTemperature: string;
  operatingPressure: string;
  finish: string;
  motor: string;
  gearbox: string;
  controls: string;
  features: string[];
  industries: string[];
  images: ProductImage[];
  videos?: { src: string; title: string }[];
  brochure?: string;
  technicalSpecifications: TechnicalSpecification[];
  faq: ProductFAQ[];
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ProductImage;
  productCount: number;
  features: string[];
  products?: string[];
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ProductImage;
  relevantProducts: string[];
  applications: string[];
}

export interface Enquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  product: string;
  requiredCapacity: string;
  materialOfConstruction: string;
  quantity: string;
  application: string;
  technicalRequirement: string;
  deliveryTimeline: string;
  attachment?: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  subject: string;
  message: string;
}

export interface RFQFormData extends ContactFormData {
  product: string;
  requiredCapacity: string;
  materialOfConstruction: string;
  quantity: string;
  application: string;
  technicalRequirement: string;
  deliveryTimeline: string;
  attachment?: File;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: ProductImage;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  relatedProducts: string[];
  faq: ProductFAQ[];
  seoTitle: string;
  seoDescription: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'machines' | 'manufacturing' | 'fabrication' | 'finished' | 'installation' | 'workshop';
  width: number;
  height: number;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'profile' | 'catalogue' | 'brochure' | 'specification' | 'other';
  fileSize: string;
  fileUrl: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  phone: string;
  phone2?: string;
  whatsapp: string;
  email: string;
  gst?: string;
  contacts?: { name: string; phone: string }[];
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
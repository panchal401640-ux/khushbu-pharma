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
  images: string[];
  brochure: string | null;
  technicalSpecifications: { parameter: string; specification: string }[];
  faq: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
}

export interface Enquiry {
  id?: string;
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
  message: string;
  createdAt?: Date;
  status?: "new" | "contacted" | "quoted" | "closed";
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  relatedProducts: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  type: string;
  fileSize: string;
  url: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  equipment: string[];
  icon: string;
}

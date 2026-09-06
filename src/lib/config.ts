import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  name: 'KHUSHBU PHARMA MACHINERY',
  description: 'Pharmaceutical, Chemical, Food & Cosmetic Processing Machinery Manufacturer. Engineering-focused design, custom fabrication, and quality manufacturing for demanding industrial applications.',
  url: 'https://khushbupharmamachinery.com',
  ogImage: '/images/og-image.jpg',
  phone: '+91 XXXX XXXXXX',
  whatsapp: '91XXXXXXXXXX',
  email: 'info@khushbupharmamachinery.com',
  address: {
    street: 'Survey No. XXX, Village XXXX',
    city: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    pincode: '38XXXX',
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

export const productCategories = [
  {
    id: 'dryers',
    name: 'Dryers',
    slug: 'dryers',
    description: 'High-efficiency drying solutions for pharmaceutical and process industries.',
    products: ['fluid-bed-dryer', 'rotocone-vacuum-dryer', 'tray-dryer', 'vacuum-tray-dryer'],
  },
  {
    id: 'granulators',
    name: 'Granulators',
    slug: 'granulators',
    description: 'Precision granulation equipment for consistent particle size distribution.',
    products: ['rapid-mixing-granulator'],
  },
  {
    id: 'blenders',
    name: 'Blenders',
    slug: 'blenders',
    description: 'Versatile blending solutions for homogeneous mixing of powders and granules.',
    products: ['octagonal-blender', 'octacone-blender', 'double-cone-blender', 'ribbon-blender'],
  },
  {
    id: 'mixers-mills',
    name: 'Mixers & Mills',
    slug: 'mixers-mills',
    description: 'High-shear mixing and size reduction equipment.',
    products: ['mass-mixer', 'multi-mill'],
  },
  {
    id: 'coating',
    name: 'Coating Equipment',
    slug: 'coating',
    description: 'Pharmaceutical coating pans for film, sugar, and enteric coating.',
    products: ['coating-pan'],
  },
  {
    id: 'vessels',
    name: 'Process Vessels',
    slug: 'vessels',
    description: 'Custom fabricated vessels for storage, manufacturing, and mixing applications.',
    products: ['storage-vessel', 'manufacturing-vessel', 'mixing-vessel'],
  },
  {
    id: 'filtration-sifting',
    name: 'Filtration & Sifting',
    slug: 'filtration-sifting',
    description: 'Filtration and sifting equipment for process separation.',
    products: ['zero-hold-up-filter', 'filter-press', 'vibro-sifter'],
  },
];

export const industries = [
  {
    id: 'pharmaceutical',
    name: 'Pharmaceutical',
    slug: 'pharmaceutical',
    description: 'GMP-compliant machinery for tablet, capsule, and oral solid dosage manufacturing.',
    products: ['fluid-bed-dryer', 'rapid-mixing-granulator', 'octagonal-blender', 'coating-pan', 'rotocone-vacuum-dryer'],
  },
  {
    id: 'nutraceutical',
    name: 'Nutraceutical',
    slug: 'nutraceutical',
    description: 'Equipment for dietary supplement and functional food manufacturing.',
    products: ['fluid-bed-dryer', 'rapid-mixing-granulator', 'mass-mixer', 'coating-pan'],
  },
  {
    id: 'chemical',
    name: 'Chemical',
    slug: 'chemical',
    description: 'Corrosion-resistant equipment for specialty and fine chemical processing.',
    products: ['rotocone-vacuum-dryer', 'filter-press', 'storage-vessel', 'mixing-vessel'],
  },
  {
    id: 'food-processing',
    name: 'Food Processing',
    slug: 'food-processing',
    description: 'Hygienic design machinery for food ingredient and additive production.',
    products: ['fluid-bed-dryer', 'ribbon-blender', 'vibro-sifter', 'storage-vessel'],
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    slug: 'cosmetics',
    description: 'Precision equipment for cosmetic and personal care product manufacturing.',
    products: ['octacone-blender', 'mass-mixer', 'mixing-vessel', 'coating-pan'],
  },
  {
    id: 'ayurvedic-herbal',
    name: 'Ayurvedic & Herbal',
    slug: 'ayurvedic-herbal',
    description: 'Traditional medicine processing equipment with gentle handling.',
    products: ['octagonal-blender', 'tray-dryer', 'vibro-sifter', 'mass-mixer'],
  },
  {
    id: 'rnd',
    name: 'Research & Development',
    slug: 'rnd',
    description: 'Lab and pilot-scale equipment for formulation development.',
    products: ['fluid-bed-dryer', 'rapid-mixing-granulator', 'octagonal-blender', 'coating-pan'],
  },
  {
    id: 'specialty-chemicals',
    name: 'Specialty Chemicals',
    slug: 'specialty-chemicals',
    description: 'Custom fabricated equipment for niche chemical applications.',
    products: ['rotocone-vacuum-dryer', 'filter-press', 'zero-hold-up-filter', 'manufacturing-vessel'],
  },
];

export const whatsappMessage = (productName?: string) => {
  const base = 'Hello Khushbu Pharma Machinery,';
  if (productName) {
    return `${base} I am interested in ${productName}. Please share technical specifications and quotation.`;
  }
  return `${base} I would like to discuss my pharmaceutical machinery requirements. Please contact me.`;
};

export const conversionCTAs = [
  { label: 'Request a Quote', href: '/quote', variant: 'primary' as const },
  { label: 'WhatsApp Us', href: `https://wa.me/${siteConfig.whatsapp}`, variant: 'whatsapp' as const, external: true },
  { label: 'Talk to an Engineer', href: '/contact', variant: 'secondary' as const },
  { label: 'Get Technical Consultation', href: '/contact', variant: 'outline' as const },
  { label: 'Send Your Requirement', href: '/quote', variant: 'primary' as const },
  { label: 'Get Product Specifications', href: '/contact', variant: 'secondary' as const },
  { label: 'Enquire on WhatsApp', href: `https://wa.me/${siteConfig.whatsapp}`, variant: 'whatsapp' as const, external: true },
];
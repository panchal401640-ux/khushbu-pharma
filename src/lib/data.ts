export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  description: string;
  applications: string[];
  relevantProducts: string[];
}

export const industriesData: IndustryData[] = [
  {
    "id": "pharmaceutical",
    "slug": "pharmaceutical",
    "name": "Pharmaceutical Industry",
    "description": "GMP-compliant process equipment for drug manufacturing, formulation, and packaging. Our solutions meet FDA and WHO standards for pharmaceutical production environments.",
    "applications": [
      "Drug Manufacturing",
      "Formulation",
      "Packaging",
      "Quality Control",
      "Research & Development"
    ],
    "relevantProducts": [
      "reactor-systems",
      "mixing-equipment",
      "drying-systems",
      "filtration-systems",
      "granulation-equipment"
    ]
  },
  {
    "id": "chemical",
    "slug": "chemical",
    "name": "Chemical Industry",
    "description": "Robust process equipment designed for chemical processing, blending, and storage. Corrosion-resistant materials and safety-first engineering for demanding chemical environments.",
    "applications": [
      "Chemical Blending",
      "Reaction Processing",
      "Storage & Transfer",
      "Distillation",
      "Solvent Recovery"
    ],
    "relevantProducts": [
      "reactor-systems",
      "storage-tanks",
      "heat-exchangers",
      "pump-systems",
      "filtration-systems"
    ]
  },
  {
    "id": "food",
    "slug": "food",
    "name": "Food & Beverage Industry",
    "description": "Food-grade stainless steel equipment for processing, mixing, and packaging. Designed for hygiene and efficiency in food production facilities.",
    "applications": [
      "Food Processing",
      "Mixing & Blending",
      "Pasteurization",
      "Packaging",
      "Quality Assurance"
    ],
    "relevantProducts": [
      "mixing-equipment",
      "heat-exchangers",
      "storage-tanks",
      "filling-machines",
      "conveyor-systems"
    ]
  },
  {
    "id": "cosmetics",
    "slug": "cosmetics",
    "name": "Cosmetics & Personal Care",
    "description": "Specialized equipment for cosmetic formulation, mixing, and filling. Precision-engineered for consistent product quality in personal care manufacturing.",
    "applications": [
      "Cream & Lotion Manufacturing",
      "Liquid Mixing",
      "Filling & Packaging",
      "Color Blending",
      "Quality Testing"
    ],
    "relevantProducts": [
      "mixing-equipment",
      "filling-machines",
      "homogenizers",
      "storage-tanks",
      "packaging-lines"
    ]
  },
  {
    "id": "specialty-chemicals",
    "slug": "specialty-chemicals",
    "name": "Specialty Chemicals",
    "description": "High-performance equipment for specialty chemical production. Custom-engineered solutions for unique process requirements and batch operations.",
    "applications": [
      "Batch Processing",
      "Custom Synthesis",
      "Precision Mixing",
      "Temperature Control",
      "Lab-Scale Production"
    ],
    "relevantProducts": [
      "reactor-systems",
      "mixing-equipment",
      "heat-exchangers",
      "filtration-systems",
      "lab-equipment"
    ]
  },
  {
    "id": "biotechnology",
    "slug": "biotechnology",
    "name": "Biotechnology Industry",
    "description": "Sterile and aseptic process equipment for biotech applications. Designed for cleanroom environments and sensitive biological processes.",
    "applications": [
      "Cell Culture",
      "Fermentation",
      "Purification",
      "Sterile Processing",
      "Research Applications"
    ],
    "relevantProducts": [
      "bioreactors",
      "fermenters",
      "filtration-systems",
      "sterilizers",
      "clean-room-equipment"
    ]
  }
];

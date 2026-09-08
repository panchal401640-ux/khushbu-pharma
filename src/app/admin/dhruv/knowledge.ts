export interface MachineryData {
  name: string;
  category: string;
  capacityRange: string;
  powerRequirements: string;
  dimensions: string;
  weight: string;
  priceRange: { standard: string; premium: string; custom: string };
  materialOptions: { ss304: string; ss316: string; ss316l: string };
  applications: string[];
  features: string[];
  gmpCompliance: string;
  maintenanceRequirements: string;
  suggestedImages: string[];
  imageKeywords: string[];
}

export interface MaterialGuide {
  grade: string;
  fullName: string;
  composition: string;
  properties: string[];
  applications: string[];
  priceMultiplier: number;
  pros: string[];
  cons: string[];
}

export interface GMPGuide {
  title: string;
  description: string;
  requirements: string[];
  standards: string[];
  documentation: string[];
}

export const MATERIAL_GUIDE: MaterialGuide[] = [
  {
    grade: 'SS304',
    fullName: 'Stainless Steel 304 (AISI 304)',
    composition: '18% Chromium, 8% Nickel, 0.08% Carbon',
    properties: [
      'Good corrosion resistance',
      'Excellent formability',
      'Non-magnetic (annealed)',
      'Operating temp: -196°C to 870°C',
      'Tensile strength: 515 MPa',
      'Density: 8.0 g/cm³',
    ],
    applications: [
      'Non-contact parts and frames',
      'Structural components',
      'External cladding',
      'General-purpose equipment',
      'Food processing (non-acidic)',
    ],
    priceMultiplier: 1.0,
    pros: [
      'Most economical option',
      'Easy to fabricate and weld',
      'Good for structural applications',
      'Wide availability',
    ],
    cons: [
      'Not ideal for acidic/corrosive environments',
      'Cannot handle chloride solutions well',
      'Not suitable for sterile pharma contact parts',
    ],
  },
  {
    grade: 'SS316',
    fullName: 'Stainless Steel 316 (AISI 316)',
    composition: '16% Chromium, 10% Nickel, 2% Molybdenum, 0.08% Carbon',
    properties: [
      'Superior corrosion resistance',
      'Good resistance to chlorides',
      'Non-magnetic (annealed)',
      'Operating temp: -196°C to 870°C',
      'Tensile strength: 515 MPa',
      'Density: 8.0 g/cm³',
    ],
    applications: [
      'Product contact parts',
      'Pharmaceutical equipment',
      'Chemical processing',
      'Food and beverage equipment',
      'Marine environments',
    ],
    priceMultiplier: 1.18,
    pros: [
      'Excellent corrosion resistance',
      'Good for pharmaceutical contact parts',
      'Handles acidic and chloride environments',
      'Industry standard for pharma equipment',
    ],
    cons: [
      '15-20% more expensive than SS304',
      'Slightly harder to machine',
      'May have micro-inclusions (carbides)',
    ],
  },
  {
    grade: 'SS316L',
    fullName: 'Stainless Steel 316L (AISI 316L)',
    composition: '16% Chromium, 10% Nickel, 2% Molybdenum, 0.03% Carbon (Low Carbon)',
    properties: [
      'Best corrosion resistance',
      'Excellent for sterile applications',
      'Low carbon prevents carbide precipitation',
      'Operating temp: -196°C to 450°C',
      'Tensile strength: 485 MPa',
      'Density: 8.0 g/cm³',
      'Superior weldability',
    ],
    applications: [
      'Sterile pharmaceutical contact parts',
      'Injectable product manufacturing',
      'Biotech and vaccine production',
      'High-purity chemical processing',
      'CIP/SIP equipment',
      'WFI systems',
    ],
    priceMultiplier: 1.32,
    pros: [
      'Best choice for pharma contact parts',
      'Excellent weldability (no post-weld treatment needed)',
      'Prevents intergranular corrosion',
      'Required for sterile/aseptic applications',
      'Meets FDA and cGMP requirements',
    ],
    cons: [
      '25-35% more expensive than SS304',
      'Overkill for non-contact parts',
      'Lower tensile strength than SS316',
    ],
  },
];

export const GMP_GUIDE: GMPGuide = {
  title: 'GMP Compliance Guide for Pharma Machinery',
  description:
    'Good Manufacturing Practice (GMP) ensures pharmaceutical products are consistently produced and controlled according to quality standards. All Khushbu Pharma Machinery equipment is designed to meet or exceed cGMP requirements.',
  requirements: [
    'Contact parts must be SS 316L or equivalent',
    'Surface finish Ra < 0.4 µm (mirror polish) for product contact surfaces',
    'No dead legs, crevices, or stagnant zones in product flow path',
    'Design must allow complete drainage and CIP/SIP capability',
    'All welds must be continuous, smooth, and free of pits or crevices',
    'Gaskets must be FDA-approved (EPDM, Silicone, or PTFE)',
    'No exposed fasteners in product contact zone',
    'Equipment must be designed to prevent cross-contamination',
    'All instruments must be calibrated and traceable',
    'Complete documentation package required (DQ, IQ, OQ, PQ)',
  ],
  standards: [
    'WHO GMP Guidelines',
    'Schedule M (India)',
    'US FDA 21 CFR Parts 210 & 211',
    'EU GMP Annex 1 (Sterile Manufacturing)',
    'PIC/S GMP Guidelines',
    'IS 14666 (Indian Standard for Pharma Equipment)',
  ],
  documentation: [
    'Design Qualification (DQ) Protocol & Report',
    'Installation Qualification (IQ) Protocol & Report',
    'Operational Qualification (OQ) Protocol & Report',
    'Performance Qualification (PQ) Protocol & Report',
    'Material Test Certificates (Mill Certificates)',
    'Welding Documentation (WPS, WPQR)',
    'Surface Finish Test Reports',
    'Equipment User Manual',
    'Spare Parts List',
    'Preventive Maintenance Schedule',
    'Cleaning Validation Protocol',
  ],
};

export const MACHINERY_KNOWLEDGE: Record<string, MachineryData> = {
  fbd: {
    name: 'Fluid Bed Dryer (FBD)',
    category: 'Dryers',
    capacityRange: '5 kg to 500 kg batch',
    powerRequirements: '5 HP to 50 HP (depending on capacity)',
    dimensions: 'L 1500-4500mm × W 1200-3500mm × H 2500-6000mm',
    weight: '500 kg to 5000 kg',
    priceRange: {
      standard: '₹5,00,000 - ₹12,00,000',
      premium: '₹12,00,000 - ₹20,00,000',
      custom: '₹20,00,000 - ₹25,00,000',
    },
    materialOptions: {
      ss304: 'Body, support frame, AHU ducting',
      ss316: 'Product container, air distributor, filter housing',
      ss316l: 'All product contact parts (recommended for sterile)',
    },
    applications: [
      'Drying of granules after wet granulation',
      'Drying of powders and pellets',
      'Pharmaceutical tablet manufacturing',
      'Chemical compound drying',
      'Nutraceutical processing',
    ],
    features: [
      'Uniform drying through fluidization',
      'Adjustable air flow and temperature',
      'Easy cleaning and maintenance',
      'GMP compliant design',
      'SS 316 contact parts',
      'Efficient filtration system',
      'PLC based controls available',
      'Automatic process interlocks',
      'Inlet air temperature control',
      'Exhaust moisture monitoring',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed as per cGMP standards for pharmaceutical manufacturing.',
    maintenanceRequirements: 'Regular filter cleaning, air handling unit maintenance, calibration of temperature sensors.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/fbd1/1200/800',
      'https://picsum.photos/seed/fbd2/1200/800',
    ],
    imageKeywords: ['industrial dryer', 'pharmaceutical equipment', 'fluid bed dryer', 'drying machine'],
  },
  rmg: {
    name: 'Rapid Mixing Granulator (RMG)',
    category: 'Granulators',
    capacityRange: '10 L to 600 L',
    powerRequirements: '3 HP to 30 HP',
    dimensions: 'L 1200-3000mm × W 800-2000mm × H 1500-3500mm',
    weight: '300 kg to 3000 kg',
    priceRange: {
      standard: '₹3,00,000 - ₹8,00,000',
      premium: '₹8,00,000 - ₹12,00,000',
      custom: '₹12,00,000 - ₹15,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Wet granulation for tablet manufacturing',
      'Mixing and granulating pharmaceutical powders',
      'Chemical compound granulation',
      'Nutraceutical granule production',
    ],
    features: [
      'High-shear mixing and granulation',
      'Uniform granule size distribution',
      'Adjustable impeller and chopper speed',
      'Easy bowl lifting/lowering mechanism',
      'GMP compliant construction',
      'SS 316L contact parts',
      'Variable frequency drive',
      'Load cell for weight monitoring',
    ],
    gmpCompliance: 'Fully GMP compliant. High-shear granulation with validated process parameters.',
    maintenanceRequirements: 'Regular inspection of impeller and chopper, seal replacement, motor maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/rmg1/1200/800',
      'https://picsum.photos/seed/rmg2/1200/800',
    ],
    imageKeywords: ['granulator', 'high shear mixer', 'pharmaceutical granulator', 'wet granulation'],
  },
  octagonal: {
    name: 'Octagonal Blender',
    category: 'Blenders',
    capacityRange: '50 L to 5000 L',
    powerRequirements: '1 HP to 15 HP',
    dimensions: 'L 1000-4000mm × W 800-3000mm × H 1200-3500mm',
    weight: '200 kg to 2500 kg',
    priceRange: {
      standard: '₹2,00,000 - ₹6,00,000',
      premium: '₹6,00,000 - ₹10,00,000',
      custom: '₹10,00,000 - ₹12,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Blending of pharmaceutical powders',
      'Mixing of granules and pellets',
      'Food ingredient blending',
      'Chemical powder mixing',
    ],
    features: [
      'Unique octagonal geometry',
      'Low shear mixing',
      'Easy to clean and maintain',
      'GMP compliant design',
      'Variable speed control',
      'Safety interlocks',
      'SAMBA powder transfer system compatible',
    ],
    gmpCompliance: 'Fully GMP compliant. Gentle mixing action preserves product integrity.',
    maintenanceRequirements: 'Regular lubrication, bearing inspection, seal replacement.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/oct1/1200/800',
      'https://picsum.photos/seed/oct2/1200/800',
    ],
    imageKeywords: ['octagonal blender', 'pharmaceutical blender', 'powder blender', 'industrial blender'],
  },
  doubleCone: {
    name: 'Double Cone Blender',
    category: 'Blenders',
    capacityRange: '50 L to 5000 L',
    powerRequirements: '1 HP to 15 HP',
    dimensions: 'L 1000-4000mm × W 800-3000mm × H 1200-3500mm',
    weight: '200 kg to 2500 kg',
    priceRange: {
      standard: '₹1,50,000 - ₹5,00,000',
      premium: '₹5,00,000 - ₹7,00,000',
      custom: '₹7,00,000 - ₹8,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Blending of dry powders',
      'Mixing of granules',
      'Gentle handling of coated tablets',
      'Pharmaceutical powder blending',
    ],
    features: [
      'Gentle blending action',
      'Double cone geometry',
      'Easy loading and discharging',
      'GMP compliant',
      'Variable speed',
      'Safety guard and interlock',
    ],
    gmpCompliance: 'Fully GMP compliant. Ideal for delicate products requiring gentle handling.',
    maintenanceRequirements: 'Regular inspection of bearings and seals, lubrication of moving parts.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/dc1/1200/800',
      'https://picsum.photos/seed/dc2/1200/800',
    ],
    imageKeywords: ['double cone blender', 'powder blender', 'pharmaceutical blender'],
  },
  vBlender: {
    name: 'V-Blender',
    category: 'Blenders',
    capacityRange: '50 L to 5000 L',
    powerRequirements: '1 HP to 15 HP',
    dimensions: 'L 1000-4000mm × W 800-3000mm × H 1200-3500mm',
    weight: '200 kg to 2500 kg',
    priceRange: {
      standard: '₹2,00,000 - ₹6,00,000',
      premium: '₹6,00,000 - ₹9,00,000',
      custom: '₹9,00,000 - ₹10,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Blending of pharmaceutical powders',
      'Mixing of granules',
      'Food ingredient blending',
      'Chemical powder mixing',
    ],
    features: [
      'V-shaped tumbling action',
      'Uniform mixing',
      'Gentle action',
      'Easy discharge',
      'GMP compliant',
      'Wedge design for efficient blending',
    ],
    gmpCompliance: 'Fully GMP compliant. Classic design for reliable powder blending.',
    maintenanceRequirements: 'Regular bearing inspection, seal replacement, lubrication.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/vb1/1200/800',
      'https://picsum.photos/seed/vb2/1200/800',
    ],
    imageKeywords: ['v-blender', 'v-shaped blender', 'pharmaceutical blender'],
  },
  ribbon: {
    name: 'Ribbon Blender',
    category: 'Blenders',
    capacityRange: '50 L to 5000 L',
    powerRequirements: '3 HP to 30 HP',
    dimensions: 'L 1200-5000mm × W 800-2000mm × H 1000-2500mm',
    weight: '300 kg to 3500 kg',
    priceRange: {
      standard: '₹3,00,000 - ₹8,00,000',
      premium: '₹8,00,000 - ₹14,00,000',
      custom: '₹14,00,000 - ₹18,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Blending of dry powders',
      'Mixing of granules',
      'Food ingredient blending',
      'Chemical mixing',
      'Paste mixing',
    ],
    features: [
      'Double helical ribbon agitator',
      'Efficient radial and axial mixing',
      'Suitable for powders and pastes',
      'GMP compliant',
      'Variable speed control',
      'Bottom discharge with butterfly valve',
      'Cantilever design for easy cleaning',
    ],
    gmpCompliance: 'Fully GMP compliant. Versatile design for various mixing applications.',
    maintenanceRequirements: 'Regular inspection of ribbon and shaft, seal replacement, motor maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/ribbon1/1200/800',
      'https://picsum.photos/seed/ribbon2/1200/800',
    ],
    imageKeywords: ['ribbon blender', 'industrial blender', 'powder mixer'],
  },
  rcvd: {
    name: 'Rotocone Vacuum Dryer (RCVD)',
    category: 'Dryers',
    capacityRange: '10 L to 500 L',
    powerRequirements: '2 HP to 20 HP',
    dimensions: 'L 1200-4000mm × W 800-2500mm × H 1500-4000mm',
    weight: '300 kg to 3000 kg',
    priceRange: {
      standard: '₹4,00,000 - ₹10,00,000',
      premium: '₹10,00,000 - ₹16,00,000',
      custom: '₹16,00,000 - ₹20,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Drying of heat-sensitive materials',
      'Drying under vacuum',
      'Pharmaceutical drying',
      'Chemical compound drying',
      'Solvent recovery',
    ],
    features: [
      'Vacuum drying capability',
      'Gentle material handling',
      'Internal screw for material movement',
      'Conical shape for complete discharge',
      'Jacketed for heating',
      'GMP compliant',
      'Vacuumtight design',
      'Optional solvent recovery system',
    ],
    gmpCompliance: 'Fully GMP compliant. Ideal for heat-sensitive and oxidation-prone materials.',
    maintenanceRequirements: 'Vacuum pump maintenance, seal inspection, jacket cleaning.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/rcvd1/1200/800',
      'https://picsum.photos/seed/rcvd2/1200/800',
    ],
    imageKeywords: ['vacuum dryer', 'rotocone dryer', 'pharmaceutical dryer'],
  },
  trayDryer: {
    name: 'Tray Dryer',
    category: 'Dryers',
    capacityRange: '12 to 96 trays',
    powerRequirements: '1 HP to 10 HP',
    dimensions: 'L 1000-3000mm × W 800-1500mm × H 1200-2000mm',
    weight: '200 kg to 1500 kg',
    priceRange: {
      standard: '₹1,00,000 - ₹3,00,000',
      premium: '₹3,00,000 - ₹4,50,000',
      custom: '₹4,50,000 - ₹5,00,000',
    },
    materialOptions: {
      ss304: 'Chamber and body',
      ss316: 'Trays optional',
      ss316l: 'Trays for sterile applications',
    },
    applications: [
      'Drying of powders and granules',
      'Drying of wet cakes',
      'Herbal and ayurvedic product drying',
      'Pharmaceutical batch drying',
    ],
    features: [
      'Multiple tray capacity',
      'Forced air circulation',
      'Temperature control',
      'Easy tray loading/unloading',
      'Economical batch drying',
      'Uniform drying across all trays',
    ],
    gmpCompliance: 'GMP compliant design. Suitable for small to medium batch drying.',
    maintenanceRequirements: 'Tray cleaning, heater inspection, air filter replacement.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/tray1/1200/800',
      'https://picsum.photos/seed/tray2/1200/800',
    ],
    imageKeywords: ['tray dryer', 'oven dryer', 'batch dryer'],
  },
  vacuumTrayDryer: {
    name: 'Vacuum Tray Dryer',
    category: 'Dryers',
    capacityRange: '12 to 48 trays',
    powerRequirements: '2 HP to 15 HP (including vacuum pump)',
    dimensions: 'L 1200-3000mm × W 1000-1800mm × H 1500-2200mm',
    weight: '400 kg to 2000 kg',
    priceRange: {
      standard: '₹3,00,000 - ₹7,00,000',
      premium: '₹7,00,000 - ₹12,00,000',
      custom: '₹12,00,000 - ₹15,00,000',
    },
    materialOptions: {
      ss304: 'Outer chamber body',
      ss316: 'Inner chamber and trays',
      ss316l: 'Inner chamber for sterile applications',
    },
    applications: [
      'Low-temperature drying of heat-sensitive materials',
      'Drying of oxidation-prone compounds',
      'Pharmaceutical vacuum drying',
      'API and intermediate drying',
    ],
    features: [
      'Vacuum operation for low-temperature drying',
      'Prevents oxidation of materials',
      'Jacketed chamber for heating',
      'Uniform drying under reduced pressure',
      'Vacuumtight door with silicone gasket',
      'SS 316 inner chamber',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for pharmaceutical vacuum drying applications.',
    maintenanceRequirements: 'Vacuum pump oil change, door gasket inspection, tray cleaning.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/vtd1/1200/800',
    ],
    imageKeywords: ['vacuum tray dryer', 'vacuum oven', 'pharmaceutical dryer'],
  },
  planetaryMixer: {
    name: 'Planetary Mixer',
    category: 'Mixers',
    capacityRange: '5 L to 500 L',
    powerRequirements: '1 HP to 15 HP',
    dimensions: 'L 800-2500mm × W 600-1500mm × H 1000-2500mm',
    weight: '100 kg to 1500 kg',
    priceRange: {
      standard: '₹2,00,000 - ₹5,00,000',
      premium: '₹5,00,000 - ₹7,00,000',
      custom: '₹7,00,000 - ₹8,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Mixing of viscous materials',
      'Cream and paste preparation',
      'Pharmaceutical ointment mixing',
      'Cosmetic product manufacturing',
    ],
    features: [
      'Planetary mixing action',
      'Multiple agitator options',
      'Variable speed control',
      'Easy bowl removal',
      'GMP compliant',
      'Vacuum mixing option',
    ],
    gmpCompliance: 'Fully GMP compliant. Ideal for viscous and semi-solid products.',
    maintenanceRequirements: 'Gear inspection, seal replacement, agitator maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/planetary1/1200/800',
    ],
    imageKeywords: ['planetary mixer', 'industrial mixer', 'cream mixer'],
  },
  massMixer: {
    name: 'Mass Mixer',
    category: 'Mixers',
    capacityRange: '10 L to 500 L',
    powerRequirements: '2 HP to 20 HP',
    dimensions: 'L 1000-2500mm × W 600-1500mm × H 1000-2000mm',
    weight: '200 kg to 2000 kg',
    priceRange: {
      standard: '₹1,50,000 - ₹4,00,000',
      premium: '₹4,00,000 - ₹6,00,000',
      custom: '₹6,00,000 - ₹8,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Mixing of viscous masses',
      'Wet granulation (small batch)',
      'Mixing of thick pastes',
      'Pharmaceutical mass mixing',
      'Cosmetic cream preparation',
    ],
    features: [
      'High-shear mixing action',
      'Suitable for viscous materials',
      'Tilting mechanism for discharge',
      'GMP compliant design',
      'Stainless steel construction',
      'Scraping blades for wall adhesion',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for high-viscosity mixing applications.',
    maintenanceRequirements: 'Blade inspection, gear check, bearing lubrication.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/mass1/1200/800',
    ],
    imageKeywords: ['mass mixer', 'high shear mixer', 'paste mixer'],
  },
  colloidMill: {
    name: 'Colloid Mill',
    category: 'Mills',
    capacityRange: '100 L/hr to 5000 L/hr',
    powerRequirements: '2 HP to 25 HP',
    dimensions: 'L 600-1500mm × W 400-800mm × H 800-1500mm',
    weight: '100 kg to 1000 kg',
    priceRange: {
      standard: '₹3,00,000 - ₹7,00,000',
      premium: '₹7,00,000 - ₹10,00,000',
      custom: '₹10,00,000 - ₹12,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Emulsification',
      'Homogenization',
      'Particle size reduction',
      'Pharmaceutical suspensions',
      'Cosmetic creams',
    ],
    features: [
      'High-shear processing',
      'Adjustable gap for fineness',
      'Continuous operation',
      'Easy cleaning',
      'GMP compliant',
      'Tungsten carbide rotor/stator option',
    ],
    gmpCompliance: 'Fully GMP compliant. Precision machining for consistent results.',
    maintenanceRequirements: 'Rotor/stator inspection, seal replacement, bearing maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/colloid1/1200/800',
    ],
    imageKeywords: ['colloid mill', 'homogenizer', 'emulsifier'],
  },
  multiMill: {
    name: 'Multi Mill',
    category: 'Mills',
    capacityRange: '100 kg/hr to 1500 kg/hr',
    powerRequirements: '2 HP to 15 HP',
    dimensions: 'L 600-1200mm × W 400-700mm × H 800-1200mm',
    weight: '80 kg to 500 kg',
    priceRange: {
      standard: '₹80,000 - ₹2,50,000',
      premium: '₹2,50,000 - ₹4,00,000',
      custom: '₹4,00,000 - ₹5,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Grinding of herbs and spices',
      'Size reduction of pharmaceutical materials',
      'Mixing and grinding',
      'Pulverizing operations',
    ],
    features: [
      'Multi-purpose operation',
      'Various screen sizes',
      'Easy screen change',
      'Stainless steel construction',
      'Dust collection provision',
      'Reversible rotor operation',
    ],
    gmpCompliance: 'GMP compliant. Suitable for pharmaceutical grinding applications.',
    maintenanceRequirements: 'Screen inspection, blade replacement, bearing maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/mill1/1200/800',
    ],
    imageKeywords: ['multi mill', 'pulverizer', 'grinding machine'],
  },
  vibroSifter: {
    name: 'Vibro Sifter',
    category: 'Filtration & Sifting',
    capacityRange: '12" to 48" diameter',
    powerRequirements: '0.5 HP to 5 HP',
    dimensions: 'Diameter 300-1200mm × H 600-1200mm',
    weight: '50 kg to 500 kg',
    priceRange: {
      standard: '₹1,50,000 - ₹4,00,000',
      premium: '₹4,00,000 - ₹5,50,000',
      custom: '₹5,50,000 - ₹6,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts optional',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Screening of pharmaceutical powders',
      'Grading of granules',
      'De-dusting of tablets',
      'Food ingredient sifting',
    ],
    features: [
      'Efficient screening',
      'Multiple deck options (single/double/triple)',
      'Various mesh sizes',
      'Dust-free operation',
      'Easy screen change',
      'Gyratory vibration motion',
    ],
    gmpCompliance: 'GMP compliant design. Easy to clean and maintain.',
    maintenanceRequirements: 'Screen inspection, spring replacement, motor maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/sifter1/1200/800',
    ],
    imageKeywords: ['vibro sifter', 'vibrating screen', 'powder sifter'],
  },
  dustExtractor: {
    name: 'Dust Extractor',
    category: 'Material Handling',
    capacityRange: '1000 CFM to 10000 CFM',
    powerRequirements: '2 HP to 20 HP',
    dimensions: 'L 800-2500mm × W 600-1500mm × H 1000-2500mm',
    weight: '100 kg to 1000 kg',
    priceRange: {
      standard: '₹2,00,000 - ₹5,00,000',
      premium: '₹5,00,000 - ₹7,00,000',
      custom: '₹7,00,000 - ₹8,00,000',
    },
    materialOptions: {
      ss304: 'Body optional',
      ss316: 'Not typically required',
      ss316l: 'Not typically required',
    },
    applications: [
      'Dust collection in manufacturing',
      'Air filtration',
      'Worker safety',
      'Clean room maintenance',
    ],
    features: [
      'High-efficiency filtration',
      'Easy filter replacement',
      'Low noise operation',
      'Compact design',
      'Multiple collection points',
      'Cartridge or bag filter options',
    ],
    gmpCompliance: 'Supports GMP compliance by maintaining clean air quality.',
    maintenanceRequirements: 'Regular filter replacement, duct cleaning, fan maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/dust1/1200/800',
    ],
    imageKeywords: ['dust collector', 'dust extractor', 'air filtration'],
  },
  liftingEquipment: {
    name: 'Lifting & Transferring Equipment',
    category: 'Material Handling',
    capacityRange: '50 kg to 500 kg',
    powerRequirements: '1 HP to 10 HP',
    dimensions: 'Custom designed',
    weight: '100 kg to 1000 kg',
    priceRange: {
      standard: '₹1,00,000 - ₹3,00,000',
      premium: '₹3,00,000 - ₹4,50,000',
      custom: '₹4,50,000 - ₹5,00,000',
    },
    materialOptions: {
      ss304: 'Frame and contact parts',
      ss316: 'Contact parts for sterile applications',
      ss316l: 'Contact parts for injectable products',
    },
    applications: [
      'Material transfer between processes',
      'Lifting of containers',
      'IBC bin handling',
      'Dust-free powder transfer',
    ],
    features: [
      'Hydraulic lifting',
      'Safety interlocks',
      'Easy operation',
      'GMP compliant',
      'Various configurations',
      'Column-mounted or mobile options',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for safe and efficient material handling.',
    maintenanceRequirements: 'Hydraulic system maintenance, safety device inspection.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/lift1/1200/800',
    ],
    imageKeywords: ['lifting equipment', 'material handling', 'IBC bin'],
  },
  ssVessels: {
    name: 'SS Vessels & Tanks',
    category: 'Process Vessels',
    capacityRange: '50 L to 10000 L',
    powerRequirements: 'N/A (static vessels)',
    dimensions: 'Custom fabricated',
    weight: '50 kg to 5000 kg',
    priceRange: {
      standard: '₹1,00,000 - ₹5,00,000',
      premium: '₹5,00,000 - ₹10,00,000',
      custom: '₹10,00,000 - ₹15,00,000',
    },
    materialOptions: {
      ss304: 'Standard construction',
      ss316: 'For corrosive applications',
      ss316l: 'For sterile and pharmaceutical applications',
    },
    applications: [
      'Storage of raw materials',
      'Mixing and blending',
      'Reaction vessels',
      'Storage of finished products',
    ],
    features: [
      'Custom fabrication',
      'Various capacities',
      'With/without agitation',
      'Jacketed options',
      'GMP design',
      'Level indicators',
      'Multiple nozzle configurations',
    ],
    gmpCompliance: 'Fully GMP compliant. Custom designed to meet specific process requirements.',
    maintenanceRequirements: 'Regular cleaning, inspection of welds and surfaces.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/vessel1/1200/800',
    ],
    imageKeywords: ['storage tank', 'ss vessel', 'process vessel', 'reactor'],
  },
  tabletPress: {
    name: 'Tablet Press Machine',
    category: 'Tableting',
    capacityRange: '6000 to 200000 tablets/hr',
    powerRequirements: '3 HP to 15 HP',
    dimensions: 'L 1000-2500mm × W 800-1500mm × H 1500-2500mm',
    weight: '500 kg to 3000 kg',
    priceRange: {
      standard: '₹5,00,000 - ₹15,00,000',
      premium: '₹15,00,000 - ₹35,00,000',
      custom: '₹35,00,000 - ₹75,00,000',
    },
    materialOptions: {
      ss304: 'Frame and body',
      ss316: 'Tooling optional',
      ss316l: 'Not typically required',
    },
    applications: [
      'Tablet compression',
      'Pharmaceutical tableting',
      'Nutraceutical tablet production',
      'Research and development',
    ],
    features: [
      'High-speed compression',
      'Pre-compression and main compression',
      'Auto tablet rejection',
      'Force monitoring',
      'Easy tooling change',
      'Turret speeds up to 60 RPM',
      'D tooling and B tooling options',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for high-speed pharmaceutical tableting.',
    maintenanceRequirements: 'Regular tooling inspection, turret maintenance, grease scheduling.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/tablet1/1200/800',
    ],
    imageKeywords: ['tablet press', 'tablet compression', 'pill press'],
  },
  capsuleFilling: {
    name: 'Capsule Filling Machine',
    category: 'Encapsulating',
    capacityRange: '2000 to 150000 capsules/hr',
    powerRequirements: '2 HP to 10 HP',
    dimensions: 'L 800-2500mm × W 600-1500mm × H 1000-2000mm',
    weight: '300 kg to 2000 kg',
    priceRange: {
      standard: '₹4,00,000 - ₹12,00,000',
      premium: '₹12,00,000 - ₹25,00,000',
      custom: '₹25,00,000 - ₹50,00,000',
    },
    materialOptions: {
      ss304: 'Frame and body',
      ss316: 'Product contact parts optional',
      ss316l: 'Product contact parts for sterile',
    },
    applications: [
      'Capsule filling',
      'Pharmaceutical encapsulation',
      'Nutraceutical capsule production',
      'Research and development',
    ],
    features: [
      'Automatic capsule orientation',
      'Precise dosing',
      'Empty capsule rejection',
      'Easy cleaning',
      'Various capsule sizes (00 to 5)',
      'Dosator or tamping pin dosing',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for accurate and efficient capsule filling.',
    maintenanceRequirements: 'Regular dosing disc inspection, tamping station maintenance.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/capsule1/1200/800',
    ],
    imageKeywords: ['capsule filling', 'capsule machine', 'encapsulation'],
  },
  coatingPan: {
    name: 'Coating Pan',
    category: 'Coating Equipment',
    capacityRange: '12" to 60" diameter',
    powerRequirements: '1 HP to 10 HP',
    dimensions: 'L 800-2500mm × W 600-1500mm × H 800-1800mm',
    weight: '100 kg to 1500 kg',
    priceRange: {
      standard: '₹1,50,000 - ₹4,00,000',
      premium: '₹4,00,000 - ₹7,00,000',
      custom: '₹7,00,000 - ₹10,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Pan interior',
      ss316l: 'Pan interior for sterile applications',
    },
    applications: [
      'Film coating of tablets',
      'Sugar coating of tablets',
      'Enteric coating',
      'Pellet coating',
      'Color coating',
    ],
    features: [
      'Uniform coating',
      'Adjustable pan speed',
      'Spray gun provision',
      'Heating option',
      'Various pan sizes',
      'GMP compliant',
      'Perforated pan design available',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for uniform and efficient tablet coating.',
    maintenanceRequirements: 'Pan interior cleaning, spray gun maintenance, drive system inspection.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/coating1/1200/800',
    ],
    imageKeywords: ['coating pan', 'tablet coating', 'pharmaceutical coating'],
  },
  cipSip: {
    name: 'CIP/SIP Systems',
    category: 'Utility Systems',
    capacityRange: 'Custom designed',
    powerRequirements: '5 HP to 30 HP',
    dimensions: 'Custom designed',
    weight: '500 kg to 3000 kg',
    priceRange: {
      standard: '₹10,00,000 - ₹25,00,000',
      premium: '₹25,00,000 - ₹45,00,000',
      custom: '₹45,00,000 - ₹75,00,000',
    },
    materialOptions: {
      ss304: 'Piping and frame',
      ss316: 'Product contact surfaces',
      ss316l: 'Critical product contact surfaces',
    },
    applications: [
      'Equipment cleaning validation',
      'Sterilization of process equipment',
      'Pharmaceutical manufacturing',
      'Biotech applications',
    ],
    features: [
      'Automated cleaning cycles',
      'Temperature monitoring',
      'Conductivity verification',
      'Recipe management',
      'Validation documentation',
      'Multi-tank system',
    ],
    gmpCompliance: 'Fully GMP compliant. Validated cleaning and sterilization cycles.',
    maintenanceRequirements: 'Regular calibration, valve maintenance, spray ball inspection.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/cip1/1200/800',
    ],
    imageKeywords: ['CIP system', 'SIP system', 'cleaning in place'],
  },
  wfiSystem: {
    name: 'Water For Injection (WFI) System',
    category: 'Utility Systems',
    capacityRange: '50 L/hr to 5000 L/hr',
    powerRequirements: '5 HP to 50 HP',
    dimensions: 'Custom designed (skid mounted)',
    weight: '500 kg to 5000 kg',
    priceRange: {
      standard: '₹15,00,000 - ₹35,00,000',
      premium: '₹35,00,000 - ₹60,00,000',
      custom: '₹60,00,000 - ₹1,00,00,000',
    },
    materialOptions: {
      ss304: 'Not typically used',
      ss316: 'System components',
      ss316l: 'All product contact surfaces',
    },
    applications: [
      'Pharmaceutical water production',
      'Injectable product manufacturing',
      'Clean utility supply',
      'CIP system supply',
    ],
    features: [
      'Multi-stage purification',
      'Continuous monitoring',
      'GMP compliant design',
      'Validation support',
      'SCADA integration',
      'USP/EP/JP compliant',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed as per USP/EP/JP pharmacopeia standards.',
    maintenanceRequirements: 'Regular sanitization, membrane replacement, conductivity monitoring.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/wfi1/1200/800',
    ],
    imageKeywords: ['WFI system', 'water purification', 'pharmaceutical water'],
  },
  filterPress: {
    name: 'Filter Press',
    category: 'Filtration & Sifting',
    capacityRange: '10 L to 500 L (cake volume)',
    powerRequirements: '2 HP to 15 HP',
    dimensions: 'L 1000-4000mm × W 600-1500mm × H 800-2000mm',
    weight: '200 kg to 3000 kg',
    priceRange: {
      standard: '₹2,00,000 - ₹6,00,000',
      premium: '₹6,00,000 - ₹10,00,000',
      custom: '₹10,00,000 - ₹14,00,000',
    },
    materialOptions: {
      ss304: 'Frame and plates optional',
      ss316: 'Plates for corrosive applications',
      ss316l: 'Not typically required',
    },
    applications: [
      'Solid-liquid separation',
      'Pharmaceutical filtration',
      'Chemical slurry filtration',
      'Mother liquor separation',
      'Waste water treatment',
    ],
    features: [
      'Efficient solid-liquid separation',
      'Various plate sizes',
      'Hydraulic closing option',
      'Filter cloth options',
      'Easy cake discharge',
      'Polypropylene or SS plates',
    ],
    gmpCompliance: 'GMP compliant design for pharmaceutical filtration.',
    maintenanceRequirements: 'Filter cloth replacement, plate inspection, hydraulic system check.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/filter1/1200/800',
    ],
    imageKeywords: ['filter press', 'filtration', 'solid liquid separation'],
  },
  zeroHoldUpFilter: {
    name: 'Zero Hold Up Filter',
    category: 'Filtration & Sifting',
    capacityRange: '100 L/hr to 5000 L/hr',
    powerRequirements: 'N/A (gravity/pressure fed)',
    dimensions: 'D 300-800mm × H 500-1200mm',
    weight: '30 kg to 300 kg',
    priceRange: {
      standard: '₹80,000 - ₹2,50,000',
      premium: '₹2,50,000 - ₹4,00,000',
      custom: '₹4,00,000 - ₹5,00,000',
    },
    materialOptions: {
      ss304: 'Body and frame',
      ss316: 'Contact parts standard',
      ss316l: 'Contact parts for sterile applications',
    },
    applications: [
      'Filtration of pharmaceutical liquids',
      'Clarification of solutions',
      'Product filtration with zero loss',
      'Chemical filtration',
    ],
    features: [
      'Zero product retention',
      'Easy filter media change',
      'SS 316 contact parts',
      'Various filter media options',
      'GMP design',
      'Sieve bend or candle type',
    ],
    gmpCompliance: 'Fully GMP compliant. Ideal for valuable product filtration.',
    maintenanceRequirements: 'Filter media replacement, gasket inspection.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/zhf1/1200/800',
    ],
    imageKeywords: ['zero hold up filter', 'pharmaceutical filter', 'liquid filter'],
  },
  autoclave: {
    name: 'Autoclave / Sterilizer',
    category: 'Sterilization Equipment',
    capacityRange: '50 L to 5000 L',
    powerRequirements: '3 HP to 30 HP (electric/steam)',
    dimensions: 'L 1000-4000mm × W 800-2000mm × H 1200-2500mm',
    weight: '300 kg to 3000 kg',
    priceRange: {
      standard: '₹2,50,000 - ₹8,00,000',
      premium: '₹8,00,000 - ₹15,00,000',
      custom: '₹15,00,000 - ₹25,00,000',
    },
    materialOptions: {
      ss304: 'Outer chamber body',
      ss316: 'Inner chamber and jacket',
      ss316l: 'Inner chamber for sterile products',
    },
    applications: [
      'Sterilization of equipment and components',
      'Sterilization of glassware',
      'Media sterilization',
      'Waste sterilization',
    ],
    features: [
      'Steam sterilization (autoclaving)',
      'Programmable sterilization cycles',
      'Temperature and pressure recording',
      'Door interlocks',
      'SS 316L inner chamber',
      'Jet steam sterilization option',
    ],
    gmpCompliance: 'Fully GMP compliant. Designed for pharmaceutical sterilization.',
    maintenanceRequirements: 'Door gasket inspection, pressure gauge calibration, drain cleaning.',
    suggestedImages: [
      'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=1200&h=800&fit=crop',
      'https://picsum.photos/seed/autoclave1/1200/800',
    ],
    imageKeywords: ['autoclave', 'sterilizer', 'steam sterilizer'],
  },
};

export function generateImageSuggestions(key: string, machine: MachineryData): string[] {
  return machine.suggestedImages;
}

export function getMaterialComparison(): string {
  let response = `**SS304 vs SS316 vs SS316L - Complete Comparison**\n\n`;
  for (const m of MATERIAL_GUIDE) {
    response += `**${m.grade} (${m.fullName})**\n`;
    response += `Composition: ${m.composition}\n`;
    response += `Price Factor: ${m.priceMultiplier}x base\n`;
    response += `Properties:\n`;
    m.properties.forEach((p) => (response += `  - ${p}\n`));
    response += `Best For:\n`;
    m.applications.forEach((a) => (response += `  - ${a}\n`));
    response += `\n`;
  }
  response += `**Recommendation:**\n`;
  response += `- Non-contact parts/frame → SS304 (economical)\n`;
  response += `- Product contact parts → SS316 (standard pharma)\n`;
  response += `- Sterile/injectable → SS316L (required)\n`;
  return response;
}

export function getGMPInfo(): string {
  let response = `**GMP Compliance Guide**\n\n`;
  response += `${GMP_GUIDE.description}\n\n`;
  response += `**Key Requirements:**\n`;
  GMP_GUIDE.requirements.forEach((r) => (response += `- ${r}\n`));
  response += `\n**Applicable Standards:**\n`;
  GMP_GUIDE.standards.forEach((s) => (response += `- ${s}\n`));
  response += `\n**Documentation Required:**\n`;
  GMP_GUIDE.documentation.forEach((d) => (response += `- ${d}\n`));
  return response;
}

export function getCostBreakdown(key: string, options: { material: string; automation: string; capacity: string }): string {
  const machine = MACHINERY_KNOWLEDGE[key];
  if (!machine) return '';

  const base = key === 'trayDryer' ? 100000 : key === 'dustExtractor' ? 200000 : 250000;
  let materialMult = 1.0;
  if (options.material === 'ss316') materialMult = 1.18;
  if (options.material === 'ss316l') materialMult = 1.32;

  let autoMult = 1.0;
  if (options.automation === 'semi') autoMult = 1.2;
  if (options.automation === 'full') autoMult = 1.55;

  const estimatedCost = Math.round(base * materialMult * autoMult);

  let breakdown = `**Cost Breakdown for ${machine.name}**\n\n`;
  breakdown += `**Base Price:** ${formatCurrency(base)}\n`;
  breakdown += `**Material (${options.material.toUpperCase()}):** ×${materialMult}\n`;
  breakdown += `**Automation (${options.automation}):** ×${autoMult}\n`;
  breakdown += `**Estimated Total:** ${formatCurrency(estimatedCost)}\n\n`;
  breakdown += `**Price Range:** ${machine.priceRange.standard}\n`;
  breakdown += `**Premium Range:** ${machine.priceRange.premium}\n\n`;
  breakdown += `*Note: Actual prices depend on exact specifications, quantity, and market conditions.*`;
  return breakdown;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const MACHINE_CATEGORIES = [
  'Dryers',
  'Granulators',
  'Blenders',
  'Mixers',
  'Mills',
  'Filtration & Sifting',
  'Material Handling',
  'Process Vessels',
  'Tableting',
  'Encapsulating',
  'Coating Equipment',
  'Utility Systems',
  'Sterilization Equipment',
];

export const AUTOMATION_LEVELS = [
  { value: 'manual', label: 'Manual', multiplier: 1.0 },
  { value: 'semi', label: 'Semi-Auto', multiplier: 1.2 },
  { value: 'full', label: 'Fully Auto', multiplier: 1.55 },
];

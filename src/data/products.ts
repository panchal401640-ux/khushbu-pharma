import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "fluid-bed-dryer",
    name: "Fluid Bed Dryer",
    category: "Drying Equipment",
    shortDescription: "Efficient fluid bed drying system for pharmaceutical granules and powders with uniform drying and excellent process control.",
    description: "The Fluid Bed Dryer (FBD) is designed for efficient drying of pharmaceutical granules, powders, and other materials. The system works by passing heated air through a perforated bed, causing the material to fluidize and ensuring uniform drying. Our FBD is engineered for consistent performance, easy cleaning, and compliance with pharmaceutical processing requirements. Available in multiple capacities and configurations to suit different production scales.",
    applications: [
      "Pharmaceutical granule drying",
      "Powder drying",
      "Tablet manufacturing pre-processing",
      "API drying",
      "Nutraceutical processing",
      "Chemical drying"
    ],
    capacity: "Available in multiple capacities (12 kg to 600 kg batch sizes)",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L as required",
    contactParts: "SS 316 / SS 316L (product contact surfaces)",
    nonContactParts: "SS 304",
    power: "As per machine capacity and configuration",
    dimensions: "As per machine capacity and configuration",
    workingVolume: "As per requirement",
    operatingTemperature: "As per process requirement",
    operatingPressure: "Atmospheric / As specified",
    finish: "Mirror polish / Matte finish as required",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based as required",
    features: [
      "Uniform drying through fluidization",
      "Adjustable air flow and temperature",
      "Easy cleaning and maintenance",
      "SS 316 / SS 316L contact parts available",
      "Available in multiple batch capacities",
      "Spray granulation option available",
      "Dust collection system integration",
      "Custom configurations available"
    ],
    industries: [
      "Pharmaceutical",
      "Nutraceutical",
      "Chemical",
      "Food Processing"
    ],
    images: ["/images/products/fbd-1.jpg", "/images/products/fbd-2.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Fluid Bed Dryer" },
      { parameter: "Capacity", specification: "12 kg to 600 kg batch" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Non-Contact Parts", specification: "SS 304" },
      { parameter: "Surface Finish", specification: "Mirror polish / Matte as required" },
      { parameter: "Temperature Control", specification: "As per process requirement" },
      { parameter: "Air Flow System", specification: "Adjustable" },
      { parameter: "Controls", specification: "Manual / PLC based" },
      { parameter: "Power", specification: "As per capacity" },
      { parameter: "Dust Collection", specification: "Available" },
      { parameter: "Cleaning System", specification: "Easy clean design" }
    ],
    faq: [
      { question: "What is a Fluid Bed Dryer used for?", answer: "A Fluid Bed Dryer is used for drying pharmaceutical granules, powders, and other materials by passing heated air through the material bed, causing fluidization for uniform drying." },
      { question: "What capacities are available?", answer: "Our Fluid Bed Dryers are available in batch capacities ranging from 12 kg to 600 kg. Custom capacities can be provided as per requirement." },
      { question: "What materials are used?", answer: "Standard construction uses SS 304 for non-contact parts and SS 316 / SS 316L for product contact surfaces. Other materials are available on request." }
    ],
    seoTitle: "Fluid Bed Dryer | Pharmaceutical Drying Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Fluid Bed Dryer for pharmaceutical granule and powder drying. Available in 12 kg to 600 kg batch capacities with SS 304 / SS 316 construction."
  },
  {
    id: "2",
    slug: "rapid-mixing-granulator",
    name: "Rapid Mixing Granulator",
    category: "Granulation Equipment",
    shortDescription: "High-speed rapid mixing granulator for pharmaceutical wet granulation with efficient binder distribution and granule formation.",
    description: "The Rapid Mixing Granulator (RMG) is designed for wet granulation processes in pharmaceutical manufacturing. It combines rapid mixing with granulation in a single unit, ensuring efficient binder distribution and uniform granule formation. The machine features a specially designed impeller and chopper for effective mixing and granulation. Available in various capacities to suit different production requirements.",
    applications: [
      "Pharmaceutical wet granulation",
      "Tablet manufacturing",
      "Powder mixing and granulation",
      "API granulation",
      "Nutraceutical processing"
    ],
    capacity: "Available in multiple capacities",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient / As required",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based",
    features: [
      "High-speed impeller for rapid mixing",
      "Serrated chopper for granule formation",
      "Efficient binder distribution",
      "Easy bowl removal for cleaning",
      "SS 316 contact parts",
      "Variable speed options available",
      "Lid with charging port",
      "Discharge with butterfly valve"
    ],
    industries: ["Pharmaceutical", "Nutraceutical", "Chemical"],
    images: ["/images/products/rmg-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Rapid Mixing Granulator" },
      { parameter: "Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Impeller", specification: "High-speed design" },
      { parameter: "Chopper", specification: "Serrated blade" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" },
      { parameter: "Discharge", specification: "Butterfly valve" }
    ],
    faq: [
      { question: "What is a Rapid Mixing Granulator?", answer: "An RMG combines mixing and granulation in a single unit. It uses a high-speed impeller for mixing and a chopper for granulation, commonly used in pharmaceutical tablet manufacturing." },
      { question: "What are the available configurations?", answer: "Available with manual or PLC controls, various capacity options, and different material configurations based on process requirements." }
    ],
    seoTitle: "Rapid Mixing Granulator | RMG Manufacturer | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Rapid Mixing Granulator (RMG) for pharmaceutical wet granulation. SS 316 contact parts, multiple capacity options available."
  },
  {
    id: "3",
    slug: "octagonal-blender",
    name: "Octagonal Blender",
    category: "Blending Equipment",
    shortDescription: "Precision octagonal blender for pharmaceutical powder blending with efficient mixing and minimal material handling.",
    description: "The Octagonal Blender is designed for efficient blending of pharmaceutical powders and granules. Its unique octagonal shape provides excellent mixing action through a combination of diffusion and convective mixing. The blender ensures uniform blend with minimal product degradation and is suitable for large batch blending operations. Available in various working capacities with options for PLC controls and data logging.",
    applications: [
      "Pharmaceutical powder blending",
      "Granule blending",
      "API and excipient mixing",
      "Pre-compression blending",
      "Bulk drug manufacturing"
    ],
    capacity: "Available in multiple working volumes",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based",
    features: [
      "Unique octagonal shape for effective blending",
      "Contamination-free operation",
      "Easy cleaning and maintenance",
      "SS 316 contact parts",
      "Optional PLC with data logging",
      "Safety interlocks",
      "Variable speed drive available",
      "Custom capacity options"
    ],
    industries: ["Pharmaceutical", "Nutraceutical", "Chemical"],
    images: ["/images/products/octagonal-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Octagonal Blender" },
      { parameter: "Working Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Shape", specification: "Octagonal" },
      { parameter: "Rotation", specification: "Through gear / Chain drive" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" },
      { parameter: "Speed", specification: "As per blending requirement" }
    ],
    faq: [
      { question: "Why choose an Octagonal Blender?", answer: "The octagonal shape provides a unique blending action that combines diffusion and convective mixing, resulting in uniform blends with minimal product degradation." },
      { question: "What capacities are available?", answer: "We offer octagonal blenders in various working capacities. Contact our team for specific capacity requirements." }
    ],
    seoTitle: "Octagonal Blender | Pharmaceutical Blender Manufacturer | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Octagonal Blender for pharmaceutical powder blending. SS 316 contact parts, PLC options, multiple capacities available."
  },
  {
    id: "4",
    slug: "octacone-blender",
    name: "Octacone Blender",
    category: "Blending Equipment",
    shortDescription: "High-efficiency Octacone blender combining octagonal and conical design for superior pharmaceutical powder blending.",
    description: "The Octacone Blender combines the features of octagonal and double cone blenders to provide superior mixing performance. The unique geometry ensures efficient blending with minimal dead zones, making it ideal for pharmaceutical powder and granule applications. The design allows for complete discharge and easy cleaning.",
    applications: [
      "Pharmaceutical powder blending",
      "Granule mixing",
      "API blending",
      "Small to medium batch operations"
    ],
    capacity: "Available in multiple working volumes",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based",
    features: [
      "Combined octagonal-conical geometry",
      "Uniform blending with minimal dead zones",
      "Complete discharge capability",
      "Easy cleaning design",
      "SS 316 contact parts",
      "Customizable capacity"
    ],
    industries: ["Pharmaceutical", "Nutraceutical"],
    images: ["/images/products/octacone-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Octacone Blender" },
      { parameter: "Working Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Geometry", specification: "Octagonal-conical combination" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" }
    ],
    faq: [
      { question: "How does an Octacone Blender differ?", answer: "It combines octagonal and conical geometries to provide uniform blending with minimal dead zones, ensuring complete discharge and easy cleaning." }
    ],
    seoTitle: "Octacone Blender | Pharmaceutical Blender | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Octacone Blender for pharmaceutical blending applications. Combined octagonal-conical design for superior mixing performance."
  },
  {
    id: "5",
    slug: "double-cone-blender",
    name: "Double Cone Blender",
    category: "Blending Equipment",
    shortDescription: "Reliable double cone blender for pharmaceutical powder and granule blending with gentle mixing action.",
    description: "The Double Cone Blender is a versatile blending machine used extensively in pharmaceutical manufacturing for mixing powders and granules. The simple yet effective design provides a gentle tumbling action that ensures uniform blending without excessive shear. The blender is easy to clean and maintain, making it suitable for batch-to-batch operations.",
    applications: [
      "Pharmaceutical powder blending",
      "Granule mixing",
      "API blending",
      "Small batch operations"
    ],
    capacity: "Available in multiple working volumes",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based",
    features: [
      "Gentle tumbling blending action",
      "Easy to clean and maintain",
      "Complete discharge capability",
      "SS 316 contact parts",
      "Simple and reliable design",
      "Variable speed available"
    ],
    industries: ["Pharmaceutical", "Nutraceutical", "Chemical"],
    images: ["/images/products/double-cone-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Double Cone Blender" },
      { parameter: "Working Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Rotation Axis", specification: "Central" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" }
    ],
    faq: [
      { question: "What is a Double Cone Blender used for?", answer: "It is used for blending pharmaceutical powders and granules through a gentle tumbling action, ensuring uniform mixing with minimal product degradation." },
      { question: "Is it easy to clean?", answer: "Yes, the simple design of the double cone blender allows for easy cleaning and maintenance, making it suitable for batch-to-batch operations." }
    ],
    seoTitle: "Double Cone Blender | Pharmaceutical Blender | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Double Cone Blender for pharmaceutical powder blending. Gentle tumbling action, SS 316 contact parts, multiple capacities."
  },
  {
    id: "6",
    slug: "mass-mixer",
    name: "Mass Mixer",
    category: "Mixing Equipment",
    shortDescription: "Robust mass mixer for pharmaceutical paste and powder mixing with heavy-duty construction for demanding applications.",
    description: "The Mass Mixer is designed for mixing pharmaceutical pastes, powders, and wet masses. It features heavy-duty Z-shaped blades that provide effective mixing action for viscous materials. The machine is widely used in tablet manufacturing for preparing wet granulation masses. Available in various capacities with options for jacketed vessels for temperature control.",
    applications: [
      "Pharmaceutical paste mixing",
      "Wet granulation mass preparation",
      "Heavy-duty powder mixing",
      "Tablet manufacturing",
      "Ointment and cream preparation"
    ],
    capacity: "Available in multiple capacities",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient / Heated",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "Heavy-duty",
    controls: "Manual / PLC based",
    features: [
      "Heavy-duty Z-shaped mixing blades",
      "Suitable for viscous materials",
      "Jacketed vessel option for heating/cooling",
      "SS 316 contact parts",
      "Manual tilting or discharge valve",
      "Robust construction",
      "Easy cleaning"
    ],
    industries: ["Pharmaceutical", "Chemical", "Cosmetics"],
    images: ["/images/products/mass-mixer-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Mass Mixer" },
      { parameter: "Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Blade Type", specification: "Z-shaped" },
      { parameter: "Jacket", specification: "Optional (heating/cooling)" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" }
    ],
    faq: [
      { question: "What is a Mass Mixer used for?", answer: "A Mass Mixer is used for mixing pharmaceutical pastes, powders, and wet masses, particularly for preparing wet granulation masses in tablet manufacturing." },
      { question: "Can it handle viscous materials?", answer: "Yes, the heavy-duty Z-shaped blades are specifically designed for effective mixing of viscous and heavy materials." }
    ],
    seoTitle: "Mass Mixer | Pharmaceutical Mixer | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Mass Mixer for pharmaceutical paste and wet mass mixing. Heavy-duty Z-shaped blades, SS 316 contact parts, jacketed options."
  },
  {
    id: "7",
    slug: "ribbon-blender",
    name: "Ribbon Blender",
    category: "Mixing Equipment",
    shortDescription: "Efficient ribbon blender for pharmaceutical and chemical powder blending with double helical ribbon agitator.",
    description: "The Ribbon Blender features a double helical ribbon agitator that provides efficient blending of dry powders, granules, and pastes. The outer ribbon moves material in one direction while the inner ribbon moves it in the opposite direction, creating a thorough mixing action. Widely used in pharmaceutical, chemical, and food industries.",
    applications: [
      "Pharmaceutical powder blending",
      "Chemical mixing",
      "Food ingredient mixing",
      "Dry powder blending",
      "Paste mixing"
    ],
    capacity: "Available in multiple working volumes",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Ambient / Heated / Cooled",
    operatingPressure: "Atmospheric / Vacuum",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "Heavy-duty",
    controls: "Manual / PLC based",
    features: [
      "Double helical ribbon agitator",
      "Efficient forward and reverse mixing",
      "Jacketed vessel for heating/cooling",
      "Vacuum capability available",
      "SS 316 contact parts",
      "Multiple discharge options",
      "Large batch processing"
    ],
    industries: ["Pharmaceutical", "Chemical", "Food Processing"],
    images: ["/images/products/ribbon-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Ribbon Blender" },
      { parameter: "Working Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Agitator", specification: "Double helical ribbon" },
      { parameter: "Jacket", specification: "Optional (heating/cooling)" },
      { parameter: "Vacuum", specification: "Optional" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" }
    ],
    faq: [
      { question: "How does a Ribbon Blender work?", answer: "The double helical ribbon agitator moves material in two opposing directions, creating a thorough mixing action suitable for powders, granules, and pastes." },
      { question: "Can it be jacketed for temperature control?", answer: "Yes, jacketed vessels are available for heating or cooling applications. Vacuum configurations are also available." }
    ],
    seoTitle: "Ribbon Blender | Pharmaceutical Mixer | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Ribbon Blender with double helical ribbon agitator. SS 316 contact parts, jacketed and vacuum options available."
  },
  {
    id: "8",
    slug: "rotocone-vacuum-dryer",
    name: "Rotocone Vacuum Dryer",
    category: "Drying Equipment",
    shortDescription: "Specialized rotocone vacuum dryer for heat-sensitive pharmaceutical materials with gentle drying under vacuum.",
    description: "The Rotocone Vacuum Dryer is designed for drying heat-sensitive pharmaceutical materials under vacuum conditions. The conical shape with internal agitator ensures gentle handling and uniform drying. Vacuum operation allows drying at lower temperatures, protecting thermolabile products. The closed system prevents contamination and allows solvent recovery.",
    applications: [
      "Heat-sensitive material drying",
      "API drying",
      "Solvent recovery",
      "Pharmaceutical powder drying",
      "Specialty chemical drying"
    ],
    capacity: "Available in multiple capacities",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Low temperature (vacuum drying)",
    operatingPressure: "Vacuum",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / PLC based",
    features: [
      "Vacuum drying for heat-sensitive materials",
      "Conical shape with internal agitator",
      "Solvent recovery capability",
      "Closed system operation",
      "SS 316 contact parts",
      "Gentle material handling",
      "Easy discharge"
    ],
    industries: ["Pharmaceutical", "Chemical", "Nutraceutical"],
    images: ["/images/products/rcvd-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Rotocone Vacuum Dryer" },
      { parameter: "Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Operating Pressure", specification: "Vacuum" },
      { parameter: "Agitator", specification: "Internal conical" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Controls", specification: "Manual / PLC based" }
    ],
    faq: [
      { question: "Why use vacuum drying?", answer: "Vacuum drying allows processing at lower temperatures, making it ideal for heat-sensitive pharmaceutical materials that may degrade at atmospheric drying temperatures." },
      { question: "Can solvents be recovered?", answer: "Yes, the closed system design allows for solvent recovery during the drying process." }
    ],
    seoTitle: "Rotocone Vacuum Dryer | Vacuum Drying Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Rotocone Vacuum Dryer for heat-sensitive pharmaceutical materials. Vacuum drying, solvent recovery, SS 316 contact parts."
  },
  {
    id: "9",
    slug: "tray-dryer",
    name: "Tray Dryer",
    category: "Drying Equipment",
    shortDescription: "Reliable tray dryer for pharmaceutical drying applications with even heat distribution and multiple tray configurations.",
    description: "The Tray Dryer is a conventional drying system used for drying pharmaceutical products, granules, and materials on trays. Hot air circulates through the drying chamber, providing uniform drying. Available in various sizes with multiple tray options. Simple to operate and maintain, making it suitable for a wide range of drying applications.",
    applications: [
      "Pharmaceutical product drying",
      "Granule drying",
      "API drying",
      "Herbal product drying",
      "Laboratory drying"
    ],
    capacity: "Available in multiple tray configurations",
    materialOfConstruction: "SS 304 / SS 316",
    contactParts: "SS 316 as required",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Up to 200°C (as required)",
    operatingPressure: "Atmospheric",
    finish: "Standard / Mirror polish as required",
    motor: "As per capacity",
    gearbox: "N/A",
    controls: "Manual / Digital temperature control",
    features: [
      "Even hot air circulation",
      "Multiple tray configurations",
      "Adjustable temperature control",
      "Easy tray loading and unloading",
      "SS 304 / SS 316 construction",
      "Energy efficient heating",
      "Simple operation"
    ],
    industries: ["Pharmaceutical", "Chemical", "Food Processing", "Herbal"],
    images: ["/images/products/tray-dryer-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Tray Dryer" },
      { parameter: "Tray Capacity", specification: "As per configuration" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316" },
      { parameter: "Temperature Range", specification: "Up to 200°C" },
      { parameter: "Air Circulation", specification: "Forced convection" },
      { parameter: "Heating", specification: "Electric / Steam" },
      { parameter: "Controls", specification: "Manual / Digital" },
      { parameter: "Trays", specification: "SS 304 / SS 316" }
    ],
    faq: [
      { question: "What is a Tray Dryer used for?", answer: "A Tray Dryer is used for drying pharmaceutical products, granules, and materials by circulating hot air through a drying chamber containing multiple trays." },
      { question: "What are the heating options?", answer: "Tray dryers are available with electric or steam heating options, with digital temperature control for precise drying." }
    ],
    seoTitle: "Tray Dryer | Pharmaceutical Drying Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Tray Dryer for pharmaceutical drying applications. Multiple tray configurations, adjustable temperature control, SS construction."
  },
  {
    id: "10",
    slug: "vacuum-tray-dryer",
    name: "Vacuum Tray Dryer",
    category: "Drying Equipment",
    shortDescription: "Precision vacuum tray dryer for low-temperature drying of heat-sensitive pharmaceutical products under vacuum.",
    description: "The Vacuum Tray Dryer combines the simplicity of tray drying with vacuum operation for heat-sensitive materials. It enables drying at lower temperatures by reducing the boiling point under vacuum. Ideal for thermolabile pharmaceutical products, APIs, and specialty chemicals that require gentle drying conditions.",
    applications: [
      "Heat-sensitive pharmaceutical drying",
      "API drying",
      "Thermolabile product drying",
      "Specialty chemical drying",
      "Herbal extract drying"
    ],
    capacity: "Available in multiple tray configurations",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per requirement",
    operatingTemperature: "Low temperature (vacuum drying)",
    operatingPressure: "Vacuum",
    finish: "Mirror polish contact parts",
    motor: "As per capacity",
    gearbox: "N/A",
    controls: "Manual / PLC based",
    features: [
      "Low-temperature drying under vacuum",
      "Prevents thermal degradation",
      "SS 316 contact parts",
      "Vacuum密封 chamber",
      "Temperature and vacuum control",
      "Easy tray handling",
      "Gentle drying process"
    ],
    industries: ["Pharmaceutical", "Chemical", "Nutraceutical"],
    images: ["/images/products/vtd-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Vacuum Tray Dryer" },
      { parameter: "Tray Capacity", specification: "As per configuration" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Operating Pressure", specification: "Vacuum" },
      { parameter: "Temperature Control", specification: "Precise" },
      { parameter: "Controls", specification: "Manual / PLC based" },
      { parameter: "Sealing", specification: "Vacuum密封" }
    ],
    faq: [
      { question: "How does a Vacuum Tray Dryer differ from a regular Tray Dryer?", answer: "A Vacuum Tray Dryer operates under reduced pressure, allowing drying at lower temperatures. This is essential for heat-sensitive materials that degrade at normal drying temperatures." }
    ],
    seoTitle: "Vacuum Tray Dryer | Low Temperature Drying | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Vacuum Tray Dryer for heat-sensitive pharmaceutical products. Low-temperature vacuum drying, SS 316 contact parts."
  },
  {
    id: "11",
    slug: "multi-mill",
    name: "Multi Mill",
    category: "Milling Equipment",
    shortDescription: "Versatile multi mill for pharmaceutical coarse and fine grinding with multiple screen options for particle size control.",
    description: "The Multi Mill is a versatile grinding machine used for coarse and fine grinding of pharmaceutical materials. It uses a rotating beaters mechanism with interchangeable screens for particle size control. The machine is suitable for a wide range of materials including dry and slightly wet substances.",
    applications: [
      "Pharmaceutical grinding",
      "Coarse and fine milling",
      "Herbal material grinding",
      "Chemical grinding",
      "Pigment grinding"
    ],
    capacity: "Available in multiple capacities",
    materialOfConstruction: "SS 304 / SS 316",
    contactParts: "SS 316 as required",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "N/A",
    operatingTemperature: "Ambient",
    operatingPressure: "Atmospheric",
    finish: "Standard / Mirror polish as required",
    motor: "As per capacity",
    gearbox: "N/A",
    controls: "Manual",
    features: [
      "Coarse and fine grinding capability",
      "Interchangeable screens",
      "High-speed beaters",
      "Easy screen change",
      "SS construction",
      "Versatile material handling",
      "Easy cleaning"
    ],
    industries: ["Pharmaceutical", "Chemical", "Herbal", "Food Processing"],
    images: ["/images/products/multi-mill-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Multi Mill" },
      { parameter: "Capacity", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316" },
      { parameter: "Beaters", specification: "High-speed" },
      { parameter: "Screens", specification: "Interchangeable" },
      { parameter: "Grinding Type", specification: "Coarse and fine" },
      { parameter: "Speed", specification: "As per requirement" },
      { parameter: "Controls", specification: "Manual" }
    ],
    faq: [
      { question: "What is a Multi Mill used for?", answer: "A Multi Mill is used for coarse and fine grinding of pharmaceutical, chemical, and herbal materials using high-speed beaters with interchangeable screens." },
      { question: "How do I control particle size?", answer: "Particle size is controlled by changing the screen size. Different screen sizes are available for different grinding requirements." }
    ],
    seoTitle: "Multi Mill | Pharmaceutical Grinding Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Multi Mill for pharmaceutical grinding and milling. Coarse and fine grinding, interchangeable screens, SS construction."
  },
  {
    id: "12",
    slug: "coating-pan",
    name: "Coating Pan",
    category: "Coating Equipment",
    shortDescription: "Standard coating pan for pharmaceutical tablet coating with adjustable speed and spraying systems.",
    description: "The Coating Pan is designed for pharmaceutical tablet coating applications, including sugar coating, film coating, and enteric coating. The rotating pan ensures uniform coating of tablets. Available in various sizes with options for automatic spray systems, exhaust systems, and PLC controls.",
    applications: [
      "Pharmaceutical tablet coating",
      "Sugar coating",
      "Film coating",
      "Enteric coating",
      "Pill polishing"
    ],
    capacity: "Available in multiple pan sizes",
    materialOfConstruction: "SS 304 / SS 316",
    contactParts: "SS 316 as required",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per capacity",
    workingVolume: "As per pan size",
    operatingTemperature: "Heated (as required)",
    operatingPressure: "Atmospheric",
    finish: "Mirror polish pan interior",
    motor: "As per capacity",
    gearbox: "As required",
    controls: "Manual / Automatic",
    features: [
      "Adjustable pan speed",
      "Uniform tablet coating",
      "Spray gun integration",
      "Heated pan option",
      "Exhaust system",
      "Multiple pan sizes available",
      "Easy to clean"
    ],
    industries: ["Pharmaceutical", "Nutraceutical"],
    images: ["/images/products/coating-pan-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Coating Pan" },
      { parameter: "Pan Size", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316" },
      { parameter: "Pan Interior", specification: "Mirror polish" },
      { parameter: "Speed", specification: "Adjustable" },
      { parameter: "Heating", specification: "Optional" },
      { parameter: "Spray System", specification: "Optional" },
      { parameter: "Controls", specification: "Manual / Automatic" }
    ],
    faq: [
      { question: "What types of coating can be done?", answer: "Our coating pans support sugar coating, film coating, enteric coating, and pill polishing applications." },
      { question: "Can it be automated?", answer: "Yes, automatic spray systems and PLC controls are available for precise coating process control." }
    ],
    seoTitle: "Coating Pan | Tablet Coating Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Coating Pan for pharmaceutical tablet coating. Sugar coating, film coating, automatic spray systems available."
  },
  {
    id: "13",
    slug: "storage-vessel",
    name: "Storage Vessel",
    category: "Vessels & Tanks",
    shortDescription: "Custom storage vessels for pharmaceutical raw material, intermediate, and product storage with various configurations.",
    description: "Our Storage Vessels are designed for safe and hygienic storage of pharmaceutical raw materials, intermediates, and finished products. Available in various capacities and configurations with options for agitation, heating, cooling, insulation, and instrumentation. Custom designed to meet specific process requirements.",
    applications: [
      "Raw material storage",
      "Intermediate product storage",
      "Finished product storage",
      "Solvent storage",
      "Utility storage"
    ],
    capacity: "Available in various capacities (custom)",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "N/A (agitator power as required)",
    dimensions: "Custom designed",
    workingVolume: "As per requirement",
    operatingTemperature: "As per requirement",
    operatingPressure: "Atmospheric / Pressurized",
    finish: "Mirror polish / Matte as required",
    motor: "As per agitator requirement",
    gearbox: "As required",
    controls: "Level indicators, instrumentation as required",
    features: [
      "Custom capacity and dimensions",
      "SS 316 contact surfaces",
      "Insulation option",
      "Heating/cooling jacket option",
      "Agitation option",
      "Level indicators",
      "Various nozzle configurations",
      "Mounting options (vertical/horizontal)"
    ],
    industries: ["Pharmaceutical", "Chemical", "Food Processing", "Cosmetics"],
    images: ["/images/products/storage-vessel-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Storage Vessel" },
      { parameter: "Capacity", specification: "Custom" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Insulation", specification: "Optional" },
      { parameter: "Jacket", specification: "Optional (heating/cooling)" },
      { parameter: "Agitation", specification: "Optional" },
      { parameter: "Mounting", specification: "Vertical / Horizontal" },
      { parameter: "Surface Finish", specification: "Mirror polish / Matte" }
    ],
    faq: [
      { question: "Can storage vessels be customized?", answer: "Yes, all our storage vessels are custom designed to meet specific capacity, configuration, and process requirements." },
      { question: "What options are available?", answer: "Options include insulation, heating/cooling jackets, agitation, level indicators, and various nozzle configurations." }
    ],
    seoTitle: "Storage Vessel | Pharmaceutical Storage Tank | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of SS Storage Vessels for pharmaceutical applications. Custom capacities, insulation, heating/cooling options available."
  },
  {
    id: "14",
    slug: "manufacturing-vessel",
    name: "Manufacturing Vessel",
    category: "Vessels & Tanks",
    shortDescription: "Precision manufacturing vessels for pharmaceutical process operations with agitation, temperature control, and custom design.",
    description: "Our Manufacturing Vessels are designed for pharmaceutical process operations including mixing, reaction, and processing. Available with various agitation systems, heating/cooling jackets, and instrumentation for precise process control. Engineered to meet cGMP requirements.",
    applications: [
      "Pharmaceutical process operations",
      "Chemical reactions",
      "Mixing and blending",
      "Solution preparation",
      "Process heating and cooling"
    ],
    capacity: "Available in various capacities (custom)",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per agitator requirement",
    dimensions: "Custom designed",
    workingVolume: "As per requirement",
    operatingTemperature: "As per requirement",
    operatingPressure: "Atmospheric / Pressurized",
    finish: "Mirror polish contact surfaces",
    motor: "As per agitator",
    gearbox: "As required",
    controls: "Temperature, pressure, level instrumentation as required",
    features: [
      "Custom design for process requirements",
      "Various agitation systems",
      "Heating/cooling jacket",
      "Temperature control",
      "Pressure capability",
      "SS 316L contact surfaces",
      "cGMP compliant design",
      "Instrumentation integration"
    ],
    industries: ["Pharmaceutical", "Chemical", "Nutraceutical"],
    images: ["/images/products/mfg-vessel-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Manufacturing Vessel" },
      { parameter: "Capacity", specification: "Custom" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Agitation", specification: "Various types available" },
      { parameter: "Jacket", specification: "Heating/Cooling" },
      { parameter: "Pressure", specification: "Atmospheric / Pressurized" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Design Standard", specification: "cGMP" }
    ],
    faq: [
      { question: "What agitation systems are available?", answer: "Various agitation systems including propeller, anchor, turbine, and custom designs are available based on process requirements." }
    ],
    seoTitle: "Manufacturing Vessel | Pharmaceutical Process Vessel | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of SS Manufacturing Vessels for pharmaceutical processing. Custom design, agitation, heating/cooling, cGMP compliant."
  },
  {
    id: "15",
    slug: "mixing-vessel",
    name: "Mixing Vessel",
    category: "Vessels & Tanks",
    shortDescription: "Versatile mixing vessels for pharmaceutical liquid and semi-solid mixing with multiple agitator options.",
    description: "Our Mixing Vessels are designed for pharmaceutical liquid and semi-solid mixing applications. Available with various agitator configurations including propeller, anchor, and turbine agitators. Can be provided with heating/cooling jackets and temperature control for process-specific requirements.",
    applications: [
      "Liquid mixing",
      "Solution preparation",
      "Syrup manufacturing",
      "Suspension preparation",
      "Cream and ointment mixing"
    ],
    capacity: "Available in various capacities (custom)",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "As per agitator",
    dimensions: "Custom designed",
    workingVolume: "As per requirement",
    operatingTemperature: "As per requirement",
    operatingPressure: "Atmospheric / Pressurized",
    finish: "Mirror polish contact surfaces",
    motor: "As per agitator",
    gearbox: "As required",
    controls: "Temperature, speed controls as required",
    features: [
      "Multiple agitator options",
      "Heating/cooling jacket",
      "Temperature control",
      "Speed control",
      "SS 316L contact surfaces",
      "Various discharge options",
      "Custom configurations"
    ],
    industries: ["Pharmaceutical", "Cosmetics", "Food Processing"],
    images: ["/images/products/mixing-vessel-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Mixing Vessel" },
      { parameter: "Capacity", specification: "Custom" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Agitator", specification: "Propeller / Anchor / Turbine" },
      { parameter: "Jacket", specification: "Heating/Cooling" },
      { parameter: "Speed Control", specification: "VFD available" },
      { parameter: "Surface Finish", specification: "Mirror polish" }
    ],
    faq: [
      { question: "What agitator options are available?", answer: "We offer propeller, anchor, turbine, and custom agitator designs based on the mixing application and material properties." }
    ],
    seoTitle: "Mixing Vessel | Pharmaceutical Mixing Tank | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of SS Mixing Vessels for pharmaceutical liquid and semi-solid mixing. Multiple agitator options, heating/cooling jackets."
  },
  {
    id: "16",
    slug: "zero-hold-up-filter",
    name: "Zero Hold Up Filter",
    category: "Filtration Equipment",
    shortDescription: "Specialized zero hold up filter for pharmaceutical filtration with minimal product loss and complete discharge.",
    description: "The Zero Hold Up Filter is designed for pharmaceutical filtration applications where minimal product loss is critical. The special design ensures complete discharge of filtered product with virtually no hold-up volume. Suitable for batch filtration of pharmaceutical liquids, suspensions, and solutions.",
    applications: [
      "Pharmaceutical filtration",
      "Clarification of solutions",
      "Suspension filtration",
      "API filtration",
      "Process liquid filtration"
    ],
    capacity: "Available in multiple sizes",
    materialOfConstruction: "SS 304 / SS 316 / SS 316L",
    contactParts: "SS 316 / SS 316L",
    nonContactParts: "SS 304",
    power: "N/A (pressure driven)",
    dimensions: "As per size",
    workingVolume: "As per requirement",
    operatingTemperature: "As per process requirement",
    operatingPressure: "As per requirement",
    finish: "Mirror polish contact parts",
    motor: "N/A",
    gearbox: "N/A",
    controls: "Manual",
    features: [
      "Minimal product hold-up",
      "Complete discharge design",
      "SS 316 contact parts",
      "Various filter media options",
      "Easy cleaning",
      "Pressure or gravity operation",
      "Multiple size options"
    ],
    industries: ["Pharmaceutical", "Chemical"],
    images: ["/images/products/zero-hold-filter-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Zero Hold Up Filter" },
      { parameter: "Size", specification: "As per requirement" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316 / SS 316L" },
      { parameter: "Contact Parts", specification: "SS 316 / SS 316L" },
      { parameter: "Filtration", specification: "Pressure / Gravity" },
      { parameter: "Filter Media", specification: "Various options" },
      { parameter: "Surface Finish", specification: "Mirror polish" },
      { parameter: "Hold-up Volume", specification: "Minimal" }
    ],
    faq: [
      { question: "What is the advantage of a Zero Hold Up Filter?", answer: "The primary advantage is minimal product loss during filtration, with virtually complete discharge of the filtered product." }
    ],
    seoTitle: "Zero Hold Up Filter | Pharmaceutical Filtration | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Zero Hold Up Filter for pharmaceutical filtration. Minimal product loss, complete discharge, SS 316 contact parts."
  },
  {
    id: "17",
    slug: "filter-press",
    name: "Filter Press",
    category: "Filtration Equipment",
    shortDescription: "Industrial filter press for pharmaceutical and chemical solid-liquid separation with various plate configurations.",
    description: "The Filter Press is used for solid-liquid separation in pharmaceutical and chemical processing. It provides effective filtration of slurries and suspensions, producing clear filtrate and dry filter cake. Available in various plate sizes and configurations to suit different processing requirements.",
    applications: [
      "Solid-liquid separation",
      "Pharmaceutical slurry filtration",
      "Chemical filtration",
      "Waste liquid treatment",
      "API isolation"
    ],
    capacity: "Available in multiple plate sizes",
    materialOfConstruction: "SS 304 / SS 316",
    contactParts: "SS 316 as required",
    nonContactParts: "SS 304 / MS",
    power: "As per hydraulic system",
    dimensions: "As per plate size",
    workingVolume: "As per configuration",
    operatingTemperature: "As per process requirement",
    operatingPressure: "As per requirement",
    finish: "Standard finish",
    motor: "Hydraulic pump motor",
    gearbox: "N/A",
    controls: "Manual / Hydraulic",
    features: [
      "Effective solid-liquid separation",
      "Various plate sizes",
      "Hydraulic closing system",
      "Cake washing option",
      "SS plates available",
      "Multiple cloth options",
      "Robust construction"
    ],
    industries: ["Pharmaceutical", "Chemical", "Food Processing"],
    images: ["/images/products/filter-press-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Filter Press" },
      { parameter: "Plate Size", specification: "As per requirement" },
      { parameter: "Number of Plates", specification: "As per configuration" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316" },
      { parameter: "Closing System", specification: "Hydraulic" },
      { parameter: "Filtration Pressure", specification: "As per requirement" },
      { parameter: "Cake Washing", specification: "Optional" },
      { parameter: "Controls", specification: "Manual / Hydraulic" }
    ],
    faq: [
      { question: "What is a Filter Press used for?", answer: "A Filter Press is used for solid-liquid separation, filtering slurries and suspensions to produce clear filtrate and dry filter cake." }
    ],
    seoTitle: "Filter Press | Solid-Liquid Separation | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Filter Press for pharmaceutical and chemical solid-liquid separation. Multiple plate sizes, hydraulic system, SS construction."
  },
  {
    id: "18",
    slug: "vibro-sifter",
    name: "Vibro Sifter",
    category: "Screening Equipment",
    shortDescription: "High-efficiency vibro sifter for pharmaceutical powder screening and grading with multi-deck separation.",
    description: "The Vibro Sifter is used for screening, grading, and separating pharmaceutical powders and granules. The vibratory action ensures efficient material flow and precise separation. Available in single or multi-deck configurations for various particle size separations. Widely used in pharmaceutical, chemical, and food industries.",
    applications: [
      "Pharmaceutical powder screening",
      "Granule grading",
      "Particle size separation",
      "De-dusting",
      "Foreign particle removal"
    ],
    capacity: "Available in multiple diameters",
    materialOfConstruction: "SS 304 / SS 316",
    contactParts: "SS 316 as required",
    nonContactParts: "SS 304",
    power: "As per capacity",
    dimensions: "As per diameter",
    workingVolume: "As per configuration",
    operatingTemperature: "Ambient",
    operatingPressure: "Atmospheric",
    finish: "Standard / Mirror polish as required",
    motor: "Vibratory motor",
    gearbox: "N/A",
    controls: "Manual",
    features: [
      "Efficient vibratory screening",
      "Single or multi-deck options",
      "Various mesh sizes available",
      "Easy screen change",
      "Continuous operation",
      "High throughput",
      "SS construction"
    ],
    industries: ["Pharmaceutical", "Chemical", "Food Processing"],
    images: ["/images/products/vibro-sifter-1.jpg"],
    brochure: null,
    technicalSpecifications: [
      { parameter: "Machine Type", specification: "Vibro Sifter" },
      { parameter: "Diameter", specification: "As per requirement" },
      { parameter: "Number of Decks", specification: "1 / 2 / 3" },
      { parameter: "Material of Construction", specification: "SS 304 / SS 316" },
      { parameter: "Mesh Size", specification: "As per requirement" },
      { parameter: "Vibration", specification: "Eccentric weight type" },
      { parameter: "Speed", specification: "As per screening requirement" },
      { parameter: "Controls", specification: "Manual" }
    ],
    faq: [
      { question: "How many decks can a Vibro Sifter have?", answer: "Vibro sifters are available in single, double, or triple deck configurations for multi-grade particle separation." },
      { question: "What mesh sizes are available?", answer: "Various mesh sizes are available to suit different particle size requirements. Custom mesh sizes can also be provided." }
    ],
    seoTitle: "Vibro Sifter | Pharmaceutical Screening Equipment | Khushbu Pharma Machinery",
    seoDescription: "Manufacturer of Vibro Sifter for pharmaceutical powder screening and grading. Multi-deck options, various mesh sizes, SS construction."
  }
];

export const categories = [
  { name: "Drying Equipment", slug: "drying-equipment", count: 4 },
  { name: "Granulation Equipment", slug: "granulation-equipment", count: 1 },
  { name: "Blending Equipment", slug: "blending-equipment", count: 3 },
  { name: "Mixing Equipment", slug: "mixing-equipment", count: 2 },
  { name: "Milling Equipment", slug: "milling-equipment", count: 1 },
  { name: "Coating Equipment", slug: "coating-equipment", count: 1 },
  { name: "Vessels & Tanks", slug: "vessels-tanks", count: 3 },
  { name: "Filtration Equipment", slug: "filtration-equipment", count: 2 },
  { name: "Screening Equipment", slug: "screening-equipment", count: 1 },
];

export const industries = [
  {
    id: "pharmaceutical",
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    description: "Our machinery is designed to meet the demanding requirements of pharmaceutical manufacturing, including tablet production, granulation, coating, and packaging processes.",
    equipment: ["Fluid Bed Dryer", "Rapid Mixing Granulator", "Octagonal Blender", "Double Cone Blender", "Coating Pan", "Vibro Sifter"],
    icon: "pill"
  },
  {
    id: "nutraceutical",
    slug: "nutraceutical",
    name: "Nutraceutical",
    description: "Specialized equipment for nutraceutical product manufacturing including tablets, capsules, powders, and liquid formulations.",
    equipment: ["Fluid Bed Dryer", "Rapid Mixing Granulator", "Octagonal Blender", "Tray Dryer"],
    icon: "leaf"
  },
  {
    id: "chemical",
    slug: "chemical",
    name: "Chemical",
    description: "Robust processing equipment for chemical manufacturing applications including mixing, blending, drying, and filtration.",
    equipment: ["Ribbon Blender", "Filter Press", "Storage Vessel", "Multi Mill"],
    icon: "flask-conical"
  },
  {
    id: "food-processing",
    slug: "food-processing",
    name: "Food Processing",
    description: "Food-grade processing equipment for mixing, blending, and processing food ingredients and products.",
    equipment: ["Ribbon Blender", "Octagonal Blender", "Mixing Vessel", "Storage Vessel"],
    icon: "wheat"
  },
  {
    id: "cosmetics",
    slug: "cosmetics",
    name: "Cosmetics",
    description: "Processing equipment for cosmetic product manufacturing including mixing, blending, and vessel systems.",
    equipment: ["Mass Mixer", "Mixing Vessel", "Manufacturing Vessel"],
    icon: "sparkles"
  },
  {
    id: "ayurvedic",
    slug: "ayurvedic",
    name: "Ayurvedic",
    description: "Equipment suitable for Ayurvedic product manufacturing including grinding, mixing, and processing.",
    equipment: ["Multi Mill", "Mass Mixer", "Tray Dryer", "Storage Vessel"],
    icon: "flower"
  },
  {
    id: "herbal",
    slug: "herbal",
    name: "Herbal",
    description: "Processing equipment for herbal product manufacturing including grinding, drying, and extraction.",
    equipment: ["Multi Mill", "Tray Dryer", "Vacuum Tray Dryer", "Filter Press"],
    icon: "trees"
  },
  {
    id: "research-development",
    slug: "research-development",
    name: "Research & Development",
    description: "Laboratory-scale equipment for R&D applications including small batch processing and formulation development.",
    equipment: ["Mini Fluid Bed Dryer", "Laboratory RMG", "Small Batch Blender", "Lab Scale Mixer"],
    icon: "microscope"
  },
  {
    id: "specialty-chemicals",
    slug: "specialty-chemicals",
    name: "Specialty Chemicals",
    description: "Specialized equipment for specialty chemical processing including precision mixing, filtration, and drying.",
    equipment: ["Ribbon Blender", "Filter Press", "Vacuum Tray Dryer", "Manufacturing Vessel"],
    icon: "atom"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.shortDescription.toLowerCase().includes(lowerQuery) ||
      p.applications.some((a) => a.toLowerCase().includes(lowerQuery)) ||
      p.industries.some((i) => i.toLowerCase().includes(lowerQuery)) ||
      p.slug.toLowerCase().includes(lowerQuery)
  );
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId && (p.category === product.category || p.industries.some((i) => product.industries.includes(i))))
    .slice(0, limit);
}

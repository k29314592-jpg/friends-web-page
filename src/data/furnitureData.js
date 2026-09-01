// ==========================================================================
// FRIENDS FURNITURE - MASTER ROYAL SMART FURNITURE & HOME INTELLIGENCE 2.0 DATASET
// “Where Luxury Meets Comfort.”
// “Your Home. Your Furniture. One Intelligent Ecosystem.”
// ==========================================================================

const LUXURY_PRODUCTS = [
  {
    id: "ff-101",
    sku: "FF-IMP-SOFA-01",
    passportId: "FF-IMPERIAL-10245",
    dnaId: "FF-SF2048",
    name: "THE IMPERIAL SOFA",
    collectionName: "Imperial Collection",
    category: "Living Room",
    subcategory: "Palace Seating",
    price: 89999,
    originalPrice: 114999,
    discount: 22,
    rating: 4.9,
    reviewsCount: 184,
    stock: 3, // Low stock triggers Royal Alert
    minStockThreshold: 5,
    roomMatchScore: 96,
    roomMatchReason: "Fits your 22x18ft Grand Royal Salon with 4.5ft walking clearance and matches royal velvet & gold styling.",
    supplierId: "sup-01",
    supplierName: "Nilambur Palace Teak Guild",
    showroomId: "shw-01",
    showroomName: "Hyderabad Gachibowli Flagship",
    material: "Solid Nilambur Teak, 24K Gold Foil Inlay & Royal Velvet",
    craftsmanship: "Hand-carved by master artisans with traditional mortise-and-tenon joinery.",
    color: "Royal Blue",
    availableColors: ["Royal Blue", "Royal Purple", "Midnight Black", "Ivory", "Walnut"],
    availableMaterials: ["Velvet", "Fabric", "Leatherette", "Wood"],
    dimensions: {
      lengthInches: 92,
      widthInches: 38,
      heightInches: 36,
      display: "92\" L x 38\" W x 36\" H"
    },
    weight: "68 kg",
    warranty: "10-Year Structural Royal Guarantee",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "28 August 2026",
      endDate: "28 August 2036",
      coverage: "100% Timber Foundation, Mortise Joinery & Spring Retention",
      documentNumber: "DOC-WRT-2026-99014",
      claimsRemaining: 3
    },
    healthScore: 94,
    healthStatus: "Excellent 🟢",
    nextRecommendedCheck: "6 Months",
    personality: {
      elegant: 96,
      luxury: 98,
      classic: 89,
      modern: 72,
      minimal: 43
    },
    relationships: [
      { targetId: "ff-106", targetName: "The Versailles Marble Coffee Table", compatibility: 96, reason: "Proportional height alignment (18\" table with 19\" sofa seat) & gold trim synergy." },
      { targetId: "ff-105", targetName: "The Empress Bouclé Armchair", compatibility: 92, reason: "Tactile contrast: deep velvet paired with sculptural bouclé creates palace conversation balance." },
      { targetId: "ff-104", targetName: "The Chancellor Executive Desk", compatibility: 84, reason: "Seasoned Nilambur teak and antique gold pulls harmonize in grand suites." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "15 July 2026",
    authenticityCode: "AUTH-TEAK-2026-9921",
    shortDescription: "Handcrafted luxury seating collection with kiln-dried Nilambur teak and 24K gold foil trim.",
    description: "The Imperial Sofa is the pinnacle of palace comfort. Crafted from sustainably harvested, kiln-dried seasoned Nilambur teak, featuring diamond-tufted royal velvet and hand-rubbed antique gold accents.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Vacuum velvet upholstery fortnightly using soft brush attachment.",
      "Treat timber with annual organic beeswax nourishment balm.",
      "Keep away from direct unshaded ultraviolet exposure.",
      "Wipe gold foil trim with dry micro-fiber cloth only."
    ],
    serviceHistory: [
      { date: "12 JUN 2026", title: "Master Guild Pre-Delivery Inspection", notes: "Timber moisture level verified at 9.4%. Velvet protective coating applied." },
      { date: "15 JAN 2026", title: "Factory Resonance Verification", notes: "Sound-dampening acoustic test passed with zero joint creaks." }
    ],
    carePlan: [
      "Follow manufacturer velvet and solid teak care guidelines.",
      "Keep digital warranty document accessible in your vault.",
      "Schedule annual beeswax polishing appointment via Friends Service.",
      "Log any spot cleaning activities to preserve health score."
    ],
    upgrades: [
      { name: "Bespoke Royal Purple Velvet Upholstery Wrap", price: 18000, compatibility: "100% Compatible" },
      { name: "Matching 24K Gold Trim Velvet Accent Cushion Set (Pair)", price: 6500, compatibility: "100% Compatible" },
      { name: "The Empress Bouclé Matching Accent Companion Chair", price: 34999, compatibility: "Architectural Match" }
    ]
  },
  {
    id: "ff-102",
    sku: "FF-SIG-DIN-02",
    passportId: "FF-SOVEREIGN-20491",
    dnaId: "FF-SD3091",
    name: "THE SOVEREIGN DINING SUITE",
    collectionName: "Signature Collection",
    category: "Dining",
    subcategory: "Dining Suites",
    price: 94999,
    originalPrice: 125000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 112,
    stock: 6,
    minStockThreshold: 4,
    roomMatchScore: 94,
    roomMatchReason: "Provides 3.8 ft perimeter circulation in an 18x14ft dining hall and seats 8 guests comfortably.",
    supplierId: "sup-02",
    supplierName: "Royal Sheesham Artisans Guild",
    showroomId: "shw-02",
    showroomName: "Hyderabad Jubilee Hills Palace",
    material: "Rare Live-Edge Solid Sheesham & Forged Brass Sled Base",
    craftsmanship: "Individually selected single-slab live edge timber sealed with organic resin.",
    color: "Walnut",
    availableColors: ["Walnut", "Midnight Black", "Royal Blue"],
    availableMaterials: ["Wood", "Velvet", "Leatherette"],
    dimensions: {
      lengthInches: 84,
      widthInches: 42,
      heightInches: 30,
      display: "84\" L x 42\" W x 30\" H (Seats 8)"
    },
    weight: "85 kg",
    warranty: "10-Year Warranty",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "29 August 2026",
      endDate: "29 August 2036",
      coverage: "Live-edge slab stability, resin bonding, and brass sled integrity.",
      documentNumber: "DOC-WRT-2026-88123",
      claimsRemaining: 3
    },
    healthScore: 96,
    healthStatus: "Excellent 🟢",
    nextRecommendedCheck: "9 Months",
    personality: {
      elegant: 94,
      luxury: 96,
      classic: 85,
      modern: 88,
      minimal: 60
    },
    relationships: [
      { targetId: "ff-106", targetName: "The Versailles Marble Coffee Table", compatibility: 89, reason: "Shared organic stone and natural wood aesthetic." },
      { targetId: "ff-101", targetName: "The Imperial Sofa", compatibility: 88, reason: "Grand dining and salon open-concept continuum." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "20 June 2026",
    authenticityCode: "AUTH-SHEESHAM-2026-4412",
    shortDescription: "Dramatic live-edge solid Sheesham dining table accompanied by 6 velvet upholstered royal chairs.",
    description: "Celebrate majestic grand dining. Features a 2-inch solid live-edge single slab timber top, heat and stain-proof finish, and hand-forged antique brass base.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Wipe surface with damp cloth and dry immediately.",
      "Use coasters and heat trivets for serving vessels above 70°C.",
      "Apply protective teak oil annually to retain amber sheen."
    ],
    serviceHistory: [
      { date: "20 JUN 2026", title: "Polymer Resin Cure Seal", notes: "2-inch solid timber moisture locked." }
    ],
    carePlan: [
      "Use coasters for hot tea/dining vessels above 70°C.",
      "Re-apply food-safe timber oil once every 12 months."
    ],
    upgrades: [
      { name: "Additional Set of 2 Hand-Carved Velvet Dining Chairs", price: 24000, compatibility: "100% Compatible" },
      { name: "Custom Tempered Glass Tabletop Shield (84x42)", price: 8500, compatibility: "100% Compatible" }
    ]
  },
  {
    id: "ff-103",
    sku: "FF-MAJ-BED-03",
    passportId: "FF-MAJESTY-30114",
    dnaId: "FF-MB4012",
    name: "THE MAJESTY KING BED",
    collectionName: "Royal Comfort",
    category: "Bedroom",
    subcategory: "Grand Beds",
    price: 109999,
    originalPrice: 145000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 240,
    stock: 4,
    minStockThreshold: 5,
    roomMatchScore: 98,
    roomMatchReason: "Symmetrical wingback headboard fits 20x16ft master bedroom wall with integrated warm gold ambient channels.",
    supplierId: "sup-03",
    supplierName: "Bavaria Royal Oak Co.",
    showroomId: "shw-01",
    showroomName: "Hyderabad Gachibowli Flagship",
    material: "European White Oak, Quilted Ivory Velvet & German Hydraulics",
    craftsmanship: "Precision sound-dampened foundation with 900L effortless hydraulic lift.",
    color: "Ivory",
    availableColors: ["Ivory", "Royal Purple", "Royal Blue", "Midnight Black"],
    availableMaterials: ["Velvet", "Leatherette", "Wood"],
    dimensions: {
      lengthInches: 88,
      widthInches: 82,
      heightInches: 54,
      display: "88\" L x 82\" W x 54\" H"
    },
    weight: "110 kg",
    warranty: "10-Year Hydraulic & Wood Warranty",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "15 August 2026",
      endDate: "15 August 2036",
      coverage: "German heavy-duty hydraulic pistons & European White Oak frame.",
      documentNumber: "DOC-WRT-2026-77312",
      claimsRemaining: 3
    },
    healthScore: 92,
    healthStatus: "Excellent 🟢",
    nextRecommendedCheck: "4 Months",
    personality: {
      elegant: 92,
      luxury: 95,
      classic: 90,
      modern: 75,
      minimal: 55
    },
    relationships: [
      { targetId: "ff-105", targetName: "The Empress Bouclé Armchair", compatibility: 95, reason: "Ivory bouclé reading nook harmonizes with ivory velvet headboard." },
      { targetId: "ff-104", targetName: "The Chancellor Executive Desk", compatibility: 82, reason: "Complements private bedroom study alcoves." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "02 July 2026",
    authenticityCode: "AUTH-OAK-2026-8841",
    shortDescription: "Wingback headboard with 24K gold ambient light channels and 900L underbed storage.",
    description: "Designed for grand master suites. Boasts an architectural wingback headboard with integrated warm gold ambient lighting and German heavy-duty hydraulic storage.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Check hydraulic pistons annually; pre-lubricated for 15,000 cycles.",
      "Spot clean ivory velvet headboard using foam fabric cleaner.",
      "Ensure even mattress weight distribution."
    ],
    serviceHistory: [
      { date: "02 JUL 2026", title: "German Hydraulic Pressure Calibration", notes: "450N gas pistons verified." }
    ],
    carePlan: [
      "Perform hydraulic cycle check every 6 months.",
      "Spot clean ivory velvet headboard using foam cleaner."
    ],
    upgrades: [
      { name: "Integrated LED Reading Wand Pair in Antique Brass", price: 7500, compatibility: "100% Compatible" },
      { name: "Matching European Oak 2-Drawer Floating Nightstand Pair", price: 28000, compatibility: "100% Compatible" }
    ]
  },
  {
    id: "ff-104",
    sku: "FF-CHA-OFF-04",
    passportId: "FF-CHANCELLOR-40912",
    dnaId: "FF-ED5021",
    name: "THE CHANCELLOR EXECUTIVE DESK",
    collectionName: "Heritage Collection",
    category: "Office",
    subcategory: "Executive Desks",
    price: 49999,
    originalPrice: 65000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 88,
    stock: 9,
    minStockThreshold: 4,
    roomMatchScore: 92,
    roomMatchReason: "Ideal footprint for private executive studies with integrated wireless charging notch and cable raceway.",
    supplierId: "sup-01",
    supplierName: "Nilambur Palace Teak Guild",
    showroomId: "shw-03",
    showroomName: "Bengaluru Indiranagar Pavilion",
    material: "Solid Teak Wood, Tuscan Saddle Leather & Gold Pulls",
    craftsmanship: "Chamfered edge profiles with hidden biometric drawer lock.",
    color: "Walnut",
    availableColors: ["Walnut", "Midnight Black"],
    availableMaterials: ["Wood", "Leatherette"],
    dimensions: {
      lengthInches: 64,
      widthInches: 32,
      heightInches: 30,
      display: "64\" L x 32\" W x 30\" H"
    },
    weight: "52 kg",
    warranty: "5-Year Warranty",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "10 August 2026",
      endDate: "10 August 2031",
      coverage: "Biometric lock mechanism and teak wood joint stability.",
      documentNumber: "DOC-WRT-2026-66219",
      claimsRemaining: 2
    },
    healthScore: 95,
    healthStatus: "Excellent 🟢",
    nextRecommendedCheck: "8 Months",
    personality: {
      elegant: 95,
      luxury: 93,
      classic: 94,
      modern: 70,
      minimal: 48
    },
    relationships: [
      { targetId: "ff-105", targetName: "The Empress Bouclé Armchair", compatibility: 90, reason: "Creates a luxurious client seating ensemble in private chambers." },
      { targetId: "ff-101", targetName: "The Imperial Sofa", compatibility: 84, reason: "Shared Nilambur seasoned teak DNA." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "10 August 2026",
    authenticityCode: "AUTH-TEAK-2026-1184",
    shortDescription: "Executive desk with Tuscan leather blotter inlay, wireless charging bay, and 3 soft-close drawers.",
    description: "Command attention in your private study. Built with seasoned solid teak wood, integrated wireless induction charging, velvet-lined drawers, and solid brass handles.",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Clean Tuscan leather blotter with dedicated leather conditioner balm.",
      "Avoid placing hot teacups directly onto untreated timber areas."
    ],
    serviceHistory: [
      { date: "10 AUG 2026", title: "Biometric Lock Certification", notes: "Fingerprint scanner firmware 2.4." }
    ],
    carePlan: [
      "Nourish leather blotter quarterly.",
      "Clean inductive charging surface with dry cloth."
    ],
    upgrades: [
      { name: "Executive Ergonomic High-Back Leather Swivel Chair", price: 32000, compatibility: "100% Compatible" }
    ]
  },
  {
    id: "ff-105",
    sku: "FF-EMP-ACC-05",
    passportId: "FF-EMPRESS-50821",
    dnaId: "FF-AC6019",
    name: "THE EMPRESS BOUCLÉ ARMCHAIR",
    collectionName: "Modern Royal",
    category: "Living Room",
    subcategory: "Accent Seating",
    price: 34999,
    originalPrice: 45000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 142,
    stock: 12,
    minStockThreshold: 4,
    roomMatchScore: 95,
    roomMatchReason: "Sculptural silhouette fills salon corner alcoves with 360-degree rotation and gold tips.",
    supplierId: "sup-01",
    supplierName: "Nilambur Palace Teak Guild",
    showroomId: "shw-02",
    showroomName: "Hyderabad Jubilee Hills Palace",
    material: "Textured Teddy Bouclé & Solid Ash Wood Base with 24K Gold Plating",
    craftsmanship: "Sculptural curved cocoon silhouette with high-density spring support.",
    color: "Ivory",
    availableColors: ["Ivory", "Royal Blue", "Royal Purple"],
    availableMaterials: ["Fabric", "Velvet", "Leatherette"],
    dimensions: {
      lengthInches: 34,
      widthInches: 34,
      heightInches: 32,
      display: "34\" L x 34\" W x 32\" H"
    },
    weight: "22 kg",
    warranty: "5-Year Warranty",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "05 August 2026",
      endDate: "05 August 2031",
      coverage: "Bouclé seam resilience and solid ash gold-plated base.",
      documentNumber: "DOC-WRT-2026-55120",
      claimsRemaining: 2
    },
    healthScore: 97,
    healthStatus: "Pristine 🟢",
    nextRecommendedCheck: "12 Months",
    personality: {
      elegant: 90,
      luxury: 94,
      classic: 65,
      modern: 96,
      minimal: 82
    },
    relationships: [
      { targetId: "ff-101", targetName: "The Imperial Sofa", compatibility: 92, reason: "Creates a dynamic living room seating circle." },
      { targetId: "ff-106", targetName: "The Versailles Marble Coffee Table", compatibility: 94, reason: "Nesting table curve echoes bouclé silhouette." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "05 August 2026",
    authenticityCode: "AUTH-ASH-2026-7731",
    shortDescription: "Curved cocoon lounge armchair wrapped in textured ivory bouclé with gold leg tips.",
    description: "An architectural throne for quiet palace reading. Features 360-degree cocoon curvature, stain-guarded bouclé fabric, and reinforced hardwood frame.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Clean bouclé with dry micro-fiber brush in circular motions.",
      "Polish gold plated leg tips with soft flannel cloth."
    ],
    serviceHistory: [
      { date: "05 AUG 2026", title: "Fabric Stain Guard Application", notes: "Fluoropolymer mist seal." }
    ],
    carePlan: [
      "Brush bouclé weekly in circular motions.",
      "Polish 24K gold tips with micro-fiber cloth."
    ],
    upgrades: [
      { name: "Matching Ivory Bouclé Swivel Ottoman Footstool", price: 12000, compatibility: "100% Compatible" }
    ]
  },
  {
    id: "ff-106",
    sku: "FF-VER-COF-06",
    passportId: "FF-VERSAILLES-60293",
    dnaId: "FF-CT7034",
    name: "THE VERSAILLES MARBLE COFFEE TABLE",
    collectionName: "Classic Wood Collection",
    category: "Living Room",
    subcategory: "Marble & Stone",
    price: 38999,
    originalPrice: 49999,
    discount: 22,
    rating: 4.9,
    reviewsCount: 96,
    stock: 8,
    minStockThreshold: 3,
    roomMatchScore: 97,
    roomMatchReason: "Nesting design allows flexible central placement without impeding sofa clearance.",
    supplierId: "sup-02",
    supplierName: "Royal Sheesham Artisans Guild",
    showroomId: "shw-01",
    showroomName: "Hyderabad Gachibowli Flagship",
    material: "Italian Carrara White Marble & Fluted Walnut with Gold Base",
    craftsmanship: "Hand-beveled 20mm marble slab with fluted hardwood plinth.",
    color: "Walnut",
    availableColors: ["Walnut", "Midnight Black", "Ivory"],
    availableMaterials: ["Wood", "Leatherette"],
    dimensions: {
      lengthInches: 38,
      widthInches: 38,
      heightInches: 18,
      display: "Set of 2: Main 38\" Dia, Nesting 26\" Dia"
    },
    weight: "44 kg",
    warranty: "5-Year Warranty",
    warrantyDetails: {
      status: "ACTIVE",
      startDate: "28 July 2026",
      endDate: "28 July 2031",
      coverage: "Carrara marble polish resistance and fluted plinth stability.",
      documentNumber: "DOC-WRT-2026-44018",
      claimsRemaining: 2
    },
    healthScore: 98,
    healthStatus: "Pristine 🟢",
    nextRecommendedCheck: "10 Months",
    personality: {
      elegant: 95,
      luxury: 97,
      classic: 82,
      modern: 90,
      minimal: 68
    },
    relationships: [
      { targetId: "ff-101", targetName: "The Imperial Sofa", compatibility: 96, reason: "Direct palace centerpiece pairing." },
      { targetId: "ff-105", targetName: "The Empress Bouclé Armchair", compatibility: 94, reason: "Nesting configuration offers convenient reach." }
    ],
    inStock: true,
    estimatedDelivery: "5–7 Days",
    manufacturingDate: "28 July 2026",
    authenticityCode: "AUTH-MARBLE-2026-5591",
    shortDescription: "Nesting circular coffee tables featuring hand-sealed Carrara marble and fluted walnut gold base.",
    description: "Versatile, opulent, and sculpted for grand living halls. The smaller companion table slides beneath the main table or serves as an independent side table.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80"
    ],
    careInstructions: [
      "Pre-sealed with fluorocarbon resin against acidic lemon/wine spills.",
      "Clean marble top using pH-neutral natural stone cleaner."
    ],
    serviceHistory: [
      { date: "28 JUL 2026", title: "Stone Sealer Penetration Test", notes: "Hydrophobic seal certified." }
    ],
    carePlan: [
      "Wipe marble with pH-neutral cleaner.",
      "Avoid abrasive scouring pads on polished stone."
    ],
    upgrades: [
      { name: "Matching Versailles Marble Console Side Table", price: 22000, compatibility: "100% Compatible" }
    ]
  }
];

// 🌐 1. HOME GENOME DATASET (Customer's Complete Digital Home Profile)
const INITIAL_HOME_GENOME = {
  homeName: "Lotus Palace Villa",
  location: "Banjara Hills, Hyderabad",
  totalAreaSqFt: 3450,
  homeStyle: "Modern Royal & Palace Classical",
  preferredColors: ["Royal Navy", "Champagne Gold", "Walnut", "Ivory"],
  preferredMaterials: ["Nilambur Teak", "Italian Carrara Marble", "Royal Velvet"],
  budgetPreference: "₹5,00,000 Total Allocation",
  homeIntelligenceScore: 91,
  dimensionScores: {
    space: 94,
    style: 91,
    compatibility: 95,
    budget: 87
  },
  rooms: [
    {
      roomId: "room-101",
      roomName: "Grand Royal Salon",
      roomType: "Living Room",
      dimensions: "22ft × 18ft (396 sq.ft)",
      walkingClearance: "4.5 ft Circulation",
      spaceUtilization: 76,
      flowStatus: "Comfortable 🟢",
      furnitureCount: 3,
      furnitureIds: ["ff-101", "ff-106", "ff-105"],
      colorPalette: { primary: "#07142F", secondary: "#5C3A21", accent: "#C9A227" },
      emptySpaceOpportunities: [
        {
          zone: "North-East Corner Alcove",
          dimensions: "1.8m × 1.2m",
          utilizationBefore: 72,
          utilizationPotential: 88,
          recommendedProductId: "ff-105",
          recommendedProductName: "The Empress Bouclé Armchair & Fluted Side Console"
        }
      ]
    },
    {
      roomId: "room-102",
      roomName: "Imperial Banquet Hall",
      roomType: "Dining",
      dimensions: "18ft × 14ft (252 sq.ft)",
      walkingClearance: "3.8 ft Circulation",
      spaceUtilization: 68,
      flowStatus: "Comfortable 🟢",
      furnitureCount: 1,
      furnitureIds: ["ff-102"],
      colorPalette: { primary: "#5C3A21", secondary: "#C9A227", accent: "#FFF8E7" },
      emptySpaceOpportunities: [
        {
          zone: "East Wall Window Credenza Bay",
          dimensions: "2.2m × 1.0m",
          utilizationBefore: 68,
          utilizationPotential: 84,
          recommendedProductId: "ff-104",
          recommendedProductName: "Classic Teak Buffet Credenza & Wine Vault"
        }
      ]
    },
    {
      roomId: "room-103",
      roomName: "Master Heritage Suite",
      roomType: "Bedroom",
      dimensions: "20ft × 16ft (320 sq.ft)",
      walkingClearance: "4.2 ft Circulation",
      spaceUtilization: 72,
      flowStatus: "Comfortable 🟢",
      furnitureCount: 1,
      furnitureIds: ["ff-103"],
      colorPalette: { primary: "#FFF8E7", secondary: "#C9A227", accent: "#1B0B36" },
      emptySpaceOpportunities: [
        {
          zone: "Bedside Reading Corner",
          dimensions: "1.5m × 1.5m",
          utilizationBefore: 70,
          utilizationPotential: 86,
          recommendedProductId: "ff-105",
          recommendedProductName: "Ivory Velvet Reading Chair with Brass Sconce"
        }
      ]
    }
  ]
};

// 🚨 12. PROBLEM PREVENTION CENTER DATASET
const INITIAL_PREVENTION_ALERTS = [
  {
    id: "prev-1",
    level: "HIGH",
    icon: "⚠️",
    title: "Low Stock Reserve in Palace Vault",
    item: "The Imperial Sofa (3 units left)",
    why: "Seasonal demand surged +46% due to wedding and palace reception commissions.",
    recommendedAction: "Reserve 20 units with Nilambur Palace Teak Guild immediately.",
    type: "Inventory"
  },
  {
    id: "prev-2",
    level: "MEDIUM",
    icon: "🚚",
    title: "Monsoon Corridor Delivery Delay Risk",
    item: "Order #ROYAL-ORD-88129 (Hyderabad Route)",
    why: "Heavy rains on NH-44 highway corridor could add 24-48 hours.",
    recommendedAction: "Switch to dedicated climate-controlled express rail transit.",
    type: "Logistics"
  },
  {
    id: "prev-3",
    level: "LOW",
    icon: "🚪",
    title: "Narrow Stairway Clearance Check",
    item: "The Sovereign Dining Suite (84\" Top Slab)",
    why: "Doorway is 36\" wide vs 42\" table width.",
    recommendedAction: "Use vertical pivot handling protocol with detachable brass sled base.",
    type: "Access"
  },
  {
    id: "prev-4",
    level: "LOW",
    icon: "💰",
    title: "Budget Optimization Opportunity",
    item: "Living Room Package",
    why: "Total configuration exceeds target by ₹4,500.",
    recommendedAction: "Redeem 3,450 Royal Points to bring package exactly within target budget.",
    type: "Budget"
  }
];

// 🏆 16. ROYAL ACHIEVEMENTS
const ROYAL_ACHIEVEMENTS_DATA = [
  { id: "ach-1", title: "First Royal Purchase", icon: "👑", desc: "Commissioned your inaugural palace masterpiece.", points: 500, unlocked: true },
  { id: "ach-2", title: "Complete Room Master", icon: "🏠", desc: "Furnished a complete room suite with 94%+ compatibility.", points: 1000, unlocked: true },
  { id: "ach-3", title: "DNA Verified", icon: "🧬", desc: "Verified timber authenticity and registered digital passport.", points: 300, unlocked: true },
  { id: "ach-4", title: "QR Palace Explorer", icon: "📱", desc: "Scanned showroom QR tags to explore digital passports.", points: 250, unlocked: true },
  { id: "ach-5", title: "Care Champion", icon: "🛠️", desc: "Completed bi-annual organic beeswax maintenance check.", points: 400, unlocked: false },
  { id: "ach-6", title: "Royal Collector", icon: "🏆", desc: "Own 3 or more certified palace furniture suites.", points: 1500, unlocked: true }
];

// Showroom Entities
const LUXURY_SHOWROOMS = [
  {
    id: "shw-01",
    name: "Hyderabad Gachibowli Flagship",
    location: "Plot 42, Friends Royal Avenue, Metro Pillar 124, Gachibowli, Hyderabad - 500032",
    manager: "Hari Rathore",
    email: "hari.gachibowli@gmail.com",
    phone: "+91 98490 12345",
    sales: 2840000,
    ordersCount: 84,
    inventoryUnits: 65,
    performance: "98.5% Client Satisfaction",
    hours: "10:00 AM – 09:00 PM (Daily)",
    activeQuotationsCount: 14
  },
  {
    id: "shw-02",
    name: "Hyderabad Jubilee Hills Palace",
    location: "Road No. 36, Jubilee Hills, Hyderabad - 500033",
    manager: "Hari Deshmukh",
    email: "hari.jubileehills@gmail.com",
    phone: "+91 98220 56789",
    sales: 1980000,
    ordersCount: 52,
    inventoryUnits: 48,
    performance: "97.2% Client Satisfaction",
    hours: "10:30 AM – 09:30 PM (Daily)",
    activeQuotationsCount: 9
  },
  {
    id: "shw-03",
    name: "Bengaluru Indiranagar Pavilion",
    location: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru - 560038",
    manager: "Hari Nambiar",
    email: "hari.bengaluru@gmail.com",
    phone: "+91 98800 44332",
    sales: 2450000,
    ordersCount: 68,
    inventoryUnits: 55,
    performance: "96.8% Client Satisfaction",
    hours: "10:00 AM – 09:00 PM (Daily)",
    activeQuotationsCount: 12
  }
];

// Master Supplier Entities (Score 0-100) with Backup Rankings
const LUXURY_SUPPLIERS = [
  {
    id: "sup-01",
    name: "Nilambur Palace Teak Guild",
    location: "Nilambur, Kerala",
    contactPerson: "Hari Menon",
    email: "hari.teakguild@gmail.com",
    phone: "+91 98470 11223",
    totalOrders: 342,
    pendingOrders: 14,
    completedOrders: 322,
    delayedOrders: 6,
    trustScore: 94, // Supplier Royalty Score 94/100
    metrics: {
      onTimeDelivery: "97.2%",
      productQuality: "98.5%",
      orderAccuracy: "99.0%",
      responseTime: "1.2 hrs",
      delayRate: "1.8%",
      cancellationRate: "0.5%",
      reliability: "98.0%"
    },
    riskLevel: "LOW RISK 🟢",
    capacity: "120 Units / Month",
    backupSuppliers: [
      { name: "Royal Sheesham Artisans Guild", score: 91, priceDiff: "-5%", estDays: "6-8 Days" },
      { name: "Mysore Palace Hardwood Guild", score: 88, priceDiff: "+2%", estDays: "5-7 Days" }
    ]
  },
  {
    id: "sup-02",
    name: "Royal Sheesham Artisans Guild",
    location: "Jodhpur, Rajasthan",
    contactPerson: "Hari Rathore",
    email: "hari.sheesham@gmail.com",
    phone: "+91 94140 88776",
    totalOrders: 215,
    pendingOrders: 9,
    completedOrders: 198,
    delayedOrders: 8,
    trustScore: 91,
    metrics: {
      onTimeDelivery: "94.5%",
      productQuality: "96.8%",
      orderAccuracy: "97.5%",
      responseTime: "2.4 hrs",
      delayRate: "3.2%",
      cancellationRate: "1.2%",
      reliability: "95.0%"
    },
    riskLevel: "LOW RISK 🟢",
    capacity: "85 Units / Month",
    backupSuppliers: [
      { name: "Nilambur Palace Teak Guild", score: 94, priceDiff: "+5%", estDays: "5-7 Days" }
    ]
  },
  {
    id: "sup-03",
    name: "Bavaria Royal Oak Co.",
    location: "Pune Industrial Hub",
    contactPerson: "Hari Deshmukh",
    email: "hari.oak@gmail.com",
    phone: "+91 98220 33445",
    totalOrders: 184,
    pendingOrders: 18,
    completedOrders: 154,
    delayedOrders: 12,
    trustScore: 86,
    metrics: {
      onTimeDelivery: "89.0%",
      productQuality: "95.0%",
      orderAccuracy: "96.2%",
      responseTime: "3.8 hrs",
      delayRate: "5.5%",
      cancellationRate: "2.1%",
      reliability: "91.0%"
    },
    riskLevel: "MEDIUM RISK 🟡",
    capacity: "60 Units / Month",
    backupSuppliers: [
      { name: "Nilambur Palace Teak Guild", score: 94, priceDiff: "+8%", estDays: "5-7 Days" }
    ]
  }
];

// Master Customer List (for Admin)
const LUXURY_CUSTOMERS = [
  {
    id: "cust-01",
    name: "Hari",
    email: "hari@gmail.com",
    mobile: "+91 98765 43210",
    totalSpending: 245000,
    ordersCount: 4,
    membership: "GOLD",
    status: "Active Royal Member",
    address: "Palace Suite 402, Lotus Heights, Banjara Hills, Hyderabad",
    homeGenomeId: "HG-HARI-402"
  },
  {
    id: "cust-02",
    name: "Hari Verma",
    email: "hari.verma@gmail.com",
    mobile: "+91 98111 22334",
    totalSpending: 480000,
    ordersCount: 6,
    membership: "PLATINUM",
    status: "VIP Imperial Member",
    address: "Royal Villa 12, Jubilee Hills, Hyderabad",
    homeGenomeId: "HG-VERMA-012"
  }
];

// Live Orders with 8-Step Royal Journey Timeline & Digital Passport
const LUXURY_ORDERS = [
  {
    orderId: "ROYAL-ORD-88129",
    passportId: "FF-IMPERIAL-10245",
    dnaId: "FF-SF2048",
    customerName: "Hari",
    customerPhone: "+91 98765 43210",
    customerAddress: "Palace Suite 402, Lotus Heights, Banjara Hills, Hyderabad - 500034",
    showroomId: "shw-01",
    showroomName: "Hyderabad Gachibowli Flagship",
    orderDate: "28 August 2026",
    productName: "THE IMPERIAL SOFA",
    productId: "ff-101",
    productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    amount: 89999,
    paymentMethod: "Instant UPI (Verified)",
    paymentStatus: "Paid ✅",
    supplierId: "sup-01",
    supplierName: "Nilambur Palace Teak Guild",
    currentStage: "In Transit",
    stageIndex: 6, // 0 to 8
    orderStatus: "In Transit",
    deliveryStatus: "In Transit (White-Glove GPS)",
    estimatedDelivery: "01 September 2026 (5–7 Days)",
    currentLocation: "National Highway 44 Logistics Hub (Kurnool Corridor)",
    trackingLog: [
      { stage: "Order Confirmed", time: "28 Aug 10:30 AM", detail: "Royal charter confirmed and allocated to master guild." },
      { stage: "Supplier Processing", time: "28 Aug 12:00 PM", detail: "Raw Nilambur seasoned timber reserved in factory lot." },
      { stage: "Crafting", time: "28 Aug 03:00 PM", detail: "Seasoned Nilambur teak carving and 24K gold foil inlay applied." },
      { stage: "Quality Inspection", time: "29 Aug 11:00 AM", detail: "Solid timber resonance & velvet spill-proof test verified." },
      { stage: "Packed", time: "29 Aug 03:00 PM", detail: "Wrapped in 5-layer velvet foam & protective crating." },
      { stage: "Dispatched", time: "29 Aug 06:00 PM", detail: "Loaded on climate-controlled royal transport TS-09-UB-4421." },
      { stage: "In Transit", time: "30 Aug 09:00 AM", detail: "En route via express highway corridor. GPS tracking active." },
      { stage: "Arriving Soon", time: "Pending", detail: "Local master installation team will schedule room setup." },
      { stage: "Delivered", time: "Pending", detail: "Complimentary in-palace assembly & 10-Yr structural warranty activation." }
    ],
    aiDeliveryPrediction: {
      estimatedDays: "5–7 DAYS",
      delayRisk: "LOW",
      confidence: "93%",
      supplierReliability: "94%",
      inventoryAvailability: "90%",
      productionReadiness: "92%",
      distanceRisk: "Low (Express Highway Corridor)",
      historicalDelayRisk: "8%",
      recommendation: "Delivery is expected within the estimated window based on supplier performance, stock availability and historical delivery data."
    }
  },
  {
    orderId: "ROYAL-ORD-88130",
    passportId: "FF-SOVEREIGN-20491",
    dnaId: "FF-SD3091",
    customerName: "Maharaja S. Verma",
    customerPhone: "+91 98111 22334",
    customerAddress: "Royal Villa 12, Jubilee Hills, Hyderabad",
    showroomId: "shw-02",
    showroomName: "Hyderabad Jubilee Hills Palace",
    orderDate: "29 August 2026",
    productName: "THE SOVEREIGN DINING SUITE",
    productId: "ff-102",
    productImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80",
    quantity: 1,
    amount: 94999,
    paymentMethod: "Credit Card (HDFC 0% EMI)",
    paymentStatus: "Paid ✅",
    supplierId: "sup-02",
    supplierName: "Royal Sheesham Artisans Guild",
    currentStage: "Crafting",
    stageIndex: 2,
    orderStatus: "Crafting in Progress",
    deliveryStatus: "Under Crafting",
    estimatedDelivery: "04 September 2026 (5–7 Days)",
    currentLocation: "Jodhpur Master Artisan Facility",
    trackingLog: [
      { stage: "Order Confirmed", time: "29 Aug 09:00 AM", detail: "Charter verified." },
      { stage: "Supplier Processing", time: "29 Aug 11:30 AM", detail: "Live-edge slab allocated." },
      { stage: "Crafting", time: "29 Aug 04:00 PM", detail: "Resin sealing and brass base forging." }
    ],
    aiDeliveryPrediction: {
      estimatedDays: "5–7 DAYS",
      delayRisk: "LOW",
      confidence: "91%",
      supplierReliability: "91%",
      inventoryAvailability: "92%",
      productionReadiness: "85%",
      distanceRisk: "Low (Direct Rail Corridor)",
      historicalDelayRisk: "9%",
      recommendation: "Production is proceeding on schedule with high quality metrics."
    }
  }
];

// 6 Signature Collections
const ROYAL_COLLECTIONS_DATA = [
  {
    id: "col-imperial",
    title: "Imperial Collection",
    subtitle: "24K gold gilded seating and grand salon centerpieces.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    count: "18 Masterpieces",
    category: "Living Room"
  },
  {
    id: "col-royal-comfort",
    title: "Royal Comfort",
    subtitle: "Plush velvet wingback beds & ergonomic lounge seating.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    count: "14 Masterpieces",
    category: "Bedroom"
  },
  {
    id: "col-signature",
    title: "Signature Collection",
    subtitle: "Single-slab live-edge dining tables and brass architecture.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    count: "12 Masterpieces",
    category: "Dining"
  },
  {
    id: "col-heritage",
    title: "Heritage Collection",
    subtitle: "Solid seasoned teak desks, cabinets & antique brass fittings.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    count: "16 Masterpieces",
    category: "Office"
  },
  {
    id: "col-modern-royal",
    title: "Modern Royal",
    subtitle: "Curved contemporary silhouettes draped in textured bouclé.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    count: "10 Masterpieces",
    category: "Living Room"
  },
  {
    id: "col-classic-wood",
    title: "Classic Wood Collection",
    subtitle: "Timeless handcrafted hardwood tables, consoles & bookcases.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    count: "15 Masterpieces",
    category: "Storage"
  }
];

// Royal Privileges Offers
const LUXURY_COUPONS = [
  {
    code: "ROYAL15",
    discountPercent: 15,
    minOrder: 50000,
    title: "The Sovereign Privilege",
    description: "An exclusive 15% privilege on all handcrafted Teak, Sheesham & Oak collections.",
    badge: "ROYAL INVITATION",
    validity: "Valid for Royal Circle Members"
  },
  {
    code: "FESTIVAL25",
    discountPercent: 25,
    minOrder: 100000,
    title: "Palace Festival Privilege",
    description: "25% privilege savings on complete signature dining suites and king bedroom sets.",
    badge: "FESTIVAL EXCLUSIVE",
    validity: "Grand Festive Celebration"
  },
  {
    code: "WELCOME500",
    fixedDiscount: 5000,
    minOrder: 40000,
    title: "Royal Welcome Privilege",
    description: "Instant ₹5,000 credit on your inaugural masterpiece acquisition.",
    badge: "NEW CUSTOMER CHARTER",
    validity: "Inaugural Purchase"
  }
];

// Royal Circle Membership Tiers
const MEMBERSHIP_TIERS = [
  {
    tier: "SILVER",
    title: "Classic Member",
    icon: "🥉",
    cashbackPercent: 2,
    spendRange: "₹0 – ₹99,999",
    color: "from-slate-400 to-stone-300",
    perks: [
      "2% Royal Points Cashback on all collections",
      "Complimentary White-Glove In-Home Delivery",
      "Annual Timber Nourishing Care Kit",
      "Dedicated Customer Support"
    ]
  },
  {
    tier: "GOLD",
    title: "Royal Member",
    icon: "🥇",
    cashbackPercent: 5,
    spendRange: "₹1,00,000 – ₹2,99,999",
    color: "from-amber-400 via-yellow-500 to-amber-600",
    perks: [
      "5% Royal Points Cashback on all collections",
      "Priority Master Artisan Assembly Service",
      "Private Previews of Limited Palace Editions",
      "24/7 Private Royal Concierge Line",
      "Complimentary 3D Room Visualizer Consultations"
    ]
  },
  {
    tier: "PLATINUM",
    title: "Imperial Member",
    icon: "💎",
    cashbackPercent: 7,
    spendRange: "₹3,00,000+",
    color: "from-purple-300 via-amber-300 to-yellow-400",
    perks: [
      "7% Royal Points Cashback on all collections",
      "Bespoke 1-of-1 Custom Woodcraft Carving by Master Sculptors",
      "Complimentary Lifetime Annual Wood Restaining & Polish",
      "Dedicated Personal Palace Interior Architect",
      "Zero-Delay Guarantee with Immediate Replacement"
    ]
  }
];

// 🔮 18. AI DEMAND FORECAST DATA
const AI_DEMAND_FORECASTS = [
  {
    category: "Living Room Suites",
    trendingItem: "The Imperial Sofa",
    forecastChange: "+46% Expected Demand",
    stockStatus: "Low Reserve (3 units)",
    action: "Increase factory stock order by 25 units from Nilambur Guild."
  },
  {
    category: "Signature Dining",
    trendingItem: "The Sovereign Dining Suite",
    forecastChange: "+28% Festive Demand",
    stockStatus: "Moderate (6 units)",
    action: "Reserve 15 live-edge Sheesham timber slabs in Jodhpur facility."
  },
  {
    category: "Grand Bedroom",
    trendingItem: "The Majesty King Bed",
    forecastChange: "+34% Wedding Season Demand",
    stockStatus: "Critical (4 units)",
    action: "Dispatch 10 pre-assembled hydraulic foundations to Hyderabad Depot."
  }
];

// 📚 14. PERSONALIZED CARE LIBRARY DATA
const CARE_LIBRARY_DATA = [
  {
    category: "Fabric & Velvet",
    icon: "🛋️",
    title: "Royal Velvet & Teddy Bouclé Care",
    guide: "Vacuum weekly with a soft upholstery brush attachment in the direction of the nap. For light liquid spills, blot immediately with a clean, dry microfiber cloth—never rub or scrub. Use foam-based pH-balanced upholstery cleaner."
  },
  {
    category: "Hardwood & Teak",
    icon: "🪵",
    title: "Kiln-Dried Solid Teak & Sheesham Care",
    guide: "Dust regularly with a dry micro-fiber cloth. Avoid placing hot cups directly without coasters (use thermal trivets above 70°C). Nourish with organic beeswax balm once annually to maintain amber grain luster."
  },
  {
    category: "Italian Marble & Stone",
    icon: "🏛️",
    title: "Carrara & Travertine Marble Care",
    guide: "Clean with mild pH-neutral stone soap and warm water. Wipe acidic spills (lemon, vinegar, wine) immediately to prevent surface etching on polished sealant. Reseal with penetrating fluoropolymer once every 24 months."
  },
  {
    category: "Saddle Leather",
    icon: "💼",
    title: "Tuscan Grain Leather Care",
    guide: "Keep leather furniture away from direct unshaded heating ducts. Condition quarterly with beeswax-lanolin leather cream to prevent grain drying and maintain supple flexibility."
  },
  {
    category: "Hydraulics & Hardware",
    icon: "⚙️",
    title: "German Hydraulic & Brass Hardware",
    guide: "Gas pistons are sealed for 15,000 cycles and require zero oiling. Ensure symmetric double-handed lifting. Wipe antique gold and forged brass pulls with dry flannel to prevent tarnish."
  }
];

// 📅 SMART CARE CALENDAR DATA
const INITIAL_CARE_CALENDAR = [
  {
    id: "cal-1",
    month: "SEPTEMBER 2026",
    title: "Velvet Nap Brushing & Spill Guard Refresh",
    furniture: "The Imperial Sofa (FF-SF2048)",
    type: "🧼 Recommended Care",
    date: "15 Sep 2026",
    status: "Upcoming"
  },
  {
    id: "cal-2",
    month: "DECEMBER 2026",
    title: "Annual Teak & Sheesham Organic Beeswax Balm Treatment",
    furniture: "The Sovereign Dining Suite (FF-SD3091)",
    type: "🛠️ Maintenance Reminder",
    date: "10 Dec 2026",
    status: "Scheduled"
  },
  {
    id: "cal-3",
    month: "JUNE 2027",
    title: "Annual Structural Warranty & Piston Inspection Milestone",
    furniture: "The Majesty King Bed (FF-MB4012)",
    type: "🛡️ Warranty Milestone",
    date: "15 Jun 2027",
    status: "Milestone"
  }
];

// 🔧 INITIAL SERVICE REQUESTS (TICKETS)
const INITIAL_SERVICE_REQUESTS = [
  {
    ticketId: "FC-2048",
    dnaId: "FF-SF2048",
    furnitureName: "The Imperial Sofa",
    issueType: "Fabric Concern",
    description: "Minor mineral water ring mark on right armrest velvet.",
    date: "29 Aug 2026",
    status: "UNDER REVIEW",
    stepIndex: 1, // 0: Submitted, 1: Reviewed, 2: Assigned, 3: Scheduled, 4: Completed
    estimatedAppointment: "02 Sep 2026 (Master Artisan Visit)",
    technician: "Ramesh Sen (Senior Timber & Velvet Conservator)"
  }
];

// Smart Multi-Category Notifications (Customer, Showroom, Supplier, Admin)
const SMART_NOTIFICATIONS = [
  {
    id: "notif-c1",
    category: "customer",
    title: "ROYAL DELIVERY UPDATE",
    message: "Your Imperial Sofa #ROYAL-ORD-88129 has been dispatched via white-glove transport and is in transit.",
    time: "15 mins ago",
    unread: true
  },
  {
    id: "notif-c2",
    category: "customer",
    title: "HOME GENOME ALERT",
    message: "New empty space opportunity discovered in Grand Royal Salon (1.8m × 1.2m). Space util can reach 88%.",
    time: "30 mins ago",
    unread: true
  },
  {
    id: "notif-sh1",
    category: "showroom",
    title: "NEW SHOWROOM DESIGN QUOTATION",
    message: "Quotation #QT-8821 for ₹1,84,998 created by Gachibowli Showroom staff.",
    time: "45 mins ago",
    unread: true
  },
  {
    id: "notif-s1",
    category: "supplier",
    title: "NEW COMMISSION ORDER",
    message: "New purchase order #PO-9821 allocated for 2 units of The Sovereign Dining Suite.",
    time: "1 hr ago",
    unread: true
  },
  {
    id: "notif-a1",
    category: "admin",
    title: "AI PREVENTION ALERT",
    message: "Low Stock Reserve: Only 3 Imperial Sofas remain in the palace vault. Automated PO suggested.",
    time: "3 hrs ago",
    unread: true
  }
];

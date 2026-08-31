/**
 * 👑 FRIENDS FURNITURE — FURNITURE DIGITAL TWIN & LIFE PASSPORT MASTER DATA ENGINE
 * Provides permanent cryptographic digital identity, 10-stage lifecycle journey,
 * AI condition telemetry, spatial entry evaluation, and circular economy intelligence.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FurniturePassportDB = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {

  const STORAGE_KEY = "FF_FURNITURE_PASSPORTS_V1";

  const INITIAL_PASSPORTS = [
    {
      id: "FF-2026-00125",
      legacyDna: "FF-SF2048",
      name: "The Imperial Royal 3-Seater Palace Sofa",
      category: "Living Room Furniture",
      subcategory: "Luxury Sofa Sets",
      modelNumber: "IMP-SF-2026-X9",
      serialNumber: "SN-99482014-IND",
      tagline: "Hand-carved Nilambur seasoned teak adorned with 24K gold foil and emerald silk velvet.",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      ],
      price: 89999,
      originalMSRP: 114999,
      manufacturingDate: "2026-06-15",
      deliveryDate: "2026-07-28",
      registeredOwner: "Maharaja Hari",
      residenceLocation: "Lotus Palace Villa, Grand Salon (Chamber 1), Hyderabad, IN",
      
      specifications: {
        dimensions: {
          widthInches: 88,
          depthInches: 38,
          heightInches: 34,
          weightKg: 78,
          seatHeightInches: 19,
          seatDepthInches: 24
        },
        materials: {
          frame: "Grade-A Seasoned Nilambur Teak (100% FSC Certified)",
          upholstery: "Imperial Emerald Royal Velvet (Martindale 65,000 Rubs)",
          cushioning: "High-Resilience Multi-Density Organic Foam with Pocket Coils",
          accents: "24K Hand-Embossed Gold Leaf Sabots & Solid Brass Castors",
          finish: "Natural Herbal Organic Beeswax & Hand-Rubbed Shellac"
        },
        provenance: {
          timberHarvestLot: "LOT-TEAK-88-NILAMBUR",
          guildMaster: "Master Artisan K. Ramanathan (42 Yrs Guild Heritage)",
          workshopLocation: "Royal Heritage Teak Atelier, Kerala, India",
          carbonOffsetCredits: "420 kg CO2 absorbed (Net-Negative Timber Sourcing)"
        }
      },

      conditionScore: 94,
      conditionBreakdown: {
        structuralFrame: 98,
        joineryIntegrity: 96,
        surfacePolish: 92,
        fabricUpholstery: 91,
        cushionResilience: 93
      },
      conditionLabel: "Excellent Palace Condition",
      conditionNotes: "Frame shows pristine dimensional stability. Fabric velvet nap uniform with zero UV fading.",

      lifePrediction: {
        estimatedRemainingLifeYears: "22–26 Years",
        predictedLifespanTotalYears: 30,
        ageMonths: 2,
        decayRisk: "Ultra Low (< 2% per decade)",
        explanation: "Nilambur teak combined with heavy-gauge mortise-and-tenon joints delivers heirloom longevity exceeding modern commercial standards.",
        lifeExtensionTips: "Bi-annual organic beeswax balm application extends finish luster by an additional 6–8 years."
      },

      smartMaintenance: {
        nextRecommendedDate: "2026-10-15",
        daysRemaining: 46,
        recommendedAction: "Organic Beeswax Nourishing & Velvet Deep-Nap Steam Condition",
        reason: "Seasonal dry-weather hydration cycle to protect natural timber grain elasticity.",
        estimatedCost: 1450,
        serviceStatus: "Scheduled Reminder"
      },

      warranty: {
        status: "ACTIVE",
        periodMonths: 120,
        startDate: "2026-07-28",
        expiryDate: "2036-07-28",
        warrantyCertificateId: "DOC-WRT-2026-99014",
        blockchainHash: "0x8f2d99c4b71e8a01ff394025da2c8b0914e7a",
        covered: [
          "Solid teak frame structural cracking or warping",
          "Mortise & tenon joinery looseness",
          "Internal coil suspension failure",
          "24K gold foil embellishment debonding",
          "Complimentary annual artisan health checkups"
        ],
        notCovered: [
          "Intentional fabric cuts or commercial pet claw tears",
          "Flood or external liquid immersion damage",
          "Unauthorized third-party chemical cleaners"
        ]
      },

      serviceHistory: [
        {
          id: "SRV-2026-01",
          date: "2026-07-28",
          type: "Pre-Installation White-Glove Conditioning",
          provider: "Friends Furniture Royal Guild Care",
          technician: "Lead Craftsman V. Sharma (ID #TECH-402)",
          cost: 0,
          notes: "Initial frame balancing and micro-fiber protective glaze sealed upon delivery.",
          status: "Passed Inspection ✓"
        },
        {
          id: "SRV-2026-02",
          date: "2026-08-15",
          type: "30-Day Settling & Cushion Inspection",
          provider: "Friends Furniture Care Team",
          technician: "Artisan M. Qureshi (ID #TECH-118)",
          cost: 0,
          notes: "Tension check on spring webbing passed with 100% elasticity index.",
          status: "Passed Inspection ✓"
        }
      ],

      resalePrediction: {
        originalPurchasePrice: 89999,
        currentEstimatedValue: 84500,
        estimatedResaleRange: "₹82,000 – ₹86,000",
        instantTradeInValue: 76000,
        depreciationRatePerYear: "3.2% (Appreciates due to seasoned teak scarcity)",
        factors: [
          { name: "Material Sourcing (Nilambur Teak)", impact: "+12% Value Retention" },
          { name: "Verified Service History", impact: "+8% Value Bonus" },
          { name: "Active 10-Year Guild Warranty", impact: "+10% Resale Liquidity" },
          { name: "Age (< 6 months)", impact: "Minimal Initial Depreciation" }
        ]
      },

      circularEconomy: {
        circularScore: 92,
        repairabilityIndex: 96,
        reusabilityIndex: 94,
        recyclabilityIndex: 88,
        materialRecoveryPotential: "98% (Biodegradable Timber & Recyclable Brass)",
        carbonFootprintSavedKg: 310
      },

      secondLifePathways: [
        {
          step: 1,
          title: "Primary Palace Heirloom",
          timeframe: "Years 0–15",
          description: "Centerpiece luxury living room sanctuary sofa."
        },
        {
          step: 2,
          title: "Re-Upholstered Private Salon Lounge",
          timeframe: "Years 15–25",
          description: "Simple single-day guild re-skinning with new jacquard or boucle fabrics."
        },
        {
          step: 3,
          title: "Heritage Club & Study Seating",
          timeframe: "Years 25–40",
          description: "Solid timber frame repurposed as bespoke reading club suite."
        },
        {
          step: 4,
          title: "Architectural Wood Salvage & Upcycling",
          timeframe: "Years 40+",
          description: "High-density seasoned teak recovered for custom palace wall paneling."
        },
        {
          step: 5,
          title: "100% Bio-Circular Soil Return",
          timeframe: "End of Lifecycle",
          description: "Zero synthetic landfill waste; metals smelted, teak bio-degraded."
        }
      ],

      journey: [
        {
          stage: "Manufactured",
          title: "Timber Milling & Artisan Carving",
          date: "2026-06-15",
          location: "Nilambur Heritage Atelier, Kerala",
          entity: "Master Carver K. Ramanathan Guild",
          status: "Completed",
          notes: "Kiln-dried to 8.2% moisture content. Mortise and tenon joints hand-locked with brass dowels.",
          verified: true
        },
        {
          stage: "Quality Checked",
          title: "100-Point Palace Acoustic & Load Testing",
          date: "2026-06-22",
          location: "QC Lab #3, Nilambur Center",
          entity: "Guild Inspector Dr. A. Pillai",
          status: "Completed",
          notes: "300kg dynamic load tested for 50,000 cycles. Zero deflection detected. QC Stamp #QC-PASS-9904.",
          verified: true
        },
        {
          stage: "Supplier Dispatched",
          title: "Sealed Transit Packaging",
          date: "2026-06-28",
          location: "Nilambur Logistics Hub",
          entity: "Royal Express Teak Transit",
          status: "Completed",
          notes: "Wrapped in 5-layer breathable organic cotton padding with moisture-wicking silica barriers.",
          verified: true
        },
        {
          stage: "Warehouse Hub",
          title: "Palace Vault Reception",
          date: "2026-07-04",
          location: "Friends Furniture Central Vault, Hyderabad",
          entity: "Inventory Master S. Kulkarni",
          status: "Completed",
          notes: "Barcoded into Central Vault Zone A-14. Climate maintained at 24°C / 45% RH.",
          verified: true
        },
        {
          stage: "Dispatched",
          title: "White-Glove Fleet Departure",
          date: "2026-07-28 08:30 AM",
          location: "Central Vault Dispatch Bay 2",
          entity: "Specialist Fleet #TS-09-UB-4421",
          status: "Completed",
          notes: "Assigned to Senior Installation Lead Vikram & Assistant.",
          verified: true
        },
        {
          stage: "In Transit",
          title: "GPS-Monitored Corridor Express",
          date: "2026-07-28 10:15 AM",
          location: "NH-44 Express Corridor, Hyderabad",
          entity: "Fleet TS-09-UB-4421",
          status: "Completed",
          notes: "Smooth transit telemetry. Shock sensor recorded 0.02G (optimal smooth ride).",
          verified: true
        },
        {
          stage: "Delivered",
          title: "White-Glove Home Arrival",
          date: "2026-07-28 11:30 AM",
          location: "Lotus Palace Villa, Hyderabad",
          entity: "Senior Technician Vikram",
          status: "Completed",
          notes: "Unboxed in-room using lint-free cotton gloves. Customer verified pristine condition.",
          verified: true
        },
        {
          stage: "Installed",
          title: "Chamber Leveling & Felt Base Glides",
          date: "2026-07-28 12:15 PM",
          location: "Grand Salon, Lotus Heights",
          entity: "Artisan Installation Guild",
          status: "Completed",
          notes: "Calibrated on Italian marble flooring with non-marking silicone-brass glide sabots.",
          verified: true
        },
        {
          stage: "Serviced",
          title: "30-Day Guild Health Verification",
          date: "2026-08-15",
          location: "Lotus Palace Villa",
          entity: "Friends Furniture Care Guild",
          status: "Completed",
          notes: "Tension and fabric check performed. Condition certified at 94/100.",
          verified: true
        },
        {
          stage: "Active Warranty",
          title: "10-Year Active Protection Ledger",
          date: "Present — 2036",
          location: "Digital Warranty Cloud & Decentralized Ledger",
          entity: "Friends Furniture Warranty Vault",
          status: "Active (Year 1 of 10)",
          notes: "Full comprehensive coverage active. 24/7 priority concierge support available.",
          verified: true
        },
        {
          stage: "Circular Resale / Upcycling",
          title: "Future Guaranteed Buyback & Second Life",
          date: "Projected 2046+",
          location: "Friends Furniture Circular Hub",
          entity: "Heirloom Upcycling Guild",
          status: "Eligible for Trade-In",
          notes: "Guaranteed minimum 30% buyback residual value guaranteed for life.",
          verified: false
        }
      ],

      supplier: {
        id: "SUP-NLB-001",
        name: "Nilambur Heritage Teak Guild Co-op",
        location: "Malappuram District, Kerala",
        established: 1974,
        sustainabilityRating: "A+ (Zero Deforestation Policy)",
        reliabilityScore: 98.4,
        onTimeDeliveryRate: "99.1%",
        qualityPassRate: "99.8%",
        totalSuppliedPieces: 3450,
        averageDelayMinutes: 4.2
      },

      deliveryReadiness: {
        score: 100,
        status: "DELIVERED & VERIFIED",
        checklist: [
          { item: "Product Stock Reserved in Vault", passed: true },
          { item: "100-Point Guild QC Passed", passed: true },
          { item: "Organic 5-Layer Sealed Packaging", passed: true },
          { item: "Delivery GPS Coordinates Verified", passed: true },
          { item: "Doorway Dimensions Pre-Cleared (36\" Clear Opening)", passed: true },
          { item: "White-Glove Master Team Allocated", passed: true },
          { item: "Air-Suspension Vehicle Assigned", passed: true }
        ]
      }
    },

    {
      id: "FF-2026-00126",
      legacyDna: "FF-SD3091",
      name: "The Sovereign 8-Seater Imperial Dining Suite",
      category: "Dining Room Furniture",
      subcategory: "8-Seater Dining Sets",
      modelNumber: "SOV-DN-2026-D8",
      serialNumber: "SN-7721094-IND",
      tagline: "Solid 4-inch seasoned teak dining table with 8 hand-tufted imperial chairs.",
      imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1533779283484-84e14c8e7093?auto=format&fit=crop&w=800&q=80"
      ],
      price: 145000,
      originalMSRP: 185000,
      manufacturingDate: "2026-05-10",
      deliveryDate: "2026-06-20",
      registeredOwner: "Maharaja Hari",
      residenceLocation: "Lotus Palace Villa, Banquet Hall (Chamber 2), Hyderabad, IN",

      specifications: {
        dimensions: {
          widthInches: 96,
          depthInches: 44,
          heightInches: 30,
          weightKg: 140,
          seatHeightInches: 18.5,
          seatDepthInches: 20
        },
        materials: {
          frame: "Monolithic Seasoned Nilambur Teak Planks",
          upholstery: "Spill-Proof Royal Jacquard & Gold Piping",
          cushioning: "High-Density Organic Latex",
          accents: "Brushed Solid Champagne Brass Inlay",
          finish: "Water-Resistant Marine-Grade Poly-Wax Seal"
        },
        provenance: {
          timberHarvestLot: "LOT-TEAK-72-WAYANAD",
          guildMaster: "Master Woodsmith B. Nambiar",
          workshopLocation: "Wayanad Forest Guild, Kerala",
          carbonOffsetCredits: "580 kg CO2 absorbed"
        }
      },

      conditionScore: 96,
      conditionBreakdown: {
        structuralFrame: 99,
        joineryIntegrity: 98,
        surfacePolish: 95,
        fabricUpholstery: 94,
        cushionResilience: 96
      },
      conditionLabel: "Pristine Heirloom Condition",
      conditionNotes: "Table surface protected with nano-ceramic invisible coat. Chairs firm and balanced.",

      lifePrediction: {
        estimatedRemainingLifeYears: "35–40 Years",
        predictedLifespanTotalYears: 50,
        ageMonths: 3,
        decayRisk: "Negligible",
        explanation: "Monolithic 4-inch teak planks with natural oils provide multi-generational durability.",
        lifeExtensionTips: "Wipe with organic wood oil twice annually to maintain rich amber patination."
      },

      smartMaintenance: {
        nextRecommendedDate: "2026-12-10",
        daysRemaining: 102,
        recommendedAction: "Micro-Crystal Topcoat Buffing & Brass Trim Luster Polish",
        reason: "Routine semi-annual banquet table protective conditioning.",
        estimatedCost: 2200,
        serviceStatus: "Scheduled Reminder"
      },

      warranty: {
        status: "ACTIVE",
        periodMonths: 180,
        startDate: "2026-06-20",
        expiryDate: "2041-06-20",
        warrantyCertificateId: "DOC-WRT-2026-88192",
        blockchainHash: "0x3a4b910fc8e12b77dd1849102c91834b9281a",
        covered: [
          "Tabletop timber split, delamination, or warping",
          "Chair structural joints & tenons",
          "Brass inlay loosening",
          "Free annual table surface polish"
        ],
        notCovered: [
          "Direct burns from naked flames/charcoal without trivets",
          "Severe acid or bleach chemical spills"
        ]
      },

      serviceHistory: [
        {
          id: "SRV-2026-10",
          date: "2026-06-20",
          type: "Installation & Surface Hydrophobic Coating",
          provider: "Friends Furniture Care Guild",
          technician: "Lead Tech R. Desai",
          cost: 0,
          notes: "Installed with brass leveling feet. Applied nano hydrophobic surface seal.",
          status: "Passed Inspection ✓"
        }
      ],

      resalePrediction: {
        originalPurchasePrice: 145000,
        currentEstimatedValue: 142000,
        estimatedResaleRange: "₹1,38,000 – ₹1,45,000",
        instantTradeInValue: 128000,
        depreciationRatePerYear: "1.8% (Rare large-slab teak appreciates in value)",
        factors: [
          { name: "Monolithic Slab Teak Rarity", impact: "+18% Value Appreciation" },
          { name: "Complete 8-Chair Matching Set", impact: "+10% Collector Demand" }
        ]
      },

      circularEconomy: {
        circularScore: 95,
        repairabilityIndex: 98,
        reusabilityIndex: 97,
        recyclabilityIndex: 92,
        materialRecoveryPotential: "100% (Solid Natural Timber)",
        carbonFootprintSavedKg: 620
      },

      secondLifePathways: [
        { step: 1, title: "Grand Banquet Dining Suite", timeframe: "Years 0–25", description: "Primary state dining suite." },
        { step: 2, title: "Executive Conference Table", timeframe: "Years 25–45", description: "Repurposed into luxury boardroom table." },
        { step: 3, title: "Artisan Heritage Furniture", timeframe: "Years 45+", description: "Antique auction collector tier." }
      ],

      journey: [
        { stage: "Manufactured", title: "Single Slab Plank Shaping", date: "2026-05-10", location: "Wayanad Forest Atelier", entity: "Woodsmith B. Nambiar", status: "Completed", notes: "Aged teak slab planed to exact 4.00\" thickness.", verified: true },
        { stage: "Quality Checked", title: "Deflection & Moisture Cert", date: "2026-05-18", location: "QC Center Wayanad", entity: "Inspector S. Menon", status: "Completed", notes: "Moisture 7.9%. Zero warp.", verified: true },
        { stage: "Delivered", title: "Palace Assembly", date: "2026-06-20", location: "Lotus Palace Banquet Hall", entity: "White Glove Team 1", status: "Completed", notes: "Installed with level laser calibration.", verified: true },
        { stage: "Active Warranty", title: "15-Year Active Vault", date: "Present — 2041", location: "Digital Vault", entity: "Friends Furniture", status: "Active", notes: "Fully protected.", verified: true }
      ],

      supplier: {
        id: "SUP-WND-002",
        name: "Wayanad Eco-Forestry Woodcraft Guild",
        location: "Wayanad, Kerala",
        established: 1982,
        sustainabilityRating: "A+ Organic Harvest",
        reliabilityScore: 99.2,
        onTimeDeliveryRate: "98.8%",
        qualityPassRate: "100%",
        totalSuppliedPieces: 1890,
        averageDelayMinutes: 2.1
      },

      deliveryReadiness: {
        score: 100,
        status: "DELIVERED & VERIFIED",
        checklist: [
          { item: "Slab Grain QC Approved", passed: true },
          { item: "8-Chair Matching Batch Verified", passed: true },
          { item: "Double Door Access Cleared (42\" Minimum)", passed: true }
        ]
      }
    },

    {
      id: "FF-2026-00127",
      legacyDna: "FF-MB4012",
      name: "The Majesty King-Size Heritage Canopy Bed",
      category: "Bedroom Furniture",
      subcategory: "King-size Beds",
      modelNumber: "MAJ-KB-2026-K1",
      serialNumber: "SN-5510293-IND",
      tagline: "Solid teak four-poster canopy with orthopaedic dual-zone latex mattress support.",
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=800&q=80"
      ],
      price: 119999,
      originalMSRP: 155000,
      manufacturingDate: "2026-06-01",
      deliveryDate: "2026-07-12",
      registeredOwner: "Maharaja Hari",
      residenceLocation: "Lotus Palace Villa, Master Heritage Suite (Chamber 3), Hyderabad, IN",

      specifications: {
        dimensions: {
          widthInches: 82,
          depthInches: 88,
          heightInches: 84,
          weightKg: 125,
          headboardHeightInches: 62
        },
        materials: {
          frame: "Solid Nilambur Teak with Fluted Pillars",
          headboard: "Button-Tufted Pure Silk Velvet Cushioning",
          slatSystem: "Zero-Squeak German Engineered Birch Sprung Slats",
          accents: "Brushed Brass Finials and Inlaid Crest",
          finish: "Herbal Nut-Oil Satin Polish"
        },
        provenance: {
          timberHarvestLot: "LOT-TEAK-88-NILAMBUR",
          guildMaster: "Master Carver K. Ramanathan",
          workshopLocation: "Nilambur Master Atelier, Kerala",
          carbonOffsetCredits: "490 kg CO2 absorbed"
        }
      },

      conditionScore: 92,
      conditionBreakdown: {
        structuralFrame: 97,
        joineryIntegrity: 95,
        surfacePolish: 90,
        fabricUpholstery: 89,
        cushionResilience: 92
      },
      conditionLabel: "Superb Condition",
      conditionNotes: "Bedframe rigid and completely squeak-free. Headboard velvet pristine.",

      lifePrediction: {
        estimatedRemainingLifeYears: "28–32 Years",
        predictedLifespanTotalYears: 35,
        ageMonths: 2,
        decayRisk: "Very Low",
        explanation: "Modular bolt-locked canopy architecture distributes dynamic mattress load effortlessly.",
        lifeExtensionTips: "Torque check canopy corner lock screws annually."
      },

      smartMaintenance: {
        nextRecommendedDate: "2026-11-20",
        daysRemaining: 82,
        recommendedAction: "Acoustic Slat Tension Alignment & Headboard Velvet Sanitization",
        reason: "Preventive slat suspension balance check.",
        estimatedCost: 1100,
        serviceStatus: "Scheduled Reminder"
      },

      warranty: {
        status: "ACTIVE",
        periodMonths: 120,
        startDate: "2026-07-12",
        expiryDate: "2036-07-12",
        warrantyCertificateId: "DOC-WRT-2026-77312",
        blockchainHash: "0x7c91e4b8a2110c94812dd90214a1e948120b",
        covered: [
          "Canopy pillar cracking and joint separation",
          "Birch spring slat breakage",
          "Headboard structural frame integrity"
        ],
        notCovered: [
          "Cosmetic fabric discoloration from direct sunlight exposure"
        ]
      },

      serviceHistory: [
        {
          id: "SRV-2026-21",
          date: "2026-07-12",
          type: "Laser-Calibrated In-Room Assembly",
          provider: "Friends Furniture White-Glove",
          technician: "Vikram & M. Qureshi",
          cost: 0,
          notes: "Assembled and leveled. Squeak test: 0 dB noise.",
          status: "Passed Inspection ✓"
        }
      ],

      resalePrediction: {
        originalPurchasePrice: 119999,
        currentEstimatedValue: 112000,
        estimatedResaleRange: "₹1,08,000 – ₹1,15,000",
        instantTradeInValue: 98000,
        depreciationRatePerYear: "2.8%",
        factors: [
          { name: "Canopy Design Timelessness", impact: "+10% Resale Appeal" },
          { name: "Solid Teak Construction", impact: "+15% Intrinsic Value" }
        ]
      },

      circularEconomy: {
        circularScore: 91,
        repairabilityIndex: 94,
        reusabilityIndex: 92,
        recyclabilityIndex: 89,
        materialRecoveryPotential: "96%",
        carbonFootprintSavedKg: 460
      },

      secondLifePathways: [
        { step: 1, title: "Master Suite Canopy Bed", timeframe: "Years 0–20", description: "Primary royal suite canopy bed." },
        { step: 2, title: "Modern Low-Profile Platform Bed", timeframe: "Years 20–35", description: "Removable canopy pillars convert bed into modern low platform frame." },
        { step: 3, title: "Reclaimed Wood Crafting", timeframe: "Years 35+", description: "Pillars repurposed into solid teak floor lamps and architectural balusters." }
      ],

      journey: [
        { stage: "Manufactured", title: "Canopy Pillar Turning", date: "2026-06-01", location: "Nilambur Atelier", entity: "Master Carver K. Ramanathan", status: "Completed", notes: "Hand turned fluted pillars.", verified: true },
        { stage: "Delivered", title: "Master Suite Setup", date: "2026-07-12", location: "Lotus Palace Villa", entity: "White-Glove Team", status: "Completed", notes: "Zero-squeak certified.", verified: true },
        { stage: "Active Warranty", title: "10-Year Active Protection", date: "Present — 2036", location: "Digital Vault", entity: "Friends Furniture", status: "Active", notes: "Active warranty.", verified: true }
      ],

      supplier: {
        id: "SUP-NLB-001",
        name: "Nilambur Heritage Teak Guild Co-op",
        location: "Malappuram, Kerala",
        established: 1974,
        sustainabilityRating: "A+",
        reliabilityScore: 98.4,
        onTimeDeliveryRate: "99.1%",
        qualityPassRate: "99.8%",
        totalSuppliedPieces: 3450,
        averageDelayMinutes: 4.2
      },

      deliveryReadiness: {
        score: 100,
        status: "DELIVERED & VERIFIED",
        checklist: [
          { item: "Pillars & Hardware Complete", passed: true },
          { item: "Ceiling Height Clearance Checked (> 8.5ft)", passed: true }
        ]
      }
    }
  ];

  class PassportManager {
    constructor() {
      this.passports = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn("Could not load from localStorage, using initial defaults:", e);
      }
      return INITIAL_PASSPORTS;
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.passports));
      } catch (e) {
        console.error("Failed to save to localStorage:", e);
      }
    }

    getAll() {
      return this.passports;
    }

    getById(id) {
      if (!id) return this.passports[0];
      const match = this.passports.find(p => 
        p.id.toLowerCase() === id.toLowerCase() || 
        (p.legacyDna && p.legacyDna.toLowerCase() === id.toLowerCase()) ||
        p.modelNumber.toLowerCase() === id.toLowerCase()
      );
      return match || this.passports[0];
    }

    mintPassport(data) {
      const count = this.passports.length + 125;
      const newId = `FF-2026-${String(count).padStart(5, '0')}`;
      
      const newPassport = {
        id: newId,
        legacyDna: data.legacyDna || `FF-DNA-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name || "Bespoke Palace Furniture Twin",
        category: data.category || "Living Room Furniture",
        subcategory: data.subcategory || "Custom Suite",
        modelNumber: data.modelNumber || `MOD-${Date.now().toString().slice(-6)}`,
        serialNumber: `SN-${Math.floor(1000000 + Math.random() * 9000000)}-IND`,
        tagline: data.tagline || "Artisan handcrafted luxury furniture with permanent digital identity.",
        imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        secondaryImages: [
          data.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
        ],
        price: Number(data.price) || 49999,
        originalMSRP: Number(data.price ? data.price * 1.25 : 62500),
        manufacturingDate: new Date().toISOString().split('T')[0],
        deliveryDate: data.deliveryDate || "Scheduled",
        registeredOwner: data.registeredOwner || "Maharaja Hari",
        residenceLocation: data.residenceLocation || "Lotus Palace Villa, Hyderabad, IN",
        
        specifications: {
          dimensions: {
            widthInches: Number(data.widthInches) || 60,
            depthInches: Number(data.depthInches) || 32,
            heightInches: Number(data.heightInches) || 30,
            weightKg: Number(data.weightKg) || 45
          },
          materials: {
            frame: data.materialFrame || "Seasoned Solid Nilambur Teak",
            upholstery: data.materialUpholstery || "Royal Velvet / Premium Linen",
            cushioning: "Multi-Density Organic Foam",
            accents: "24K Gold Foil / Solid Brass Trim",
            finish: "Herbal Beeswax Seal"
          },
          provenance: {
            timberHarvestLot: `LOT-TEAK-${Math.floor(10 + Math.random() * 90)}-HERITAGE`,
            guildMaster: data.guildMaster || "Master Artisan Guild Lead",
            workshopLocation: "Nilambur Master Atelier, Kerala",
            carbonOffsetCredits: "350 kg CO2 absorbed"
          }
        },

        conditionScore: 98,
        conditionBreakdown: {
          structuralFrame: 100,
          joineryIntegrity: 100,
          surfacePolish: 98,
          fabricUpholstery: 96,
          cushionResilience: 98
        },
        conditionLabel: "Mint Palace Condition (Newly Minted)",
        conditionNotes: "Fresh from Master Atelier. Certified zero defects.",

        lifePrediction: {
          estimatedRemainingLifeYears: "25–30 Years",
          predictedLifespanTotalYears: 30,
          ageMonths: 0,
          decayRisk: "Negligible",
          explanation: "Premium solid hardwood craftsmanship engineered for multi-decade resilience.",
          lifeExtensionTips: "Follow standard seasonal hydration protocol."
        },

        smartMaintenance: {
          nextRecommendedDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
          daysRemaining: 90,
          recommendedAction: "Initial 90-Day Settling Check & Organic Wax Polish",
          reason: "Routine guild post-installation hydration inspection.",
          estimatedCost: 1200,
          serviceStatus: "Scheduled Reminder"
        },

        warranty: {
          status: "ACTIVE",
          periodMonths: Number(data.warrantyMonths) || 120,
          startDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + (Number(data.warrantyMonths) || 120) * 30 * 86400000).toISOString().split('T')[0],
          warrantyCertificateId: `DOC-WRT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          blockchainHash: `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
          covered: [
            "Solid wood frame structural integrity",
            "Hardware & joint mechanism support",
            "Free annual guild health check"
          ],
          notCovered: ["Intentional damage or chemical bleaching"]
        },

        serviceHistory: [
          {
            id: `SRV-${Date.now().toString().slice(-4)}`,
            date: new Date().toISOString().split('T')[0],
            type: "Digital Twin Minting & QC Certification",
            provider: "Friends Furniture Central Registry",
            technician: "Senior Guild Registrar",
            cost: 0,
            notes: "Digital passport created and NFC/QR identity cryptographic anchor generated.",
            status: "Passed Inspection ✓"
          }
        ],

        resalePrediction: {
          originalPurchasePrice: Number(data.price) || 49999,
          currentEstimatedValue: Number(data.price) || 49999,
          estimatedResaleRange: `₹${Math.round((data.price || 49999) * 0.9)} – ₹${Math.round((data.price || 49999) * 0.96)}`,
          instantTradeInValue: Math.round((data.price || 49999) * 0.85),
          depreciationRatePerYear: "2.5%",
          factors: [
            { name: "Verified Authenticity Certificate", impact: "+10% Resale Guarantee" }
          ]
        },

        circularEconomy: {
          circularScore: 90,
          repairabilityIndex: 95,
          reusabilityIndex: 92,
          recyclabilityIndex: 90,
          materialRecoveryPotential: "96%",
          carbonFootprintSavedKg: 280
        },

        secondLifePathways: [
          { step: 1, title: "Primary Chamber Heirloom", timeframe: "Years 0–15", description: "Primary state room furniture." },
          { step: 2, title: "Refurbished Suite", timeframe: "Years 15–30", description: "Easily re-stained and re-cushioned." }
        ],

        journey: [
          {
            stage: "Manufactured",
            title: "Guild Carving & Assembly",
            date: new Date().toISOString().split('T')[0],
            location: "Friends Furniture Atelier",
            entity: data.supplierName || "Nilambur Teak Guild",
            status: "Completed",
            notes: "Handcrafted and inspected.",
            verified: true
          },
          {
            stage: "Quality Checked",
            title: "Acoustic & Joint Certification",
            date: new Date().toISOString().split('T')[0],
            location: "Central QC Hub",
            entity: "Guild Lead Inspector",
            status: "Completed",
            notes: "100-Point inspection passed with 0 defects.",
            verified: true
          },
          {
            stage: "Active Warranty",
            title: "Digital Life Passport Live",
            date: "Active",
            location: "Palace Registry Cloud",
            entity: "Friends Furniture",
            status: "Active",
            notes: "QR code generated and registered in global database.",
            verified: true
          }
        ],

        supplier: {
          id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
          name: data.supplierName || "Nilambur Heritage Teak Guild Co-op",
          location: "Kerala, India",
          established: 1985,
          sustainabilityRating: "A+ Verified",
          reliabilityScore: 98.6,
          onTimeDeliveryRate: "99.0%",
          qualityPassRate: "99.9%",
          totalSuppliedPieces: 1200,
          averageDelayMinutes: 3.5
        },

        deliveryReadiness: {
          score: 95,
          status: "READY FOR WHITE-GLOVE DISPATCH",
          checklist: [
            { item: "Product Stock Reserved in Vault", passed: true },
            { item: "100-Point Guild QC Passed", passed: true },
            { item: "Sealed Protective Packaging Complete", passed: true },
            { item: "Delivery Address & Gate Clearance Verified", passed: true }
          ]
        }
      };

      this.passports.unshift(newPassport);
      this.save();
      return newPassport;
    }

    addServiceRecord(id, service) {
      const p = this.getById(id);
      if (!p) return false;

      const newRecord = {
        id: `SRV-${Date.now().toString().slice(-4)}`,
        date: service.date || new Date().toISOString().split('T')[0],
        type: service.type || "Guild Maintenance Service",
        provider: service.provider || "Friends Furniture Care Guild",
        technician: service.technician || "Master Artisan Specialist",
        cost: Number(service.cost) || 0,
        notes: service.notes || "Routine health maintenance completed.",
        status: "Passed Inspection ✓"
      };

      p.serviceHistory.unshift(newRecord);
      
      // Slightly enhance condition score when serviced
      p.conditionScore = Math.min(100, p.conditionScore + 3);
      if (p.conditionBreakdown) {
        p.conditionBreakdown.surfacePolish = Math.min(100, (p.conditionBreakdown.surfacePolish || 90) + 4);
      }

      this.save();
      return newRecord;
    }

    updateStage(id, stageData) {
      const p = this.getById(id);
      if (!p) return false;

      p.journey.push({
        stage: stageData.stage || "Serviced",
        title: stageData.title || "Artisan Milestone Logged",
        date: stageData.date || new Date().toISOString().split('T')[0],
        location: stageData.location || "Lotus Palace Villa, Hyderabad",
        entity: stageData.entity || "Friends Furniture White-Glove Team",
        status: stageData.status || "Completed",
        notes: stageData.notes || "Milestone status updated in permanent ledger.",
        verified: true
      });

      this.save();
      return true;
    }

    updateConditionScore(id, newScore, notes) {
      const p = this.getById(id);
      if (!p) return false;

      p.conditionScore = Math.max(0, Math.min(100, Number(newScore)));
      if (notes) p.conditionNotes = notes;
      
      if (p.conditionScore >= 90) p.conditionLabel = "Excellent Palace Condition";
      else if (p.conditionScore >= 75) p.conditionLabel = "Good Maintained Condition";
      else if (p.conditionScore >= 50) p.conditionLabel = "Service Required";
      else p.conditionLabel = "Restoration Recommended";

      this.save();
      return true;
    }

    calculateSpatialAccess(furnitureDimensions, homeAccessDimensions) {
      const fW = Number(furnitureDimensions.widthInches) || 88;
      const fD = Number(furnitureDimensions.depthInches) || 38;
      const fH = Number(furnitureDimensions.heightInches) || 34;

      const dW = Number(homeAccessDimensions.doorWidth) || 36;
      const dH = Number(homeAccessDimensions.doorHeight) || 80;
      const cW = Number(homeAccessDimensions.corridorWidth) || 44;
      const sW = Number(homeAccessDimensions.staircaseWidth) || 42;
      const eW = Number(homeAccessDimensions.liftWidth) || 40;
      const eH = Number(homeAccessDimensions.liftHeight) || 84;

      // Furniture min pass-through cross section (tilt angle possible)
      const minFurnitureClearance = Math.min(fD, fH);
      const isDoorPass = dW >= minFurnitureClearance && dH >= Math.min(fW, fH);
      const isCorridorPass = cW >= minFurnitureClearance + 2;
      const isStaircasePass = sW >= minFurnitureClearance + 2;
      const isLiftPass = (eW >= minFurnitureClearance && eH >= fW) || (eW >= fW);

      const checks = [
        { name: "Main Entrance Doorway", requiredMinInches: minFurnitureClearance, availableInches: dW, passed: isDoorPass },
        { name: "Corridor Turn Clearance", requiredMinInches: minFurnitureClearance + 2, availableInches: cW, passed: isCorridorPass },
        { name: "Staircase Landing Width", requiredMinInches: minFurnitureClearance + 2, availableInches: sW, passed: isStaircasePass },
        { name: "Elevator / Lift Clearance", requiredMinInches: minFurnitureClearance, availableInches: eW, passed: isLiftPass }
      ];

      const allPassed = isDoorPass && isCorridorPass;
      const safeOverall = checks.filter(c => c.passed).length >= 3;

      let recommendation = "";
      if (allPassed && isLiftPass) {
        recommendation = "✓ Standard White-Glove In-Home delivery verified. Furniture will pass smoothly without disassembly.";
      } else if (!isDoorPass) {
        recommendation = "⚠ Warning: Door clearance tight by " + Math.abs(dW - minFurnitureClearance) + " inches. Recommended Solution: Removable leg protocol (-5 inches) or tilt delivery by artisan team.";
      } else if (!isLiftPass) {
        recommendation = "⚠ Elevator dimensions tight. Recommended Solution: White-glove team will use protected staircase transit or modular sub-assembly.";
      } else {
        recommendation = "✓ Furniture can safely enter with standard 15-degree tilt handling by our 2-person master team.";
      }

      return {
        safe: safeOverall,
        checks,
        recommendation,
        minClearanceNeeded: minFurnitureClearance
      };
    }
  }

  return new PassportManager();
}));

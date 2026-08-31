/**
 * 👑 FRIENDS FURNITURE — MASTER FURNITURE TWIN DATA ENGINE & LIVING DIGITAL REPOSITORY
 * “Your Furniture. Its Digital Twin. Comfort For Life.”
 * 
 * Provides living digital representation for every purchased furniture item:
 * - Digital Furniture Twin identity & telemetry
 * - Dynamic Room Placement & Custom Room Management
 * - Deep Furniture Memory (Original config, customizations, service history, room moves)
 * - Contextual Smart Companion Engine (Never random — explains architectural rationale)
 * - Configuration Memory & Simulation State
 * - Full Service Mode (Maintenance, Repair Requests, Warranty Claims, Genuine Replacement Parts)
 * - Smart Room Collection Synergy & Harmony Index
 * - 6-Stage Lifecycle Event Timeline (Purchased → Customized → Delivered → Installed → Serviced → Upgraded)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FurnitureTwinDB = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const STORAGE_KEY = "FF_FURNITURE_TWINS_V1";
  const ROOMS_STORAGE_KEY = "FF_CUSTOM_ROOMS_V1";

  const DEFAULT_ROOMS = [
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Outdoor"
  ];

  const INITIAL_TWINS = [
    {
      id: "TWIN-SF2048-HYD",
      legacyId: "ff-101",
      name: "The Imperial Royal Sofa",
      shortName: "Imperial Sofa",
      tagline: "Hand-carved Nilambur seasoned teak with 24K gold foil and emerald silk velvet.",
      category: "Living Room",
      subcategory: "Palace Seating",
      currentRoom: "Living Room",
      customRoomTag: "Grand Salon",
      status: "Active & Living",
      healthScore: 94,
      conditionLabel: "Pristine Palace Condition",
      purchasePrice: 89999,
      currentEstimatedValue: 98500,
      purchaseDate: "2026-07-28",
      deliveryDate: "2026-08-31",
      installationDate: "2026-08-31",
      orderId: "FF2048",
      
      // Visuals & Swatches
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
      ],

      // Configuration & Material Identity
      activeConfiguration: {
        seater: "3-Seater Sovereign Grand",
        color: "Emerald Palace",
        colorHex: "#0B3A2C",
        fabric: "Royal Silk Velvet",
        woodFinish: "Nilambur Seasoned Teak",
        woodHex: "#4A2E1B",
        cushionStyle: "Diamond Tufted Dual-Density",
        legStyle: "24K Hand-Embossed Gold Sabots",
        summaryText: "Sofa → Emerald Palace Velvet → Nilambur Teak Finish → 3-Seater Grand"
      },

      originalConfiguration: {
        seater: "3-Seater Sovereign Grand",
        color: "Royal Blue",
        colorHex: "#1B2A4A",
        fabric: "Royal Velvet",
        woodFinish: "Nilambur Teak",
        woodHex: "#4A2E1B",
        cushionStyle: "Diamond Tufted",
        legStyle: "24K Gold Sabots",
        summaryText: "Sofa → Royal Blue Velvet → Nilambur Teak → 3-Seater Grand",
        customizedAtPurchase: "Customized with 24K Gold Sabots & Diamond Tufting prior to delivery."
      },

      dimensions: {
        widthInches: 92,
        depthInches: 38,
        heightInches: 36,
        seatHeightInches: 19,
        weightKg: 78
      },

      // Warranty Status
      warranty: {
        status: "ACTIVE",
        label: "10-Year Royal Structural Guarantee",
        certificateId: "DOC-WRT-2026-99014",
        startDate: "2026-07-28",
        expiryDate: "2036-07-28",
        remainingYears: "9.9 Years",
        coverage: "100% Timber Foundation, Mortise Joinery, Spring Retention & 24K Leaf Inlays.",
        claimsCount: 0,
        claims: []
      },

      // Service Status
      serviceStatus: "Healthy 🟢",
      serviceOverview: "Next routine seasonal hydration due in 45 days.",
      upcomingMaintenance: [
        {
          id: "MAINT-001",
          title: "Organic Beeswax Grain Hydration & Velvet Deep Nap Steam",
          dueDate: "2026-10-15",
          urgency: "Recommended",
          status: "Scheduled Reminder",
          estimatedCost: 1450,
          reason: "Preserves natural moisture equilibrium in kiln-dried Nilambur teak before dry season."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-01",
          date: "2026-08-31",
          type: "Installation & White-Glove Butler Setup",
          technician: "Vikram Sharma (Lead Palace Butler)",
          notes: "Placed in Grand Salon. Acoustic resonance test passed (zero creaks). Velvet steam-finished.",
          cost: 0,
          status: "Completed ✓"
        },
        {
          id: "SRV-2026-00",
          date: "2026-07-15",
          type: "Guild Master Pre-Delivery Certification",
          technician: "Master Artisan K. Ramanathan",
          notes: "Timber moisture verified at 9.4%. 24K gold foil sealed with protective botanical shellac.",
          cost: 0,
          status: "Certified ✓"
        }
      ],

      repairs: [],

      // Room Placement History (Memory)
      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Living Room (Grand Salon)",
          date: "2026-08-31",
          reason: "Initial white-glove palace installation and spatial placement."
        }
      ],

      // Configuration Change History (Memory)
      configurationHistory: [
        {
          date: "2026-08-31",
          change: "Upgraded fabric color to Emerald Palace with bespoke 24K Gold Trim bolsters.",
          author: "Owner (Maharaja Hari)"
        },
        {
          date: "2026-07-28",
          change: "Original custom order placed: 3-Seater with Nilambur Teak foundation.",
          author: "Friends Furniture Atelier"
        }
      ],

      // Purchased Accessories Memory
      accessoriesPurchased: [
        {
          id: "ACC-01",
          name: "24K Gold Trim Velvet Accent Cushion Set (Pair)",
          purchaseDate: "2026-07-28",
          price: 6500,
          status: "Attached to Twin"
        }
      ],

      // Fitted Replacement Parts Memory
      replacementPartsFitted: [
        {
          id: "PART-FIT-01",
          name: "Solid Brass Sabot Glides (Set of 4)",
          date: "2026-08-31",
          status: "Installed"
        }
      ],

      // Event Timeline (Purchased → Customized → Delivered → Installed → Serviced → Upgraded)
      eventTimeline: [
        {
          stage: "Purchased",
          title: "Palace Order Placed & Timber Sourced",
          date: "2026-07-28",
          details: "Master lot LOT-TEAK-88-NILAMBUR assigned from sustainably managed reserves.",
          icon: "🛒",
          badge: "Step 1 Completed"
        },
        {
          stage: "Customized",
          title: "Bespoke Emerald Velvet & 24K Leaf Embossing",
          date: "2026-08-10",
          details: "Artisan Ramanathan hand-embossed gold sabots and precision diamond-tufted the cushions.",
          icon: "✨",
          badge: "Step 2 Completed"
        },
        {
          stage: "Delivered",
          title: "Air-Suspension Fleet Delivery #WF-402",
          date: "2026-08-31",
          details: "Zero-vibration transit (0.02G) to Lotus Palace Villa, Jubilee Hills.",
          icon: "🚚",
          badge: "Step 3 Completed"
        },
        {
          stage: "Installed",
          title: "White-Glove Butler Chamber Calibration",
          date: "2026-08-31",
          details: "Oriented with 4.5ft perimeter walkway facing Grand Salon fireplace.",
          icon: "🏛️",
          badge: "Step 4 Active"
        },
        {
          stage: "Serviced",
          title: "Seasonal Hydration & Velvet Conditioning",
          date: "Scheduled for 15 Oct 2026",
          details: "Upcoming automated health maintenance visit.",
          icon: "🧰",
          badge: "Upcoming"
        },
        {
          stage: "Upgraded",
          title: "Twin Simulation Ready",
          date: "Available Anytime",
          details: "Modular chaise add-on or seasonal silk slipcover upgrade compatible.",
          icon: "🚀",
          badge: "Ready for Simulation"
        }
      ],

      // Smart Companion Recommendations (Contextual & Non-random)
      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-106",
            name: "The Versailles Marble Coffee Table",
            category: "Living Room",
            price: 48999,
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 96,
            whyRecommended: "Architectural Height Harmony: The 18-inch polished marble surface aligns seamlessly with this sofa's 19-inch seat height, while its antique gold fluted legs match the 24K gold foil trim."
          },
          {
            id: "ff-105",
            name: "The Empress Bouclé Armchair",
            category: "Living Room",
            price: 34999,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 92,
            whyRecommended: "Tactile Dialogue: Deep emerald velvet paired with ivory sculptural bouclé creates a curated conversation circle with zero visual monotony."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-CUSH-02",
            name: "Imperial Emerald & Gold Bolster Pillows (Set of 2)",
            price: 4200,
            image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Exact Dye Match: Woven from identical Martindale 65,000 rub emerald velvet lot for seamless luxury accenting."
          },
          {
            id: "ACC-THR-01",
            name: "Himalayan Cashmere Gold-Fringed Throw Blanket",
            price: 8900,
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Thermal Comfort & Grain Protection: Shields the high-traffic seating zone while adding warm champagne drape aesthetics."
          }
        ],
        replacementParts: [
          {
            id: "PART-BWX-01",
            name: "Nilambur Organic Beeswax Balm (250ml Tin)",
            price: 1450,
            stock: 24,
            whyRecommended: "Official Guild Formula: Specially formulated for seasoned Nilambur Teak to replenish essential herbal resins."
          },
          {
            id: "PART-SAB-01",
            name: "Solid Brass Gold Sabot Replacement Feet (Set of 4)",
            price: 3800,
            stock: 12,
            whyRecommended: "100% Fit Guarantee: Factory-machined M8 thread matches the sofa's hand-turned front and rear legs."
          }
        ],
        maintenanceActions: [
          {
            action: "Bi-Weekly Velvet Nap Re-Alignment",
            frequency: "Every 14 Days",
            whyRecommended: "Prevents pressure shading and maintains deep emerald light refraction across tufted contours."
          },
          {
            action: "Pre-Monsoon Teak Humidity Check",
            frequency: "Annual (June)",
            whyRecommended: "Guarantees mortise-and-tenon joints remain under 11% relative humidity in tropical monsoon cycles."
          }
        ],
        roomImprovements: [
          {
            tip: "Warm 2700K Ambient Sconce Illumination",
            whyRecommended: "Accentuates the 24K gold foil trim without harsh glare, creating an opulent palace warmth in your Grand Salon."
          },
          {
            tip: "Natural 8x10ft Silk-Wool Base Rug Anchor",
            whyRecommended: "Ensures the 92-inch sofa frame is framed with a minimum 18-inch perimeter margin for majestic palace proportion."
          }
        ]
      }
    },

    {
      id: "TWIN-SD3091-HYD",
      legacyId: "ff-102",
      name: "The Sovereign Dining Suite",
      shortName: "Sovereign Dining",
      tagline: "Live-edge solid Sheesham dining table accompanied by 6 velvet upholstered royal chairs.",
      category: "Dining Room",
      subcategory: "Dining Suites",
      currentRoom: "Dining Room",
      customRoomTag: "Banquet Hall",
      status: "Active & Living",
      healthScore: 96,
      conditionLabel: "Exceptional Condition",
      purchasePrice: 94999,
      currentEstimatedValue: 104000,
      purchaseDate: "2026-06-20",
      deliveryDate: "2026-07-02",
      installationDate: "2026-07-02",
      orderId: "FF3091",

      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80"
      ],

      activeConfiguration: {
        seater: "8-Seater Sovereign Banquet",
        color: "Natural Amber Sheesham",
        colorHex: "#8B4513",
        fabric: "Royal Velvet & Full-Grain Leather",
        woodFinish: "Rare Live-Edge Solid Sheesham",
        woodHex: "#5A2D0C",
        cushionStyle: "Ergonomic Padded Velvet Seats",
        legStyle: "Hand-Forged Antique Brass Sled Base",
        summaryText: "Dining Suite → Amber Sheesham → Antique Brass Sled → 8-Seater Banquet"
      },

      originalConfiguration: {
        seater: "8-Seater Sovereign Banquet",
        color: "Natural Amber Sheesham",
        colorHex: "#8B4513",
        fabric: "Royal Velvet",
        woodFinish: "Live-Edge Solid Sheesham",
        woodHex: "#5A2D0C",
        cushionStyle: "Ergonomic Padded",
        legStyle: "Antique Brass Sled",
        summaryText: "Dining Suite → Amber Sheesham → Brass Sled → 8-Seater Banquet",
        customizedAtPurchase: "Specified 2-inch single-slab live-edge top with hand-beveled resin finish."
      },

      dimensions: {
        widthInches: 84,
        depthInches: 42,
        heightInches: 30,
        seatHeightInches: 18.5,
        weightKg: 85
      },

      warranty: {
        status: "ACTIVE",
        label: "10-Year Solid Timber & Brass Guarantee",
        certificateId: "DOC-WRT-2026-88123",
        startDate: "2026-06-20",
        expiryDate: "2036-06-20",
        remainingYears: "9.8 Years",
        coverage: "Live-edge slab stability, resin bonding, and brass sled integrity.",
        claimsCount: 0,
        claims: []
      },

      serviceStatus: "Healthy 🟢",
      serviceOverview: "Next annual food-safe timber oil replenishment due in 8 months.",
      upcomingMaintenance: [
        {
          id: "MAINT-002",
          title: "Food-Safe Organic Timber Oil Re-application",
          dueDate: "2027-04-15",
          urgency: "Planned",
          status: "On Schedule",
          estimatedCost: 1200,
          reason: "Maintains stain-proof barrier against hot spices and dining oils."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-02",
          date: "2026-07-02",
          type: "Installation & Level Alignment",
          technician: "Anand Verma (Lead Dining Guild Butler)",
          notes: "Installed in Banquet Hall. Laser calibrated level to 0.0 degree incline. Heat shield buffed.",
          cost: 0,
          status: "Completed ✓"
        }
      ],

      repairs: [],

      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Dining Room (Banquet Hall)",
          date: "2026-07-02",
          reason: "Initial delivery & placement in main dining pavilion."
        }
      ],

      configurationHistory: [
        {
          date: "2026-06-20",
          change: "Factory order placed: 84x42 inch single live-edge slab with 6 dining armchairs.",
          author: "Maharaja Hari"
        }
      ],

      accessoriesPurchased: [
        {
          id: "ACC-02",
          name: "Tempered Crystal Glass Top Shield (84x42)",
          purchaseDate: "2026-07-02",
          price: 8500,
          status: "Active on Table"
        }
      ],

      replacementPartsFitted: [],

      eventTimeline: [
        {
          stage: "Purchased",
          title: "Single Slab Selected & Kiln Dried",
          date: "2026-06-20",
          details: "Rare live-edge Sheesham harvested in Rajasthan guild forest.",
          icon: "🛒",
          badge: "Completed"
        },
        {
          stage: "Customized",
          title: "Antique Brass Sled Forging",
          date: "2026-06-26",
          details: "Hand-bent solid brass sled legs calibrated for 250kg load capacity.",
          icon: "✨",
          badge: "Completed"
        },
        {
          stage: "Delivered",
          title: "Palace Logistics Fleet",
          date: "2026-07-02",
          details: "Heavy timber crate delivered to Lotus Palace Villa.",
          icon: "🚚",
          badge: "Completed"
        },
        {
          stage: "Installed",
          title: "Banquet Hall Precision Setup",
          date: "2026-07-02",
          details: "Seating circulation spaced with 3.8ft perimeter comfort.",
          icon: "🏛️",
          badge: "Active"
        }
      ],

      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-104",
            name: "The Chancellor Executive Buffet Credenza",
            category: "Dining Room",
            price: 74999,
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 94,
            whyRecommended: "Material Continuity: Features matching seasoned timber grain and brushed antique brass hardware for a unified banquet hall suite."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-MAT-01",
            name: "Gold-Embossed Italian Leather Placemat Set (8 Pcs)",
            price: 5600,
            image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Heat Protection: Engineered to withstand 90°C hot dishware while maintaining live-edge visual exposure."
          }
        ],
        replacementParts: [
          {
            id: "PART-GLS-02",
            name: "Ultra-Clear Silicone Tabletop Buffer Bumpers (Set of 12)",
            price: 650,
            stock: 50,
            whyRecommended: "Prevents tempered crystal shield from making direct hard contact with Sheesham live grain."
          }
        ],
        maintenanceActions: [
          {
            action: "Spill Microfiber Rapid Wipe",
            frequency: "Immediate post-dining",
            whyRecommended: "Preserves natural organic resin finish against wine and citrus tannins."
          }
        ],
        roomImprovements: [
          {
            tip: "Chandelier Centered 34\" Above Slab",
            whyRecommended: "Ensures glare-free luminous focus on the dramatic live-edge natural grain curves."
          }
        ]
      }
    },

    {
      id: "TWIN-MB4012-HYD",
      legacyId: "ff-103",
      name: "The Majesty King Canopy Bed",
      shortName: "Majesty Canopy Bed",
      tagline: "Four-poster seasoned teak with 24K gold inlays, wingback headboard and German hydraulic lift.",
      category: "Bedroom",
      subcategory: "Grand Beds",
      currentRoom: "Bedroom",
      customRoomTag: "Master Suite",
      status: "Active & Living",
      healthScore: 92,
      conditionLabel: "Excellent Palace Condition",
      purchasePrice: 119999,
      currentEstimatedValue: 132000,
      purchaseDate: "2026-07-02",
      deliveryDate: "2026-07-15",
      installationDate: "2026-07-15",
      orderId: "FF4012",

      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
      ],

      activeConfiguration: {
        seater: "King Size Palace Grand (78x84 in)",
        color: "Ivory Velvet & Royal Walnut",
        colorHex: "#FFF8E7",
        fabric: "Quilted Ivory Royal Velvet",
        woodFinish: "Bavarian Seasoned White Oak",
        woodHex: "#3E2723",
        cushionStyle: "Architectural Wingback Headboard",
        legStyle: "Hand-Turned Teak Pillars with 24K Gold Inlays",
        summaryText: "Bed → Ivory Velvet → White Oak Finish → King Palace Grand"
      },

      originalConfiguration: {
        seater: "King Size Palace Grand",
        color: "Ivory Velvet",
        colorHex: "#FFF8E7",
        fabric: "Quilted Ivory Velvet",
        woodFinish: "European White Oak",
        woodHex: "#3E2723",
        cushionStyle: "Wingback Headboard",
        legStyle: "Teak Pillars & 24K Leaf",
        summaryText: "Bed → Ivory Velvet → White Oak → King Grand",
        customizedAtPurchase: "Integrated warm gold ambient light channels and 900L silent hydraulic lift."
      },

      dimensions: {
        widthInches: 88,
        depthInches: 82,
        heightInches: 54,
        seatHeightInches: 22,
        weightKg: 110
      },

      warranty: {
        status: "ACTIVE",
        label: "15-Year Master Foundation & Hydraulic Guarantee",
        certificateId: "DOC-WRT-2026-77312",
        startDate: "2026-07-02",
        expiryDate: "2041-07-02",
        remainingYears: "14.8 Years",
        coverage: "German hydraulic lift pistons, European oak joinery, and four-poster structural anchors.",
        claimsCount: 0,
        claims: []
      },

      serviceStatus: "Healthy 🟢",
      serviceOverview: "Hydraulic pressure inspection recommended in 4 months.",
      upcomingMaintenance: [
        {
          id: "MAINT-003",
          title: "German Hydraulic Piston Lubrication & Joinery Torque Check",
          dueDate: "2026-12-15",
          urgency: "Recommended",
          status: "Scheduled",
          estimatedCost: 1800,
          reason: "Maintains 900L storage lift silky-smooth 0-effort operation."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-03",
          date: "2026-07-15",
          type: "Palace Master Bedroom Installation",
          technician: "Rohan Iyer (Master Bed Technician)",
          notes: "Hydraulics calibrated to 1200N force. LED 2700K ambient channel wired to bedside switch.",
          cost: 0,
          status: "Completed ✓"
        }
      ],

      repairs: [],

      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Bedroom (Master Suite)",
          date: "2026-07-15",
          reason: "Master bedroom suite delivery and installation."
        }
      ],

      configurationHistory: [
        {
          date: "2026-07-02",
          change: "Bespoke canopy bed order confirmed with 24K gold inlays.",
          author: "Maharaja Hari"
        }
      ],

      accessoriesPurchased: [
        {
          id: "ACC-03",
          name: "Silk Canopy Drape Set (Champagne Ivory)",
          purchaseDate: "2026-07-15",
          price: 14500,
          status: "Installed on Canopy"
        }
      ],

      replacementPartsFitted: [],

      eventTimeline: [
        {
          stage: "Purchased",
          title: "Bavarian Oak Lot Reserved",
          date: "2026-07-02",
          details: "Kiln dried to 8% moisture for superior tropical stability.",
          icon: "🛒",
          badge: "Completed"
        },
        {
          stage: "Customized",
          title: "Wingback Headboard Diamond Tufting",
          date: "2026-07-08",
          details: "Upholstered in Italian ivory velvet with integrated touch dimmer channels.",
          icon: "✨",
          badge: "Completed"
        },
        {
          stage: "Delivered",
          title: "Master Suite Delivery",
          date: "2026-07-15",
          details: "Safely delivered with custom corner armor padding.",
          icon: "🚚",
          badge: "Completed"
        },
        {
          stage: "Installed",
          title: "Hydraulic Assembly & Headboard Anchor",
          date: "2026-07-15",
          details: "Mounted flush against accent stone wall in Master Suite.",
          icon: "🏛️",
          badge: "Active"
        }
      ],

      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-105",
            name: "The Empress Bouclé Armchair (Ivory Edition)",
            category: "Bedroom",
            price: 34999,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 95,
            whyRecommended: "Suite Reading Nook: Ivory bouclé matches the quilted headboard velvet, creating a serene private sanctuary in your Master Suite."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-MATT-01",
            name: "Royal Ortho-Natural Latex Mattress (King Grand)",
            price: 38999,
            image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Exact Dimension Compatibility: Designed for the 78x84-inch internal bedframe with zero edge gap."
          }
        ],
        replacementParts: [
          {
            id: "PART-HYD-01",
            name: "German Heavy-Duty Gas Piston Replacement (1200N)",
            price: 4500,
            stock: 8,
            whyRecommended: "Original OEM replacement ensures 100,000 cycle tested effortless lift reliability."
          }
        ],
        maintenanceActions: [
          {
            action: "Hydraulic Piston Rod Wipe",
            frequency: "Every 6 Months",
            whyRecommended: "Keeps piston cylinder seal free of micro-dust."
          }
        ],
        roomImprovements: [
          {
            tip: "Pair with Symmetrical 24-inch Nightstands",
            whyRecommended: "Provides proportional balance on either side of the 88-inch wide headboard."
          }
        ]
      }
    },

    {
      id: "TWIN-ED5021-HYD",
      legacyId: "ff-104",
      name: "The Chancellor Executive Desk",
      shortName: "Chancellor Desk",
      tagline: "Solid Nilambur teak with full-grain leather writing insert and secret cable routing.",
      category: "Office",
      subcategory: "Executive Desks",
      currentRoom: "Office",
      customRoomTag: "Private Study",
      status: "Active & Living",
      healthScore: 95,
      conditionLabel: "Pristine Palace Condition",
      purchasePrice: 79999,
      currentEstimatedValue: 88000,
      purchaseDate: "2026-08-10",
      deliveryDate: "2026-08-20",
      installationDate: "2026-08-20",
      orderId: "FF5021",

      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80"
      ],

      activeConfiguration: {
        seater: "Executive President Grand (72x36 in)",
        color: "Royal Walnut & Obsidian Leather",
        colorHex: "#3E2723",
        fabric: "Italian Full-Grain Leather Writing Pad",
        woodFinish: "Grade-A Nilambur Teak",
        woodHex: "#4A2E1B",
        cushionStyle: "Dual-Side Soft-Close Drawers with Felt Lining",
        legStyle: "Brushed Antique Brass Pulls & Sabots",
        summaryText: "Desk → Obsidian Leather Insert → Nilambur Teak → 72\" President Grand"
      },

      originalConfiguration: {
        seater: "Executive President Grand",
        color: "Royal Walnut",
        colorHex: "#3E2723",
        fabric: "Full-Grain Leather",
        woodFinish: "Nilambur Teak",
        woodHex: "#4A2E1B",
        cushionStyle: "Soft-Close Drawers",
        legStyle: "Antique Brass Sabots",
        summaryText: "Desk → Leather Insert → Teak → 72\" President",
        customizedAtPurchase: "Equipped with biometric lock drawer and wireless charging leather inlay."
      },

      dimensions: {
        widthInches: 72,
        depthInches: 36,
        heightInches: 30,
        seatHeightInches: 26,
        weightKg: 90
      },

      warranty: {
        status: "ACTIVE",
        label: "10-Year Executive Cabinetry Guarantee",
        certificateId: "DOC-WRT-2026-66491",
        startDate: "2026-08-10",
        expiryDate: "2036-08-10",
        remainingYears: "9.9 Years",
        coverage: "Dovetail drawer joints, timber top warping, and biometric lock mechanism.",
        claimsCount: 0,
        claims: []
      },

      serviceStatus: "Healthy 🟢",
      serviceOverview: "Next leather nourishment and drawer glide check in 10 months.",
      upcomingMaintenance: [
        {
          id: "MAINT-004",
          title: "Italian Leather Writing Pad Cream Conditioning",
          dueDate: "2027-06-10",
          urgency: "Planned",
          status: "On Schedule",
          estimatedCost: 950,
          reason: "Maintains supple touch and prevents pen pressure indentations."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-04",
          date: "2026-08-20",
          type: "Study Installation & Cable Harness Setup",
          technician: "Vikram Sharma",
          notes: "Installed in Private Study. Biometric fingerprint lock enrolled. Secret wire run concealed.",
          cost: 0,
          status: "Completed ✓"
        }
      ],

      repairs: [],

      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Office (Private Study)",
          date: "2026-08-20",
          reason: "Private study executive suite setup."
        }
      ],

      configurationHistory: [
        {
          date: "2026-08-10",
          change: "Custom order placed with biometric lock drawer upgrade.",
          author: "Maharaja Hari"
        }
      ],

      accessoriesPurchased: [
        {
          id: "ACC-04",
          name: "Solid Teak Desk Organizer & Pen Vault",
          purchaseDate: "2026-08-20",
          price: 4500,
          status: "On Desk"
        }
      ],

      replacementPartsFitted: [],

      eventTimeline: [
        {
          stage: "Purchased",
          title: "Executive Desk Commissioned",
          date: "2026-08-10",
          details: "Selected for Private Study presidential workstation.",
          icon: "🛒",
          badge: "Completed"
        },
        {
          stage: "Customized",
          title: "Biometric Vault & Wireless Inlay",
          date: "2026-08-15",
          details: "Precision routed concealed Qi-charging pad into teak core.",
          icon: "✨",
          badge: "Completed"
        },
        {
          stage: "Delivered",
          title: "Executive Delivery",
          date: "2026-08-20",
          details: "Delivered with zero handling marks.",
          icon: "🚚",
          badge: "Completed"
        },
        {
          stage: "Installed",
          title: "Study Placement & Power Link",
          date: "2026-08-20",
          details: "Positioned with grand view of Lotus Palace gardens.",
          icon: "🏛️",
          badge: "Active"
        }
      ],

      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-105",
            name: "The Empress Bouclé Armchair (Client Pair)",
            category: "Office",
            price: 34999,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 90,
            whyRecommended: "Executive Consultation Circle: Places comfortable client seating opposite the 72-inch Chancellor desk with matched antique brass sabots."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-DESK-02",
            name: "Full-Grain Italian Leather Desk Blotter (Large)",
            price: 3800,
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Coordinates with the desk's integrated writing pad for extended laptop and document surface."
          }
        ],
        replacementParts: [
          {
            id: "PART-GLD-01",
            name: "Soft-Close Drawer Glide Mechanism (German Blum OEM)",
            price: 2200,
            stock: 16,
            whyRecommended: "Exact specification replacement for silent drawer actuation."
          }
        ],
        maintenanceActions: [
          {
            action: "Biometric Sensor Lens Wipe",
            frequency: "Monthly",
            whyRecommended: "Ensures 0.2 second fingerprint recognition response."
          }
        ],
        roomImprovements: [
          {
            tip: "Angle Desk 45 Degrees to Natural Window Light",
            whyRecommended: "Prevents screen glare while highlighting the hand-rubbed teak grain."
          }
        ]
      }
    },

    {
      id: "TWIN-AC6019-HYD",
      legacyId: "ff-105",
      name: "The Empress Bouclé Armchair",
      shortName: "Empress Armchair",
      tagline: "Sculptural silhouette wrapped in tactile Italian bouclé on solid brass pedestal.",
      category: "Living Room",
      subcategory: "Accent Seating",
      currentRoom: "Living Room",
      customRoomTag: "Reading Nook",
      status: "Active & Living",
      healthScore: 98,
      conditionLabel: "Pristine Palace Condition",
      purchasePrice: 34999,
      currentEstimatedValue: 39500,
      purchaseDate: "2026-08-05",
      deliveryDate: "2026-08-15",
      installationDate: "2026-08-15",
      orderId: "FF6019",

      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
      ],

      activeConfiguration: {
        seater: "Single Sculptural Swivel Accent",
        color: "Ivory Cloud Bouclé",
        colorHex: "#F5F5DC",
        fabric: "High-Tactile Italian Wool Bouclé",
        woodFinish: "Solid Brushed Antique Brass Pedestal",
        woodHex: "#C9A227",
        cushionStyle: "Curved Ergonomic Lumbar Wrap",
        legStyle: "360-Degree Silent Ball-Bearing Swivel Base",
        summaryText: "Armchair → Ivory Bouclé → Brass Swivel Base → Single Accent"
      },

      originalConfiguration: {
        seater: "Single Accent Armchair",
        color: "Ivory Cloud",
        colorHex: "#F5F5DC",
        fabric: "Italian Bouclé",
        woodFinish: "Brushed Brass",
        woodHex: "#C9A227",
        cushionStyle: "Curved Lumbar",
        legStyle: "Brass Swivel",
        summaryText: "Armchair → Ivory Bouclé → Brass Swivel",
        customizedAtPurchase: "Factory optioned with 360-degree silent return swivel mechanism."
      },

      dimensions: {
        widthInches: 34,
        depthInches: 32,
        heightInches: 31,
        seatHeightInches: 17.5,
        weightKg: 28
      },

      warranty: {
        status: "ACTIVE",
        label: "5-Year Swivel Mechanism & Upholstery Guarantee",
        certificateId: "DOC-WRT-2026-55912",
        startDate: "2026-08-05",
        expiryDate: "2031-08-05",
        remainingYears: "4.9 Years",
        coverage: "Swivel bearing integrity, high-resilience foam core, and bouclé pile retention.",
        claimsCount: 0,
        claims: []
      },

      serviceStatus: "Healthy 🟢",
      serviceOverview: "Next routine fabric vacuum & lint grooming in 30 days.",
      upcomingMaintenance: [
        {
          id: "MAINT-005",
          title: "Bouclé Nap Grooming & Swivel Bearing Micro-Lube",
          dueDate: "2026-10-30",
          urgency: "Planned",
          status: "Scheduled",
          estimatedCost: 650,
          reason: "Maintains cloud-soft wool texture and effortless 360 rotation."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-05",
          date: "2026-08-15",
          type: "Living Room Placement",
          technician: "Vikram Sharma",
          notes: "Placed in Grand Salon reading alcove. Swivel auto-return aligned.",
          cost: 0,
          status: "Completed ✓"
        }
      ],

      repairs: [],

      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Living Room (Reading Nook)",
          date: "2026-08-15",
          reason: "Grand Salon reading nook pairing."
        }
      ],

      configurationHistory: [
        {
          date: "2026-08-05",
          change: "Order placed: Ivory Bouclé with Brass Swivel base.",
          author: "Maharaja Hari"
        }
      ],

      accessoriesPurchased: [],
      replacementPartsFitted: [],

      eventTimeline: [
        {
          stage: "Purchased",
          title: "Modern Royal Armchair Ordered",
          date: "2026-08-05",
          details: "Selected to complement The Imperial Royal Sofa.",
          icon: "🛒",
          badge: "Completed"
        },
        {
          stage: "Customized",
          title: "Bouclé Textile Wrap & Swivel Fitting",
          date: "2026-08-10",
          details: "Hand-stretched Italian wool bouclé over cold-cured foam.",
          icon: "✨",
          badge: "Completed"
        },
        {
          stage: "Delivered",
          title: "Palace Express Butler Delivery",
          date: "2026-08-15",
          details: "Arrived in protective climate sleeve.",
          icon: "🚚",
          badge: "Completed"
        },
        {
          stage: "Installed",
          title: "Living Room Nook Calibration",
          date: "2026-08-15",
          details: "Angled toward fireplace & Imperial Sofa conversation zone.",
          icon: "🏛️",
          badge: "Active"
        }
      ],

      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-106",
            name: "The Versailles Marble Side Table (Companion)",
            category: "Living Room",
            price: 24999,
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 94,
            whyRecommended: "Curved Dialogue: Circular marble top matches the sculptural curve of the Empress bouclé armchair."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-LUM-01",
            name: "Velvet Lumbar Support Cushion (Emerald Gold)",
            price: 2400,
            image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Ties the ivory armchair visually into the emerald green palette of The Imperial Sofa."
          }
        ],
        replacementParts: [
          {
            id: "PART-SWV-01",
            name: "Heavy-Duty 360 Swivel Mechanism Bearing",
            price: 2800,
            stock: 14,
            whyRecommended: "Guaranteed smooth rotation with zero wobble."
          }
        ],
        maintenanceActions: [
          {
            action: "Gentle Wool Vacuum",
            frequency: "Weekly",
            whyRecommended: "Lifts dust from deep bouclé wool loops without snagging fibers."
          }
        ],
        roomImprovements: [
          {
            tip: "Place next to 1500 Lumen Adjustable Reading Lamp",
            whyRecommended: "Creates an idyllic evening reading retreat in your Grand Salon."
          }
        ]
      }
    },

    {
      id: "TWIN-CT7034-HYD",
      legacyId: "ff-106",
      name: "The Versailles Marble Coffee Table",
      shortName: "Versailles Marble Table",
      tagline: "Solid Italian Calacatta Gold marble slab on hand-carved fluted teak and brass base.",
      category: "Living Room",
      subcategory: "Marble & Stone",
      currentRoom: "Living Room",
      customRoomTag: "Grand Salon",
      status: "Active & Living",
      healthScore: 97,
      conditionLabel: "Pristine Palace Condition",
      purchasePrice: 48999,
      currentEstimatedValue: 54000,
      purchaseDate: "2026-07-28",
      deliveryDate: "2026-08-31",
      installationDate: "2026-08-31",
      orderId: "FF2048",

      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
      secondaryImages: [
        "https://images.unsplash.com/photo-1581404476143-fb31d742929f?auto=format&fit=crop&w=800&q=80"
      ],

      activeConfiguration: {
        seater: "Palace Centerpiece Oval (48x28 in)",
        color: "Calacatta Gold Marble & Antique Brass",
        colorHex: "#EAE6DF",
        fabric: "Honed Italian Natural Marble",
        woodFinish: "Fluted Nilambur Teak & Brass",
        woodHex: "#4A2E1B",
        cushionStyle: "Honed Beveled Edge Stone Top",
        legStyle: "Fluted Teak Columns with 24K Gold Trim",
        summaryText: "Coffee Table → Calacatta Marble → Nilambur Teak Base → 48\" Centerpiece"
      },

      originalConfiguration: {
        seater: "Palace Centerpiece Oval",
        color: "Calacatta Gold",
        colorHex: "#EAE6DF",
        fabric: "Honed Marble",
        woodFinish: "Nilambur Teak",
        woodHex: "#4A2E1B",
        cushionStyle: "Beveled Stone",
        legStyle: "Fluted Teak",
        summaryText: "Coffee Table → Marble → Teak Base",
        customizedAtPurchase: "Selected book-matched Calacatta Gold marble slab with micro-beveled rim."
      },

      dimensions: {
        widthInches: 48,
        depthInches: 28,
        heightInches: 18,
        seatHeightInches: 18,
        weightKg: 52
      },

      warranty: {
        status: "ACTIVE",
        label: "10-Year Marble Slab & Teak Frame Guarantee",
        certificateId: "DOC-WRT-2026-44819",
        startDate: "2026-07-28",
        expiryDate: "2036-07-28",
        remainingYears: "9.9 Years",
        coverage: "Natural stone structural integrity, anti-stain seal, and fluted teak frame stability.",
        claimsCount: 0,
        claims: []
      },

      serviceStatus: "Healthy 🟢",
      serviceOverview: "Next annual marble nano-seal buffing due in 11 months.",
      upcomingMaintenance: [
        {
          id: "MAINT-006",
          title: "Marble Nano-Ceramic Stain Barrier Re-Seal",
          dueDate: "2027-07-28",
          urgency: "Planned",
          status: "Scheduled",
          estimatedCost: 1600,
          reason: "Maintains impervious hydrophobic seal against coffee, wine, and mineral water marks."
        }
      ],

      serviceHistory: [
        {
          id: "SRV-2026-06",
          date: "2026-08-31",
          type: "Grand Salon Installation",
          technician: "Vikram Sharma",
          notes: "Positioned 18 inches in front of The Imperial Royal Sofa. Level checked. Nano-sealed.",
          cost: 0,
          status: "Completed ✓"
        }
      ],

      repairs: [],

      roomPlacementHistory: [
        {
          fromRoom: "Warehouse Atelier",
          toRoom: "Living Room (Grand Salon)",
          date: "2026-08-31",
          reason: "Living Room centerpiece pairing with Imperial Sofa."
        }
      ],

      configurationHistory: [
        {
          date: "2026-07-28",
          change: "Ordered with book-matched Calacatta marble slab.",
          author: "Maharaja Hari"
        }
      ],

      accessoriesPurchased: [],
      replacementPartsFitted: [],

      eventTimeline: [
        {
          stage: "Purchased",
          title: "Calacatta Gold Block Quarry Selection",
          date: "2026-07-28",
          details: "Slab slab-cut in Carrara and finished in Nilambur Atelier.",
          icon: "🛒",
          badge: "Completed"
        },
        {
          stage: "Customized",
          title: "Fluted Teak Carving & Nano-Sealing",
          date: "2026-08-12",
          details: "Carved with 32 continuous flutes and double-sealed against liquids.",
          icon: "✨",
          badge: "Completed"
        },
        {
          stage: "Delivered",
          title: "Air-Ride Delivery #WF-402",
          date: "2026-08-31",
          details: "Delivered in reinforced marble vault crate.",
          icon: "🚚",
          badge: "Completed"
        },
        {
          stage: "Installed",
          title: "Centerpiece Grand Salon Setup",
          date: "2026-08-31",
          details: "Aligned with Imperial Sofa and Empress Armchair for palace conversational balance.",
          icon: "🏛️",
          badge: "Active"
        }
      ],

      smartCompanions: {
        matchingFurniture: [
          {
            id: "ff-101",
            name: "The Imperial Royal 3-Seater Sofa",
            category: "Living Room",
            price: 89999,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
            compatibilityScore: 98,
            whyRecommended: "Direct Centerpiece Anchor: Proportional length (48-inch table vs 92-inch sofa) allows 22 inches of effortless leg clearance on all sides."
          }
        ],
        compatibleAccessories: [
          {
            id: "ACC-TRY-01",
            name: "Solid Brass & Mirror Vanity Serving Tray",
            price: 4500,
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
            whyRecommended: "Reflects the warm amber light and protects stone center from direct hot beverage contact."
          }
        ],
        replacementParts: [
          {
            id: "PART-SL-01",
            name: "High-Tack Felt Base Floor Protectors (Set of 4)",
            price: 450,
            stock: 30,
            whyRecommended: "Prevents hardwood / Italian marble floor micro-scratches during table micro-adjustments."
          }
        ],
        maintenanceActions: [
          {
            action: "Neutral pH Stone Spray Cleaning",
            frequency: "Weekly",
            whyRecommended: "Preserves natural marble gloss without acidic etching."
          }
        ],
        roomImprovements: [
          {
            tip: "Place Coasters on East & West Quadrants",
            whyRecommended: "Ensures effortless drink placement within 18 inches of seated guests."
          }
        ]
      }
    }
  ];

  // Helper: Load Twins from localStorage or fallback
  function loadTwins() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("FurnitureTwinDB: Could not load from localStorage, using initial twins.", e);
    }
    saveTwins(INITIAL_TWINS);
    return INITIAL_TWINS;
  }

  // Helper: Save Twins
  function saveTwins(twins) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(twins));
    } catch (e) {
      console.warn("FurnitureTwinDB: Could not save to localStorage", e);
    }
  }

  // Helper: Load Custom Rooms
  function loadRooms() {
    try {
      const stored = localStorage.getItem(ROOMS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const set = new Set([...DEFAULT_ROOMS, ...parsed]);
          return Array.from(set);
        }
      }
    } catch (e) {
      console.warn("FurnitureTwinDB: Could not load rooms", e);
    }
    return [...DEFAULT_ROOMS];
  }

  // Helper: Save Custom Rooms
  function saveRooms(rooms) {
    try {
      localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
    } catch (e) {
      console.warn("FurnitureTwinDB: Could not save rooms", e);
    }
  }

  // Master Engine API Object
  const Engine = {
    // --- 1. TWIN RETRIEVAL ---
    getAllTwins: function() {
      return loadTwins();
    },

    getTwinById: function(id) {
      if (!id) return null;
      const twins = loadTwins();
      return twins.find(t => t.id.toLowerCase() === id.toLowerCase() || (t.legacyId && t.legacyId.toLowerCase() === id.toLowerCase())) || twins[0];
    },

    getTwinsByRoom: function(roomName) {
      const twins = loadTwins();
      if (!roomName || roomName === "All") return twins;
      return twins.filter(t => (t.currentRoom && t.currentRoom.toLowerCase() === roomName.toLowerCase()) || 
                               (t.customRoomTag && t.customRoomTag.toLowerCase() === roomName.toLowerCase()));
    },

    // --- 2. ROOM MANAGEMENT ---
    getAvailableRooms: function() {
      return loadRooms();
    },

    addCustomRoom: function(roomName) {
      if (!roomName || typeof roomName !== "string") return false;
      const clean = roomName.trim();
      if (clean.length < 2) return false;
      const rooms = loadRooms();
      if (!rooms.includes(clean)) {
        rooms.push(clean);
        saveRooms(rooms);
      }
      return rooms;
    },

    reassignTwinRoom: function(twinId, newRoom, customTag, reason) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const previousRoom = twin.currentRoom + (twin.customRoomTag ? ` (${twin.customRoomTag})` : "");
      twin.currentRoom = newRoom;
      twin.customRoomTag = customTag || newRoom;

      // Add to room history
      if (!twin.roomPlacementHistory) twin.roomPlacementHistory = [];
      const moveEntry = {
        fromRoom: previousRoom,
        toRoom: newRoom + (customTag ? ` (${customTag})` : ""),
        date: new Date().toISOString().split("T")[0],
        reason: reason || `Relocated by owner to ${newRoom}.`
      };
      twin.roomPlacementHistory.unshift(moveEntry);

      // Add to event timeline
      twin.eventTimeline.push({
        stage: "Relocated",
        title: `Relocated to ${newRoom}`,
        date: new Date().toISOString().split("T")[0],
        details: moveEntry.reason,
        icon: "🧭",
        badge: "Room Change"
      });

      saveTwins(twins);
      return twin;
    },

    // --- 3. CONFIGURATION MEMORY & SIMULATION ---
    saveCustomConfiguration: function(twinId, newConfig, note) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      // Generate summary
      const summaryText = `${twin.shortName} → ${newConfig.color || twin.activeConfiguration.color} → ${newConfig.fabric || twin.activeConfiguration.fabric} → ${newConfig.woodFinish || twin.activeConfiguration.woodFinish} → ${newConfig.seater || twin.activeConfiguration.seater}`;

      twin.activeConfiguration = {
        ...twin.activeConfiguration,
        ...newConfig,
        summaryText: summaryText
      };

      if (!twin.configurationHistory) twin.configurationHistory = [];
      twin.configurationHistory.unshift({
        date: new Date().toISOString().split("T")[0],
        change: note || `Configuration updated to: ${summaryText}`,
        author: "Owner (Maharaja Hari)"
      });

      // Add timeline event
      twin.eventTimeline.push({
        stage: "Customized",
        title: `Configuration Modified: ${newConfig.color || ''} ${newConfig.fabric || ''}`,
        date: new Date().toISOString().split("T")[0],
        details: summaryText,
        icon: "🎨",
        badge: "Twin Updated"
      });

      saveTwins(twins);
      return twin;
    },

    revertToOriginalConfiguration: function(twinId) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin || !twin.originalConfiguration) return null;

      twin.activeConfiguration = {
        ...twin.originalConfiguration
      };

      twin.configurationHistory.unshift({
        date: new Date().toISOString().split("T")[0],
        change: `Reverted to original factory configuration: ${twin.originalConfiguration.summaryText}`,
        author: "Owner (Factory Reset)"
      });

      saveTwins(twins);
      return twin;
    },

    // --- 4. SERVICE MODE ---
    scheduleMaintenance: function(twinId, taskName, dueDate, reason, cost) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const newMaint = {
        id: "MAINT-" + Date.now().toString().slice(-4),
        title: taskName,
        dueDate: dueDate || new Date(Date.now() + 30*86400000).toISOString().split("T")[0],
        urgency: "Scheduled by Owner",
        status: "Confirmed Butler Booking",
        estimatedCost: Number(cost) || 1200,
        reason: reason || "Owner requested seasonal health upkeep."
      };

      if (!twin.upcomingMaintenance) twin.upcomingMaintenance = [];
      twin.upcomingMaintenance.unshift(newMaint);
      twin.serviceStatus = "Maintenance Booked 🟡";

      saveTwins(twins);
      return newMaint;
    },

    submitRepairRequest: function(twinId, issueType, description, priority) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const ticket = {
        id: "REP-" + Date.now().toString().slice(-5),
        twinId: twinId,
        twinName: twin.name,
        issueType: issueType || "General Surface Care",
        description: description || "Routine polish and joint inspection request.",
        priority: priority || "Standard",
        dateLogged: new Date().toISOString().split("T")[0],
        status: "Butler Assigned 🟢",
        assignedButler: "Vikram Sharma (Palace Service Lead)",
        estimatedVisit: "Within 48 Hours"
      };

      if (!twin.repairs) twin.repairs = [];
      twin.repairs.unshift(ticket);

      twin.serviceHistory.unshift({
        id: ticket.id,
        date: ticket.dateLogged,
        type: `Repair Request Filed: ${issueType}`,
        technician: ticket.assignedButler,
        notes: description,
        cost: 0,
        status: "In Progress ⚙️"
      });

      twin.eventTimeline.push({
        stage: "Serviced",
        title: `Repair Request Logged (${ticket.id})`,
        date: ticket.dateLogged,
        details: `${issueType}: ${description}`,
        icon: "🛠️",
        badge: "Ticket Active"
      });

      saveTwins(twins);
      return ticket;
    },

    submitWarrantyClaim: function(twinId, claimReason, claimDetails) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const claim = {
        claimId: "CLM-" + Date.now().toString().slice(-5),
        twinId: twinId,
        date: new Date().toISOString().split("T")[0],
        reason: claimReason || "Structural Joint Verification",
        details: claimDetails || "Warranty inspection requested under 10-Year Royal Guarantee.",
        status: "APPROVED — Butler Dispatched",
        coverageApproved: "100% Covered (Zero Cost to Customer)",
        dispatchDate: "Tomorrow, 10:00 AM"
      };

      if (!twin.warranty.claims) twin.warranty.claims = [];
      twin.warranty.claims.unshift(claim);
      twin.warranty.claimsCount = twin.warranty.claims.length;

      twin.eventTimeline.push({
        stage: "Serviced",
        title: `Warranty Claim Filed (${claim.claimId})`,
        date: claim.date,
        details: `${claim.reason} - ${claim.status}`,
        icon: "📜",
        badge: "Warranty Claim"
      });

      saveTwins(twins);
      return claim;
    },

    purchaseAccessory: function(twinId, accessoryName, price) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const acc = {
        id: "ACC-" + Date.now().toString().slice(-4),
        name: accessoryName,
        purchaseDate: new Date().toISOString().split("T")[0],
        price: Number(price) || 4500,
        status: "Paired with Digital Twin"
      };

      if (!twin.accessoriesPurchased) twin.accessoriesPurchased = [];
      twin.accessoriesPurchased.unshift(acc);

      twin.eventTimeline.push({
        stage: "Upgraded",
        title: `Accessory Paired: ${accessoryName}`,
        date: acc.purchaseDate,
        details: `Integrated accessory into Digital Twin memory vault.`,
        icon: "💎",
        badge: "Accessory Added"
      });

      saveTwins(twins);
      return acc;
    },

    orderReplacementPart: function(twinId, partName, partPrice) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const part = {
        id: "PART-ORD-" + Date.now().toString().slice(-4),
        name: partName,
        date: new Date().toISOString().split("T")[0],
        status: "Ordered — Expedited Express Dispatch",
        price: Number(partPrice) || 1450
      };

      if (!twin.replacementPartsFitted) twin.replacementPartsFitted = [];
      twin.replacementPartsFitted.unshift(part);

      twin.eventTimeline.push({
        stage: "Serviced",
        title: `Genuine Part Ordered: ${partName}`,
        date: part.date,
        details: `Factory original part dispatched for maintenance fitment.`,
        icon: "⚙️",
        badge: "Part Dispatched"
      });

      saveTwins(twins);
      return part;
    },

    // --- 5. TIMELINE EVENT LOGGER ---
    logCustomEvent: function(twinId, stage, title, details) {
      const twins = loadTwins();
      const twin = twins.find(t => t.id === twinId);
      if (!twin) return null;

      const event = {
        stage: stage || "Serviced",
        title: title || "Customer Ownership Event",
        date: new Date().toISOString().split("T")[0],
        details: details || "Milestone logged by owner in Furniture Twin.",
        icon: "🌟",
        badge: "User Milestone"
      };

      if (!twin.eventTimeline) twin.eventTimeline = [];
      twin.eventTimeline.push(event);

      saveTwins(twins);
      return event;
    },

    // --- 6. SMART ROOM COLLECTION & HARMONY CALCULATION ---
    calculateRoomMetrics: function(roomName) {
      const allTwins = loadTwins();
      const roomTwins = (roomName && roomName !== "All")
        ? allTwins.filter(t => (t.currentRoom && t.currentRoom.toLowerCase() === roomName.toLowerCase()) || 
                               (t.customRoomTag && t.customRoomTag.toLowerCase() === roomName.toLowerCase()))
        : allTwins;

      if (roomTwins.length === 0) {
        return {
          roomName: roomName || "All Rooms",
          totalItems: 0,
          totalValue: 0,
          harmonyScore: 0,
          materialSynergy: "No items in room",
          paletteDescription: "Assign pieces to this room to compute color harmony.",
          circulationAssessment: "Room empty."
        };
      }

      const totalValue = roomTwins.reduce((acc, t) => acc + (t.currentEstimatedValue || t.purchasePrice || 0), 0);
      const avgHealth = Math.round(roomTwins.reduce((acc, t) => acc + (t.healthScore || 90), 0) / roomTwins.length);

      // Compute synergy score
      let harmonyScore = 92;
      if (roomTwins.length >= 3) harmonyScore = 96;
      if (roomTwins.length === 2) harmonyScore = 94;
      if (roomTwins.length === 1) harmonyScore = 90;

      // Palette extraction
      const colors = roomTwins.map(t => t.activeConfiguration.color || "Royal Hue");
      const materials = roomTwins.map(t => t.activeConfiguration.woodFinish || t.activeConfiguration.fabric);

      return {
        roomName: roomName || "Palace Collection",
        totalItems: roomTwins.length,
        totalValue: totalValue,
        harmonyScore: harmonyScore,
        avgHealthScore: avgHealth,
        colors: colors,
        materials: Array.from(new Set(materials)),
        paletteDescription: `Harmonious blend of ${colors.slice(0, 3).join(", ")} with gold leaf and seasoned timber.`,
        circulationAssessment: `Excellent spatial distribution with optimal perimeter walking corridors.`,
        stylingAdvice: `The current ensemble in ${roomName} provides exceptional symmetry and texture contrast between plush velvet, natural marble, and seasoned timber.`
      };
    },

    // --- 7. RESET TO FACTORY SEED ---
    resetAllTwins: function() {
      saveTwins(INITIAL_TWINS);
      saveRooms(DEFAULT_ROOMS);
      return INITIAL_TWINS;
    }
  };

  return Engine;
}));

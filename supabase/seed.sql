-- ============================================================================
-- FRIENDS FURNITURE — COMPLETE SUPABASE SEED DATA
-- Ultra-Luxury Royal Smart Furniture & Supply Chain Platform
-- ============================================================================

-- 1. CATEGORIES SEED DATA
INSERT INTO public.categories (id, slug, name, subtitle, description, icon, image_url, display_order)
VALUES
('c0000001-0000-0000-0000-000000000001', 'living-room', 'Living Room', 'Palace Seating & Salon Tables', 'Grand velvet chesterfields, live-edge consoles and hand-carved armchairs.', '🛋️', 'assets/categories/living-room.jpg', 1),
('c0000001-0000-0000-0000-000000000002', 'bedroom', 'Bedroom', 'Royal Sanctuaries & Canopy Beds', 'King canopy beds, hydraulic storage foundations and velvet headboards.', '🛏️', 'assets/categories/bedroom.jpg', 2),
('c0000001-0000-0000-0000-000000000003', 'dining-room', 'Dining Room', 'Grand Banquet & Live-Edge Suites', 'Solid Sheesham live-edge single slab tables and brass architectural seating.', '🍽️', 'assets/categories/dining-room.jpg', 3),
('c0000001-0000-0000-0000-000000000004', 'office', 'Office & Study', 'Executive Desks & Library Suites', 'Seasoned Nilambur teak desks with biometric vaults and leather blotters.', '💼', 'assets/categories/office.jpg', 4),
('c0000001-0000-0000-0000-000000000005', 'storage', 'Cabinets & Storage', 'Heritage Credenzas & Wardrobes', 'Solid teak armoires, fluted brass consoles and bespoke bar cabinets.', '🚪', 'assets/categories/storage.jpg', 5),
('c0000001-0000-0000-0000-000000000006', 'outdoor', 'Outdoor Living', 'Palace Courtyard & Teak Loungers', 'Weather-proof kiln-seasoned teak patio loungers and marble dining sets.', '🌴', 'assets/categories/outdoor.jpg', 6),
('c0000001-0000-0000-0000-000000000007', 'kids', 'Royal Kids & Nursery', 'Heirloom Bunk Beds & Study Desks', 'Organic non-toxic beeswax finished timber cribs and ergonomic kids desks.', '🧸', 'assets/categories/kids.jpg', 7),
('c0000001-0000-0000-0000-000000000008', 'decor', 'Palace Decor & Accents', '24K Gold Mirrors & Sculptures', 'Hand-embossed royal gold mirrors, crystal chandeliers and artisan vases.', '✨', 'assets/categories/decor.jpg', 8)
ON CONFLICT (slug) DO NOTHING;

-- 2. SUPPLIERS SEED DATA
INSERT INTO public.suppliers (id, code, name, guild_name, contact_person, email, phone, location, latitude, longitude, trust_score, on_time_rate, specialties)
VALUES
('s0000001-0000-0000-0000-000000000001', 'SUP-01', 'Nilambur Palace Teak Guild', 'Kerala Master Teak Guild', 'Master K. Ramanathan', 'nilambur.guild@friendsfurniture.com', '+91 98480 11001', 'Nilambur, Kerala, India', 11.2753, 76.2230, 98, 99, ARRAY['Kiln-Dried Nilambur Teak', '24K Gold Foil Carving', 'Mortise Joinery']),
('s0000001-0000-0000-0000-000000000002', 'SUP-02', 'Royal Sheesham Artisans Guild', 'Rajasthan Heritage Woodcraft Guild', 'Master Vikramaditya Rathore', 'sheesham.guild@friendsfurniture.com', '+91 98480 11002', 'Jodhpur, Rajasthan, India', 26.2389, 73.0243, 95, 96, ARRAY['Live-Edge Solid Sheesham', 'Hand-Forged Brass Bases', 'Resin Infusion']),
('s0000001-0000-0000-0000-000000000003', 'SUP-03', 'Bavaria Royal Oak & Hardware Co.', 'European Guild of Joinery', 'Herr Klaus Schneider', 'bavaria.oak@friendsfurniture.com', '+49 89 1234567', 'Munich, Bavaria, Germany', 48.1351, 11.5820, 96, 97, ARRAY['European White Oak', 'German Sealed Hydraulics', 'Acoustic Sound Dampening'])
ON CONFLICT (code) DO NOTHING;

-- 3. SUPPLIER TRUST SCORES SEED DATA
INSERT INTO public.supplier_trust_scores (supplier_id, overall_trust_score, timber_authenticity_rating, on_time_delivery_score, zero_defect_score, sustainability_rating, orders_fulfilled_count, audit_status)
VALUES
('s0000001-0000-0000-0000-000000000001', 98, 99, 97, 98, 99, 1420, 'Palace Certified Gold Standard'),
('s0000001-0000-0000-0000-000000000002', 95, 96, 94, 95, 96, 980, 'Palace Certified Gold Standard'),
('s0000001-0000-0000-0000-000000000003', 96, 98, 95, 97, 97, 740, 'Palace Certified Gold Standard')
ON CONFLICT (supplier_id) DO NOTHING;

-- 4. PRODUCTS SEED DATA
INSERT INTO public.products (
  id, sku, passport_id, dna_id, name, collection_name, category_id, subcategory, price, original_price,
  rating, reviews_count, stock_quantity, min_stock_threshold, supplier_id, material, craftsmanship,
  wood_type, primary_color, available_colors, available_materials, dimensions, weight_kg, warranty_years,
  health_score, images, thumbnail_url, short_description, description, care_instructions, is_featured
)
VALUES
(
  'p0000001-0000-0000-0000-000000000001',
  'FF-IMP-SOFA-01',
  'FF-2026-00125',
  'FF-SF2048',
  'The Imperial Royal Sofa',
  'Imperial Collection',
  'c0000001-0000-0000-0000-000000000001',
  'Palace Seating',
  89999.00,
  114999.00,
  4.9,
  184,
  3,
  5,
  's0000001-0000-0000-0000-000000000001',
  'Solid Nilambur Teak & Royal Velvet',
  'Hand-carved by master artisans with traditional mortise-and-tenon joinery and 24K gold foil trim.',
  'Nilambur Teak',
  'Royal Blue',
  ARRAY['Royal Blue', 'Royal Purple', 'Midnight Black', 'Emerald Palace', 'Ivory'],
  ARRAY['Royal Velvet', 'Belgian Linen', 'Bouclé', 'Italian Leather'],
  '{"lengthInches": 92, "widthInches": 38, "heightInches": 36, "display": "92\" L x 38\" W x 36\" H"}'::JSONB,
  68.0,
  10,
  94,
  ARRAY[
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ],
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  'Handcrafted luxury seating collection with kiln-dried Nilambur teak and 24K gold foil trim.',
  'The Imperial Sofa is the pinnacle of palace comfort. Crafted from sustainably harvested, kiln-dried seasoned Nilambur teak, featuring diamond-tufted royal velvet and hand-rubbed antique gold accents.',
  ARRAY['Vacuum fortnightly with soft brush', 'Treat with annual organic beeswax balm', 'Avoid direct sunlight'],
  TRUE
),
(
  'p0000001-0000-0000-0000-000000000002',
  'FF-SIG-DIN-02',
  'FF-2026-00126',
  'FF-SD3091',
  'The Sovereign Dining Suite',
  'Signature Collection',
  'c0000001-0000-0000-0000-000000000003',
  'Dining Suites',
  94999.00,
  125000.00,
  4.9,
  112,
  6,
  4,
  's0000001-0000-0000-0000-000000000002',
  'Live-Edge Solid Sheesham & Forged Brass Sled Base',
  'Individually selected single-slab live edge timber sealed with organic resin.',
  'Solid Sheesham',
  'Walnut Natural',
  ARRAY['Walnut Natural', 'Midnight Black', 'Royal Amber'],
  ARRAY['Full-Grain Leather', 'Royal Velvet', 'Belgian Linen'],
  '{"lengthInches": 84, "widthInches": 42, "heightInches": 30, "display": "84\" L x 42\" W x 30\" H (Seats 8)"}'::JSONB,
  85.0,
  10,
  96,
  ARRAY[
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80'
  ],
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
  'Dramatic live-edge solid Sheesham dining table accompanied by 6 velvet upholstered royal chairs.',
  'Celebrate majestic grand dining. Features a 2-inch solid live-edge single slab timber top, heat and stain-proof organic finish, and hand-forged antique brass base.',
  ARRAY['Wipe with damp cloth and dry', 'Use coasters and heat trivets for >70C', 'Apply teak oil annually'],
  TRUE
),
(
  'p0000001-0000-0000-0000-000000000003',
  'FF-BED-CANOPY-03',
  'FF-2026-00127',
  'FF-MB4012',
  'The Majesty King Canopy Bed',
  'Royal Comfort',
  'c0000001-0000-0000-0000-000000000002',
  'Grand Beds',
  109999.00,
  145000.00,
  5.0,
  88,
  4,
  5,
  's0000001-0000-0000-0000-000000000003',
  'European White Oak, Quilted Ivory Velvet & German Hydraulics',
  'Precision sound-dampened foundation with 900L effortless hydraulic lift.',
  'European Oak',
  'Antique Ivory',
  ARRAY['Antique Ivory', 'Royal Walnut', 'Ebony Gold'],
  ARRAY['Imperial Silk', 'Royal Velvet', 'Organic Linen'],
  '{"lengthInches": 88, "widthInches": 82, "heightInches": 54, "display": "88\" L x 82\" W x 54\" H (King)"}'::JSONB,
  110.0,
  15,
  92,
  ARRAY[
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80'
  ],
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
  'Wingback headboard with 24K gold ambient light channels and 900L underbed storage.',
  'Designed for grand master suites. Boasts an architectural wingback headboard with integrated warm gold ambient lighting and German heavy-duty hydraulic storage.',
  ARRAY['Check hydraulic pistons annually', 'Spot clean headboard with foam cleaner', 'Ensure even weight distribution'],
  TRUE
),
(
  'p0000001-0000-0000-0000-000000000004',
  'FF-EXE-DESK-04',
  'FF-2026-00128',
  'FF-ED5021',
  'The Chancellor Executive Desk',
  'Heritage Collection',
  'c0000001-0000-0000-0000-000000000004',
  'Executive Desks',
  49999.00,
  65000.00,
  4.8,
  88,
  9,
  4,
  's0000001-0000-0000-0000-000000000001',
  'Solid Teak Wood, Tuscan Saddle Leather & Gold Pulls',
  'Chamfered edge profiles with hidden biometric drawer lock.',
  'Nilambur Teak',
  'Walnut',
  ARRAY['Walnut', 'Midnight Black'],
  ARRAY['Solid Teak', 'Leatherette', 'Brass'],
  '{"lengthInches": 64, "widthInches": 32, "heightInches": 30, "display": "64\" L x 32\" W x 30\" H"}'::JSONB,
  52.0,
  10,
  95,
  ARRAY[
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80',
  'Seasoned Nilambur teak executive desk with Tuscan leather blotter and gold wire raceway.',
  'Crafted for sovereign leaders. Includes built-in wireless fast charger, hidden cable management raceway, and biometric drawer lock.',
  ARRAY['Condition leather blotter quarterly', 'Dust wood with micro-fiber cloth', 'Wipe brass pulls with flannel'],
  FALSE
),
(
  'p0000001-0000-0000-0000-000000000005',
  'FF-ARM-BOUCLE-05',
  'FF-2026-00129',
  'FF-AC6019',
  'The Empress Bouclé Armchair',
  'Modern Royal',
  'c0000001-0000-0000-0000-000000000001',
  'Palace Seating',
  34999.00,
  45000.00,
  4.9,
  142,
  8,
  3,
  's0000001-0000-0000-0000-000000000001',
  'Textured French Bouclé & Brushed Brass Swivel',
  'Sculptural curved frame with 360-degree silent bearing swivel mechanism.',
  'Teak Substructure',
  'Ivory Bouclé',
  ARRAY['Ivory Bouclé', 'Royal Emerald', 'Midnight Charcoal'],
  ARRAY['French Bouclé', 'Velvet', 'Linen'],
  '{"lengthInches": 34, "widthInches": 34, "heightInches": 32, "display": "34\" L x 34\" W x 32\" H"}'::JSONB,
  28.0,
  5,
  98,
  ARRAY[
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
  'Sculptural curved armchair wrapped in plush tactile bouclé with smooth 360 gold swivel.',
  'An iconic statement piece for reading nooks and living salon conversation circles.',
  ARRAY['Vacuum bouclé texture weekly', 'Spot clean with mild pH-neutral soap', 'Protect swivel bearings'],
  TRUE
),
(
  'p0000001-0000-0000-0000-000000000006',
  'FF-TAB-MARBLE-06',
  'FF-2026-00130',
  'FF-CT7034',
  'The Versailles Marble Coffee Table',
  'Imperial Collection',
  'c0000001-0000-0000-0000-000000000001',
  'Salon Tables',
  42999.00,
  56000.00,
  4.9,
  96,
  5,
  3,
  's0000001-0000-0000-0000-000000000002',
  'Italian Calacatta Gold Marble & 24K Gold Trim Teak Frame',
  'Precision diamond-cut marble slab with penetrating fluoropolymer sealant.',
  'Nilambur Teak & Calacatta Stone',
  'Gold Calacatta',
  ARRAY['Gold Calacatta', 'Nero Marquina Black', 'Carrara White'],
  ARRAY['Natural Marble', 'Solid Teak', 'Brass'],
  '{"lengthInches": 48, "widthInches": 30, "heightInches": 18, "display": "48\" L x 30\" W x 18\" H"}'::JSONB,
  46.0,
  10,
  97,
  ARRAY[
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
  ],
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80',
  'Italian Calacatta Gold marble slab with hand-rubbed antique gold teak foundation.',
  'Architecturally aligned to match standard 19-inch salon seating with opulent marble veining.',
  ARRAY['Wipe acidic spills immediately', 'Clean with pH-neutral stone soap', 'Reseal every 24 months'],
  FALSE
)
ON CONFLICT (sku) DO NOTHING;

-- 5. INVENTORY SEED DATA
INSERT INTO public.inventory (product_id, warehouse_location, stock_quantity, reserved_quantity, min_threshold, restock_status)
SELECT id, 'Hyderabad Central Palace Vault', stock_quantity, 0, min_stock_threshold, 'In Stock'
FROM public.products
ON CONFLICT (product_id) DO NOTHING;

-- 6. COUPONS SEED DATA
INSERT INTO public.coupons (code, title, description, discount_percent, fixed_discount, min_order_amount, badge)
VALUES
('ROYAL15', 'The Sovereign Privilege', '15% privilege on all handcrafted Teak, Sheesham & Oak collections.', 15, 0, 50000, 'ROYAL PRIVILEGE'),
('FESTIVAL25', 'Palace Festival Privilege', '25% festive privilege on signature dining suites and canopy beds.', 25, 0, 100000, 'FESTIVAL EXCLUSIVE'),
('WELCOME500', 'Royal Welcome Charter', 'Instant ₹5,000 credit on inaugural palace masterpiece acquisition.', 0, 5000, 40000, 'INAUGURAL CHARTER')
ON CONFLICT (code) DO NOTHING;

-- 7. FURNITURE DNA SEED DATA
INSERT INTO public.furniture_dna (
  dna_code, passport_id, timber_harvest_lot, guild_master, workshop_location, harvest_date,
  crafting_completed_date, carbon_offset_kg, authenticity_hash, specifications, care_protocols
)
VALUES
(
  'FF-SF2048',
  'FF-2026-00125',
  'LOT-TEAK-88-NILAMBUR',
  'Master Artisan K. Ramanathan',
  'Royal Heritage Teak Atelier, Kerala, India',
  '2025-11-14',
  '2026-06-15',
  142.50,
  '0x7F9A2B4E8C1D3F5A9E6B8C0D2F4A6B8C1D3F5E7A',
  '{"wood": "Grade-A Seasoned Nilambur Teak", "upholstery": "Imperial Emerald Velvet", "joinery": "Mortise and Tenon"}'::JSONB,
  '{"beeswaxFrequency": "12 Months", "maxDirectSunlightHrs": 2, "moistureIdeal": "45-55%"}'::JSONB
),
(
  'FF-SD3091',
  'FF-2026-00126',
  'LOT-SHEESHAM-44-JODHPUR',
  'Master Vikramaditya Rathore',
  'Jodhpur Heritage Woodcraft Guild, Rajasthan, India',
  '2025-10-20',
  '2026-06-20',
  168.00,
  '0x3E8A1D5F7C9B2E4A6C8D0F2A4B6C8E1D3F5A7B9C',
  '{"wood": "Live-Edge Solid Sheesham", "base": "Forged Brass Sled", "finish": "Organic Hardwax Oil"}'::JSONB,
  '{"beeswaxFrequency": "12 Months", "thermalLimitC": 70, "moistureIdeal": "40-50%"}'::JSONB
)
ON CONFLICT (dna_code) DO NOTHING;

-- 8. ORDERS SEED DATA
INSERT INTO public.orders (
  id, order_number, customer_name, customer_email, customer_phone, shipping_address,
  current_stage, stage_index, order_status, delivery_status, subtotal_amount, discount_amount,
  delivery_charge, final_amount, payment_status, payment_method
)
VALUES
(
  'o0000001-0000-0000-0000-000000000001',
  'FF2048',
  'Maharaja Hari',
  'hari.maharaja@friendsfurniture.com',
  '+91 98480 22100',
  'Lotus Palace Villa, Grand Salon (Chamber 1), Road No 36, Jubilee Hills, Hyderabad - 500033',
  'Out for Delivery',
  5,
  'Out for Delivery 🟢',
  'In Transit (Air Suspension)',
  114999.00,
  25000.00,
  0.00,
  89999.00,
  'Paid',
  'Instant UPI (Verified)'
),
(
  'o0000001-0000-0000-0000-000000000002',
  'FF3091',
  'Maharaja Hari',
  'hari.maharaja@friendsfurniture.com',
  '+91 98480 22100',
  'Lotus Palace Villa, Banquet Hall, Road No 36, Jubilee Hills, Hyderabad - 500033',
  'Delivered',
  6,
  'Delivered ✓',
  'Installed in Palace',
  125000.00,
  30001.00,
  0.00,
  94999.00,
  'Paid',
  '0% No-Cost EMI (24 Mo)'
)
ON CONFLICT (order_number) DO NOTHING;

-- 9. ORDER ITEMS SEED DATA
INSERT INTO public.order_items (order_id, product_id, product_name, product_image, selected_color, selected_material, selected_size, quantity, unit_price)
VALUES
(
  'o0000001-0000-0000-0000-000000000001',
  'p0000001-0000-0000-0000-000000000001',
  'The Imperial Royal Sofa',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  'Royal Blue',
  'Royal Velvet',
  'Standard 3-Seater',
  1,
  89999.00
),
(
  'o0000001-0000-0000-0000-000000000002',
  'p0000001-0000-0000-0000-000000000002',
  'The Sovereign Dining Suite',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
  'Walnut Natural',
  'Solid Sheesham',
  '8-Seater Sovereign',
  1,
  94999.00
)
ON CONFLICT DO NOTHING;

-- 10. DELIVERY TRACKING SEED DATA
INSERT INTO public.delivery_tracking (
  order_id, vehicle_number, butler_name, butler_phone, current_stage, stage_index,
  origin_name, origin_lat, origin_lng, hub_name, hub_lat, hub_lng, destination_name,
  destination_lat, destination_lng, current_lat, current_lng, vibration_sensor_g, eta_display
)
VALUES
(
  'o0000001-0000-0000-0000-000000000001',
  'Air-Suspension Van #WF-402',
  'Master S. Narayanan',
  '+91 98480 22100',
  'Out for Delivery',
  5,
  'Nilambur Palace Atelier Hub, Kerala',
  11.275300,
  76.223000,
  'NH-44 Kurnool Logistics Corridor Hub',
  15.828100,
  78.037300,
  'Lotus Palace Villa, Jubilee Hills, Hyderabad',
  17.431900,
  78.407300,
  17.412000,
  78.435000,
  0.020,
  'Today, 12:45 PM (12 mins away)'
)
ON CONFLICT (order_id) DO NOTHING;

-- 11. REVIEWS SEED DATA
INSERT INTO public.reviews (product_id, author_name, rating, title, comment, chamber_room, verified_purchase)
VALUES
(
  'p0000001-0000-0000-0000-000000000001',
  'Maharaja Hari',
  5,
  'Unrivaled Grandeur & Craftsmanship',
  'The solid Nilambur teak foundation and emerald velvet tufting surpassed expectations. The digital twin telemetry and white-glove setup made this feel like a true royal commission.',
  'Grand Royal Salon',
  TRUE
),
(
  'p0000001-0000-0000-0000-000000000002',
  'Princess S. Devika',
  5,
  'Exquisite Live-Edge Single Slab',
  'The live-edge Sheesham wood grain is magnificent. Seats 8 dignitaries with generous elbow room. 0% EMI process was seamless.',
  'Banquet Hall',
  TRUE
)
ON CONFLICT DO NOTHING;

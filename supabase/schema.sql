-- ============================================================================
-- FRIENDS FURNITURE — COMPLETE SUPABASE DATABASE SCHEMA (100% FREE-TIER)
-- Ultra-Luxury Royal Smart Furniture & Supply Chain Platform
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. USERS / PROFILES TABLE (Linked to auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'supplier', 'showroom_owner', 'butler')),
    membership_tier TEXT NOT NULL DEFAULT 'SILVER' CHECK (membership_tier IN ('SILVER', 'GOLD', 'PLATINUM')),
    reward_points INTEGER NOT NULL DEFAULT 0,
    avatar_url TEXT,
    primary_address TEXT,
    city TEXT DEFAULT 'Hyderabad',
    state TEXT DEFAULT 'Telangana',
    pincode TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. SUPPLIERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- e.g. 'SUP-01'
    name TEXT NOT NULL,
    guild_name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    location TEXT NOT NULL, -- e.g. 'Nilambur, Kerala, India'
    latitude NUMERIC(10, 6) DEFAULT 11.2753,
    longitude NUMERIC(10, 6) DEFAULT 76.2230,
    specialties TEXT[] DEFAULT ARRAY['Kiln-Dried Nilambur Teak', '24K Gold Foil Carving'],
    trust_score INTEGER NOT NULL DEFAULT 95 CHECK (trust_score BETWEEN 0 AND 100),
    on_time_rate INTEGER NOT NULL DEFAULT 98,
    status TEXT NOT NULL DEFAULT 'Active Verified' CHECK (status IN ('Active Verified', 'Probation', 'Suspended')),
    profile_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. PRODUCTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL, -- e.g. 'FF-IMP-SOFA-01'
    passport_id TEXT,
    dna_id TEXT,
    name TEXT NOT NULL,
    collection_name TEXT NOT NULL DEFAULT 'Imperial Collection',
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    subcategory TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(12, 2) NOT NULL CHECK (original_price >= price),
    discount_percent INTEGER GENERATED ALWAYS AS (ROUND(((original_price - price) / original_price) * 100)) STORED,
    rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating BETWEEN 0 AND 5),
    reviews_count INTEGER DEFAULT 0,
    stock_quantity INTEGER NOT NULL DEFAULT 5 CHECK (stock_quantity >= 0),
    min_stock_threshold INTEGER NOT NULL DEFAULT 3,
    in_stock BOOLEAN GENERATED ALWAYS AS (stock_quantity > 0) STORED,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    material TEXT NOT NULL,
    craftsmanship TEXT,
    wood_type TEXT,
    primary_color TEXT NOT NULL,
    available_colors TEXT[] DEFAULT ARRAY['Royal Blue', 'Midnight Black', 'Ivory'],
    available_materials TEXT[] DEFAULT ARRAY['Velvet', 'Solid Teak', 'Italian Leather'],
    available_sizes TEXT[] DEFAULT ARRAY['3-Seater Standard', '4-Seater Sovereign'],
    dimensions JSONB NOT NULL DEFAULT '{"lengthInches": 92, "widthInches": 38, "heightInches": 36, "display": "92\" L x 38\" W x 36\" H"}'::JSONB,
    weight_kg NUMERIC(6, 2) DEFAULT 68.0,
    warranty_years INTEGER DEFAULT 10,
    warranty_details JSONB DEFAULT '{"status": "ACTIVE", "coverage": "100% Timber Foundation & Joinery"}'::JSONB,
    health_score INTEGER DEFAULT 95 CHECK (health_score BETWEEN 0 AND 100),
    personality JSONB DEFAULT '{"luxury": 98, "classic": 90, "modern": 75}'::JSONB,
    images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    thumbnail_url TEXT,
    short_description TEXT,
    description TEXT,
    care_instructions TEXT[] DEFAULT ARRAY['Vacuum weekly', 'Annual organic beeswax treatment'],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. INVENTORY TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    warehouse_location TEXT NOT NULL DEFAULT 'Hyderabad Central Palace Vault',
    stock_quantity INTEGER NOT NULL DEFAULT 5,
    reserved_quantity INTEGER NOT NULL DEFAULT 0,
    available_quantity INTEGER GENERATED ALWAYS AS (stock_quantity - reserved_quantity) STORED,
    min_threshold INTEGER NOT NULL DEFAULT 3,
    restock_status TEXT NOT NULL DEFAULT 'In Stock' CHECK (restock_status IN ('In Stock', 'Low Reserve', 'Out of Stock', 'Reorder Placed')),
    last_restocked_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. ORDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL, -- e.g. 'FF2048'
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    current_stage TEXT NOT NULL DEFAULT 'Confirmed' CHECK (current_stage IN ('Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled')),
    stage_index INTEGER NOT NULL DEFAULT 1 CHECK (stage_index BETWEEN 1 AND 6),
    order_status TEXT NOT NULL DEFAULT 'In Progress',
    delivery_status TEXT NOT NULL DEFAULT 'In Transit (Air Suspension)',
    estimated_delivery DATE DEFAULT (CURRENT_DATE + INTERVAL '5 days'),
    subtotal_amount NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    delivery_charge NUMERIC(12, 2) DEFAULT 0.00, -- Free White-Glove
    final_amount NUMERIC(12, 2) NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    payment_method TEXT DEFAULT 'Instant UPI / 0% EMI',
    emi_tenure_months INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. ORDER ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_image TEXT,
    selected_color TEXT,
    selected_material TEXT,
    selected_size TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    transaction_id TEXT UNIQUE NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method TEXT NOT NULL, -- 'UPI', 'CARD', 'NETBANKING', '0% EMI'
    emi_tenure_months INTEGER DEFAULT 0,
    emi_monthly_amount NUMERIC(12, 2) DEFAULT 0.00,
    gateway_name TEXT DEFAULT 'Free-Tier Native Mock / Razorpay',
    status TEXT NOT NULL DEFAULT 'SUCCESS' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. COUPONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- e.g. 'ROYAL15'
    title TEXT NOT NULL,
    description TEXT,
    discount_percent INTEGER DEFAULT 0 CHECK (discount_percent BETWEEN 0 AND 100),
    fixed_discount NUMERIC(10, 2) DEFAULT 0.00,
    min_order_amount NUMERIC(12, 2) DEFAULT 0.00,
    badge TEXT DEFAULT 'ROYAL PRIVILEGE',
    is_active BOOLEAN DEFAULT TRUE,
    valid_until TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 10. REWARDS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    points_balance INTEGER NOT NULL DEFAULT 4250,
    tier TEXT NOT NULL DEFAULT 'GOLD' CHECK (tier IN ('SILVER', 'GOLD', 'PLATINUM')),
    lifetime_points_earned INTEGER DEFAULT 8500,
    lifetime_points_redeemed INTEGER DEFAULT 4250,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 11. REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    comment TEXT NOT NULL,
    chamber_room TEXT DEFAULT 'Grand Salon',
    verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. DELIVERY TRACKING TABLE (Live GPS & Leaflet integration)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.delivery_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID UNIQUE REFERENCES public.orders(id) ON DELETE CASCADE,
    vehicle_number TEXT NOT NULL DEFAULT 'Air-Suspension Van #WF-402',
    butler_name TEXT NOT NULL DEFAULT 'Vikram Sharma',
    butler_phone TEXT NOT NULL DEFAULT '+91 98480 22100',
    current_stage TEXT NOT NULL DEFAULT 'Out for Delivery',
    stage_index INTEGER NOT NULL DEFAULT 5,
    origin_name TEXT DEFAULT 'Nilambur Atelier Workshop, Kerala',
    origin_lat NUMERIC(10, 6) DEFAULT 11.2753,
    origin_lng NUMERIC(10, 6) DEFAULT 76.2230,
    hub_name TEXT DEFAULT 'NH-44 Kurnool Logistics Corridor',
    hub_lat NUMERIC(10, 6) DEFAULT 15.8281,
    hub_lng NUMERIC(10, 6) DEFAULT 78.0373,
    destination_name TEXT DEFAULT 'Lotus Palace Villa, Jubilee Hills, Hyderabad',
    destination_lat NUMERIC(10, 6) DEFAULT 17.4319,
    destination_lng NUMERIC(10, 6) DEFAULT 78.4073,
    current_lat NUMERIC(10, 6) DEFAULT 17.3850,
    current_lng NUMERIC(10, 6) DEFAULT 78.4867,
    vibration_sensor_g NUMERIC(4, 3) DEFAULT 0.020,
    eta_display TEXT DEFAULT 'Today, 12:45 PM',
    tracking_logs JSONB DEFAULT '[
      {"stage": "Confirmed", "time": "28 Aug 10:30 AM", "detail": "Charter confirmed."},
      {"stage": "Processing", "time": "29 Aug 02:15 PM", "detail": "Seasoned timber allocated."},
      {"stage": "Packed", "time": "30 Aug 11:00 AM", "detail": "5-layer protective wrap applied."},
      {"stage": "Shipped", "time": "31 Aug 08:30 AM", "detail": "Dispatched via Air-Suspension fleet."},
      {"stage": "Out for Delivery", "time": "Active Now", "detail": "Lead Butler en route."}
    ]'::JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 13. NOTIFICATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_role TEXT DEFAULT 'customer' CHECK (target_role IN ('all', 'customer', 'admin', 'supplier', 'showroom_owner', 'butler')),
    category TEXT NOT NULL DEFAULT 'order' CHECK (category IN ('order', 'delivery', 'ai', 'stock', 'supplier', 'offers', 'loyalty', 'emi')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 14. FURNITURE DNA TABLE (Digital Life Passport)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.furniture_dna (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dna_code TEXT UNIQUE NOT NULL, -- e.g. 'FF-SF2048'
    passport_id TEXT UNIQUE NOT NULL, -- e.g. 'FF-2026-00125'
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    timber_harvest_lot TEXT NOT NULL DEFAULT 'LOT-TEAK-88-NILAMBUR',
    guild_master TEXT NOT NULL DEFAULT 'Master Artisan K. Ramanathan',
    workshop_location TEXT NOT NULL DEFAULT 'Royal Heritage Teak Atelier, Kerala, India',
    harvest_date DATE DEFAULT '2025-11-14',
    crafting_completed_date DATE DEFAULT '2026-06-15',
    carbon_offset_kg NUMERIC(6, 2) DEFAULT 142.50,
    authenticity_hash TEXT NOT NULL,
    specifications JSONB NOT NULL DEFAULT '{"wood": "Grade-A Seasoned Teak", "upholstery": "Imperial Velvet", "joinery": "Mortise and Tenon"}'::JSONB,
    care_protocols JSONB NOT NULL DEFAULT '{"beeswaxFrequency": "12 Months", "maxDirectSunlightHrs": 2, "moistureIdeal": "45-55%"}'::JSONB,
    service_history JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 15. FURNITURE TWINS TABLE (Digital Twin Telemetry)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.furniture_twins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    twin_code TEXT UNIQUE NOT NULL, -- e.g. 'TWIN-SF2048-HYD'
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    dna_id UUID REFERENCES public.furniture_dna(id) ON DELETE SET NULL,
    name TEXT NOT NULL DEFAULT 'The Imperial Royal Sofa',
    current_room TEXT NOT NULL DEFAULT 'Living Room',
    custom_room_tag TEXT DEFAULT 'Grand Salon',
    status TEXT NOT NULL DEFAULT 'Active & Living 🟢',
    health_score INTEGER NOT NULL DEFAULT 94 CHECK (health_score BETWEEN 0 AND 100),
    condition_label TEXT DEFAULT 'Pristine Palace Condition',
    purchase_price NUMERIC(12, 2) NOT NULL DEFAULT 89999.00,
    estimated_value NUMERIC(12, 2) DEFAULT 98500.00,
    purchase_date DATE DEFAULT '2026-07-28',
    delivery_date DATE DEFAULT '2026-08-31',
    warranty_expiry DATE DEFAULT '2036-08-31',
    telemetry_data JSONB DEFAULT '{"moistureLevel": "9.4%", "springTension": "98%", "velvetMartindaleRemaining": "62,000 rubs"}'::JSONB,
    customization_memory JSONB DEFAULT '{"color": "Royal Blue", "material": "Velvet", "legStyle": "24K Gold Sabots"}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 16. SUPPLIER TRUST SCORES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.supplier_trust_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID UNIQUE REFERENCES public.suppliers(id) ON DELETE CASCADE,
    overall_trust_score INTEGER NOT NULL DEFAULT 98 CHECK (overall_trust_score BETWEEN 0 AND 100),
    timber_authenticity_rating INTEGER NOT NULL DEFAULT 99,
    on_time_delivery_score INTEGER NOT NULL DEFAULT 96,
    zero_defect_score INTEGER NOT NULL DEFAULT 97,
    sustainability_rating INTEGER NOT NULL DEFAULT 98,
    orders_fulfilled_count INTEGER DEFAULT 1420,
    audit_status TEXT DEFAULT 'Palace Certified Gold Standard',
    last_evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE (FREE TIER OPTIMIZATION)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_supplier ON public.products(supplier_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_furniture_dna_code ON public.furniture_dna(dna_code);
CREATE INDEX IF NOT EXISTS idx_furniture_twins_user ON public.furniture_twins(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(is_read) WHERE is_read = FALSE;

-- ============================================================================
-- AUTOMATED TRIGGERS & PROCEDURES
-- ============================================================================

-- Generic Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_inventory_updated_at ON public.inventory;
CREATE TRIGGER trg_inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_furniture_twins_updated_at ON public.furniture_twins;
CREATE TRIGGER trg_furniture_twins_updated_at BEFORE UPDATE ON public.furniture_twins FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-deduct inventory on new order item
CREATE OR REPLACE FUNCTION public.deduct_inventory_on_order()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.products
    SET stock_quantity = GREATEST(0, stock_quantity - NEW.quantity)
    WHERE id = NEW.product_id;

    UPDATE public.inventory
    SET stock_quantity = GREATEST(0, stock_quantity - NEW.quantity),
        restock_status = CASE 
            WHEN (stock_quantity - NEW.quantity) <= 0 THEN 'Out of Stock'
            WHEN (stock_quantity - NEW.quantity) <= min_threshold THEN 'Low Reserve'
            ELSE 'In Stock'
        END
    WHERE product_id = NEW.product_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_order_items_deduct_inventory ON public.order_items;
CREATE TRIGGER trg_order_items_deduct_inventory
AFTER INSERT ON public.order_items
FOR EACH ROW EXECUTE FUNCTION public.deduct_inventory_on_order();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.furniture_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.furniture_twins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplier_trust_scores ENABLE ROW LEVEL SECURITY;

-- 1. Public read-only tables (Catalog browsing)
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON public.categories;
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public products are viewable by everyone" ON public.products;
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public suppliers are viewable by everyone" ON public.suppliers;
CREATE POLICY "Public suppliers are viewable by everyone" ON public.suppliers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public coupons are viewable by everyone" ON public.coupons;
CREATE POLICY "Public coupons are viewable by everyone" ON public.coupons FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public DNA passports are viewable by everyone" ON public.furniture_dna;
CREATE POLICY "Public DNA passports are viewable by everyone" ON public.furniture_dna FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public supplier trust scores are viewable by everyone" ON public.supplier_trust_scores;
CREATE POLICY "Public supplier trust scores are viewable by everyone" ON public.supplier_trust_scores FOR SELECT USING (true);

-- 2. User Specific Security (Profiles, Orders, Twins, Rewards, Notifications)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items;
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR auth.role() = 'service_role'))
);

DROP POLICY IF EXISTS "Users can insert order items" ON public.order_items;
CREATE POLICY "Users can insert order items" ON public.order_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own tracking" ON public.delivery_tracking;
CREATE POLICY "Users can view own tracking" ON public.delivery_tracking FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view own rewards" ON public.rewards;
CREATE POLICY "Users can view own rewards" ON public.rewards FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own twins" ON public.furniture_twins;
CREATE POLICY "Users can view own twins" ON public.furniture_twins FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can manage own twins" ON public.furniture_twins;
CREATE POLICY "Users can manage own twins" ON public.furniture_twins FOR ALL USING (auth.uid() = user_id OR auth.uid() IS NULL);

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id OR target_role = 'all' OR target_role = 'customer');

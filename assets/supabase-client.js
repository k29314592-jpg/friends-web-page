/**
 * ============================================================================
 * FRIENDS FURNITURE — SUPABASE CLIENT & DATA ACCESS LAYER (100% FREE-TIER)
 * “Where Luxury Meets Comfort.”
 * ============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FF_DB = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  let supabaseClient = null;
  const isDemo = () => window.FF_CONFIG ? window.FF_CONFIG.app.isDemoMode() : true;

  // Initialize Supabase Client
  function getClient() {
    if (supabaseClient) return supabaseClient;
    if (typeof window.supabase !== 'undefined' && window.FF_CONFIG && !isDemo()) {
      try {
        supabaseClient = window.supabase.createClient(
          window.FF_CONFIG.supabase.url,
          window.FF_CONFIG.supabase.anonKey
        );
        console.log("🏛️ [Supabase] Connected to live Supabase project.");
        return supabaseClient;
      } catch (err) {
        console.warn("⚠️ [Supabase] Failed to init live client. Using local fallback.", err);
      }
    }
    return null;
  }

  // --- 1. PRODUCTS REPOSITORY ---
  async function getProducts(options = {}) {
    const client = getClient();
    if (client) {
      try {
        let query = client.from('products').select('*, categories(*), suppliers(*)');
        if (options.categorySlug) {
          query = query.eq('categories.slug', options.categorySlug);
        }
        if (options.featuredOnly) {
          query = query.eq('is_featured', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn("Supabase fetch products error, fallback to local:", e);
      }
    }
    // Fallback: Local dataset from furnitureData.js or DEFAULT_PRODUCTS
    return typeof LUXURY_PRODUCTS !== 'undefined' ? LUXURY_PRODUCTS : (window.DEFAULT_PRODUCTS || []);
  }

  async function getProductById(productId) {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('products')
          .select('*, categories(*), suppliers(*)')
          .or(`id.eq.${productId},sku.eq.${productId}`)
          .single();
        if (!error && data) return data;
      } catch (e) {}
    }
    const list = await getProducts();
    return list.find(p => p.id === productId || p.sku === productId || p.dnaId === productId) || list[0];
  }

  // --- 2. CATEGORIES REPOSITORY ---
  async function getCategories() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('categories').select('*').order('display_order');
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return [
      { id: "c1", slug: "living-room", name: "Living Room", icon: "🛋️", image_url: "assets/categories/living-room.jpg" },
      { id: "c2", slug: "bedroom", name: "Bedroom", icon: "🛏️", image_url: "assets/categories/bedroom.jpg" },
      { id: "c3", slug: "dining-room", name: "Dining Room", icon: "🍽️", image_url: "assets/categories/dining-room.jpg" },
      { id: "c4", slug: "office", name: "Office", icon: "💼", image_url: "assets/categories/office.jpg" },
      { id: "c5", slug: "storage", name: "Cabinets & Storage", icon: "🚪", image_url: "assets/categories/storage.jpg" },
      { id: "c6", slug: "outdoor", name: "Outdoor Living", icon: "🌴", image_url: "assets/categories/outdoor.jpg" },
      { id: "c7", slug: "kids", name: "Royal Kids", icon: "🧸", image_url: "assets/categories/kids.jpg" },
      { id: "c8", slug: "decor", name: "Palace Decor", icon: "✨", image_url: "assets/categories/decor.jpg" }
    ];
  }

  // --- 3. ORDERS REPOSITORY ---
  async function getOrders(userId = null) {
    const client = getClient();
    if (client) {
      try {
        let q = client.from('orders').select('*, order_items(*), delivery_tracking(*)').order('created_at', { ascending: false });
        if (userId) q = q.eq('user_id', userId);
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return typeof LUXURY_ORDERS !== 'undefined' ? LUXURY_ORDERS : [];
  }

  async function createOrder(orderPayload) {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('orders').insert([orderPayload]).select().single();
        if (!error && data) {
          if (orderPayload.items && orderPayload.items.length > 0) {
            const items = orderPayload.items.map(it => ({
              order_id: data.id,
              product_id: it.productId,
              product_name: it.name,
              product_image: it.image,
              selected_color: it.color,
              selected_material: it.material,
              quantity: it.quantity || 1,
              unit_price: it.price
            }));
            await client.from('order_items').insert(items);
          }
          return { success: true, order: data };
        }
      } catch (e) {
        console.warn("Supabase create order error:", e);
      }
    }
    // Fallback: LocalStorage simulation
    const localOrders = JSON.parse(localStorage.getItem('FF_LOCAL_ORDERS') || '[]');
    const newOrder = {
      orderId: "FF-" + Math.floor(1000 + Math.random() * 9000),
      orderNumber: "FF-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      ...orderPayload
    };
    localOrders.unshift(newOrder);
    localStorage.setItem('FF_LOCAL_ORDERS', JSON.stringify(localOrders));
    return { success: true, order: newOrder };
  }

  // --- 4. DIGITAL TWINS REPOSITORY ---
  async function getDigitalTwins(userId = null) {
    const client = getClient();
    if (client) {
      try {
        let q = client.from('furniture_twins').select('*, products(*), furniture_dna(*)');
        if (userId) q = q.eq('user_id', userId);
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    if (typeof FurnitureTwinDB !== 'undefined' && FurnitureTwinDB.getAllTwins) {
      return FurnitureTwinDB.getAllTwins();
    }
    return [];
  }

  // --- 5. DNA PASSPORTS REPOSITORY ---
  async function getPassportById(passportId) {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('furniture_dna')
          .select('*, products(*)')
          .or(`passport_id.eq.${passportId},dna_code.eq.${passportId}`)
          .single();
        if (!error && data) return data;
      } catch (e) {}
    }
    if (typeof FurniturePassportDB !== 'undefined' && FurniturePassportDB.getPassportById) {
      return FurniturePassportDB.getPassportById(passportId);
    }
    return null;
  }

  // --- 6. SUPPLIER TRUST SCORES ---
  async function getSupplierTrustScores() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('supplier_trust_scores').select('*, suppliers(*)');
        if (!error && data) return data;
      } catch (e) {}
    }
    return [
      { supplierName: "Nilambur Palace Teak Guild", overallScore: 98, onTimeRate: 99, zeroDefects: 98 },
      { supplierName: "Royal Sheesham Artisans Guild", overallScore: 95, onTimeRate: 96, zeroDefects: 95 },
      { supplierName: "Bavaria Royal Oak & Co.", overallScore: 96, onTimeRate: 97, zeroDefects: 97 }
    ];
  }

  // --- 7. NOTIFICATIONS REPOSITORY ---
  async function getNotifications(userRole = 'customer') {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client.from('notifications')
          .select('*')
          .or(`target_role.eq.all,target_role.eq.${userRole}`)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {}
    }
    return typeof SMART_NOTIFICATIONS !== 'undefined' ? SMART_NOTIFICATIONS : [];
  }

  // --- 8. STORAGE FILE UPLOAD ---
  async function uploadImage(file, bucketName = 'user-uploads') {
    const client = getClient();
    if (!client) {
      // In demo mode, convert to local DataURL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ success: true, url: reader.result });
        reader.readAsDataURL(file);
      });
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const { data, error } = await client.storage.from(bucketName).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      if (error) throw error;
      const { data: publicUrlData } = client.storage.from(bucketName).getPublicUrl(fileName);
      return { success: true, url: publicUrlData.publicUrl };
    } catch (err) {
      console.error("Storage upload error:", err);
      return { success: false, error: err.message };
    }
  }

  return {
    getClient,
    isDemo,
    getProducts,
    getProductById,
    getCategories,
    getOrders,
    createOrder,
    getDigitalTwins,
    getPassportById,
    getSupplierTrustScores,
    getNotifications,
    uploadImage
  };
}));

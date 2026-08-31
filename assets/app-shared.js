/**
 * ==========================================================================
 * FRIENDS FURNITURE — UNIVERSAL LUXURY SMART PLATFORM SHARED ENGINE (V3.0)
 * “Where Luxury Meets Comfort. Furniture For Friends. Comfort For Life.”
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- 1. DEFAULT DATA FALLBACKS ---
  const DEFAULT_PRODUCTS = [
    {
      id: "ff-101",
      sku: "FF-IMP-SOFA-01",
      name: "The Imperial Royal Sofa",
      category: "Living Room",
      subcategory: "Palace Seating",
      price: 89999,
      originalPrice: 114999,
      rating: 4.9,
      reviewsCount: 184,
      material: "Solid Nilambur Teak & Royal Velvet",
      dimensions: "92\" L x 38\" W x 36\" H",
      warranty: "10-Year Royal Structural Guarantee",
      stock: 3,
      inStock: true,
      estimatedDelivery: "4–6 Days",
      deliveryConfidence: 94,
      supplierName: "Nilambur Palace Teak Guild",
      supplierTrustScore: 98,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      colors: ["Royal Blue", "Royal Purple", "Midnight Black", "Emerald Palace", "Ivory"],
      fabrics: ["Royal Velvet", "Belgian Linen", "Bouclé", "Italian Leather", "Silk Damask"],
      woodFinishes: ["Nilambur Teak", "Royal Sheesham", "Smoked Oak", "Ebony", "Bleached Ash"],
      sizes: ["Compact 2-Seater", "Standard 3-Seater", "Sovereign 4-Seater", "Palace L-Sectional"],
      cushionStyles: ["Diamond Tufted", "Feather-Plush", "Fluted Classic", "Dual-Density Ergonomic"],
      legStyles: ["24K Gold Sabots", "Fluted Brass", "Sculpted Teak", "Matte Obsidian Steel"],
      roomRecommendationReason: "Recommended because you viewed luxury palace living room furniture."
    },
    {
      id: "ff-102",
      sku: "FF-SIG-DIN-02",
      name: "The Sovereign Dining Suite",
      category: "Dining",
      subcategory: "Dining Suites",
      price: 94999,
      originalPrice: 125000,
      rating: 4.9,
      reviewsCount: 112,
      material: "Live-Edge Solid Sheesham & Forged Brass",
      dimensions: "84\" L x 42\" W x 30\" H (Seats 8)",
      warranty: "10-Year Solid Timber Guarantee",
      stock: 6,
      inStock: true,
      estimatedDelivery: "5–7 Days",
      deliveryConfidence: 92,
      supplierName: "Royal Sheesham Artisans Guild",
      supplierTrustScore: 95,
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
      colors: ["Walnut Natural", "Midnight Black", "Royal Amber"],
      fabrics: ["Full-Grain Leather", "Royal Velvet", "Belgian Linen"],
      woodFinishes: ["Royal Sheesham", "Nilambur Teak", "Smoked Oak"],
      sizes: ["6-Seater Banquet", "8-Seater Sovereign", "12-Seater Royal Grand"],
      cushionStyles: ["Ergonomic Padded", "Diamond Tufted", "Classic Flat"],
      legStyles: ["Forged Brass Sled", "Solid Teak Trestle", "Matte Black Steel"],
      roomRecommendationReason: "Recommended for spacious 18x14ft banquet rooms with grand natural lighting."
    },
    {
      id: "ff-103",
      sku: "FF-BED-CANOPY-03",
      name: "The Majesty King Canopy Bed",
      category: "Bedroom",
      subcategory: "King Beds",
      price: 119999,
      originalPrice: 159999,
      rating: 5.0,
      reviewsCount: 88,
      material: "Four-Poster Seasoned Teak & 24K Gold Inlays",
      dimensions: "86\" L x 80\" W x 88\" H (King Size)",
      warranty: "15-Year Master Guarantee",
      stock: 2,
      inStock: true,
      estimatedDelivery: "6–8 Days",
      deliveryConfidence: 96,
      supplierName: "Nilambur Palace Teak Guild",
      supplierTrustScore: 98,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      colors: ["Royal Walnut", "Antique Ivory", "Ebony Gold"],
      fabrics: ["Imperial Silk", "Royal Velvet", "Organic Linen"],
      woodFinishes: ["Nilambur Teak", "Royal Sheesham", "Smoked Oak"],
      sizes: ["Queen Sanctuary", "King Palace Grand", "Super King Imperial"],
      cushionStyles: ["Upholstered Headboard", "Hand-Carved Timber", "Tufted Velvet"],
      legStyles: ["Hand-Turned Teak Pillars", "24K Gold Leaf Accents", "Minimal Brass"],
      roomRecommendationReason: "Recommended based on your interest in Master Heritage Bedroom suites."
    },
    {
      id: "ff-104",
      sku: "FF-EXE-DESK-04",
      name: "The Chancellor Executive Desk",
      category: "Office",
      subcategory: "Executive Suites",
      price: 64999,
      originalPrice: 82999,
      rating: 4.8,
      reviewsCount: 76,
      material: "Solid Teak with Top-Grain Leather Pad & Brass Pulls",
      dimensions: "72\" L x 36\" W x 30\" H",
      warranty: "10-Year Guarantee",
      stock: 4,
      inStock: true,
      estimatedDelivery: "3–5 Days",
      deliveryConfidence: 97,
      supplierName: "Deccan Brass & Teak Atelier",
      supplierTrustScore: 94,
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      colors: ["Smoked Walnut", "Ebony Black", "Cognac Teak"],
      fabrics: ["Top-Grain Italian Leather", "Brass Foil Accents"],
      woodFinishes: ["Nilambur Teak", "Smoked Oak", "Royal Sheesham"],
      sizes: ["60\" Studio", "72\" Executive", "84\" Presidential"],
      cushionStyles: ["Ergonomic Integrated Blotter", "Solid Wood Top"],
      legStyles: ["Fluted Teak Pedestals", "Brass Sled Base", "Tapered Teak"],
      roomRecommendationReason: "Recommended because you saved items in Executive Office curations."
    },
    {
      id: "ff-105",
      sku: "FF-ARM-BOUCLE-05",
      name: "The Empress Bouclé Armchair",
      category: "Living Room",
      subcategory: "Accent Seating",
      price: 34999,
      originalPrice: 45000,
      rating: 4.9,
      reviewsCount: 142,
      material: "Ivory Sculptural Bouclé & Brushed Brass Swivel",
      dimensions: "36\" L x 34\" W x 32\" H",
      warranty: "5-Year Guarantee",
      stock: 7,
      inStock: true,
      estimatedDelivery: "3–4 Days",
      deliveryConfidence: 98,
      supplierName: "Nilambur Palace Teak Guild",
      supplierTrustScore: 98,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      colors: ["Pearl Ivory", "Champagne Gold", "Emerald Velvet", "Midnight Charcoal"],
      fabrics: ["Sculptural Bouclé", "Royal Velvet", "Belgian Linen"],
      woodFinishes: ["Nilambur Teak", "Brushed Brass", "Smoked Oak"],
      sizes: ["Standard Club", "Grand Lounge"],
      cushionStyles: ["Cocoon Plush", "Curved Ergonomic"],
      legStyles: ["Brushed Brass Swivel", "Tapered Gold Legs", "Teak Pegs"],
      roomRecommendationReason: "Tactile companion match for The Imperial Sofa."
    },
    {
      id: "ff-106",
      sku: "FF-COF-MARBLE-06",
      name: "The Versailles Marble Coffee Table",
      category: "Living Room",
      subcategory: "Occasional Tables",
      price: 42999,
      originalPrice: 56000,
      rating: 4.9,
      reviewsCount: 94,
      material: "Italian Calacatta Gold Marble & 24K Gold Frame",
      dimensions: "52\" L x 30\" W x 18\" H",
      warranty: "10-Year Marble & Frame Guarantee",
      stock: 5,
      inStock: true,
      estimatedDelivery: "4–5 Days",
      deliveryConfidence: 95,
      supplierName: "Deccan Brass & Teak Atelier",
      supplierTrustScore: 94,
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
      colors: ["Calacatta Gold", "Nero Marquina Black", "Emerald Verde"],
      fabrics: ["Honed Italian Marble Top"],
      woodFinishes: ["24K Gold Plated Steel", "Forged Antique Brass", "Matte Black Steel"],
      sizes: ["44\" Compact", "52\" Standard", "60\" Grand Salon"],
      cushionStyles: ["Beveled Edge Marble"],
      legStyles: ["Geometric Gold Cage", "Fluted Brass Pillar", "Minimal Steel"],
      roomRecommendationReason: "Architecturally matches the seat height of The Imperial Sofa."
    }
  ];

  const DEFAULT_NOTIFICATIONS = [
    {
      id: "notif-1",
      category: "order",
      title: "👑 Order #FF-2026-9948 Confirmed",
      message: "The Imperial Sofa is registered in your vault. Guild inspection scheduled.",
      time: "10 mins ago",
      unread: true,
      actionUrl: "customer-dashboard.html#ordersSec"
    },
    {
      id: "notif-2",
      category: "delivery",
      title: "🚚 Air-Suspension Fleet Dispatched",
      message: "Delivery van #WF-402 is in transit to Banjara Hills. Estimated ETA: 12:45 PM.",
      time: "45 mins ago",
      unread: true,
      actionUrl: "customer-dashboard.html#ordersSec"
    },
    {
      id: "notif-3",
      category: "ai",
      title: "🤖 AI Delivery Precision (96% Confidence)",
      message: "Zero transit weather bottleneck detected on Mumbai-Hyderabad green corridor.",
      time: "2 hours ago",
      unread: true,
      actionUrl: "smart-studio.html#deliverySec"
    },
    {
      id: "notif-4",
      category: "stock",
      title: "⚠️ Low Stock Alert (Only 2 Left)",
      message: "The Majesty King Canopy Bed has only 2 palace units remaining in warehouse.",
      time: "5 hours ago",
      unread: false,
      actionUrl: "living-room.html"
    },
    {
      id: "notif-5",
      category: "supplier",
      title: "🛡️ Supplier Trust Score Upgrade",
      message: "Nilambur Palace Teak Guild attained a 98/100 Perfect Quality Score this quarter.",
      time: "1 day ago",
      unread: false,
      actionUrl: "admin-passport.html"
    },
    {
      id: "notif-6",
      category: "offers",
      title: "🏷️ VIP Private Auction Access",
      message: "Exclusive 15% Royal Privilege code ROYALPALACE15 unlocked for your account.",
      time: "2 days ago",
      unread: false,
      actionUrl: "catalog.html"
    },
    {
      id: "notif-7",
      category: "loyalty",
      title: "💎 +500 Royal Points Credited",
      message: "Your total loyalty balance is now 4,250 PTS (Equivalent to ₹4,250 savings).",
      time: "3 days ago",
      unread: false,
      actionUrl: "customer-dashboard.html#memberSec"
    },
    {
      id: "notif-8",
      category: "emi",
      title: "💳 0% No-Cost EMI Plan Active",
      message: "Enjoy flexible 24-month zero-interest installments from ₹3,749/month.",
      time: "4 days ago",
      unread: false,
      actionUrl: "smart-studio.html#emiSec"
    }
  ];

  // Helper: Currency Formatter
  window.formatINR = function (num) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Helper: Toast
  window.FF_Toast = function (msg, type = "gold") {
    let container = document.getElementById('ff-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ff-toast-container';
      container.className = 'fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }
    const t = document.createElement('div');
    t.className = 'pointer-events-auto px-4 py-3 rounded-xl bg-black/95 text-white border border-antiqueGold/60 shadow-[0_10px_35px_rgba(201,162,39,0.35)] backdrop-blur-xl text-xs font-sans flex items-center gap-2.5 transition-all duration-300 transform translate-y-4 opacity-0';
    t.innerHTML = `
      <span class="text-champagne font-cinzel font-bold text-sm">⚜️</span>
      <span class="font-medium text-stone-200">${msg}</span>
    `;
    container.appendChild(t);
    setTimeout(() => {
      t.classList.remove('translate-y-4', 'opacity-0');
    }, 10);
    setTimeout(() => {
      t.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => t.remove(), 300);
    }, 3500);
  };

  // --- 2. UNIVERSAL CART & WISHLIST ---
  window.FF_Cart = {
    getCart: function () {
      try {
        const c = localStorage.getItem('ff_multi_cart_v3');
        return c ? JSON.parse(c) : [
          {
            cartItemId: "ff-101-Royal-Blue-Velvet",
            id: "ff-101",
            name: "THE IMPERIAL SOFA",
            price: 89999,
            originalPrice: 114999,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
            color: "Royal Blue",
            material: "Royal Velvet",
            quantity: 1
          }
        ];
      } catch (e) { return []; }
    },
    saveCart: function (cart) {
      localStorage.setItem('ff_multi_cart_v3', JSON.stringify(cart));
      this.updateBadges();
      this.renderDrawerContent();
    },
    addItem: function (productId, qty = 1, color = "Royal Blue", material = "Royal Velvet", customOpts = {}) {
      const all = (window.LUXURY_PRODUCTS || DEFAULT_PRODUCTS);
      const prod = all.find(p => p.id === productId) || DEFAULT_PRODUCTS[0];
      const cart = this.getCart();
      const cartItemId = `${prod.id}-${color}-${material}`;
      const existing = cart.find(i => i.cartItemId === cartItemId);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({
          cartItemId,
          id: prod.id,
          name: prod.name,
          price: customOpts.price || prod.price,
          originalPrice: prod.originalPrice,
          image: prod.image || (prod.images ? prod.images[0] : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80"),
          color: color,
          material: material,
          customOpts: customOpts,
          quantity: qty
        });
      }
      this.saveCart(cart);
      window.FF_Toast(`Added "${prod.name}" (${color}) to Cart! 🛒`);
      this.openDrawer();
    },
    updateQty: function (cartItemId, delta) {
      let cart = this.getCart();
      const item = cart.find(i => i.cartItemId === cartItemId);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.cartItemId !== cartItemId);
          window.FF_Toast("Item removed from Palace Cart.", "info");
        }
      }
      this.saveCart(cart);
    },
    removeItem: function (cartItemId) {
      let cart = this.getCart().filter(i => i.cartItemId !== cartItemId);
      this.saveCart(cart);
      window.FF_Toast("Item removed from Palace Cart.");
    },
    updateBadges: function () {
      const cart = this.getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelectorAll('.ff-cart-badge, [data-cart-count]').forEach(el => {
        el.innerText = count;
        el.style.display = count > 0 ? 'inline-flex' : 'none';
      });
    },
    openDrawer: function () {
      const drawer = document.getElementById('ff-cart-drawer');
      const backdrop = document.getElementById('ff-cart-backdrop');
      if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        this.renderDrawerContent();
      }
    },
    closeDrawer: function () {
      const drawer = document.getElementById('ff-cart-drawer');
      const backdrop = document.getElementById('ff-cart-backdrop');
      if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
      }
    },
    renderDrawerContent: function () {
      const container = document.getElementById('ff-cart-items-container');
      const subtotalEl = document.getElementById('ff-cart-subtotal');
      const emiPreviewEl = document.getElementById('ff-cart-emi-preview');
      if (!container) return;

      const cart = this.getCart();
      if (cart.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center space-y-4">
            <span class="text-5xl block opacity-50">🛋️</span>
            <p class="font-cinzel text-champagne text-sm font-bold">Your Palace Cart is Empty</p>
            <p class="text-xs text-stone-400 max-w-xs mx-auto">Explore our Nilambur teak masterworks and add timeless luxury to your residence.</p>
            <a href="living-room.html" class="btn-gold text-xs px-5 py-2.5 rounded-xl inline-block mt-2">Explore Showroom</a>
          </div>
        `;
        if (subtotalEl) subtotalEl.innerText = window.formatINR(0);
        if (emiPreviewEl) emiPreviewEl.innerText = "0% EMI available";
        return;
      }

      let subtotal = 0;
      container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
          <div class="p-3 bg-black/60 rounded-xl border border-antiqueGold/30 flex gap-3 items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0" />
            <div class="flex-1 min-w-0">
              <h4 class="font-cinzel font-bold text-xs text-white truncate">${item.name}</h4>
              <p class="text-[10px] text-stone-400 font-sans">${item.color} • ${item.material}</p>
              <div class="flex items-center justify-between mt-2">
                <span class="font-mono text-xs text-champagne font-bold">${window.formatINR(item.price)}</span>
                <div class="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5 text-xs">
                  <button onclick="FF_Cart.updateQty('${item.cartItemId}', -1)" class="text-stone-300 hover:text-white px-1 font-bold">-</button>
                  <span class="font-bold text-white px-1">${item.quantity}</span>
                  <button onclick="FF_Cart.updateQty('${item.cartItemId}', 1)" class="text-stone-300 hover:text-white px-1 font-bold">+</button>
                </div>
              </div>
            </div>
            <button onclick="FF_Cart.removeItem('${item.cartItemId}')" class="text-stone-400 hover:text-rose-400 p-1 text-xs" title="Remove">✕</button>
          </div>
        `;
      }).join('');

      if (subtotalEl) subtotalEl.innerText = window.formatINR(subtotal);
      if (emiPreviewEl) {
        const monthly = Math.round(subtotal / 24);
        emiPreviewEl.innerHTML = `<span>⚡ 0% EMI: <strong>${window.formatINR(monthly)}/mo</strong> (24 mos)</span>`;
      }
    }
  };

  // --- 3. UNIVERSAL WISHLIST ---
  window.FF_Wishlist = {
    getWishlist: function () {
      try {
        const w = localStorage.getItem('ff_multi_wishlist_v3');
        return w ? JSON.parse(w) : ["ff-101", "ff-103"];
      } catch (e) { return ["ff-101", "ff-103"]; }
    },
    toggle: function (productId) {
      let list = this.getWishlist();
      if (list.includes(productId)) {
        list = list.filter(id => id !== productId);
        window.FF_Toast("Removed from Royal Wishlist.");
      } else {
        list.push(productId);
        window.FF_Toast("Added to Royal Wishlist! ❤️");
      }
      localStorage.setItem('ff_multi_wishlist_v3', JSON.stringify(list));
      this.updateBadges();
      this.updateCardButtons();
    },
    updateBadges: function () {
      const list = this.getWishlist();
      document.querySelectorAll('.ff-wishlist-badge, [data-wishlist-count]').forEach(el => {
        el.innerText = list.length;
      });
    },
    updateCardButtons: function () {
      const list = this.getWishlist();
      document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
        const pid = btn.getAttribute('data-wishlist-btn');
        if (list.includes(pid)) {
          btn.classList.add('text-rose-500');
          btn.innerHTML = '❤️';
        } else {
          btn.classList.remove('text-rose-500');
          btn.innerHTML = '🤍';
        }
      });
    }
  };

  // --- 4. UNIVERSAL 3-PRODUCT COMPARISON ENGINE ---
  window.FF_Compare = {
    getCompareList: function () {
      try {
        const c = localStorage.getItem('ff_compare_list_v3');
        return c ? JSON.parse(c) : ["ff-101", "ff-102"];
      } catch (e) { return ["ff-101", "ff-102"]; }
    },
    saveCompareList: function (list) {
      localStorage.setItem('ff_compare_list_v3', JSON.stringify(list));
      this.renderDock();
      this.updateButtons();
    },
    toggle: function (productId) {
      let list = this.getCompareList();
      if (list.includes(productId)) {
        list = list.filter(id => id !== productId);
        window.FF_Toast("Product removed from comparison tray.");
      } else {
        if (list.length >= 3) {
          window.FF_Toast("You can compare maximum 3 products at a time.", "warning");
          this.openModal();
          return;
        }
        list.push(productId);
        window.FF_Toast("Added to Comparison! Click 'Compare' at bottom to view matrix.");
      }
      this.saveCompareList(list);
    },
    renderDock: function () {
      const dock = document.getElementById('ff-compare-dock');
      const itemsContainer = document.getElementById('ff-compare-dock-items');
      const badge = document.getElementById('ff-compare-count');
      if (!dock || !itemsContainer) return;

      const list = this.getCompareList();
      const all = (window.LUXURY_PRODUCTS || DEFAULT_PRODUCTS);

      if (badge) badge.innerText = list.length;

      if (list.length > 0) {
        dock.classList.add('active');
        itemsContainer.innerHTML = list.map(id => {
          const p = all.find(item => item.id === id) || DEFAULT_PRODUCTS[0];
          return `
            <div class="flex items-center gap-2 bg-black/80 border border-antiqueGold/40 px-2.5 py-1.5 rounded-xl">
              <img src="${p.image || p.images[0]}" class="w-8 h-8 rounded-lg object-cover" />
              <div class="min-w-0 max-w-[120px]">
                <p class="font-cinzel text-[10px] font-bold text-white truncate">${p.name}</p>
                <p class="font-mono text-[9px] text-champagne">${window.formatINR(p.price)}</p>
              </div>
              <button onclick="FF_Compare.toggle('${p.id}')" class="text-stone-400 hover:text-rose-400 text-xs ml-1">✕</button>
            </div>
          `;
        }).join('');
      } else {
        dock.classList.remove('active');
      }
    },
    updateButtons: function () {
      const list = this.getCompareList();
      document.querySelectorAll('[data-compare-btn]').forEach(btn => {
        const pid = btn.getAttribute('data-compare-btn');
        if (list.includes(pid)) {
          btn.classList.add('bg-antiqueGold', 'text-black', 'border-antiqueGold');
          btn.innerHTML = '<span>⚖️</span> Compared';
        } else {
          btn.classList.remove('bg-antiqueGold', 'text-black', 'border-antiqueGold');
          btn.innerHTML = '<span>⚖️</span> Compare';
        }
      });
    },
    openModal: function () {
      const modal = document.getElementById('ff-compare-modal');
      const container = document.getElementById('ff-compare-matrix-container');
      if (!modal || !container) return;

      const list = this.getCompareList();
      const all = (window.LUXURY_PRODUCTS || DEFAULT_PRODUCTS);
      const selected = list.map(id => all.find(p => p.id === id)).filter(Boolean);

      if (selected.length === 0) {
        window.FF_Toast("Please select at least 1 product to compare.", "info");
        return;
      }

      container.innerHTML = `
        <div class="grid grid-cols-${selected.length + 1} gap-3 text-xs">
          
          <!-- Headers / Attributes Column -->
          <div class="space-y-4 pt-36 font-cinzel font-bold text-stone-400 border-r border-antiqueGold/20 pr-3">
            <div class="h-9 flex items-center">Price & Savings</div>
            <div class="h-9 flex items-center">Material & Finish</div>
            <div class="h-9 flex items-center">Dimensions</div>
            <div class="h-9 flex items-center">Warranty & Heritage</div>
            <div class="h-9 flex items-center">Rating & Reviews</div>
            <div class="h-9 flex items-center">Stock & Availability</div>
            <div class="h-9 flex items-center">Delivery Estimate</div>
            <div class="h-9 flex items-center">Supplier Trust Score</div>
            <div class="h-9 flex items-center">0% No-Cost EMI</div>
            <div class="h-10 flex items-center">Action</div>
          </div>

          <!-- Product Columns -->
          ${selected.map(p => `
            <div class="space-y-4 text-center">
              <div class="h-36 flex flex-col items-center">
                <div class="relative w-24 h-24 rounded-xl overflow-hidden border border-antiqueGold/40 mb-1">
                  <img src="${p.image || p.images[0]}" class="w-full h-full object-cover" />
                  <button onclick="FF_Compare.toggle('${p.id}'); FF_Compare.openModal();" class="absolute top-1 right-1 bg-black/80 text-rose-400 text-[10px] w-5 h-5 rounded-full flex items-center justify-center">✕</button>
                </div>
                <h4 class="font-cinzel font-bold text-xs text-white line-clamp-1">${p.name}</h4>
                <span class="text-[10px] text-stone-400">${p.category}</span>
              </div>

              <!-- 1. Price -->
              <div class="h-9 flex flex-col justify-center bg-white/5 rounded-lg p-1">
                <span class="font-mono font-bold text-champagne">${window.formatINR(p.price)}</span>
                <span class="text-[9px] text-stone-400 line-through">${window.formatINR(p.originalPrice || p.price * 1.25)}</span>
              </div>

              <!-- 2. Material -->
              <div class="h-9 flex items-center justify-center p-1 text-[11px] text-stone-200">${p.material || 'Nilambur Seasoned Teak'}</div>

              <!-- 3. Dimensions -->
              <div class="h-9 flex items-center justify-center p-1 font-mono text-[11px] text-stone-300">${p.dimensions ? (p.dimensions.display || p.dimensions) : '92" L x 38" W x 36" H'}</div>

              <!-- 4. Warranty -->
              <div class="h-9 flex items-center justify-center p-1 text-[10px] text-amber-300 font-cinzel font-bold">${p.warranty || '10-Year Royal Guarantee'}</div>

              <!-- 5. Rating -->
              <div class="h-9 flex items-center justify-center p-1 font-bold text-champagne">★ ${p.rating || 4.9} <span class="text-stone-400 font-normal ml-1">(${p.reviewsCount || 120})</span></div>

              <!-- 6. Stock -->
              <div class="h-9 flex items-center justify-center p-1">
                <span class="badge-gold text-[9px]">${(p.stock || 5) <= 3 ? `⚠️ Low Stock (${p.stock} left)` : `🟢 In Stock (${p.stock || 5} units)`}</span>
              </div>

              <!-- 7. Delivery Estimate -->
              <div class="h-9 flex items-center justify-center p-1 font-sans text-[11px] text-stone-300">🚚 ${p.estimatedDelivery || '4–6 Days'} (${p.deliveryConfidence || 94}% conf.)</div>

              <!-- 8. Trust Score -->
              <div class="h-9 flex items-center justify-center p-1 font-cinzel font-bold text-emerald-400">🛡️ ${p.supplierTrustScore || 95}/100 Guild</div>

              <!-- 9. EMI -->
              <div class="h-9 flex items-center justify-center p-1 font-mono text-champagne font-bold">${window.formatINR(Math.round(p.price / 24))}/mo</div>

              <!-- 10. Action -->
              <div class="h-10 flex items-center justify-center gap-1">
                <button onclick="FF_Cart.addItem('${p.id}'); FF_Compare.closeModal();" class="btn-gold text-[10px] px-3 py-1.5 rounded-lg w-full">Add To Cart</button>
              </div>
            </div>
          `).join('')}

        </div>
      `;

      modal.classList.add('open');
    },
    closeModal: function () {
      const modal = document.getElementById('ff-compare-modal');
      if (modal) modal.classList.remove('open');
    }
  };

  // --- 5. UNIVERSAL SMART NOTIFICATION CENTER ---
  window.FF_Notifications = {
    getNotifications: function () {
      try {
        const n = localStorage.getItem('ff_notifications_v3');
        return n ? JSON.parse(n) : DEFAULT_NOTIFICATIONS;
      } catch (e) { return DEFAULT_NOTIFICATIONS; }
    },
    saveNotifications: function (list) {
      localStorage.setItem('ff_notifications_v3', JSON.stringify(list));
      this.updateBadges();
      this.renderList();
    },
    filterCategory: function (cat) {
      this.activeCategory = cat;
      this.renderList();
      document.querySelectorAll('[data-notif-tab]').forEach(t => {
        if (t.getAttribute('data-notif-tab') === cat) {
          t.className = 'px-3 py-1.5 rounded-lg bg-antiqueGold text-black font-cinzel font-black text-xs whitespace-nowrap shadow';
        } else {
          t.className = 'px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap transition';
        }
      });
    },
    markAllRead: function () {
      const list = this.getNotifications().map(n => ({ ...n, unread: false }));
      this.saveNotifications(list);
      window.FF_Toast("All notifications marked as read.");
    },
    updateBadges: function () {
      const list = this.getNotifications();
      const unreadCount = list.filter(n => n.unread).length;
      document.querySelectorAll('.ff-notif-badge, [data-notif-count]').forEach(el => {
        el.innerText = unreadCount;
        el.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
      });
    },
    openDrawer: function () {
      const drawer = document.getElementById('ff-notif-drawer');
      const backdrop = document.getElementById('ff-notif-backdrop');
      if (drawer && backdrop) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        this.renderList();
      }
    },
    closeDrawer: function () {
      const drawer = document.getElementById('ff-notif-drawer');
      const backdrop = document.getElementById('ff-notif-backdrop');
      if (drawer && backdrop) {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
      }
    },
    renderList: function () {
      const container = document.getElementById('ff-notif-items-container');
      if (!container) return;

      const cat = this.activeCategory || 'all';
      let list = this.getNotifications();
      if (cat !== 'all') {
        list = list.filter(n => n.category === cat);
      }

      if (list.length === 0) {
        container.innerHTML = `
          <div class="py-16 text-center space-y-3">
            <span class="text-4xl block opacity-40">🔔</span>
            <p class="font-cinzel text-champagne text-xs font-bold">No Notifications in this Category</p>
            <p class="text-[11px] text-stone-400">You're all caught up with your royal dispatch telemetry.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = list.map(n => `
        <div class="p-3.5 rounded-xl border transition cursor-pointer ${n.unread ? 'bg-antiqueGold/10 border-antiqueGold/50 shadow-md' : 'bg-black/60 border-white/10'}" onclick="location.href='${n.actionUrl || '#'}'">
          <div class="flex items-start justify-between gap-2">
            <h5 class="font-cinzel font-bold text-xs ${n.unread ? 'text-champagne' : 'text-white'}">${n.title}</h5>
            <span class="text-[9px] text-stone-400 font-mono shrink-0">${n.time}</span>
          </div>
          <p class="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">${n.message}</p>
          <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
            <span class="badge-gold text-[8px] uppercase">${n.category}</span>
            <span class="text-[10px] text-champagne font-cinzel font-bold hover:underline">View Details →</span>
          </div>
        </div>
      `).join('');
    }
  };

  // --- 6. UNIVERSAL SEARCH AUTO-SUGGEST & FACETED MODAL ---
  window.FF_Search = {
    openModal: function () {
      const modal = document.getElementById('ff-search-modal');
      const input = document.getElementById('ff-search-input');
      if (modal) {
        modal.classList.add('open');
        if (input) {
          setTimeout(() => input.focus(), 100);
          this.handleInput(input.value);
        }
      }
    },
    closeModal: function () {
      const modal = document.getElementById('ff-search-modal');
      if (modal) modal.classList.remove('open');
    },
    handleInput: function (query) {
      const container = document.getElementById('ff-search-results');
      const recentContainer = document.getElementById('ff-search-recents');
      if (!container) return;

      const all = (window.LUXURY_PRODUCTS || DEFAULT_PRODUCTS);
      const q = (query || '').trim().toLowerCase();

      // Render Recents if query is empty
      if (!q) {
        const recents = ["Nilambur Teak Sofa", "Canopy Bed King", "Live Edge Dining", "Zero-Cost EMI", "Marble Coffee Table"];
        if (recentContainer) {
          recentContainer.innerHTML = recents.map(r => `
            <button onclick="FF_Search.applyQuery('${r}')" class="interactive-chip text-[10px]">🔍 ${r}</button>
          `).join('');
        }
        container.innerHTML = `
          <div class="p-4 space-y-4">
            <div class="space-y-2">
              <span class="text-[10px] font-cinzel font-bold text-champagne uppercase">🔥 POPULAR SEARCH CURATIONS</span>
              <div class="flex flex-wrap gap-2">
                <button onclick="FF_Search.applyQuery('Sofa')" class="interactive-chip active text-xs">🛋️ Living Room Sofas</button>
                <button onclick="FF_Search.applyQuery('Dining')" class="interactive-chip text-xs">🍽️ 8-Seater Dining</button>
                <button onclick="FF_Search.applyQuery('Canopy')" class="interactive-chip text-xs">👑 King Canopy Beds</button>
                <button onclick="FF_Search.applyQuery('Executive')" class="interactive-chip text-xs">💼 Executive Desks</button>
              </div>
            </div>
            
            <div class="space-y-2 pt-2">
              <span class="text-[10px] font-cinzel font-bold text-stone-400 uppercase">RECOMMENDED LUXURY MASTERPIECES</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${all.slice(0, 4).map(p => `
                  <div onclick="location.href='living-room.html?id=${p.id}'" class="p-2.5 bg-black/60 rounded-xl border border-white/10 hover:border-antiqueGold/50 transition flex items-center gap-3 cursor-pointer group">
                    <img src="${p.image || p.images[0]}" class="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition" />
                    <div class="min-w-0 flex-1">
                      <h5 class="font-cinzel font-bold text-xs text-white truncate group-hover:text-champagne">${p.name}</h5>
                      <span class="font-mono text-[11px] text-champagne font-bold">${window.formatINR(p.price)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        return;
      }

      // Filter products
      const filtered = all.filter(p => {
        return p.name.toLowerCase().includes(q) ||
               p.category.toLowerCase().includes(q) ||
               (p.material && p.material.toLowerCase().includes(q)) ||
               (p.sku && p.sku.toLowerCase().includes(q));
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="py-12 text-center space-y-2">
            <span class="text-3xl block">🔍</span>
            <p class="font-cinzel text-champagne text-xs font-bold">No Furniture Found for "${query}"</p>
            <p class="text-xs text-stone-400">Try searching for "Teak", "Sofa", "Dining", "Marble", or "Bed".</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="p-3 space-y-2 max-h-[380px] overflow-y-auto">
          <div class="flex justify-between items-center px-1 pb-1 text-[10px] text-stone-400 font-cinzel">
            <span>Found ${filtered.length} masterworks</span>
            <span class="text-champagne">100% Solid Seasoned Timber</span>
          </div>
          ${filtered.map(p => `
            <div class="p-3 bg-black/70 rounded-xl border border-antiqueGold/30 hover:border-champagne hover:bg-black/90 transition flex items-center justify-between gap-3 group">
              <div class="flex items-center gap-3 min-w-0">
                <img src="${p.image || p.images[0]}" class="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 group-hover:scale-105 transition" />
                <div class="min-w-0">
                  <span class="badge-gold text-[8px] mb-0.5">${p.category}</span>
                  <h4 class="font-cinzel font-bold text-xs text-white truncate group-hover:text-champagne">${p.name}</h4>
                  <p class="text-[10px] text-stone-400 truncate">${p.material || 'Nilambur Seasoned Teak'}</p>
                </div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-mono text-xs text-champagne font-bold">${window.formatINR(p.price)}</div>
                <div class="flex items-center gap-1 mt-1.5">
                  <button onclick="FF_Cart.addItem('${p.id}')" class="btn-gold text-[9px] px-2.5 py-1 rounded-lg">Add To Cart</button>
                  <button onclick="location.href='living-room.html?id=${p.id}'" class="btn-outline-gold text-[9px] px-2 py-1 rounded-lg">View</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    },
    applyQuery: function (text) {
      const input = document.getElementById('ff-search-input');
      if (input) {
        input.value = text;
        this.handleInput(text);
      }
    }
  };

  // --- 7. UNIVERSAL SMART EMI CALCULATOR MODAL ---
  window.FF_EMI = {
    activePrice: 89999,
    activeMonths: 24,
    activeDownPayment: 0,
    openModal: function (price = 89999, productName = "The Imperial Royal Sofa") {
      this.activePrice = price;
      const modal = document.getElementById('ff-emi-modal');
      const titleEl = document.getElementById('ff-emi-product-name');
      const priceEl = document.getElementById('ff-emi-product-price');
      if (titleEl) titleEl.innerText = productName;
      if (priceEl) priceEl.innerText = window.formatINR(price);
      this.updateCalculations();
      if (modal) modal.classList.add('open');
    },
    closeModal: function () {
      const modal = document.getElementById('ff-emi-modal');
      if (modal) modal.classList.remove('open');
    },
    setTenure: function (months) {
      this.activeMonths = months;
      document.querySelectorAll('[data-emi-tenure]').forEach(b => {
        if (parseInt(b.getAttribute('data-emi-tenure'), 10) === months) {
          b.className = 'px-3 py-2 rounded-xl bg-gradient-to-r from-antiqueGold to-champagne text-black font-cinzel font-black text-xs shadow-lg border border-white/30';
        } else {
          b.className = 'px-3 py-2 rounded-xl bg-black/60 text-stone-300 hover:text-white border border-antiqueGold/30 font-cinzel font-bold text-xs transition';
        }
      });
      this.updateCalculations();
    },
    setDownPayment: function (amount) {
      this.activeDownPayment = parseInt(amount, 10) || 0;
      this.updateCalculations();
    },
    updateCalculations: function () {
      const principal = Math.max(0, this.activePrice - this.activeDownPayment);
      const monthly = Math.round(principal / this.activeMonths);
      const monthlyEl = document.getElementById('ff-emi-monthly-amount');
      const totalPayableEl = document.getElementById('ff-emi-total-payable');
      const principalEl = document.getElementById('ff-emi-principal');
      const tenureLabelEl = document.getElementById('ff-emi-tenure-label');

      if (monthlyEl) monthlyEl.innerText = window.formatINR(monthly);
      if (totalPayableEl) totalPayableEl.innerText = window.formatINR(this.activePrice);
      if (principalEl) principalEl.innerText = window.formatINR(principal);
      if (tenureLabelEl) tenureLabelEl.innerText = `${this.activeMonths} Months Plan (0% No-Cost EMI)`;
    }
  };

  // --- 8. UNIVERSAL AI DELIVERY INTELLIGENCE ---
  window.FF_Delivery = {
    evaluatePincode: function (pincode, productId = 'ff-101') {
      const pin = (pincode || '').toString().trim();
      const resultEl = document.getElementById('ff-delivery-calc-result');
      if (!resultEl) return;

      if (!/^\d{6}$/.test(pin)) {
        resultEl.innerHTML = `<span class="text-rose-400 text-xs">⚠️ Please enter a valid 6-digit Indian PIN code.</span>`;
        return;
      }

      // Dynamic calculation based on pincode region
      let days = "4–6 Days";
      let confidence = 95;
      let hub = "Hyderabad Central Fulfillment Palace";
      let risk = "Low Risk (< 1.5%)";

      if (pin.startsWith("50") || pin.startsWith("51")) {
        days = "2–3 Days (Express White-Glove)";
        confidence = 98;
        hub = "Hyderabad Gachibowli Logistics Hub";
      } else if (pin.startsWith("40") || pin.startsWith("41")) {
        days = "3–4 Days";
        confidence = 96;
        hub = "Mumbai Western Dispatch Guild";
      } else if (pin.startsWith("56") || pin.startsWith("57")) {
        days = "3–5 Days";
        confidence = 96;
        hub = "Bangalore South Corridor Atelier";
      } else if (pin.startsWith("11") || pin.startsWith("12")) {
        days = "5–7 Days";
        confidence = 92;
        hub = "Delhi NCR Royal Distribution Center";
      }

      resultEl.innerHTML = `
        <div class="p-3.5 bg-black/80 rounded-xl border border-antiqueGold/40 space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-cinzel font-bold text-champagne">Estimated Delivery: ${days}</span>
            <span class="badge-gold text-[9px] text-emerald-400">🛡️ ${confidence}% Confidence</span>
          </div>
          <p class="text-stone-300 font-sans text-[11px]">Dispatch Hub: <strong>${hub}</strong> via White-Glove Air-Suspension Fleet.</p>
          <div class="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-white/10">
            <span>Supplier Reliability: <strong>96/100 Guild</strong></span>
            <span>Transit Delay Risk: <strong class="text-emerald-400">${risk}</strong></span>
          </div>
        </div>
      `;
    }
  };

  // --- 9. UNIVERSAL 6-STAGE ORDER TRACKING TIMELINE MODAL WITH LEAFLET OPENSTREETMAP ---
  let trackingLeafletMap = null;

  function loadLeaflet(callback) {
    if (typeof L !== 'undefined') {
      if (callback) callback();
      return;
    }
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (callback) callback();
    };
    document.head.appendChild(script);
  }

  window.FF_Tracking = {
    openModal: function (orderId = "FF-2026-9948") {
      const modal = document.getElementById('ff-tracking-modal');
      const orderIdEl = document.getElementById('ff-tracking-order-id');
      if (orderIdEl) orderIdEl.innerText = orderId;
      if (modal) modal.classList.add('open');

      // Initialize OpenStreetMap Leaflet Map
      loadLeaflet(() => {
        setTimeout(() => {
          this.initMap();
        }, 150);
      });
    },
    closeModal: function () {
      const modal = document.getElementById('ff-tracking-modal');
      if (modal) modal.classList.remove('open');
    },
    initMap: function () {
      const mapContainer = document.getElementById('ff-tracking-leaflet-map');
      if (!mapContainer || typeof L === 'undefined') return;

      if (trackingLeafletMap) {
        trackingLeafletMap.remove();
        trackingLeafletMap = null;
      }

      // Origin (Nilambur Teak Guild), Hub (Kurnool), Live Van (Hyderabad), Palace (Jubilee Hills)
      const origin = [11.2753, 76.2230];
      const hub = [15.8281, 78.0373];
      const liveVan = [17.3850, 78.4867];
      const palaceDest = [17.4319, 78.4073];

      trackingLeafletMap = L.map('ff-tracking-leaflet-map', {
        zoomControl: false,
        attributionControl: false
      }).setView(liveVan, 7);

      // Free OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(trackingLeafletMap);

      // Route Polyline
      const latlngs = [origin, hub, liveVan, palaceDest];
      L.polyline(latlngs, {
        color: '#C9A227',
        weight: 4,
        opacity: 0.85,
        dashArray: '6, 8'
      }).addTo(trackingLeafletMap);

      // Custom Gold Icon Helpers
      const createIcon = (emoji, bg = '#050505') => L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:${bg}; border:2px solid #C9A227; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 10px rgba(201,162,39,0.8);">${emoji}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      L.marker(origin, { icon: createIcon('🌳') }).addTo(trackingLeafletMap).bindPopup('<b>Nilambur Teak Atelier Hub</b><br>Origin Guild Workshop');
      L.marker(hub, { icon: createIcon('📦') }).addTo(trackingLeafletMap).bindPopup('<b>NH-44 Kurnool Hub</b><br>Logistics Gateway');
      L.marker(liveVan, { icon: createIcon('🚚', '#07142F') }).addTo(trackingLeafletMap).bindPopup('<b>Live Air-Suspension Fleet #WF-402</b><br>ETA: 12 Mins (0.02G Safe Ride)').openPopup();
      L.marker(palaceDest, { icon: createIcon('👑', '#1B0B36') }).addTo(trackingLeafletMap).bindPopup('<b>Lotus Palace Villa</b><br>Jubilee Hills, Hyderabad');

      trackingLeafletMap.fitBounds(latlngs, { padding: [30, 30] });
      trackingLeafletMap.invalidateSize();
    }
  };

  // --- 10. DOM INJECTION & INITIALIZATION ---
  function injectUniversalModals() {
    // 1. Cart Drawer
    if (!document.getElementById('ff-cart-drawer')) {
      const cartHtml = `
        <div id="ff-cart-backdrop" class="drawer-backdrop" onclick="FF_Cart.closeDrawer()"></div>
        <div id="ff-cart-drawer" class="drawer-panel">
          <div class="p-4 border-b border-antiqueGold/30 flex items-center justify-between bg-black/40">
            <div class="flex items-center gap-2">
              <span class="text-lg">🛒</span>
              <h3 class="font-cinzel font-black text-sm text-white gold-gradient-text">ROYAL PALACE CART</h3>
            </div>
            <button onclick="FF_Cart.closeDrawer()" class="text-stone-400 hover:text-white text-lg p-1">✕</button>
          </div>
          <div id="ff-cart-items-container" class="flex-1 p-4 space-y-3 overflow-y-auto"></div>
          <div class="p-4 border-t border-antiqueGold/30 bg-black/60 space-y-3">
            <div class="flex justify-between items-center text-xs font-cinzel">
              <span class="text-stone-400">Cart Subtotal:</span>
              <span id="ff-cart-subtotal" class="font-mono text-base font-bold text-champagne">₹0</span>
            </div>
            <div id="ff-cart-emi-preview" class="text-[11px] text-amber-300 font-cinzel text-center bg-white/5 py-1.5 rounded-lg border border-antiqueGold/20">
              ⚡ 0% No-Cost EMI Available
            </div>
            <div class="grid grid-cols-2 gap-2">
              <a href="smart-studio.html" class="btn-outline-gold text-xs py-2 rounded-xl text-center">Smart Studio</a>
              <a href="customer-dashboard.html#ordersSec" class="btn-gold text-xs py-2 rounded-xl text-center">Checkout</a>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', cartHtml);
    }

    // 2. Notification Drawer
    if (!document.getElementById('ff-notif-drawer')) {
      const notifHtml = `
        <div id="ff-notif-backdrop" class="drawer-backdrop" onclick="FF_Notifications.closeDrawer()"></div>
        <div id="ff-notif-drawer" class="drawer-panel">
          <div class="p-4 border-b border-antiqueGold/30 flex items-center justify-between bg-black/40">
            <div class="flex items-center gap-2">
              <span class="text-lg">🔔</span>
              <h3 class="font-cinzel font-black text-sm text-white gold-gradient-text">SMART NOTIFICATION CENTER</h3>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="FF_Notifications.markAllRead()" class="text-[10px] text-champagne hover:underline font-cinzel">Mark All Read</button>
              <button onclick="FF_Notifications.closeDrawer()" class="text-stone-400 hover:text-white text-lg p-1">✕</button>
            </div>
          </div>
          <!-- 8 Categories Tabs -->
          <div class="px-3 py-2 bg-black/80 border-b border-white/10 flex gap-1.5 overflow-x-auto">
            <button data-notif-tab="all" onclick="FF_Notifications.filterCategory('all')" class="px-3 py-1.5 rounded-lg bg-antiqueGold text-black font-cinzel font-black text-xs whitespace-nowrap">All</button>
            <button data-notif-tab="order" onclick="FF_Notifications.filterCategory('order')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">📦 Orders</button>
            <button data-notif-tab="delivery" onclick="FF_Notifications.filterCategory('delivery')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">🚚 Delivery</button>
            <button data-notif-tab="ai" onclick="FF_Notifications.filterCategory('ai')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">🤖 AI Predictions</button>
            <button data-notif-tab="stock" onclick="FF_Notifications.filterCategory('stock')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">⚠️ Low Stock</button>
            <button data-notif-tab="supplier" onclick="FF_Notifications.filterCategory('supplier')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">🛡️ Suppliers</button>
            <button data-notif-tab="offers" onclick="FF_Notifications.filterCategory('offers')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">🏷️ Offers</button>
            <button data-notif-tab="loyalty" onclick="FF_Notifications.filterCategory('loyalty')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">💎 Rewards</button>
            <button data-notif-tab="emi" onclick="FF_Notifications.filterCategory('emi')" class="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 font-cinzel font-bold text-xs whitespace-nowrap">💳 EMI</button>
          </div>
          <div id="ff-notif-items-container" class="flex-1 p-4 space-y-3 overflow-y-auto"></div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', notifHtml);
    }

    // 3. Search Modal
    if (!document.getElementById('ff-search-modal')) {
      const searchHtml = `
        <div id="ff-search-modal" class="search-modal-backdrop" onclick="if(event.target === this) FF_Search.closeModal()">
          <div class="search-modal-panel">
            <div class="p-4 border-b border-antiqueGold/30 flex items-center gap-3 bg-black/60">
              <span class="text-xl text-champagne">🔍</span>
              <input 
                id="ff-search-input" 
                type="text" 
                placeholder="Search by furniture name, solid teak, 0% EMI, room style..." 
                class="w-full bg-transparent text-white placeholder-stone-400 text-sm font-sans focus:outline-none"
                oninput="FF_Search.handleInput(this.value)"
              />
              <button onclick="FF_Search.closeModal()" class="text-stone-400 hover:text-white text-base px-2 py-1">ESC</button>
            </div>
            <div id="ff-search-recents" class="px-4 py-2 bg-black/40 border-b border-white/5 flex flex-wrap gap-2 items-center"></div>
            <div id="ff-search-results"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', searchHtml);
    }

    // 4. Comparison Dock & Modal
    if (!document.getElementById('ff-compare-dock')) {
      const compareDockHtml = `
        <div id="ff-compare-dock" class="comparison-dock py-3 px-4">
          <div class="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <span class="badge-gold text-xs">⚖️ COMPARE TRAY (<span id="ff-compare-count">0</span>/3)</span>
              <div id="ff-compare-dock-items" class="flex items-center gap-2 overflow-x-auto max-w-xl"></div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="FF_Compare.saveCompareList([])" class="btn-outline-gold text-xs px-3 py-1.5 rounded-xl">Clear All</button>
              <button onclick="FF_Compare.openModal()" class="btn-gold text-xs px-5 py-2 rounded-xl shadow-2xl">Compare Now →</button>
            </div>
          </div>
        </div>

        <div id="ff-compare-modal" class="search-modal-backdrop" onclick="if(event.target === this) FF_Compare.closeModal()">
          <div class="search-modal-panel max-w-4xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">⚖️</span>
                <h3 class="font-cinzelDecor font-black text-lg text-white gold-gradient-text">FURNITURE COMPARISON MATRIX</h3>
              </div>
              <button onclick="FF_Compare.closeModal()" class="text-stone-400 hover:text-white text-lg p-1">✕</button>
            </div>
            <div id="ff-compare-matrix-container" class="overflow-x-auto"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', compareDockHtml);
    }

    // 5. EMI Modal
    if (!document.getElementById('ff-emi-modal')) {
      const emiModalHtml = `
        <div id="ff-emi-modal" class="search-modal-backdrop" onclick="if(event.target === this) FF_EMI.closeModal()">
          <div class="search-modal-panel max-w-lg p-6 space-y-6">
            <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">💳</span>
                <h3 class="font-cinzel font-black text-base text-white gold-gradient-text">SMART 0% EMI CALCULATOR</h3>
              </div>
              <button onclick="FF_EMI.closeModal()" class="text-stone-400 hover:text-white text-lg p-1">✕</button>
            </div>

            <div class="p-4 bg-black/60 rounded-2xl border border-antiqueGold/30 space-y-2">
              <h4 id="ff-emi-product-name" class="font-cinzel font-bold text-sm text-white">The Imperial Royal Sofa</h4>
              <div class="flex items-baseline justify-between">
                <span class="text-xs text-stone-400">Total Price:</span>
                <span id="ff-emi-product-price" class="font-mono text-lg font-bold text-champagne">₹89,999</span>
              </div>
            </div>

            <!-- Tenure Selector (3, 6, 12, 18, 24) -->
            <div class="space-y-2">
              <span class="text-xs font-cinzel font-bold text-champagne block">SELECT INSTALLMENT TENURE</span>
              <div class="grid grid-cols-5 gap-2">
                <button data-emi-tenure="3" onclick="FF_EMI.setTenure(3)" class="px-2.5 py-2 rounded-xl bg-black/60 text-stone-300 border border-antiqueGold/30 font-cinzel font-bold text-xs">3 Mo</button>
                <button data-emi-tenure="6" onclick="FF_EMI.setTenure(6)" class="px-2.5 py-2 rounded-xl bg-black/60 text-stone-300 border border-antiqueGold/30 font-cinzel font-bold text-xs">6 Mo</button>
                <button data-emi-tenure="12" onclick="FF_EMI.setTenure(12)" class="px-2.5 py-2 rounded-xl bg-black/60 text-stone-300 border border-antiqueGold/30 font-cinzel font-bold text-xs">12 Mo</button>
                <button data-emi-tenure="18" onclick="FF_EMI.setTenure(18)" class="px-2.5 py-2 rounded-xl bg-black/60 text-stone-300 border border-antiqueGold/30 font-cinzel font-bold text-xs">18 Mo</button>
                <button data-emi-tenure="24" onclick="FF_EMI.setTenure(24)" class="px-2.5 py-2 rounded-xl bg-gradient-to-r from-antiqueGold to-champagne text-black font-cinzel font-black text-xs shadow-lg border border-white/30">24 Mo</button>
              </div>
            </div>

            <!-- Calculation Output Card -->
            <div class="p-5 bg-gradient-to-br from-royalNavy/80 via-royalPurple/80 to-black rounded-2xl border border-antiqueGold/50 text-center space-y-2 shadow-xl">
              <span id="ff-emi-tenure-label" class="badge-gold text-[9px] uppercase">24 Months Plan (0% No-Cost EMI)</span>
              <div class="text-3xl font-cinzel font-black text-white gold-gradient-text" id="ff-emi-monthly-amount">₹3,750</div>
              <span class="text-xs text-stone-300 font-sans block">Monthly Installment • ₹0 Down Payment • 0% Interest</span>
              
              <div class="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs font-mono">
                <div>
                  <span class="text-[10px] text-stone-400 block font-sans">Total Payable</span>
                  <span id="ff-emi-total-payable" class="text-champagne font-bold">₹89,999</span>
                </div>
                <div>
                  <span class="text-[10px] text-stone-400 block font-sans">Interest Charged</span>
                  <span class="text-emerald-400 font-bold">₹0 (100% Subsidized)</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2">
              <button onclick="FF_Cart.addItem('ff-101'); FF_EMI.closeModal();" class="btn-gold text-xs py-3 rounded-xl w-full">Proceed with 0% EMI Cart →</button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', emiModalHtml);
    }

    // 6. Live Tracking Modal with Leaflet Map
    if (!document.getElementById('ff-tracking-modal')) {
      const trackingModalHtml = `
        <div id="ff-tracking-modal" class="search-modal-backdrop" onclick="if(event.target === this) FF_Tracking.closeModal()">
          <div class="search-modal-panel max-w-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl">🚚</span>
                <div>
                  <h3 class="font-cinzel font-black text-sm text-white gold-gradient-text">LIVE 6-STAGE ORDER TRACKING</h3>
                  <span class="text-[10px] text-stone-400 font-mono">Order ID: <strong id="ff-tracking-order-id" class="text-champagne">#FF-2026-9948</strong></span>
                </div>
              </div>
              <button onclick="FF_Tracking.closeModal()" class="text-stone-400 hover:text-white text-lg p-1">✕</button>
            </div>

            <!-- Product Header Summary -->
            <div class="p-3.5 bg-black/60 rounded-2xl border border-antiqueGold/30 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80" class="w-12 h-12 rounded-xl object-cover border border-white/10" loading="lazy" />
                <div>
                  <h4 class="font-cinzel font-bold text-xs text-white">THE IMPERIAL ROYAL SOFA</h4>
                  <p class="text-[10px] text-stone-400 font-sans">Royal Blue Velvet • Nilambur Teak Guild</p>
                  <span class="badge-gold text-[8px] mt-0.5">White-Glove Air Suspension Fleet #WF-402</span>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-stone-400 block font-sans">Current ETA</span>
                <span class="font-cinzel font-black text-sm text-emerald-400">TODAY, 12:45 PM</span>
              </div>
            </div>

            <!-- 🗺️ Interactive Free OpenStreetMap Leaflet Radar -->
            <div class="space-y-1.5">
              <div class="flex justify-between items-center text-[10px] font-cinzel">
                <span class="text-champagne font-bold">📡 SATELLITE TRANSIT RADAR (OPENSTREETMAP)</span>
                <span class="text-emerald-400">Live GPS Connected • 0.02G Safe Air Ride</span>
              </div>
              <div id="ff-tracking-leaflet-map" class="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-antiqueGold/40 shadow-inner bg-[#07142F]/60"></div>
            </div>

            <!-- 6-Stage Visual Timeline -->
            <div class="space-y-3 pt-2">
              <div class="timeline-track">
                <div class="timeline-progress-bar" style="width: 80%;"></div>
                <div class="timeline-node completed" title="Order Confirmed">✓</div>
                <div class="timeline-node completed" title="Processing">✓</div>
                <div class="timeline-node completed" title="Packed">✓</div>
                <div class="timeline-node completed" title="Shipped">✓</div>
                <div class="timeline-node active" title="Out for Delivery">🚚</div>
                <div class="timeline-node" title="Delivered">🏠</div>
              </div>

              <!-- Stage Labels -->
              <div class="grid grid-cols-6 text-center text-[9px] font-cinzel font-bold">
                <span class="text-champagne">Confirmed<br><span class="text-[8px] text-stone-500 font-normal">Aug 28</span></span>
                <span class="text-champagne">Processing<br><span class="text-[8px] text-stone-500 font-normal">Aug 29</span></span>
                <span class="text-champagne">Packed<br><span class="text-[8px] text-stone-500 font-normal">Aug 30</span></span>
                <span class="text-champagne">Shipped<br><span class="text-[8px] text-stone-500 font-normal">Aug 31</span></span>
                <span class="text-emerald-400">Out for Delivery<br><span class="text-[8px] text-emerald-300 font-normal">Active Now</span></span>
                <span class="text-stone-500">Delivered<br><span class="text-[8px] text-stone-500 font-normal">Pending</span></span>
              </div>
            </div>

            <!-- Telemetry & Driver Card -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
                <span class="text-stone-400 font-cinzel block text-[10px]">DISPATCH GUILD & VEHICLE</span>
                <p class="text-white font-bold text-xs">Nilambur Palace Atelier Hub</p>
                <p class="text-stone-300 text-[10px]">Vehicle: Air-Suspension Smart Van (0.02G Sensor Verified)</p>
              </div>
              <div class="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
                <span class="text-stone-400 font-cinzel block text-[10px]">WHITE-GLOVE LEAD ARTISAN</span>
                <p class="text-white font-bold text-xs">Master S. Narayanan (+91 98480 22100)</p>
                <p class="text-emerald-400 text-[10px]">✨ Sanitized white-glove setup & placement</p>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', trackingModalHtml);
    }
  }

  // --- 11. GLOBAL INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', function () {
    injectUniversalModals();
    FF_Cart.updateBadges();
    FF_Wishlist.updateBadges();
    FF_Wishlist.updateCardButtons();
    FF_Notifications.updateBadges();
    FF_Compare.renderDock();

    // Attach search trigger clicks
    document.querySelectorAll('[data-action="search"], .ff-search-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        FF_Search.openModal();
      });
    });

    // Attach cart trigger clicks
    document.querySelectorAll('[data-action="cart"], .ff-cart-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        FF_Cart.openDrawer();
      });
    });

    // Attach notification trigger clicks
    document.querySelectorAll('[data-action="notifications"], .ff-notif-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        FF_Notifications.openDrawer();
      });
    });

    // Attach compare dock triggers
    document.querySelectorAll('[data-action="compare-modal"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        FF_Compare.openModal();
      });
    });

    // Update active user profile badge in header if authenticated
    try {
      const user = JSON.parse(localStorage.getItem('FF_AUTH_USER') || 'null');
      if (user) {
        const userDisplays = document.querySelectorAll('#userPointsDisplay, .ff-user-badge');
        userDisplays.forEach(el => {
          el.innerText = `👑 ${user.name} (${user.membership || 'VIP GOLD'})`;
        });
      }
    } catch(e) {}

    // Initialize Lucide Icons if loaded
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  });

})();


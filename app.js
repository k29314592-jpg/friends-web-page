// ==========================================================================
// FRIENDS FURNITURE - COMPLETE ROYAL SMART FURNITURE & HOME INTELLIGENCE 2.0
// “Where Luxury Meets Comfort.”
// “Your Home. Your Furniture. One Intelligent Ecosystem.”
// ==========================================================================

const { useState, useEffect, useMemo } = React;

// Currency Formatter
const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

function App() {
  // 🔐 Active Portal Mode: landing | login | register | customer | showroom | supplier | admin | ai-delivery
  const [activePortal, setActivePortal] = useState("landing");
  
  // Specific Sub-page inside the active portal
  const [activeSubpage, setActiveSubpage] = useState("my-smart-home");

  // Master Data State
  const [products, setProducts] = useState(LUXURY_PRODUCTS);
  const [collections] = useState(ROYAL_COLLECTIONS_DATA);
  const [showrooms, setShowrooms] = useState(LUXURY_SHOWROOMS);
  const [suppliers, setSuppliers] = useState(LUXURY_SUPPLIERS);
  const [customers, setCustomers] = useState(LUXURY_CUSTOMERS);
  const [orders, setOrders] = useState(LUXURY_ORDERS);
  const [coupons, setCoupons] = useState(LUXURY_COUPONS);
  const [notifications, setNotifications] = useState(SMART_NOTIFICATIONS);
  const [demandForecasts] = useState(AI_DEMAND_FORECASTS);
  const [careCalendar, setCareCalendar] = useState(INITIAL_CARE_CALENDAR);
  const [serviceRequests, setServiceRequests] = useState(INITIAL_SERVICE_REQUESTS);
  const [homeGenome, setHomeGenome] = useState(INITIAL_HOME_GENOME);
  const [preventionAlerts, setPreventionAlerts] = useState(INITIAL_PREVENTION_ALERTS);
  const [achievements, setAchievements] = useState(ROYAL_ACHIEVEMENTS_DATA);

  // Selected Entities
  const [selectedProduct, setSelectedProduct] = useState(LUXURY_PRODUCTS[0]);
  const [selectedOrder, setSelectedOrder] = useState(LUXURY_ORDERS[0]);
  const [selectedShowroom, setSelectedShowroom] = useState(LUXURY_SHOWROOMS[0]);
  const [selectedSupplier, setSelectedSupplier] = useState(LUXURY_SUPPLIERS[0]);
  const [selectedCareProduct, setSelectedCareProduct] = useState(LUXURY_PRODUCTS[0]);
  const [selectedRoom, setSelectedRoom] = useState(INITIAL_HOME_GENOME.rooms[0]);

  // Saved Custom Designs from Sofa Configurator
  const [savedDesigns, setSavedDesigns] = useState([
    {
      id: "dsg-101",
      title: "Royal Azure Chesterfield",
      shape: "3-Seater Chesterfield",
      size: "94\" L x 40\" W",
      material: "Velvet",
      color: "Royal Blue",
      legStyle: "24K Gold Tapered",
      cushionStyle: "Diamond Tufted",
      estimatedPrice: 94999,
      date: "26 August 2026"
    }
  ]);

  // Saved Quotations for Showroom Portal
  const [savedQuotations, setSavedQuotations] = useState([
    {
      id: "QT-8821",
      customerName: "Maharaja S. Verma",
      items: [
        { name: "THE IMPERIAL SOFA", qty: 1, price: 89999 },
        { name: "THE SOVEREIGN DINING SUITE", qty: 1, price: 94999 }
      ],
      discountPercent: 10,
      tax: 8999,
      delivery: 0,
      total: 175497,
      date: "29 August 2026",
      status: "Sent to Client"
    }
  ]);

  // Customer Shopping Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_multi_cart_v3');
      return saved ? JSON.parse(saved) : [
        {
          cartItemId: "ff-101-Royal-Blue-Velvet",
          id: "ff-101",
          name: "THE IMPERIAL SOFA",
          price: 89999,
          originalPrice: 114999,
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
          color: "Royal Blue",
          material: "Velvet",
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ff_multi_wishlist_v3');
      return saved ? JSON.parse(saved) : ["ff-101", "ff-103"];
    } catch {
      return ["ff-101", "ff-103"];
    }
  });

  // Current User Session
  const [currentUser, setCurrentUser] = useState({
    role: "customer",
    name: "Hari",
    email: "hari@gmail.com",
    mobile: "+91 98765 43210",
    membershipTier: "GOLD",
    tierTitle: "Royal Member",
    royalPoints: 3450,
    address: "Palace Suite 402, Lotus Heights, Banjara Hills, Hyderabad - 500034",
    homeGenomeId: "HG-HARI-402"
  });

  // UI state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isExpertChatOpen, setIsExpertChatOpen] = useState(false);
  const [isRoomFitModalOpen, setIsRoomFitModalOpen] = useState(false);
  const [activeQRProduct, setActiveQRProduct] = useState(null);
  const [activeQRCareModal, setActiveQRCareModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync Local Storage
  useEffect(() => {
    try { localStorage.setItem('ff_multi_cart_v3', JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try { localStorage.setItem('ff_multi_wishlist_v3', JSON.stringify(wishlist)); } catch (e) {}
  }, [wishlist]);

  const showToast = (message, type = "royal") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  };

  const navigateTo = (portal, subpage = "my-smart-home", param = null) => {
    setActivePortal(portal);
    setActiveSubpage(subpage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (param && subpage === "product-details") setSelectedProduct(param);
    if (param && subpage === "order-tracking") setSelectedOrder(param);
    if (param && subpage === "furniture-passport") setSelectedOrder(param);
    if (param && subpage === "furniture-care") setSelectedCareProduct(param);
    if (param && subpage === "room-detail") setSelectedRoom(param);
  };

  // Cart Operations
  const addToCart = (product, qty = 1, selectedColor = null, selectedMaterial = null) => {
    const color = selectedColor || product.color || "Royal Blue";
    const material = selectedMaterial || "Velvet";
    const cartItemId = `${product.id}-${color}-${material}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images ? product.images[0] : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
          color,
          material,
          quantity: qty
        }
      ];
    });
    showToast(`Added "${product.name}" (${color} • ${material}) to Cart. ✨`);
  };

  const updateCartQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
      showToast("Item removed from Cart", "info");
    } else {
      setCart((prev) =>
        prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
      );
    }
  };

  const toggleWishlist = (productId, productName) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${productName}" from My Royal Collection`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added "${productName}" to My Royal Collection! ❤️`);
        return [...prev, productId];
      }
    });
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === clean);
    if (found) {
      setAppliedCoupon(found);
      showToast(`Privilege "${found.code}" applied! 👑`);
    } else {
      showToast("Invalid Privilege Charter. Try 'ROYAL15' or 'FESTIVAL25'", "error");
    }
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) return Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    if (appliedCoupon.fixedDiscount) return Math.min(appliedCoupon.fixedDiscount, cartSubtotal);
    return 0;
  }, [cartSubtotal, appliedCoupon]);
  const shippingFee = cartSubtotal >= 30000 || cartSubtotal === 0 ? 0 : 1499;
  const taxAmount = Math.round((cartSubtotal - discountAmount) * 0.05);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + taxAmount);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#FFF8E7] palace-pattern royal-vignette relative selection:bg-[#C9A227] selection:text-[#050505]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-modal">
          <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#07142F]/95 text-[#FFF8E7] border border-[#F1D78B]/60 shadow-[0_0_35px_rgba(201,162,39,0.4)] backdrop-blur-xl">
            <span className="text-2xl">{toast.type === 'error' ? '⚠️' : '👑'}</span>
            <div>
              <div className="text-[10px] uppercase font-cinzel font-bold text-champagne tracking-widest">
                Home Intelligence Proclamation
              </div>
              <div className="text-xs sm:text-sm font-semibold">{toast.message}</div>
            </div>
          </div>
        </div>
      )}

      {/* Global Master Header with Multi-Portal Role Switcher */}
      <RoyalGlobalHeader
        activePortal={activePortal}
        activeSubpage={activeSubpage}
        onNavigate={navigateTo}
        currentUser={currentUser}
        cartCount={cartCount}
        cartTotal={grandTotal}
        wishlistCount={wishlist.length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotifs={notifications.filter((n) => n.unread).length}
        onOpenExpertChat={() => setIsExpertChatOpen(true)}
      />

      {/* MAIN PORTAL PAGES */}
      <main className="flex-grow">
        {/* 🏠 1. LANDING PAGE */}
        {activePortal === "landing" && (
          <RoyalLandingPage
            onNavigate={navigateTo}
            products={products}
            collections={collections}
            showrooms={showrooms}
            onSelectProduct={(p) => navigateTo("customer", "product-details", p)}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onOpenRoomFit={() => setIsRoomFitModalOpen(true)}
          />
        )}

        {/* 🔐 2. LOGIN PAGE */}
        {activePortal === "login" && (
          <RoyalLoginPage
            onNavigate={navigateTo}
            onLoginSuccess={(role, userData) => {
              setCurrentUser({ ...currentUser, role, name: userData.name || currentUser.name });
              showToast(`Authenticated as ${role.toUpperCase()} 👑`);
              navigateTo(role, "my-smart-home");
            }}
          />
        )}

        {/* 📝 3. REGISTER PAGE */}
        {activePortal === "register" && (
          <RoyalRegisterPage
            onNavigate={navigateTo}
            onRegisterSuccess={(role, userData) => {
              setCurrentUser({ ...currentUser, role, name: userData.name });
              showToast(`Account registered as ${role.toUpperCase()} ✨`);
              navigateTo(role, "my-smart-home");
            }}
          />
        )}

        {/* 👤 4. CUSTOMER PORTAL & HOME INTELLIGENCE 2.0 */}
        {activePortal === "customer" && (
          <RoyalCustomerPortal
            activeSubpage={activeSubpage}
            onNavigate={navigateTo}
            currentUser={currentUser}
            products={products}
            collections={collections}
            orders={orders}
            wishlist={wishlist}
            savedDesigns={savedDesigns}
            onSaveDesign={(newDsg) => {
              setSavedDesigns([newDsg, ...savedDesigns]);
              showToast("Custom Sofa Design saved to My Royal Collection! 🎨");
            }}
            cart={cart}
            cartSubtotal={cartSubtotal}
            discountAmount={discountAmount}
            shippingFee={shippingFee}
            taxAmount={taxAmount}
            grandTotal={grandTotal}
            appliedCoupon={appliedCoupon}
            onAddToCart={addToCart}
            onUpdateCartQty={updateCartQty}
            onToggleWishlist={toggleWishlist}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={() => setAppliedCoupon(null)}
            selectedProduct={selectedProduct}
            selectedOrder={selectedOrder}
            selectedCareProduct={selectedCareProduct}
            setSelectedCareProduct={setSelectedCareProduct}
            careCalendar={careCalendar}
            setCareCalendar={setCareCalendar}
            serviceRequests={serviceRequests}
            onAddServiceRequest={(newReq) => {
              setServiceRequests([newReq, ...serviceRequests]);
              showToast(`Care Request #${newReq.ticketId} submitted for review. 🛠️`);
            }}
            homeGenome={homeGenome}
            setHomeGenome={setHomeGenome}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            preventionAlerts={preventionAlerts}
            achievements={achievements}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onSelectOrder={(o) => setSelectedOrder(o)}
            onOrderPlaced={(newOrder) => {
              setOrders([newOrder, ...orders]);
              setCart([]);
              setSelectedOrder(newOrder);
              if (window.confetti) window.confetti({ particleCount: 180, spread: 90 });
              navigateTo("customer", "order-tracking", newOrder);
            }}
            onOpenRoomFit={() => setIsRoomFitModalOpen(true)}
            onOpenQRCare={() => setActiveQRCareModal(true)}
          />
        )}

        {/* 🏬 5. SHOWROOM PORTAL & DESIGN STUDIO */}
        {activePortal === "showroom" && (
          <RoyalShowroomPortal
            activeSubpage={activeSubpage}
            onNavigate={navigateTo}
            showroom={selectedShowroom}
            showrooms={showrooms}
            onSelectShowroom={setSelectedShowroom}
            products={products}
            orders={orders}
            savedQuotations={savedQuotations}
            onSaveQuotation={(q) => {
              setSavedQuotations([q, ...savedQuotations]);
              showToast(`Quotation ${q.id} generated & saved! 🧾`);
            }}
            onUpdateOrderStatus={(orderId, newStatus) => {
              setOrders(orders.map((o) => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
              showToast(`Order ${orderId} updated to "${newStatus}"`);
            }}
            onOpenQRModal={(prod) => setActiveQRProduct(prod)}
          />
        )}

        {/* 🏭 6. SUPPLIER PORTAL & INTELLIGENCE */}
        {activePortal === "supplier" && (
          <RoyalSupplierPortal
            activeSubpage={activeSubpage}
            onNavigate={navigateTo}
            supplier={selectedSupplier}
            suppliers={suppliers}
            onSelectSupplier={setSelectedSupplier}
            products={products}
            orders={orders}
            onUpdateStage={(orderId, newStage, newIndex) => {
              setOrders(orders.map((o) => o.orderId === orderId ? { ...o, currentStage: newStage, stageIndex: newIndex } : o));
              showToast(`Production stage updated: ${newStage}`);
            }}
          />
        )}

        {/* 👨💼 7. ADMIN CONTROL CENTER & HOME INTELLIGENCE */}
        {activePortal === "admin" && (
          <RoyalAdminPortal
            activeSubpage={activeSubpage}
            onNavigate={navigateTo}
            products={products}
            setProducts={setProducts}
            showrooms={showrooms}
            suppliers={suppliers}
            customers={customers}
            orders={orders}
            coupons={coupons}
            demandForecasts={demandForecasts}
            homeGenome={homeGenome}
            preventionAlerts={preventionAlerts}
          />
        )}

        {/* 🤖 8. AI DELIVERY PREDICTOR & WHAT-IF SIMULATOR */}
        {activePortal === "ai-delivery" && (
          <RoyalAIDeliveryPredictorSuite
            activeSubpage={activeSubpage}
            onNavigate={navigateTo}
            orders={orders}
            suppliers={suppliers}
            products={products}
          />
        )}
      </main>

      {/* Floating AI Concierge Chatbot Button */}
      <button
        onClick={() => setIsExpertChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 btn-royal-gold p-3.5 sm:px-5 sm:py-3 rounded-full shadow-[0_0_30px_rgba(201,162,39,0.6)] flex items-center gap-2 text-xs font-bold font-cinzel"
      >
        <span className="text-lg">💬</span>
        <span className="hidden sm:inline">Ask Home & Furniture AI</span>
      </button>

      {/* 💬 AI Concierge Chat Modal */}
      {isExpertChatOpen && (
        <RoyalFurnitureExpertModal onClose={() => setIsExpertChatOpen(false)} onNavigate={navigateTo} />
      )}

      {/* 📏 Will It Fit? (Room Fit Checker Modal) */}
      {isRoomFitModalOpen && (
        <RoyalRoomFitCheckerModal
          product={selectedProduct}
          onClose={() => setIsRoomFitModalOpen(false)}
        />
      )}

      {/* 📱 QR Code Smart Showroom Modal */}
      {activeQRProduct && (
        <RoyalShowroomQRModal
          product={activeQRProduct}
          onClose={() => setActiveQRProduct(null)}
          onAddToCart={() => {
            addToCart(activeQRProduct);
            setActiveQRProduct(null);
          }}
        />
      )}

      {/* 📱 QR Care Mode (Quick Care Modal) */}
      {activeQRCareModal && (
        <RoyalQuickCareQRModal
          product={selectedCareProduct}
          onClose={() => setActiveQRCareModal(false)}
          onNavigate={navigateTo}
        />
      )}

      {/* 🔔 Notifications Center Modal */}
      {isNotificationsOpen && (
        <RoyalSmartNotificationsCenter
          notifications={notifications}
          currentRole={currentUser.role}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllRead={() => {
            setNotifications(notifications.map((n) => ({ ...n, unread: false })));
            showToast("All announcements acknowledged.", "info");
          }}
        />
      )}

      {/* Royal Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border-t border-[#C9A227]/30 py-2 px-3 flex justify-around items-center text-[10px] font-cinzel">
        <button onClick={() => navigateTo("landing")} className={`flex flex-col items-center ${activePortal === 'landing' ? 'text-gold font-bold' : 'text-stone-400'}`}>
          <span className="text-base">🏰</span><span>Home</span>
        </button>
        <button onClick={() => navigateTo("customer", "shop")} className={`flex flex-col items-center ${activeSubpage === 'shop' ? 'text-gold font-bold' : 'text-stone-400'}`}>
          <span className="text-base">🛍️</span><span>Shop</span>
        </button>
        <button onClick={() => navigateTo("customer", "home-genome")} className={`flex flex-col items-center ${activeSubpage === 'home-genome' ? 'text-gold font-bold' : 'text-stone-400'}`}>
          <span className="text-base">🌐</span><span>Genome</span>
        </button>
        <button onClick={() => navigateTo("customer", "my-smart-home")} className={`flex flex-col items-center ${activeSubpage === 'my-smart-home' ? 'text-gold font-bold' : 'text-stone-400'}`}>
          <span className="text-base">🧠</span><span>My Home</span>
        </button>
        <button onClick={() => navigateTo("customer", "cart")} className={`flex flex-col items-center relative ${activeSubpage === 'cart' ? 'text-gold font-bold' : 'text-stone-400'}`}>
          <span className="text-base">🛒</span><span>Cart</span>
          {cartCount > 0 && <span className="absolute -top-1 right-2 bg-[#C9A227] text-black font-extrabold px-1 rounded-full text-[8px]">{cartCount}</span>}
        </button>
      </div>

      {/* Royal Footer */}
      <RoyalPalaceFooter onNavigate={navigateTo} />
    </div>
  );
}

// --------------------------------------------------------------------------
// GLOBAL MASTER HEADER & ROLE SWITCHER
// --------------------------------------------------------------------------
function RoyalGlobalHeader({
  activePortal,
  activeSubpage,
  onNavigate,
  currentUser,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenNotifications,
  unreadNotifs,
  onOpenExpertChat
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border-b border-[#C9A227]/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
      {/* Top Proclamation Bar */}
      <div className="bg-gradient-to-r from-[#050505] via-[#07142F] to-[#1B0B36] text-xs py-1.5 px-4 sm:px-8 border-b border-[#C9A227]/20 flex items-center justify-between">
        {/* Left: Instant Multi-Portal Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-400 font-cinzel font-bold tracking-widest hidden lg:inline">
            PORTAL ECOSYSTEM:
          </span>
          <div className="flex bg-black/60 p-0.5 rounded-lg border border-[#C9A227]/40 overflow-x-auto">
            {[
              { id: "landing", label: "🏰 Landing", sub: "home" },
              { id: "customer", label: "👤 Customer & Home AI", sub: "my-smart-home" },
              { id: "showroom", label: "🏬 Showroom", sub: "dashboard" },
              { id: "supplier", label: "🏭 Supplier", sub: "dashboard" },
              { id: "admin", label: "👨💼 Admin", sub: "dashboard" },
              { id: "ai-delivery", label: "🤖 AI Predictor", sub: "predictor" }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id, p.sub)}
                className={`px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold whitespace-nowrap transition ${
                  activePortal === p.id
                    ? "bg-[#C9A227] text-[#050505] shadow-[0_0_10px_rgba(201,162,39,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Session Status */}
        <div className="flex items-center gap-4 text-stone-300 text-[11px] font-cinzel">
          <span className="text-champagne font-bold hidden sm:inline">
            👑 {currentUser.membershipTier} MEMBER ({currentUser.royalPoints} PTS)
          </span>
          <span className="text-gold cursor-pointer hover:underline" onClick={onOpenExpertChat}>
            💬 Home AI Chat
          </span>
          <button
            onClick={() => onNavigate("login")}
            className="text-stone-400 hover:text-white font-bold text-[10px] uppercase border border-white/20 px-2 py-0.5 rounded"
          >
            Switch Login
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Center Logo */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex flex-col items-center text-center group py-1"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl text-gold-gradient animate-royal-pulse">👑</span>
              <span className="font-cinzel font-extrabold text-xl sm:text-2xl tracking-[0.18em] text-gold-gradient">
                FRIENDS FURNITURE
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#F1D78B] font-sans font-medium italic mt-0.5">
              “Where Luxury Meets Comfort.” • Home Intelligence 2.0
            </span>
          </button>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#C9A227]/30 text-stone-200 relative transition"
              title="Home Intelligence Alerts"
            >
              <span className="text-base">🔔</span>
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Wishlist / My Royal Collection */}
            <button
              onClick={() => onNavigate("customer", "wishlist")}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#C9A227]/30 text-stone-200 relative transition hidden sm:flex"
              title="My Royal Collection"
            >
              <span className="text-base">❤️</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A227] text-black text-[9px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate("customer", "cart")}
              className="btn-royal-gold px-4 py-2 text-xs font-bold"
              title="Shopping Cart"
            >
              <span>🛍️</span>
              <span className="hidden sm:inline">{cartCount > 0 ? formatPrice(cartTotal) : "Cart"}</span>
              {cartCount > 0 && (
                <span className="bg-[#050505] text-[#C9A227] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => onNavigate("customer", "profile")}
              className="p-2 rounded-xl bg-[#1B0B36] border border-[#C9A227]/40 text-gold flex items-center gap-1.5 hover:bg-[#2A1252] transition"
              title="Profile"
            >
              <span className="text-sm">👑</span>
              <span className="text-xs font-bold hidden lg:inline">{currentUser.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// --------------------------------------------------------------------------
// 🏠 1. LANDING PAGE (HERO WITH SOFA BACKGROUND & ALL SECTIONS)
// --------------------------------------------------------------------------
function RoyalLandingPage({
  onNavigate,
  products,
  collections,
  showrooms,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenRoomFit
}) {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section with Large Luxury Velvet Sofa Background */}
      <section className="hero-sofa-container border-b border-[#C9A227]/25 relative">
        <div className="hero-sofa-bg"></div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-spotlight"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-royal-gold text-xs font-cinzel font-bold tracking-widest uppercase">
                <span>🌐</span>
                <span>HOME INTELLIGENCE 2.0 • FRIENDS FURNITURE</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-black tracking-tight leading-[1.08] text-white">
                  “YOUR HOME. YOUR FURNITURE.” <br />
                  <span className="text-gold-gradient">“ONE INTELLIGENT ECOSYSTEM.”</span>
                </h1>
              </div>

              <p className="text-stone-200 text-sm sm:text-base max-w-xl leading-relaxed font-sans font-light drop-shadow-md">
                “Discover intelligent furniture solutions designed around your space, style and lifestyle.” Connected across Home Genome, Furniture DNA, Spatial Circulation, and Predictive Supply Chains.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("customer", "home-genome")}
                  className="btn-royal-gold px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-2xl"
                >
                  <span>EXPLORE HOME GENOME</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => onNavigate("customer", "create-room")}
                  className="btn-royal-outline px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-lg"
                >
                  ✨ 1-CLICK ROOM CREATOR
                </button>

                <button
                  onClick={() => onNavigate("customer", "my-smart-home")}
                  className="px-4 py-4 text-gold hover:text-white text-xs font-cinzel font-bold flex items-center gap-1.5"
                >
                  <span>🧠 My Smart Home Dashboard</span>
                </button>
              </div>

              {/* Highlights */}
              <div className="pt-6 border-t border-[#C9A227]/30 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">91/100</div>
                  <div className="text-[11px] text-stone-300 font-cinzel">Home Intellect</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">5–7 Days</div>
                  <div className="text-[11px] text-stone-300 font-cinzel">AI Delivery Window</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-gold">100% DNA</div>
                  <div className="text-[11px] text-stone-300 font-cinzel">Timber Authenticity</div>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Card */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="palace-card-elevated p-6 rounded-3xl border border-[#F1D78B]/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-w-md ml-auto animate-float">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-royal-gold text-[9px] font-cinzel font-bold px-2.5 py-0.5 rounded-full">
                    Palace Centerpiece • DNA: FF-SF2048
                  </span>
                  <div className="flex items-center text-amber-400 text-xs">
                    <span>★★★★★</span>
                    <span className="text-white ml-1 font-bold">4.9</span>
                  </div>
                </div>

                <h3 className="text-xl font-cinzel font-bold text-white">THE IMPERIAL SOFA</h3>
                <p className="text-xs text-stone-300 font-sans mt-1">
                  Diamond-tufted royal velvet upholstery with 24K gold foil carved trim and high-resilience comfort core.
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-serif font-bold text-gold">₹89,999</span>
                    <span className="text-xs text-stone-500 line-through ml-2">₹1,14,999</span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(products[0])}
                    className="btn-royal-gold px-4 py-2 text-[10px] font-bold uppercase"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Home Intelligence Hubs Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-royal-gold text-xs uppercase tracking-widest font-bold px-4 py-1 rounded-full inline-block mb-2">
            Flagship Intelligence Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
            HOME INTELLIGENCE 2.0
          </h2>
          <p className="text-xs text-stone-300 mt-2">
            Understanding the complete living matrix: HOME → ROOMS → FURNITURE → SPACE → STYLE → BUDGET → SUPPLIERS → LIFECYCLE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: "home-genome",
              icon: "🧬",
              title: "MY HOME GENOME",
              desc: "Digital profile of your entire residence with visual room mapping, style vectors, and spatial metrics."
            },
            {
              id: "detective",
              icon: "🕵️",
              title: "FURNITURE DETECTIVE",
              desc: "Trace cradle-to-gate verified history from timber harvesting to showroom and living room."
            },
            {
              id: "relationships",
              icon: "🔗",
              title: "RELATIONSHIP ENGINE",
              desc: "Interactive compatibility network connecting sofas, marble tables, and sculptural chairs."
            },
            {
              id: "empty-space",
              icon: "🧩",
              title: "EMPTY SPACE HUNTER",
              desc: "Spatial analysis identifying underused corners and calculating utilization gains."
            }
          ].map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate("customer", card.id)}
              className="palace-card p-6 border border-[#C9A227]/30 hover:border-[#C9A227] cursor-pointer transition flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl block mb-2">{card.icon}</span>
                <h3 className="font-cinzel font-bold text-base text-gold">{card.title}</h3>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed font-sans">{card.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-cinzel font-bold text-champagne">
                Explore Hub →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Royal Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-royal-gold text-xs uppercase tracking-widest font-bold px-4 py-1 rounded-full inline-block mb-2">
            Curated Suites
          </span>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
            THE ROYAL COLLECTION
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate("customer", "shop")}
              className="palace-card overflow-hidden group cursor-pointer border border-[#C9A227]/35 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-black/40">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent"></div>
                <span className="absolute top-3 right-3 text-[10px] font-cinzel font-bold bg-black/70 backdrop-blur-md text-gold px-2.5 py-1 rounded-full border border-[#C9A227]/40">
                  {col.count}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold transition">{col.title}</h3>
                  <p className="text-xs text-stone-300 mt-1 font-sans">{col.subtitle}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-cinzel font-bold text-gold group-hover:translate-x-1 transition">
                  <span>Enter Collection →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Furniture Showcase with Room Match % & Personality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="badge-royal-gold text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block mb-1">
              Featured Masterpieces
            </span>
            <h2 className="text-3xl font-cinzel font-bold text-white">Palace Catalogue</h2>
          </div>
          <button onClick={() => onNavigate("customer", "shop")} className="text-xs font-cinzel font-bold text-gold hover:underline">
            View All Pieces →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <LuxuryProductCard
              key={product.id}
              product={product}
              onSelect={() => onSelectProduct(product)}
              onAddToCart={() => onAddToCart(product)}
              onToggleWishlist={() => onToggleWishlist(product.id, product.name)}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Showroom Locations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-royal-gold text-xs font-bold px-3 py-1 rounded-full inline-block mb-1">
              Flagship Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient">
              VISIT OUR ROYAL SHOWROOMS
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Experience the touch of seasoned solid Nilambur teak and plush velvet in person with our private concierge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showrooms.map((shw) => (
              <div key={shw.id} className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-xs">
                <span className="font-cinzel font-bold text-sm text-gold block">{shw.name}</span>
                <p className="text-stone-300">{shw.location}</p>
                <div className="pt-2 text-stone-400">
                  <span>Manager: <strong className="text-white">{shw.manager}</strong></span> • <span>{shw.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🔐 2. LOGIN PAGE (ROLE SELECTION: Customer, Showroom, Supplier, Admin)
// --------------------------------------------------------------------------
function RoyalLoginPage({ onNavigate, onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState("customer");
  const [identifier, setIdentifier] = useState("hari@gmail.com");
  const [password, setPassword] = useState("royalpassword123");
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === "customer") setIdentifier("hari@gmail.com");
    if (role === "showroom") setIdentifier("hari.showroom@gmail.com");
    if (role === "supplier") setIdentifier("hari.supplier@gmail.com");
    if (role === "admin") setIdentifier("hari.admin@gmail.com");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess(selectedRole, { name: identifier.split('@')[0].replace('.', ' ') });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 relative">
      <div className="palace-card-elevated p-8 sm:p-10 rounded-3xl border-2 border-[#C9A227]/60 max-w-md w-full shadow-2xl space-y-6 animate-modal">
        <div className="text-center space-y-1">
          <span className="text-3xl">👑</span>
          <h2 className="text-2xl font-cinzel font-extrabold text-white">FRIENDS FURNITURE</h2>
          <span className="text-xs font-cinzel text-champagne font-bold block uppercase tracking-widest">
            HOME INTELLIGENCE 2.0 ACCESS
          </span>
        </div>

        {/* 4 Role Selector Tabs */}
        <div>
          <label className="text-[11px] font-cinzel font-bold text-stone-300 block mb-2">LOGIN AS:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10">
            {[
              { id: "customer", label: "👤 Customer" },
              { id: "showroom", label: "🏬 Showroom" },
              { id: "supplier", label: "🏭 Supplier" },
              { id: "admin", label: "👨💼 Admin" }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`py-1.5 rounded-lg text-[10px] font-cinzel font-bold transition ${
                  selectedRole === r.id
                    ? "bg-[#C9A227] text-black shadow"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">
              {selectedRole === 'showroom' ? 'Showroom ID / Email' : selectedRole === 'supplier' ? 'Supplier ID / Email' : 'Email / Mobile Number'}
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-black/60 border border-white/20 rounded-xl p-3 text-white focus:ring-1 focus:ring-[#C9A227]"
            />
          </div>

          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-white/20 rounded-xl p-3 text-white focus:ring-1 focus:ring-[#C9A227]"
            />
          </div>

          <div className="flex items-center justify-between text-stone-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-[#C9A227]" />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-gold hover:underline">Forgot Password?</button>
          </div>

          <button type="submit" className="w-full btn-royal-gold py-4 text-xs font-bold uppercase tracking-widest shadow-2xl">
            LOGIN AS {selectedRole.toUpperCase()} →
          </button>
        </form>

        <div className="text-center pt-2 border-t border-white/10 text-xs text-stone-400">
          New to Friends Furniture?{" "}
          <button onClick={() => onNavigate("register")} className="text-gold font-bold hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 📝 3. REGISTER PAGE
// --------------------------------------------------------------------------
function RoyalRegisterPage({ onNavigate, onRegisterSuccess }) {
  const [accountType, setAccountType] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSuccess(accountType, { name: fullName || "New Royal Client", email, mobile });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="palace-card-elevated p-8 sm:p-10 rounded-3xl border-2 border-[#C9A227]/60 max-w-md w-full shadow-2xl space-y-6 animate-modal">
        <div className="text-center space-y-1">
          <span className="text-3xl">👑</span>
          <h2 className="text-2xl font-cinzel font-extrabold text-white">JOIN HOME INTELLIGENCE 2.0</h2>
          <span className="text-xs text-stone-300">Create your digital home genome profile</span>
        </div>

        <div>
          <label className="text-[11px] font-cinzel font-bold text-stone-300 block mb-2">ACCOUNT TYPE:</label>
          <div className="grid grid-cols-3 gap-2 bg-black/60 p-1 rounded-xl border border-white/10">
            {["customer", "showroom", "supplier"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setAccountType(r)}
                className={`py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase transition ${
                  accountType === r ? "bg-[#C9A227] text-black" : "text-stone-400"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Full Name / Entity Name</label>
            <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Maharaja S. Verma" className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
          </div>
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Mobile Number</label>
            <input required type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91 98765 43210" className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
          </div>
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
          </div>
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
          </div>

          <button type="submit" className="w-full btn-royal-gold py-3.5 text-xs font-bold uppercase tracking-widest shadow-2xl mt-4">
            COMPLETE REGISTRATION →
          </button>
        </form>

        <div className="text-center text-xs text-stone-400">
          Already have an account?{" "}
          <button onClick={() => onNavigate("login")} className="text-gold font-bold hover:underline">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 👤 4. CUSTOMER PORTAL & HOME INTELLIGENCE 2.0 SUITE
// --------------------------------------------------------------------------
function RoyalCustomerPortal({
  activeSubpage,
  onNavigate,
  currentUser,
  products,
  collections,
  orders,
  wishlist,
  savedDesigns,
  onSaveDesign,
  cart,
  cartSubtotal,
  discountAmount,
  shippingFee,
  taxAmount,
  grandTotal,
  appliedCoupon,
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  onApplyCoupon,
  onRemoveCoupon,
  selectedProduct,
  selectedOrder,
  selectedCareProduct,
  setSelectedCareProduct,
  careCalendar,
  setCareCalendar,
  serviceRequests,
  onAddServiceRequest,
  homeGenome,
  setHomeGenome,
  selectedRoom,
  setSelectedRoom,
  preventionAlerts,
  achievements,
  onSelectProduct,
  onSelectOrder,
  onOrderPlaced,
  onOpenRoomFit,
  onOpenQRCare
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Customer & Home Intelligence 2.0 Navigation Bar */}
      <div className="palace-card p-3 border border-[#C9A227]/30 flex items-center justify-between overflow-x-auto">
        <div className="flex gap-2">
          {[
            { id: "my-smart-home", label: "🧠 My Smart Home" },
            { id: "home-genome", label: "🧬 Home Genome" },
            { id: "detective", label: "🕵️ Furniture Detective" },
            { id: "relationships", label: "🔗 Relationship Engine" },
            { id: "empty-space", label: "🧩 Space Hunter" },
            { id: "room-flow", label: "🚶 Room Flow" },
            { id: "delivery-access", label: "🚪 Delivery Access" },
            { id: "future-room", label: "🔮 Future Room" },
            { id: "create-room", label: "✨ 1-Click Creator" },
            { id: "color-harmony", label: "🎨 Color Intellect" },
            { id: "prevention", label: "🚨 Prevention Center" },
            { id: "achievements", label: "🏆 Royal Achievements" },
            { id: "second-life", label: "🌱 Second Life" },
            { id: "shop", label: "🛍️ Shop" },
            { id: "furniture-care", label: "🛠️ Care Center" },
            { id: "wishlist", label: "❤️ My Collection" },
            { id: "cart", label: `🛒 Cart (${cart.length})` },
            { id: "orders", label: "📦 Orders" },
            { id: "order-tracking", label: "🚚 Live Journey" },
            { id: "furniture-passport", label: "🧬 Passport" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate("customer", tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition ${
                activeSubpage === tab.id
                  ? "bg-[#C9A227] text-black shadow-[0_0_15px_rgba(201,162,39,0.5)]"
                  : "bg-white/5 text-stone-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subpage Router */}
      {activeSubpage === "my-smart-home" && (
        <RoyalMySmartHomeDashboard
          currentUser={currentUser}
          homeGenome={homeGenome}
          orders={orders}
          wishlist={wishlist}
          products={products}
          preventionAlerts={preventionAlerts}
          onNavigate={onNavigate}
        />
      )}

      {/* 🧬 1. HOME GENOME */}
      {activeSubpage === "home-genome" && (
        <RoyalHomeGenomePage
          homeGenome={homeGenome}
          products={products}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
          onNavigate={onNavigate}
        />
      )}

      {/* 🕵️ 3. FURNITURE DETECTIVE */}
      {activeSubpage === "detective" && (
        <RoyalFurnitureDetectivePage
          products={products}
          orders={orders}
          onNavigate={onNavigate}
        />
      )}

      {/* 🔗 5. FURNITURE RELATIONSHIP ENGINE */}
      {activeSubpage === "relationships" && (
        <RoyalFurnitureRelationshipsPage
          products={products}
          onSelectProduct={(p) => { onSelectProduct(p); onNavigate("customer", "product-details"); }}
          onAddToCart={onAddToCart}
        />
      )}

      {/* 🧩 6. EMPTY SPACE HUNTER */}
      {activeSubpage === "empty-space" && (
        <RoyalEmptySpaceHunterPage
          homeGenome={homeGenome}
          products={products}
          onAddToCart={onAddToCart}
          onNavigate={onNavigate}
        />
      )}

      {/* 🚶 7. ROOM FLOW INTELLIGENCE */}
      {activeSubpage === "room-flow" && (
        <RoyalRoomFlowPage
          homeGenome={homeGenome}
          onNavigate={onNavigate}
        />
      )}

      {/* 🚪 8. DELIVERY ACCESS INTELLIGENCE */}
      {activeSubpage === "delivery-access" && (
        <RoyalDeliveryAccessPage
          products={products}
          onNavigate={onNavigate}
        />
      )}

      {/* 🔮 9. ROOM FUTURE SIMULATOR */}
      {activeSubpage === "future-room" && (
        <RoyalFutureRoomPage
          homeGenome={homeGenome}
          products={products}
          onAddToCart={onAddToCart}
        />
      )}

      {/* 🛋️ 10. ONE-CLICK ROOM CREATOR */}
      {activeSubpage === "create-room" && (
        <RoyalOneClickRoomCreatorPage
          products={products}
          onAddCompleteRoomSet={(items) => {
            items.forEach((i) => onAddToCart(i, 1));
            onNavigate("customer", "cart");
          }}
        />
      )}

      {/* 🎨 11. COLOR HARMONY ENGINE */}
      {activeSubpage === "color-harmony" && (
        <RoyalColorIntelligencePage
          products={products}
          onSelectProduct={(p) => { onSelectProduct(p); onNavigate("customer", "product-details"); }}
          onAddToCart={onAddToCart}
        />
      )}

      {/* 🚨 12. PROBLEM PREVENTION CENTER */}
      {activeSubpage === "prevention" && (
        <RoyalPreventionCenterPage
          alerts={preventionAlerts}
          onNavigate={onNavigate}
        />
      )}

      {/* 🏆 16. ROYAL ACHIEVEMENTS */}
      {activeSubpage === "achievements" && (
        <RoyalAchievementsPage
          achievements={achievements}
          user={currentUser}
          onNavigate={onNavigate}
        />
      )}

      {/* 🌱 17. SECOND LIFE CENTER */}
      {activeSubpage === "second-life" && (
        <RoyalSecondLifePage
          products={products}
          onNavigate={onNavigate}
        />
      )}

      {/* Customer Shop */}
      {activeSubpage === "shop" && (
        <RoyalSmartShopPage
          products={products}
          totalCount={products.length}
          selectedCategoryTab={selectedCategory}
          setSelectedCategoryTab={setSelectedCategory}
          onSelectProduct={(p) => { onSelectProduct(p); onNavigate("customer", "product-details"); }}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlist={wishlist}
        />
      )}

      {/* 🛠️ FRIENDS CARE (FURNITURE HEALTH & LIFECYCLE PLATFORM) */}
      {activeSubpage === "furniture-care" && (
        <RoyalFriendsCareCenterPage
          products={products}
          selectedCareProduct={selectedCareProduct}
          setSelectedCareProduct={setSelectedCareProduct}
          careCalendar={careCalendar}
          serviceRequests={serviceRequests}
          onAddServiceRequest={onAddServiceRequest}
          onOpenQRCare={onOpenQRCare}
          onNavigate={onNavigate}
        />
      )}

      {/* Product Details Studio */}
      {activeSubpage === "product-details" && selectedProduct && (
        <RoyalProductDetailsPage
          product={selectedProduct}
          onAddToCart={onAddToCart}
          onBuyNow={(prod, color, material) => {
            onAddToCart(prod, 1, color, material);
            onNavigate("customer", "checkout");
          }}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onOpenRoomFit={onOpenRoomFit}
          onNavigate={onNavigate}
        />
      )}

      {/* Wishlist / My Royal Collection */}
      {activeSubpage === "wishlist" && (
        <RoyalWishlistCollectionPage
          products={products}
          wishlist={wishlist}
          savedDesigns={savedDesigns}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          onNavigate={onNavigate}
        />
      )}

      {/* Cart */}
      {activeSubpage === "cart" && (
        <RoyalCartPage
          cart={cart}
          onUpdateQty={onUpdateCartQty}
          onRemoveItem={(id) => onUpdateCartQty(id, 0)}
          cartSubtotal={cartSubtotal}
          discountAmount={discountAmount}
          shippingFee={shippingFee}
          taxAmount={taxAmount}
          grandTotal={grandTotal}
          appliedCoupon={appliedCoupon}
          couponInput=""
          setCouponInput={() => {}}
          onApplyCoupon={onApplyCoupon}
          onRemoveCoupon={onRemoveCoupon}
          onNavigate={onNavigate}
        />
      )}

      {/* Checkout */}
      {activeSubpage === "checkout" && (
        <RoyalCheckoutPage
          cart={cart}
          user={currentUser}
          cartSubtotal={cartSubtotal}
          discountAmount={discountAmount}
          grandTotal={grandTotal}
          onOrderPlaced={onOrderPlaced}
          onNavigate={onNavigate}
        />
      )}

      {/* Orders List */}
      {activeSubpage === "orders" && (
        <div className="palace-card p-6 border border-[#C9A227]/30 space-y-4 animate-fade-up">
          <h2 className="font-cinzel font-bold text-2xl text-gold">My Furniture Acquisitions</h2>
          {orders.map((ord) => (
            <div key={ord.orderId} className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <img src={ord.productImage} alt={ord.productName} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <span className="font-cinzel text-gold text-xs font-bold">{ord.orderId}</span>
                  <h4 className="font-cinzel font-bold text-sm text-white">{ord.productName}</h4>
                  <span className="text-xs text-stone-400">{formatPrice(ord.amount)} • {ord.paymentStatus}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { onSelectOrder(ord); onNavigate("customer", "furniture-passport"); }} className="btn-royal-outline px-3 py-2 text-xs font-bold">
                  Passport 🧬
                </button>
                <button onClick={() => { onSelectOrder(ord); onNavigate("customer", "order-tracking"); }} className="btn-royal-gold px-4 py-2 text-xs font-bold">
                  View Journey →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🚚 21. YOUR FURNITURE JOURNEY ORDER TRACKING */}
      {activeSubpage === "order-tracking" && selectedOrder && (
        <RoyalOrderTrackingPage
          order={selectedOrder}
          orders={orders}
          onSelectOrder={onSelectOrder}
          onNavigate={onNavigate}
        />
      )}

      {/* 🧬 22. DIGITAL FURNITURE PASSPORT */}
      {activeSubpage === "furniture-passport" && selectedOrder && (
        <RoyalFurniturePassportPage
          order={selectedOrder}
          product={products.find(p => p.id === selectedOrder.productId) || products[0]}
          onNavigate={onNavigate}
        />
      )}

      {/* Profile */}
      {activeSubpage === "profile" && (
        <RoyalProfilePage
          user={currentUser}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 👤 21. CUSTOMER HOME DASHBOARD (MY SMART HOME)
// --------------------------------------------------------------------------
function RoyalMySmartHomeDashboard({ currentUser, homeGenome, orders, wishlist, products, preventionAlerts, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up">
      {/* Top Banner */}
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#C9A227] text-black font-cinzel font-bold text-3xl flex items-center justify-center shadow-2xl">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-royal-gold text-[10px] font-cinzel font-bold px-3 py-0.5 rounded-full">
                {currentUser.membershipTier} Member
              </span>
              <span className="badge-royal-purple text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                GENOME: {currentUser.homeGenomeId || "HG-LOTUS-402"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white mt-1">
              MY SMART HOME
            </h1>
            <p className="text-xs text-stone-300">{homeGenome.homeName} • {homeGenome.location} ({homeGenome.totalAreaSqFt} sq.ft)</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-white/10">
          <div className="text-center">
            <span className="text-[10px] text-stone-400 font-cinzel block">HOME INTELLIGENCE</span>
            <span className="text-3xl font-cinzel font-black text-gold">{homeGenome.homeIntelligenceScore}</span>
            <span className="text-[9px] text-emerald-400 font-bold block">/ 100 🟢</span>
          </div>
        </div>
      </div>

      {/* 🧠 2. HOME INTELLIGENCE SCORE BREAKDOWN */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "SPACE UTILIZATION", score: homeGenome.dimensionScores.space, icon: "📐", status: "Optimal Circulation" },
          { label: "STYLE HARMONY", score: homeGenome.dimensionScores.style, icon: "👑", status: "Palace Classical" },
          { label: "COMPATIBILITY", score: homeGenome.dimensionScores.compatibility, icon: "🔗", status: "High Synergies" },
          { label: "BUDGET EFFICIENCY", score: homeGenome.dimensionScores.budget, icon: "💰", status: "Value Protected" }
        ].map((item, idx) => (
          <div key={idx} className="palace-card p-5 border border-[#C9A227]/30 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-lg">{item.icon}</span>
              <span className="font-cinzel font-black text-base text-gold">{item.score}%</span>
            </div>
            <div className="font-cinzel font-bold text-stone-200">{item.label}</div>
            <div className="text-[10px] text-emerald-400 font-mono">{item.status}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Hubs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "HOME GENOME", icon: "🧬", sub: "home-genome" },
          { label: "1-CLICK CREATOR", icon: "✨", sub: "create-room" },
          { label: "RELATIONSHIPS", icon: "🔗", sub: "relationships" },
          { label: "SPACE HUNTER", icon: "🧩", sub: "empty-space" },
          { label: "ROOM FLOW", icon: "🚶", sub: "room-flow" },
          { label: "FURNITURE CARE", icon: "🛠️", sub: "furniture-care" }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={() => onNavigate("customer", btn.sub)}
            className="palace-card p-4 border border-[#C9A227]/30 hover:border-[#C9A227] text-center transition flex flex-col items-center justify-center space-y-1 group"
          >
            <span className="text-2xl group-hover:scale-115 transition">{btn.icon}</span>
            <span className="font-cinzel font-bold text-[11px] text-stone-300 group-hover:text-gold">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Rooms Overview & Prevention Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Rooms in Home Genome */}
        <div className="lg:col-span-7 palace-card p-6 border border-[#C9A227]/30 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-cinzel font-bold text-lg text-gold">Home Rooms & Furniture</h3>
            <button onClick={() => onNavigate("customer", "home-genome")} className="text-xs text-champagne font-bold hover:underline">
              View Genome Map 🧬
            </button>
          </div>

          <div className="space-y-3">
            {homeGenome.rooms.map((rm) => (
              <div key={rm.roomId} className="p-4 rounded-2xl bg-black/60 border border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.2 rounded mb-1 inline-block">{rm.roomType}</span>
                  <h4 className="font-cinzel font-bold text-sm text-white">{rm.roomName}</h4>
                  <span className="text-stone-400">{rm.dimensions} • {rm.walkingClearance}</span>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold">{rm.spaceUtilization}% Space Utilized</div>
                  <button onClick={() => onNavigate("customer", "home-genome")} className="text-[10px] text-gold underline mt-1">
                    Inspect Room →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Problem Prevention Alerts */}
        <div className="lg:col-span-5 palace-card p-6 border border-[#C9A227]/30 space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <h3 className="font-cinzel font-bold text-lg text-gold flex items-center gap-1.5">
              <span>🚨</span> Prevention Alerts
            </h3>
            <span className="badge-royal-purple text-[9px] font-bold px-2 py-0.5 rounded">{preventionAlerts.length} Active</span>
          </div>

          <div className="space-y-3">
            {preventionAlerts.slice(0, 2).map((al) => (
              <div key={al.id} className="p-3.5 rounded-xl bg-black/60 border border-amber-500/30 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-amber-300 font-cinzel">{al.icon} {al.title}</span>
                  <span className="badge-royal-gold text-[8px]">{al.level}</span>
                </div>
                <p className="text-stone-300 text-[11px]">{al.item}</p>
                <div className="text-stone-400 text-[10px] pt-1">Action: <strong className="text-white">{al.recommendedAction}</strong></div>
              </div>
            ))}
          </div>

          <button onClick={() => onNavigate("customer", "prevention")} className="btn-royal-outline w-full py-2 text-xs font-bold mt-2">
            Open AI Prevention Center →
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🧬 1. HOME GENOME PAGE (VISUAL HOME MAP & ROOM PROFILES)
// --------------------------------------------------------------------------
function RoyalHomeGenomePage({ homeGenome, products, selectedRoom, onSelectRoom, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="text-center max-w-3xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Architectural Digital Twin
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          MY HOME GENOME
        </h1>
        <p className="text-xs text-stone-300 mt-1 italic">
          “Digital Blueprint of {homeGenome.homeName} ({homeGenome.totalAreaSqFt} sq.ft)”
        </p>
      </div>

      {/* Visual Interactive Home Map Tree */}
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/40 space-y-6">
        <h3 className="font-cinzel font-bold text-center text-gold text-base tracking-widest uppercase">
          RESIDENCE GENOME MAP
        </h3>

        {/* Tree Root: Home */}
        <div className="flex flex-col items-center">
          <div className="px-6 py-3 rounded-2xl bg-[#07142F] border-2 border-[#C9A227] text-center shadow-lg">
            <span className="text-lg">🏛️</span>
            <div className="font-cinzel font-black text-sm text-white">{homeGenome.homeName}</div>
            <span className="text-[10px] text-champagne font-mono">{homeGenome.totalAreaSqFt} sq.ft • Style: {homeGenome.homeStyle}</span>
          </div>

          {/* Stem line */}
          <div className="w-0.5 h-8 bg-[#C9A227]/60"></div>
          <div className="w-3/4 max-w-2xl h-0.5 bg-[#C9A227]/60 relative">
            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[#C9A227]"></div>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C9A227]"></div>
            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#C9A227]"></div>
          </div>
        </div>

        {/* Level 2: Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {homeGenome.rooms.map((rm) => (
            <div
              key={rm.roomId}
              onClick={() => onSelectRoom(rm)}
              className={`palace-card p-5 border cursor-pointer transition flex flex-col justify-between ${
                selectedRoom.roomId === rm.roomId
                  ? "border-[#C9A227] bg-[#07142F]/90 shadow-[0_0_25px_rgba(201,162,39,0.4)]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded">{rm.roomType}</span>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold">{rm.spaceUtilization}% Space</span>
                </div>
                <h4 className="font-cinzel font-bold text-base text-white">{rm.roomName}</h4>
                <p className="text-xs text-stone-400 mt-1">{rm.dimensions}</p>
                <div className="mt-3 text-[11px] text-stone-300 font-sans">
                  Clearance: <strong className="text-white">{rm.walkingClearance}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-stone-400">{rm.furnitureIds.length} Masterpieces</span>
                <span className="text-gold font-bold font-cinzel">Inspect Details →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Room Deep Dive Profile */}
      <div className="palace-card p-8 border border-[#C9A227]/40 space-y-6 text-xs animate-fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-2">
          <div>
            <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded uppercase">Room Genome Detail</span>
            <h3 className="text-2xl font-cinzel font-bold text-white mt-1">{selectedRoom.roomName}</h3>
            <span className="text-stone-400 font-mono">{selectedRoom.dimensions} • Flow Status: {selectedRoom.flowStatus}</span>
          </div>
          <button onClick={() => onNavigate("customer", "empty-space")} className="btn-royal-gold px-4 py-2 text-xs font-bold">
            Hunt Empty Space 🧩
          </button>
        </div>

        {/* Constituent Furniture Pieces */}
        <div>
          <h4 className="font-cinzel font-bold text-sm text-gold mb-3">Room Furniture Collection</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {selectedRoom.furnitureIds.map((fId) => {
              const item = products.find(p => p.id === fId) || products[0];
              return (
                <div key={item.id} className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex gap-3 items-center">
                  <img src={item.images[0]} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-[#C9A227]/30" />
                  <div>
                    <h5 className="font-cinzel font-bold text-white text-xs">{item.name}</h5>
                    <span className="text-[10px] text-stone-400 font-mono">DNA: {item.dnaId}</span>
                    <div className="text-gold font-bold">{formatPrice(item.price)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🕵️ 3. FURNITURE DETECTIVE (VERIFIED PROVENANCE & TIMELINE)
// --------------------------------------------------------------------------
function RoyalFurnitureDetectivePage({ products, orders, onNavigate }) {
  const [searchCode, setSearchCode] = useState("FF-IMPERIAL-10245");
  const [lookupResult, setLookupResult] = useState(products[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    const found = products.find(p => p.passportId.toUpperCase() === clean || p.dnaId.toUpperCase() === clean || p.id.toUpperCase() === clean) || products[0];
    setLookupResult(found);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Provenance & Authenticity Tracer
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          FURNITURE DETECTIVE
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Enter any Furniture DNA, Passport ID, or scan showroom tag to uncover verified provenance.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Enter ID e.g. FF-IMPERIAL-10245 or FF-SF2048"
          className="flex-1 bg-black/60 border border-[#C9A227]/50 rounded-2xl p-3.5 text-white font-mono text-xs focus:ring-1 focus:ring-[#C9A227]"
        />
        <button type="submit" className="btn-royal-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg">
          Investigate 🕵️
        </button>
      </form>

      {/* Verified Provenance Timeline */}
      {lookupResult && (
        <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded">AUTHENTICATED</span>
                <span className="badge-royal-purple text-[9px] font-mono px-2 py-0.5 rounded">DNA: {lookupResult.dnaId}</span>
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-white mt-1">{lookupResult.name}</h3>
              <span className="text-stone-400 font-mono">Passport Code: {lookupResult.passportId}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-400">Authenticity Certificate:</span>
              <div className="text-emerald-400 font-mono font-bold">{lookupResult.authenticityCode}</div>
            </div>
          </div>

          {/* 7-Step Trace Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="font-cinzel font-bold text-sm text-gold">Verified Provenance Pipeline</h4>
            <div className="space-y-3">
              {[
                { stage: "PRODUCT CREATED", date: lookupResult.manufacturingDate, detail: `Handcrafted from seasoned ${lookupResult.material.split(',')[0]} at master facility.` },
                { stage: "QUALITY CHECK", date: "Verified Pass", detail: "Acoustic resonance test, 9.4% timber moisture verification & fluoropolymer seal applied." },
                { stage: "SUPPLIER GUILD", date: lookupResult.supplierName, detail: "Allocated by Guild master with certified timber lot number #LOT-TEAK-88." },
                { stage: "SHOWROOM CUSTODY", date: lookupResult.showroomName, detail: "Transferred under climate-controlled transport." },
                { stage: "PURCHASE CHARTER", date: "Active Commission", detail: "Purchased under verified royal member charter." },
                { stage: "DELIVERY & SETUP", date: "White-Glove Service", detail: "Delivered with in-palace assembly & 10-Yr structural warranty activation." },
                { stage: "CURRENT STATUS", date: "ACTIVE IN RESIDENCE 🟢", detail: `Located in Lotus Palace Villa. Next care check in ${lookupResult.nextRecommendedCheck}.` }
              ].map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#C9A227] text-black font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div>
                      <strong className="text-white font-cinzel">{st.stage}</strong>
                      <p className="text-stone-400 text-[11px]">{st.detail}</p>
                    </div>
                  </div>
                  <span className="text-gold font-mono text-[10px] self-end sm:self-center">{st.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 🔗 5. FURNITURE RELATIONSHIP ENGINE
// --------------------------------------------------------------------------
function RoyalFurnitureRelationshipsPage({ products, onSelectProduct, onAddToCart }) {
  const [selectedPiece, setSelectedPiece] = useState(products[0]);

  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-3xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Interactive Architectural Matrix
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          FURNITURE RELATIONSHIP ENGINE
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Discover compatibility synergies, height alignments, and material harmonies between pieces.
        </p>
      </div>

      {/* Select Source Piece */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPiece(p)}
            className={`px-3.5 py-1.5 rounded-xl font-cinzel font-bold whitespace-nowrap transition border ${
              selectedPiece.id === p.id
                ? "bg-[#C9A227] text-black border-[#C9A227]"
                : "bg-white/5 text-stone-300 border-white/10"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Relationship Network Card */}
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 gap-3">
          <div className="flex gap-4 items-center">
            <img src={selectedPiece.images[0]} alt={selectedPiece.name} className="w-16 h-16 object-cover rounded-2xl border border-[#C9A227]/40" />
            <div>
              <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.2 rounded">SOURCE ANCHOR</span>
              <h3 className="text-xl font-cinzel font-bold text-white mt-0.5">{selectedPiece.name}</h3>
              <span className="text-stone-400">{selectedPiece.dimensions.display} • {formatPrice(selectedPiece.price)}</span>
            </div>
          </div>
        </div>

        {/* 🪑 4. FURNITURE PERSONALITY RADAR BARS */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
          <h4 className="font-cinzel font-bold text-sm text-gold flex items-center gap-1.5">
            <span>🪑</span> FURNITURE PERSONALITY VECTOR
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {Object.entries(selectedPiece.personality || { elegant: 95, luxury: 95, classic: 85, modern: 80, minimal: 50 }).map(([trait, score]) => (
              <div key={trait} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase text-stone-400 font-cinzel block">{trait}</span>
                <strong className="text-sm font-cinzel text-gold">{score}%</strong>
                <div className="w-full h-1 bg-black rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#C9A227]" style={{ width: `${score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compatible Companion Network */}
        <div className="space-y-4">
          <h4 className="font-cinzel font-bold text-sm text-gold">Companion Synergies</h4>
          <div className="space-y-3">
            {selectedPiece.relationships?.map((rel) => {
              const target = products.find(p => p.id === rel.targetId);
              return (
                <div key={rel.targetId} className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-white font-cinzel text-sm">{rel.targetName}</strong>
                      <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.2 rounded">
                        COMPATIBILITY: {rel.compatibility}%
                      </span>
                    </div>
                    <p className="text-stone-300 text-[11px] mt-1 font-sans">{rel.reason}</p>
                  </div>
                  {target && (
                    <div className="flex gap-2 self-end sm:self-center">
                      <button onClick={() => onSelectProduct(target)} className="btn-royal-outline px-3 py-1.5 text-[10px] font-bold">
                        Inspect Piece
                      </button>
                      <button onClick={() => onAddToCart(target)} className="btn-royal-gold px-3 py-1.5 text-[10px] font-bold">
                        + Add Synergy Pair
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🧩 6. EMPTY SPACE HUNTER
// --------------------------------------------------------------------------
function RoyalEmptySpaceHunterPage({ homeGenome, products, onAddToCart, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-3xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Spatial Opportunity Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          EMPTY SPACE HUNTER
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Discover underutilized zones across your residence and unlock spatial potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeGenome.rooms.flatMap(r => r.emptySpaceOpportunities.map(opp => ({ ...opp, roomName: r.roomName }))).map((opp, idx) => {
          const recProd = products.find(p => p.id === opp.recommendedProductId) || products[4];
          return (
            <div key={idx} className="palace-card-elevated p-6 rounded-3xl border border-[#C9A227]/40 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded">{opp.roomName}</span>
                  <span className="text-gold font-mono">{opp.dimensions}</span>
                </div>
                <h3 className="font-cinzel font-bold text-base text-white">{opp.zone}</h3>
                
                <div className="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Current Space Utilization:</span>
                    <strong className="text-white">{opp.utilizationBefore}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Potential with Curation:</span>
                    <strong className="text-emerald-400 font-bold">{opp.utilizationPotential}% (↑ +{opp.utilizationPotential - opp.utilizationBefore}%)</strong>
                  </div>
                </div>

                <p className="text-stone-300 text-[11px] pt-1 font-sans">
                  Recommended Piece: <strong className="text-champagne font-cinzel">{recProd.name}</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-gold font-bold font-serif text-sm">{formatPrice(recProd.price)}</span>
                <button onClick={() => onAddToCart(recProd)} className="btn-royal-gold px-4 py-2 text-xs font-bold uppercase">
                  Add to Room →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🚶 7. ROOM FLOW INTELLIGENCE
// --------------------------------------------------------------------------
function RoyalRoomFlowPage({ homeGenome, onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Circulation & Walking Density
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          ROOM FLOW INTELLIGENCE
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Spatial analysis ensuring generous walkways, zero bottleneck pinch points, and graceful palace circulation.
        </p>
      </div>

      <div className="space-y-6">
        {homeGenome.rooms.map((rm) => (
          <div key={rm.roomId} className="palace-card-elevated p-6 rounded-3xl border border-[#C9A227]/40 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded">{rm.roomType}</span>
                <h3 className="text-xl font-cinzel font-bold text-white mt-0.5">{rm.roomName}</h3>
              </div>
              <span className="badge-royal-purple text-xs font-bold px-3 py-1 rounded">{rm.flowStatus}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                <span className="text-stone-400 block text-[10px]">Walking Corridor</span>
                <strong className="text-emerald-400 font-bold">{rm.walkingClearance}</strong>
              </div>
              <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                <span className="text-stone-400 block text-[10px]">Furniture Density</span>
                <strong className="text-white font-bold">{rm.spaceUtilization}% (Optimal)</strong>
              </div>
              <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                <span className="text-stone-400 block text-[10px]">Open Zones</span>
                <strong className="text-champagne font-bold">{100 - rm.spaceUtilization}% Free Floor</strong>
              </div>
              <div className="p-3 bg-black/60 rounded-xl border border-white/5">
                <span className="text-stone-400 block text-[10px]">Pinch Points</span>
                <strong className="text-emerald-400 font-bold">0 Detected 🟢</strong>
              </div>
            </div>

            <p className="text-stone-300 text-[11px] leading-relaxed">
              Design Insight: The placement of central anchor seating leaves a perimeter corridor exceeding the 3.5ft luxury threshold, permitting fluid banquet hosting and conversational movement.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🚪 8. DELIVERY ACCESS INTELLIGENCE (CAN IT REACH MY ROOM?)
// --------------------------------------------------------------------------
function RoyalDeliveryAccessPage({ products, onNavigate }) {
  const [selectedProd, setSelectedProd] = useState(products[0]);
  const [doorWidth, setDoorWidth] = useState(36);
  const [doorHeight, setDoorHeight] = useState(80);
  const [stairWidth, setStairWidth] = useState(42);
  const [liftWidth, setLiftWidth] = useState(48);

  const checkAccess = useMemo(() => {
    const fW = selectedProd.dimensions.widthInches;
    const fH = selectedProd.dimensions.heightInches;
    
    // If piece width is wider than door width but height or diagonal allows pivot
    if (doorWidth >= fW) return { status: "GOOD 🟢", note: "Direct horizontal clearance available through all primary entryways." };
    if (doorWidth >= fH) return { status: "GOOD (PIVOT) 🟢", note: "Requires standard 90° vertical rotation on uncrating." };
    return { status: "CHECK REQUIRED 🟡", note: `Doorway width (${doorWidth}") is narrower than sofa profile (${fW}"). White-glove artisan detachable leg kit recommended.` };
  }, [selectedProd, doorWidth, doorHeight, stairWidth, liftWidth]);

  return (
    <div className="max-w-3xl mx-auto palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6 animate-fade-up text-xs">
      <div className="text-center">
        <span className="badge-royal-gold text-[10px] uppercase font-bold px-3 py-0.5 rounded-full inline-block mb-1">
          Dimensional Clearance Check
        </span>
        <h1 className="text-3xl font-cinzel font-bold text-gold-gradient">CAN IT REACH MY ROOM?</h1>
        <p className="text-stone-300 mt-1 italic">Verify hallway, elevator, and doorway tolerances prior to white-glove dispatch.</p>
      </div>

      <div>
        <label className="font-cinzel text-stone-300 block mb-1">Select Piece to Test:</label>
        <select
          value={selectedProd.id}
          onChange={(e) => {
            const f = products.find(p => p.id === e.target.value);
            if (f) setSelectedProd(f);
          }}
          className="w-full bg-[#07142F] border border-[#C9A227]/40 rounded-xl p-3 text-white font-bold"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.dimensions.display})</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="font-cinzel text-stone-400 block mb-1">Door Width (in):</label>
          <input type="number" value={doorWidth} onChange={(e) => setDoorWidth(Number(e.target.value))} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
        </div>
        <div>
          <label className="font-cinzel text-stone-400 block mb-1">Door Height (in):</label>
          <input type="number" value={doorHeight} onChange={(e) => setDoorHeight(Number(e.target.value))} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
        </div>
        <div>
          <label className="font-cinzel text-stone-400 block mb-1">Stair Width (in):</label>
          <input type="number" value={stairWidth} onChange={(e) => setStairWidth(Number(e.target.value))} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
        </div>
        <div>
          <label className="font-cinzel text-stone-400 block mb-1">Lift Width (in):</label>
          <input type="number" value={liftWidth} onChange={(e) => setLiftWidth(Number(e.target.value))} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
        </div>
      </div>

      {/* Result */}
      <div className="p-4 rounded-2xl bg-[#07142F] border border-[#C9A227]/40 space-y-2">
        <div className="flex justify-between items-center">
          <strong className="font-cinzel text-gold text-sm">ACCESS PLANNING RESULT:</strong>
          <span className="badge-royal-gold text-xs font-bold px-3 py-1 rounded">{checkAccess.status}</span>
        </div>
        <p className="text-stone-300 font-sans">{checkAccess.note}</p>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🔮 9. ROOM FUTURE SIMULATOR (FUTURE ROOM)
// --------------------------------------------------------------------------
function RoyalFutureRoomPage({ homeGenome, products, onAddToCart }) {
  const [horizon, setHorizon] = useState("1 Year");

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Evolutionary Living Matrix
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          FUTURE ROOM SIMULATOR
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Simulate how your room setup gracefully expands over time.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {["1 Year", "3 Years", "5 Years"].map((h) => (
          <button
            key={h}
            onClick={() => setHorizon(h)}
            className={`px-6 py-2.5 rounded-xl font-cinzel font-bold transition ${
              horizon === h ? "bg-[#C9A227] text-black shadow-lg" : "bg-white/5 text-stone-300 border border-white/10"
            }`}
          >
            Horizon: {h}
          </button>
        ))}
      </div>

      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-xl font-cinzel font-bold text-white">Grand Royal Salon — {horizon} Vision</h3>
          <span className="badge-royal-purple text-[9px] font-bold px-2 py-0.5 rounded">AI CONCEPT SIMULATION</span>
        </div>

        {horizon === "1 Year" && (
          <div className="space-y-3">
            <p className="text-stone-300">Phase 1 Enhancement: Integrate companion ambient sconces and a matched bouclé ottoman for reading comfort.</p>
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <strong className="text-gold font-cinzel block">Bouclé Ottoman Companion + Ambient Sconce Pair</strong>
                <span className="text-stone-400">Estimated Investment: ₹18,500</span>
              </div>
              <button onClick={() => onAddToCart(products[4])} className="btn-royal-gold px-3 py-1.5 text-[10px] font-bold">
                Reserve Additions
              </button>
            </div>
          </div>
        )}

        {horizon === "3 Years" && (
          <div className="space-y-3">
            <p className="text-stone-300">Phase 2 Enhancement: Extend seating into a 7-Seater Modular salon configuration with matching teak console sideboards.</p>
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <strong className="text-gold font-cinzel block">7-Seater Modular Expansion Pack</strong>
                <span className="text-stone-400">Estimated Investment: ₹42,000</span>
              </div>
              <button onClick={() => onAddToCart(products[0])} className="btn-royal-gold px-3 py-1.5 text-[10px] font-bold">
                Explore Expansion
              </button>
            </div>
          </div>
        )}

        {horizon === "5 Years" && (
          <div className="space-y-3">
            <p className="text-stone-300">Phase 3 Lifetime Refresh: Second Life organic beeswax nourishment polish, high-density comfort core upgrade, and warranty extension.</p>
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 flex justify-between items-center">
              <div>
                <strong className="text-gold font-cinzel block">Master Conservator Lifetime Refresh Package</strong>
                <span className="text-stone-400">Estimated Investment: ₹24,000</span>
              </div>
              <button onClick={() => onAddToCart(products[1])} className="btn-royal-gold px-3 py-1.5 text-[10px] font-bold">
                Schedule Refresh
              </button>
            </div>
          </div>
        )}

        <div className="text-[10px] text-stone-500 italic pt-2">
          * AI DESIGN CONCEPT — NOT A GUARANTEED FUTURE PREDICTION.
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🛋️ 10. ONE-CLICK ROOM CREATOR (✨ CREATE MY ROOM)
// --------------------------------------------------------------------------
function RoyalOneClickRoomCreatorPage({ products, onAddCompleteRoomSet }) {
  const [roomType, setRoomType] = useState("Living Room");
  const [budget, setBudget] = useState(150000);
  const [style, setStyle] = useState("Royal Velvet & Gold");

  const roomSet = useMemo(() => {
    return [products[0], products[5], products[4]]; // Sofa + Marble Table + Armchair
  }, [products]);

  const totalCost = roomSet.reduce((s, i) => s + i.price, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Instant Suite Generation
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          ✨ CREATE MY ROOM
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Generate an architecturally unified complete room suite in one single click.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="font-cinzel text-stone-300 block mb-1">Room Type:</label>
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full bg-[#07142F] border border-white/20 rounded-xl p-2.5 text-white">
            <option value="Living Room">Grand Living Room</option>
            <option value="Dining">Imperial Dining Hall</option>
            <option value="Bedroom">Master Suite</option>
          </select>
        </div>
        <div>
          <label className="font-cinzel text-stone-300 block mb-1">Budget Allocation:</label>
          <select value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full bg-[#07142F] border border-white/20 rounded-xl p-2.5 text-white">
            <option value={100000}>₹1,00,000</option>
            <option value={175000}>₹1,75,000</option>
            <option value={250000}>₹2,50,000</option>
          </select>
        </div>
        <div>
          <label className="font-cinzel text-stone-300 block mb-1">Style Direction:</label>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-[#07142F] border border-white/20 rounded-xl p-2.5 text-white">
            <option value="Royal Velvet & Gold">Royal Velvet & Gold</option>
            <option value="Classic Teak">Classic Nilambur Teak</option>
            <option value="Modern Palace">Modern Palace Bouclé</option>
          </select>
        </div>
      </div>

      {/* Generated Room Proposal */}
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div>
            <span className="badge-royal-gold text-[9px] font-bold px-2 py-0.5 rounded">AUTONOMOUS CURATION</span>
            <h3 className="text-2xl font-cinzel font-bold text-white mt-0.5">THE IMPERIAL SALON SUITE</h3>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 font-bold font-mono">ROOM MATCH: 96%</div>
            <span className="text-stone-400">Budget Remaining: {formatPrice(Math.max(0, budget - totalCost))}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roomSet.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2 text-center">
              <img src={item.images[0]} alt={item.name} className="w-full h-32 object-cover rounded-xl" />
              <h4 className="font-cinzel font-bold text-white text-xs">{item.name}</h4>
              <div className="text-gold font-bold">{formatPrice(item.price)}</div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-stone-400 text-xs">Total Complete Room Suite:</span>
            <div className="text-2xl font-cinzel font-black text-gold">{formatPrice(totalCost)}</div>
          </div>
          <button onClick={() => onAddCompleteRoomSet(roomSet)} className="btn-royal-gold px-8 py-4 text-xs font-bold uppercase tracking-widest shadow-2xl">
            ADD COMPLETE ROOM TO CART ✨
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🎨 11. COLOR HARMONY ENGINE (COLOR INTELLIGENCE)
// --------------------------------------------------------------------------
function RoyalColorIntelligencePage({ products, onSelectProduct, onAddToCart }) {
  const [wallColor, setWallColor] = useState("Ivory White");
  const [floorColor, setFloorColor] = useState("Italian Carrara");

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Chromatic Harmony Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          COLOR INTELLIGENCE
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Align furniture fabrics and timber grains to your residence wall and marble flooring colors.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-cinzel text-stone-300 block mb-1">Wall Palette:</label>
          <select value={wallColor} onChange={(e) => setWallColor(e.target.value)} className="w-full bg-[#07142F] border border-white/20 rounded-xl p-2.5 text-white">
            <option value="Ivory White">Palace Ivory White</option>
            <option value="Warm Sand">Warm Sandstone</option>
            <option value="Deep Navy">Deep Royal Navy</option>
          </select>
        </div>
        <div>
          <label className="font-cinzel text-stone-300 block mb-1">Flooring Texture:</label>
          <select value={floorColor} onChange={(e) => setFloorColor(e.target.value)} className="w-full bg-[#07142F] border border-white/20 rounded-xl p-2.5 text-white">
            <option value="Italian Carrara">Italian Carrara White Marble</option>
            <option value="Teak Parquet">Kiln-Dried Teak Parquet</option>
            <option value="Travertine">Roman Travertine</option>
          </select>
        </div>
      </div>

      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-4">
        <h3 className="font-cinzel font-bold text-gold text-base">RECOMMENDED PALACE PALETTE</h3>
        <div className="flex gap-4 items-center">
          <div className="flex-1 p-4 rounded-xl bg-[#07142F] text-white border border-[#C9A227]/40 text-center font-bold font-cinzel">
            Primary: Royal Navy
          </div>
          <div className="flex-1 p-4 rounded-xl bg-[#5C3A21] text-white border border-[#C9A227]/40 text-center font-bold font-cinzel">
            Secondary: Walnut Teak
          </div>
          <div className="flex-1 p-4 rounded-xl bg-[#C9A227] text-black border border-white/40 text-center font-black font-cinzel">
            Accent: Champagne Gold
          </div>
        </div>

        <h4 className="font-cinzel font-bold text-white text-sm pt-4">Harmonized Furniture Pieces:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.slice(0, 2).map((p) => (
            <div key={p.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex justify-between items-center">
              <div>
                <h5 className="font-cinzel font-bold text-white">{p.name}</h5>
                <span className="text-stone-400">{p.color} • {p.material.split(',')[0]}</span>
              </div>
              <button onClick={() => onAddToCart(p)} className="btn-royal-gold px-3 py-1 text-[10px] font-bold">
                + Add Piece
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🚨 12. PROBLEM PREVENTION CENTER
// --------------------------------------------------------------------------
function RoyalPreventionCenterPage({ alerts, onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Proactive Risk Intelligence
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          AI PREVENTION CENTER
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Preempting stock bottlenecks, logistics delays, and dimensional conflicts before they manifest.
        </p>
      </div>

      <div className="space-y-4">
        {alerts.map((al) => (
          <div key={al.id} className="palace-card-elevated p-6 rounded-3xl border border-[#C9A227]/40 space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{al.icon}</span>
                <div>
                  <span className="badge-royal-gold text-[8px] font-bold px-2 py-0.2 rounded uppercase">{al.type}</span>
                  <h3 className="font-cinzel font-bold text-base text-white">{al.title}</h3>
                </div>
              </div>
              <span className="badge-royal-purple text-xs font-bold px-3 py-1 rounded">LEVEL: {al.level}</span>
            </div>

            <div className="p-3 bg-black/60 rounded-xl space-y-1">
              <span className="text-stone-400 font-cinzel block">ROOT CAUSE / WHY:</span>
              <p className="text-stone-200">{al.why}</p>
            </div>

            <div className="p-3 bg-[#07142F] rounded-xl border border-emerald-500/30 flex justify-between items-center">
              <div>
                <span className="text-emerald-400 font-cinzel font-bold block">RECOMMENDED ACTION:</span>
                <p className="text-white">{al.recommendedAction}</p>
              </div>
              <button onClick={() => showToast(`Executing action for ${al.title}`)} className="btn-royal-gold px-3 py-1.5 text-[10px] font-bold whitespace-nowrap">
                Execute Action →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🏆 16. ROYAL ACHIEVEMENTS
// --------------------------------------------------------------------------
function RoyalAchievementsPage({ achievements, user, onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Ecosystem Rewards & Badges
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          ROYAL ACHIEVEMENTS
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Earn Royal Points, unlock palace badges, and advance your Royal Circle tier.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className={`palace-card p-6 border rounded-3xl space-y-3 text-center flex flex-col justify-between ${
            ach.unlocked ? "border-[#C9A227] bg-[#07142F]/80" : "border-white/10 opacity-60"
          }`}>
            <div>
              <span className="text-4xl block mb-2">{ach.icon}</span>
              <h3 className="font-cinzel font-bold text-base text-white">{ach.title}</h3>
              <p className="text-stone-300 text-[11px] mt-1">{ach.desc}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-gold font-bold">+{ach.points} Royal Points</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ach.unlocked ? 'bg-emerald-900 text-emerald-300' : 'bg-stone-800 text-stone-500'}`}>
                {ach.unlocked ? "UNLOCKED ✓" : "LOCKED 🔒"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🌱 17. SECOND LIFE CENTER
// --------------------------------------------------------------------------
function RoyalSecondLifePage({ products, onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Circular Sustainable Luxury
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          GIVE YOUR FURNITURE A SECOND LIFE
        </h1>
        <p className="text-stone-300 mt-1 italic">
          Cradle-to-cradle sustainability: Repair, Refurbish, Reuse, Resale, and Recycle with certified master conservators.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: "REPAIR", icon: "🛠️", desc: "Joint re-tensioning, spring calibration & mortise restoration." },
          { title: "REFURBISH", icon: "✨", desc: "Organic beeswax polish & premium upholstery re-wrapping." },
          { title: "REUSE", icon: "🔄", desc: "Reassign pieces to another room with new fabric wraps." },
          { title: "RESALE", icon: "🏷️", desc: "Palace trade-in valuation toward new commissions." },
          { title: "RECYCLE", icon: "🌱", desc: "100% sustainable timber & brass reclamation program." }
        ].map((item, i) => (
          <div key={i} className="palace-card p-5 border border-[#C9A227]/30 text-center space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-3xl block mb-1">{item.icon}</span>
              <h3 className="font-cinzel font-bold text-sm text-gold">{item.title}</h3>
              <p className="text-stone-300 text-[10px] leading-relaxed mt-1">{item.desc}</p>
            </div>
            <button onClick={() => showToast(`Initiated ${item.title} request.`)} className="btn-royal-gold w-full py-1.5 text-[9px] font-bold mt-2">
              Request Service →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🏬 19. SHOWROOM PORTAL & DESIGN STUDIO
// --------------------------------------------------------------------------
function RoyalShowroomPortal({ activeSubpage, onNavigate, showroom, showrooms, onSelectShowroom, products, orders, savedQuotations, onSaveQuotation, onUpdateOrderStatus, onOpenQRModal }) {
  const [quotationCustomer, setQuotationCustomer] = useState("Maharaja S. Verma");
  const [selectedProdIds, setSelectedProdIds] = useState(["ff-101", "ff-102"]);
  const [discountPercent, setDiscountPercent] = useState(10);

  const selectedItems = products.filter(p => selectedProdIds.includes(p.id));
  const subtotal = selectedItems.reduce((s, i) => s + i.price, 0);
  const discountVal = Math.round((subtotal * discountPercent) / 100);
  const taxVal = Math.round((subtotal - discountVal) * 0.05);
  const quoteTotal = subtotal - discountVal + taxVal;

  const handleGenerateQuote = () => {
    const newQ = {
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: quotationCustomer,
      items: selectedItems.map(i => ({ name: i.name, qty: 1, price: i.price })),
      discountPercent,
      tax: taxVal,
      delivery: 0,
      total: quoteTotal,
      date: "Today",
      status: "Draft Generated"
    };
    onSaveQuotation(newQ);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-up text-xs">
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="badge-royal-gold text-[10px] font-bold px-3 py-0.5 rounded-full">SHOWROOM COMMAND CENTER</span>
          <h1 className="text-3xl font-cinzel font-bold text-white mt-1">{showroom.name}</h1>
          <p className="text-stone-400">{showroom.location} • Manager: {showroom.manager}</p>
        </div>
        <select
          value={showroom.id}
          onChange={(e) => {
            const f = showrooms.find(s => s.id === e.target.value);
            if (f) onSelectShowroom(f);
          }}
          className="bg-[#07142F] border border-[#C9A227]/40 rounded-xl p-2.5 text-white font-bold"
        >
          {showrooms.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
      </div>

      {/* Showroom Design Studio & Quotation Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 palace-card p-6 border border-[#C9A227]/40 space-y-4">
          <h3 className="font-cinzel font-bold text-base text-gold">Showroom Design Studio & Quotation Builder</h3>
          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Customer Name:</label>
            <input type="text" value={quotationCustomer} onChange={(e) => setQuotationCustomer(e.target.value)} className="w-full bg-black/60 border border-white/20 rounded-xl p-2.5 text-white" />
          </div>

          <div>
            <label className="font-cinzel text-stone-300 block mb-1">Select Pieces for Blueprint:</label>
            <div className="grid grid-cols-2 gap-2">
              {products.map((p) => (
                <label key={p.id} className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProdIds.includes(p.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedProdIds([...selectedProdIds, p.id]);
                      else setSelectedProdIds(selectedProdIds.filter(id => id !== p.id));
                    }}
                    className="accent-[#C9A227]"
                  />
                  <span className="text-white text-[11px] truncate">{p.name} ({formatPrice(p.price)})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="text-stone-400">Privilege Discount (%):</span>
              <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-20 bg-black/60 border border-white/20 rounded-lg p-1 text-white ml-2" />
            </div>
            <button onClick={handleGenerateQuote} className="btn-royal-gold px-4 py-2 font-bold uppercase">
              Generate Formal Quotation 🧾
            </button>
          </div>
        </div>

        {/* Generated Quotation Output */}
        <div className="lg:col-span-5 palace-card-elevated p-6 rounded-3xl border border-[#C9A227]/40 space-y-4">
          <h3 className="font-cinzel font-bold text-base text-gold">FRIENDS FURNITURE QUOTATION</h3>
          <div className="p-4 bg-black/60 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between font-bold text-white">
              <span>Client: {quotationCustomer}</span>
              <span className="text-gold font-mono">QT-LIVE</span>
            </div>
            <div className="space-y-1 pt-2 border-t border-white/10">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between text-stone-300">
                  <span>{item.name}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 space-y-1">
              <div className="flex justify-between text-stone-400"><span>Subtotal:</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-emerald-400"><span>Discount ({discountPercent}%):</span><span>- {formatPrice(discountVal)}</span></div>
              <div className="flex justify-between text-stone-400"><span>GST (5%):</span><span>+ {formatPrice(taxVal)}</span></div>
              <div className="flex justify-between text-base font-bold text-gold pt-2 border-t border-white/10">
                <span>Grand Total:</span><span>{formatPrice(quoteTotal)}</span>
              </div>
            </div>
          </div>
          <button onClick={() => showToast(`Quotation sent to ${quotationCustomer} via WhatsApp & Email!`)} className="btn-royal-gold w-full py-3 font-bold uppercase">
            Send Quotation to Client 📲
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🏭 20. SUPPLIER PORTAL & INTELLIGENCE
// --------------------------------------------------------------------------
function RoyalSupplierPortal({ activeSubpage, onNavigate, supplier, suppliers, onSelectSupplier, products, orders, onUpdateStage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-up text-xs">
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <span className="badge-royal-gold text-[10px] font-bold px-3 py-0.5 rounded-full">SUPPLIER COMMAND CENTER</span>
          <h1 className="text-3xl font-cinzel font-bold text-white mt-1">{supplier.name}</h1>
          <p className="text-stone-400">{supplier.location} • Contact: {supplier.contactPerson}</p>
        </div>
        <select
          value={supplier.id}
          onChange={(e) => {
            const f = suppliers.find(s => s.id === e.target.value);
            if (f) onSelectSupplier(f);
          }}
          className="bg-[#07142F] border border-[#C9A227]/40 rounded-xl p-2.5 text-white font-bold"
        >
          {suppliers.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
      </div>

      {/* Supplier Health Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="palace-card p-5 border border-[#C9A227]/30 text-center">
          <span className="text-stone-400 font-cinzel block text-[10px]">SUPPLIER TRUST SCORE</span>
          <span className="text-3xl font-cinzel font-black text-gold">{supplier.trustScore}</span>
          <span className="text-emerald-400 text-[10px] font-bold block">/ 100 🟢</span>
        </div>
        <div className="palace-card p-5 border border-[#C9A227]/30 text-center">
          <span className="text-stone-400 font-cinzel block text-[10px]">ON-TIME DELIVERY</span>
          <span className="text-2xl font-cinzel font-bold text-white">{supplier.metrics.onTimeDelivery}</span>
        </div>
        <div className="palace-card p-5 border border-[#C9A227]/30 text-center">
          <span className="text-stone-400 font-cinzel block text-[10px]">PRODUCT QUALITY</span>
          <span className="text-2xl font-cinzel font-bold text-white">{supplier.metrics.productQuality}</span>
        </div>
        <div className="palace-card p-5 border border-[#C9A227]/30 text-center">
          <span className="text-stone-400 font-cinzel block text-[10px]">MONTHLY CAPACITY</span>
          <span className="text-2xl font-cinzel font-bold text-gold">{supplier.capacity}</span>
        </div>
      </div>

      {/* Production Stage Updater */}
      <div className="palace-card p-6 border border-[#C9A227]/40 space-y-4">
        <h3 className="font-cinzel font-bold text-base text-gold">Active Commission Orders & Stage Control</h3>
        {orders.map((ord) => (
          <div key={ord.orderId} className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="font-mono text-gold font-bold">{ord.orderId}</span>
              <h4 className="font-cinzel font-bold text-white text-sm">{ord.productName}</h4>
              <span className="text-stone-400">Current Stage: <strong className="text-emerald-400">{ord.currentStage}</strong></span>
            </div>
            <div className="flex gap-2">
              {["Crafting", "Quality Inspection", "Dispatched"].map((st, idx) => (
                <button
                  key={st}
                  onClick={() => onUpdateStage(ord.orderId, st, idx + 2)}
                  className="btn-royal-outline px-3 py-1.5 text-[10px] font-bold"
                >
                  Set: {st}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 👨💼 18. ADMIN CONTROL CENTER & IMPERIAL HOME INTELLIGENCE
// --------------------------------------------------------------------------
function RoyalAdminPortal({ activeSubpage, onNavigate, products, setProducts, showrooms, suppliers, customers, orders, coupons, demandForecasts, homeGenome, preventionAlerts }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-up text-xs">
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 flex justify-between items-center">
        <div>
          <span className="badge-royal-gold text-[10px] font-bold px-3 py-0.5 rounded-full">IMPERIAL COMMAND CENTER</span>
          <h1 className="text-3xl font-cinzel font-bold text-white mt-1">IMPERIAL HOME INTELLIGENCE</h1>
          <p className="text-stone-400">Global multi-role ecosystem monitoring across {customers.length} estates and {suppliers.length} guild partners.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "TOTAL ESTATES", val: "1,420 Homes", icon: "🏛️" },
          { label: "DNA CERTIFICATES", val: "8,940 Minted", icon: "🧬" },
          { label: "ACTIVE DELIVERIES", val: "48 In Transit", icon: "🚚" },
          { label: "PREVENTION ALERTS", val: `${preventionAlerts.length} Actionable`, icon: "🚨" }
        ].map((kpi, i) => (
          <div key={i} className="palace-card p-5 border border-[#C9A227]/30 text-center space-y-1">
            <span className="text-xl">{kpi.icon}</span>
            <div className="text-xl font-cinzel font-black text-gold">{kpi.val}</div>
            <div className="text-[10px] text-stone-400 font-cinzel">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Global Inventory Command Table with Alerts */}
      <div className="palace-card p-6 border border-[#C9A227]/40 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-cinzel font-bold text-base text-gold">Palace Vault Inventory Command</h3>
          <span className="badge-royal-purple text-[9px] font-bold px-2 py-0.5 rounded">Autonomous Stock Intelligence</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-stone-400 font-cinzel border-b border-white/10">
              <tr>
                <th className="p-3">Masterpiece</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Supplier Guild</th>
                <th className="p-3">Vault Stock</th>
                <th className="p-3">Reorder Threshold</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-bold text-white">{p.name}</td>
                  <td className="p-3 font-mono text-stone-400">{p.sku}</td>
                  <td className="p-3 text-stone-300">{p.supplierName}</td>
                  <td className="p-3 font-bold text-gold">{p.stock} Units</td>
                  <td className="p-3 font-mono text-stone-400">{p.minStockThreshold} Units</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.stock <= p.minStockThreshold ? "bg-rose-900 text-rose-200 border border-rose-500" : "bg-emerald-900 text-emerald-200"
                    }`}>
                      {p.stock <= p.minStockThreshold ? "ROYAL INVENTORY ALERT ⚠️" : "Adequate Reserve 🟢"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 🤖 8. AI DELIVERY PREDICTOR & WHAT-IF SIMULATOR SUITE
// --------------------------------------------------------------------------
function RoyalAIDeliveryPredictorSuite({ activeSubpage, onNavigate, orders, suppliers, products }) {
  const [delayDays, setDelayDays] = useState(0);
  const [stockLevel, setStockLevel] = useState("High");

  const simulatedEstimate = useMemo(() => {
    const baseMin = 5 + delayDays;
    const baseMax = 7 + delayDays;
    return `${baseMin}–${baseMax} DAYS`;
  }, [delayDays, stockLevel]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-up text-xs">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-1 rounded-full inline-block mb-1">
          Predictive Logistics Neural Suite
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          AI DELIVERY PREDICTOR
        </h1>
        <p className="text-stone-300 mt-1 italic">“Predict delays before they happen.”</p>
      </div>

      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-black/60 rounded-2xl border border-white/10">
            <span className="text-stone-400 font-cinzel block text-[10px]">AI ESTIMATED DELIVERY</span>
            <strong className="text-2xl font-cinzel text-gold">{simulatedEstimate}</strong>
          </div>
          <div className="p-4 bg-black/60 rounded-2xl border border-white/10">
            <span className="text-stone-400 font-cinzel block text-[10px]">DELAY RISK</span>
            <strong className="text-2xl font-cinzel text-emerald-400">{delayDays > 2 ? "MEDIUM 🟡" : "LOW 🟢"}</strong>
          </div>
          <div className="p-4 bg-black/60 rounded-2xl border border-white/10">
            <span className="text-stone-400 font-cinzel block text-[10px]">AI CONFIDENCE</span>
            <strong className="text-2xl font-cinzel text-champagne">93%</strong>
          </div>
        </div>

        {/* 🚚 14. WHAT-IF DELIVERY SCENARIO SIMULATOR */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
          <h4 className="font-cinzel font-bold text-sm text-gold">WHAT-IF SCENARIO SIMULATOR</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Normal Transit (+0d)", val: 0 },
              { label: "Supplier Delay (+2d)", val: 2 },
              { label: "Monsoon Corridor (+3d)", val: 3 },
              { label: "Festive Peak (+4d)", val: 4 }
            ].map((sc) => (
              <button
                key={sc.label}
                onClick={() => setDelayDays(sc.val)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                  delayDays === sc.val ? "bg-[#C9A227] text-black border-[#C9A227]" : "bg-white/5 text-stone-300 border-white/10"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-stone-500 italic">
            * SIMULATED ESTIMATE — Based on machine learning regression of highway telemetry.
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// (Supporting Core Components: Cards, Details, Cart, Checkout, Tracking, Care, Expert Chat, Notifications, Footer)
// --------------------------------------------------------------------------
function LuxuryProductCard({ product, onSelect, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <div className="palace-card overflow-hidden group flex flex-col justify-between border border-[#C9A227]/30 relative">
      <div className="relative aspect-[4/3] bg-black/50 overflow-hidden cursor-pointer" onClick={onSelect}>
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
          <span className="badge-royal-gold text-[9px] font-cinzel font-bold px-2.5 py-0.5 rounded-full">
            {product.collectionName}
          </span>
          <span className="badge-royal-purple text-[9px] font-bold px-2 py-0.5 rounded-full">
            {product.discount}% PRIVILEGE
          </span>
        </div>

        <div className="absolute bottom-3.5 right-3.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/50 text-[10px] font-bold text-emerald-300">
          ROOM MATCH: {product.roomMatchScore}%
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition shadow ${
            isWishlisted ? "bg-[#C9A227] text-black" : "bg-black/60 hover:bg-black text-white border border-white/20"
          }`}
        >
          <span>{isWishlisted ? "❤️" : "🤍"}</span>
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] uppercase font-cinzel font-bold text-gold tracking-widest">{product.category}</span>
            <div className="flex items-center text-amber-400 font-bold text-xs">
              <span>★</span><span className="ml-1 text-white">{product.rating}</span>
            </div>
          </div>
          <h3 onClick={onSelect} className="font-cinzel font-bold text-base text-white hover:text-gold transition cursor-pointer line-clamp-1">{product.name}</h3>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed font-sans">{product.shortDescription}</p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#C9A227]/20 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-gold">{formatPrice(product.price)}</div>
            <div className="text-[11px] text-stone-500 line-through">{formatPrice(product.originalPrice)}</div>
          </div>
          <button onClick={onAddToCart} className="btn-royal-gold px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

function RoyalSmartShopPage({ products, totalCount, selectedCategoryTab, setSelectedCategoryTab, onSelectProduct, onAddToCart, onToggleWishlist, wishlist }) {
  const categories = ["All", "Living Room", "Bedroom", "Dining", "Office", "Kids", "Outdoor", "Storage", "Home Décor"];

  const filtered = useMemo(() => {
    if (selectedCategoryTab === "All") return products;
    return products.filter((p) => p.category.toLowerCase() === selectedCategoryTab.toLowerCase());
  }, [products, selectedCategoryTab]);

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="text-center max-w-2xl mx-auto">
        <span className="badge-royal-gold text-xs uppercase tracking-widest font-bold px-4 py-1 rounded-full inline-block mb-2">
          Master Artisan Catalogue
        </span>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-gold-gradient">
          FURNITURE MARKETPLACE
        </h1>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategoryTab(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition border ${
              selectedCategoryTab === c ? "bg-[#C9A227] text-black border-[#C9A227]" : "bg-white/5 text-stone-300 border-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <LuxuryProductCard key={p.id} product={p} onSelect={() => onSelectProduct(p)} onAddToCart={() => onAddToCart(p)} onToggleWishlist={() => onToggleWishlist(p.id, p.name)} isWishlisted={wishlist.includes(p.id)} />
        ))}
      </div>
    </div>
  );
}

function RoyalFriendsCareCenterPage({ products, selectedCareProduct, setSelectedCareProduct, careCalendar, serviceRequests, onAddServiceRequest, onOpenQRCare, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <div className="palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="badge-royal-gold text-xs uppercase font-bold px-3 py-0.5 rounded-full inline-block">
            Intelligent Furniture Health & Lifecycle Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-white mt-1">FRIENDS CARE</h1>
          <p className="text-champagne italic font-serif">“Protect Your Furniture. Extend Its Life.”</p>
        </div>
        <button onClick={onOpenQRCare} className="btn-royal-gold px-4 py-2 text-xs font-bold">
          📱 QR Care Mode
        </button>
      </div>

      <div className="palace-card p-6 border border-[#C9A227]/30 space-y-4">
        <h3 className="font-cinzel font-bold text-base text-gold">Masterpiece Health: {selectedCareProduct.name}</h3>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-cinzel font-black text-gold">{selectedCareProduct.healthScore}/100</div>
          <span className="text-emerald-400 font-bold">{selectedCareProduct.healthStatus}</span>
        </div>
      </div>
    </div>
  );
}

function RoyalProductDetailsPage({ product, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted, onOpenRoomFit, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-4">
          <img src={product.images[0]} alt={product.name} className="w-full aspect-[4/3] object-cover rounded-3xl border-2 border-[#C9A227]/40" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="badge-royal-gold text-xs font-bold px-3 py-0.5 rounded-full">{product.collectionName}</span>
            <h1 className="text-3xl font-cinzel font-bold text-white mt-2">{product.name}</h1>
            <div className="text-3xl font-serif font-bold text-gold mt-2">{formatPrice(product.price)}</div>
            <p className="text-stone-300 mt-2">{product.shortDescription}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onAddToCart(product)} className="btn-royal-outline py-4 text-xs font-bold uppercase">
              ADD TO CART
            </button>
            <button onClick={() => onBuyNow(product)} className="btn-royal-gold py-4 text-xs font-bold uppercase shadow-2xl">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoyalWishlistCollectionPage({ products, wishlist, savedDesigns, onToggleWishlist, onAddToCart, onNavigate }) {
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <h2 className="text-3xl font-cinzel font-bold text-gold-gradient">MY ROYAL COLLECTION</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p.id} className="palace-card p-4 border border-[#C9A227]/30 space-y-3">
            <img src={p.images[0]} alt={p.name} className="w-full h-44 object-cover rounded-xl" />
            <h4 className="font-cinzel font-bold text-sm text-white">{p.name}</h4>
            <div className="text-sm font-bold text-gold">{formatPrice(p.price)}</div>
            <button onClick={() => onAddToCart(p)} className="btn-royal-gold w-full py-2 text-xs font-bold">
              + Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoyalCartPage({ cart, onUpdateQty, onRemoveItem, cartSubtotal, discountAmount, shippingFee, taxAmount, grandTotal, appliedCoupon, onApplyCoupon, onRemoveCoupon, onNavigate }) {
  const [coupon, setCoupon] = useState("");
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <h2 className="text-3xl font-cinzel font-bold text-gold-gradient">YOUR SHOPPING CART</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div key={item.cartItemId} className="palace-card p-4 border border-[#C9A227]/30 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-white">{item.name}</h4>
                  <div className="text-xs font-bold text-gold">{formatPrice(item.price)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => onRemoveItem(item.cartItemId)} className="text-stone-400">🗑️</button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 palace-card-elevated p-6 rounded-3xl border border-[#C9A227]/40 space-y-4">
          <h3 className="font-cinzel font-bold text-base text-gold">Order Summary</h3>
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="flex justify-between text-base font-bold text-gold">
              <span>Grand Total:</span><span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <button onClick={() => onNavigate("customer", "checkout")} className="btn-royal-gold w-full py-3.5 text-xs font-bold uppercase tracking-widest">
            PROCEED TO CHECKOUT →
          </button>
        </div>
      </div>
    </div>
  );
}

function RoyalCheckoutPage({ cart, user, grandTotal, onOrderPlaced, onNavigate }) {
  const [address, setAddress] = useState(user.address);
  const handleConfirm = () => {
    const newOrd = {
      orderId: `ROYAL-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      passportId: `FF-HERITAGE-${Math.floor(10000 + Math.random() * 90000)}`,
      dnaId: `FF-DNA-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: user.name,
      customerPhone: user.mobile,
      customerAddress: address,
      showroomId: "shw-01",
      showroomName: "Hyderabad Gachibowli Flagship",
      orderDate: "30 August 2026",
      productName: cart[0]?.name || "Palace Furniture",
      productId: cart[0]?.id || "ff-101",
      productImage: cart[0]?.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
      quantity: cart.reduce((s, i) => s + i.quantity, 0),
      amount: grandTotal,
      paymentMethod: "Instant UPI (Verified)",
      paymentStatus: "Paid ✅",
      supplierId: "sup-01",
      supplierName: "Nilambur Palace Teak Guild",
      currentStage: "Order Confirmed",
      stageIndex: 0,
      orderStatus: "Order Confirmed",
      deliveryStatus: "Processing at Guild",
      estimatedDelivery: "05 September 2026 (5–7 Days)",
      currentLocation: "Nilambur Artisan Guild Workshop",
      trackingLog: [{ stage: "Order Confirmed", time: "Just Now", detail: "Palace Commission confirmed & Digital Passport minted." }],
      aiDeliveryPrediction: { estimatedDays: "5–7 DAYS", delayRisk: "LOW", confidence: "93%" }
    };
    onOrderPlaced(newOrd);
  };

  return (
    <div className="max-w-2xl mx-auto palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6 text-xs animate-fade-up">
      <h2 className="font-cinzel font-bold text-2xl text-gold">Palace 4-Step Checkout</h2>
      <div>
        <label className="font-cinzel font-bold text-stone-300 block mb-1">Destination Address:</label>
        <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-black/60 border border-white/20 rounded-xl p-3 text-white" />
      </div>
      <button onClick={handleConfirm} className="btn-royal-gold w-full py-4 text-xs font-bold uppercase tracking-widest shadow-2xl">
        CONFIRM ROYAL ACQUISITION ({formatPrice(grandTotal)}) ✨
      </button>
    </div>
  );
}

function RoyalOrderTrackingPage({ order, orders, onSelectOrder, onNavigate }) {
  return (
    <div className="space-y-8 animate-fade-up text-xs">
      <h1 className="text-3xl font-cinzel font-bold text-gold-gradient">YOUR FURNITURE JOURNEY</h1>
      <div className="palace-card p-6 border border-[#C9A227]/40">
        <h3 className="font-cinzel font-bold text-white text-base">Tracking Order: {order.orderId} ({order.productName})</h3>
        <p className="text-emerald-400 font-bold mt-1">Status: {order.currentStage}</p>
      </div>
    </div>
  );
}

function RoyalFurniturePassportPage({ order, product, onNavigate }) {
  return (
    <div className="max-w-3xl mx-auto palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-6 animate-fade-up text-xs">
      <h2 className="text-3xl font-cinzel font-bold text-white">DIGITAL FURNITURE PASSPORT</h2>
      <div className="p-4 bg-black/60 rounded-2xl border border-white/10 space-y-1">
        <div className="font-mono text-gold font-bold">DNA: {order.dnaId || product.dnaId}</div>
        <div className="text-white font-cinzel text-base font-bold">{order.productName || product.name}</div>
        <div className="text-stone-300">Certified Timber Lot: #LOT-TEAK-88 (Nilambur Teak Guild)</div>
      </div>
    </div>
  );
}

function RoyalProfilePage({ user, onNavigate }) {
  return (
    <div className="max-w-2xl mx-auto palace-card-elevated p-8 rounded-3xl border border-[#C9A227]/50 space-y-4 animate-fade-up text-xs">
      <h2 className="text-2xl font-cinzel font-bold text-gold">Client Profile</h2>
      <div className="space-y-2 text-stone-300">
        <div>Name: <strong className="text-white">{user.name}</strong></div>
        <div>Email: <strong className="text-white">{user.email}</strong></div>
        <div>Membership: <strong className="text-gold">{user.membershipTier} Member ({user.royalPoints} Points)</strong></div>
      </div>
    </div>
  );
}

function RoyalRoomFitCheckerModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] text-white rounded-3xl max-w-md w-full border border-[#C9A227]/60 p-6 space-y-4 text-xs">
        <h3 className="font-cinzel font-bold text-gold text-base">WILL IT FIT?</h3>
        <p className="text-stone-300">Room Compatibility: <strong className="text-emerald-400">96% (Perfect Fit 🟢)</strong></p>
        <button onClick={onClose} className="btn-royal-gold w-full py-2 font-bold uppercase">Close</button>
      </div>
    </div>
  );
}

function RoyalShowroomQRModal({ product, onClose, onAddToCart }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] text-white rounded-3xl max-w-md w-full border border-[#C9A227]/60 p-6 space-y-4 text-xs">
        <h3 className="font-cinzel font-bold text-gold text-base">QR SMART SHOWROOM</h3>
        <h4 className="font-cinzel font-bold text-white">{product.name}</h4>
        <button onClick={onAddToCart} className="btn-royal-gold w-full py-2 font-bold uppercase">Add to Cart</button>
        <button onClick={onClose} className="btn-royal-outline w-full py-2 font-bold uppercase">Close</button>
      </div>
    </div>
  );
}

function RoyalQuickCareQRModal({ product, onClose, onNavigate }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] text-white rounded-3xl max-w-md w-full border-2 border-[#C9A227]/60 p-6 space-y-4 text-xs">
        <h3 className="font-cinzel font-bold text-gold text-base">QUICK CARE</h3>
        <p className="text-stone-300">Identified Piece: <strong className="text-white">{product.name}</strong></p>
        <button onClick={() => { onClose(); onNavigate("customer", "furniture-care"); }} className="btn-royal-gold w-full py-2 font-bold uppercase">
          Open Care Dashboard
        </button>
        <button onClick={onClose} className="btn-royal-outline w-full py-2 font-bold uppercase">Close</button>
      </div>
    </div>
  );
}

function RoyalFurnitureExpertModal({ onClose, onNavigate }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    { sender: "ai", text: "Greetings. Welcome to Friends Furniture Home & Space AI Advisor. How may I assist your residence layout today?" }
  ]);
  const handleSend = () => {
    if (!input.trim()) return;
    setChat([...chat, { sender: "user", text: input }, { sender: "ai", text: "Based on your Home Genome, we recommend Solid Nilambur Teak paired with Italian Carrara Marble for optimal circulation and aesthetic synergy." }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] text-white rounded-3xl max-w-md w-full border border-[#C9A227]/60 p-6 space-y-4 animate-modal text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="font-cinzel font-bold text-gold">ASK OUR HOME & FURNITURE AI</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="h-60 overflow-y-auto space-y-2">
          {chat.map((c, i) => (
            <div key={i} className={`p-2.5 rounded-xl ${c.sender === 'user' ? 'bg-[#C9A227] text-black ml-auto max-w-[80%]' : 'bg-[#07142F] text-stone-200 mr-auto max-w-[80%]'}`}>
              {c.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about room layout, styles..." className="flex-1 bg-black/60 border border-white/20 rounded-xl p-2 text-white" />
          <button onClick={handleSend} className="btn-royal-gold px-3 py-2 font-bold">Send</button>
        </div>
      </div>
    </div>
  );
}

function RoyalSmartNotificationsCenter({ notifications, currentRole, onClose, onMarkAllRead }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#050505] text-white rounded-3xl max-w-md w-full border border-[#C9A227]/50 p-6 space-y-4 animate-modal text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="font-cinzel font-bold text-gold">HOME INTELLIGENCE NOTIFICATIONS</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-cinzel font-bold text-gold">👑 {n.title}</div>
              <p className="text-stone-300">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoyalPalaceFooter({ onNavigate }) {
  return (
    <footer className="bg-[#050505] text-stone-400 border-t border-[#C9A227]/25 text-xs py-12 mt-16 mb-12 md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          <span className="font-cinzel text-xl font-bold text-gold-gradient block">👑 FRIENDS FURNITURE</span>
          <p className="italic text-stone-400">“Where Luxury Meets Comfort.”</p>
          <span className="text-[10px] text-champagne block">Home Intelligence 2.0 Platform</span>
        </div>
        <div>
          <h4 className="font-cinzel font-bold text-white mb-2">Home Intelligence Hubs</h4>
          <ul className="space-y-1">
            <li><button onClick={() => onNavigate("customer", "home-genome")} className="hover:text-gold">Home Genome</button></li>
            <li><button onClick={() => onNavigate("customer", "detective")} className="hover:text-gold">Furniture Detective</button></li>
            <li><button onClick={() => onNavigate("customer", "relationships")} className="hover:text-gold">Relationship Engine</button></li>
            <li><button onClick={() => onNavigate("customer", "empty-space")} className="hover:text-gold">Empty Space Hunter</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-cinzel font-bold text-white mb-2">Ecosystem Portals</h4>
          <ul className="space-y-1">
            <li><button onClick={() => onNavigate("customer")} className="hover:text-gold">Customer & Home AI</button></li>
            <li><button onClick={() => onNavigate("showroom")} className="hover:text-gold">Showroom Design Studio</button></li>
            <li><button onClick={() => onNavigate("supplier")} className="hover:text-gold">Supplier Command Center</button></li>
            <li><button onClick={() => onNavigate("admin")} className="hover:text-gold">Admin Command Center</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-cinzel font-bold text-white mb-2">Concierge Desk</h4>
          <p>Plot 42, Friends Royal Avenue, Gachibowli, Hyderabad.<br />📞 Toll-Free: 1800-ROYAL-WOOD</p>
        </div>
      </div>
    </footer>
  );
}

// Render React
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

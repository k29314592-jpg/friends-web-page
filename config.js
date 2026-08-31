/**
 * ============================================================================
 * FRIENDS FURNITURE — GLOBAL ENVIRONMENT CONFIGURATION (100% FREE-TIER)
 * “Where Luxury Meets Comfort.”
 * ============================================================================
 * 
 * 🔒 SECURITY NOTICE:
 * - Only PUBLIC / ANONYMOUS keys are stored here for client-side queries.
 * - NEVER put Supabase Service Role Secret Key in this file or any frontend script.
 * - If keys are left as empty strings, Friends Furniture automatically operates in
 *   "Standalone Palace Demo Mode" with rich local data and 100% functionality!
 */

window.FF_CONFIG = {
  // 🏛️ Supabase Free Tier Configuration
  // Get these from your Supabase Dashboard -> Project Settings -> API
  supabase: {
    url: window.SUPABASE_URL || "https://your-project-ref.supabase.co",
    anonKey: window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here",
    // Storage Buckets
    buckets: {
      productImages: "product-images",
      dnaDocs: "furniture-dna-docs",
      userUploads: "user-uploads"
    }
  },

  // 📈 Free Google Analytics 4 Measurement ID (Optional)
  // Format: "G-XXXXXXXXXX"
  googleAnalytics: {
    measurementId: window.GA_MEASUREMENT_ID || ""
  },

  // 🤖 Modular AI Configuration (Rule-Based by default, ₹0 cost)
  ai: {
    provider: "rule-based", // Options: "rule-based" | "gemini-free" | "huggingface"
    geminiApiKey: "" // Optional: Free tier Gemini API Key
  },

  // 🗺️ Free OpenStreetMap & Leaflet Tile Settings
  maps: {
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },

  // ⚙️ Platform Runtime Flags
  app: {
    name: "FRIENDS FURNITURE",
    version: "3.0.0-FreeTier",
    currency: "INR",
    currencySymbol: "₹",
    isDemoMode: function() {
      const url = window.FF_CONFIG.supabase.url;
      return !url || url.includes("your-project-ref") || url.includes("example.supabase.co");
    }
  }
};

// Check if localStorage has developer overrides
try {
  const customUrl = localStorage.getItem("FF_CUSTOM_SUPABASE_URL");
  const customKey = localStorage.getItem("FF_CUSTOM_SUPABASE_KEY");
  if (customUrl && customKey) {
    window.FF_CONFIG.supabase.url = customUrl;
    window.FF_CONFIG.supabase.anonKey = customKey;
  }
} catch(e) {}

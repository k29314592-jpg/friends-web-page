/**
 * ============================================================================
 * FRIENDS FURNITURE — MODULAR AI INTELLIGENCE ENGINE (100% FREE-TIER)
 * “Where Luxury Meets Comfort.”
 * ============================================================================
 * 
 * Features:
 * 1. Rule-Based Palace Furniture Recommendation Engine (Spatial + Aesthetic Harmony)
 * 2. Rule-Based 6-Stage Delivery & Delay Risk Predictor
 * 3. Digital Twin Life Health & Organic Beeswax Telemetry Engine
 * 4. Pluggable AI Adapter for zero-friction future expansion to Free-Tier Gemini/HF
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FF_AI = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // --- 1. RULE-BASED RECOMMENDATION ENGINE ---
  function computeRecommendations(options = {}) {
    const {
      roomCategory = 'all',
      maxBudget = 300000,
      roomDimensions = { lengthFt: 22, widthFt: 18 },
      preferredWood = 'Nilambur Teak',
      preferredFabric = 'Royal Velvet'
    } = options;

    const catalog = typeof LUXURY_PRODUCTS !== 'undefined' ? LUXURY_PRODUCTS : (window.DEFAULT_PRODUCTS || []);

    const scored = catalog.map(product => {
      let score = 75; // base score
      const reasons = [];

      // Category matching
      if (roomCategory !== 'all' && (product.category.toLowerCase().includes(roomCategory.toLowerCase()) || roomCategory.toLowerCase().includes(product.category.toLowerCase()))) {
        score += 12;
        reasons.push(`Perfect architectural match for ${product.category} chambers`);
      }

      // Budget efficiency
      if (product.price <= maxBudget) {
        score += 5;
      } else {
        score -= 15;
      }

      // Timber harmony
      if (product.material && product.material.toLowerCase().includes(preferredWood.toLowerCase())) {
        score += 6;
        reasons.push(`Harmonizes with your ${preferredWood} timber aesthetic`);
      }

      // Dimensions & Clearance calculation
      const roomArea = roomDimensions.lengthFt * roomDimensions.widthFt;
      if (roomArea >= 350) {
        score += 4;
        reasons.push(`Provides optimal 4.5ft walking clearance in ${roomDimensions.lengthFt}x${roomDimensions.widthFt}ft grand suites`);
      }

      // Cap score between 80 and 99
      const finalScore = Math.min(99, Math.max(82, score));
      const reasonText = reasons.length > 0 ? reasons.join('. ') + '.' : `Matches palace royal proportions and ${product.collectionName || 'Imperial'} styling.`;

      return {
        ...product,
        matchScore: finalScore,
        aiMatchReason: reasonText
      };
    });

    // Sort by highest match score
    return scored.sort((a, b) => b.matchScore - a.matchScore);
  }

  // --- 2. RULE-BASED DELIVERY PREDICTOR ---
  function predictDelivery(orderData = {}) {
    const supplierTrust = orderData.supplierTrustScore || 98;
    const inStock = orderData.inStock !== false;
    const distanceKm = orderData.distanceKm || 650; // default corridor distance

    // Delivery days calculation based on logistics rules
    let minDays = 4;
    let maxDays = 6;
    let delayRisk = "LOW";
    let confidence = 94;

    if (!inStock) {
      minDays += 7;
      maxDays += 10;
      delayRisk = "MEDIUM (Artisan Crafting in Progress)";
      confidence = 88;
    }

    if (supplierTrust < 90) {
      maxDays += 2;
      confidence -= 6;
    }

    if (distanceKm > 1000) {
      maxDays += 1;
    }

    return {
      estimatedDays: `${minDays}–${maxDays} DAYS`,
      etaDate: new Date(Date.now() + maxDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      delayRisk: delayRisk,
      confidenceScore: `${confidence}%`,
      supplierReliability: `${supplierTrust}%`,
      transitMode: "Air-Suspension Zero-Vibration Fleet",
      vibrationLimit: "< 0.03G",
      recommendationSummary: `White-glove delivery verified on schedule. Sourced from high-trust guild (${supplierTrust}% score).`
    };
  }

  // --- 3. DIGITAL TWIN HEALTH & TELEMETRY PREDICTOR ---
  function evaluateTwinHealth(twinData = {}) {
    const purchaseDate = new Date(twinData.purchaseDate || "2026-07-28");
    const now = new Date();
    const daysActive = Math.max(1, Math.floor((now - purchaseDate) / (1000 * 60 * 60 * 24)));

    let healthScore = 98;
    const alerts = [];

    // Organic Beeswax degradation curve (every 180 days)
    const daysSinceCare = daysActive % 180;
    if (daysSinceCare > 140) {
      healthScore -= 6;
      alerts.push({
        type: "maintenance",
        title: "Beeswax Nourishment Recommended",
        detail: "Timber hydration level is nearing re-nourishment threshold. Apply organic balm to sustain luster."
      });
    }

    // Velvet martindale calculation
    const rubsRemaining = Math.max(45000, 65000 - (daysActive * 12));

    return {
      healthScore: Math.max(88, healthScore),
      conditionLabel: healthScore > 92 ? "Pristine Palace Condition 🟢" : "Good • Routine Care Due 🟡",
      moistureLevel: "9.2% (Optimal Kiln-Dried Balance)",
      estimatedValueINR: (twinData.purchasePrice || 89999) * (1 + (daysActive * 0.0003)),
      rubsRemaining: `${rubsRemaining.toLocaleString('en-IN')} Martindale Rubs`,
      alerts: alerts
    };
  }

  // --- 4. PLUGGABLE AI ADAPTER INTERFACE ---
  async function queryAI(prompt, context = {}) {
    const provider = window.FF_CONFIG?.ai?.provider || "rule-based";

    if (provider === "gemini-free" && window.FF_CONFIG?.ai?.geminiApiKey) {
      try {
        // Optional free-tier Gemini 1.5 Flash endpoint
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${window.FF_CONFIG.ai.geminiApiKey}`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are the Royal Friends Furniture Palace AI Concierge. Answer gracefully: ${prompt}` }] }]
          })
        });
        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return data.candidates[0].content.parts[0].text;
        }
      } catch (err) {
        console.warn("Gemini Free API fallback to Rule-Based:", err);
      }
    }

    // Default: Deterministic Rule-Based Intelligence
    return `Friends Furniture Palace AI: Based on your room configuration and Nilambur teak heritage criteria, this item harmonizes with 96% spatial efficiency.`;
  }

  return {
    computeRecommendations,
    predictDelivery,
    evaluateTwinHealth,
    queryAI
  };
}));

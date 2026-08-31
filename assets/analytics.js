/**
 * ============================================================================
 * FRIENDS FURNITURE — GOOGLE ANALYTICS 4 FREE-TIER DISPATCHER
 * “Where Luxury Meets Comfort.”
 * ============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FF_Analytics = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function init() {
    const measurementId = window.FF_CONFIG?.googleAnalytics?.measurementId;
    if (!measurementId || measurementId.includes("G-XXXXXXXXXX")) {
      // In demo mode without GA ID, log locally in console
      return;
    }

    // Load gtag.js asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, { anonymize_ip: true });
    console.log("📈 [Analytics] Google Analytics 4 initialized.");
  }

  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    // Debug log in development
    // console.log(`📊 [Analytics Event]: ${eventName}`, params);
  }

  function trackPageView(pageTitle) {
    trackEvent('page_view', {
      page_title: pageTitle || document.title,
      page_location: window.location.href
    });
  }

  function trackAddToCart(product) {
    trackEvent('add_to_cart', {
      currency: 'INR',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category
      }]
    });
  }

  function trackEMICalculation(productName, tenureMonths, monthlyAmount) {
    trackEvent('calculate_emi', {
      product_name: productName,
      tenure_months: tenureMonths,
      monthly_amount: monthlyAmount
    });
  }

  function trackDigitalTwinView(twinId, healthScore) {
    trackEvent('view_twin', {
      twin_id: twinId,
      health_score: healthScore
    });
  }

  // Initialize upon DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    init,
    trackEvent,
    trackPageView,
    trackAddToCart,
    trackEMICalculation,
    trackDigitalTwinView
  };
}));

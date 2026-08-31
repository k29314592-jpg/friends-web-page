/**
 * ============================================================================
 * FRIENDS FURNITURE — CLIENT-SIDE IMAGE OPTIMIZER & FREE-TIER COMPRESSOR
 * “Where Luxury Meets Comfort.”
 * ============================================================================
 * 
 * Automatically compresses user-uploaded images and product assets using
 * HTML5 Canvas before uploading to Supabase Storage, saving up to 85% bandwidth
 * and keeping storage well within the ₹0 Free Tier limits.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FF_ImageOptimizer = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  /**
   * Compress an image file to WebP or JPEG before storage upload
   * @param {File|Blob} file 
   * @param {Object} options { maxWidth: 1600, maxHeight: 1600, quality: 0.82, outputType: 'image/webp' }
   * @returns {Promise<Blob>} Compressed image blob
   */
  function compressImage(file, options = {}) {
    const maxWidth = options.maxWidth || 1600;
    const maxHeight = options.maxHeight || 1600;
    const quality = options.quality || 0.82;
    const outputType = options.outputType || (supportsWebP() ? 'image/webp' : 'image/jpeg');

    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving resize
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            console.log(`🖼️ [ImageOptimizer] Compressed ${(file.size / 1024).toFixed(1)} KB → ${(blob.size / 1024).toFixed(1)} KB (${Math.round((1 - blob.size/file.size)*100)}% savings)`);
            resolve(blob);
          } else {
            resolve(file); // Fallback to original
          }
        }, outputType, quality);
      };

      img.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Feature detection for WebP
  function supportsWebP() {
    try {
      const elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
    } catch(e) {}
    return false;
  }

  // Automatically enable native lazy loading on all document images
  function initLazyLoading() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
      initLazyLoading();
    }
  }

  return {
    compressImage,
    supportsWebP,
    initLazyLoading
  };
}));

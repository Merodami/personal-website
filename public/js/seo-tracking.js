/**
 * SEO-focused tracking extensions
 *
 * This script adds specialized tracking for SEO-relevant metrics:
 * - Site crawlability indicators
 * - Structured data tracking
 * - Page load performance metrics
 * - User interaction signals that impact SEO
 */

(function() {
  // Wait for DOM to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize dataLayer if needed
    window.dataLayer = window.dataLayer || [];

    // Track structured data presence
    trackStructuredData();

    // Track Core Web Vitals metrics 
    trackCoreWebVitals();

    // Track user engagement signals
    trackEngagementSignals();

    // Track page indexability signals
    trackIndexabilitySignals();
  });

  /**
   * Track structured data presence on the page
   */
  function trackStructuredData() {
    // Look for structured data
    const structuredDataElements = document.querySelectorAll('script[type="application/ld+json"]');

    if (structuredDataElements.length > 0) {
      // Get types of structured data present
      const schemaTypes = Array.from(structuredDataElements).map(script => {
        try {
          const parsed = JSON.parse(script.textContent);
          return parsed['@type'] || 'Unknown';
        } catch (e) {
          return 'Invalid JSON';
        }
      });

      // Send structured data event to GTM
      window.dataLayer.push({
        'event': 'structured_data_detected',
        'structured_data_count': structuredDataElements.length,
        'structured_data_types': schemaTypes
      });
    }
  }

  /**
   * Track Core Web Vitals metrics using PerformanceObserver
   */
  function trackCoreWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    // Create a performance mark to indicate the page is ready for SEO analysis
    performance.mark('seo_ready');

    try {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcpTime = lastEntry.renderTime || lastEntry.loadTime;
        
        // Send LCP data to GTM
        window.dataLayer.push({
          'event': 'seo_performance_metric', 
          'metric_name': 'LCP',
          'metric_value': lcpTime,
          'metric_rating': lcpTime < 2500 ? 'good' : lcpTime < 4000 ? 'needs improvement' : 'poor'
        });
      }).observe({type: 'largest-contentful-paint', buffered: true});

      // FID (First Input Delay)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fidTime = entry.processingStart - entry.startTime;
          
          // Send FID data to GTM
          window.dataLayer.push({
            'event': 'seo_performance_metric',
            'metric_name': 'FID', 
            'metric_value': fidTime,
            'metric_rating': fidTime < 100 ? 'good' : fidTime < 300 ? 'needs improvement' : 'poor'
          });
        });
      }).observe({type: 'first-input', buffered: true});

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach((entry) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            
            // Send updated CLS to GTM
            window.dataLayer.push({
              'event': 'seo_performance_metric',
              'metric_name': 'CLS', 
              'metric_value': clsValue,
              'metric_rating': clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs improvement' : 'poor'
            });
          }
        });
      }).observe({type: 'layout-shift', buffered: true});
    } catch (e) {
      console.log('Error tracking Core Web Vitals:', e);
    }
  }

  /**
   * Track user engagement signals that impact SEO
   */
  function trackEngagementSignals() {
    // Initialize engagement trackers
    let timeOnPage = 0;
    let scrollDepthMax = 0;
    let userInteractions = 0;
    let interactionTypes = {};

    // Track max scroll depth
    window.addEventListener('scroll', debounce(function() {
      const newScrollDepth = getScrollPercentage();
      if (newScrollDepth > scrollDepthMax) {
        scrollDepthMax = newScrollDepth;
        
        // Only track certain thresholds to avoid too many events
        if (scrollDepthMax % 25 === 0) {
          window.dataLayer.push({
            'event': 'seo_engagement',
            'engagement_type': 'scroll_depth',
            'scroll_depth': scrollDepthMax
          });
        }
      }
    }, 250));

    // Track time on page
    const timeInterval = setInterval(function() {
      timeOnPage += 5;
      
      // Send time on page in 30-second intervals
      if (timeOnPage % 30 === 0) {
        window.dataLayer.push({
          'event': 'seo_engagement',
          'engagement_type': 'time_on_page',
          'time_seconds': timeOnPage
        });
      }
      
      // Stop tracking after 30 minutes
      if (timeOnPage >= 1800) {
        clearInterval(timeInterval);
      }
    }, 5000);

    // Track user interactions
    document.addEventListener('click', function(e) {
      userInteractions++;
      
      // Determine what was clicked
      let targetType = 'other';
      let clickTarget = e.target;
      
      // Traverse up to find most relevant parent
      while (clickTarget && clickTarget !== document.body) {
        if (clickTarget.tagName === 'A') {
          targetType = 'link';
          break;
        } else if (clickTarget.tagName === 'BUTTON') {
          targetType = 'button';
          break;
        } else if (clickTarget.tagName === 'INPUT' || clickTarget.tagName === 'SELECT' || clickTarget.tagName === 'TEXTAREA') {
          targetType = 'form_element';
          break;
        }
        clickTarget = clickTarget.parentNode;
      }
      
      // Increment interaction type count
      interactionTypes[targetType] = (interactionTypes[targetType] || 0) + 1;
      
      // Send interaction data to GTM
      window.dataLayer.push({
        'event': 'seo_engagement',
        'engagement_type': 'interaction',
        'interaction_type': targetType,
        'interaction_count': userInteractions
      });
    });
    
    // Track page visibility
    document.addEventListener('visibilitychange', function() {
      window.dataLayer.push({
        'event': 'seo_engagement',
        'engagement_type': 'visibility',
        'page_visible': !document.hidden
      });
    });
    
    // Final engagement data before unload
    window.addEventListener('beforeunload', function() {
      window.dataLayer.push({
        'event': 'seo_engagement_summary',
        'total_time_seconds': timeOnPage,
        'max_scroll_depth': scrollDepthMax,
        'total_interactions': userInteractions,
        'interaction_types': JSON.stringify(interactionTypes)
      });
    });
  }

  /**
   * Track page indexability signals
   */
  function trackIndexabilitySignals() {
    // Check for canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    
    // Check for noindex meta tag
    const noIndex = document.querySelector('meta[name="robots"][content*="noindex"], meta[name="googlebot"][content*="noindex"]');
    
    // Check for hreflang tags
    const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    
    // Check for heading structure
    const h1Count = document.querySelectorAll('h1').length;
    const h2Count = document.querySelectorAll('h2').length;
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;

    for (let img of images) {
      if (img.hasAttribute('alt') && img.getAttribute('alt').trim() !== '') {
        imagesWithAlt++;
      } else {
        imagesWithoutAlt++;
      }
    }
    
    // Send indexability data to GTM
    window.dataLayer.push({
      'event': 'seo_indexability',
      'has_canonical': !!canonical,
      'canonical_url': canonical ? canonical.getAttribute('href') : '',
      'is_noindex': !!noIndex,
      'hreflang_count': hreflangs.length,
      'h1_count': h1Count,
      'h2_count': h2Count,
      'images_with_alt': imagesWithAlt,
      'images_without_alt': imagesWithoutAlt
    });
  }

  /**
   * Helper function: Get scroll percentage
   */
  function getScrollPercentage() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    
    const totalScrollHeight = documentHeight - windowHeight;
    return Math.round((scrollTop / totalScrollHeight) * 100);
  }

  /**
   * Helper function: Simple debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
})();
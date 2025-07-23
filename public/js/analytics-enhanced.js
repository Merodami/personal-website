/**
 * Enhanced analytics tracking for Che Cristina
 *
 * This script provides additional data layer events focused on:
 * - Core Web Vitals tracking
 * - Enhanced language switching tracking
 * - Scroll depth tracking
 * - Content engagement metrics
 * - Timeline interaction events
 */

(function() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize data layer if not already
    window.dataLayer = window.dataLayer || [];
    
    // Track current language
    const currentLang = document.documentElement.lang;
    
    // Send page view with language info
    trackPageView(currentLang);
    
    // Track language switching
    trackLanguageSwitching();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track timeline interactions
    trackTimelineInteractions();
    
    // Track CWV and performance metrics
    trackPerformanceMetrics();
    
    // Track external link clicks
    trackExternalLinks();
  });
  
  /**
   * Track page view with enhanced data
   */
  function trackPageView(lang) {
    // Get page path
    const path = window.location.pathname;
    const title = document.title;
    
    // Push enhanced pageview event
    window.dataLayer.push({
      'event': 'enhanced_page_view',
      'page_path': path,
      'page_title': title,
      'language': lang,
      'is_homepage': path === '/' || path === '/en/',
      'dark_mode': document.documentElement.classList.contains('dark')
    });
  }
  
  /**
   * Track language switching events
   */
  function trackLanguageSwitching() {
    // Listen for language change event
    document.addEventListener('languageChanged', function(e) {
      window.dataLayer.push({
        'event': 'language_changed',
        'language_from': document.documentElement.lang,
        'language_to': e.detail.language
      });
    });
    
    // Track language switcher clicks
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
      langSwitcher.addEventListener('click', function() {
        window.dataLayer.push({
          'event': 'language_switcher_clicked',
          'current_language': document.documentElement.lang
        });
      });
    }
  }
  
  /**
   * Track scroll depth
   */
  function trackScrollDepth() {
    // Track 25%, 50%, 75%, and 100% scroll depth
    const scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];
    
    // Listen for scroll
    window.addEventListener('scroll', debounce(function() {
      const scrollPercentage = getScrollPercentage();

      // Check if we crossed any scroll depth thresholds
      scrollDepths.forEach(function(depth) {
        if (scrollPercentage >= depth && !trackedDepths.includes(depth)) {
          trackedDepths.push(depth);
          
          window.dataLayer.push({
            'event': 'scroll_depth',
            'scroll_depth_percentage': depth,
            'page_path': window.location.pathname
          });
        }
      });
    }, 250));
  }
  
  /**
   * Track timeline engagement
   */
  function trackTimelineInteractions() {
    // Track timeline events visibility and interactions
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    if (timelineEvents.length > 0) {
      // Use IntersectionObserver to track when timeline events become visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const eventId = entry.target.getAttribute('data-event-id');
            if (eventId) {
              window.dataLayer.push({
                'event': 'timeline_event_visible',
                'timeline_event_id': eventId
              });
              // Unobserve after it's been seen
              observer.unobserve(entry.target);
            }
          }
        });
      }, {
        threshold: 0.5 // Element is considered visible when 50% in view
      });
      
      // Observe all timeline events
      timelineEvents.forEach(event => observer.observe(event));
      
      // Track clicks on timeline events
      document.addEventListener('click', function(e) {
        let target = e.target;
        
        // Check if click is within a timeline event or its children
        while (target && target !== document.body) {
          if (target.classList.contains('timeline-event')) {
            const eventId = target.getAttribute('data-event-id');
            if (eventId) {
              window.dataLayer.push({
                'event': 'timeline_event_clicked',
                'timeline_event_id': eventId
              });
            }
            break;
          }
          target = target.parentNode;
        }
      });
    }
  }
  
  /**
   * Track Core Web Vitals and performance metrics
   */
  function trackPerformanceMetrics() {
    // Use Performance Observer to track LCP, FID, CLS
    if ('PerformanceObserver' in window) {
      // Track Largest Contentful Paint
      try {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.dataLayer.push({
            'event': 'web_vital',
            'web_vital_type': 'LCP',
            'web_vital_value': lastEntry.renderTime || lastEntry.loadTime
          });
        }).observe({type: 'largest-contentful-paint', buffered: true});
      } catch (e) {
        console.log('LCP tracking error:', e);
      }
      
      // Track First Input Delay
      try {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            window.dataLayer.push({
              'event': 'web_vital',
              'web_vital_type': 'FID', 
              'web_vital_value': entry.processingStart - entry.startTime
            });
          });
        }).observe({type: 'first-input', buffered: true});
      } catch (e) {
        console.log('FID tracking error:', e);
      }
      
      // Track Cumulative Layout Shift
      try {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            // Only count layout shifts without recent user input
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              window.dataLayer.push({
                'event': 'web_vital',
                'web_vital_type': 'CLS',
                'web_vital_value': clsValue
              });
            }
          });
        }).observe({type: 'layout-shift', buffered: true});
      } catch (e) {
        console.log('CLS tracking error:', e);
      }
      
      // Track Navigation Timing metrics once the page is fully loaded
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const navigationStart = timing.navigationStart;
            
            const metrics = {
              'dns_time': timing.domainLookupEnd - timing.domainLookupStart,
              'connection_time': timing.connectEnd - timing.connectStart,
              'ttfb': timing.responseStart - navigationStart,
              'dom_load_time': timing.domComplete - timing.domLoading,
              'full_page_load': timing.loadEventEnd - navigationStart
            };
            
            window.dataLayer.push({
              'event': 'page_performance',
              'performance_metrics': metrics
            });
          }
        }, 0);
      });
    }
  }
  
  /**
   * Track external link clicks
   */
  function trackExternalLinks() {
    document.addEventListener('click', function(e) {
      let target = e.target;
      
      // Find the nearest anchor tag
      while (target && target !== document.body) {
        if (target.tagName.toLowerCase() === 'a') {
          const href = target.getAttribute('href');
          
          // Check if it's an external link
          if (href && (href.indexOf('http') === 0 || href.indexOf('//') === 0)) {
            const url = new URL(href, window.location.origin);
            
            // Compare hostnames
            if (url.hostname !== window.location.hostname) {
              window.dataLayer.push({
                'event': 'external_link_click',
                'external_link_url': href,
                'external_link_domain': url.hostname
              });
            }
          }
          break;
        }
        target = target.parentNode;
      }
    });
  }
  
  /**
   * Helper: Get current scroll percentage
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
   * Helper: Simple debounce function
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
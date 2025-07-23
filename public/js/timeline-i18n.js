/**
 * Timeline Language Switcher Client-Side Helper
 *
 * This script provides client-side translation capabilities for the timeline component
 * when the language is changed dynamically without a page reload.
 *
 * Features:
 * - Updates content based on i18next translations
 * - Updates date formatting based on the selected locale
 * - Works with the custom languageChanged event
 */

// Update content when language changes
document.addEventListener('languageChanged', (event) => {
  const language = event.detail.language;
  // Only log in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`Language changed to: ${language}`);
  }
  
  // Update dates with proper locale formatting
  document.querySelectorAll('time.timeline-date').forEach(timeEl => {
    const date = timeEl.getAttribute('datetime');
    if (date) {
      try {
        // Format the date according to locale
        const dateObj = new Date(date);
        const formatted = dateObj.toLocaleDateString(
          language === 'en' ? 'en-US' : 'es-ES',
          { year: 'numeric', month: 'long', day: 'numeric' }
        );
        timeEl.textContent = formatted;
      } catch (error) {
        console.error('Error formatting date:', error);
      }
    }
  });
  
  // Translation mappings
  const translations = {
    'en': {
      'timeline.title': 'Che Cristina',
      'site.description': 'The biggest heist in Argentine history — a timeline.',
      'timeline.noEvents': 'No events to display',
      'timeline.scrollPrompt': 'Scroll to explore',
      'timeline.readMore': 'Read more',
      'timeline.showLess': 'Show less'
    },
    'es': {
      'timeline.title': 'Che Cristina',
      'site.description': 'El robo más grande de la historia de la Argentina — una línea de tiempo.',
      'timeline.noEvents': 'No hay eventos para mostrar',
      'timeline.scrollPrompt': 'Desliza para explorar',
      'timeline.readMore': 'Ver más',
      'timeline.showLess': 'Ver menos'
    }
  };
  
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[language] && translations[language][key]) {
      el.textContent = translations[language][key];
    }
  });
  
  // Update event titles and descriptions if available
  const events = document.querySelectorAll('.timeline-event');
  events.forEach(event => {
    const eventId = event.getAttribute('data-event-id');
    if (eventId) {
      // Get title and description elements
      const titleEl = event.querySelector('.timeline-title');
      const descEl = event.querySelector('.timeline-description');
      
      // Get title and description data attributes
      if (titleEl) {
        const title_en = titleEl.getAttribute('data-title-en');
        const title_es = titleEl.getAttribute('data-title-es');
        if (language === 'en' && title_en) {
          titleEl.textContent = title_en;
        } else if (language === 'es' && title_es) {
          titleEl.textContent = title_es;
        }
      }
      
      if (descEl) {
        const desc_en = descEl.getAttribute('data-content-en');
        const desc_es = descEl.getAttribute('data-content-es');
        if (language === 'en' && desc_en) {
          descEl.textContent = desc_en;
        } else if (language === 'es' && desc_es) {
          descEl.textContent = desc_es;
        }
      }
    }
  });
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only log in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Timeline i18n helper initialized');
  }
});
# Google Tag Manager Implementation

This document outlines the Google Tag Manager (GTM) implementation for the Che Cristina website, including setup instructions, usage guidelines, and testing procedures.

## Setup

### Integration Details

The site uses Google Tag Manager with Partytown for optimal performance. Partytown runs third-party scripts (like analytics) in a web worker, off the main thread, to improve site performance.

### Components

1. **Partytown Integration**: Configured in `astro.config.mjs`
2. **GTM Scripts**: Added to `BaseLayout.astro`
   - Main script in the `<head>` section with `type="text/partytown"`
   - Noscript fallback in the `<body>` section

## Usage Instructions

### Setting Up GTM Container

1. Create a GTM account at [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new container for the website
3. Replace `GTM-XXXXXXX` in the BaseLayout.astro file with your actual GTM container ID

### Adding Tags in GTM

#### Common Analytics Tags

1. **Google Analytics 4 (GA4)**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 measurement ID
   - Triggering: All Pages

2. **Event Tracking**
   - Create custom events for:
     - Form submissions
     - Button clicks
     - Scroll depth
     - Time on page

#### Multilingual Tracking

Since this is a multilingual site, consider:

1. Adding a custom dimension for language (es/en)
2. Using a Data Layer variable to track the current language
3. Adding language information to all tracked events

```javascript
// Example DataLayer push for language tracking
dataLayer.push({
  event: 'pageView',
  language: document.documentElement.lang,
});
```

## Testing

### Test Procedure

1. Install the [Google Tag Assistant](https://tagassistant.google.com/) extension
2. Preview your GTM container
3. Navigate through the site to verify proper tag firing
4. Check GTM Debug console to ensure no errors
5. Verify data appears in connected analytics platforms

### Performance Monitoring

After implementing GTM, monitor site performance to ensure it doesn't negatively impact:

1. Core Web Vitals
2. Lighthouse scores
3. Overall page load times

Use the existing Lighthouse script to test performance:

```bash
npm run open-lighthouse
```

## Data Privacy Considerations

Ensure compliance with data privacy regulations:

1. Update the site's privacy policy to disclose analytics tracking
2. Consider implementing a cookie consent mechanism
3. Configure GTM to respect Do Not Track signals and consent choices

## Troubleshooting

Common issues:

1. **Tags not firing**: Check browser console for errors
2. **Partytown errors**: Verify the forward configuration in astro.config.mjs
3. **Data not appearing in analytics**: Check for correct container ID and proper setup

For detailed troubleshooting, see [GTM Troubleshooting Guide](https://support.google.com/tagmanager/answer/3281060)

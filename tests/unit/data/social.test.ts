import { describe, it, expect } from 'vitest';
import { socialLinks } from '@data/social';

describe('social links data', () => {
  describe('structure', () => {
    it('exports an array of social links', () => {
      expect(Array.isArray(socialLinks)).toBe(true);
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('each social link has all required fields', () => {
      socialLinks.forEach((link) => {
        expect(link).toHaveProperty('name');
        expect(link).toHaveProperty('url');
        expect(link).toHaveProperty('icon');
        expect(link).toHaveProperty('ariaLabel');
      });
    });

    it('each social link has valid field types', () => {
      socialLinks.forEach((link) => {
        expect(typeof link.name).toBe('string');
        expect(typeof link.url).toBe('string');
        expect(typeof link.icon).toBe('string');
        expect(typeof link.ariaLabel).toBe('string');
      });
    });
  });

  describe('data integrity', () => {
    it('all names are unique', () => {
      const names = socialLinks.map((link) => link.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('all fields are non-empty', () => {
      socialLinks.forEach((link) => {
        expect(link.name.trim()).not.toBe('');
        expect(link.url.trim()).not.toBe('');
        expect(link.icon.trim()).not.toBe('');
        expect(link.ariaLabel.trim()).not.toBe('');
      });
    });

    it('URLs are valid', () => {
      socialLinks.forEach((link) => {
        // Check for valid URL patterns
        const isValidUrl =
          link.url.startsWith('https://') ||
          link.url.startsWith('http://') ||
          link.url.startsWith('mailto:');

        expect(isValidUrl).toBe(true);
      });
    });

    it('email links use mailto protocol', () => {
      const emailLinks = socialLinks.filter((link) => link.name.toLowerCase() === 'email');

      emailLinks.forEach((link) => {
        expect(link.url).toMatch(/^mailto:.+@.+\..+$/);
      });
    });

    it('social media links use HTTPS', () => {
      const socialMediaLinks = socialLinks.filter((link) => !link.url.startsWith('mailto:'));

      socialMediaLinks.forEach((link) => {
        expect(link.url).toMatch(/^https:\/\//);
      });
    });

    it('aria labels are descriptive', () => {
      socialLinks.forEach((link) => {
        expect(link.ariaLabel.length).toBeGreaterThan(5);
        // Should contain action words
        const hasActionWord =
          link.ariaLabel.toLowerCase().includes('visit') ||
          link.ariaLabel.toLowerCase().includes('connect') ||
          link.ariaLabel.toLowerCase().includes('send') ||
          link.ariaLabel.toLowerCase().includes('follow') ||
          link.ariaLabel.toLowerCase().includes('view');

        expect(hasActionWord).toBe(true);
      });
    });

    it('icon names match expected format', () => {
      socialLinks.forEach((link) => {
        // Icons should be lowercase and match common names
        expect(link.icon).toMatch(/^[a-z-]+$/);
      });
    });
  });

  describe('specific links', () => {
    it('includes essential social platforms', () => {
      const platforms = socialLinks.map((link) => link.name.toLowerCase());

      // At minimum, should have GitHub and some form of contact
      expect(platforms).toContain('github');

      const hasContact =
        platforms.includes('email') ||
        platforms.includes('linkedin') ||
        platforms.includes('twitter');
      expect(hasContact).toBe(true);
    });

    it('GitHub link points to valid profile', () => {
      const githubLink = socialLinks.find((link) => link.name.toLowerCase() === 'github');

      if (githubLink) {
        expect(githubLink.url).toMatch(/^https:\/\/github\.com\/[\w-]+$/);
      }
    });

    it('LinkedIn link points to valid profile', () => {
      const linkedinLink = socialLinks.find((link) => link.name.toLowerCase() === 'linkedin');

      if (linkedinLink) {
        expect(linkedinLink.url).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/);
      }
    });
  });
});

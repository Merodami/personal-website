import { describe, it, expect } from 'vitest';
import { projects } from '@data/projects';

describe('projects data', () => {
  describe('structure', () => {
    it('exports an array of projects', () => {
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('each project has all required fields', () => {
      projects.forEach((project) => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('image');
        expect(project).toHaveProperty('tags');
        expect(project).toHaveProperty('featured');
        expect(project).toHaveProperty('date');
      });
    });

    it('each project has valid field types', () => {
      projects.forEach((project) => {
        expect(typeof project.id).toBe('string');
        expect(typeof project.title).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.image).toBe('string');
        expect(Array.isArray(project.tags)).toBe(true);
        expect(typeof project.featured).toBe('boolean');
        expect(project.date).toBeInstanceOf(Date);

        // Optional fields
        if (project.liveUrl !== undefined) {
          expect(typeof project.liveUrl).toBe('string');
        }
        if (project.githubUrl !== undefined) {
          expect(typeof project.githubUrl).toBe('string');
        }
      });
    });
  });

  describe('data integrity', () => {
    it('all project IDs are unique', () => {
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('all project titles are non-empty', () => {
      projects.forEach((project) => {
        expect(project.title.trim()).not.toBe('');
      });
    });

    it('all project descriptions are non-empty', () => {
      projects.forEach((project) => {
        expect(project.description.trim()).not.toBe('');
      });
    });

    it('all projects have at least one tag', () => {
      projects.forEach((project) => {
        expect(project.tags.length).toBeGreaterThan(0);
      });
    });

    it('all tags are non-empty strings', () => {
      projects.forEach((project) => {
        project.tags.forEach((tag) => {
          expect(typeof tag).toBe('string');
          expect(tag.trim()).not.toBe('');
        });
      });
    });

    it('image paths follow expected format', () => {
      projects.forEach((project) => {
        expect(project.image).toMatch(/^\/images\/projects\/[\w-]+\.(jpg|png|webp)$/);
      });
    });

    it('URLs are valid when provided', () => {
      const urlPattern = /^https?:\/\/.+/;

      projects.forEach((project) => {
        if (project.liveUrl) {
          expect(project.liveUrl).toMatch(urlPattern);
        }
        if (project.githubUrl) {
          expect(project.githubUrl).toMatch(urlPattern);
        }
      });
    });

    it('dates are valid and in the past', () => {
      const now = new Date();

      projects.forEach((project) => {
        expect(project.date.getTime()).toBeLessThanOrEqual(now.getTime());
        expect(project.date.getTime()).toBeGreaterThan(new Date('2020-01-01').getTime());
      });
    });
  });

  describe('featured projects', () => {
    it('has at least one featured project', () => {
      const featuredProjects = projects.filter((p) => p.featured);
      expect(featuredProjects.length).toBeGreaterThan(0);
    });

    it('featured projects have all optional fields', () => {
      const featuredProjects = projects.filter((p) => p.featured);

      featuredProjects.forEach((project) => {
        expect(project.liveUrl).toBeDefined();
      });
    });
  });

  describe('sorting and ordering', () => {
    it('projects are sorted by date (newest first)', () => {
      for (let i = 0; i < projects.length - 1; i++) {
        expect(projects[i].date.getTime()).toBeGreaterThanOrEqual(projects[i + 1].date.getTime());
      }
    });
  });
});

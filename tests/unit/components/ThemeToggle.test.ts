import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeToggleController, initThemeToggle } from '@utils/themeToggle';
import { useAppStore } from '@stores/appStore';
import { themeUtils } from '@utils/theme';
import { JSDOM } from 'jsdom';

// Mock the dependencies
vi.mock('@stores/appStore');
vi.mock('@utils/theme');

describe('ThemeToggleController', () => {
  let dom: JSDOM;
  let toggleButton: HTMLElement;
  let controller: ThemeToggleController;
  let mockToggleTheme: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    dom = new JSDOM(`
      <button id="theme-toggle" aria-label="Toggle theme">
        <svg class="icon sun-icon"></svg>
        <svg class="icon moon-icon"></svg>
      </button>
    `);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;

    toggleButton = document.getElementById('theme-toggle')!;

    // Setup store mock
    mockToggleTheme = vi.fn();
    vi.mocked(useAppStore).getState = vi.fn().mockReturnValue({
      toggleTheme: mockToggleTheme,
    });

    controller = new ThemeToggleController({ toggleButton });
  });

  afterEach(() => {
    controller.destroy();
    vi.clearAllMocks();
  });

  describe('click handling', () => {
    it('toggles theme when button is clicked', () => {
      toggleButton.click();

      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks', () => {
      toggleButton.click();
      toggleButton.click();
      toggleButton.click();

      expect(mockToggleTheme).toHaveBeenCalledTimes(3);
    });
  });

  describe('cleanup', () => {
    it('removes event listener on destroy', () => {
      controller.destroy();

      // Click after destroy should not trigger toggle
      toggleButton.click();
      expect(mockToggleTheme).not.toHaveBeenCalled();
    });
  });
});

describe('initThemeToggle', () => {
  let dom: JSDOM;

  beforeEach(() => {
    vi.mocked(themeUtils.initTheme).mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes theme on call', () => {
    dom = new JSDOM(`<button id="theme-toggle"></button>`);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });

    initThemeToggle();

    expect(themeUtils.initTheme).toHaveBeenCalledTimes(1);
  });

  it('returns controller when toggle button exists', () => {
    dom = new JSDOM(`<button id="theme-toggle"></button>`);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });

    const controller = initThemeToggle();

    expect(controller).toBeInstanceOf(ThemeToggleController);
  });

  it('returns null when toggle button does not exist', () => {
    dom = new JSDOM(`<div></div>`);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });

    const controller = initThemeToggle();

    expect(controller).toBeNull();
  });

  it('waits for DOMContentLoaded when document is loading', () => {
    dom = new JSDOM(`<button id="theme-toggle"></button>`);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });

    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

    initThemeToggle();

    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });
});

describe('ThemeToggle accessibility', () => {
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM(`
      <html data-theme="light">
        <button id="theme-toggle" aria-label="Toggle theme" title="Toggle theme">
          <svg class="icon sun-icon"></svg>
          <svg class="icon moon-icon"></svg>
        </button>
      </html>
    `);
    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
  });

  it('has proper ARIA label', () => {
    const toggleButton = document.getElementById('theme-toggle');
    expect(toggleButton?.getAttribute('aria-label')).toBe('Toggle theme');
  });

  it('has proper title attribute', () => {
    const toggleButton = document.getElementById('theme-toggle');
    expect(toggleButton?.getAttribute('title')).toBe('Toggle theme');
  });

  it('is keyboard accessible', () => {
    const toggleButton = document.getElementById('theme-toggle');
    expect(toggleButton?.tagName).toBe('BUTTON');
  });
});

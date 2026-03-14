import { vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Setup DOM environment
export const setupDOMEnvironment = (url = 'http://localhost/') => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url });
  global.document = dom.window.document;
  global.window = dom.window as unknown as Window & typeof globalThis;

  // Mock location properly to allow redefinition
  const locationDescriptor = Object.getOwnPropertyDescriptor(global.window, 'location');
  if (!locationDescriptor || locationDescriptor.configurable) {
    Object.defineProperty(global.window, 'location', {
      value: {
        pathname: '/',
        href: url,
        origin: 'http://localhost',
        protocol: 'http:',
        host: 'localhost',
        hostname: 'localhost',
        port: '',
        search: '',
        hash: '',
      },
      writable: true,
      configurable: true,
    });
  } else {
    // If location is not configurable, just modify the pathname
    global.window.location.pathname = '/';
  }

  // Mock CustomEvent for JSDOM compatibility
  global.CustomEvent = class MockCustomEvent extends Event {
    public detail: unknown;

    constructor(type: string, eventInitDict?: CustomEventInit) {
      super(type, eventInitDict);
      this.detail = eventInitDict?.detail;
    }
  } as unknown as typeof CustomEvent;

  return dom;
};

// Mock localStorage
export const createMockLocalStorage = () => {
  const storage: { [key: string]: string } = {};

  return {
    getItem: vi.fn((key: string) => storage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete storage[key];
    }),
    clear: vi.fn(() => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    }),
    length: 0,
    key: vi.fn(() => null),
  } as unknown as Storage;
};

// Mock window history
export const mockWindowHistory = () => {
  global.window.history.pushState = vi.fn();
  global.window.history.replaceState = vi.fn();
};

// Mock requestAnimationFrame
export const mockRequestAnimationFrame = () => {
  let rafId = 0;
  global.requestAnimationFrame = vi.fn((cb) => {
    rafId++;
    setTimeout(cb, 16);
    return rafId;
  });
  global.cancelAnimationFrame = vi.fn();
};

// Mock window location with specific pathname
export const mockWindowLocation = (pathname: string) => {
  global.window.location.pathname = pathname;
};

// Complete DOM setup for i18n tests
export const setupI18nDOMEnvironment = () => {
  const dom = setupDOMEnvironment();
  global.localStorage = createMockLocalStorage();
  mockWindowHistory();
  mockRequestAnimationFrame();

  return dom;
};

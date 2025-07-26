import { beforeEach, vi } from 'vitest';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
const localStorageMock: Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'clear'> = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Add missing Storage properties
Object.defineProperty(global, 'localStorage', {
  value: {
    ...localStorageMock,
    length: 0,
    key: vi.fn(() => null),
  },
  writable: true,
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  // Reset localStorage mocks
  (localStorageMock.getItem as ReturnType<typeof vi.fn>).mockReset();
  (localStorageMock.setItem as ReturnType<typeof vi.fn>).mockReset();
  (localStorageMock.removeItem as ReturnType<typeof vi.fn>).mockReset();
  (localStorageMock.clear as ReturnType<typeof vi.fn>).mockReset();
});

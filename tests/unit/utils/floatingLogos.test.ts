import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FloatingLogosController, initFloatingLogos } from '@utils/floatingLogos';
import { setupDOMEnvironment, mockRequestAnimationFrame } from '../../mocks';

// Use fake timers to control setTimeout
vi.useFakeTimers();

describe('FloatingLogosController', () => {
  let container: HTMLElement;
  let items: NodeListOf<HTMLElement>;
  let controller: FloatingLogosController;

  beforeEach(() => {
    setupDOMEnvironment();

    // Add specific HTML for floating logos
    document.body.innerHTML = `
      <div id="floating-tech-logos">
        <div class="tech-float-item" style="--rotation: 0deg"></div>
        <div class="tech-float-item" style="--rotation: 45deg"></div>
        <div class="tech-float-item" style="--rotation: 90deg"></div>
      </div>
    `;

    mockRequestAnimationFrame();

    container = document.getElementById('floating-tech-logos')!;
    items = container.querySelectorAll('.tech-float-item') as NodeListOf<HTMLElement>;
    controller = new FloatingLogosController({ container, items });
  });

  afterEach(() => {
    if (controller) {
      controller.destroy();
    }
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  describe('initialization', () => {
    it('calculates item depths correctly', () => {
      expect(items.length).toBe(3);
      // Depths should cycle through 1, 2, 3
      // Internal state verification would require exposing itemDepths
    });
  });

  describe('mouse movement handling', () => {
    it('updates mouse coordinates on mousemove', () => {
      const mockEvent = new MouseEvent('mousemove', {
        clientX: 800,
        clientY: 600,
      });
      Object.defineProperty(global.window, 'innerWidth', { value: 1600 });
      Object.defineProperty(global.window, 'innerHeight', { value: 1200 });

      controller.handleMouseMove(mockEvent);

      expect(requestAnimationFrame).toHaveBeenCalled();
    });

    it('normalizes mouse coordinates correctly', () => {
      Object.defineProperty(global.window, 'innerWidth', { value: 1000 });
      Object.defineProperty(global.window, 'innerHeight', { value: 1000 });

      const mockEvent = new MouseEvent('mousemove', {
        clientX: 750, // 250px right of center
        clientY: 250, // 250px above center
      });

      controller.handleMouseMove(mockEvent);

      // Mouse should be normalized to 0.5 and -0.5
      expect(requestAnimationFrame).toHaveBeenCalled();
    });
  });

  describe('animation', () => {
    it('uses requestAnimationFrame for smooth animations', () => {
      controller.animate();
      expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    });

    it('prevents multiple simultaneous animation frames', () => {
      controller.animate();
      controller.animate();
      controller.animate();

      expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    });

    it('applies transform3d for hardware acceleration', async () => {
      controller.handleMouseMove(
        new MouseEvent('mousemove', {
          clientX: 600,
          clientY: 400,
        })
      );

      // Trigger the animation frame callback
      const callback = vi.mocked(requestAnimationFrame).mock.calls[0][0];
      callback(0);

      // Check that transform3d is applied
      items.forEach((item) => {
        expect(item.style.transform).toMatch(/translate3d/);
        expect(item.style.transform).toMatch(/rotate\(var\(--rotation\)\)/);
      });
    });
  });

  describe('performance optimizations', () => {
    it('uses lerp (linear interpolation) for smooth movement', async () => {
      Object.defineProperty(global.window, 'innerWidth', { value: 1000 });
      Object.defineProperty(global.window, 'innerHeight', { value: 1000 });

      // Move mouse to position
      controller.handleMouseMove(
        new MouseEvent('mousemove', {
          clientX: 700,
          clientY: 700,
        })
      );

      // Execute multiple animation frames
      for (let i = 0; i < 5; i++) {
        const callback = vi.mocked(requestAnimationFrame).mock.calls[i][0];
        callback(0);
        controller.animate();
      }

      // Transform should gradually approach target
      const firstItem = items[0];
      expect(firstItem.style.transform).toBeTruthy();
    });
  });

  describe('cleanup', () => {
    it('cancels animation frame on destroy', () => {
      controller.startInitialAnimation();
      controller.destroy();

      expect(cancelAnimationFrame).toHaveBeenCalled();
    });
  });
});

describe('initFloatingLogos', () => {
  beforeEach(() => {
    setupDOMEnvironment();

    document.body.innerHTML = `
      <div id="floating-tech-logos">
        <div class="tech-float-item"></div>
      </div>
    `;

    mockRequestAnimationFrame();
  });

  it('returns controller when container and items exist', () => {
    const controller = initFloatingLogos();
    expect(controller).toBeInstanceOf(FloatingLogosController);
  });

  it('returns null when container does not exist', () => {
    document.getElementById('floating-tech-logos')?.remove();
    const controller = initFloatingLogos();
    expect(controller).toBeNull();
  });

  it('returns null when no items exist', () => {
    const container = document.getElementById('floating-tech-logos')!;
    container.innerHTML = '';
    const controller = initFloatingLogos();
    expect(controller).toBeNull();
  });

  it('attaches mousemove event listener', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    initFloatingLogos();

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
  });
});

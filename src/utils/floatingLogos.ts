export interface FloatingLogosConfig {
  container: HTMLElement;
  items: NodeListOf<HTMLElement>;
}

export class FloatingLogosController {
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private ticking = false;
  private itemDepths: number[];
  private animationFrameId?: number;

  constructor(private config: FloatingLogosConfig) {
    this.itemDepths = Array.from(config.items).map((_, index) => (index % 3) + 1);
  }

  updateTransforms = () => {
    this.currentX += (this.mouseX - this.currentX) * 0.05;
    this.currentY += (this.mouseY - this.currentY) * 0.05;

    this.config.items.forEach((item, index) => {
      const depth = this.itemDepths[index];
      const moveX = (this.currentX * depth) / 50;
      const moveY = (this.currentY * depth) / 50;

      item.style.transform = `translate3d(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px), 0) rotate(var(--rotation))`;
    });

    this.ticking = false;
  };

  animate = () => {
    if (!this.ticking) {
      this.animationFrameId = requestAnimationFrame(this.updateTransforms);
      this.ticking = true;
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    this.mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    this.mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    this.animate();
  };

  startInitialAnimation = () => {
    const initialAnimate = () => {
      this.updateTransforms();
      this.animationFrameId = requestAnimationFrame(initialAnimate);
    };
    initialAnimate();
  };

  destroy = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  };
}

export function initFloatingLogos(): FloatingLogosController | null {
  const container = document.getElementById('floating-tech-logos');
  const items = container?.querySelectorAll('.tech-float-item') as NodeListOf<HTMLElement>;

  if (container && items.length > 0) {
    const controller = new FloatingLogosController({ container, items });
    document.addEventListener('mousemove', controller.handleMouseMove);
    controller.startInitialAnimation();
    return controller;
  }

  return null;
}

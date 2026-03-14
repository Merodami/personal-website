import { useAppStore } from '@stores/appStore';
import { themeUtils } from '@utils/theme';

export interface ThemeToggleConfig {
  toggleButton: HTMLElement;
}

export class ThemeToggleController {
  private handleClick: () => void;

  constructor(private config: ThemeToggleConfig) {
    this.handleClick = () => {
      const store = useAppStore;
      store.getState().toggleTheme();
    };

    this.config.toggleButton.addEventListener('click', this.handleClick);
  }

  destroy() {
    this.config.toggleButton.removeEventListener('click', this.handleClick);
  }
}

export function initThemeToggle(): ThemeToggleController | null {
  // Initialize theme
  themeUtils.initTheme();

  // Wait for DOM content to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('theme-toggle');
      if (toggle) {
        return new ThemeToggleController({ toggleButton: toggle });
      }
      return null;
    });
  } else {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      return new ThemeToggleController({ toggleButton: toggle });
    }
  }

  return null;
}

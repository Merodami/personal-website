import type { DynamicI18n } from '@utils/dynamicI18n';

declare global {
  interface Window {
    dynamicI18n: DynamicI18n;
  }
}

export {};
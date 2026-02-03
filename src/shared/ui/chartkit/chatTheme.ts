import type { Theme } from '@/types/app';

export const setCharKitTheme = (theme: Theme) => {
  return theme === 'light' ? 'silver' : 'slate';
};

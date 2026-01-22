import type { SettingsContextType } from '@/types/app';
import { createContext } from 'react';

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

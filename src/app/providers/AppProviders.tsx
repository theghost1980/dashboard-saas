import type { ReactNode } from 'react';
import { SettingsProvider } from './SettingsProvider';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <SettingsProvider>{children}</SettingsProvider>;
}

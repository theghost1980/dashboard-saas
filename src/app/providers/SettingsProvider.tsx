import type { AppSettings, SettingChangeHandler } from '@/types/app';
import { useEffect, useState, type ReactNode } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { DEFAULT_SETTINGS } from '@/shared/config/config';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const storedSettings = localStorage.getItem('appSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  const handleSettingChange: SettingChangeHandler = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, handleSettingChange }}>
      {children}
    </SettingsContext.Provider>
  );
}

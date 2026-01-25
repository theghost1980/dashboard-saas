import type { AppSettings, SettingChangeHandler } from '@/types/app';
import { useEffect, useState, type ReactNode } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { DEFAULT_SETTINGS } from '@/shared/config/config';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const storedSettings = localStorage.getItem('appSettings');
    try {
      if (storedSettings) {
        return JSON.parse(storedSettings);
      } else {
        return DEFAULT_SETTINGS;
      }
    } catch (error) {
      return DEFAULT_SETTINGS;
    }
  });

  const handleSettingChange: SettingChangeHandler = (key, value) => {
    setSettings((prevSettings) => {
      const next = { ...prevSettings, [key]: value };
      localStorage.setItem('appSettings', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    document.body.dataset.theme = settings.theme;
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, handleSettingChange }}>
      {children}
    </SettingsContext.Provider>
  );
}

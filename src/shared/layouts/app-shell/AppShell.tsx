import styles from './AppShell.module.css';
import type { DataSource } from '@/types/app';
import { Outlet } from 'react-router';
import { useSettings } from '@/app/context/hooks/useSettings';
import { useEffect, useState } from 'react';
import { useDimensions } from '@/shared/hooks/useDimensions';
import { MenuDesktop } from '@/shared/ui/handcrafted/appmenu/dekstop/Menu-desktop';

type Props = {
  title: string;
};

export function AppShell({ title }: Props) {
  const { settings, handleSettingChange } = useSettings();
  const [sideBarHidden, setSideBarHidden] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { w } = useDimensions();

  useEffect(() => {
    if (!w || w === 0) return;
    console.log(w); //TODO REM
    setShowMobileMenu(w <= 700);
  }, [w]);

  return (
    <div
      className={`${styles.shell} ${sideBarHidden ? styles.shellCollapsed : ''}`}
    >
      {showMobileMenu ? (
        <p>Mobile //TODO</p>
      ) : (
        <MenuDesktop
          sideBarHidden={sideBarHidden}
          setSideBarHidden={() => setSideBarHidden(!sideBarHidden)}
        />
      )}
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.headerMedium}>
            <label htmlFor="data-source-selector">Origen de Datos:</label>
            <select
              id="data-source-selector"
              className={styles.select}
              value={settings.dataSource}
              onChange={(e) =>
                handleSettingChange('dataSource', e.target.value as DataSource)
              }
            >
              <option value={'jsonplaceholder'}>JSONPlaceHolder</option>
              <option value={'dummyjson'}>DummyJSON</option>
            </select>
          </div>

          <div className={styles.headerRight}>
            <button
              className={styles.userButton}
              type="button"
              aria-label="Abrir menú de usuario"
            >
              <img
                src={'vite.svg'}
                className={styles.avatar}
                aria-hidden="true"
              />
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

import styles from './AppShell.module.css';
import type { DataSource } from '@/types/app';
import { Outlet } from 'react-router';
import { useSettings } from '@/app/context/hooks/useSettings';
import { useState } from 'react';
import { MenuDesktop } from '@/shared/ui/handcrafted/appmenu/dekstop/Menu-desktop';
import { MenuMobile } from '@/shared/ui/handcrafted/appmenu/mobile/Menu-mobile';
import { useDrawer } from '@/shared/hooks/useDrawer';

type Props = {
  title: string;
};

export function AppShell({ title }: Props) {
  const { settings, handleSettingChange } = useSettings();
  const [sideBarHidden, setSideBarHidden] = useState(false);
  const { isMobile, isOpen, open, close } = useDrawer();

  return (
    <div
      className={`${styles.shell} ${sideBarHidden ? styles.shellCollapsed : ''} ${
        isMobile ? styles.shellMobile : ''
      }`}
    >
      {isMobile ? (
        <MenuMobile
          open={isOpen}
          onClose={close}
          title="SaaS Dashboard"
          dataSource={settings.dataSource}
          onChangeDataSource={(v) => handleSettingChange('dataSource', v)}
        />
      ) : (
        <MenuDesktop
          sideBarHidden={sideBarHidden}
          setSideBarHidden={() => setSideBarHidden(!sideBarHidden)}
        />
      )}

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {isMobile && (
              <button
                type="button"
                className={styles.hamburger}
                aria-label="Abrir menú"
                onClick={open}
              >
                ☰
              </button>
            )}
            <h1 className={styles.title}>{title}</h1>
          </div>

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

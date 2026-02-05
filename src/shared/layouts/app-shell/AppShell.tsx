import styles from './AppShell.module.css';
import type { DataSource } from '@/types/app';
import { Outlet, useLocation } from 'react-router';
import { useSettings } from '@/app/context/hooks/useSettings';
import { useEffect, useState } from 'react';
import { useDimensions } from '@/shared/hooks/useDimensions';
import { MenuDesktop } from '@/shared/ui/handcrafted/appmenu/dekstop/Menu-desktop';
import { MenuMobile } from '@/shared/ui/handcrafted/appmenu/mobile/Menu-mobile';

type Props = {
  title: string;
};

export function AppShell({ title }: Props) {
  const { settings, handleSettingChange } = useSettings();
  const [sideBarHidden, setSideBarHidden] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { w } = useDimensions();
  const location = useLocation();

  useEffect(() => {
    if (!w || w === 0) return;
    const isMobile = w <= 700;
    setShowMobileMenu(isMobile);

    if (!isMobile) setMobileOpen(false);
  }, [w]);

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div
      className={`${styles.shell} ${sideBarHidden ? styles.shellCollapsed : ''} ${
        showMobileMenu ? styles.shellMobile : ''
      }`}
    >
      {showMobileMenu ? (
        <MenuMobile
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
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
            {showMobileMenu && (
              <button
                type="button"
                className={styles.hamburger}
                aria-label="Abrir menú"
                onClick={() => setMobileOpen(true)}
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

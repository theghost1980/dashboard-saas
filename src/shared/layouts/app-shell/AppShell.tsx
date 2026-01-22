import styles from './AppShell.module.css';
import type { DataSource } from '@/types/app';
import type { NavItem } from '@/types/navigation';
import { NavLink, Outlet } from 'react-router';
import { useSettings } from '@/app/context/hooks/useSettings';

type Props = {
  title: string;
  navItems: NavItem[];
};

export function AppShell({ title, navItems }: Props) {
  const { settings, handleSettingChange } = useSettings();

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Saltar al contenido
      </a>
      <aside className={styles.sidebar} aria-label="Barra lateral">
        <div className={styles.brand}>SaaS Dashboard</div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.linkTo} className={styles.navListItem}>
                <NavLink to={item.linkTo}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

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
              <span className={styles.avatar} aria-hidden="true" />
            </button>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

import { type ReactNode } from 'react';
import styles from './AppShell.module.css';
import type { DataSource } from '@/types/app';

type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type Props = {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
  dataSource: DataSource;
  onDataSourceChange: (next: DataSource) => void;
};

export function AppShell({
  title,
  navItems,
  children,
  dataSource,
  onDataSourceChange,
}: Props) {
  return (
    <div className={styles.shell}>
      {/* Skip link: aparece al tabular */}
      <a className={styles.skipLink} href="#main-content">
        Saltar al contenido
      </a>
      <aside className={styles.sidebar} aria-label="Barra lateral">
        <div className={styles.brand}>SaaS Dashboard</div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navListItem}>
                <a
                  className={styles.navItem}
                  href={item.href}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className={styles.content}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.headerMedium}>
              <label htmlFor="data-source-selector">Origen de Datos:</label>
              <select
                id="data-source-selector"
                className={styles.select}
                value={dataSource}
                onChange={(e) =>
                  onDataSourceChange(e.target.value as DataSource)
                }
              >
                <option value={'jsonplaceholder'}>JSONPlaceHolder</option>
                <option value={'dummyjson'}>DummyJSON</option>
              </select>
            </div>

            <div className={styles.headerRight}>
              <button className={styles.button} type="button">
                New
              </button>

              {/* En vez de un div, un button real (teclado + lector) */}
              <button
                className={styles.userButton}
                type="button"
                aria-label="Abrir menú de usuario"
              >
                <span className={styles.avatar} aria-hidden="true" />
              </button>
            </div>
          </header>
        </div>

        <main id="main-content" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}

import { NavLink } from 'react-router';
import styles from './Menu-mobile.module.css';
import { navItems } from '@/shared/config/navitems';
import type { DataSource } from '@/types/app';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  dataSource: DataSource;
  onChangeDataSource: (value: DataSource) => void;
};

export function MenuMobile({
  open,
  onClose,
  title = 'SaaS Dashboard',
  dataSource,
  onChangeDataSource,
}: Props) {
  if (!open) return null;

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <button
        className={styles.overlay}
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
      />

      <aside className={styles.panel}>
        <header className={styles.panelHeader}>
          <div className={styles.brand}>{title}</div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </header>

        <a className={styles.skipLink} href="#main-content" onClick={onClose}>
          Saltar al contenido
        </a>

        <div className={styles.section}>
          <label className={styles.label} htmlFor="data-source-selector-mobile">
            Origen de Datos:
          </label>
          <select
            id="data-source-selector-mobile"
            className={styles.select}
            value={dataSource}
            onChange={(e) => onChangeDataSource(e.target.value as DataSource)}
          >
            <option value="jsonplaceholder">JSONPlaceHolder</option>
            <option value="dummyjson">DummyJSON</option>
          </select>
        </div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.linkTo} className={styles.navListItem}>
                <NavLink
                  className={styles.navItem}
                  to={item.linkTo}
                  onClick={onClose}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

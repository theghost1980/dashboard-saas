import { NavLink } from 'react-router';
import styles from './Menu-desktop.module.css';
import { navItems } from '@/shared/config/navitems';

interface Props {
  sideBarHidden: boolean;
  setSideBarHidden: () => void;
}

export function MenuDesktop({ sideBarHidden, setSideBarHidden }: Props) {
  return (
    <div
      className={`${sideBarHidden ? styles.hideSideBar : styles.showSideBar}`}
    >
      <a className={styles.skipLink} href="#main-content">
        Saltar al contenido
      </a>
      <aside className={styles.sidebar} aria-label="Barra lateral">
        <div className={styles.brand}>SaaS Dashboard</div>

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.linkTo} className={styles.navListItem}>
                <NavLink className={styles.navItem} to={item.linkTo}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <button
        className={styles.toogleViewBtn}
        onClick={() => setSideBarHidden()}
      >
        {sideBarHidden ? '>' : '<'}
      </button>
    </div>
  );
}

import { NavLink } from 'react-router';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <p className={styles.notFoundText}>La página que busca no existe.</p>
      <NavLink className={styles.boton} to="/">
        Volver al inicio
      </NavLink>
    </div>
  );
}

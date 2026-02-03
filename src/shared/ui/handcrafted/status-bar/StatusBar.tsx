import { getCustomerValue } from '@/shared/utils/utils';
import styles from './StatusBar.module.css';
import { useNow } from '@/shared/hooks/useNow';
import type { DataSource } from '@/types/app';

interface Props {
  status: 'idle' | 'loading' | 'success' | 'error';
  title: string;
  dataSource: DataSource;
  subTitle?: string;
  errorMessage?: string;
  onRetry?: () => void;
  lastUpdated?: Date;
}

export function StatusBar({
  status,
  errorMessage,
  onRetry,
  lastUpdated,
  title,
  dataSource,
  subTitle,
}: Props) {
  const now = useNow(60_000);

  const getMinutesAgo = (now: Date, lastUpdated: Date) => {
    return getCustomerValue.getlastUpdateMinutesFromNow(now, lastUpdated);
  };

  if (status === 'idle') return null;

  return (
    <div className={styles.statusBar}>
      {status === 'loading' && (
        <span className={styles.loader} role="status" aria-label="Cargando" />
      )}
      {status === 'error' && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
          {onRetry && (
            <button className={styles.retryButton} onClick={onRetry}>
              Reintentar
            </button>
          )}
        </div>
      )}
      {status === 'success' && lastUpdated && (
        <div className={styles.statusContainer}>
          <div>
            <div className={styles.statusRight}>
              <h2 className={styles.title}>{title}</h2>
              <span className={styles.badgeSmall}>{dataSource}</span>
            </div>
            {subTitle && <p className={styles.subtitle}>{subTitle}</p>}
          </div>
          <div className={styles.success}>
            actualizado hace:
            {getMinutesAgo(now, lastUpdated)} minuto(s)
          </div>
        </div>
      )}
    </div>
  );
}

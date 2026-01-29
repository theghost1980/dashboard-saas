import { getCustomerValue } from '@/shared/utils/utils';
import styles from './StatusBar.module.css';
import { useNow } from '@/shared/hooks/useNow';

interface Props {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
  onRetry?: () => void;
  lastUpdated?: Date;
}

export function StatusBar({
  status,
  errorMessage,
  onRetry,
  lastUpdated,
}: Props) {
  if (status === 'idle') return null;

  const now = useNow(60_000);

  const getMinutesAgo = (now: Date, lastUpdated: Date) => {
    return getCustomerValue.getlastUpdateMinutesFromNow(now, lastUpdated);
  };

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
        <div className={styles.success}>
          actualizado hace:
          {getMinutesAgo(now, lastUpdated)} minuto(s)
        </div>
      )}
    </div>
  );
}

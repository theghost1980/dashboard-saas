import styles from './StatusBar.module.css';

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

  return (
    <div className={styles.statusBar}>
      {status === 'loading' && (
        <span className={styles.loader} aria-busy="true"></span>
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
        <div className={styles.success}>{lastUpdated?.toDateString()}</div>
      )}
    </div>
  );
}

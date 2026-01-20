import type { ReactNode } from 'react';
import styles from './ShimmerOverlay.module.css';

interface Props {
  children: ReactNode;
  isLoading: boolean;
  loadingText?: string;
}

export function ShimmerOverlay({ children, isLoading, loadingText }: Props) {
  return (
    <div className={styles.shimmerContainer}>
      {children}
      {isLoading && (
        <div className={styles.shimmerOverlay}>
          {loadingText && <span className={styles.text}>{loadingText}</span>}
        </div>
      )}
    </div>
  );
}

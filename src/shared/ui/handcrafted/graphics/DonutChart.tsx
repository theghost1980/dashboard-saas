import styles from './DonusChart.module.css';

type Props = {
  value: number;
  label: string;
  delta?: number;
  deltaLabel?: string;
};

/**
 * @param value number bewteen 0 and 1
 * @param delta (optional)  ej: 0.12 = +12%
 * @param deltaLabel (optional)  ej: "vs ayer"
 */
export function DonutChart({ value, label, delta, deltaLabel }: Props) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, value)) * c;

  const deltaPct = delta ? Math.round(delta * 100) : null;
  const isPositive = deltaPct !== null && deltaPct >= 0;

  return (
    <div className={styles.donusChart}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <g transform="rotate(-90 24 24)">
          <circle
            cx="24"
            cy="24"
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="8"
          />
          <circle
            className={styles.circle}
            cx="24"
            cy="24"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div className={styles.labels}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{Math.round(value * 100)}%</div>

        {deltaPct !== null && (
          <div
            className={`${styles.delta} ${
              isPositive ? styles.deltaUp : styles.deltaDown
            }`}
          >
            {isPositive ? '▲' : '▼'} {Math.abs(deltaPct)}%{' '}
            {deltaLabel ?? 'vs período anterior'}
          </div>
        )}
      </div>
    </div>
  );
}

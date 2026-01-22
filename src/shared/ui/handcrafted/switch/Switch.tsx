import styles from './Switch.module.css';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  labels: {
    on: string;
    off: string;
  };
  onClick?: () => void;
  disabled?: boolean;
  overwriteContainerClassName?: string;
}

export function Switch({
  label,
  labels,
  checked,
  onChange,
  onClick,
  disabled,
  overwriteContainerClassName,
}: Props) {
  return (
    <label className={overwriteContainerClassName ?? styles.switchContainer}>
      <span className={styles.labelSpan}>
        {label} {`${checked ? labels.on : labels.off}`}
      </span>
      <div>
        <input
          disabled={disabled}
          hidden
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onClick={onClick}
        />
        <span className={styles.slider} />
      </div>
    </label>
  );
}

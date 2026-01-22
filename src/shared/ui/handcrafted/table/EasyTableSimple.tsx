import type { InternalCustomer } from '@/types/app';
import styles from './EasyTable.module.css';
import { columns } from './EasyTableColumns';
import { renderRow } from './utils/EasyTableFuntions';

interface Props {
  customers: InternalCustomer[];
}

export function EasyTableSimple({ customers }: Props) {
  const gridTemplateColumns = columns.map((c) => c.width).join(' ');
  if (customers.length === 0) {
    return (
      <section>
        <div className={styles.tableShell}>
          <div className={styles.empty}>No customers</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={styles.tableShell}>
        <div
          className={styles.headerRow}
          style={{ gridTemplateColumns }}
          role="row"
        >
          {columns.map((col) => (
            <div
              key={col.key}
              className={styles.headerCell}
              style={{ textAlign: col.align ?? 'left' }}
              role="columnheader"
            >
              {col.header}
            </div>
          ))}
        </div>

        <div className={styles.bodyScroll} role="rowgroup">
          {customers.map((c) =>
            renderRow(c, columns, gridTemplateColumns, styles),
          )}
        </div>
      </div>
    </section>
  );
}

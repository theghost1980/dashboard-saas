import type { InternalCustomer } from '@/types/app';
import type { Column } from '../EasyTableColumns';

export const renderRow = (
  c: InternalCustomer,
  columns: Column<InternalCustomer>[],
  gridTemplateColumns: string,
  styles: CSSModuleClasses,
  rowHeight?: number,
) => (
  <div
    key={c.id}
    className={styles.dataRow}
    style={{ gridTemplateColumns, height: rowHeight }}
    role="row"
  >
    {columns.map((col) => (
      <div
        key={col.key}
        className={styles.dataCell}
        style={{ textAlign: col.align ?? 'left' }}
        role="cell"
      >
        {col.cell(c)}
      </div>
    ))}
  </div>
);

import type { InternalCustomer } from '@/types/app';
import styles from './EasyTable.module.css';
import React from 'react';
import { columns } from './EasyTableColumns';
import { useVirtualRows } from './hooks/useVirtualRows';
import { renderRow } from './utils/EasyTableFuntions';

interface Props {
  customers: InternalCustomer[];
  virtualize: boolean;
  resetKey?: string | number;
}

export function EasyTableVirtualized({
  customers,
  virtualize,
  resetKey,
}: Props) {
  const gridTemplateColumns = columns.map((c) => c.width).join(' ');
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const effectiveResetKey = resetKey ?? customers.length;

  const virtual = useVirtualRows({
    itemsCount: customers.length,
    scrollRef,
    resetKey: effectiveResetKey,
    rowHeight: 52,
    overscan: 9,
  });

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

        <div
          ref={scrollRef}
          className={styles.bodyScroll}
          onScroll={virtualize ? virtual!.onScroll : undefined}
          role="rowgroup"
        >
          <div style={{ height: virtual!.totalHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${virtual.offsetY}px)` }}>
              {customers
                .slice(virtual.startIndex, virtual.endIndex + 1)
                .map((c) =>
                  renderRow(
                    c,
                    columns,
                    gridTemplateColumns,
                    styles,
                    virtual.rowHeight,
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

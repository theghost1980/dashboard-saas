import type { InternalCustomer, Sort, SortKey } from '@/types/app';
import styles from './EasyTable.module.css';
import React, { useMemo } from 'react';
import { columns } from './EasyTableColumns';
import { useVirtualRows } from './hooks/useVirtualRows';
import { renderRow } from './utils/EasyTableFuntions';
import { useDimensions } from '@/shared/hooks/useDimensions';

interface Props {
  customers: InternalCustomer[];
  virtualize: boolean;
  sort?: Sort;
  onSort?: (key: SortKey) => void;
  resetKey?: string | number;
}

export function EasyTableVirtualized({
  customers,
  virtualize,
  resetKey,
  onSort,
  sort,
}: Props) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const effectiveResetKey = resetKey ?? customers.length;

  const { w } = useDimensions();

  const visibleColumns = useMemo(() => {
    const maxPriorityVisible = w < 700 ? 1 : w < 800 ? 2 : 3;
    return columns.filter((c) => c.priority < maxPriorityVisible);
  }, [w]);

  const gridTemplateColumns = visibleColumns.map((c) => c.width).join(' ');

  const virtual = useVirtualRows({
    itemsCount: customers.length,
    scrollRef,
    resetKey: effectiveResetKey,
    rowHeight: 52,
    overscan: 9,
  });

  const handleSortClick = (sortKey?: SortKey) => {
    if (!sortKey || !onSort) return;
    onSort(sortKey);
  };

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
          {visibleColumns.map((col) => (
            <div
              key={col.key}
              className={styles.headerCell}
              style={{
                textAlign: col.align ?? 'left',
                cursor: col.sortKey ? 'pointer' : 'default',
              }}
              role="columnheader"
              onClick={() => handleSortClick(col.sortKey)}
            >
              {col.header}{' '}
              {col.sortKey &&
                (sort?.order === 'asc' && col.sortKey === sort?.key
                  ? '↑'
                  : '↓')}
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
                    visibleColumns,
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

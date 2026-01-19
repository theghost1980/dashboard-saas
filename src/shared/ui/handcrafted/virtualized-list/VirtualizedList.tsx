import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './VirtualizedList.module.css';

type VirtualizedListProps<T> = {
  itemHeight: number;
  containerHeight: number;
  overscan: number;
  list: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
};

export function VirtualizedList<T>({
  itemHeight,
  containerHeight,
  overscan,
  list,
  getKey,
  renderItem,
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [indexes, setIndexes] = useState({
    start: 0,
    end: 0,
  });

  const calculateVisibleItems = (contRef: React.RefObject<any>) => {
    if (contRef.current) {
      const scrollTop = contRef.current?.scrollTop;
      const rawStart = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(containerHeight / itemHeight);
      const rawEnd = rawStart + visibleCount - 1;
      const start = Math.max(0, rawStart - overscan);
      const end = Math.min(list.length - 1, rawEnd + overscan);

      if (start === indexes.start && end === indexes.end) return;

      setIndexes({ start, end });
    }
  };

  useEffect(() => {
    calculateVisibleItems(containerRef);
  }, [list.length]);

  return (
    <div
      className={styles.container}
      style={
        {
          '--vh': `${containerHeight}px`,
          '--itemH': `${itemHeight}px`,
          '--totalH': `${list.length * itemHeight}px}`,
        } as React.CSSProperties
      }
      onScroll={(_e) => calculateVisibleItems(containerRef)}
      ref={containerRef}
    >
      <div className={styles.inner}>
        {list.slice(indexes.start, indexes.end + 1).map((item, index) => {
          const realIndex = indexes.start + index;
          return (
            <div
              className={styles.row}
              key={getKey(item)}
              style={
                {
                  '--top': `${realIndex * itemHeight}px`,
                } as React.CSSProperties
              }
            >
              {renderItem(item, realIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';

interface Props {
  itemsCount: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  resetKey: string | number;
  rowHeight?: number;
  overscan?: number;
}

export function useVirtualRows({
  itemsCount,
  scrollRef,
  resetKey,
  rowHeight = 52,
  overscan = 9,
}: Props) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => setViewportHeight(el.clientHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [scrollRef]);

  React.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTop = 0;
    setScrollTop(0);
  }, [resetKey, scrollRef]);

  const onScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
  }, [scrollRef]);

  const totalHeight = itemsCount * rowHeight;

  if (itemsCount === 0) {
    return {
      startIndex: 0,
      endIndex: -1,
      totalHeight: 0,
      offsetY: 0,
      visibleCount: 0,
      onScroll,
      rowHeight,
    };
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    itemsCount - 1,
    Math.floor((scrollTop + viewportHeight) / rowHeight) + overscan,
  );

  const offsetY = startIndex * rowHeight;
  const visibleCount = endIndex - startIndex + 1;

  return {
    startIndex,
    endIndex,
    totalHeight,
    offsetY,
    visibleCount,
    onScroll,
    rowHeight,
  };
}

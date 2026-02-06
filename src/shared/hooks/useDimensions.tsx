import { useEffect, useState } from 'react';

type Dimensions = {
  w: number;
  h: number;
};

function getViewport(): Dimensions {
  if (typeof window === 'undefined') return { w: 0, h: 0 };
  return { w: window.innerWidth, h: window.innerHeight };
}

/**
 * Returns current viewport dimensions (w,h) in pixels.
 * - Initializes with the correct viewport size
 * - Throttles resize updates using requestAnimationFrame
 * - Avoids redundant state updates
 */
export const useDimensions = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>(() => getViewport());

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const next = getViewport();

      setDimensions((prev) => {
        if (prev.w === next.w && prev.h === next.h) return prev;
        return next;
      });
    };

    const onResize = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return dimensions;
};

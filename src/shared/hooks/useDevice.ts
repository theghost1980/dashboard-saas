import { useEffect, useState } from 'react';

type DeviceInfo = {
  isMobile: boolean;
  isTouch: boolean;
  width: number;
};

/**
 * note: SSR safe fallback
 */
function getInitialDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTouch: false, width: 0 };
  }

  const width = window.innerWidth;

  const isTouch =
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches;

  const isMobile = isTouch || width < 900;

  return { isMobile, isTouch, width };
}

export const useDevice = (): DeviceInfo => {
  const [device, setDevice] = useState<DeviceInfo>(() => getInitialDevice());

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;

      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches;

      const isMobile = isTouch || width < 900;

      setDevice((prev) => {
        if (
          prev.width === width &&
          prev.isMobile === isMobile &&
          prev.isTouch === isTouch
        ) {
          return prev;
        }
        return { width, isMobile, isTouch };
      });
    };

    window.addEventListener('resize', onResize, { passive: true });

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return device;
};

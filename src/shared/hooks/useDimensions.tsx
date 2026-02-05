import { useEffect, useState } from 'react';

/**
 *
 * @returns dimensions w,h en pixels
 */
export const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    function handleOnResize() {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleOnResize);
    return () => {
      window.removeEventListener('resize', handleOnResize);
    };
  }, [dimensions.w, dimensions.h]);

  return dimensions;
};

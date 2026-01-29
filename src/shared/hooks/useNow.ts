import { useEffect, useState } from 'react';

export function useNow(tickMs: number = 60000) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, tickMs);

    return () => {
      window.clearInterval(id);
    };
  }, [tickMs]);

  return now;
}

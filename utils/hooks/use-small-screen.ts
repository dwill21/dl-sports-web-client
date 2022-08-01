import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

export function useSmallScreen(): boolean | null {
  const [smallScreen, setSmallScreen] = useState<boolean | null>(null);
  const handleWindowResize = () => setSmallScreen(window.innerWidth < 768);
  const debouncedResizeHandler = useMemo(() => debounce(handleWindowResize, 300), []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', debouncedResizeHandler as EventListener);
    return () => {
      debouncedResizeHandler.cancel();
      window.removeEventListener('resize', debouncedResizeHandler as EventListener);
    }
  }, [debouncedResizeHandler]);

  return smallScreen;
}

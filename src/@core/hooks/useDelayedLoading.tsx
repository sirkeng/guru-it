// src/hooks/useDelayedLoading.tsx
import { useState, useEffect } from 'react';

export const useDelayedLoading = (delay: number) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};

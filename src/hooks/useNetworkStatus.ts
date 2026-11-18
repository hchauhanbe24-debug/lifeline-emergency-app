import { useState, useEffect } from 'react';

export function useNetworkStatus() {
  const [realOnline, setRealOnline] = useState<boolean>(navigator.onLine);
  const [simulatedOffline, setSimulatedOffline] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setRealOnline(true);
    const handleOffline = () => setRealOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isEffectiveOnline = realOnline && !simulatedOffline;

  const toggleOfflineSimulation = () => {
    setSimulatedOffline(prev => !prev);
  };

  return {
    isOnline: isEffectiveOnline,
    realOnline,
    simulatedOffline,
    toggleOfflineSimulation,
    setSimulatedOffline
  };
}

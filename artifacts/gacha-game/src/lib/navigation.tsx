import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';

interface NavigationContextValue {
  go: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const pendingPath = useRef('/');

  const go = useCallback((path: string) => {
    pendingPath.current = path;
    setLoading(true);
  }, []);

  const handleDone = useCallback(() => {
    setLoading(false);
    navigate(pendingPath.current);
  }, [navigate]);

  return (
    <NavigationContext.Provider value={{ go }}>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" onDone={handleDone} />}
      </AnimatePresence>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNav must be used within NavigationProvider');
  return ctx;
}

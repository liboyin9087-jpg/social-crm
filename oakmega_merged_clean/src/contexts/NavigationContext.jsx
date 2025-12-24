import React, { createContext, useState, useCallback } from 'react';

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [stack, setStack] = useState([{ screen: 'dashboard', params: {} }]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState('push');

  const push = useCallback((screen, params = {}) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTransitionType('push');
    setStack(prev => [...prev, { screen, params }]);
    setTimeout(() => setIsTransitioning(false), 350);
  }, [isTransitioning]);

  const pop = useCallback(() => {
    if (isTransitioning || stack.length <= 1) return;
    setIsTransitioning(true);
    setTransitionType('pop');
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, stack.length]);

  const replace = useCallback((screen, params = {}) => {
    setStack([{ screen, params }]);
  }, []);

  const reset = useCallback((screen, params = {}) => {
    setStack([{ screen, params }]);
  }, []);

  const currentScreen = stack[stack.length - 1];
  const previousScreen = stack.length > 1 ? stack[stack.length - 2] : null;
  const canGoBack = stack.length > 1;

  return (
    <NavigationContext.Provider value={{
      push, pop, replace, reset,
      currentScreen, previousScreen, canGoBack,
      isTransitioning, transitionType, stack
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

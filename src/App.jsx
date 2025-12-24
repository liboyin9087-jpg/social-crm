import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { useAuth } from './contexts/AuthContext';
import { useNavigation } from './hooks/useNavigation';
import { Navigation } from './components/layout/Navigation';
import { ScreenLogin } from './screens/ScreenLogin';
import { ScreenDashboard } from './screens/ScreenDashboard';
import { ScreenModuleHub } from './screens/ScreenModuleHub';
import ScreenModules from './screens/ScreenModules';
import { ScreenOMA } from './screens/ScreenOMA';
import { ScreenPlayground } from './screens/ScreenPlayground';
import { ScreenRewards } from './screens/ScreenRewards';

const AppContent = () => {
  const { user, loading } = useAuth();
  const { currentScreen, push } = useNavigation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f0f1a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00E5A0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/50">載入中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ScreenLogin />;
  }

  const activeScreen = currentScreen?.screen || 'dashboard';

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <ScreenDashboard />;
      case 'moduleHub':
        return <ScreenModuleHub />;
      case 'modules':
        return <ScreenModules />;
      case 'oma':
        return <ScreenOMA />;
      case 'playground':
        return <ScreenPlayground />;
      case 'rewards':
        return <ScreenRewards />;
      default:
        return <ScreenDashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f0f1a]">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <Navigation currentScreen={activeScreen} onNavigate={push} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AuthProvider>
  );
}

export default App;

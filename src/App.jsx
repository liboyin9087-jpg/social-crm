import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { isPreviewMode } from './utils/preview';

// --- 引入元件 ---
import { Navigation } from './components/layout/Navigation'; // 手機版底部導航
import { Sidebar } from './components/layout/Sidebar';       // 桌面版側邊欄
import { Loading } from './components/ui/Loading';           // 載入動畫 (若無此檔案請使用簡單 div)

// --- 引入頁面 ---
import { ScreenLogin } from './screens/ScreenLogin';
import { ScreenDashboard } from './screens/ScreenDashboard';
import { ScreenInbox } from './screens/ScreenInbox';         // 確保你有建立此檔案，否則請先註解掉
import { ScreenModuleHub } from './screens/ScreenModuleHub';
import ScreenModules from './screens/ScreenModules';
import { ScreenOMA } from './screens/ScreenOMA';
import { ScreenPlayground } from './screens/ScreenPlayground';
import { ScreenRewards } from './screens/ScreenRewards';

// 引入 Icons
import { 
  IconOakMega, 
  IconAnalytics, 
  IconModules, 
  IconGamepad, 
  IconCoupon,
  IconMessageSquare 
} from './components/icons';

const AppContent = () => {
  const { user, loading } = useAuth();
  const { currentScreen, push } = useNavigation();

  // 定義側邊欄選單
  const navItems = [
    { id: 'dashboard', label: '總覽', icon: IconOakMega },
    { id: 'inbox', label: '收件匣', icon: IconMessageSquare },
    { id: 'oma', label: 'OMA 追蹤', icon: IconAnalytics },
    { id: 'moduleHub', label: '模組中心', icon: IconModules },
    { id: 'playground', label: '遊樂場', icon: IconGamepad },
    { id: 'rewards', label: '優惠券', icon: IconCoupon },
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-oak-canvas">
        <div className="text-oak-soul animate-pulse font-bold">Loading OakMega...</div>
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
      case 'inbox':
        return <ScreenInbox />;
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
    // 關鍵優化：背景改為 bg-oak-canvas (紙白)，文字改為 oak-text (深灰)
    <div className="flex h-screen bg-oak-canvas text-oak-text font-sans overflow-hidden transition-colors duration-500">
      
      {/* 桌面版側邊欄 */}
      <div className="hidden md:block flex-shrink-0 z-50 h-full">
        <Sidebar 
          activePath={activeScreen} 
          navItems={navItems}
          onNavigate={(screen) => push(screen)} 
        />
      </div>

      {/* 主內容區 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scrollbar-hide p-0">
            {renderScreen()}
        </div>

        {/* 行動版底部導航 */}
        <div className="md:hidden z-50">
           <Navigation currentScreen={activeScreen} onNavigate={push} />
        </div>
      </div>
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
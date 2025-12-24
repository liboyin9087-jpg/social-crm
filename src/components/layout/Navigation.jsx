import React from 'react';
import { IconHome, IconModules, IconAnalytics, IconCoupon, IconArrowLeft } from '../icons';
import { useNavigation } from '../../hooks/useNavigation';

export const NavigationHeader = ({ title, subtitle, darkMode = true }) => {
  const { canGoBack, pop } = useNavigation();

  return (
    <div className={`px-6 pt-8 pb-4 ${darkMode ? 'bg-[#0f0f1a]/95' : 'bg-[#FAF9F6]/95'} backdrop-blur-md sticky top-0 z-20`}>
      <div className="flex items-center gap-4">
        {canGoBack && (
          <button
            onClick={pop}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              darkMode 
                ? 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <IconArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1">
          <h2 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
          {subtitle && <p className={`text-sm mt-0.5 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export const BottomNav = ({ active, setScreen }) => {
  const navs = [
    { id: 'dashboard', Icon: IconHome, label: '首頁' },
    { id: 'moduleHub', Icon: IconModules, label: '模組' },
    { id: 'oma', Icon: IconAnalytics, label: 'OMA' },
    { id: 'rewards', Icon: IconCoupon, label: '優惠' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex justify-around items-center rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.3)] z-50">
      {navs.map(n => {
        const isActive = active === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setScreen(n.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              isActive ? 'bg-emerald-500/10' : 'hover:bg-white/5'
            }`}
          >
            <n.Icon size={22} active={isActive} />
            <span className={`text-[10px] font-semibold transition-colors ${
              isActive ? 'text-emerald-400' : 'text-white/40'
            }`}>
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const Navigation = ({ currentScreen, onNavigate }) => {
  return <BottomNav active={currentScreen} setScreen={onNavigate} />;
};

import React, { useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { injectGameStyles } from '../styles/gameStyles';
import { IconArrowLeft, IconStar, IconSparkle, IconGift } from '../components/icons';

const GameSection = ({ title, subtitle, icon: Icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7E57FF] to-[#9F7AFF] flex items-center justify-center shadow-lg shadow-[#7E57FF]/30">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="font-black text-white text-lg">{title}</h3>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

export const ScreenPlayground = () => {
  const { pop } = useNavigation();

  useEffect(() => {
    injectGameStyles();
  }, []);

  return (
    <div className="h-full bg-gradient-to-b from-[#0f0f1a] to-[#151525] overflow-y-auto scrollbar-hide">
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <button 
            onClick={pop} 
            className="w-10 h-10 bg-[#1a1a2e] rounded-full flex items-center justify-center border border-white/10 hover:border-[#00E5A0]/50 transition-colors"
          >
            <IconArrowLeft size={20} className="text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white">遊戲樂園</h1>
            <p className="text-white/50 text-sm">互動遊戲體驗中心</p>
          </div>
        </div>

        {/* 遊戲次數統計卡片 */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#1e1e32] rounded-2xl p-4 border border-white/5 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFB74D] to-[#FF8F00] flex items-center justify-center shadow-lg shadow-[#FFB74D]/20">
                <IconSparkle size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/50">今日剩餘遊戲次數</p>
                <p className="font-black text-white text-xl">3 <span className="text-white/40 font-normal text-sm">/ 5 次</span></p>
              </div>
            </div>
            <button className="px-4 py-2.5 bg-[#7E57FF] text-white text-sm font-bold rounded-xl hover:bg-[#6B4EE0] transition-colors shadow-lg shadow-[#7E57FF]/30 flex items-center gap-2">
              <IconGift size={16} /> 獲取次數
            </button>
          </div>
          
          {/* 進度條 */}
          <div className="mt-4">
            <div className="h-2 bg-[#2a2a3e] rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-gradient-to-r from-[#00E5A0] to-[#00B87A] rounded-full" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>已使用 2 次</span>
              <span>每日重置</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <GameSection title="幸運轉盤" subtitle="轉動輪盤贏取大獎" icon={IconStar}>
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 text-white/70 text-sm">
            <p className="font-bold text-white mb-1">幸運轉盤（Demo Placeholder）</p>
            <p className="text-white/50 text-xs leading-relaxed">
              這一區目前的遊戲元件檔案包含整段 HTML（不是 React 元件），會讓 Vite 編譯失敗。
              先以佔位卡片保留版位，之後再把遊戲改成 React 或改用 iframe 載入。
            </p>
          </div>
        </GameSection>

        <GameSection title="老虎機" subtitle="經典拉霸機挑戰" icon={IconSparkle}>
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 text-white/70 text-sm">
            <p className="font-bold text-white mb-1">老虎機（Demo Placeholder）</p>
            <p className="text-white/50 text-xs leading-relaxed">
              這一區目前的遊戲元件檔案包含整段 HTML（不是 React 元件），會讓 Vite 編譯失敗。
              先以佔位卡片保留版位，之後再把遊戲改成 React 或改用 iframe 載入。
            </p>
          </div>
        </GameSection>

        <GameSection title="刮刮樂" subtitle="刮開獲得神秘獎品" icon={IconGift}>
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-4 text-white/70 text-sm">
            <p className="font-bold text-white mb-1">刮刮樂（Demo Placeholder）</p>
            <p className="text-white/50 text-xs leading-relaxed">
              這一區目前的遊戲元件檔案包含整段 HTML（不是 React 元件），會讓 Vite 編譯失敗。
              先以佔位卡片保留版位，之後再把遊戲改成 React 或改用 iframe 載入。
            </p>
          </div>
        </GameSection>
      </div>
    </div>
  );
};

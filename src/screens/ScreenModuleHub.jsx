import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { SkeletonList } from '../components/common/Skeleton';
import { IconAnalytics, IconModules, IconTarget, IconGamepad, IconSearch, IconArrowRight, IconCheck } from '../components/icons';

export const ScreenModuleHub = () => {
  const { push } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-[#0f0f1a]">
      <div className="px-6 pt-12 pb-4">
        <h2 className="text-2xl font-black text-white mb-1">Module Hub</h2>
        <p className="text-white/50 text-sm mb-6">探索並啟用你的 CRM 模組</p>

        <div className="bg-[#1a1a2e] p-3 rounded-2xl flex items-center gap-3 text-white/40 mb-8 border border-white/5">
          <IconSearch size={20} />
          <input 
            placeholder="搜尋模組..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 text-white placeholder-white/30" 
          />
        </div>
      </div>

      {isLoading ? (
        <div className="px-6">
          <SkeletonList count={3} />
        </div>
      ) : (
        <div className="px-6 space-y-8">
          {/* 模組管理區塊 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-[#00E5A0] rounded-full" />
              <h3 className="font-bold text-white">模組管理</h3>
            </div>
            <button 
              onClick={() => push('modules')} 
              className="w-full bg-gradient-to-br from-[#00E5A0] to-[#00B87A] p-5 rounded-[24px] flex items-center gap-4 hover:shadow-lg hover:shadow-[#00E5A0]/20 transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <IconTarget size={28} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-white text-lg">OakMega 模組中心</h4>
                <p className="text-sm text-white/80 mt-1">23+ 專業 CRM 行銷工具</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 text-white">
                進入 <IconArrowRight size={14} />
              </div>
            </button>
          </div>

          {/* 互動娛樂區塊 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-[#7E57FF] rounded-full" />
              <h3 className="font-bold text-white">互動娛樂</h3>
            </div>
            <button 
              onClick={() => push('playground')} 
              className="w-full bg-[#1a1a2e] p-5 rounded-[24px] border border-white/5 flex items-center gap-4 hover:border-[#7E57FF]/50 hover:shadow-lg hover:shadow-[#7E57FF]/10 transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#7E57FF]/20 to-[#9F7AEA]/20 rounded-2xl flex items-center justify-center">
                <IconGamepad size={28} className="text-[#7E57FF]" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-white text-lg">遊戲遊樂場</h4>
                <p className="text-sm text-white/50 mt-1">拉霸、輪盤、刮刮樂三合一</p>
              </div>
              <div className="bg-[#7E57FF] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 text-white">
                進入 <IconArrowRight size={14} />
              </div>
            </button>
          </div>

          {/* 數據分析區塊 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-[#FFB74D] rounded-full" />
              <h3 className="font-bold text-white">數據分析</h3>
            </div>
            <button 
              onClick={() => push('oma')} 
              className="w-full bg-[#1a1a2e] p-5 rounded-[24px] border border-white/5 flex items-center gap-4 hover:border-[#FFB74D]/50 hover:shadow-lg hover:shadow-[#FFB74D]/10 transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFB74D]/20 to-[#FF8F00]/20 rounded-2xl flex items-center justify-center">
                <IconAnalytics size={28} className="text-[#FFB74D]" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-white text-lg">OMA 即時追蹤</h4>
                <p className="text-sm text-white/50 mt-1">線上線下足跡整合</p>
              </div>
              <div className="bg-[#00E5A0]/20 text-[#00E5A0] px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1">
                <IconCheck size={14} /> 已啟用
              </div>
            </button>
          </div>

          {/* 快速統計 */}
          <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-white/5">
            <h3 className="font-bold text-white mb-4">模組使用統計</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-[#00E5A0]">12</div>
                <div className="text-xs text-white/50 mt-1">已啟用</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#FFB74D]">8</div>
                <div className="text-xs text-white/50 mt-1">待探索</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#7E57FF]">3</div>
                <div className="text-xs text-white/50 mt-1">進階版</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

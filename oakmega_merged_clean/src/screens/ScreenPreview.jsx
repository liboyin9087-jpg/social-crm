import React from 'react';
import { Eye, LogOut, ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useAuth } from '../contexts/AuthContext';
import { isPreviewMode, disablePreviewMode } from '../utils/preview';

const Card = ({ title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition"
  >
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-black text-white text-lg">{title}</h3>
        <p className="text-sm text-white/60 mt-1">{desc}</p>
      </div>
      <ArrowRight size={18} className="text-emerald-400 mt-1" />
    </div>
  </button>
);

export const ScreenPreview = () => {
  const { push } = useNavigation();
  const { signOut } = useAuth();

  const leave = async () => {
    disablePreviewMode();
    // stay logged out, go login
    await signOut?.();
    window.location.href = '/';
  };

  return (
    <div className="h-full overflow-y-auto pb-24 bg-[#0f0f1a]">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
            <Eye size={22} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-white">UI 預覽</h1>
            <p className="text-sm text-white/60 mt-1">
              免登入快速切換頁面：確認排版、元件、流程與互動。
            </p>
          </div>
        </div>

        {isPreviewMode() && (
          <div className="mt-4 rounded-2xl p-4 bg-white/5 border border-white/10 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-emerald-300">PREVIEW MODE</p>
              <p className="text-xs text-white/60">不需登入，使用假資料渲染畫面</p>
            </div>
            <button
              onClick={leave}
              className="px-4 py-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 text-white/70 transition flex items-center gap-2"
            >
              <LogOut size={14} />
              離開預覽
            </button>
          </div>
        )}
      </div>

      <div className="px-6 space-y-3">
        <Card title="Dashboard" desc="總覽 KPI + Flow 視覺化 + 快捷入口" onClick={() => push('dashboard')} />
        <Card title="Module Hub" desc="模組入口與導流" onClick={() => push('moduleHub')} />
        <Card title="Modules" desc="模組清單 + 篩選 + 開關" onClick={() => push('modules')} />
        <Card title="OMA" desc="Root System（互動）/ Event Stream（列表）切換" onClick={() => push('oma')} />
        <Card title="Rewards" desc="點數、優惠券、兌換紀錄" onClick={() => push('rewards')} />
        <Card title="Playground" desc="遊戲中心" onClick={() => push('playground')} />
      </div>
    </div>
  );
};

export default ScreenPreview;

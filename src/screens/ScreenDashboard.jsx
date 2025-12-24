import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services';
import { SkeletonDashboard } from '../components/common/Skeleton';
import { FlowVisualization } from '../components/visualization/FlowVisualization';
import { 
  IconBell, 
  IconOakMega, 
  IconModules, 
  IconAnalytics, 
  IconGamepad, 
  IconCoupon,
  IconTrendUp,
  IconUsers,
  IconZap,
  IconArrowRight,
  IconMessageSquare
} from '../components/icons';

// --- 優化後的 StatCard (Canopy 風格) ---
const StatCard = ({ icon: Icon, label, value, change, changeType = 'up', accent = 'emerald' }) => {
  // 定義 Canopy 色系映射
  const accentColors = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
    amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100',   iconBg: 'bg-amber-100' },
    purple:  { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-100',  iconBg: 'bg-purple-100' },
    cyan:    { bg: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-100',    iconBg: 'bg-cyan-100' },
  };
  
  const colors = accentColors[accent] || accentColors.emerald;
  
  return (
    <div className="bg-white border border-gray-100 rounded-card p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon size={22} className={colors.text} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${changeType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            <IconTrendUp size={12} className={changeType === 'down' ? 'rotate-180' : ''} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <p className="text-oak-subtext text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-oak-text text-2xl font-brand font-bold">{value}</p>
    </div>
  );
};

// --- 優化後的 QuickActionButton (白底卡片風格) ---
const QuickActionButton = ({ icon: Icon, label, sublabel, onClick, accent = 'emerald' }) => {
  const accentColors = {
    emerald: 'group-hover:border-emerald-200 group-hover:shadow-emerald-100',
    amber:   'group-hover:border-amber-200 group-hover:shadow-amber-100',
    purple:  'group-hover:border-purple-200 group-hover:shadow-purple-100',
    cyan:    'group-hover:border-cyan-200 group-hover:shadow-cyan-100',
  };

  const iconColors = {
    emerald: 'text-emerald-600 bg-emerald-50',
    amber:   'text-amber-600 bg-amber-50',
    purple:  'text-purple-600 bg-purple-50',
    cyan:    'text-cyan-600 bg-cyan-50',
  };
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full group ${accentColors[accent]}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconColors[accent]}`}>
        <Icon size={24} />
      </div>
      <div className="text-left flex-1 min-w-0">
        <p className="text-oak-text font-bold text-sm truncate group-hover:text-oak-soul transition-colors">{label}</p>
        <p className="text-oak-subtext text-xs truncate">{sublabel}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
         <IconArrowRight size={14} className="text-gray-400" />
      </div>
    </button>
  );
};

// --- 優化後的 ActionModal (毛玻璃風格) ---
const ActionModal = ({ isOpen, onClose, actionType, selectedUsers }) => {
  if (!isOpen) return null;
  
  const actionConfig = {
    coupon: {
      title: '發送優惠券',
      description: `向 ${selectedUsers?.length || 0} 位用戶發送優惠券`,
      icon: IconCoupon,
      color: 'amber',
      bg: 'bg-amber-50',
      text: 'text-amber-600'
    },
    tag: {
      title: '貼上標籤',
      description: `為 ${selectedUsers?.length || 0} 位用戶加上標籤`,
      icon: IconZap,
      color: 'purple',
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    },
    broadcast: {
      title: '建立再行銷旅程',
      description: `針對 ${selectedUsers?.length || 0} 位用戶建立自動化旅程`,
      icon: IconAnalytics,
      color: 'emerald',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600'
    },
  };
  
  const config = actionConfig[actionType] || actionConfig.coupon;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-oak-forest/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 ${config.bg} rounded-2xl flex items-center justify-center shadow-inner`}>
            <config.icon size={32} className={config.text} />
          </div>
          <div>
            <h3 className="text-oak-text text-xl font-brand font-bold">{config.title}</h3>
            <p className="text-oak-subtext text-sm">{config.description}</p>
          </div>
        </div>
        
        <div className="bg-oak-canvas rounded-xl p-4 mb-6 border border-gray-100 inner-shadow-sm">
          <p className="text-oak-subtext text-xs font-bold mb-3 uppercase tracking-wider">已選擇用戶樣本</p>
          <div className="flex flex-wrap gap-2">
            {selectedUsers?.slice(0, 5).map(user => (
              <span key={user.id} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-oak-text text-xs font-medium shadow-sm">
                {user.userId}
              </span>
            ))}
            {(selectedUsers?.length || 0) > 5 && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-500 text-xs font-medium">
                +{selectedUsers.length - 5} 更多
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors font-bold text-sm"
          >
            取消
          </button>
          <button
            onClick={() => {
              alert(`已對 ${selectedUsers?.length || 0} 位用戶執行「${config.title}」操作`);
              onClose();
            }}
            className={`flex-1 py-3 bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 hover:from-${config.color}-400 hover:to-${config.color}-500 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-bold text-sm transform hover:-translate-y-0.5`}
          >
            確認執行
          </button>
        </div>
      </div>
    </div>
  );
};

export const ScreenDashboard = () => {
  const { push } = useNavigation();
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showFlowView, setShowFlowView] = useState(false); // 預設顯示總覽 (Overview) 比較直觀
  const [actionModal, setActionModal] = useState({ isOpen: false, type: null, users: [] });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // 模擬加載時間，讓 Skeleton 展示一下
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (profile) {
        const { data } = await notificationService.getUserNotifications(profile.id);
        setNotifications(data || []);
      }
      setIsLoading(false);
    };
    loadData();
  }, [profile]);

  const handleFlowAction = (actionType, selectedPaths) => {
    setActionModal({ isOpen: true, type: actionType, users: selectedPaths });
  };

  if (isLoading) {
    return (
      <div className="h-full p-6 md:p-8">
        <SkeletonDashboard />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between shrink-0">
        <div>
          <p className="text-oak-soul text-xs font-bold tracking-widest uppercase mb-1">OAKMEGA CRM</p>
          <h1 className="text-oak-text text-2xl font-brand font-bold flex items-center gap-2">
            早安，{profile?.display_name || '管理者'} ☀️
          </h1>
        </div>
        <button className="w-10 h-10 bg-white border border-gray-100 hover:shadow-md rounded-xl flex items-center justify-center transition-all relative group">
          <IconBell size={20} className="text-oak-subtext group-hover:text-oak-soul" />
          {notifications.some(n => !n.is_read) && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-oak-warmth rounded-full border border-white" />
          )}
        </button>
      </div>

      {/* View Toggle (Segmented Control) */}
      <div className="px-6 py-4 shrink-0">
        <div className="inline-flex bg-gray-100/80 p-1 rounded-xl">
          <button
            onClick={() => setShowFlowView(false)}
            className={`py-2 px-5 rounded-lg text-sm font-bold transition-all duration-200 ${
              !showFlowView ? 'bg-white text-oak-soul shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            功能總覽
          </button>
          <button
            onClick={() => setShowFlowView(true)}
            className={`py-2 px-5 rounded-lg text-sm font-bold transition-all duration-200 ${
              showFlowView ? 'bg-white text-oak-soul shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            流量視覺化
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showFlowView ? (
        /* Flow Visualization View */
        <div className="flex-1 overflow-hidden p-6 pt-0">
          <div className="h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
            <FlowVisualization 
              pathCount={120}
              onAction={handleFlowAction}
            />
          </div>
        </div>
      ) : (
        /* Overview View */
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide px-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={IconUsers}
              label="今日新好友"
              value="128"
              change="+12%"
              changeType="up"
              accent="emerald"
            />
            <StatCard
              icon={IconTrendUp}
              label="轉換率"
              value="4.2%"
              change="+0.8%"
              changeType="up"
              accent="amber"
            />
            <StatCard
              icon={IconModules}
              label="活躍模組"
              value="5"
              accent="purple"
            />
            <StatCard
              icon={IconCoupon}
              label="待領優惠"
              value="3"
              accent="cyan"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h3 className="text-oak-text font-bold text-lg mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-oak-soul rounded-full"/>
                功能捷徑
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickActionButton
                  icon={IconModules}
                  label="模組中心"
                  sublabel="管理互動功能與遊戲化模組"
                  onClick={() => push('moduleHub')}
                  accent="emerald"
                />
                <QuickActionButton
                  icon={IconGamepad}
                  label="遊樂場"
                  sublabel="抽獎遊戲與互動體驗"
                  onClick={() => push('playground')}
                  accent="purple"
                />
                <QuickActionButton
                  icon={IconAnalytics}
                  label="OMA 追蹤"
                  sublabel="實名制用戶行為追蹤與分析"
                  onClick={() => push('oma')}
                  accent="cyan"
                />
                <QuickActionButton
                  icon={IconCoupon}
                  label="優惠券"
                  sublabel="管理與發放優惠券"
                  onClick={() => push('rewards')}
                  accent="amber"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-oak-text font-bold text-lg mb-4 flex items-center gap-2">
                 <div className="w-1 h-6 bg-oak-warmth rounded-full"/>
                 最新動態
              </h3>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
                {notifications.length > 0 ? (
                  <div className="space-y-1">
                    {notifications.slice(0, 4).map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-3 rounded-xl transition-colors ${notif.is_read ? 'hover:bg-gray-50' : 'bg-oak-canvas/50 border-l-2 border-oak-warmth'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.is_read ? 'bg-gray-300' : 'bg-oak-warmth'}`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${notif.is_read ? 'text-gray-600 font-medium' : 'text-oak-text font-bold'} truncate`}>{notif.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm">
                    目前沒有新通知
                  </div>
                )}
                <button className="w-full py-3 text-xs text-oak-soul font-bold hover:bg-gray-50 rounded-xl mt-2 transition-colors">
                  查看全部歷史紀錄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      <ActionModal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ isOpen: false, type: null, users: [] })}
        actionType={actionModal.type}
        selectedUsers={actionModal.users}
      />
    </div>
  );
};

export default ScreenDashboard;
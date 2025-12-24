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
  IconArrowRight
} from '../components/icons';

// Stats card component
const StatCard = ({ icon: Icon, label, value, change, changeType = 'up', accent = 'emerald' }) => {
  const accentColors = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  };
  
  const colors = accentColors[accent];
  
  return (
    <div className={`bg-[#1a1a2e] border ${colors.border} rounded-2xl p-4`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
          <Icon size={20} className={colors.text} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            <IconTrendUp size={12} className={changeType === 'down' ? 'rotate-180' : ''} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <p className="text-white/50 text-xs mb-1">{label}</p>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  );
};

// Quick action button component
const QuickActionButton = ({ icon: Icon, label, sublabel, onClick, accent = 'emerald' }) => {
  const accentColors = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 border-emerald-500/20',
    amber: 'from-amber-500/20 to-amber-600/10 hover:from-amber-500/30 hover:to-amber-600/20 border-amber-500/20',
    purple: 'from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 border-purple-500/20',
    cyan: 'from-cyan-500/20 to-cyan-600/10 hover:from-cyan-500/30 hover:to-cyan-600/20 border-cyan-500/20',
  };
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-4 bg-gradient-to-r ${accentColors[accent]} border rounded-2xl transition-all active:scale-[0.98] group w-full`}
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
        <Icon size={24} active className="text-white/80" />
      </div>
      <div className="text-left flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{label}</p>
        <p className="text-white/40 text-xs truncate">{sublabel}</p>
      </div>
      <IconArrowRight size={16} className="text-white/30 group-hover:text-white/60 transition-colors shrink-0" />
    </button>
  );
};

// Action modal component
const ActionModal = ({ isOpen, onClose, actionType, selectedUsers }) => {
  if (!isOpen) return null;
  
  const actionConfig = {
    coupon: {
      title: '發送優惠券',
      description: `向 ${selectedUsers?.length || 0} 位用戶發送優惠券`,
      icon: IconCoupon,
      color: 'amber',
    },
    tag: {
      title: '貼上標籤',
      description: `為 ${selectedUsers?.length || 0} 位用戶加上標籤`,
      icon: IconZap,
      color: 'purple',
    },
    broadcast: {
      title: '建立再行銷旅程',
      description: `針對 ${selectedUsers?.length || 0} 位用戶建立自動化旅程`,
      icon: IconAnalytics,
      color: 'emerald',
    },
  };
  
  const config = actionConfig[actionType] || actionConfig.coupon;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a2e] border border-white/10 rounded-3xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 bg-${config.color}-500/20 rounded-2xl flex items-center justify-center`}>
            <config.icon size={28} active className={`text-${config.color}-400`} />
          </div>
          <div>
            <h3 className="text-white text-lg font-bold">{config.title}</h3>
            <p className="text-white/50 text-sm">{config.description}</p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 mb-6">
          <p className="text-white/60 text-xs mb-3">已選擇用戶樣本</p>
          <div className="flex flex-wrap gap-2">
            {selectedUsers?.slice(0, 5).map(user => (
              <span key={user.id} className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">
                {user.userId}
              </span>
            ))}
            {(selectedUsers?.length || 0) > 5 && (
              <span className="px-3 py-1 bg-white/5 rounded-full text-white/40 text-xs">
                +{selectedUsers.length - 5} 更多
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={() => {
              alert(`已對 ${selectedUsers?.length || 0} 位用戶執行「${config.title}」操作`);
              onClose();
            }}
            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-xl transition-colors font-medium"
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
  const [showFlowView, setShowFlowView] = useState(true);
  const [actionModal, setActionModal] = useState({ isOpen: false, type: null, users: [] });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
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
      <div className="h-full overflow-y-auto pb-24 scrollbar-hide bg-[#0f0f1a]">
        <SkeletonDashboard />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0f0f1a]">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <IconOakMega size={40} />
          <div>
            <p className="text-emerald-400 text-xs font-semibold tracking-wide">OAKMEGA CRM</p>
            <h1 className="text-white text-xl font-bold">
              {profile?.display_name || '管理者'}
            </h1>
          </div>
        </div>
        <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors relative">
          <IconBell size={20} badge={notifications.filter(n => !n.is_read).length} className="text-white/70" />
        </button>
      </div>

      {/* View Toggle */}
      <div className="px-6 pb-4 shrink-0">
        <div className="flex bg-white/5 rounded-xl p-1">
          <button
            onClick={() => setShowFlowView(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              showFlowView ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/40 hover:text-white/60'
            }`}
          >
            流量視覺化
          </button>
          <button
            onClick={() => setShowFlowView(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              !showFlowView ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/40 hover:text-white/60'
            }`}
          >
            功能總覽
          </button>
        </div>
      </div>

      {/* Main Content */}
      {showFlowView ? (
        /* Flow Visualization View */
        <div className="flex-1 overflow-hidden pb-24">
          <FlowVisualization 
            pathCount={120}
            onAction={handleFlowAction}
          />
        </div>
      ) : (
        /* Overview View */
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide px-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
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

          {/* Quick Actions */}
          <h3 className="text-white font-bold text-lg mb-4">功能選單</h3>
          <div className="space-y-3 mb-6">
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

          {/* Recent Activity */}
          {notifications.length > 0 && (
            <div>
              <h3 className="text-white font-bold text-lg mb-3">最新動態</h3>
              <div className="space-y-2">
                {notifications.slice(0, 3).map(notif => (
                  <div 
                    key={notif.id} 
                    className={`bg-[#1a1a2e] border ${notif.is_read ? 'border-white/5' : 'border-emerald-500/20'} p-4 rounded-2xl`}
                  >
                    <div className="flex items-start gap-3">
                      {!notif.is_read && (
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{notif.title}</p>
                        <p className="text-white/40 text-xs mt-1 line-clamp-2">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

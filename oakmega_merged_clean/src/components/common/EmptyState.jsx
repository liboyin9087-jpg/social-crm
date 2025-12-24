import React from 'react';
import { Inbox, WifiOff } from 'lucide-react';
import { IconAnalytics, IconCoupon } from '../icons';

export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  actionLabel,
  variant = 'default'
}) => {
  const variants = {
    default: { iconBg: 'bg-gray-100', iconColor: 'text-gray-400' },
    error: { iconBg: 'bg-red-50', iconColor: 'text-red-400' },
    offline: { iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  };

  const v = variants[variant];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className={`w-20 h-20 ${v.iconBg} rounded-full flex items-center justify-center mb-6`}>
        <Icon size={36} className={v.iconColor} />
      </div>
      <h3 className="text-lg font-bold text-[#333] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-[240px]">{description}</p>
      {action && (
        <button
          onClick={action}
          className="bg-[#7D5EFF] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#7D5EFF]/20 hover:bg-[#6c4ee0] transition-colors"
        >
          {actionLabel || '重試'}
        </button>
      )}
    </div>
  );
};

export const EmptyStateNoOMAData = ({ onRefresh }) => (
  <EmptyState
    icon={IconAnalytics}
    title="尚無追蹤數據"
    description="目前沒有即時事件資料，等待用戶互動以開始追蹤。"
    action={onRefresh}
    actionLabel="重新整理"
  />
);

export const EmptyStateNetworkError = ({ onRetry }) => (
  <EmptyState
    variant="offline"
    icon={WifiOff}
    title="網路連線失敗"
    description="無法連接伺服器，請檢查網路連線後重試。"
    action={onRetry}
    actionLabel="重新連線"
  />
);

export const EmptyStateNoCoupons = ({ onAction }) => (
  <EmptyState
    icon={IconCoupon}
    title="尚無優惠券"
    description="目前沒有可用的優惠券，探索活動以獲取更多優惠！"
    action={onAction}
    actionLabel="探索活動"
  />
);

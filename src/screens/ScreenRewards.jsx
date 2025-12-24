import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { couponService } from '../services';
import { formatDaysUntil } from '../utils/helpers';
import { IconCoupon, IconGift, IconStar, IconCheck, IconClock } from '../components/icons';
import { SkeletonCoupons, SkeletonList } from '../components/common/Skeleton';

export const ScreenRewards = () => {
  const { profile } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoupons();
  }, [profile, activeTab]);

  const loadCoupons = async () => {
    if (!profile) return;

    setIsLoading(true);
    if (activeTab === 'active') {
      const { data } = await couponService.getUserCoupons(profile.id);
      setCoupons(data || []);
    } else {
      const { data } = await couponService.getUserCouponHistory(profile.id);
      setHistory(data || []);
    }
    setIsLoading(false);
  };

  const handleUseCoupon = async (couponId) => {
    const { error } = await couponService.useCoupon(couponId);
    if (!error) {
      loadCoupons();
    }
  };

  return (
    <div className="h-full bg-[#0f0f1a] overflow-y-auto scrollbar-hide pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
            <IconGift size={24} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">我的優惠</h1>
            <p className="text-white/50 text-sm">管理您的優惠券</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/20 rounded-2xl p-4 text-white mb-6">
          <div className="flex items-center gap-2 mb-2">
            <IconStar size={20} filled className="text-amber-400" />
            <span className="text-sm font-bold capitalize text-amber-400">{profile?.member_level || 'Bronze'} 會員</span>
          </div>
          <p className="text-3xl font-black mb-1">{profile?.total_points?.toLocaleString() || 0} <span className="text-lg text-white/60">點</span></p>
          <p className="text-sm text-white/60">持續累積以升級會員等級</p>
        </div>

        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          <button 
            onClick={() => setActiveTab('active')} 
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'active' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            可用優惠券
          </button>
          <button 
            onClick={() => setActiveTab('history')} 
            className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
              activeTab === 'history' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            使用記錄
          </button>
        </div>

        {isLoading ? (
          activeTab === 'active' ? <SkeletonCoupons /> : <SkeletonList />
        ) : activeTab === 'active' ? (
          <div className="space-y-4">
            {coupons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconCoupon size={32} className="text-white/20" />
                </div>
                <p className="text-white/60 font-bold">尚無可用優惠券</p>
                <p className="text-white/30 text-sm mt-1">完成任務以獲取更多優惠！</p>
              </div>
            ) : (
              coupons.map(coupon => {
                const colors = {
                  purple: 'from-purple-500/30 to-purple-600/20 border-purple-500/30',
                  emerald: 'from-emerald-500/30 to-emerald-600/20 border-emerald-500/30',
                  orange: 'from-orange-500/30 to-orange-600/20 border-orange-500/30',
                  yellow: 'from-amber-500/30 to-amber-600/20 border-amber-500/30',
                };
                const colorClass = colors[coupon.color_scheme] || colors.purple;

                return (
                  <div key={coupon.id} className={`bg-gradient-to-r ${colorClass} border rounded-2xl p-4 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-black mb-1">{coupon.title}</h3>
                          <p className="text-sm text-white/70">{coupon.description}</p>
                        </div>
                        <IconCoupon size={24} active className="text-white/40" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/60">
                          <IconClock size={16} />
                          <span className="text-sm font-medium">{formatDaysUntil(new Date(coupon.expires_at))}</span>
                        </div>
                        <button
                          onClick={() => handleUseCoupon(coupon.id)}
                          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl font-bold text-sm transition-colors"
                        >
                          立即使用
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconCheck size={32} className="text-white/20" />
                </div>
                <p className="text-white/60 font-bold">尚無使用記錄</p>
              </div>
            ) : (
              history.map(item => (
                <div key={item.id} className="bg-[#1a1a2e] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <IconCheck size={20} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm">{item.title}</h3>
                      <p className="text-xs text-white/40">節省了 ${item.value}</p>
                    </div>
                    <span className="text-xs text-white/30">{formatDaysUntil(new Date(item.used_at))}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

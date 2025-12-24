import React, { useState, useEffect, useMemo } from 'react';
import { formatRelativeTime } from '../utils/helpers';
import { OMA_ACTION_LABELS } from '../utils/constants';
import { EmptyStateNoOMAData } from '../components/common/EmptyState';
import { RootSystemGraph } from '../components/oma/RootSystemGraph';
import {
  IconLocation, 
  IconRefresh, 
  IconFilter, 
  IconQRCode,
  IconCart,
  IconCheck,
  IconUsers,
  IconPulse,
  IconTrendUp,
  IconArrowRight,
  IconCopy,
  IconLink,
  IconTag,
  IconClock,
  IconEye,
  IconTarget
} from '../components/icons';

// Action type icons mapping
const ACTION_ICONS = {
  qr_scan: IconQRCode,
  coupon_redeem: IconCopy,
  signup: IconUsers,
  purchase: IconCart,
  checkin: IconLocation,
  page_view: IconEye,
  add_to_cart: IconCart,
  checkout_start: IconTarget,
};

// Action type colors
const ACTION_COLORS = {
  qr_scan: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  coupon_redeem: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  signup: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  purchase: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  checkin: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  page_view: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  add_to_cart: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  checkout_start: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
};

// Stats Summary Component
const StatsSummary = ({ events }) => {
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayEvents = events.filter(e => new Date(e.timestamp) >= today);
    const uniqueUsers = new Set(events.map(e => e.userId)).size;
    const purchases = events.filter(e => e.actionType === 'purchase').length;
    const conversionRate = events.length > 0 ? ((purchases / events.length) * 100).toFixed(1) : 0;
    
    return {
      total: events.length,
      today: todayEvents.length,
      uniqueUsers,
      conversionRate,
    };
  }, [events]);
  
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      <div className="bg-[#1e1e32] rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <IconPulse size={16} className="text-emerald-400" />
          <span className="text-white/40 text-xs">總事件</span>
        </div>
        <p className="text-white text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-[#1e1e32] rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <IconClock size={16} className="text-cyan-400" />
          <span className="text-white/40 text-xs">今日</span>
        </div>
        <p className="text-white text-2xl font-bold">{stats.today}</p>
      </div>
      <div className="bg-[#1e1e32] rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <IconUsers size={16} className="text-purple-400" />
          <span className="text-white/40 text-xs">獨立用戶</span>
        </div>
        <p className="text-white text-2xl font-bold">{stats.uniqueUsers}</p>
      </div>
      <div className="bg-[#1e1e32] rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <IconTrendUp size={16} className="text-amber-400" />
          <span className="text-white/40 text-xs">轉換率</span>
        </div>
        <p className="text-white text-2xl font-bold">{stats.conversionRate}%</p>
      </div>
    </div>
  );
};

// Filter Tabs Component
const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: '全部' },
    { id: 'qr_scan', label: 'QR掃描' },
    { id: 'purchase', label: '購買' },
    { id: 'signup', label: '註冊' },
    { id: 'coupon_redeem', label: '領券' },
  ];
  
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            activeFilter === filter.id
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, isExpanded, onToggle }) => {
  const Icon = ACTION_ICONS[event.actionType] || IconLocation;
  const colors = ACTION_COLORS[event.actionType] || ACTION_COLORS.checkin;
  
  return (
    <div 
      className={`bg-[#1e1e32] rounded-2xl border transition-all ${
        isExpanded ? 'border-emerald-500/30' : 'border-white/5 hover:border-white/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4"
      >
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}>
          <Icon size={20} className={colors.text} />
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm truncate">
              {OMA_ACTION_LABELS[event.actionType] || event.actionType}
            </p>
            <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-xs rounded-full`}>
              {event.actionType}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-1 truncate">{event.locationName}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-emerald-400 text-xs font-medium">{formatRelativeTime(event.timestamp)}</p>
          <p className="text-white/30 text-xs mt-1">{event.userId}</p>
        </div>
        <IconArrowRight 
          size={16} 
          className={`text-white/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-white/5 mt-0">
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">用戶 ID</p>
                <p className="text-white text-sm font-mono">{event.userId}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">位置 ID</p>
                <p className="text-white text-sm font-mono">{event.locationId || 'N/A'}</p>
              </div>
            </div>
            
            {event.coordinates && (
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">座標</p>
                <p className="text-white text-sm font-mono">
                  {event.coordinates.lat.toFixed(4)}, {event.coordinates.lng.toFixed(4)}
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <IconUsers size={16} />
                查看用戶資料
              </button>
              <button className="flex-1 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <IconTag size={16} />
                貼上標籤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Link Generator Component
const LinkGenerator = ({ isOpen, onClose }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const availableTags = ['興趣：護膚', '興趣：彩妝', '活動：雙12', '來源：LINE推播'];
  
  const generateLink = () => {
    if (originalUrl) {
      const params = new URLSearchParams();
      params.set('oma_src', 'line');
      params.set('oma_tags', selectedTags.join(','));
      params.set('oma_ts', Date.now().toString());
      setGeneratedUrl(`https://oma.oakmega.com/l/${btoa(originalUrl).slice(0, 8)}?${params.toString()}`);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    alert('已複製到剪貼簿');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a2e] border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 w-full sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <IconLink size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">建立追蹤連結</h3>
              <p className="text-white/50 text-sm">包覆原始網址以啟用 OMA 追蹤</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-white/60 text-sm mb-2 block">原始網址</label>
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://www.example.com/product/123"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          
          <div>
            <label className="text-white/60 text-sm mb-2 block">點擊標籤（選填）</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={generateLink}
            disabled={!originalUrl}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-medium transition-all"
          >
            產生追蹤連結
          </button>
          
          {generatedUrl && (
            <div className="bg-white/5 rounded-xl p-4 border border-emerald-500/20">
              <p className="text-white/60 text-xs mb-2">OMA 追蹤連結</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedUrl}
                  readOnly
                  className="flex-1 bg-transparent text-emerald-400 text-sm font-mono truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
                >
                  <IconCopy size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl font-medium transition-colors"
        >
          關閉
        </button>
      </div>
    </div>
  );
};

// Main OMA Screen Component
export const ScreenOMA = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mode, setMode] = useState('list'); // 'list' | 'root'
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [showLinkGenerator, setShowLinkGenerator] = useState(false);

  // Extend mock data with more event types
  const extendedMockEvents = useMemo(() => {
    const baseEvents = [
      { id: 'oma_1', userId: 'usr_001', actionType: 'qr_scan', locationName: '台北信義店', coordinates: { lat: 25.033, lng: 121.564 }, timestamp: new Date(Date.now() - 10000) },
      { id: 'oma_2', userId: 'usr_002', actionType: 'coupon_redeem', locationName: '線上商店', coordinates: { lat: 0, lng: 0 }, timestamp: new Date(Date.now() - 32000) },
      { id: 'oma_3', userId: 'usr_003', actionType: 'signup', locationName: '台中公益店', coordinates: { lat: 24.147, lng: 120.673 }, timestamp: new Date(Date.now() - 60000) },
    ];
    const additionalEvents = [
      { id: 'oma_4', userId: 'usr_004', actionType: 'page_view', locationName: '產品頁：保濕精華液', coordinates: { lat: 0, lng: 0 }, timestamp: new Date(Date.now() - 120000) },
      { id: 'oma_5', userId: 'usr_005', actionType: 'add_to_cart', locationName: '商品：玻尿酸面膜', coordinates: { lat: 0, lng: 0 }, timestamp: new Date(Date.now() - 180000) },
      { id: 'oma_6', userId: 'usr_002', actionType: 'purchase', locationName: '訂單 #20231225001', coordinates: { lat: 25.033, lng: 121.564 }, timestamp: new Date(Date.now() - 300000) },
      { id: 'oma_7', userId: 'usr_006', actionType: 'checkout_start', locationName: '結帳頁面', coordinates: { lat: 0, lng: 0 }, timestamp: new Date(Date.now() - 450000) },
      { id: 'oma_8', userId: 'usr_007', actionType: 'qr_scan', locationName: '高雄夢時代店', coordinates: { lat: 22.595, lng: 120.310 }, timestamp: new Date(Date.now() - 600000) },
    ];
    return [...baseEvents, ...additionalEvents].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, []);

  const loadEvents = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setEvents(extendedMockEvents);
      setIsLoading(false);
      setIsRefreshing(false);
    }, 800);
  };

  useEffect(() => { loadEvents(); }, [extendedMockEvents]);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.actionType === activeFilter);
  }, [events, activeFilter]);

  return (
    <div className="h-full bg-[#0f0f1a] overflow-y-auto scrollbar-hide pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex justify-between items-center sticky top-0 bg-[#0f0f1a]/95 backdrop-blur-md z-20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <p className="text-emerald-400 text-xs font-bold tracking-wider">LIVE TRACKING</p>
          </div>
          <h2 className="text-white text-2xl font-black">OMA 追蹤中心</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowLinkGenerator(true)}
            className="h-10 px-4 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <IconLink size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">建立連結</span>
          </button>
          <button 
            onClick={loadEvents} 
            disabled={isRefreshing} 
            className={`w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <IconRefresh size={18} className="text-white/60" />
          </button>
        </div>
      </div>



{/* Mode Toggle */}
<div className="px-6">
  <div className="flex items-center justify-between gap-3 mb-4">
    <div className="flex items-center gap-2 rounded-2xl p-1 bg-white/5 border border-white/10">
      <button
        className={`px-4 py-2 rounded-2xl text-sm font-bold transition ${mode === 'root' ? 'bg-emerald-500/20 text-emerald-300' : 'text-white/60 hover:text-white'}`}
        onClick={() => setMode('root')}
      >
        Root System
      </button>
      <button
        className={`px-4 py-2 rounded-2xl text-sm font-bold transition ${mode === 'list' ? 'bg-emerald-500/20 text-emerald-300' : 'text-white/60 hover:text-white'}`}
        onClick={() => setMode('list')}
      >
        Event Stream
      </button>
    </div>

    {mode === 'root' && (
      <div className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-xs">
        已選取：<span className="text-amber-300 font-extrabold">{selectedIds.length}</span>
      </div>
    )}
  </div>
</div>
      <div className="px-6">

{mode === 'root' ? (
  <div className="space-y-3">
    <RootSystemGraph
      campaignName="雙 11 推播"
      seed={42}
      onSelectionChange={setSelectedIds}
    />
    <div className="text-white/40 text-xs leading-relaxed">
      互動：拖曳移動、滾輪縮放、hover 看節點、點擊或 Shift+拖曳框選一群節點（右側會出現 Activation Drawer）。
    </div>
  </div>
) : (
        <div>
          {/* Stats Summary */}
        <StatsSummary events={events} />
        
        {/* Filter Tabs */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Events List */}
        <div className="space-y-3">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-[#1e1e32] rounded-2xl animate-pulse" />
            ))
          ) : filteredEvents.length === 0 ? (
            <EmptyStateNoOMAData onRefresh={loadEvents} />
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isExpanded={expandedId === event.id}
                onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
              />
            ))
          )}
        </div>

        </div>
)}

      </div>

      {/* Link Generator Modal */}
      <LinkGenerator 
        isOpen={showLinkGenerator} 
        onClose={() => setShowLinkGenerator(false)} 
      />
    </div>
  );
};

export default ScreenOMA;

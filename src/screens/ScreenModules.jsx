import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { moduleService } from '../services/moduleService';
import { Skeleton } from '../components/common/Skeleton';
import { testDatabaseConnection } from '../utils/testDb';
import { IconArrowLeft, IconSearch, IconCheck, IconTarget, IconWarning, IconModules, IconAnalytics, IconZap, IconLink } from '../components/icons';

const ScreenModules = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [modules, setModules] = useState([]);
  const [userModules, setUserModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [stats, setStats] = useState({ total: 0, engagement: 0, automation: 0, analytics: 0, integration: 0 });
  const [togglingModules, setTogglingModules] = useState(new Set());

  useEffect(() => {
    loadModulesData();
  }, [user]);

  const loadModulesData = async () => {
    if (!user) {
      setError('請先登入');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Loading modules for user:', user.id);

      const modulesRes = await moduleService.getAllModules();
      console.log('Modules response:', modulesRes);

      if (modulesRes.error) {
        throw new Error(modulesRes.error);
      }

      if (!modulesRes.data || modulesRes.data.length === 0) {
        throw new Error('無法載入模組資料');
      }

      setModules(modulesRes.data);

      const userModulesRes = await moduleService.getUserEnabledModules(user.id);
      console.log('User modules response:', userModulesRes);

      if (userModulesRes.data) {
        const userModulesMap = {};
        userModulesRes.data.forEach(um => {
          userModulesMap[um.module_id] = um.is_enabled;
        });
        setUserModules(userModulesMap);
      }

      const statsRes = await moduleService.getModuleStats();
      console.log('Stats response:', statsRes);

      if (statsRes.data) {
        setStats(statsRes.data);
      }

      console.log('All data loaded successfully');
    } catch (error) {
      console.error('Error loading modules:', error);
      setError(error.message || '載入模組失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const matchesCategory = currentFilter === 'all' || module.category === currentFilter;
      const matchesSearch = searchTerm === '' ||
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [modules, currentFilter, searchTerm]);

  const handleToggleModule = async (moduleId, event) => {
    event.stopPropagation();

    if (togglingModules.has(moduleId)) return;

    setTogglingModules(prev => new Set(prev).add(moduleId));

    try {
      const { data, error } = await moduleService.toggleModule(user.id, moduleId);

      if (error) {
        console.error('Error toggling module:', error);
        return;
      }

      setUserModules(prev => ({
        ...prev,
        [moduleId]: data.is_enabled
      }));
    } catch (error) {
      console.error('Error toggling module:', error);
    } finally {
      setTogglingModules(prev => {
        const newSet = new Set(prev);
        newSet.delete(moduleId);
        return newSet;
      });
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      engagement: '互動行銷',
      automation: '自動化',
      analytics: '數據分析',
      integration: '整合工具'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto pb-24 bg-[#0f0f1a]">
        <div className="px-6 pt-12 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded bg-[#1a1a2e]" />
            <Skeleton className="h-5 w-16 bg-[#1a1a2e]" />
          </div>
          <Skeleton className="h-32 w-full rounded-2xl bg-[#1a1a2e]" />
          <Skeleton className="h-24 w-full rounded-2xl bg-[#1a1a2e]" />
          <Skeleton className="h-40 w-full rounded-2xl bg-[#1a1a2e]" />
          <Skeleton className="h-40 w-full rounded-2xl bg-[#1a1a2e]" />
        </div>
      </div>
    );
  }

  if (error) {
    const handleTestConnection = async () => {
      const results = await testDatabaseConnection();
      console.log('數據庫測試結果:', results);
      alert(`測試結果:\n認證: ${results.auth ? '✓' : '✗'}\n模組表: ${results.modulesTable ? '✓' : '✗'}\n模組數量: ${results.moduleCount}\n錯誤: ${results.errors.join(', ') || '無'}`);
    };

    return (
      <div className="h-full overflow-y-auto pb-24 bg-[#0f0f1a]">
        <div className="px-6 pt-12">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
          >
            <IconArrowLeft size={20} />
            <span className="font-semibold">返回</span>
          </button>
          <div className="bg-[#1a1a2e] rounded-2xl border border-white/5 p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#FFB74D]/20 rounded-full flex items-center justify-center">
              <IconWarning size={32} className="text-[#FFB74D]" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">{error}</h2>
            <div className="text-left bg-[#0f0f1a] rounded-xl p-3 mb-4 text-xs border border-white/5">
              <p className="text-white/60 mb-1"><strong className="text-white/80">用戶ID:</strong> {user?.id || '無'}</p>
              <p className="text-white/60 mb-1"><strong className="text-white/80">用戶Email:</strong> {user?.email || '無'}</p>
              <p className="text-white/60"><strong className="text-white/80">認證狀態:</strong> {user ? '已登入' : '未登入'}</p>
            </div>
            <div className="space-y-2">
              <button
                onClick={loadModulesData}
                className="w-full px-6 py-2.5 bg-[#00E5A0] text-[#0f0f1a] rounded-xl font-semibold hover:bg-[#00FFB4] transition-colors"
              >
                重新載入
              </button>
              <button
                onClick={handleTestConnection}
                className="w-full px-6 py-2.5 bg-[#2a2a3e] text-white/70 rounded-xl font-semibold hover:bg-[#3a3a4e] transition-colors text-sm"
              >
                測試數據庫連接
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-24 bg-[#0f0f1a]">
      <div className="px-6 pt-12 pb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
        >
          <IconArrowLeft size={20} />
          <span className="font-semibold">返回</span>
        </button>

        <div className="bg-gradient-to-br from-[#00E5A0] to-[#00B87A] rounded-[24px] p-6 mb-4 text-white">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <IconTarget size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">OakMega 模組中心</h1>
              <p className="text-white/80 text-xs">23+ 專業 LINE Social CRM 工具</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs opacity-90">模組</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{Object.values(userModules).filter(Boolean).length}</div>
              <div className="text-xs opacity-90">已啟用</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{stats.total - Object.values(userModules).filter(Boolean).length}</div>
              <div className="text-xs opacity-90">可用</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a2e] rounded-[24px] border border-white/5 p-4 mb-4">
          <div className="relative mb-3">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f0f1a] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00E5A0] text-sm text-white placeholder-white/30 border border-white/5"
              placeholder="搜尋模組名稱或功能..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === 'all'
                  ? 'bg-[#00E5A0] text-[#0f0f1a]'
                  : 'bg-[#2a2a3e] text-white/60 hover:text-white'
              }`}
              onClick={() => setCurrentFilter('all')}
            >
              全部 ({stats.total})
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === 'engagement'
                  ? 'bg-[#00E5A0] text-[#0f0f1a]'
                  : 'bg-[#2a2a3e] text-white/60 hover:text-white'
              }`}
              onClick={() => setCurrentFilter('engagement')}
            >
              互動 ({stats.engagement})
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === 'automation'
                  ? 'bg-[#00E5A0] text-[#0f0f1a]'
                  : 'bg-[#2a2a3e] text-white/60 hover:text-white'
              }`}
              onClick={() => setCurrentFilter('automation')}
            >
              自動化 ({stats.automation})
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === 'analytics'
                  ? 'bg-[#00E5A0] text-[#0f0f1a]'
                  : 'bg-[#2a2a3e] text-white/60 hover:text-white'
              }`}
              onClick={() => setCurrentFilter('analytics')}
            >
              分析 ({stats.analytics})
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentFilter === 'integration'
                  ? 'bg-[#00E5A0] text-[#0f0f1a]'
                  : 'bg-[#2a2a3e] text-white/60 hover:text-white'
              }`}
              onClick={() => setCurrentFilter('integration')}
            >
              整合 ({stats.integration})
            </button>
          </div>
        </div>

        {filteredModules.length === 0 ? (
          <div className="bg-[#1a1a2e] rounded-[24px] border border-white/5 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2a2a3e] rounded-full flex items-center justify-center">
              <IconSearch size={32} className="text-white/40" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">查無相關模組</h2>
            <p className="text-white/50 text-xs">調整搜尋條件或篩選器後重試</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredModules.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                isEnabled={userModules[module.id] || false}
                isToggling={togglingModules.has(module.id)}
                onSelect={() => setSelectedModule(module)}
                onToggle={(e) => handleToggleModule(module.id, e)}
                getCategoryLabel={getCategoryLabel}
              />
            ))}
          </div>
        )}
      </div>

      {selectedModule && (
        <ModuleModal
          module={selectedModule}
          isEnabled={userModules[selectedModule.id] || false}
          isToggling={togglingModules.has(selectedModule.id)}
          onClose={() => setSelectedModule(null)}
          onToggle={(e) => handleToggleModule(selectedModule.id, e)}
          getCategoryLabel={getCategoryLabel}
        />
      )}
    </div>
  );
};

const ModuleCard = ({ module, isEnabled, isToggling, onSelect, onToggle, getCategoryLabel }) => {
  const features = Array.isArray(module.features) ? module.features : JSON.parse(module.features || '[]');

  const getCategoryColor = (category) => {
    const colors = {
      engagement: 'from-[#00E5A0] to-[#00B87A]',
      automation: 'from-[#7E57FF] to-[#6B4EE0]',
      analytics: 'from-[#FFB74D] to-[#FF8F00]',
      integration: 'from-[#00BCD4] to-[#0097A7]'
    };
    return colors[category] || 'from-[#64748b] to-[#475569]';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'engagement': return <IconModules size={24} className="text-white" />;
      case 'automation': return <IconZap size={24} className="text-white" />;
      case 'analytics': return <IconAnalytics size={24} className="text-white" />;
      case 'integration': return <IconLink size={24} className="text-white" />;
      default: return <IconModules size={24} className="text-white" />;
    }
  };

  return (
    <div
      className="bg-[#1a1a2e] rounded-[24px] border border-white/5 overflow-hidden transition-all active:scale-[0.98] hover:border-white/10"
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={`bg-gradient-to-br ${getCategoryColor(module.category)} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
            {getCategoryIcon(module.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base mb-1 line-clamp-1">{module.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                module.category === 'engagement' ? 'bg-[#00E5A0]/20 text-[#00E5A0]' :
                module.category === 'automation' ? 'bg-[#7E57FF]/20 text-[#9F7AEA]' :
                module.category === 'analytics' ? 'bg-[#FFB74D]/20 text-[#FFB74D]' :
                'bg-[#00BCD4]/20 text-[#00BCD4]'
              }`}>
                {getCategoryLabel(module.category)}
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3].map(i => (
                  <span
                    key={i}
                    className={`text-[10px] ${i <= module.difficulty ? 'text-[#FFB74D]' : 'text-white/20'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{module.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEnabled ? (
            <div className="w-6 h-6 rounded-full bg-[#00E5A0]/20 flex items-center justify-center flex-shrink-0">
              <IconCheck size={14} className="text-[#00E5A0]" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border border-white/20 flex-shrink-0" />
          )}
          <button
            className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
              isEnabled
                ? 'bg-[#2a2a3e] text-white/60 hover:bg-[#3a3a4e]'
                : 'bg-[#00E5A0] text-[#0f0f1a] hover:bg-[#00FFB4] shadow-lg shadow-[#00E5A0]/20'
            } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onToggle}
            disabled={isToggling}
          >
            {isToggling ? '處理中...' : isEnabled ? '已啟用' : '立即啟用'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ModuleModal = ({ module, isEnabled, isToggling, onClose, onToggle, getCategoryLabel }) => {
  const features = Array.isArray(module.features) ? module.features : JSON.parse(module.features || '[]');
  const keyBenefits = Array.isArray(module.key_benefits) ? module.key_benefits : JSON.parse(module.key_benefits || '[]');

  const getCategoryColor = (category) => {
    const colors = {
      engagement: 'from-[#00E5A0] to-[#00B87A]',
      automation: 'from-[#7E57FF] to-[#6B4EE0]',
      analytics: 'from-[#FFB74D] to-[#FF8F00]',
      integration: 'from-[#00BCD4] to-[#0097A7]'
    };
    return colors[category] || 'from-[#64748b] to-[#475569]';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'engagement': return <IconModules size={28} className="text-white" />;
      case 'automation': return <IconZap size={28} className="text-white" />;
      case 'analytics': return <IconAnalytics size={28} className="text-white" />;
      case 'integration': return <IconLink size={28} className="text-white" />;
      default: return <IconModules size={28} className="text-white" />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-end justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a2e] rounded-t-[32px] w-full max-h-[85vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#1a1a2e] border-b border-white/5 z-10">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-4" />
          <div className="px-6 pb-4">
            <div className="flex items-start gap-4">
              <div className={`bg-gradient-to-br ${getCategoryColor(module.category)} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                {getCategoryIcon(module.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-white mb-2">{module.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    module.category === 'engagement' ? 'bg-[#00E5A0]/20 text-[#00E5A0]' :
                    module.category === 'automation' ? 'bg-[#7E57FF]/20 text-[#9F7AEA]' :
                    module.category === 'analytics' ? 'bg-[#FFB74D]/20 text-[#FFB74D]' :
                    'bg-[#00BCD4]/20 text-[#00BCD4]'
                  }`}>
                    {getCategoryLabel(module.category)}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(i => (
                      <span
                        key={i}
                        className={`text-xs ${i <= module.difficulty ? 'text-[#FFB74D]' : 'text-white/20'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="text-white/40 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00E5A0] rounded-full" />
              模組介紹
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">{module.full_description}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00E5A0] rounded-full" />
              核心特點
            </h3>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#7E57FF] rounded-full" />
              主要優勢
            </h3>
            <div className="space-y-2">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#7E57FF] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0f1a] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60 font-medium">難度等級</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <span
                    key={i}
                    className={`text-base ${i <= module.difficulty ? 'text-[#FFB74D]' : 'text-white/20'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-[#1a1a2e] pt-4 pb-6 -mx-6 px-6 border-t border-white/5">
            <div className="flex gap-3">
              <button
                className="flex-1 py-3.5 bg-[#2a2a3e] text-white/70 rounded-xl font-bold text-sm hover:bg-[#3a3a4e] transition-all"
                onClick={onClose}
              >
                關閉
              </button>
              <button
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isEnabled
                    ? 'bg-red-500/80 text-white hover:bg-red-500 shadow-red-500/20'
                    : 'bg-[#00E5A0] text-[#0f0f1a] hover:bg-[#00FFB4] shadow-[#00E5A0]/20'
                } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onToggle}
                disabled={isToggling}
              >
                {isToggling ? '處理中...' : isEnabled ? '停用模組' : '啟用模組'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenModules;

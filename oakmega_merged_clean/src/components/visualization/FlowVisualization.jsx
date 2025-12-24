import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { IconSend, IconTag, IconCoupon, IconFilter, IconRefresh, IconSelection } from '../icons';

// Flow path types with their colors
const FLOW_TYPES = {
  converted: { color: '#00E5A0', label: '已轉換', description: '完成購買' },
  interested: { color: '#FFB74D', label: '有意願', description: '加入購物車但未結帳' },
  lost: { color: '#64748b', label: '流失', description: '已讀不回' },
};

// Generate flow paths from center node
const generateFlowPaths = (centerX, centerY, count, containerWidth, containerHeight) => {
  const paths = [];
  const types = Object.keys(FLOW_TYPES);
  
  for (let i = 0; i < count; i++) {
    // Distribute angles around the center (mostly going downward like roots)
    const baseAngle = Math.PI * 0.3 + (Math.PI * 0.4 * Math.random());
    const side = i % 2 === 0 ? 1 : -1;
    const angle = baseAngle * side;
    
    // Random length and curvature
    const length = 100 + Math.random() * 200;
    const midLength = length * 0.5;
    const curve = (Math.random() - 0.5) * 60;
    
    // Control points for bezier curve
    const midX = centerX + Math.sin(angle) * midLength + curve;
    const midY = centerY + Math.cos(angle) * midLength;
    const endX = centerX + Math.sin(angle) * length + curve * 1.5;
    const endY = centerY + Math.cos(angle) * length;
    
    // Assign type based on probability (60% lost, 25% interested, 15% converted)
    const rand = Math.random();
    const type = rand < 0.15 ? 'converted' : rand < 0.40 ? 'interested' : 'lost';
    
    // Generate additional user data
    const userId = `user_${String(i + 1).padStart(4, '0')}`;
    const value = type === 'converted' ? Math.floor(Math.random() * 5000) + 500 : 
                  type === 'interested' ? Math.floor(Math.random() * 3000) + 200 : 0;
    
    paths.push({
      id: i,
      userId,
      type,
      color: FLOW_TYPES[type].color,
      startX: centerX,
      startY: centerY,
      midX,
      midY,
      endX,
      endY,
      value,
      label: FLOW_TYPES[type].label,
      selected: false,
      tags: type === 'interested' ? ['購物車棄單', '高潛力'] : 
            type === 'converted' ? ['已購買', 'VIP'] : ['待召回'],
    });
  }
  
  return paths;
};

// Single flow path component
const FlowPath = React.memo(({ path, isSelected, onSelect, delay = 0 }) => {
  const pathD = `M ${path.startX} ${path.startY} Q ${path.midX} ${path.midY} ${path.endX} ${path.endY}`;
  
  return (
    <g 
      className={`cursor-pointer transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
      onClick={() => onSelect(path.id)}
    >
      {/* Glow effect for selected paths */}
      {isSelected && (
        <path
          d={pathD}
          fill="none"
          stroke={path.color}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
          filter="blur(4px)"
        />
      )}
      
      {/* Main path */}
      <path
        d={pathD}
        fill="none"
        stroke={path.color}
        strokeWidth={isSelected ? 3 : 1.5}
        strokeLinecap="round"
        style={{
          strokeDasharray: isSelected ? 'none' : '1000',
          strokeDashoffset: isSelected ? 0 : '1000',
          animation: `flowDraw 1.5s ease-out ${delay}ms forwards`,
        }}
      />
      
      {/* End node */}
      <circle
        cx={path.endX}
        cy={path.endY}
        r={isSelected ? 6 : 4}
        fill={path.color}
        className="transition-all duration-300"
        style={{
          opacity: 0,
          animation: `nodeFadeIn 0.3s ease-out ${delay + 1200}ms forwards`,
        }}
      />
      
      {/* Pulse animation for interested paths */}
      {path.type === 'interested' && (
        <circle
          cx={path.endX}
          cy={path.endY}
          r="8"
          fill="none"
          stroke={path.color}
          strokeWidth="2"
          opacity="0"
          style={{
            animation: `pulseRing 2s ease-out ${delay + 1500}ms infinite`,
          }}
        />
      )}
    </g>
  );
});

// Selection box component
const SelectionBox = ({ start, current, isActive }) => {
  if (!isActive || !start) return null;
  
  const x = Math.min(start.x, current.x);
  const y = Math.min(start.y, current.y);
  const width = Math.abs(current.x - start.x);
  const height = Math.abs(current.y - start.y);
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(0, 229, 160, 0.1)"
      stroke="#00E5A0"
      strokeWidth="1"
      strokeDasharray="4 2"
      rx="4"
    />
  );
};

// Action toolbar component
const ActionToolbar = ({ selectedCount, selectedType, onAction, onClear }) => {
  if (selectedCount === 0) return null;
  
  const typeLabel = selectedType ? FLOW_TYPES[selectedType]?.label : '混合';
  
  return (
    <div 
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1e1e32] border border-white/10 rounded-2xl p-4 shadow-2xl z-20"
      style={{
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      <div className="flex flex-col gap-4 min-w-[200px]">
        <div className="text-center border-b border-white/10 pb-3">
          <p className="text-white/60 text-xs">已選擇</p>
          <p className="text-white text-2xl font-bold">{selectedCount}</p>
          <p className="text-white/40 text-xs">{typeLabel}用戶</p>
        </div>
        
        <button
          onClick={() => onAction('coupon')}
          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 rounded-xl transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <IconCoupon size={20} active className="text-amber-400" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">發送優惠券</p>
            <p className="text-white/40 text-xs">推送折扣碼</p>
          </div>
        </button>
        
        <button
          onClick={() => onAction('tag')}
          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 rounded-xl transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <IconTag size={20} className="text-purple-400" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">貼上標籤</p>
            <p className="text-white/40 text-xs">分類管理</p>
          </div>
        </button>
        
        <button
          onClick={() => onAction('broadcast')}
          className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 rounded-xl transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <IconSend size={20} className="text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="text-white text-sm font-medium">建立旅程</p>
            <p className="text-white/40 text-xs">自動化再行銷</p>
          </div>
        </button>
        
        <button
          onClick={onClear}
          className="text-white/40 text-sm hover:text-white transition-colors mt-2"
        >
          清除選擇
        </button>
      </div>
    </div>
  );
};

// Stats panel component
const StatsPanel = ({ paths, filter, onFilterChange }) => {
  const stats = useMemo(() => {
    const converted = paths.filter(p => p.type === 'converted').length;
    const interested = paths.filter(p => p.type === 'interested').length;
    const lost = paths.filter(p => p.type === 'lost').length;
    const totalValue = paths.filter(p => p.type === 'converted').reduce((sum, p) => sum + p.value, 0);
    const potentialValue = paths.filter(p => p.type === 'interested').reduce((sum, p) => sum + p.value, 0);
    
    return { converted, interested, lost, total: paths.length, totalValue, potentialValue };
  }, [paths]);
  
  return (
    <div className="absolute left-4 top-4 flex flex-col gap-2 z-10">
      <button
        onClick={() => onFilterChange(null)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${filter === null ? 'bg-white/10 border border-white/20' : 'bg-white/5 hover:bg-white/10'}`}
      >
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-slate-400" />
        <span className="text-white/80 text-xs font-medium">全部</span>
        <span className="text-white/40 text-xs">{stats.total}</span>
      </button>
      
      {Object.entries(FLOW_TYPES).map(([key, value]) => (
        <button
          key={key}
          onClick={() => onFilterChange(filter === key ? null : key)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${filter === key ? 'bg-white/10 border border-white/20' : 'bg-white/5 hover:bg-white/10'}`}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }} />
          <span className="text-white/80 text-xs font-medium">{value.label}</span>
          <span className="text-white/40 text-xs">
            {key === 'converted' ? stats.converted : key === 'interested' ? stats.interested : stats.lost}
          </span>
        </button>
      ))}
      
      <div className="mt-2 pt-2 border-t border-white/10">
        <div className="px-3 py-2">
          <p className="text-white/40 text-xs">已轉換營收</p>
          <p className="text-emerald-400 text-sm font-bold">NT$ {stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-white/40 text-xs">潛在營收</p>
          <p className="text-amber-400 text-sm font-bold">NT$ {stats.potentialValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// Main Flow Visualization Component
export const FlowVisualization = ({ 
  pathCount = 150,
  onAction,
  className = '',
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [paths, setPaths] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filter, setFilter] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionCurrent, setSelectionCurrent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate center point
  const centerX = dimensions.width / 2;
  const centerY = 60;
  
  // Initialize paths
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setIsLoading(true);
      const newPaths = generateFlowPaths(centerX, centerY, pathCount, dimensions.width, dimensions.height);
      setPaths(newPaths);
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [dimensions, pathCount, centerX, centerY]);
  
  // Handle container resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  
  // Handle path selection
  const handlePathSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);
  
  // Handle box selection
  const handleMouseDown = useCallback((e) => {
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'rect') return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsSelecting(true);
    setSelectionStart({ x, y });
    setSelectionCurrent({ x, y });
  }, []);
  
  const handleMouseMove = useCallback((e) => {
    if (!isSelecting) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSelectionCurrent({ x, y });
  }, [isSelecting]);
  
  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !selectionStart || !selectionCurrent) {
      setIsSelecting(false);
      return;
    }
    
    // Calculate selection bounds
    const minX = Math.min(selectionStart.x, selectionCurrent.x);
    const maxX = Math.max(selectionStart.x, selectionCurrent.x);
    const minY = Math.min(selectionStart.y, selectionCurrent.y);
    const maxY = Math.max(selectionStart.y, selectionCurrent.y);
    
    // Only select if the box is large enough
    if (maxX - minX > 20 && maxY - minY > 20) {
      const newSelection = new Set();
      paths.forEach(path => {
        // Check if end point is within selection
        if (path.endX >= minX && path.endX <= maxX && path.endY >= minY && path.endY <= maxY) {
          // Apply filter if active
          if (!filter || path.type === filter) {
            newSelection.add(path.id);
          }
        }
      });
      setSelectedIds(newSelection);
    }
    
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionCurrent(null);
  }, [isSelecting, selectionStart, selectionCurrent, paths, filter]);
  
  // Handle action on selected paths
  const handleAction = useCallback((actionType) => {
    const selectedPaths = paths.filter(p => selectedIds.has(p.id));
    if (onAction) {
      onAction(actionType, selectedPaths);
    }
  }, [paths, selectedIds, onAction]);
  
  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);
  
  // Refresh visualization
  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setSelectedIds(new Set());
    const newPaths = generateFlowPaths(centerX, centerY, pathCount, dimensions.width, dimensions.height);
    setPaths(newPaths);
    setTimeout(() => setIsLoading(false), 500);
  }, [centerX, centerY, pathCount, dimensions]);
  
  // Get filtered paths
  const filteredPaths = useMemo(() => {
    if (!filter) return paths;
    return paths.filter(p => p.type === filter);
  }, [paths, filter]);
  
  // Determine primary selected type
  const selectedType = useMemo(() => {
    if (selectedIds.size === 0) return null;
    const selectedPaths = paths.filter(p => selectedIds.has(p.id));
    const types = new Set(selectedPaths.map(p => p.type));
    return types.size === 1 ? [...types][0] : null;
  }, [paths, selectedIds]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-[#0f0f1a] overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Radial gradient from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(0,229,160,0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Stats Panel */}
      <StatsPanel paths={paths} filter={filter} onFilterChange={setFilter} />
      
      {/* Controls */}
      <div className="absolute right-4 top-4 flex gap-2 z-10">
        <button
          onClick={handleRefresh}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
          title="重新整理"
        >
          <IconRefresh size={18} className={`text-white/60 group-hover:text-white ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
          title="框選模式"
        >
          <IconSelection size={18} className="text-white/60 group-hover:text-white" />
        </button>
        <button
          onClick={() => setFilter(null)}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
          title="清除篩選"
        >
          <IconFilter size={18} className="text-white/60 group-hover:text-white" />
        </button>
      </div>
      
      {/* Instruction hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 z-10">
        <p className="text-white/40 text-xs">拖曳框選用戶節點 → 執行批次操作</p>
      </div>
      
      {/* SVG Canvas */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradient for center node */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5A0" stopOpacity="1"/>
            <stop offset="50%" stopColor="#00E5A0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#00E5A0" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Flow paths */}
        <g>
          {filteredPaths.map((path, index) => (
            <FlowPath
              key={path.id}
              path={path}
              isSelected={selectedIds.has(path.id)}
              onSelect={handlePathSelect}
              delay={index * 10}
            />
          ))}
        </g>
        
        {/* Center campaign node */}
        <g filter="url(#glow)">
          {/* Outer pulse rings */}
          <circle cx={centerX} cy={centerY} r="30" fill="none" stroke="#00E5A0" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" from="20" to="50" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx={centerX} cy={centerY} r="20" fill="none" stroke="#00E5A0" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" from="20" to="50" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          
          {/* Main center node */}
          <circle cx={centerX} cy={centerY} r="20" fill="url(#centerGlow)" stroke="#00E5A0" strokeWidth="2"/>
          <circle cx={centerX} cy={centerY} r="8" fill="#00E5A0"/>
        </g>
        
        {/* Campaign label */}
        <text x={centerX} y={centerY - 35} textAnchor="middle" fill="white" fontSize="12" fontWeight="600">
          行銷活動
        </text>
        <text x={centerX} y={centerY - 22} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">
          雙12 促銷
        </text>
        
        {/* Selection box */}
        <SelectionBox 
          start={selectionStart}
          current={selectionCurrent}
          isActive={isSelecting}
        />
      </svg>
      
      {/* Action Toolbar */}
      <ActionToolbar
        selectedCount={selectedIds.size}
        selectedType={selectedType}
        onAction={handleAction}
        onClear={clearSelection}
      />
      
      {/* CSS Animations */}
      <style>{`
        @keyframes flowDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes nodeFadeIn {
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulseRing {
          0% {
            r: 4;
            opacity: 0.8;
          }
          100% {
            r: 15;
            opacity: 0;
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default FlowVisualization;

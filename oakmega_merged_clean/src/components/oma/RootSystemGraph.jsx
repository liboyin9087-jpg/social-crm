import React, { useEffect, useMemo, useRef, useState } from 'react';

// --- Tiny deterministic RNG so preview looks stable ---
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function screenToWorld({ x, y }, view) {
  // view: { ox, oy, scale } where world -> screen: (p*scale + offset)
  return {
    x: (x - view.ox) / view.scale,
    y: (y - view.oy) / view.scale,
  };
}

function rectNorm(r) {
  const x1 = Math.min(r.x1, r.x2);
  const y1 = Math.min(r.y1, r.y2);
  const x2 = Math.max(r.x1, r.x2);
  const y2 = Math.max(r.y1, r.y2);
  return { x1, y1, x2, y2 };
}

export function RootSystemGraph({ campaignName = '雙 11 推播', seed = 42, onSelectionChange }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  const [view, setView] = useState({ ox: 0, oy: 0, scale: 1 });
  const [drag, setDrag] = useState(null); // {startX,startY, startOx,startOy}
  const [hoverId, setHoverId] = useState(null);
  const [selected, setSelected] = useState([]); // node ids
  const [selectRect, setSelectRect] = useState(null); // {x1,y1,x2,y2} in screen coords
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Palette aligned to Canopy tokens (use opacity instead of new colors)
  const palette = {
    forest: '#2F3A25',
    oakmoss: '#6A6C51',
    gold: '#D8B589',
    paper: '#F9F9F7',
    bark: '#4A4A4A',
    mist: 'rgba(255,255,255,0.10)',
  };

  // Build a lightweight "root system" graph for preview
  const graph = useMemo(() => {
    const rand = mulberry32(seed);

    const nodes = [];
    const edges = [];

    const trunk = { id: 'campaign', type: 'campaign', label: campaignName, x: 0, y: 0 };
    nodes.push(trunk);

    // Create clusters of user paths. Three outcomes.
    const counts = { converted: 60, interested: 70, lost: 45 };

    function makeNodes(kind, count, ringR, jitter) {
      for (let i = 0; i < count; i++) {
        const a = rand() * Math.PI * 2;
        const r = ringR + (rand() - 0.5) * jitter;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        const id = `${kind}_${i}`;
        nodes.push({ id, type: 'user', kind, label: `usr_${kind.slice(0, 1)}${String(i).padStart(3, '0')}`, x, y });
        edges.push({ id: `e_${kind}_${i}`, from: 'campaign', to: id, kind });

        // Add 1-3 intermediate touchpoints (nodes) along the edge to mimic "leaf veins"
        const hops = 1 + Math.floor(rand() * 3);
        let prev = 'campaign';
        for (let h = 0; h < hops; h++) {
          const t = (h + 1) / (hops + 1);
          const nx = x * t + (rand() - 0.5) * 40;
          const ny = y * t + (rand() - 0.5) * 40;
          const nid = `${kind}_${i}_n${h}`;
          nodes.push({ id: nid, type: 'node', kind, label: h === hops - 1 ? 'checkout?' : 'touch', x: nx, y: ny });
          edges.push({ id: `e_${kind}_${i}_h${h}`, from: prev, to: nid, kind, subtle: true });
          prev = nid;
        }
        edges.push({ id: `e_${kind}_${i}_final`, from: prev, to: id, kind, subtle: true });
      }
    }

    makeNodes('converted', counts.converted, 520, 160);
    makeNodes('interested', counts.interested, 620, 220);
    makeNodes('lost', counts.lost, 700, 260);

    const nodeById = new Map(nodes.map((n) => [n.id, n]));
    return { nodes, edges, nodeById };
  }, [campaignName, seed]);

  // Initialize view to center
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    setView({ ox: width / 2, oy: height / 2 + 30, scale: 0.9 });
  }, []);

  useEffect(() => {
    onSelectionChange?.(selected);
    setDrawerOpen(selected.length > 0);
  }, [selected, onSelectionChange]);

  // Toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  function kindStyle(kind) {
    if (kind === 'converted') return { stroke: palette.oakmoss, fill: palette.oakmoss };
    if (kind === 'interested') return { stroke: palette.gold, fill: palette.gold };
    return { stroke: 'rgba(255,255,255,0.35)', fill: 'rgba(255,255,255,0.35)' };
  }

  function onWheel(e) {
    e.preventDefault();
    const rect = wrapRef.current.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const before = screenToWorld({ x: sx, y: sy }, view);

    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.08 : 0.93;
    const nextScale = clamp(view.scale * factor, 0.45, 1.8);

    // Keep cursor point anchored while zooming
    const nextOx = sx - before.x * nextScale;
    const nextOy = sy - before.y * nextScale;
    setView({ ox: nextOx, oy: nextOy, scale: nextScale });
  }

  function onPointerDown(e) {
    // Left click only
    if (e.button !== 0) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    // Shift + drag => box select
    if (e.shiftKey) {
      setSelectRect({ x1: sx, y1: sy, x2: sx, y2: sy });
      return;
    }

    setDrag({ startX: sx, startY: sy, startOx: view.ox, startOy: view.oy });
  }

  function onPointerMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (selectRect) {
      setSelectRect((r) => ({ ...r, x2: sx, y2: sy }));
      return;
    }

    if (!drag) return;
    const dx = sx - drag.startX;
    const dy = sy - drag.startY;
    setView((v) => ({ ...v, ox: drag.startOx + dx, oy: drag.startOy + dy }));
  }

  function onPointerUp() {
    if (selectRect) {
      const r = rectNorm(selectRect);
      // Convert selection rect to world
      const w1 = screenToWorld({ x: r.x1, y: r.y1 }, view);
      const w2 = screenToWorld({ x: r.x2, y: r.y2 }, view);
      const wr = rectNorm({ x1: w1.x, y1: w1.y, x2: w2.x, y2: w2.y });

      const picked = graph.nodes
        .filter((n) => n.type === 'user')
        .filter((n) => n.x >= wr.x1 && n.x <= wr.x2 && n.y >= wr.y1 && n.y <= wr.y2)
        .map((n) => n.id);

      setSelected(picked);
      setSelectRect(null);
      setDrag(null);
      return;
    }

    setDrag(null);
  }

  function toggleSelect(id) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  }

  function clearSelection() {
    setSelected([]);
  }

  // DnD actions
  function onDropAction(e) {
    e.preventDefault();
    const payload = e.dataTransfer.getData('text/plain');
    if (!payload) return;
    if (selected.length === 0) {
      setToast('先框選一群節點，再套用動作');
      return;
    }
    setToast(`已套用「${payload}」到 ${selected.length} 位用戶`);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  // Tooltip position
  const tooltip = useMemo(() => {
    if (!hoverId) return null;
    const n = graph.nodeById.get(hoverId);
    if (!n) return null;
    const sx = n.x * view.scale + view.ox;
    const sy = n.y * view.scale + view.oy;
    return { node: n, sx, sy };
  }, [hoverId, graph, view]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
      onWheel={onWheel}
      onClick={() => {
        if (selected.length === 0) setDrawerOpen(false);
      }}
    >
      {/* Top overlay controls */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-full bg-black/20 border border-white/10 text-white text-xs">
          滑鼠拖曳：移動畫布　｜　滾輪：縮放　｜　Shift+拖曳：框選
        </div>
      </div>

      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs hover:-translate-y-0.5 transition"
          onClick={() => setView((v) => ({ ...v, scale: clamp(v.scale * 1.12, 0.45, 1.8) }))}
        >
          放大
        </button>
        <button
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs hover:-translate-y-0.5 transition"
          onClick={() => setView((v) => ({ ...v, scale: clamp(v.scale * 0.9, 0.45, 1.8) }))}
        >
          縮小
        </button>
        <button
          className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs hover:-translate-y-0.5 transition"
          onClick={clearSelection}
          disabled={selected.length === 0}
        >
          清除選取
        </button>
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        onClick={() => {
          if (selected.length === 0) setDrawerOpen(false);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* subtle background noise */}
        <defs>
          <radialGradient id="canopyGlow" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="rgba(216,181,137,0.18)" />
            <stop offset="55%" stopColor="rgba(106,108,81,0.12)" />
            <stop offset="100%" stopColor="rgba(47,58,37,0)" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" fill="url(#canopyGlow)" />

        <g transform={`translate(${view.ox} ${view.oy}) scale(${view.scale})`}>
          {/* edges */}
          {graph.edges.map((e) => {
            const a = graph.nodeById.get(e.from);
            const b = graph.nodeById.get(e.to);
            if (!a || !b) return null;
            const style = kindStyle(e.kind);
            const opacity = e.subtle ? 0.25 : 0.45;
            const width = e.subtle ? 1.1 : 1.7;
            return (
              <path
                key={e.id}
                d={`M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - 26} ${b.x} ${b.y}`}
                fill="none"
                stroke={style.stroke}
                strokeOpacity={opacity}
                strokeWidth={width}
              />
            );
          })}

          {/* nodes */}
          {graph.nodes.map((n) => {
            if (n.type === 'campaign') {
              return (
                <g key={n.id}>
                  <circle r="18" cx={n.x} cy={n.y} fill={palette.gold} opacity="0.9" filter="url(#softGlow)" />
                  <circle r="34" cx={n.x} cy={n.y} fill={palette.gold} opacity="0.12" />
                  <text x={n.x} y={n.y - 44} textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="14" fontWeight="800">
                    {n.label}
                  </text>
                  <text x={n.x} y={n.y - 26} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10">
                    Campaign Node
                  </text>
                </g>
              );
            }

            if (n.type === 'node') {
              const style = kindStyle(n.kind);
              return (
                <circle
                  key={n.id}
                  r={3.2}
                  cx={n.x}
                  cy={n.y}
                  fill={style.fill}
                  opacity={0.35}
                />
              );
            }

            // user node
            const style = kindStyle(n.kind);
            const isSel = selected.includes(n.id);
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId((hid) => (hid === n.id ? null : hid))}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(n.id);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isSel ? 10.5 : 8.5}
                  cx={n.x}
                  cy={n.y}
                  fill={style.fill}
                  opacity={isSel ? 0.92 : 0.70}
                  filter={isSel ? 'url(#softGlow)' : undefined}
                />
                {isSel && <circle r={16} cx={n.x} cy={n.y} fill={style.fill} opacity={0.12} />}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute left-4 bottom-4 z-20 flex items-center gap-3 text-xs">
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/20 border border-white/10 text-white">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: palette.oakmoss }} />
          成功轉換
          <span className="ml-2 inline-block w-2.5 h-2.5 rounded-full" style={{ background: palette.gold }} />
          有興趣未轉換
          <span className="ml-2 inline-block w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.35)' }} />
          流失
        </div>
        <div className="px-3 py-2 rounded-2xl bg-black/20 border border-white/10 text-white">
          目前選取：<span className="text-canopy-gold font-bold">{selected.length}</span>
        </div>
      </div>

      {/* Selection rectangle (screen space) */}
      {selectRect && (() => {
        const r = rectNorm(selectRect);
        return (
          <div
            className="absolute z-30 border border-white/40 bg-white/10"
            style={{ left: r.x1, top: r.y1, width: r.x2 - r.x1, height: r.y2 - r.y1 }}
          />
        );
      })()}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-40 px-3 py-2 rounded-2xl bg-black/30 border border-white/10 text-white text-xs backdrop-blur"
          style={{ left: tooltip.sx + 12, top: tooltip.sy - 10 }}
        >
          <div className="font-bold">{tooltip.node.label}</div>
          <div className="text-white/60">
            {tooltip.node.kind === 'converted' ? '已轉換（綠）' : tooltip.node.kind === 'interested' ? '未轉換（金）' : '流失（灰）'}
          </div>
          <div className="text-white/40">點擊：加入選取</div>
        </div>
      )}

      {/* Action Drawer (MVP) */}
      <div
        className={`absolute top-0 right-0 h-full w-[320px] z-30 transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onDrop={onDropAction}
        onDragOver={onDragOver}
      >
        <div className="h-full bg-black/25 border-l border-white/10 backdrop-blur p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-canopy-gold text-xs font-bold">ACTION</div>
              <div className="text-white font-black text-lg">Activation</div>
              <div className="text-white/50 text-xs">把動作拖進來或直接點按</div>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 text-white hover:-translate-y-0.5 transition"
              onClick={() => setDrawerOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-white/10 border border-white/10 text-white text-sm">
            已選取 <span className="text-canopy-gold font-extrabold">{selected.length}</span> 位
            <div className="text-white/50 text-xs mt-1">（Shift+拖曳框選一群節點）</div>
          </div>

          <div className="mt-4">
            <div className="text-white/70 text-xs font-bold mb-2">可拖曳模組</div>
            <div className="flex flex-wrap gap-2">
              {['免運券模組', 'VIP 標籤', '再行銷旅程'].map((t) => (
                <div
                  key={t}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', t)}
                  className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 text-white text-xs cursor-grab active:cursor-grabbing hover:-translate-y-0.5 transition"
                  title="拖到右側抽屜（或這個區塊）套用"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              className="w-full py-3 rounded-2xl bg-canopy-oakmoss text-white font-bold hover:-translate-y-0.5 transition"
              onClick={() => selected.length ? setToast(`已對 ${selected.length} 位用戶：貼上標籤`) : setToast('先框選一群節點')}
            >
              貼上標籤
            </button>
            <button
              className="w-full py-3 rounded-2xl bg-canopy-gold text-canopy-forest font-black hover:-translate-y-0.5 transition"
              onClick={() => selected.length ? setToast(`已對 ${selected.length} 位用戶：發送優惠券`) : setToast('先框選一群節點')}
            >
              發送優惠券
            </button>
            <div className="text-white/40 text-xs pt-2">
              這裡是 MVP：已完成「選取 → 動作」閉環。後續可接 CRM/LINE 旅程 API。
            </div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 text-xs">
            Drop Zone：把模組拖到此抽屜任一位置，就會套用到選取的節點。
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/35 border border-white/10 text-white text-sm backdrop-blur">
          {toast}
        </div>
      )}

      {/* 點擊畫布空白處：可關閉抽屜（MVP 行為） */}
      {/* Hint to open drawer */}
      {!drawerOpen && selected.length > 0 && (
        <button
          className="absolute right-4 bottom-4 z-40 px-4 py-2 rounded-full bg-canopy-gold text-canopy-forest font-black hover:-translate-y-0.5 transition"
          onClick={() => setDrawerOpen(true)}
        >
          開啟操作面板
        </button>
      )}
    </div>
  );
}

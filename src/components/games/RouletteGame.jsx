<!doctype html>
<html lang="zh-TW" class="h-full">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lucky Roulette</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&amp;display=swap" rel="stylesheet">
  <style>
    body {
      box-sizing: border-box;
    }
    
    * {
      font-family: 'Noto Sans TC', system-ui, sans-serif;
    }
    
    @keyframes spin-wheel {
      from { transform: rotate(var(--start-rotation)); }
      to { transform: rotate(var(--end-rotation)); }
    }
    
    .wheel-spinning {
      animation: spin-wheel 3.5s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2); }
      50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3); }
    }
    
    .glow-effect {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    @keyframes bounce-in {
      0% { transform: scale(0.5); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .bounce-in {
      animation: bounce-in 0.5s ease-out forwards;
    }
    
    @keyframes confetti-fall {
      0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100%) rotate(720deg); opacity: 0; }
    }
    
    .confetti {
      position: absolute;
      animation: confetti-fall 3s ease-out forwards;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(1deg); }
    }
    
    .float-animation {
      animation: float 4s ease-in-out infinite;
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    .sparkle {
      animation: sparkle 2s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    .gold-shimmer {
      background: linear-gradient(90deg, #FFD700 0%, #FFF8DC 25%, #FFD700 50%, #FFF8DC 75%, #FFD700 100%);
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .wheel-container {
      filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
    }
    
    .pointer-shadow {
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
    }
    
    /* Ticket perforated edge */
    .ticket-edge-left,
    .ticket-edge-right {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px 0;
    }
    
    .ticket-edge-left { left: -10px; }
    .ticket-edge-right { right: -10px; }
    
    .ticket-hole {
      width: 20px;
      height: 20px;
      background: #1a0a0a;
      border-radius: 50%;
    }
    
    /* Guilloche Pattern */
    .guilloche-pattern {
      background-image: 
        repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 4px),
        repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,215,0,0.1) 2px, rgba(255,215,0,0.1) 4px);
    }
    
    .serial-font {
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    
    @keyframes spin-icon {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .spin-icon-animate {
      animation: spin-icon 0.5s linear infinite;
    }
  </style>
  <style>@view-transition { navigation: auto; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body class="h-full m-0 overflow-auto">
  <div id="app" class="min-h-full w-full flex items-center justify-center p-6" style="background: linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 50%, #1a0505 100%);"><!-- Decorative Background Stars -->
   <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="sparkle absolute top-[10%] left-[15%] text-yellow-400 text-2xl" style="animation-delay: 0s;">
     ✦
    </div>
    <div class="sparkle absolute top-[20%] right-[20%] text-yellow-300 text-xl" style="animation-delay: 0.5s;">
     ✦
    </div>
    <div class="sparkle absolute bottom-[30%] left-[10%] text-yellow-500 text-lg" style="animation-delay: 1s;">
     ✦
    </div>
    <div class="sparkle absolute bottom-[20%] right-[15%] text-yellow-400 text-2xl" style="animation-delay: 1.5s;">
     ✦
    </div>
    <div class="sparkle absolute top-[50%] left-[5%] text-yellow-300" style="animation-delay: 0.7s;">
     ✦
    </div>
    <div class="sparkle absolute top-[40%] right-[8%] text-yellow-500" style="animation-delay: 1.2s;">
     ✦
    </div>
   </div><!-- Main Ticket Container -->
   <div class="relative z-10 w-full max-w-md float-animation"><!-- The Lottery Ticket -->
    <div class="relative"><!-- Ticket Body -->
     <div class="relative rounded-lg overflow-hidden shadow-2xl" style="background: linear-gradient(135deg, #8B0000 0%, #DC143C 30%, #B22222 70%, #8B0000 100%);"><!-- Perforated Edges -->
      <div class="ticket-edge-left">
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
      </div>
      <div class="ticket-edge-right">
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
       <div class="ticket-hole"></div>
      </div><!-- Guilloche Pattern Overlay -->
      <div class="absolute inset-0 guilloche-pattern pointer-events-none"></div><!-- Inner Border Frame -->
      <div class="m-3 border-2 border-yellow-500/50 rounded-lg p-4"><!-- Top Decorative Band -->
       <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-1">
         <svg class="w-5 h-5 text-yellow-400" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
         <svg class="w-4 h-4 text-yellow-300" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
         <svg class="w-3 h-3 text-yellow-200" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
        </div>
        <div class="flex items-center gap-1">
         <svg class="w-3 h-3 text-yellow-200" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
         <svg class="w-4 h-4 text-yellow-300" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
         <svg class="w-5 h-5 text-yellow-400" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
         </svg>
        </div>
       </div><!-- Title Section -->
       <div class="text-center mb-4">
        <div class="inline-block px-6 py-1 rounded-full border-2 border-yellow-400/60 mb-2" style="background: linear-gradient(90deg, rgba(255,215,0,0.2), rgba(255,165,0,0.3), rgba(255,215,0,0.2));"><span class="text-yellow-100 text-xs tracking-widest">★ 限量發行 ★</span>
        </div>
        <h1 id="game-title" class="text-3xl font-black gold-shimmer mb-1">幸運大轉盤</h1>
        <p class="text-yellow-200/80 text-sm">轉動輪盤 贏取大獎</p>
       </div><!-- Prize Tiers Display -->
       <div class="flex justify-center gap-2 mb-4 flex-wrap">
        <div class="text-center px-2 py-1 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-[10px]">
          頭獎
         </div>
         <div class="text-yellow-100 font-bold text-xs">
          500點
         </div>
        </div>
        <div class="text-center px-2 py-1 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-[10px]">
          貳獎
         </div>
         <div class="text-yellow-100 font-bold text-xs">
          免運券
         </div>
        </div>
        <div class="text-center px-2 py-1 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-[10px]">
          參獎
         </div>
         <div class="text-yellow-100 font-bold text-xs">
          咖啡券
         </div>
        </div>
       </div><!-- Wheel Container -->
       <div class="relative flex justify-center mb-4"><!-- Pointer -->
        <div class="absolute -top-1 left-1/2 -translate-x-1/2 z-20 pointer-shadow">
         <svg width="28" height="36" viewbox="0 0 32 40" fill="none"><defs>
           <lineargradient id="pointerGrad" x1="16" y1="0" x2="16" y2="40">
            <stop offset="0%" stop-color="#FFD700" />
            <stop offset="50%" stop-color="#FFA500" />
            <stop offset="100%" stop-color="#FF8C00" />
           </lineargradient>
          </defs> <path d="M16 0L28 32L16 26L4 32L16 0Z" fill="url(#pointerGrad)" /> <circle cx="16" cy="20" r="4" fill="#fff" opacity="0.5" />
         </svg>
        </div><!-- Outer Ring with Lights -->
        <div class="wheel-container relative">
         <div class="absolute inset-0 rounded-full glow-effect" style="margin: -8px;"></div><!-- Decorative Light Ring -->
         <div class="absolute inset-0 rounded-full" style="margin: -10px;">
          <svg class="w-full h-full" viewbox="0 0 260 260"><circle cx="130" cy="130" r="126" fill="none" stroke="url(#ringGradWheel)" stroke-width="4" /> <defs>
            <lineargradient id="ringGradWheel" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stop-color="#FFD700" />
             <stop offset="50%" stop-color="#FFA500" />
             <stop offset="100%" stop-color="#FFD700" />
            </lineargradient>
           </defs> <!-- Light bulbs around wheel --> <circle cx="130" cy="8" r="4" fill="#FFD700" class="sparkle" style="animation-delay: 0s;" /> <circle cx="208" cy="52" r="4" fill="#FF6B9D" class="sparkle" style="animation-delay: 0.15s;" /> <circle cx="252" cy="130" r="4" fill="#4DD0E1" class="sparkle" style="animation-delay: 0.3s;" /> <circle cx="208" cy="208" r="4" fill="#81C784" class="sparkle" style="animation-delay: 0.45s;" /> <circle cx="130" cy="252" r="4" fill="#BA68C8" class="sparkle" style="animation-delay: 0.6s;" /> <circle cx="52" cy="208" r="4" fill="#FFB74D" class="sparkle" style="animation-delay: 0.75s;" /> <circle cx="8" cy="130" r="4" fill="#FFD700" class="sparkle" style="animation-delay: 0.9s;" /> <circle cx="52" cy="52" r="4" fill="#FF6B9D" class="sparkle" style="animation-delay: 1.05s;" />
          </svg>
         </div><!-- Main Wheel -->
         <div id="wheel" class="w-56 h-56 rounded-full relative overflow-hidden border-4 border-yellow-500 shadow-inner" style="--start-rotation: 0deg; --end-rotation: 0deg;">
          <svg viewbox="0 0 200 200" class="w-full h-full"><!-- Prize Segments --> <g id="segments"></g> <!-- Center Circle --> <circle cx="100" cy="100" r="22" fill="url(#centerGrad)" stroke="#FFD700" stroke-width="3" /> <defs>
            <radialgradient id="centerGrad" cx="50%" cy="30%" r="60%">
             <stop offset="0%" stop-color="#8B0000" />
             <stop offset="100%" stop-color="#DC143C" />
            </radialgradient>
           </defs> <text x="100" y="104" text-anchor="middle" fill="#FFD700" font-size="12" font-weight="bold">
            GO
           </text>
          </svg>
         </div>
        </div>
       </div><!-- Stats -->
       <div class="flex justify-center gap-3 mb-4">
        <div class="text-center px-4 py-2 rounded-lg bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-xs">
          抽獎次數
         </div>
         <div id="spin-count" class="text-xl font-black text-yellow-100">
          0
         </div>
        </div>
        <div class="text-center px-4 py-2 rounded-lg bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-xs">
          累計點數
         </div>
         <div id="total-points" class="text-xl font-black text-yellow-100">
          0
         </div>
        </div>
       </div><!-- Last Win Display -->
       <div id="last-win" class="text-center mb-4 hidden">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-900/50 border border-yellow-500/40"><span class="text-yellow-300 text-xs">上次獲得:</span> <span id="last-win-text" class="font-bold text-yellow-100 text-sm"></span>
        </div>
       </div><!-- Bottom Section -->
       <div class="flex items-center justify-between pt-3 border-t border-yellow-600/30">
        <div class="flex items-center gap-2">
         <div class="w-8 h-8 rounded border border-yellow-500/50 flex items-center justify-center" style="background: linear-gradient(135deg, #FFD700, #FFA500);"><span class="text-red-900 font-black text-xs">$</span>
         </div>
         <div>
          <div class="text-yellow-100 text-xs font-bold">
           官方認證
          </div>
          <div class="text-yellow-300/60 text-[10px]">
           OFFICIAL
          </div>
         </div>
        </div>
        <div class="text-right">
         <div class="serial-font text-yellow-300/80 text-[10px]">
          NO. 77777777
         </div>
         <div class="text-yellow-100 text-xs font-medium">
          每日一抽
         </div>
        </div>
       </div>
      </div><!-- Bottom Decorative Band -->
      <div class="h-6 flex items-center justify-center gap-2" style="background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);"><span class="text-red-900 text-xs font-bold tracking-wider">✦ 轉出好運 ✦ 贏取大獎 ✦ 幸運就是你 ✦</span>
      </div>
     </div><!-- Spin Button Below Ticket --> <button id="spin-btn" class="w-full mt-4 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2 border-yellow-600" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #8B0000;">
      <svg id="spin-icon" class="w-6 h-6" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /> <path d="M3 3v5h5" />
      </svg><span id="spin-btn-text">開始抽獎</span> </button>
    </div>
   </div><!-- Reward Modal -->
   <div id="reward-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 hidden">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" id="modal-backdrop"></div>
    <div id="confetti-container" class="absolute inset-0 pointer-events-none overflow-hidden"></div>
    <div class="relative rounded-2xl p-8 max-w-xs w-full text-center transform scale-95 opacity-0 transition-all duration-300 border-4 border-yellow-500" id="modal-content" style="background: linear-gradient(135deg, #8B0000, #DC143C, #8B0000);"><!-- Close Button --> <button id="modal-close" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 flex items-center justify-center transition-colors text-yellow-300">
      <svg width="16" height="16" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" />
      </svg></button> <!-- Stars -->
     <div class="flex justify-center gap-1 mb-3">
      <svg class="w-6 h-6 text-yellow-400" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg class="w-8 h-8 text-yellow-300" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg class="w-6 h-6 text-yellow-400" viewbox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
     </div><!-- Trophy -->
     <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
      <svg width="44" height="44" viewbox="0 0 24 24" fill="none"><path d="M12 17C14.5 17 16.5 15.5 17 13H7C7.5 15.5 9.5 17 12 17Z" fill="#8B0000" /> <path d="M17 4H7V8C7 11.3 9.7 14 13 14H11C7.7 14 5 11.3 5 8V4H3V8C3 10.8 4.6 13.2 7 14.5V17H17V14.5C19.4 13.2 21 10.8 21 8V4H19V8C19 11.3 16.3 14 13 14H11C14.3 14 17 11.3 17 8V4Z" fill="#8B0000" /> <rect x="9" y="17" width="6" height="2" rx="1" fill="#8B0000" /> <rect x="7" y="19" width="10" height="3" rx="1.5" fill="#8B0000" />
      </svg>
     </div>
     <h2 id="modal-title" class="text-2xl font-black text-yellow-300 mb-2">🎊 恭喜獲得 🎊</h2>
     <div class="py-4 px-6 rounded-xl mb-6 border-2 border-yellow-500/50 bounce-in" id="modal-prize-container" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
      <p id="modal-prize" class="text-3xl font-black text-red-900"></p>
     </div><button id="modal-confirm" class="w-full py-3 rounded-xl font-black text-lg transition-all duration-200 hover:scale-105 border-2 border-yellow-600" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #8B0000;"> 太棒了！ </button>
    </div>
   </div>
  </div>
  <script>
    // Prize data - lottery themed colors
    const prizes = [
      { id: 1, label: '500 點', value: 500, color: '#C41E3A' },
      { id: 2, label: '免運券', value: 'shipping', color: '#D4AF37' },
      { id: 3, label: '100 點', value: 100, color: '#8B0000' },
      { id: 4, label: '咖啡券', value: 'coffee', color: '#C41E3A' },
      { id: 5, label: '200 點', value: 200, color: '#D4AF37' },
      { id: 6, label: '翻倍機會', value: 'double', color: '#8B0000' },
      { id: 7, label: '50 點', value: 50, color: '#C41E3A' },
    ];
    
    const SEG = 360 / prizes.length;
    
    // Default configuration
    const defaultConfig = {
      game_title: '幸運大轉盤',
      spin_button_text: '開始抽獎',
      reward_title: '恭喜獲得!',
      primary_color: '#C41E3A',
      secondary_color: '#8B0000',
      accent_color: '#D4AF37',
      text_color: '#FEF3C7',
      background_color: '#1a0a0a'
    };
    
    // State
    let config = { ...defaultConfig };
    let isSpinning = false;
    let currentRotation = 0;
    let spinCount = 0;
    let totalPoints = 0;
    let wonPrize = null;
    
    // DOM Elements
    const wheel = document.getElementById('wheel');
    const segmentsGroup = document.getElementById('segments');
    const spinBtn = document.getElementById('spin-btn');
    const spinBtnText = document.getElementById('spin-btn-text');
    const spinIcon = document.getElementById('spin-icon');
    const spinCountEl = document.getElementById('spin-count');
    const totalPointsEl = document.getElementById('total-points');
    const lastWinEl = document.getElementById('last-win');
    const lastWinText = document.getElementById('last-win-text');
    const gameTitle = document.getElementById('game-title');
    
    const rewardModal = document.getElementById('reward-modal');
    const modalContent = document.getElementById('modal-content');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalTitle = document.getElementById('modal-title');
    const modalPrize = document.getElementById('modal-prize');
    const confettiContainer = document.getElementById('confetti-container');
    const appContainer = document.getElementById('app');
    
    // Create wheel segments
    function createWheelSegments() {
      segmentsGroup.innerHTML = '';
      
      prizes.forEach((prize, i) => {
        const startAngle = (i * SEG - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * SEG - 90) * (Math.PI / 180);
        
        const x1 = 100 + 95 * Math.cos(startAngle);
        const y1 = 100 + 95 * Math.sin(startAngle);
        const x2 = 100 + 95 * Math.cos(endAngle);
        const y2 = 100 + 95 * Math.sin(endAngle);
        
        const largeArc = SEG > 180 ? 1 : 0;
        const d = `M 100 100 L ${x1} ${y1} A 95 95 0 ${largeArc} 1 ${x2} ${y2} Z`;
        
        // Create path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', prize.color);
        path.setAttribute('stroke', '#FFD700');
        path.setAttribute('stroke-width', '2');
        segmentsGroup.appendChild(path);
        
        // Create text
        const textAngle = ((i + 0.5) * SEG - 90) * (Math.PI / 180);
        const textX = 100 + 58 * Math.cos(textAngle);
        const textY = 100 + 58 * Math.sin(textAngle);
        const textRotation = (i + 0.5) * SEG;
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', textX);
        text.setAttribute('y', textY);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', prize.color === '#D4AF37' ? '#8B0000' : '#FEF3C7');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('transform', `rotate(${textRotation}, ${textX}, ${textY})`);
        text.setAttribute('style', 'text-shadow: 0 1px 2px rgba(0,0,0,0.5);');
        text.textContent = prize.label;
        segmentsGroup.appendChild(text);
      });
    }
    
    // Spin the wheel
    function spin() {
      if (isSpinning) return;
      
      isSpinning = true;
      spinBtn.disabled = true;
      spinIcon.classList.add('spin-icon-animate');
      
      // Random prize index
      const targetIndex = Math.floor(Math.random() * prizes.length);
      
      // Calculate target rotation (pointer at top = 0 degrees)
      const targetDeg = 360 - (targetIndex * SEG + SEG / 2);
      const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));
      const newRotation = currentRotation + extraSpins + targetDeg;
      
      // Apply rotation
      wheel.style.setProperty('--start-rotation', `${currentRotation}deg`);
      wheel.style.setProperty('--end-rotation', `${newRotation}deg`);
      wheel.classList.remove('wheel-spinning');
      void wheel.offsetWidth; // Trigger reflow
      wheel.classList.add('wheel-spinning');
      
      currentRotation = newRotation;
      wonPrize = prizes[targetIndex];
      
      // After spin completes
      setTimeout(() => {
        spinCount++;
        spinCountEl.textContent = spinCount;
        
        if (typeof wonPrize.value === 'number') {
          totalPoints += wonPrize.value;
          totalPointsEl.textContent = totalPoints;
        }
        
        // Update last win
        lastWinEl.classList.remove('hidden');
        lastWinText.textContent = wonPrize.label;
        
        isSpinning = false;
        spinBtn.disabled = false;
        spinIcon.classList.remove('spin-icon-animate');
        
        // Show modal
        showModal();
        
        // Vibrate if supported
        if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
      }, 3500);
    }
    
    // Create confetti
    function createConfetti() {
      confettiContainer.innerHTML = '';
      const colors = ['#FFD700', '#FFA500', '#DC143C', '#8B0000', '#FEF3C7', '#FF8C00'];
      
      for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.width = `${8 + Math.random() * 8}px`;
        confetti.style.height = `${8 + Math.random() * 8}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confettiContainer.appendChild(confetti);
      }
    }
    
    // Show modal
    function showModal() {
      modalTitle.textContent = config.reward_title || defaultConfig.reward_title;
      modalPrize.textContent = wonPrize.label;
      
      rewardModal.classList.remove('hidden');
      createConfetti();
      
      requestAnimationFrame(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
      });
    }
    
    // Hide modal
    function hideModal() {
      modalContent.classList.remove('scale-100', 'opacity-100');
      modalContent.classList.add('scale-95', 'opacity-0');
      
      setTimeout(() => {
        rewardModal.classList.add('hidden');
        confettiContainer.innerHTML = '';
      }, 300);
    }
    
    // Event listeners
    spinBtn.addEventListener('click', spin);
    modalBackdrop.addEventListener('click', hideModal);
    modalClose.addEventListener('click', hideModal);
    modalConfirm.addEventListener('click', hideModal);
    
    // Config change handler
    async function onConfigChange(cfg) {
      config = { ...defaultConfig, ...cfg };
      
      // Update text content
      gameTitle.textContent = config.game_title || defaultConfig.game_title;
      spinBtnText.textContent = config.spin_button_text || defaultConfig.spin_button_text;
      
      // Update background color
      appContainer.style.background = `linear-gradient(135deg, ${config.background_color} 0%, #2d0a0a 50%, #1a0505 100%)`;
    }
    
    // Initialize SDK
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (cfg) => ({
          recolorables: [
            {
              get: () => cfg.background_color || defaultConfig.background_color,
              set: (v) => { cfg.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
            },
            {
              get: () => cfg.primary_color || defaultConfig.primary_color,
              set: (v) => { cfg.primary_color = v; window.elementSdk.setConfig({ primary_color: v }); }
            },
            {
              get: () => cfg.accent_color || defaultConfig.accent_color,
              set: (v) => { cfg.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); }
            },
            {
              get: () => cfg.text_color || defaultConfig.text_color,
              set: (v) => { cfg.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
            }
          ],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (cfg) => new Map([
          ['game_title', cfg.game_title || defaultConfig.game_title],
          ['spin_button_text', cfg.spin_button_text || defaultConfig.spin_button_text],
          ['reward_title', cfg.reward_title || defaultConfig.reward_title]
        ])
      });
    }
    
    // Initial setup
    createWheelSegments();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9b2cc984f4dab307',t:'MTc2NjU0NDU4NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
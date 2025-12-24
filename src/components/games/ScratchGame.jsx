<!doctype html>
<html lang="zh-TW" class="h-full">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Scratch Card</title>
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
    
    .scratch-canvas {
      touch-action: none;
      cursor: crosshair;
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
    
    .ticket-edge-left {
      left: -10px;
    }
    
    .ticket-edge-right {
      right: -10px;
    }
    
    .ticket-hole {
      width: 20px;
      height: 20px;
      background: #1a1a2e;
      border-radius: 50%;
    }
    
    /* Decorative patterns */
    .guilloche-pattern {
      background-image: 
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          rgba(255,215,0,0.1) 2px,
          rgba(255,215,0,0.1) 4px
        ),
        repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 2px,
          rgba(255,215,0,0.1) 2px,
          rgba(255,215,0,0.1) 4px
        );
    }
    
    .ticket-border {
      border: 3px solid;
      border-image: linear-gradient(135deg, #FFD700, #FFA500, #FFD700, #FFA500, #FFD700) 1;
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    .gold-shimmer {
      background: linear-gradient(
        90deg,
        #FFD700 0%,
        #FFF8DC 25%,
        #FFD700 50%,
        #FFF8DC 75%,
        #FFD700 100%
      );
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(1deg); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    .float-animation {
      animation: float 4s ease-in-out infinite;
    }
    
    .sparkle {
      animation: sparkle 2s ease-in-out infinite;
    }
    
    @keyframes confetti-fall {
      0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    .confetti {
      position: absolute;
      animation: confetti-fall 3s ease-out forwards;
    }
    
    /* Serial number style */
    .serial-font {
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    
    /* Scratch area silver coating look */
    .scratch-overlay {
      background: 
        repeating-linear-gradient(
          90deg,
          #C0C0C0 0px,
          #E8E8E8 1px,
          #C0C0C0 2px,
          #D8D8D8 3px
        ),
        linear-gradient(180deg, #D4D4D4 0%, #A8A8A8 50%, #C4C4C4 100%);
    }
  </style>
  <style>@view-transition { navigation: auto; }</style>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body class="h-full m-0 overflow-auto">
  <div id="app" class="min-h-full w-full flex items-center justify-center p-6" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);"><!-- Decorative Background Stars -->
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
        <h1 id="ticket-title" class="text-3xl font-black gold-shimmer mb-1">幸運刮刮樂</h1>
        <p class="text-yellow-200/80 text-sm">刮開下方區域 領取您的獎勵</p>
       </div><!-- Prize Tiers Display -->
       <div class="flex justify-center gap-3 mb-4">
        <div class="text-center px-3 py-1.5 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-xs">
          頭獎
         </div>
         <div class="text-yellow-100 font-bold text-sm">
          $10,000
         </div>
        </div>
        <div class="text-center px-3 py-1.5 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-xs">
          貳獎
         </div>
         <div class="text-yellow-100 font-bold text-sm">
          $5,000
         </div>
        </div>
        <div class="text-center px-3 py-1.5 rounded bg-yellow-900/40 border border-yellow-600/30">
         <div class="text-yellow-300 text-xs">
          參獎
         </div>
         <div class="text-yellow-100 font-bold text-sm">
          $1,000
         </div>
        </div>
       </div><!-- Scratch Area Container -->
       <div class="relative rounded-lg overflow-hidden border-4 border-yellow-600/50 shadow-inner" style="aspect-ratio: 2.5/1;"><!-- Reward Layer (Behind) -->
        <div id="reward-layer" class="absolute inset-0 flex flex-col items-center justify-center" style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);"><!-- Decorative circles -->
         <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/20"></div>
          <div class="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/20"></div>
          <div class="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-white/10"></div>
         </div><!-- Trophy Icon -->
         <div class="relative">
          <svg width="48" height="48" viewbox="0 0 24 24" fill="none" class="drop-shadow-lg"><path d="M12 17C14.5 17 16.5 15.5 17 13H7C7.5 15.5 9.5 17 12 17Z" fill="#8B0000" /> <path d="M17 4H7V8C7 11.3 9.7 14 13 14H11C7.7 14 5 11.3 5 8V4H3V8C3 10.8 4.6 13.2 7 14.5V17H17V14.5C19.4 13.2 21 10.8 21 8V4H19V8C19 11.3 16.3 14 13 14H11C14.3 14 17 11.3 17 8V4Z" fill="#8B0000" /> <rect x="9" y="17" width="6" height="2" rx="1" fill="#8B0000" /> <rect x="7" y="19" width="10" height="3" rx="1.5" fill="#8B0000" />
          </svg>
         </div>
         <p id="reward-title" class="text-red-900 font-black text-lg mt-1">恭喜中獎!</p>
         <p id="reward-amount" class="text-red-900 font-black text-3xl">$1,000</p>
        </div><!-- Scratch Canvas (Silver Coating) -->
        <canvas id="scratch-canvas" class="scratch-canvas absolute inset-0 w-full h-full"></canvas>
       </div><!-- Hint Text -->
       <div class="text-center mt-3 mb-2"><span class="text-yellow-200/60 text-xs">👆 用手指或滑鼠刮開銀色區域</span>
       </div><!-- Bottom Section -->
       <div class="flex items-center justify-between pt-2 border-t border-yellow-600/30">
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
          NO. 88888888
         </div>
         <div id="progress-display" class="text-yellow-100 text-xs font-medium">
          進度: 0%
         </div>
        </div>
       </div>
      </div><!-- Bottom Decorative Band -->
      <div class="h-6 flex items-center justify-center gap-2" style="background: linear-gradient(90deg, #FFD700, #FFA500, #FFD700);"><span class="text-red-900 text-xs font-bold tracking-wider">✦ 刮出好運 ✦ 贏取大獎 ✦ 幸運就是你 ✦</span>
      </div>
     </div><!-- Action Buttons Below Ticket -->
     <div class="flex gap-3 mt-4"><button id="reset-btn" class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur transition-all duration-200 text-white/80 hover:text-white font-medium border border-white/20">
       <svg width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /> <path d="M3 3v5h5" />
       </svg><span>重新刮</span> </button> <button id="claim-btn" class="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #8B0000; border-color: #FFD700;" disabled>
       <svg width="18" height="18" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="14" rx="2" /> <path d="M12 8v14" /> <path d="M3 12h18" /> <path d="M12 8a4 4 0 0 0-4-4c-1.5 0-2.5 1-3 2s.5 2 2 2h5" /> <path d="M12 8a4 4 0 0 1 4-4c1.5 0 2.5 1 3 2s-.5 2-2 2h-5" />
       </svg><span id="claim-text">領取獎勵</span> </button>
     </div>
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
     <h2 class="text-2xl font-black text-yellow-300 mb-2">🎊 恭喜中獎 🎊</h2>
     <p class="text-yellow-100/80 mb-4">您已成功獲得獎勵！</p>
     <div class="py-4 px-6 rounded-xl mb-6 border-2 border-yellow-500/50" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
      <p class="text-red-900 text-sm font-medium mb-1">獲得金額</p>
      <p id="modal-amount" class="text-4xl font-black text-red-900">$1,000</p>
     </div><button id="modal-confirm" class="w-full py-3 rounded-xl font-black text-lg transition-all duration-200 hover:scale-105 border-2 border-yellow-600" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #8B0000;"> 太棒了！ </button>
    </div>
   </div>
  </div>
  <script>
    // Default configuration
    const defaultConfig = {
      ticket_title: '幸運刮刮樂',
      reward_title: '恭喜中獎!',
      reward_amount: '$1,000',
      primary_color: '#DC143C',
      secondary_color: '#8B0000',
      accent_color: '#FFD700',
      text_color: '#FEF3C7',
      background_color: '#1a1a2e'
    };
    
    // State
    let config = { ...defaultConfig };
    let progress = 0;
    let revealed = false;
    let claimed = false;
    let isDrawing = false;
    let lastPos = { x: 0, y: 0 };
    let lastCheck = 0;
    
    // DOM Elements
    const canvas = document.getElementById('scratch-canvas');
    const progressDisplay = document.getElementById('progress-display');
    const claimBtn = document.getElementById('claim-btn');
    const claimText = document.getElementById('claim-text');
    const resetBtn = document.getElementById('reset-btn');
    const rewardModal = document.getElementById('reward-modal');
    const modalContent = document.getElementById('modal-content');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalAmount = document.getElementById('modal-amount');
    const ticketTitle = document.getElementById('ticket-title');
    const rewardTitle = document.getElementById('reward-title');
    const rewardAmount = document.getElementById('reward-amount');
    const confettiContainer = document.getElementById('confetti-container');
    const appContainer = document.getElementById('app');
    
    // Setup Canvas with silver lottery coating
    function setupCanvas() {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Create realistic silver scratch coating
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#C0C0C0');
      gradient.addColorStop(0.3, '#E8E8E8');
      gradient.addColorStop(0.5, '#D0D0D0');
      gradient.addColorStop(0.7, '#E0E0E0');
      gradient.addColorStop(1, '#B8B8B8');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Add vertical scratch lines for realism
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < rect.width; i += 3) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, rect.height);
        ctx.stroke();
      }
      
      // Add subtle noise texture
      ctx.fillStyle = 'rgba(0,0,0,0.02)';
      for (let i = 0; i < 500; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        ctx.fillRect(x, y, 1, 1);
      }
      
      // Add "刮開此處" text
      ctx.font = 'bold 14px "Noto Sans TC", sans-serif';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('刮開此處', rect.width / 2, rect.height / 2 - 10);
      
      // Add arrow icon
      ctx.font = '20px sans-serif';
      ctx.fillText('👆', rect.width / 2, rect.height / 2 + 15);
      
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Get position from event
    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const pt = e.touches?.[0] ?? e;
      return {
        x: pt.clientX - rect.left,
        y: pt.clientY - rect.top
      };
    }
    
    // Scratch at position
    function scratchAt(x, y) {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 40;
      
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.globalCompositeOperation = 'source-over';
      lastPos = { x, y };
    }
    
    // Check progress
    function checkProgress() {
      if (!canvas) return;
      
      const now = performance.now();
      if (now - lastCheck < 100) return;
      lastCheck = now;
      
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const img = ctx.getImageData(0, 0, w, h).data;
      
      const step = Math.max(12, Math.floor(Math.min(w, h) / 60));
      let transparent = 0;
      let total = 0;
      
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4 + 3;
          if (img[idx] < 128) transparent++;
          total++;
        }
      }
      
      progress = Math.round((transparent / Math.max(1, total)) * 100);
      updateProgress();
      
      if (progress >= 70 && !revealed) {
        revealed = true;
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.5s ease';
      }
    }
    
    // Update progress UI
    function updateProgress() {
      progressDisplay.textContent = `進度: ${progress}%`;
      
      if (progress >= 70 && !claimed) {
        claimBtn.disabled = false;
        claimBtn.style.transform = 'scale(1.02)';
        claimBtn.style.boxShadow = '0 0 20px rgba(255,215,0,0.5)';
      }
    }
    
    // Create confetti
    function createConfetti() {
      confettiContainer.innerHTML = '';
      const colors = ['#FFD700', '#FFA500', '#DC143C', '#FF6B6B', '#FFE66D', '#FF8C00'];
      
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
      modalAmount.textContent = config.reward_amount || defaultConfig.reward_amount;
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
    
    // Reset game
    function resetGame() {
      progress = 0;
      revealed = false;
      claimed = false;
      
      canvas.style.opacity = '1';
      canvas.style.transition = 'none';
      
      setupCanvas();
      updateProgress();
      
      claimBtn.disabled = true;
      claimBtn.style.transform = '';
      claimBtn.style.boxShadow = '';
      claimText.textContent = '領取獎勵';
    }
    
    // Event handlers
    function handleStart(e) {
      e.preventDefault();
      isDrawing = true;
      lastPos = getPos(e);
    }
    
    function handleMove(e) {
      if (!isDrawing) return;
      e.preventDefault();
      
      const pos = getPos(e);
      scratchAt(pos.x, pos.y);
      checkProgress();
    }
    
    function handleEnd() {
      isDrawing = false;
    }
    
    // Bind events
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);
    
    resetBtn.addEventListener('click', resetGame);
    
    claimBtn.addEventListener('click', () => {
      if (progress >= 70 && !claimed) {
        claimed = true;
        claimText.textContent = '已領取';
        claimBtn.disabled = true;
        claimBtn.style.transform = '';
        claimBtn.style.boxShadow = '';
        showModal();
      }
    });
    
    modalBackdrop.addEventListener('click', hideModal);
    modalClose.addEventListener('click', hideModal);
    modalConfirm.addEventListener('click', hideModal);
    
    window.addEventListener('resize', () => {
      if (!revealed) setupCanvas();
    });
    
    // Config change handler
    async function onConfigChange(cfg) {
      config = { ...defaultConfig, ...cfg };
      
      // Update text content
      ticketTitle.textContent = config.ticket_title || defaultConfig.ticket_title;
      rewardTitle.textContent = config.reward_title || defaultConfig.reward_title;
      rewardAmount.textContent = config.reward_amount || defaultConfig.reward_amount;
      modalAmount.textContent = config.reward_amount || defaultConfig.reward_amount;
      
      // Update colors
      appContainer.style.background = `linear-gradient(135deg, ${config.background_color} 0%, #16213e 50%, #0f3460 100%)`;
      
      // Re-setup canvas if not revealed
      if (!revealed) {
        setupCanvas();
      }
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
          ['ticket_title', cfg.ticket_title || defaultConfig.ticket_title],
          ['reward_title', cfg.reward_title || defaultConfig.reward_title],
          ['reward_amount', cfg.reward_amount || defaultConfig.reward_amount]
        ])
      });
    }
    
    // Initial setup
    setupCanvas();
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9b2cbdd1d184b307',t:'MTc2NjU0NDEwNS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
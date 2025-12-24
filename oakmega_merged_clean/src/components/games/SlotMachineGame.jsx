import React, { useState } from 'react';

const SlotSymbol = ({ type, className = '' }) => {
  const symbols = {
    cherry: (
      <svg viewBox="0 0 32 32" className={className}>
        <defs>
          <linearGradient id="cherryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5252"/>
            <stop offset="100%" stopColor="#D32F2F"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="20" r="8" fill="url(#cherryGrad)"/>
        <circle cx="22" cy="18" r="7" fill="url(#cherryGrad)"/>
        <path d="M12 12 Q16 4 22 11" stroke="#4CAF50" strokeWidth="2" fill="none"/>
      </svg>
    ),
    lemon: (
      <svg viewBox="0 0 32 32" className={className}>
        <defs>
          <linearGradient id="lemonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176"/>
            <stop offset="100%" stopColor="#FBC02D"/>
          </linearGradient>
        </defs>
        <ellipse cx="16" cy="16" rx="12" ry="10" fill="url(#lemonGrad)"/>
      </svg>
    ),
    grape: (
      <svg viewBox="0 0 32 32" className={className}>
        <defs>
          <linearGradient id="grapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C27B0"/>
            <stop offset="100%" stopColor="#6A1B9A"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="5" fill="url(#grapeGrad)"/>
        <circle cx="20" cy="12" r="5" fill="url(#grapeGrad)"/>
        <circle cx="16" cy="20" r="5" fill="url(#grapeGrad)"/>
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 32 32" className={className}>
        <defs>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81D4FA"/>
            <stop offset="50%" stopColor="#4FC3F7"/>
            <stop offset="100%" stopColor="#29B6F6"/>
          </linearGradient>
        </defs>
        <polygon points="16,2 28,12 16,30 4,12" fill="url(#diamondGrad)"/>
      </svg>
    ),
    seven: (
      <svg viewBox="0 0 32 32" className={className}>
        <defs>
          <linearGradient id="sevenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD54F"/>
            <stop offset="100%" stopColor="#FF8F00"/>
          </linearGradient>
        </defs>
        <text x="16" y="24" textAnchor="middle" fill="url(#sevenGrad)" fontSize="24" fontWeight="bold">7</text>
      </svg>
    ),
  };
  return symbols[type] || symbols.cherry;
};

export const SlotMachineGame = () => {
  const symbolTypes = ['cherry', 'lemon', 'grape', 'diamond', 'seven'];
  const [reels, setReels] = useState(['seven', 'seven', 'seven']);
  const [status, setStatus] = useState('idle');
  const [stoppingIndex, setStoppingIndex] = useState(-1);

  const spin = () => {
    if (status !== 'idle') return;

    if (navigator.vibrate) navigator.vibrate(50);

    setStatus('spinning');
    setStoppingIndex(-1);

    let steps = 0;
    const interval = setInterval(() => {
      setReels(prev => prev.map(() => symbolTypes[Math.floor(Math.random() * symbolTypes.length)]));
      steps++;

      if (steps > 15) {
        clearInterval(interval);
        stopReelsSequentially();
      }
    }, 100);
  };

  const stopReelsSequentially = async () => {
    setStatus('stopping');

    const finalResult = ['seven', 'seven', Math.random() > 0.5 ? 'seven' : 'cherry'];

    for (let i = 0; i < 3; i++) {
      setStoppingIndex(i);
      await new Promise(r => setTimeout(r, 600));
      if (navigator.vibrate) navigator.vibrate(20);

      setReels(prev => {
        const newReels = [...prev];
        newReels[i] = finalResult[i];
        return newReels;
      });
    }

    setStoppingIndex(3);

    if (finalResult[0] === finalResult[1] && finalResult[1] === finalResult[2]) {
      setStatus('won');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
    } else {
      setStatus('idle');
    }
  };

  return (
    <div className="bg-[#333] rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl mb-6 group border-[6px] border-[#444]">
      <div className="mt-4 flex gap-2 bg-[#222] p-3 rounded-2xl border-b-[4px] border-[#111] shadow-inner mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none rounded-2xl z-10" />

        {reels.map((s, i) => {
          const isSpinning = status === 'spinning' || (status === 'stopping' && stoppingIndex < i);
          return (
            <div key={i} className="flex-1 h-20 bg-[#FAF9F6] rounded-xl flex items-center justify-center border-x-2 border-gray-200 overflow-hidden relative">
              <div className={`w-12 h-12 transition-all duration-100 ${isSpinning ? 'blur-[2px] -translate-y-1 opacity-80' : 'translate-y-0 opacity-100'}`}>
                <SlotSymbol type={s} className={status === 'won' ? 'animate-bounce' : ''} />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={spin}
        disabled={status !== 'idle'}
        className={`w-full py-4 rounded-xl font-black text-lg shadow-[0_6px_0_#9F3800] active:shadow-none active:translate-y-[6px] transition-all flex items-center justify-center gap-2
          ${status === 'idle'
            ? 'bg-gradient-to-r from-orange-400 to-red-500 hover:brightness-110'
            : 'bg-gray-600 text-gray-400 shadow-none translate-y-[2px] cursor-not-allowed'}`}
      >
        {status === 'idle' ? 'SPIN !' : status === 'won' ? 'BIG WIN!' : 'Rolling...'}
      </button>

      {status === 'won' && (
        <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center rounded-[32px]">
          <h2 className="text-4xl font-black text-[#FFED8C] animate-bounce mb-2 drop-shadow-lg">JACKPOT!</h2>
          <p className="text-white font-bold text-xl animate-pulse">+5,000 pts</p>
          <button onClick={() => setStatus('idle')} className="mt-8 bg-white text-[#333] px-6 py-2 rounded-full font-bold z-40 hover:scale-105 transition-transform">收下獎勵</button>
        </div>
      )}
    </div>
  );
};

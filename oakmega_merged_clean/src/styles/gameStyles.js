export const GAME_STYLES = `
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
  @keyframes bounce-drop {
    0% { transform: translateY(-100%) scale(0.9); opacity: 0; }
    50% { transform: translateY(10%) scale(1.1); opacity: 1; }
    70% { transform: translateY(-10%) scale(0.95); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes pop-in {
    0% { transform: scale(0); opacity: 0; }
    70% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); }
  }
  @keyframes spin-blur {
    0% { filter: blur(0); transform: translateY(0); }
    100% { filter: blur(4px); transform: translateY(-100%); }
  }
  @keyframes ray-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite; }
  .animate-bounce-drop { animation: bounce-drop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-pop-in { animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  .animate-spin-ray { animation: ray-rotate 10s linear infinite; }
`;

export const injectGameStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'oakmega-game-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = GAME_STYLES;
    document.head.appendChild(styleEl);
  }
};

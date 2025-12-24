import React from 'react';

/**
 * LineMessageNode - A custom React Flow node component for LINE message preview
 * Features Glassmorphism styling and brand colors
 * 
 * @param {Object} props
 * @param {Object} props.data - Node data with message, sender, timestamp
 * @param {boolean} props.selected - Whether the node is selected
 * @returns {JSX.Element}
 */
export const LineMessageNode = ({ data, selected }) => {
  const { message = 'Hello! 👋', sender = 'OakMega Bot', timestamp, avatarUrl } = data || {};

  return (
    <div
      className={`
        relative min-w-[280px] max-w-[320px] rounded-card
        backdrop-blur-md bg-white/80 shadow-glass border
        transition-all duration-200
        ${selected ? 'border-oak-soul shadow-soul' : 'border-white/50'}
      `}
    >
      {/* Header with Sender Info */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/30 bg-gradient-to-r from-oak-soul/5 to-oak-warmth/5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={sender}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oak-soul to-oak-warmth flex items-center justify-center shadow-sm">
              <span className="text-white font-brand font-bold text-sm">
                {sender.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Sender Name */}
        <div className="flex-1 min-w-0">
          <p className="font-sans font-semibold text-oak-text text-sm truncate">
            {sender}
          </p>
          {timestamp && (
            <p className="font-sans text-xs text-oak-subtext">
              {timestamp}
            </p>
          )}
        </div>

        {/* LINE Brand Indicator */}
        <div className="flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#06C755] flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="white" 
              className="w-4 h-4"
            >
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="px-4 py-4 bg-white/60">
        <div className="bg-oak-canvas rounded-soft px-4 py-3 shadow-sm">
          <p className="text-oak-text font-sans text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>

      {/* Glassmorphism Gradient Overlay */}
      <div className="absolute inset-0 rounded-card bg-gradient-to-br from-oak-soul/5 to-oak-warmth/5 pointer-events-none" />

      {/* Connection Handles (for React Flow) */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-oak-soul border-2 border-white shadow-soul" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-oak-warmth border-2 border-white shadow-warmth" />
    </div>
  );
};

export default LineMessageNode;

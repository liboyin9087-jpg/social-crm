import React from 'react';

/**
 * Loading - A spinner component with brand colors and animations
 * 
 * @param {Object} props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {string} props.color - Color variant: 'soul' (purple), 'warmth' (orange)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
export const Loading = ({ 
  size = 'md', 
  color = 'soul',
  className = '' 
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorStyles = {
    soul: 'border-oak-soul border-t-transparent',
    warmth: 'border-oak-warmth border-t-transparent',
  };

  return (
    <div
      className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * PageLoading - A full-page loading component with brand identity
 * 
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 * @returns {JSX.Element}
 */
export const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-oak-canvas z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Brand Logo with Animation */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-oak-soul to-oak-warmth rounded-card flex items-center justify-center animate-float shadow-soul">
            <span className="text-white font-brand font-bold text-4xl">O</span>
          </div>
          {/* Pulsing Ring */}
          <div className="absolute inset-0 rounded-card border-4 border-oak-soul opacity-20 animate-ping"></div>
        </div>

        {/* Loading Spinner */}
        <Loading size="lg" color="soul" />

        {/* Loading Message */}
        {message && (
          <p className="text-oak-subtext font-sans text-lg animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;

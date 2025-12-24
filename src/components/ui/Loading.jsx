import React from 'react';

/**
 * Loading - A simple loading spinner using brand colors
 * 
 * @param {Object} props
 * @param {string} props.size - Size of the spinner: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.color - Color variant: 'soul', 'warmth' (default: 'soul')
 * @returns {JSX.Element}
 */
export const Loading = ({ size = 'md', color = 'soul' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    soul: 'border-oak-soul/30 border-t-oak-soul',
    warmth: 'border-oak-warmth/30 border-t-oak-warmth',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        rounded-full 
        animate-spin
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * PageLoading - A full-page loading screen with brand elements
 * 
 * @param {Object} props
 * @param {string} props.message - Optional loading message
 * @returns {JSX.Element}
 */
export const PageLoading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-oak-canvas flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-6 animate-float">
          <div className="w-16 h-16 bg-oak-soul rounded-card flex items-center justify-center mx-auto shadow-soul">
            <span className="text-white font-brand font-bold text-3xl">O</span>
          </div>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <Loading size="lg" color="soul" />
        </div>
        
        {/* Loading Message */}
        {message && (
          <p className="text-oak-subtext font-sans text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;

import React from 'react';

/**
 * BrandButton - A reusable button component with OakMega Canopy brand styling
 * 
 * @param {Object} props
 * @param {string} props.variant - Button style variant: 'primary', 'action', 'secondary', or 'ghost'
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element}
 */
export const BrandButton = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-brand font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:animate-growth';
  
  const variantStyles = {
    primary: 'bg-oak-soul text-white shadow-soul hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
    action: 'bg-oak-warmth text-gray-900 shadow-warmth hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
    secondary: 'bg-transparent border-2 border-oak-soul text-oak-soul hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
    ghost: 'bg-transparent text-oak-soul hover:bg-oak-soul/10 active:bg-oak-soul/20',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default BrandButton;

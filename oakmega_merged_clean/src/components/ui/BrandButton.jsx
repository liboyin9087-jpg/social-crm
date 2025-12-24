import React from 'react';

/**
 * BrandButton - A reusable button component with OakMega Canopy brand styling
 * 
 * @param {Object} props
 * @param {string} props.variant - Button style variant: 'primary', 'cta', or 'outline'
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
  const baseStyles = 'px-6 py-3 rounded-lg font-brand font-semibold transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-oakmega-purple-700 text-white shadow-growth hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
    cta: 'bg-oakmega-orange-400 text-gray-900 shadow-growth hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
    outline: 'bg-transparent border-2 border-oakmega-purple-700 text-oakmega-purple-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
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

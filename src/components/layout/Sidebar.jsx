import React from 'react';

/**
 * Sidebar - A sticky sidebar component with OakMega Canopy brand identity
 * 
 * @param {Object} props
 * @param {string} props.activePath - Currently active navigation path
 * @param {Array} props.navItems - Array of navigation items with { id, label, icon, path }
 * @param {React.ReactNode} props.logo - Brand logo component
 * @param {Function} props.onNavigate - Navigation handler
 * @returns {JSX.Element}
 */
export const Sidebar = ({ 
  activePath, 
  navItems = [], 
  logo, 
  onNavigate 
}) => {
  return (
    <aside className="sticky top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Brand Logo Section */}
      <div className="px-6 py-8 border-b border-gray-200">
        {logo || (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oakmega-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-brand font-bold text-xl">O</span>
            </div>
            <span className="font-brand font-bold text-xl text-gray-900">OakMega</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = activePath === item.path || activePath === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.path || item.id)}
                  className={`
                    relative w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-oakmega-purple-700/5 text-oakmega-purple-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {/* Active Indicator - Vertical Orange Bar */}
                  {isActive && (
                    <span 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-oakmega-orange-400 rounded-r-full"
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Icon */}
                  {item.icon && (
                    <span className={`flex-shrink-0 ${isActive ? 'text-oakmega-purple-700' : ''}`}>
                      {typeof item.icon === 'function' ? item.icon({ active: isActive }) : item.icon}
                    </span>
                  )}
                  
                  {/* Label */}
                  <span className={`font-sans font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Optional Footer Section */}
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 font-sans">© 2024 OakMega</p>
      </div>
    </aside>
  );
};

export default Sidebar;

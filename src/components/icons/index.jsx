import React from 'react';

// OakMega Brand Icon
export const IconOakMega = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
    <defs>
      <linearGradient id="oakGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E5A0"/>
        <stop offset="50%" stopColor="#00B87A"/>
        <stop offset="100%" stopColor="#008F5D"/>
      </linearGradient>
      <linearGradient id="oakGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1a1a2e"/>
        <stop offset="100%" stopColor="#2d2d44"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#oakGrad2)" stroke="url(#oakGrad1)" strokeWidth="2"/>
    <path d="M32 14 L32 32 M32 32 L20 44 M32 32 L44 44 M32 32 L24 48 M32 32 L40 48" 
          stroke="url(#oakGrad1)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="32" cy="14" r="3" fill="#00E5A0"/>
    <circle cx="20" cy="44" r="2.5" fill="#00E5A0"/>
    <circle cx="44" cy="44" r="2.5" fill="#00E5A0"/>
    <circle cx="24" cy="48" r="2" fill="#00B87A"/>
    <circle cx="40" cy="48" r="2" fill="#00B87A"/>
  </svg>
);

// Dashboard Home Icon
export const IconHome = ({ size = 24, active = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z"
      stroke={active ? "#00E5A0" : "#64748b"}
      fill={active ? "rgba(0,229,160,0.15)" : "none"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12H15V22" 
      stroke={active ? "#00E5A0" : "#64748b"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Analytics / OMA Icon
export const IconAnalytics = ({ size = 24, active = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="analyticsGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={active ? "#00E5A0" : "#64748b"}/>
        <stop offset="100%" stopColor={active ? "#00FFB4" : "#94a3b8"}/>
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={active ? "#00E5A0" : "#64748b"} 
          strokeWidth="1.5" fill={active ? "rgba(0,229,160,0.1)" : "none"}/>
    <rect x="6" y="13" width="3" height="5" rx="0.5" fill="url(#analyticsGrad)"/>
    <rect x="10.5" y="9" width="3" height="9" rx="0.5" fill="url(#analyticsGrad)"/>
    <rect x="15" y="6" width="3" height="12" rx="0.5" fill="url(#analyticsGrad)"/>
  </svg>
);

// Module Center Icon
export const IconModules = ({ size = 24, active = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="2" 
          fill={active ? "rgba(0,229,160,0.2)" : "none"} 
          stroke={active ? "#00E5A0" : "#64748b"} strokeWidth="1.5"/>
    <rect x="13" y="3" width="8" height="8" rx="2" 
          fill={active ? "rgba(255,183,77,0.2)" : "none"} 
          stroke={active ? "#FFB74D" : "#64748b"} strokeWidth="1.5"/>
    <rect x="3" y="13" width="8" height="8" rx="2" 
          fill={active ? "rgba(126,87,255,0.2)" : "none"} 
          stroke={active ? "#7E57FF" : "#64748b"} strokeWidth="1.5"/>
    <rect x="13" y="13" width="8" height="8" rx="2" 
          fill={active ? "rgba(0,188,212,0.2)" : "none"} 
          stroke={active ? "#00BCD4" : "#64748b"} strokeWidth="1.5"/>
  </svg>
);

// Coupon / Rewards Icon
export const IconCoupon = ({ size = 24, active = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V9C18.8954 9 18 9.89543 18 11C18 12.1046 18.8954 13 20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V13C5.10457 13 6 12.1046 6 11C6 9.89543 5.10457 9 4 9V6Z"
      fill={active ? "rgba(255,183,77,0.2)" : "none"}
      stroke={active ? "#FFB74D" : "#64748b"}
      strokeWidth="1.5"
    />
    <path d="M10 8L14 16M10 16L14 8" stroke={active ? "#FFB74D" : "#64748b"} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Bell / Notification Icon
export const IconBell = ({ size = 24, badge = 0, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V14L20 17H4L6 14V8Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="none"
    />
    <path d="M10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20" stroke="currentColor" strokeWidth="1.5"/>
    {badge > 0 && (
      <g>
        <circle cx="18" cy="6" r="5" fill="#EF4444"/>
        <text x="18" y="8.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
          {badge > 9 ? '9+' : badge}
        </text>
      </g>
    )}
  </svg>
);

// Gamepad / Playground Icon
export const IconGamepad = ({ size = 24, active = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M6 11H10M8 9V13M15 12H15.01M18 10H18.01"
      stroke={active ? "#7E57FF" : "#64748b"} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <rect x="2" y="6" width="20" height="12" rx="4" 
          stroke={active ? "#7E57FF" : "#64748b"} 
          strokeWidth="1.5"
          fill={active ? "rgba(126,87,255,0.15)" : "none"}
    />
  </svg>
);

// Flow / Journey Icon
export const IconFlow = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="4" r="2.5" fill="#00E5A0" stroke="#00E5A0" strokeWidth="1"/>
    <circle cx="6" cy="12" r="2" fill="#FFB74D" stroke="#FFB74D" strokeWidth="1"/>
    <circle cx="18" cy="12" r="2" fill="#00E5A0" stroke="#00E5A0" strokeWidth="1"/>
    <circle cx="4" cy="20" r="1.5" fill="#64748b" stroke="#64748b" strokeWidth="1"/>
    <circle cx="12" cy="20" r="1.5" fill="#FFB74D" stroke="#FFB74D" strokeWidth="1"/>
    <circle cx="20" cy="20" r="1.5" fill="#00E5A0" stroke="#00E5A0" strokeWidth="1"/>
    <path d="M12 6.5V8L6 10M12 6.5V8L18 10" stroke="#64748b" strokeWidth="1" strokeLinecap="round"/>
    <path d="M6 14L4 18M6 14L12 18M18 14L12 18M18 14L20 18" stroke="#64748b" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

// Users / Members Icon
export const IconUsers = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 20C3 16.134 6.13401 13 10 13H8C11.866 13 15 16.134 15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="16" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M18 13C20.2091 13 22 14.7909 22 17V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// QR Code Icon
export const IconQRCode = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="5" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="16" y="5" width="3" height="3" fill="currentColor"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="5" y="16" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="14" width="3" height="3" fill="currentColor"/>
    <rect x="18" y="14" width="3" height="3" fill="currentColor"/>
    <rect x="14" y="18" width="3" height="3" fill="currentColor"/>
    <rect x="18" y="18" width="3" height="3" fill="currentColor"/>
  </svg>
);

// Shopping Cart Icon
export const IconCart = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4H6L8.5 15H18.5L21 6H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
  </svg>
);

// Check / Success Icon
export const IconCheck = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="#00E5A0" strokeWidth="1.5" fill="rgba(0,229,160,0.1)"/>
    <path d="M8 12L11 15L16 9" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Warning Icon
export const IconWarning = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L22 20H2L12 2Z" stroke="#FFB74D" strokeWidth="1.5" fill="rgba(255,183,77,0.1)" strokeLinejoin="round"/>
    <path d="M12 9V13M12 16V16.5" stroke="#FFB74D" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Location / Map Pin Icon
export const IconLocation = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="12" cy="9" r="3" fill="currentColor"/>
  </svg>
);

// Refresh Icon
export const IconRefresh = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 12C4 7.58172 7.58172 4 12 4C15.0736 4 17.7455 5.69732 19.1987 8.2M20 12C20 16.4183 16.4183 20 12 20C8.92644 20 6.25454 18.3027 4.80128 15.8"
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path d="M19 4V8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 20V16H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Settings Icon
export const IconSettings = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    <path 
      d="M12 2V4M12 20V22M22 12H20M4 12H2M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93"
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
  </svg>
);

// Arrow Left Icon
export const IconArrowLeft = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Arrow Right Icon
export const IconArrowRight = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Plus Icon
export const IconPlus = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Tag Icon
export const IconTag = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M4 4V11.586L12.414 20L20 12.414L11.586 4H4Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
  </svg>
);

// Send / Broadcast Icon
export const IconSend = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Filter Icon
export const IconFilter = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 4H21M6 9H18M9 14H15M11 19H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Eye / View Icon
export const IconEye = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Gift Icon
export const IconGift = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V22M3 12H21" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8C12 8 12 5 9 4C6 3 6 6 6 6C6 6 6 8 12 8Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8C12 8 12 5 15 4C18 3 18 6 18 6C18 6 18 8 12 8Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Star Icon
export const IconStar = ({ size = 24, filled = false, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      stroke="#FFB74D" 
      strokeWidth="1.5"
      fill={filled ? "#FFB74D" : "none"}
    />
  </svg>
);

// Clock / Time Icon
export const IconClock = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Download Icon
export const IconDownload = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3V15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Drag Handle Icon
export const IconDrag = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="18" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);

// Selection Box Icon
export const IconSelection = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4H8M4 4V8M4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 4H16M20 4V8M20 4L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 20H8M4 20V16M4 20L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 20H16M20 20V16M20 20L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Pulse / Live Icon
export const IconPulse = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12H6L9 4L12 20L15 8L18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Zap / Lightning Icon
export const IconZap = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,183,77,0.2)" strokeLinejoin="round"/>
  </svg>
);

// Close / X Icon
export const IconClose = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Menu / Hamburger Icon
export const IconMenu = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Link Icon
export const IconLink = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33398 21.9434 7.02299C21.932 5.71199 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.46999L11.75 5.17999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3935 9.60706C11.7643 9.26329 11.0685 9.05888 10.3534 9.00766C9.63821 8.95645 8.92041 9.05961 8.24866 9.31021C7.5769 9.5608 6.9669 9.95299 6.46001 10.46L3.46001 13.46C2.54923 14.403 2.04525 15.666 2.05665 16.977C2.06804 18.288 2.59388 19.5421 3.52092 20.4691C4.44796 21.3961 5.70201 21.922 7.01301 21.9334C8.32401 21.9448 9.58704 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Copy Icon
export const IconCopy = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Trash / Delete Icon
export const IconTrash = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Edit / Pencil Icon
export const IconEdit = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 20H21M16.5 3.50023C16.8978 3.1024 17.4374 2.87891 18 2.87891C18.2786 2.87891 18.5544 2.93378 18.8118 3.04038C19.0692 3.14699 19.303 3.30324 19.5 3.50023C19.697 3.69721 19.8532 3.93106 19.9598 4.18843C20.0665 4.4458 20.1213 4.72165 20.1213 5.00023C20.1213 5.2788 20.0665 5.55465 19.9598 5.81202C19.8532 6.06939 19.697 6.30324 19.5 6.50023L7 19.0002L3 20.0002L4 16.0002L16.5 3.50023Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Search Icon
export const IconSearch = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Info Icon
export const IconInfo = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// External Link Icon
export const IconExternalLink = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Target Icon  
export const IconTarget = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

// Trend Up Icon
export const IconTrendUp = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H23V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Trend Down Icon
export const IconTrendDown = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M23 18L13.5 8.5L8.5 13.5L1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 18H23V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Broadcast / Megaphone Icon
export const IconBroadcast = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 8C19.3333 9 21 10.5 21 12C21 13.5 19.3333 15 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 15H3C2.44772 15 2 14.5523 2 14V10C2 9.44772 2.44772 9 3 9H4L10 4V20L4 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

// User / Person Icon
export const IconUser = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 21V19C4 16.2386 6.23858 14 9 14H15C17.7614 14 20 16.2386 20 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Lock / Password Icon
export const IconLock = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);

// Sparkle / Magic Icon
export const IconSparkle = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,183,77,0.2)" strokeLinejoin="round"/>
    <path d="M19 2L20 5L23 6L20 7L19 10L18 7L15 6L18 5L19 2Z" stroke="currentColor" strokeWidth="1" fill="rgba(255,183,77,0.3)" strokeLinejoin="round"/>
    <path d="M5 16L6 18L8 19L6 20L5 22L4 20L2 19L4 18L5 16Z" stroke="currentColor" strokeWidth="1" fill="rgba(126,87,255,0.3)" strokeLinejoin="round"/>
  </svg>
);
